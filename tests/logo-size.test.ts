import assert from 'node:assert/strict';
import test from 'node:test';
import { logoHeight } from '../src/lib/logo-size.ts';

test('logoHeight() draws a square logo 3rem tall, scaled on request', () => {
  assert.equal(logoHeight(120, 120), 3);
  assert.equal(logoHeight(120, 120, 0.5), 1.5);
});

test('logoHeight() draws wider logos shorter, but still wider', () => {
  const shapes = [
    [120, 120],
    [300, 116],
    [760, 160],
    [906, 160],
  ];
  const heights = shapes.map(([w, h]) => logoHeight(w, h));
  const widths = shapes.map(([w, h], i) => (heights[i] * w) / h);
  for (let i = 1; i < shapes.length; i++) {
    assert.ok(heights[i] < heights[i - 1], `height ${i}`);
    assert.ok(widths[i] > widths[i - 1], `width ${i}`);
  }
});
