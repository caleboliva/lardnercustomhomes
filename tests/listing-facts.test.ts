import assert from 'node:assert/strict';
import test from 'node:test';
import type { Listing } from '../src/data/types.ts';
import { listingFacts } from '../src/lib/listing-facts.ts';

const base: Listing = {
  slug: 'x',
  title: 'X',
  category: 'lot',
  status: 'Available',
  cover: null,
  photos: [],
  placeholder: false,
};

const facts = (over: Partial<Listing>) => listingFacts({ ...base, ...over }).map((f) => `${f.label}: ${f.value}`);

test('a lot lists its neighborhood, price, size, the planned home and its features', () => {
  assert.deepEqual(
    facts({
      neighborhood: 'Preston Hollow',
      price: '$3,995,000',
      lotSize: '75 × 140 ft',
      beds: 4,
      baths: 5,
      garage: 2,
      features: ['Game room', 'Flex room'],
    }),
    [
      'Neighborhood: Preston Hollow',
      'Price: $3,995,000',
      'Lot size: 75 × 140 ft',
      'Planned home: 4 beds · 5 baths · 2-car garage',
      'Features: Game room, flex room',
    ],
  );
});

test('a lot planned for several units says how many', () => {
  assert.deepEqual(facts({ lotSize: '11,360 sq ft', units: 6, beds: 2, baths: 2.5, garage: 2 }), [
    'Lot size: 11,360 sq ft',
    'Planned homes: 6 units · 2 beds · 2.5 baths · 2-car garage',
  ]);
});

test('a home lists its own rooms rather than a plan', () => {
  assert.deepEqual(
    facts({ category: 'available', status: 'For Sale', beds: 4, baths: 1, sqft: 4250, garage: 1, features: ['Pool'] }),
    ['Bedrooms: 4', 'Bathrooms: 1', 'Square feet: 4,250', 'Garage: 1-car', 'Features: Pool'],
  );
});

test('only the facts that exist are listed', () => {
  assert.deepEqual(facts({ category: 'available', neighborhood: 'Midway Hollow', lotSize: 'Approx. 14,000 sq ft' }), [
    'Neighborhood: Midway Hollow',
    'Lot size: Approx. 14,000 sq ft',
  ]);
  assert.deepEqual(facts({}), []);
});

test('a sample entry with no facts shows a labelled placeholder', () => {
  assert.deepEqual(facts({ placeholder: true }), ['Details: [Placeholder: neighborhood, address, price, lot size]']);
});
