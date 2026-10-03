import type { Listing } from './types.ts';

/*
  HOW TO ADD A HOME OR LOT
  1. Put its photos in src/assets/homes/<slug>/ (jpg, png, webp or avif). The slug is the
     address in lower case with hyphens, for example '6616-deloache'.
  2. Copy one of the entries below and fill it in. Leave out anything you don't know.
  3. category: 'available' for a home, 'lot' for a lot.
     status: 'Available', 'For Sale', 'Pending', 'Coming Soon' or 'Sold'.
  4. For a lot, beds, baths, garage, features and units describe the home planned for it.
  5. Run `npm test`: it lists any photo name that does not match a file exactly.

  The lots and 4103 Saranac use a site-plan illustration (lot.png / home.png) until real photos
  exist. To replace one, put the photo in that listing's folder and change `cover` to its name.

  Source for everything below: "Lardner Available Lots & Homes 2026" spreadsheet, plus the
  current lardnercustomhomes.com site for 4103 Saranac's "Coming Soon" status.
*/

export const listings: Listing[] = [
  {
    slug: '4103-saranac',
    title: '4103 Saranac',
    category: 'available',
    status: 'Coming Soon',
    neighborhood: 'Midway Hollow',
    lotSize: 'Approx. 14,000 sq ft',
    cover: 'home.png',
    coverAlt: 'Illustration of a home on its lot; photos coming soon',
    photos: [],
    placeholder: false,
  },
  {
    slug: '6616-deloache',
    title: '6616 Deloache',
    category: 'lot',
    status: 'Available',
    neighborhood: 'Preston Hollow',
    lotSize: '75 × 140 ft',
    price: '$3,995,000',
    beds: 4,
    baths: 5,
    garage: 2,
    features: ['Game room', 'Flex room'],
    cover: 'lot.png',
    coverAlt: 'Illustration of a building lot; photos coming soon',
    photos: [],
    placeholder: false,
  },
  {
    slug: '301-thompson',
    title: '301 Thompson',
    category: 'lot',
    status: 'Available',
    neighborhood: 'Richardson Heights',
    lotSize: '95 × 131 ft',
    price: '$2,500,000',
    beds: 4,
    baths: 5,
    garage: 2,
    features: ['Creek lot', 'Office', 'Game room', 'Flex room'],
    cover: 'lot.png',
    coverAlt: 'Illustration of a building lot; photos coming soon',
    photos: [],
    placeholder: false,
  },
  {
    slug: '3632-duchess-trail',
    title: '3632 Duchess Trail',
    category: 'lot',
    status: 'Available',
    neighborhood: 'Sparkman Estates',
    lotSize: '80 × 125 ft',
    price: '$2,300,000',
    beds: 4,
    baths: 5,
    garage: 2,
    features: ['Office', 'Game room'],
    cover: 'lot.png',
    coverAlt: 'Illustration of a building lot; photos coming soon',
    photos: [],
    placeholder: false,
  },
  {
    slug: '9911-hurley-way',
    title: '9911 Hurley Way',
    category: 'lot',
    status: 'Available',
    neighborhood: 'Midway Hollow',
    lotSize: '70 × 176 ft',
    beds: 4,
    cover: 'lot.png',
    coverAlt: 'Illustration of a building lot; photos coming soon',
    photos: [],
    placeholder: false,
  },
  {
    slug: '9903-coppedge-lane',
    title: '9903 Coppedge Lane',
    category: 'lot',
    status: 'Available',
    neighborhood: 'Midway Hollow',
    lotSize: '16,707 sq ft',
    price: '$850,000 (lot)',
    beds: 4,
    baths: 5,
    garage: 2,
    features: ['Office', 'Flex room', 'Pool'],
    cover: 'lot.png',
    coverAlt: 'Illustration of a building lot; photos coming soon',
    photos: [],
    placeholder: false,
  },
  {
    slug: '4405-scurry',
    title: '4405 Scurry',
    category: 'lot',
    status: 'Available',
    neighborhood: 'East Village Dallas',
    lotSize: '11,360 sq ft',
    units: 6,
    beds: 2,
    baths: 2.5,
    garage: 2,
    features: ['Flex room'],
    cover: 'lot.png',
    coverAlt: 'Illustration of a building lot; photos coming soon',
    photos: [],
    placeholder: false,
  },
];
