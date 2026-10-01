/**
 * The project page behaves like an overlay: the X, the dark area beside the photos and
 * Escape all return to the gallery. Going "back" restores the visitor's scroll position;
 * if they arrived from somewhere else, the X's own link (/gallery/) is used instead.
 */
export function initProjectView(): void {
  const view = document.querySelector<HTMLElement>('[data-project-view]');
  const closeLink = view?.querySelector<HTMLAnchorElement>('[data-project-close]');
  if (!view || !closeLink) return;

  const cameFromGallery = (() => {
    try {
      const referrer = new URL(document.referrer);
      return (
        referrer.origin === window.location.origin &&
        referrer.pathname.startsWith('/gallery/') &&
        referrer.pathname !== window.location.pathname
      );
    } catch {
      return false;
    }
  })();

  const leave = () => {
    if (cameFromGallery && window.history.length > 1) window.history.back();
    else window.location.assign(closeLink.href);
  };

  closeLink.addEventListener('click', (event) => {
    // Let modified clicks (new tab, new window) behave normally.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    leave();
  });

  // Only the bare dark area counts: clicks on text, photos or the gaps between them do nothing.
  view.addEventListener('click', (event) => {
    if (event.target === view) leave();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !document.querySelector('dialog[open]')) leave();
  });
}
