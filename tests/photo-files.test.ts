import assert from 'node:assert/strict';
import test from 'node:test';
import { findMissingPhotos } from '../src/lib/photo-files.ts';

const disk: Record<string, string[]> = {
  'projects/one': ['front.jpg', 'IMG_0001.JPG'],
  'homes/two': ['kitchen.webp'],
};
const readDir = (dir: string) => disk[dir] ?? [];

test('findMissingPhotos() accepts names that match a file exactly', () => {
  const refs = [
    { dir: 'projects/one', file: 'front.jpg' },
    { dir: 'projects/one', file: 'IMG_0001.JPG' },
    { dir: 'homes/two', file: 'kitchen.webp' },
  ];
  assert.deepEqual(findMissingPhotos(refs, readDir), []);
});

test('findMissingPhotos() reports a name that differs only by upper or lower case', () => {
  assert.deepEqual(findMissingPhotos([{ dir: 'projects/one', file: 'img_0001.jpg' }], readDir), [
    'projects/one/img_0001.jpg',
  ]);
});

test('findMissingPhotos() reports a mistyped name and a folder that does not exist', () => {
  const refs = [
    { dir: 'projects/one', file: 'fornt.jpg' },
    { dir: 'projects/three', file: 'front.jpg' },
  ];
  assert.deepEqual(findMissingPhotos(refs, readDir), ['projects/one/fornt.jpg', 'projects/three/front.jpg']);
});

test('findMissingPhotos() reports file types the site cannot use, such as HEIC', () => {
  const heicDisk = (dir: string) => (dir === 'projects/one' ? ['photo.heic'] : []);
  assert.deepEqual(findMissingPhotos([{ dir: 'projects/one', file: 'photo.heic' }], heicDisk), [
    'projects/one/photo.heic',
  ]);
});
