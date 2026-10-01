import assert from 'node:assert/strict';
import test from 'node:test';
import { nextHeaderState } from '../src/lib/scroll.ts';

test('the header is always shown near the top of the page', () => {
  assert.deepEqual(nextHeaderState({ hidden: true, lastY: 500 }, 100), { hidden: false, lastY: 100 });
  assert.deepEqual(nextHeaderState({ hidden: true, lastY: 500 }, 0), { hidden: false, lastY: 0 });
});

test('the header hides when scrolling down past the threshold', () => {
  assert.deepEqual(nextHeaderState({ hidden: false, lastY: 300 }, 340), { hidden: true, lastY: 340 });
});

test('the header shows again when scrolling up', () => {
  assert.deepEqual(nextHeaderState({ hidden: true, lastY: 600 }, 560), { hidden: false, lastY: 560 });
});

test('movements smaller than the delta are ignored so the header does not flicker', () => {
  const prev = { hidden: true, lastY: 600 };
  assert.equal(nextHeaderState(prev, 603), prev);
  assert.equal(nextHeaderState(prev, 596), prev);
});

test('threshold and delta can be overridden', () => {
  const options = { threshold: 50, delta: 2 };
  assert.deepEqual(nextHeaderState({ hidden: false, lastY: 60 }, 63, options), { hidden: true, lastY: 63 });
});
