/*
  NEIGHBORHOOD DESCRIPTIONS
  A few paragraphs about each neighborhood. They appear on every home and lot page in that
  neighborhood, under "About <neighborhood>", above the map.

  The name must match the listing's `neighborhood` in src/data/homes.ts exactly, including
  capital letters. A neighborhood with no entry shows nothing on the live site. In the local
  preview (npm run dev) an outlined box marks where the text will go.

  Example:
    'Midway Hollow': [
      'First paragraph about the neighborhood.',
      'Second paragraph.',
    ],
*/

export const neighborhoods: Record<string, string[]> = {};
