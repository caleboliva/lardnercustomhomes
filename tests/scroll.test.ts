import assert from 'node:assert/strict';
import test from 'node:test';
import { headerOverHero, heroProgress, nextHeaderState, revealAmount } from '../src/lib/scroll.ts';

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

test('hero progress runs from 0 at the top to 1 when the hero is released', () => {
  assert.equal(heroProgress(0, 600), 0);
  assert.equal(heroProgress(150, 600), 0.25);
  assert.equal(heroProgress(900, 600), 1);
  assert.equal(heroProgress(-40, 600), 0);
});

test('a hero that is not pinned counts as finished, so its words always show', () => {
  assert.equal(heroProgress(0, 0), 1);
  assert.equal(revealAmount(heroProgress(0, 0)), 1);
});

test('the words stay hidden at first, then come in and stay', () => {
  assert.equal(revealAmount(0), 0);
  assert.equal(revealAmount(0.06), 0);
  assert.ok(revealAmount(0.3) > 0.4 && revealAmount(0.3) < 0.6);
  assert.equal(revealAmount(0.55), 1);
  assert.equal(revealAmount(1), 1);
});

test('the header is see-through only while a pinned hero fills the screen', () => {
  const hero = { top: 0, height: 1400, pinned: 800 };
  assert.equal(headerOverHero(0, hero, 70), true);
  assert.equal(headerOverHero(600, hero, 70), true);
  assert.equal(headerOverHero(601, hero, 70), false);
});

test('over a hero that is not pinned, the header stays see-through until the hero has passed', () => {
  const hero = { top: 0, height: 800, pinned: 800 };
  assert.equal(headerOverHero(0, hero, 70), true);
  assert.equal(headerOverHero(729, hero, 70), true);
  assert.equal(headerOverHero(730, hero, 70), false);
});
