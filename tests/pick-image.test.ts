import assert from 'node:assert/strict';
import test from 'node:test';
import { pickImage } from '../src/lib/pick-image.ts';

const files = {
  '../assets/projects/one/front.jpg': { default: 'FRONT' },
  '../assets/site/hero.webp': { default: 'HERO' },
};

test('pickImage() finds a file by its path under src/assets', () => {
  assert.equal(pickImage(files, 'projects/one/front.jpg'), 'FRONT');
  assert.equal(pickImage(files, 'site/hero.webp'), 'HERO');
});

test('pickImage() returns null for a file that is not on disk, so a placeholder shows instead of a broken image', () => {
  assert.equal(pickImage(files, 'projects/one/typo.jpg'), null);
  assert.equal(pickImage(files, 'projects/two/front.jpg'), null);
});

test('pickImage() returns null when no file is named', () => {
  assert.equal(pickImage(files, null), null);
  assert.equal(pickImage(files, ''), null);
});
