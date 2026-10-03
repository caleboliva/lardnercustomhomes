import type { Listing } from '../data/types.ts';
import { formatNumber, placeholder } from './format.ts';

export type Fact = { label: string; value: string };

const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** "Office, game room, flex room": the first word keeps its capital, the rest are lower-case. */
function featureList(features: string[]): string {
  return features.map((f, i) => (i === 0 ? f : f.charAt(0).toLowerCase() + f.slice(1))).join(', ');
}

/** The details shown on a listing's page, in display order. Only facts that exist are included. */
export function listingFacts(listing: Listing): Fact[] {
  const facts: Fact[] = [];
  const add = (label: string, value: string | undefined) => {
    if (value) facts.push({ label, value });
  };

  add('Neighborhood', listing.neighborhood);
  add('Address', listing.address);
  add('Price', listing.price);

  if (listing.category === 'lot') {
    add('Lot size', listing.lotSize);
    const plan: string[] = [];
    if (listing.units !== undefined) plan.push(count(listing.units, 'unit', 'units'));
    if (listing.beds !== undefined) plan.push(count(listing.beds, 'bed', 'beds'));
    if (listing.baths !== undefined) plan.push(count(listing.baths, 'bath', 'baths'));
    if (listing.garage !== undefined) plan.push(`${listing.garage}-car garage`);
    add(listing.units !== undefined && listing.units > 1 ? 'Planned homes' : 'Planned home', plan.join(' · '));
  } else {
    if (listing.beds !== undefined) add('Bedrooms', String(listing.beds));
    if (listing.baths !== undefined) add('Bathrooms', String(listing.baths));
    if (listing.sqft !== undefined) add('Square feet', formatNumber(listing.sqft));
    if (listing.garage !== undefined) add('Garage', `${listing.garage}-car`);
    add('Lot size', listing.lotSize);
  }

  if (listing.features && listing.features.length > 0) add('Features', featureList(listing.features));

  if (facts.length === 0 && listing.placeholder) {
    facts.push({
      label: 'Details',
      value: placeholder(
        listing.category === 'lot'
          ? 'neighborhood, address, price, lot size'
          : 'neighborhood, address, price, beds, baths, square feet',
      ),
    });
  }
  return facts;
}
