export type HeaderState = { hidden: boolean; lastY: number };

const DEFAULTS = { threshold: 160, delta: 8 };

/**
 * Decides whether the header should be hidden after the page scrolls to `y`.
 * Near the top it always shows; below that it hides on scroll down and returns on scroll up.
 */
export function nextHeaderState(prev: HeaderState, y: number, options = DEFAULTS): HeaderState {
  if (y <= options.threshold) return { hidden: false, lastY: y };
  const moved = y - prev.lastY;
  if (Math.abs(moved) < options.delta) return prev;
  return { hidden: moved > 0, lastY: y };
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * How far the page has moved through the pinned home page hero: 0 at the top, 1 once the hero
 * is released. `travel` is the distance the hero stays pinned; with none, it counts as finished.
 */
export function heroProgress(scrolled: number, travel: number): number {
  return travel <= 0 ? 1 : clamp01(scrolled / travel);
}

/**
 * How visible the hero's words are at `progress`. They stay hidden for the first small scroll,
 * then come in steadily and are fully shown well before the hero is released.
 */
export function revealAmount(progress: number, start = 0.06, end = 0.55): number {
  return clamp01((progress - start) / (end - start));
}

/**
 * Whether the header should be see-through at scroll position `y`. While the hero is pinned the
 * photo fills the screen, so the header floats over it. Once the hero is released and scrolling
 * away, the header turns solid so the menu never sits on top of moving words. A hero that is
 * not pinned keeps the see-through header until it has passed underneath.
 */
export function headerOverHero(y: number, hero: { top: number; height: number; pinned: number }, headerHeight: number): boolean {
  const travel = hero.height - hero.pinned;
  return travel > 0 ? y <= hero.top + travel : y < hero.top + hero.height - headerHeight;
}
