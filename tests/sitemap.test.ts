import assert from 'node:assert/strict';
import test from 'node:test';
import { sitemapXml } from '../src/lib/sitemap.ts';

test('the sitemap lists each page once as a full address', () => {
  const xml = sitemapXml(['/', '/homes/', '/homes/'], 'https://example.com');
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
  assert.deepEqual(xml.match(/<loc>[^<]+<\/loc>/g), ['<loc>https://example.com/</loc>', '<loc>https://example.com/homes/</loc>']);
});

test('characters with a meaning in XML are escaped', () => {
  assert.ok(sitemapXml(['/a/?b=1&c=2'], 'https://example.com').includes('<loc>https://example.com/a/?b=1&amp;c=2</loc>'));
});
