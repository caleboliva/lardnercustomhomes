import { areaServed, siteKeywords } from '../data/seo.ts';
import type { PageSeo } from '../data/seo.ts';
import { site } from '../data/site.ts';
import { ROOM_PAGES } from '../data/types.ts';
import type { Listing, ListingStatus, Project, RoomPage } from '../data/types.ts';
import { isPlaceholder, specLine } from './format.ts';

const BUILDER = `${site.name}, a Dallas custom home builder`;

export type Address = { street: string; city: string; state: string; zip: string | undefined };

/** Splits "4103 Saranac Drive, Dallas, TX 75220". Returns null when the text is not in that shape. */
export function parseAddress(address: string): Address | null {
  const match = /^(.+?),\s*([^,]+),\s*([A-Z]{2})(?:\s+(\d{5}))?$/.exec(address.trim());
  if (!match) return null;
  return { street: match[1]!, city: match[2]!, state: match[3]!, zip: match[4] };
}

/** "$2,995,000" becomes 2995000. Anything without a dollar figure, such as "TBD", becomes undefined. */
export function parsePrice(price: string | undefined): number | undefined {
  const match = /\$\s*([\d,]+)/.exec(price ?? '');
  return match ? Number(match[1]!.replace(/,/g, '')) : undefined;
}

/** A page's own keywords, then the site-wide ones, with repeats removed. */
export function keywordList(page: string[], shared: string[] = siteKeywords): string[] {
  const seen = new Set<string>();
  return [...page, ...shared].filter((keyword) => {
    const key = keyword.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const HOME_TITLES: Record<ListingStatus, string> = {
  'For Sale': 'Home for Sale',
  Available: 'Home Available',
  Pending: 'Home Under Contract',
  'Coming Soon': 'Home Coming Soon',
  Sold: 'Sold Home',
};

const STATUS_PHRASES: Record<ListingStatus, string> = {
  'For Sale': 'For sale from',
  Available: 'Available from',
  Pending: 'Sale pending, from',
  'Coming Soon': 'Coming soon from',
  Sold: 'Sold by',
};

/** The search title, description and keywords for one home or lot, written from its details. */
export function listingSeo(listing: Listing): PageSeo {
  const isLot = listing.category === 'lot';
  const { title, neighborhood } = listing;
  const specs = specLine(listing);
  const where = neighborhood ? ` in ${neighborhood}` : '';
  const what = specs && !isPlaceholder(specs) ? `: ${specs}` : '';
  const street = listing.address ? parseAddress(listing.address)?.street : undefined;

  const keywords = [street ?? title];
  if (neighborhood) {
    keywords.push(
      ...(isLot
        ? [`${neighborhood} lots`, `${neighborhood} custom home builder`]
        : [`${neighborhood} homes for sale`, `${neighborhood} new construction`]),
    );
  }
  keywords.push(isLot ? 'lots for sale Dallas' : 'new construction homes for sale Dallas');

  return {
    title: `${title}${neighborhood ? `, ${neighborhood}` : ''}: ${isLot ? 'Custom Home Lot' : HOME_TITLES[listing.status]}`,
    description: `${title}${where}${what}. ${STATUS_PHRASES[listing.status]} ${BUILDER}.`,
    keywords,
  };
}

const ROOM_WORDS: Record<RoomPage, string> = {
  exterior: 'exterior',
  kitchen: 'kitchen',
  bath: 'bath',
  living: 'living spaces',
};

function joinList(items: string[]): string {
  return items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

/** The search title, description and keywords for one gallery project. */
export function projectSeo(project: Project): PageSeo {
  const rooms = ROOM_PAGES.filter((room) => project.photos.some((photo) => photo.room === room)).map((room) => ROOM_WORDS[room]);
  const where = project.location ? ` in ${project.location}` : '';
  const kind = project.kind?.toLowerCase();
  const what = kind ? `the ${project.name} ${kind}` : project.name;
  return {
    title: `${project.name}: ${kind ? `${project.kind} Photos` : 'Custom Home Photos'}`,
    description: `Photos of ${what}${where} by ${BUILDER}${rooms.length > 0 ? `: ${joinList(rooms)}` : ''}.`,
    keywords: [project.name, kind ? `${kind} photos` : 'custom home photos', `${site.name} projects`],
  };
}

/* Structured data: the same facts in the form search engines read (schema.org JSON-LD). */

const BUSINESS_ID = `${site.url}/#business`;

function postalAddress(address: Address) {
  return {
    '@type': 'PostalAddress',
    streetAddress: address.street,
    addressLocality: address.city,
    addressRegion: address.state,
    postalCode: address.zip,
    addressCountry: 'US',
  };
}

/** The company, published on every page. Colin is a licensed general contractor, hence the type. */
export function businessSchema(urls: { image?: string; logo?: string }) {
  const digits = site.phone.href.replace(/\D/g, '');
  // site.address is "Dallas, TX 75220": a city, state and ZIP with no street.
  const office = /^([^,]+),\s*([A-Z]{2})(?:\s+(\d{5}))?$/.exec(site.address);
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': BUSINESS_ID,
    name: site.name,
    url: `${site.url}/`,
    description: site.description,
    telephone: `+${digits.length === 10 ? '1' : ''}${digits}`,
    email: site.email.display,
    image: urls.image,
    logo: urls.logo,
    address: {
      '@type': 'PostalAddress',
      addressLocality: office?.[1] ?? 'Dallas',
      addressRegion: office?.[2] ?? 'TX',
      postalCode: office?.[3],
      addressCountry: 'US',
    },
    areaServed: areaServed.map((name) => ({ '@type': 'Place', name })),
    founder: { '@type': 'Person', name: 'Colin Lardner' },
    sameAs: site.social.map((profile) => profile.href),
    knowsAbout: ['Custom home building', 'Residential design and construction', 'New construction homes', 'Residential lots'],
  };
}

const AVAILABILITY: Record<ListingStatus, string> = {
  'For Sale': 'https://schema.org/InStock',
  Available: 'https://schema.org/InStock',
  Pending: 'https://schema.org/LimitedAvailability',
  'Coming Soon': 'https://schema.org/PreOrder',
  Sold: 'https://schema.org/SoldOut',
};

/** One home or lot, with its address, size and price where they are known. */
export function listingSchema(listing: Listing, url: string, images: string[]) {
  const isLot = listing.category === 'lot';
  const address = listing.address ? parseAddress(listing.address) : null;
  const price = parsePrice(listing.price);
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    url,
    description: listingSeo(listing).description,
    image: images.length > 0 ? images : undefined,
    about: {
      '@type': isLot ? 'Place' : 'SingleFamilyResidence',
      name: listing.title,
      address: address ? postalAddress(address) : undefined,
      // For a lot these describe a home that is only planned, so they are left out.
      numberOfBedrooms: isLot ? undefined : listing.beds,
      numberOfBathroomsTotal: isLot ? undefined : listing.baths,
      floorSize:
        !isLot && listing.sqft !== undefined ? { '@type': 'QuantitativeValue', value: listing.sqft, unitCode: 'FTK' } : undefined,
    },
    offers:
      price !== undefined
        ? { '@type': 'Offer', price, priceCurrency: 'USD', availability: AVAILABILITY[listing.status] }
        : undefined,
    provider: { '@id': BUSINESS_ID },
  };
}

const SECTIONS: Record<string, string> = { homes: 'Homes', gallery: 'Gallery' };

/** Home > section > page, from the page's address. Null on the home page. */
export function breadcrumbSchema(pathname: string, title: string, origin: string = site.url) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  const trail = [{ name: 'Home', path: '/' }];
  const section = SECTIONS[segments[0]!];
  if (segments.length > 1 && section) trail.push({ name: section, path: `/${segments[0]}/` });
  trail.push({ name: title, path: `/${segments.join('/')}/` });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${origin}${crumb.path}`,
    })),
  };
}
