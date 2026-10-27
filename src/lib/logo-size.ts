/**
 * The height, in rem, to draw a press logo of this shape so that a long wordmark and a square
 * mark look about the same size side by side: the wider the logo, the shorter it is drawn.
 * A square logo is 3rem tall at scale 1.
 */
export function logoHeight(width: number, height: number, scale = 1): number {
  const aspect = width / height;
  return Math.round(scale * 3 * aspect ** -0.4 * 100) / 100;
}
