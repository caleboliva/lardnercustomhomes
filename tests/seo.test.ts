import assert from 'node:assert/strict';
import test from 'node:test';
import type { Listing, Project } from '../src/data/types.ts';
import { pageSeo, siteKeywords } from '../src/data/seo.ts';
import {
  breadcrumbSchema,
  businessSchema,
  keywordList,
  listingSchema,
  listingSeo,
  parseAddress,
  parsePrice,
  projectSeo,
} from '../src/lib/seo.ts';

const home: Listing = {
  slug: '4103-saranac',
  title: '4103 Saranac',
  category: 'available',
  status: 'For Sale',
  neighborhood: 'Midway Hollow',
  address: '4103 Saranac Drive, Dallas, TX 75220',
  price: '$2,995,000',
  beds: 4,
  baths: 5,
  sqft: 4689,
  lotSize: 'Approx. 14,000 sq ft (0.32 acres)',
  cover: null,
  photos: [],
  placeholder: false,
};

const lot: Listing = {
  slug: '6616-deloache',
  title: '6616 Deloache',
  category: 'lot',
  status: 'Available',
  neighborhood: 'Preston Hollow',
  address: '6616 Deloache Avenue, Dallas, TX',
  lotSize: '10,500 sq ft',
  beds: 4,
  baths: 5,
  cover: null,
  photos: [],
  placeholder: false,
};

test('an address splits into street, city, state and ZIP', () => {
  assert.deepEqual(parseAddress('4103 Saranac Drive, Dallas, TX 75220'), {
    street: '4103 Saranac Drive',
    city: 'Dallas',
    state: 'TX',
    zip: '75220',
  });
  assert.deepEqual(parseAddress('301 Thompson Drive, Richardson, TX'), {
    street: '301 Thompson Drive',
    city: 'Richardson',
    state: 'TX',
    zip: undefined,
  });
  assert.equal(parseAddress('somewhere in Dallas'), null);
});

test('a price becomes a number, or nothing when it is not a plain figure', () => {
  assert.equal(parsePrice('$2,995,000'), 2995000);
  assert.equal(parsePrice('$850,000 (lot)'), 850000);
  assert.equal(parsePrice('TBD'), undefined);
  assert.equal(parsePrice(undefined), undefined);
});

test('keywords put the page first, then the site, without repeats', () => {
  assert.deepEqual(keywordList(['lots for sale Dallas', 'custom home builder Dallas'], ['custom home builder Dallas', 'Colin Lardner']), [
    'lots for sale Dallas',
    'custom home builder Dallas',
    'Colin Lardner',
  ]);
});

test('a home for sale is described by where it is and what it has', () => {
  const seo = listingSeo(home);
  assert.equal(seo.title, '4103 Saranac, Midway Hollow: Home for Sale');
  assert.equal(
    seo.description,
    '4103 Saranac in Midway Hollow: 4 beds · 5 baths · 4,689 sq ft · Approx. 14,000 sq ft (0.32 acres) lot. For sale from Lardner Custom Homes, a Dallas custom home builder.',
  );
  assert.ok(seo.keywords.includes('4103 Saranac Drive'));
  assert.ok(seo.keywords.includes('Midway Hollow homes for sale'));
});

test('a lot is described as a place to build', () => {
  const seo = listingSeo(lot);
  assert.equal(seo.title, '6616 Deloache, Preston Hollow: Custom Home Lot');
  assert.equal(
    seo.description,
    '6616 Deloache in Preston Hollow: 10,500 sq ft lot · plans for 4 beds, 5 baths. Available from Lardner Custom Homes, a Dallas custom home builder.',
  );
  assert.ok(seo.keywords.includes('Preston Hollow lots'));
});

test('a listing with no neighborhood still gets a sensible title', () => {
  assert.equal(listingSeo({ ...lot, neighborhood: undefined }).title, '6616 Deloache: Custom Home Lot');
});

test('a project is described by the rooms it shows', () => {
  const project: Project = {
    slug: 'p',
    name: 'Durango Drive',
    cover: null,
    photos: [
      { file: 'a.jpg', room: 'exterior', alt: 'a' },
      { file: 'b.jpg', room: 'kitchen', alt: 'b' },
      { file: 'c.jpg', room: 'other', alt: 'c' },
    ],
    featured: false,
    placeholder: false,
  };
  const seo = projectSeo(project);
  assert.equal(seo.title, 'Durango Drive: Custom Home Photos');
  assert.equal(seo.description, 'Photos of Durango Drive by Lardner Custom Homes, a Dallas custom home builder: exterior and kitchen.');
});

test('a remodel is named as one in its title and description', () => {
  const project: Project = {
    slug: 'p',
    name: 'Purple Sage Road',
    kind: 'Remodel',
    cover: null,
    photos: [{ file: 'a.jpg', room: 'kitchen', alt: 'a' }],
    featured: false,
    placeholder: false,
  };
  const seo = projectSeo(project);
  assert.equal(seo.title, 'Purple Sage Road: Remodel Photos');
  assert.equal(seo.description, 'Photos of the Purple Sage Road remodel by Lardner Custom Homes, a Dallas custom home builder: kitchen.');
});

test('the business is published as a general contractor in Dallas', () => {
  const schema = businessSchema({ image: 'https://example.com/a.jpg', logo: 'https://example.com/l.png' });
  assert.equal(schema['@type'], 'GeneralContractor');
  assert.equal(schema.telephone, '+18445273637');
  assert.equal(schema.address.addressLocality, 'Dallas');
  assert.ok(schema.areaServed.length > 3);
  assert.ok(schema.sameAs.every((url: string) => url.startsWith('https://')));
});

test('a listing is published with its address, size and price', () => {
  const schema = listingSchema(home, 'https://example.com/homes/4103-saranac/', ['https://example.com/a.jpg']);
  assert.equal(schema['@type'], 'RealEstateListing');
  assert.equal(schema.about['@type'], 'SingleFamilyResidence');
  assert.equal(schema.about.address?.streetAddress, '4103 Saranac Drive');
  assert.equal(schema.about.numberOfBedrooms, 4);
  assert.equal(schema.about.floorSize?.value, 4689);
  assert.deepEqual(schema.offers, {
    '@type': 'Offer',
    price: 2995000,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  });
});

test('a lot with no price is published without an offer', () => {
  const schema = listingSchema(lot, 'https://example.com/homes/6616-deloache/', []);
  assert.equal(schema.about['@type'], 'Place');
  assert.equal(schema.offers, undefined);
  assert.equal(schema.about.numberOfBedrooms, undefined);
});

test('breadcrumbs follow the address of the page', () => {
  const crumbs = breadcrumbSchema('/homes/6616-deloache/', '6616 Deloache', 'https://example.com');
  assert.deepEqual(
    crumbs?.itemListElement.map((item: { name: string; item: string }) => [item.name, item.item]),
    [
      ['Home', 'https://example.com/'],
      ['Homes', 'https://example.com/homes/'],
      ['6616 Deloache', 'https://example.com/homes/6616-deloache/'],
    ],
  );
  assert.equal(breadcrumbSchema('/', 'Home', 'https://example.com'), null);
  assert.equal(breadcrumbSchema('/about/', 'About', 'https://example.com')?.itemListElement.length, 2);
});

test('search titles are short enough to show in full, and every page has keywords', () => {
  for (const [name, page] of Object.entries(pageSeo)) {
    assert.ok(page.title.length <= 45, `${name} title is ${page.title.length} characters`);
    assert.ok(page.description.length >= 70 && page.description.length <= 200, `${name} description is ${page.description.length} characters`);
    assert.ok(page.keywords.length >= 3, `${name} needs keywords`);
  }
  assert.ok(siteKeywords.length >= 5);
});
