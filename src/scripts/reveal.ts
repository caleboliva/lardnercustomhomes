/**
 * Fades sections in as they scroll into view. Only elements that start below the
 * viewport are hidden, so nothing above the fold flashes and the page works without JS.
 */
export function initReveal(): void {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );

  for (const element of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
    if (element.getBoundingClientRect().top < window.innerHeight) continue;
    element.classList.add('reveal-pending');
    observer.observe(element);
  }
}
