import type { APIRoute } from 'astro';
import { listings } from '../data/homes.ts';
import { gallerySubNav, homesSubNav } from '../data/navigation.ts';
import { projects } from '../data/projects.ts';
import { sitemapXml } from '../lib/sitemap.ts';

// The list of pages search engines should read. It is rebuilt from the data on every build,
// so a new home, lot or project is included automatically.
export const GET: APIRoute = ({ site }) => {
  const paths = [
    '/',
    ...homesSubNav.map((link) => link.href),
    ...listings.map((listing) => `/homes/${listing.slug}/`),
    ...gallerySubNav.map((link) => link.href),
    ...projects.map((project) => `/gallery/${project.slug}/`),
    '/about/',
    '/inventory/',
  ];
  return new Response(sitemapXml(paths, site!.href), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
