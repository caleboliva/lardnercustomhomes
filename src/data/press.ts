/*
  PRESS
  Articles that have covered Colin Lardner and his projects, newest first. They appear on the
  About page (under "Press") and as an "As featured in" line on the home page.

  Source: the Press & Media page on lardnergroup.com, checked against each article in
  October 2026. Only add coverage that has actually been published; link to the article itself.

  Logos are files in src/assets/press/, copied from that page and recoloured Midnight Blue so
  they sit quietly beside each other. Sold homes are named by street only (see projects.ts).
*/

export type PressItem = {
  outlet: string;
  title: string;
  /** Month and year, as shown on the site. */
  date: string;
  /** One line on what the piece covers. */
  summary: string;
  href: string;
  /** File name in src/assets/press/: the outlet's logo. Without one, the name is shown. */
  logo?: string;
  /** Draws a logo larger (above 1) or smaller when it looks out of step beside the others. */
  logoScale?: number;
  /** The project in the gallery that the piece is about, if any. */
  project?: { label: string; href: string };
};

export const press: PressItem[] = [
  {
    outlet: 'Modern Dallas',
    title: 'Small and Nimble',
    date: 'March 2025',
    summary: 'A profile of Colin Lardner and the many chapters of his life in real estate.',
    // The magazine's own site (moderndallas.net) now redirects to an advertising page, so this
    // links the issue on Issuu (issue 67, March 2025), as lardnergroup.com does.
    href: 'https://issuu.com/modciti/docs/moderndallas_march_2025',
    logo: 'modern-dallas.png',
  },
  {
    outlet: "Candy's Dirt",
    title: "This Sleek Contemporary Brings Scandinavian 'Hygge' to Midway Hollow",
    date: 'March 2025',
    summary: 'A look at a contemporary home on Durango Drive, built by Lardner Group Development.',
    href: 'https://candysdirt.com/2025/03/21/this-sleek-contemporary-brings-scandinavian-hygge-to-midway-hollow/',
    logo: 'candys-dirt.png',
    // Thin lettering under a pale skyline: it reads small at the shared size.
    logoScale: 1.35,
    project: { label: 'Durango Drive', href: '/gallery/durango-drive/' },
  },
  {
    outlet: 'Texas Architect',
    title: 'A Step Up',
    date: 'July 2019',
    summary: 'Ascend, five townhouses in Old East Dallas, developed by Colin Lardner.',
    href: 'https://magazine.texasarchitects.org/2019/07/15/a-step-up/',
    logo: 'texas-architect.png',
    project: { label: 'Scurry Street', href: '/gallery/scurry-street/' },
  },
  {
    outlet: 'Haven',
    title: 'Unbelievable Texas Homes Under $600K',
    date: 'August 2018',
    summary: 'Includes the Ascend townhouses, the latest development from Lardner Group at the time.',
    href: 'https://havenlifestyles.com/unbelievable-texas-homes-under-600k/',
    logo: 'haven.png',
    project: { label: 'Scurry Street', href: '/gallery/scurry-street/' },
  },
  {
    outlet: 'GlobeSt.',
    title: 'Developer Sees Corporate Relocations as Just Beginning',
    date: 'September 2017',
    summary: 'Colin Lardner on the transformation of East Dallas.',
    href: 'https://www.globest.com/2017/09/19/developer-sees-corporate-relocations-as-just-beginning/',
    logo: 'globest.png',
  },
];

/** Each outlet once, in the order above, for the home page line. */
export function pressOutlets(items: PressItem[] = press): PressItem[] {
  return items.filter((item, i) => items.findIndex((other) => other.outlet === item.outlet) === i);
}
