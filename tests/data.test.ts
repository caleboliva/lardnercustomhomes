import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { copy } from '../src/data/copy.ts';
import { listings } from '../src/data/homes.ts';
import { gallerySubNav, homesSubNav, primaryNav } from '../src/data/navigation.ts';
import { projects } from '../src/data/projects.ts';
import { site } from '../src/data/site.ts';
import { RESERVED_LISTING_SLUGS, RESERVED_PROJECT_SLUGS, ROOM_PAGES } from '../src/data/types.ts';
import { findMissingPhotos, type PhotoRef } from '../src/lib/photo-files.ts';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ROOMS: readonly string[] = [...ROOM_PAGES, 'other'];

function assertUnique(values: string[], what: string): void {
  assert.equal(new Set(values).size, values.length, `${what} must be unique`);
}

test('listing slugs are unique, URL-safe and do not collide with fixed pages', () => {
  const slugs = listings.map((l) => l.slug);
  assertUnique(slugs, 'listing slugs');
  for (const slug of slugs) {
    assert.match(slug, SLUG);
    assert.equal(RESERVED_LISTING_SLUGS.includes(slug), false, `"${slug}" is reserved`);
  }
});

test('project slugs are unique, URL-safe and do not collide with room pages', () => {
  const slugs = projects.map((p) => p.slug);
  assertUnique(slugs, 'project slugs');
  for (const slug of slugs) {
    assert.match(slug, SLUG);
    assert.equal(RESERVED_PROJECT_SLUGS.includes(slug), false, `"${slug}" is reserved`);
  }
});

test('every photo has alt text and a known room', () => {
  const photos = [...listings.flatMap((l) => l.photos), ...projects.flatMap((p) => p.photos)];
  assert.ok(photos.length > 0);
  for (const photo of photos) {
    assert.ok(photo.alt.trim().length > 0, 'photo alt text must not be empty');
    assert.ok(ROOMS.includes(photo.room), `unknown room "${photo.room}"`);
  }
});

test('sample entries are labelled so they cannot be mistaken for real ones', () => {
  for (const l of listings.filter((x) => x.placeholder)) assert.match(l.title, /^Sample /);
  for (const p of projects.filter((x) => x.placeholder)) assert.match(p.name, /^Sample /);
});

test('while only sample data is in place, it exercises every page', () => {
  // Real content is free to have no lots, or no bath photos. This only guards the samples.
  const samplesOnly = listings.every((l) => l.placeholder) && projects.every((p) => p.placeholder);
  if (!samplesOnly) return;
  assert.ok(listings.some((l) => l.category === 'available'));
  assert.ok(listings.some((l) => l.category === 'lot'));
  for (const room of ROOM_PAGES) {
    assert.ok(projects.some((p) => p.photos.some((photo) => photo.room === room)), `no ${room} photo`);
  }
  assert.ok(projects.some((p) => p.featured));
});

test('contact details are well formed, whatever their values', () => {
  assert.match(site.phone.href, /^tel:\+?\d{10,11}$/);
  assert.ok(site.phone.display.trim().length > 0);
  assert.match(site.email.href, /^mailto:[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
  assert.equal(site.email.href, `mailto:${site.email.display}`);
  assert.ok(site.address.trim().length > 0);
  for (const profile of site.social) assert.match(profile.href, /^https:\/\/\S+$/, profile.name);
});

test('the two TREC documents the footer links to exist', () => {
  assert.equal(site.legal.length, 2);
  for (const doc of site.legal) {
    assert.match(doc.href, /^\/documents\/[a-z0-9-]+\.pdf$/);
    assert.ok(existsSync(join('public', doc.href)), `${doc.href} is missing from public/`);
  }
});

test('every photo named in the data exists on disk with exactly that name', () => {
  const refs: PhotoRef[] = [];
  for (const listing of listings) {
    const dir = `homes/${listing.slug}`;
    if (listing.cover) refs.push({ dir, file: listing.cover });
    for (const photo of listing.photos) if (photo.file) refs.push({ dir, file: photo.file });
  }
  for (const project of projects) {
    const dir = `projects/${project.slug}`;
    if (project.cover) refs.push({ dir, file: project.cover });
    for (const photo of project.photos) if (photo.file) refs.push({ dir, file: photo.file });
  }
  if (copy.home.hero.image) refs.push({ dir: 'site', file: copy.home.hero.image });

  // readdirSync, not existsSync: Windows treats names as case-insensitive, web servers do not.
  const readDir = (dir: string) => {
    try {
      return readdirSync(join('src', 'assets', dir));
    } catch {
      return [];
    }
  };
  assert.deepEqual(
    findMissingPhotos(refs, readDir),
    [],
    'These photos are named in src/data but not found in src/assets (check spelling, capital letters and file type)',
  );
});

test('navigation links are site-relative and end with a slash', () => {
  const top = [...primaryNav.left, ...primaryNav.right];
  const links = [...top, ...top.flatMap((i) => i.children ?? []), ...homesSubNav, ...gallerySubNav];
  for (const link of links) assert.match(link.href, /^\/[a-z0-9/-]*\/$/, link.href);
});

test('copy has no empty strings', () => {
  const walk = (value: unknown, path: string): void => {
    if (typeof value === 'string') assert.ok(value.trim().length > 0, `${path} is empty`);
    else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`));
    else if (value && typeof value === 'object') {
      for (const [key, v] of Object.entries(value)) walk(v, `${path}.${key}`);
    }
  };
  walk(copy, 'copy');
});
