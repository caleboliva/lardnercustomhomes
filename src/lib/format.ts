import type { Listing } from '../data/types.ts';

const PLACEHOLDER_PREFIX = '[Placeholder:';

/** Marks text that still needs to be supplied. Renders highlighted on the page. */
export function placeholder(need: string): string {
  return `${PLACEHOLDER_PREFIX} ${need}]`;
}

export function isPlaceholder(text: string): boolean {
  return text.startsWith(PLACEHOLDER_PREFIX);
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** "plans for 4 beds, 5 baths" or "plans for 6 units", or '' when nothing is planned yet. */
function planSummary(listing: Listing): string {
  if (listing.units !== undefined) return `plans for ${count(listing.units, 'unit', 'units')}`;
  const rooms: string[] = [];
  if (listing.beds !== undefined) rooms.push(count(listing.beds, 'bed', 'beds'));
  if (listing.baths !== undefined) rooms.push(count(listing.baths, 'bath', 'baths'));
  return rooms.length > 0 ? `plans for ${rooms.join(', ')}` : '';
}

/** One line of specs for a listing card, for example "4 beds · 3 baths · 4,250 sq ft". */
export function specLine(listing: Listing): string {
  if (listing.category === 'lot') {
    const plan = planSummary(listing);
    const parts = [listing.lotSize ? `${listing.lotSize} lot` : '', plan].filter(Boolean);
    if (parts.length > 0) {
      const line = parts.join(' · ');
      return line.charAt(0).toUpperCase() + line.slice(1);
    }
    return listing.placeholder ? placeholder('lot size') : '';
  }

  const parts: string[] = [];
  if (listing.beds !== undefined) parts.push(`${listing.beds} ${listing.beds === 1 ? 'bed' : 'beds'}`);
  if (listing.baths !== undefined) parts.push(`${listing.baths} ${listing.baths === 1 ? 'bath' : 'baths'}`);
  if (listing.sqft !== undefined) parts.push(`${formatNumber(listing.sqft)} sq ft`);
  if (listing.lotSize) parts.push(`${listing.lotSize} lot`);
  if (parts.length > 0) return parts.join(' · ');
  return listing.placeholder ? placeholder('beds, baths, sq ft') : '';
}
