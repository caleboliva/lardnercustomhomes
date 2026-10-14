/*
  PRESS
  Articles that have covered Colin Lardner and his projects, newest first. They appear on the
  About page (under "Press") and as an "As featured in" line on the home page.

  Source: the Press & Media page on lardnergroup.com, checked against each article in
  October 2026. Only add coverage that has actually been published; link to the article itself.
*/

export type PressItem = {
  outlet: string;
  title: string;
  /** Month and year, as shown on the site. */
  date: string;
  /** One line on what the piece covers. */
  summary: string;
  href: string;
  /** The project in the gallery that the piece is about, if any. */
  project?: { label: string; href: string };
};

export const press: PressItem[] = [
  {
    outlet: 'Modern Dallas',
    title: 'Small and Nimble',
    date: 'July 2025',
    summary: 'A profile of Colin Lardner and the many chapters of his life in real estate.',
    href: 'https://moderndallas.net/small-and-nimble-colin-lardner/',
  },
  {
    outlet: "Candy's Dirt",
    title: "This Sleek Contemporary Brings Scandinavian 'Hygge' to Midway Hollow",
    date: 'March 2025',
    summary: 'A look at 3880 Durango Drive, built by Lardner Group Development.',
    href: 'https://candysdirt.com/2025/03/21/this-sleek-contemporary-brings-scandinavian-hygge-to-midway-hollow/',
    project: { label: '3880 Durango', href: '/gallery/3880-durango/' },
  },
  {
    outlet: 'Texas Architect',
    title: 'A Step Up',
    date: 'July 2019',
    summary: 'Ascend, five townhouses at Burlew and Scurry streets in Old East Dallas, developed by Colin Lardner with the architects FAR + DANG.',
    href: 'https://magazine.texasarchitects.org/2019/07/15/a-step-up/',
    project: { label: '4401 Scurry Street', href: '/gallery/4401-scurry-street/' },
  },
  {
    outlet: 'Haven',
    title: 'Unbelievable Texas Homes Under $600K',
    date: 'August 2018',
    summary: 'Includes the Ascend townhouses, the latest development from Lardner Group at the time.',
    href: 'https://havenlifestyles.com/unbelievable-texas-homes-under-600k/',
    project: { label: '4401 Scurry Street', href: '/gallery/4401-scurry-street/' },
  },
  {
    outlet: 'GlobeSt.',
    title: 'Developer Sees Corporate Relocations as Just Beginning',
    date: 'September 2017',
    summary: 'Colin Lardner on the transformation of East Dallas.',
    href: 'https://www.globest.com/2017/09/19/developer-sees-corporate-relocations-as-just-beginning/',
  },
];

/** Each outlet once, in the order above, for the home page line. */
export function pressOutlets(items: PressItem[] = press): PressItem[] {
  return items.filter((item, i) => items.findIndex((other) => other.outlet === item.outlet) === i);
}
