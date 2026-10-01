import { ROOM_LABELS, ROOM_PAGES } from './types.ts';

export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

const homesChildren: NavLink[] = [
  { label: 'Available', href: '/homes/available/' },
  { label: 'Lots', href: '/homes/lots/' },
  { label: 'Build on Your Lot', href: '/homes/build-on-your-lot/' },
];

const galleryChildren: NavLink[] = ROOM_PAGES.map((room) => ({
  label: ROOM_LABELS[room],
  href: `/gallery/${room}/`,
}));

/** The logo sits between `left` and `right` on desktop. */
export const primaryNav: { left: NavItem[]; right: NavItem[] } = {
  left: [
    { label: 'Homes', href: '/homes/', children: homesChildren },
    { label: 'Gallery', href: '/gallery/', children: galleryChildren },
  ],
  right: [
    { label: 'About', href: '/about/' },
    { label: 'Inventory', href: '/inventory/' },
  ],
};

export const homesSubNav: NavLink[] = [{ label: 'All Homes', href: '/homes/' }, ...homesChildren];
export const gallerySubNav: NavLink[] = [{ label: 'Projects', href: '/gallery/' }, ...galleryChildren];
