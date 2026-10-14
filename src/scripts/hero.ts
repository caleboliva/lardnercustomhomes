import { swipeDirection, wrapIndex } from '../lib/carousel.ts';
import { heroProgress, revealAmount } from '../lib/scroll.ts';

const SLIDE_MS = 6000;
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

// Browsers that can tie an animation to the scroll position run the headline from CSS alone
// (see HeroSlideshow.astro), which keeps it exactly in step with the page.
const SCROLL_DRIVEN = 'CSS' in window && CSS.supports('animation-timeline: scroll()');

/** Ties the headline and the darkening to how far the page has scrolled through the pinned hero. */
function initScroll(hero: HTMLElement, stage: HTMLElement): void {
  const content = hero.querySelector<HTMLElement>('.hero__content');
  let top = 0;
  let travel = 0;
  let queued = false;
  let shown = '';
  // Reaching the buttons with the keyboard shows the words even before any scrolling.
  let focused = false;

  // Measured on load and when the size changes, never during a scroll frame.
  const measure = () => {
    top = hero.offsetTop;
    travel = hero.offsetHeight - stage.offsetHeight;
  };

  const update = () => {
    queued = false;
    const progress = heroProgress(window.scrollY - top, travel);
    const reveal = focused ? 1 : revealAmount(progress);
    const next = `${progress.toFixed(3)} ${reveal.toFixed(3)}`;
    if (next === shown) return;
    shown = next;
    hero.style.setProperty('--hero-p', progress.toFixed(3));
    hero.style.setProperty('--hero-reveal', reveal.toFixed(3));
    hero.toggleAttribute('data-words', reveal > 0.5);
  };
  const request = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  const remeasure = () => {
    measure();
    request();
  };

  if (!SCROLL_DRIVEN) window.addEventListener('scroll', request, { passive: true });
  new ResizeObserver(remeasure).observe(hero);
  window.matchMedia(REDUCED_MOTION).addEventListener('change', remeasure);
  content?.addEventListener('focusin', () => {
    focused = true;
    hero.setAttribute('data-focused', '');
    update();
  });
  content?.addEventListener('focusout', () => {
    focused = false;
    hero.removeAttribute('data-focused');
    update();
  });
  measure();
  update();
}

function initSlides(hero: HTMLElement): void {
  const slides = Array.from(hero.querySelectorAll<HTMLElement>('[data-hero-slide]'));
  if (slides.length < 2) return;
  const dots = Array.from(hero.querySelectorAll<HTMLButtonElement>('[data-hero-dot]'));
  const toggle = hero.querySelector<HTMLButtonElement>('[data-hero-toggle]');
  const caption = hero.querySelector<HTMLAnchorElement>('[data-hero-caption]');
  const controls = hero.querySelector<HTMLElement>('[data-hero-controls]');

  let index = 0;
  let request = 0;
  let timer: number | undefined;
  // Anyone who has asked for less motion starts with the slideshow stopped.
  let paused = window.matchMedia(REDUCED_MOTION).matches;
  let inView = true;
  let busy = false;

  /** Starts fetching a slide's photo if it has not been fetched yet. */
  const load = (i: number): HTMLImageElement | null => {
    const image = slides[wrapIndex(i, slides.length)]?.querySelector('img') ?? null;
    if (image?.dataset.src) {
      image.srcset = image.dataset.srcset ?? '';
      image.src = image.dataset.src;
      delete image.dataset.src;
      delete image.dataset.srcset;
    }
    return image;
  };

  const loaded = (image: HTMLImageElement | null): Promise<void> =>
    !image || (image.complete && image.naturalWidth > 0)
      ? Promise.resolve()
      : new Promise((resolve) => {
          image.addEventListener('load', () => resolve(), { once: true });
          image.addEventListener('error', () => resolve(), { once: true });
        });

  const show = async (i: number) => {
    const next = wrapIndex(i, slides.length);
    const mine = ++request;
    // Wait for the photo, so the slideshow never fades to an empty frame.
    await loaded(load(next));
    if (mine !== request) return;

    slides.forEach((slide, n) => {
      slide.toggleAttribute('data-active', n === next);
      if (n === next) slide.removeAttribute('aria-hidden');
      else slide.setAttribute('aria-hidden', 'true');
    });
    dots.forEach((dot, n) => (n === next ? dot.setAttribute('aria-current', 'true') : dot.removeAttribute('aria-current')));
    const slide = slides[next]!;
    if (caption) {
      caption.textContent = slide.dataset.label ?? '';
      caption.href = slide.dataset.href ?? caption.href;
    }
    index = next;
    load(next + 1);
  };

  const schedule = () => {
    window.clearTimeout(timer);
    if (paused || busy || !inView || document.hidden) return;
    timer = window.setTimeout(async () => {
      await show(index + 1);
      schedule();
    }, SLIDE_MS);
  };

  const setPaused = (value: boolean) => {
    paused = value;
    hero.toggleAttribute('data-paused', paused);
    toggle?.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    schedule();
  };

  dots.forEach((dot, i) =>
    dot.addEventListener('click', async () => {
      await show(i);
      schedule();
    }),
  );
  toggle?.addEventListener('click', () => setPaused(!paused));

  // A sideways swipe changes the photo. Up-and-down movement is left alone so the page still scrolls.
  let touch: { x: number; y: number } | null = null;
  hero.addEventListener(
    'touchstart',
    (event) => {
      const point = event.touches[0];
      touch = point && event.touches.length === 1 ? { x: point.clientX, y: point.clientY } : null;
    },
    { passive: true },
  );
  hero.addEventListener(
    'touchend',
    async (event) => {
      const point = event.changedTouches[0];
      if (!touch || !point) return;
      const direction = swipeDirection(point.clientX - touch.x, point.clientY - touch.y);
      touch = null;
      if (!direction) return;
      await show(index + (direction === 'next' ? 1 : -1));
      schedule();
    },
    { passive: true },
  );

  // Hold still while someone is using the controls.
  const setBusy = (value: boolean) => {
    busy = value;
    schedule();
  };
  controls?.addEventListener('pointerenter', () => setBusy(true));
  controls?.addEventListener('pointerleave', () => setBusy(false));
  controls?.addEventListener('focusin', () => setBusy(true));
  controls?.addEventListener('focusout', () => setBusy(false));

  document.addEventListener('visibilitychange', schedule);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      schedule();
    }).observe(hero);
  }

  load(1);
  setPaused(paused);
}

export function initHero(): void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const stage = hero?.querySelector<HTMLElement>('[data-hero-stage]');
  if (!hero || !stage) return;
  initScroll(hero, stage);
  initSlides(hero);
}
