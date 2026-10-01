import { swipeDirection, wrapIndex } from '../lib/carousel.ts';
import { lockScroll, unlockScroll } from './scroll-lock.ts';

type Slide = { src: string | null; width: number; height: number; alt: string; caption: string };

function readSlide(trigger: HTMLElement): Slide {
  return {
    src: trigger.dataset.lbSrc || null,
    width: Number(trigger.dataset.lbWidth) || 0,
    height: Number(trigger.dataset.lbHeight) || 0,
    alt: trigger.dataset.lbAlt ?? '',
    caption: trigger.dataset.lbCaption ?? '',
  };
}

export function initLightbox(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
  if (!dialog) return;

  const image = dialog.querySelector<HTMLImageElement>('[data-lightbox-img]');
  const placeholder = dialog.querySelector<HTMLElement>('[data-lightbox-placeholder]');
  const placeholderText = dialog.querySelector<HTMLElement>('[data-lightbox-placeholder-text]');
  const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption]');
  const counter = dialog.querySelector<HTMLElement>('[data-lightbox-counter]');
  const closeButton = dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]');
  const prevButton = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
  const nextButton = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]');
  if (!image || !placeholder || !placeholderText || !caption || !counter || !closeButton || !prevButton || !nextButton) {
    return;
  }

  let triggers: HTMLElement[] = [];
  let index = 0;
  let opener: HTMLElement | null = null;

  const preload = (i: number) => {
    const neighbour = triggers[wrapIndex(i, triggers.length)];
    const src = neighbour ? readSlide(neighbour).src : null;
    if (src) new Image().src = src;
  };

  const show = (i: number) => {
    index = wrapIndex(i, triggers.length);
    const trigger = triggers[index];
    if (!trigger) return;
    const slide = readSlide(trigger);

    if (slide.src) {
      image.src = slide.src;
      image.alt = slide.alt;
      image.width = slide.width;
      image.height = slide.height;
      image.hidden = false;
      placeholder.hidden = true;
    } else {
      image.hidden = true;
      image.removeAttribute('src');
      placeholderText.textContent = slide.alt;
      placeholder.hidden = false;
    }

    caption.textContent = slide.caption;
    counter.textContent = `${index + 1} / ${triggers.length}`;
    preload(index + 1);
    preload(index - 1);
  };

  const step = (by: number) => {
    if (triggers.length > 1) show(index + by);
  };

  const open = (trigger: HTMLElement) => {
    const group = trigger.closest<HTMLElement>('[data-lightbox-group]') ?? document.body;
    triggers = Array.from(group.querySelectorAll<HTMLElement>('[data-lightbox]'));
    opener = trigger;
    const single = triggers.length < 2;
    prevButton.hidden = single;
    nextButton.hidden = single;
    show(triggers.indexOf(trigger));
    dialog.showModal();
    lockScroll();
  };

  document.addEventListener('click', (event) => {
    const trigger = (event.target as Element | null)?.closest<HTMLElement>('[data-lightbox]');
    if (!trigger) return;
    event.preventDefault();
    open(trigger);
  });

  closeButton.addEventListener('click', () => dialog.close());
  prevButton.addEventListener('click', () => step(-1));
  nextButton.addEventListener('click', () => step(1));

  // A click anywhere that is not the photo, its caption or a control closes the viewer.
  dialog.addEventListener('click', (event) => {
    if (!(event.target as Element).closest('[data-lightbox-keep]')) dialog.close();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    }
  });

  let startX = 0;
  let startY = 0;
  dialog.addEventListener(
    'touchstart',
    (event) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
    },
    { passive: true },
  );
  dialog.addEventListener(
    'touchend',
    (event) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      const direction = swipeDirection(touch.clientX - startX, touch.clientY - startY);
      if (direction === 'next') step(1);
      if (direction === 'prev') step(-1);
    },
    { passive: true },
  );

  // Fires for the X, a click outside, and Escape.
  dialog.addEventListener('close', () => {
    unlockScroll();
    image.removeAttribute('src');
    opener?.focus();
    opener = null;
  });
}
