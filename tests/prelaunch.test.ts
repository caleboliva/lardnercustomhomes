import assert from 'node:assert/strict';
import test from 'node:test';
import type { Listing, Project } from '../src/data/types.ts';
import { prelaunchProblems } from '../src/lib/prelaunch.ts';

const realListing: Listing = {
  slug: '4103-saranac',
  title: '4103 Saranac',
  category: 'available',
  status: 'For Sale',
  cover: 'front.jpg',
  photos: [{ file: 'front.jpg', room: 'exterior', alt: 'Front of the home' }],
  placeholder: false,
};

const realProject: Project = {
  slug: 'midway-hollow-modern',
  name: 'Midway Hollow Modern',
  cover: 'front.jpg',
  photos: [{ file: 'front.jpg', room: 'exterior', alt: 'Front elevation' }],
  featured: true,
  placeholder: false,
};

const ready = {
  listings: [realListing],
  projects: [realProject],
  copy: { home: { title: 'Real words', body: ['More real words'] } },
  heroImage: 'hero.jpg',
  formEndpoint: 'https://forms.example/submit',
};

test('a site with real content, a hero photo and a connected form has nothing to fix', () => {
  assert.deepEqual(prelaunchProblems(ready), []);
});

test('sample homes and sample projects are reported by name', () => {
  const problems = prelaunchProblems({
    ...ready,
    listings: [realListing, { ...realListing, slug: 'sample-home-01', title: 'Sample Home 01', placeholder: true }],
    projects: [{ ...realProject, slug: 'sample-project-01', name: 'Sample Project 01', placeholder: true }],
  });
  assert.equal(problems.length, 2);
  assert.match(problems[0] ?? '', /1 sample .*homes\.ts.*Sample Home 01/);
  assert.match(problems[1] ?? '', /1 sample .*projects\.ts.*Sample Project 01/);
});

test('real entries that still have empty photo slots are reported', () => {
  const problems = prelaunchProblems({
    ...ready,
    listings: [{ ...realListing, cover: null }],
    projects: [{ ...realProject, photos: [{ file: null, room: 'kitchen', alt: 'Kitchen' }] }],
  });
  assert.deepEqual(problems, [
    '4103 Saranac has 1 photo without a file (src/data/homes.ts).',
    'Midway Hollow Modern has 1 photo without a file (src/data/projects.ts).',
  ]);
});

test('placeholder text anywhere in the page copy is reported with its location', () => {
  const problems = prelaunchProblems({
    ...ready,
    copy: { homes: { buildOnYourLot: { body: ['Fine.', '[Placeholder: how it works]'] } } },
  });
  assert.deepEqual(problems, ['Placeholder text remains at copy.homes.buildOnYourLot.body[1] (src/data/copy.ts).']);
});

test('a missing hero photo is reported', () => {
  const problems = prelaunchProblems({ ...ready, heroImage: null });
  assert.equal(problems.length, 1);
  assert.match(problems[0] ?? '', /hero photo/);
});

test('an unconnected form does not block launch, because the page then shows Colin\'s phone and email instead', () => {
  assert.deepEqual(prelaunchProblems({ ...ready, formEndpoint: '' }), []);
});
