import assert from 'node:assert/strict';
import test from 'node:test';
import { swipeDirection, wrapIndex } from '../src/lib/carousel.ts';

test('wrapIndex() leaves an index inside the set alone', () => {
  assert.equal(wrapIndex(0, 5), 0);
  assert.equal(wrapIndex(4, 5), 4);
});

test('wrapIndex() wraps past either end', () => {
  assert.equal(wrapIndex(5, 5), 0);
  assert.equal(wrapIndex(-1, 5), 4);
  assert.equal(wrapIndex(-6, 5), 4);
});

test('wrapIndex() always returns 0 for a set of one or an empty set', () => {
  assert.equal(wrapIndex(1, 1), 0);
  assert.equal(wrapIndex(-1, 1), 0);
  assert.equal(wrapIndex(3, 0), 0);
});

test('swipeDirection() reads a leftward swipe as next and a rightward swipe as previous', () => {
  assert.equal(swipeDirection(-80, 5), 'next');
  assert.equal(swipeDirection(80, -5), 'prev');
});

test('swipeDirection() ignores short movements and mostly vertical ones', () => {
  assert.equal(swipeDirection(-20, 0), null);
  assert.equal(swipeDirection(-80, 90), null);
  assert.equal(swipeDirection(0, 0), null);
});
