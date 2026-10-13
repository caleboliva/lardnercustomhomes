/*
  SEARCH SETTINGS (SEO)
  What search engines and link previews read. None of it shows on the pages themselves.

  - `title` is the blue link in search results. Keep the main search phrase first and stay
    under about 60 characters; the company name is added after it automatically.
  - `description` is the grey text under the link. One or two plain sentences.
  - `keywords` are the phrases a page is aimed at. Google ignores the keywords tag itself, so
    each phrase here should also appear in that page's title, description or visible text.

  How the phrases were chosen (October 2026): other Dallas builders nearly all aim at "luxury
  custom home builder Dallas" plus Highland Park, University Park and Preston Hollow. These
  lean on what is different here: the neighborhoods Lardner builds in (Midway Hollow first),
  modern architect-designed homes, lots that are available now, building on a client's own
  lot, and a builder who is also a licensed broker.

  Only describe what is true. Do not add awards, rankings or neighborhoods Lardner does not
  work in.
*/

export type PageSeo = { title: string; description: string; keywords: string[] };

/** Added to every page after its own keywords. */
export const siteKeywords: string[] = [
  'custom home builder Dallas',
  'Dallas custom homes',
  'luxury custom home builder Dallas TX',
  'modern home builder Dallas',
  'new construction homes Dallas',
  'build on your lot Dallas',
  'Lardner Custom Homes',
  'Colin Lardner',
];

/** Neighborhoods and cities named in structured data as the area served. */
export const areaServed: string[] = [
  'Dallas, TX',
  'Midway Hollow, Dallas',
  'Preston Hollow, Dallas',
  'M-Streets, Dallas',
  'Uptown, Dallas',
  'East Village, Dallas',
  'Knox-Henderson, Dallas',
  'Sparkman Estates, Dallas',
  'Richardson, TX',
];

export const pageSeo = {
  home: {
    title: 'Custom Home Builder in Dallas, TX',
    description:
      'Lardner Custom Homes designs and builds modern custom homes in Dallas: Midway Hollow, Preston Hollow, the M-Streets and more. See homes for sale, available lots and past projects.',
    keywords: [
      'custom home builder Dallas TX',
      'Midway Hollow custom home builder',
      'Preston Hollow custom homes',
      'architect-designed homes Dallas',
      'design and build Dallas',
      'energy-efficient custom homes Dallas',
    ],
  },
  homes: {
    title: 'Homes and Lots for Sale in Dallas',
    description:
      'New construction homes for sale and lots ready for a custom home in Dallas, from Lardner Custom Homes: Midway Hollow, Preston Hollow, Sparkman Estates, East Village and Richardson.',
    keywords: ['new construction homes for sale Dallas', 'lots for sale Dallas', 'Midway Hollow homes for sale', 'custom home lots Dallas'],
  },
  available: {
    title: 'New Construction Homes for Sale in Dallas',
    description:
      'Newly built custom homes for sale in Dallas from Lardner Custom Homes, including 4103 Saranac Drive in Midway Hollow. Photos, details and a map for each home.',
    keywords: ['new construction homes for sale Dallas', 'new homes Midway Hollow', 'modern homes for sale Dallas', 'Midway Hollow new construction'],
  },
  lots: {
    title: 'Lots for a Custom Home in Dallas',
    description:
      'Lots available now for a custom home in Preston Hollow, Midway Hollow, Sparkman Estates, East Village and Richardson Heights. Each has its lot size, a drawing or rendering, and a map.',
    keywords: [
      'lots for sale Dallas',
      'residential lots Preston Hollow',
      'Midway Hollow lots for sale',
      'custom home lots Dallas',
      'Sparkman Estates lots',
      'Richardson Heights lots',
    ],
  },
  buildOnYourLot: {
    title: 'Build on Your Lot in Dallas',
    description:
      'Already own land in Dallas? Lardner Custom Homes can design and build a custom home on your lot.',
    keywords: ['build on your lot Dallas', 'build on my lot Dallas TX', 'custom home on your land Dallas', 'build on your lot home builders'],
  },
  gallery: {
    title: 'Custom Home Gallery, Dallas',
    description:
      'A portfolio of custom homes designed and built by Lardner Custom Homes in Dallas, with photos of exteriors, kitchens, baths and living spaces from each project.',
    keywords: ['custom home portfolio Dallas', 'modern custom homes Dallas photos', 'Dallas home builder gallery'],
  },
  exterior: {
    title: 'Custom Home Exteriors, Dallas',
    description: 'Exterior photos of custom homes built by Lardner Custom Homes in Dallas: modern gables, brick, stone, wood siding and metal roofs.',
    keywords: ['modern home exteriors Dallas', 'custom home exterior ideas', 'contemporary home exteriors'],
  },
  kitchen: {
    title: 'Custom Kitchens in Dallas Homes',
    description: 'Kitchen photos from custom homes built by Lardner Custom Homes in Dallas: islands, custom cabinets and open plans.',
    keywords: ['custom kitchen Dallas', 'modern kitchen design Dallas homes', 'custom home kitchen ideas'],
  },
  bath: {
    title: 'Custom Baths in Dallas Homes',
    description: 'Bath photos from custom homes built by Lardner Custom Homes in Dallas: freestanding tubs, walk-in showers and custom vanities.',
    keywords: ['custom bathroom Dallas', 'primary bath design Dallas homes', 'custom home bath ideas'],
  },
  living: {
    title: 'Living Spaces in Dallas Custom Homes',
    description: 'Living and dining room photos from custom homes built by Lardner Custom Homes in Dallas, with tall ceilings and walls of glass.',
    keywords: ['custom living room Dallas', 'open plan living Dallas homes', 'indoor-outdoor living Dallas'],
  },
  about: {
    title: 'About Colin Lardner, Dallas Home Builder',
    description:
      'Meet Colin Lardner, the licensed general contractor and Texas real estate broker behind Lardner Custom Homes, and the team that designs and builds its Dallas homes.',
    keywords: ['Colin Lardner', 'Dallas home builder and broker', 'licensed general contractor Dallas', 'Lardner Group'],
  },
  inventory: {
    title: 'Find a Home or Lot in Dallas',
    description:
      "Tell Lardner Custom Homes what you're looking for and hear about current and upcoming custom homes and lots in Dallas.",
    keywords: ['upcoming new homes Dallas', 'homes and lots coming soon Dallas', 'custom home inquiry Dallas'],
  },
} satisfies Record<string, PageSeo>;
