import { nextHeaderState, type HeaderState } from '../lib/scroll.ts';
import { lockScroll, unlockScroll } from './scroll-lock.ts';

const COMPACT_AFTER = 24;
const DESKTOP = '(min-width: 64rem)';

function initHeaderScroll(header: HTMLElement): void {
  let state: HeaderState = { hidden: false, lastY: window.scrollY };
  let queued = false;

  // Never hide the bar while someone is using it.
  const isPinned = () =>
    header.querySelector(':focus-visible') !== null || header.querySelector('[aria-expanded="true"]') !== null;

  const update = () => {
    queued = false;
    const y = Math.max(window.scrollY, 0);
    state = nextHeaderState(state, y);
    header.toggleAttribute('data-compact', y > COMPACT_AFTER);
    header.toggleAttribute('data-hidden', state.hidden && !isPinned());
  };

  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  header.addEventListener('focusin', () => header.removeAttribute('data-hidden'));
  update();
}

function initSubmenus(header: HTMLElement): void {
  const toggles = Array.from(header.querySelectorAll<HTMLButtonElement>('[data-submenu-toggle]'));
  const closeAll = () => toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', 'false'));

  for (const toggle of toggles) {
    const item = toggle.closest<HTMLElement>('[data-submenu]');
    if (!item) continue;

    toggle.addEventListener('click', () => {
      const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
      closeAll();
      toggle.setAttribute('aria-expanded', String(!wasOpen));
    });

    item.addEventListener('focusout', (event) => {
      if (!item.contains(event.relatedTarget as Node | null)) toggle.setAttribute('aria-expanded', 'false');
    });

    item.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') return;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    });
  }

  document.addEventListener('click', (event) => {
    if (!(event.target as Element).closest('[data-submenu]')) closeAll();
  });
}

function initMobileMenu(): void {
  const menu = document.querySelector<HTMLDialogElement>('[data-menu]');
  const openButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeButton = menu?.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!menu || !openButton || !closeButton) return;

  openButton.addEventListener('click', () => {
    menu.showModal();
    openButton.setAttribute('aria-expanded', 'true');
    lockScroll();
  });

  closeButton.addEventListener('click', () => menu.close());

  // Fires for the close button and for Escape.
  menu.addEventListener('close', () => {
    openButton.setAttribute('aria-expanded', 'false');
    unlockScroll();
    openButton.focus();
  });

  window.matchMedia(DESKTOP).addEventListener('change', (event) => {
    if (event.matches && menu.open) menu.close();
  });
}

export function initNav(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  initHeaderScroll(header);
  initSubmenus(header);
  initMobileMenu();
}
