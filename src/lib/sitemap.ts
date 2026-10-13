const escapeXml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** A sitemap listing each path once, as a full web address. */
export function sitemapXml(paths: string[], origin: string): string {
  const urls = [...new Set(paths)].map((path) => `  <url><loc>${escapeXml(new URL(path, origin).href)}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}
