let locks = 0;

/** Stops the page behind an overlay from scrolling. Calls are counted, so overlays can nest. */
export function lockScroll(): void {
  locks += 1;
  if (locks === 1) document.documentElement.classList.add('is-scroll-locked');
}

export function unlockScroll(): void {
  if (locks === 0) return;
  locks -= 1;
  if (locks === 0) document.documentElement.classList.remove('is-scroll-locked');
}
