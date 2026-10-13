import assert from 'node:assert/strict';
import test from 'node:test';
import { mapEmbedUrl, mapLinkUrl } from '../src/lib/maps.ts';

test('the map link opens Google Maps with the address as the search', () => {
  assert.equal(
    mapLinkUrl('6616 Deloache Avenue, Dallas, TX'),
    'https://www.google.com/maps/search/?api=1&query=6616%20Deloache%20Avenue%2C%20Dallas%2C%20TX',
  );
});

test('the embedded map pins the same address', () => {
  assert.equal(
    mapEmbedUrl('301 Thompson Drive, Richardson, TX'),
    'https://www.google.com/maps?q=301%20Thompson%20Drive%2C%20Richardson%2C%20TX&z=16&output=embed',
  );
});

test('characters with a meaning in a web address are escaped', () => {
  assert.match(mapLinkUrl('1 A & B St #2, Dallas, TX'), /query=1%20A%20%26%20B%20St%20%232%2C%20Dallas%2C%20TX$/);
});
