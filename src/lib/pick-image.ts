/**
 * Looks up an imported image by its path under src/assets/.
 * Returns null when nothing matches, so callers can fall back to a placeholder.
 */
export function pickImage<T>(files: Record<string, { default: T }>, path: string | null): T | null {
  if (!path) return null;
  return files[`../assets/${path}`]?.default ?? null;
}
