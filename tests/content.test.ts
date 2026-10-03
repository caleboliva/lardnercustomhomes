import assert from 'node:assert/strict';
import test from 'node:test';
import type { Listing, Project } from '../src/data/types.ts';
import { featuredProjects, filterListings, photosForRoom, previewPhotos } from '../src/lib/content.ts';
import { formatNumber, isPlaceholder, placeholder, specLine } from '../src/lib/format.ts';
import { isCurrentPage, isCurrentSection } from '../src/lib/nav-utils.ts';

const listing = (over: Partial<Listing>): Listing => ({
  slug: 'a',
  title: 'A',
  category: 'available',
  status: 'For Sale',
  cover: null,
  photos: [],
  placeholder: false,
  ...over,
});

const project = (over: Partial<Project>): Project => ({
  slug: 'p',
  name: 'P',
  cover: null,
  photos: [],
  featured: false,
  placeholder: false,
  ...over,
});

test('placeholder() wraps the need and isPlaceholder() recognises it', () => {
  assert.equal(placeholder('a bio'), '[Placeholder: a bio]');
  assert.equal(isPlaceholder('[Placeholder: a bio]'), true);
  assert.equal(isPlaceholder('A real sentence.'), false);
});

test('formatNumber() adds thousands separators', () => {
  assert.equal(formatNumber(4250), '4,250');
  assert.equal(formatNumber(980), '980');
});

test('specLine() joins the specs that exist, with singular and plural', () => {
  assert.equal(specLine(listing({ beds: 4, baths: 1, sqft: 4250 })), '4 beds · 1 bath · 4,250 sq ft');
  assert.equal(specLine(listing({ category: 'lot', lotSize: '0.4 acre' })), '0.4 acre lot');
});

test('specLine() describes a lot by its size and the home planned for it', () => {
  assert.equal(
    specLine(listing({ category: 'lot', lotSize: '75 × 140 ft', beds: 4, baths: 5 })),
    '75 × 140 ft lot · plans for 4 beds, 5 baths',
  );
  assert.equal(
    specLine(listing({ category: 'lot', lotSize: '11,360 sq ft', units: 6, beds: 2, baths: 2.5 })),
    '11,360 sq ft lot · plans for 6 units',
  );
  assert.equal(specLine(listing({ category: 'lot', beds: 4 })), 'Plans for 4 beds');
});

test('specLine() is empty for a real listing with no specs and a labelled placeholder for a sample', () => {
  assert.equal(specLine(listing({})), '');
  assert.equal(specLine(listing({ placeholder: true })), '[Placeholder: beds, baths, sq ft]');
  assert.equal(specLine(listing({ placeholder: true, category: 'lot' })), '[Placeholder: lot size]');
});

test('filterListings() returns everything with no category and only matches with one', () => {
  const all = [listing({ slug: 'h' }), listing({ slug: 'l', category: 'lot' })];
  assert.deepEqual(filterListings(all).map((l) => l.slug), ['h', 'l']);
  assert.deepEqual(filterListings(all, 'lot').map((l) => l.slug), ['l']);
});

test('filterListings() returns an empty list when a category has no entries', () => {
  assert.deepEqual(filterListings([listing({})], 'lot'), []);
  assert.equal(filterListings([listing({})], 'available').length, 1);
});

test('photosForRoom() collects matching photos across projects in order', () => {
  const all = [
    project({
      slug: 'one',
      photos: [
        { file: null, room: 'kitchen', alt: 'k1' },
        { file: null, room: 'bath', alt: 'b1' },
      ],
    }),
    project({ slug: 'two', photos: [{ file: null, room: 'kitchen', alt: 'k2' }] }),
  ];
  const result = photosForRoom(all, 'kitchen');
  assert.deepEqual(result.map((r) => `${r.project.slug}:${r.photo.alt}`), ['one:k1', 'two:k2']);
  assert.deepEqual(photosForRoom(all, 'living'), []);
});

test('featuredProjects() keeps only featured projects, up to the limit', () => {
  const all = ['a', 'b', 'c', 'd'].map((slug) => project({ slug, featured: slug !== 'b' }));
  assert.deepEqual(featuredProjects(all, 2).map((p) => p.slug), ['a', 'c']);
  assert.deepEqual(featuredProjects(all).map((p) => p.slug), ['a', 'c', 'd']);
});

test('previewPhotos() takes the first few photos of each project, up to the limit', () => {
  const photos = (n: number) =>
    Array.from({ length: n }, (_, i) => ({ file: null, room: 'other' as const, alt: `x${i}` }));
  const all = [
    project({ slug: 'one', photos: photos(3) }),
    project({ slug: 'two', photos: photos(1) }),
    project({ slug: 'three', photos: photos(3) }),
  ];
  const result = previewPhotos(all, 2, 4).map((r) => `${r.project.slug}:${r.photo.alt}`);
  assert.deepEqual(result, ['one:x0', 'one:x1', 'two:x0', 'three:x0']);
});

test('isCurrentPage() matches exactly, ignoring a missing trailing slash', () => {
  assert.equal(isCurrentPage('/homes/', '/homes/'), true);
  assert.equal(isCurrentPage('/homes', '/homes/'), true);
  assert.equal(isCurrentPage('/homes/lots/', '/homes/'), false);
});

test('isCurrentSection() matches a page and everything beneath it, but "/" only matches itself', () => {
  assert.equal(isCurrentSection('/homes/lots/', '/homes/'), true);
  assert.equal(isCurrentSection('/gallery/sample-project-01/', '/gallery/'), true);
  assert.equal(isCurrentSection('/about/', '/homes/'), false);
  assert.equal(isCurrentSection('/homes/', '/'), false);
  assert.equal(isCurrentSection('/', '/'), true);
});
