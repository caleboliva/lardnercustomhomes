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

/** One line of specs for a listing card, for example "4 beds · 3 baths · 4,250 sq ft". */
export function specLine(listing: Listing): string {
  const parts: string[] = [];
  if (listing.beds !== undefined) parts.push(`${listing.beds} ${listing.beds === 1 ? 'bed' : 'beds'}`);
  if (listing.baths !== undefined) parts.push(`${listing.baths} ${listing.baths === 1 ? 'bath' : 'baths'}`);
  if (listing.sqft !== undefined) parts.push(`${formatNumber(listing.sqft)} sq ft`);
  if (listing.lotSize) parts.push(`${listing.lotSize} lot`);
  if (parts.length > 0) return parts.join(' · ');
  if (!listing.placeholder) return '';
  return placeholder(listing.category === 'lot' ? 'lot size' : 'beds, baths, sq ft');
}
