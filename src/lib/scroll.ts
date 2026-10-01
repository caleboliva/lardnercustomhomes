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
