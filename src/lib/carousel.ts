/** Keeps `index` inside 0..length-1, wrapping past either end. */
export function wrapIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

export type SwipeDirection = 'next' | 'prev' | null;

/** Interprets a touch movement. Swiping left moves to the next photo. */
export function swipeDirection(dx: number, dy: number, threshold = 48): SwipeDirection {
  if (Math.abs(dx) < threshold) return null;
  if (Math.abs(dx) < Math.abs(dy) * 1.5) return null;
  return dx < 0 ? 'next' : 'prev';
}
