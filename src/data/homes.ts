import type { Listing } from './types.ts';

/*
  HOW TO ADD A HOME OR LOT
  1. Put its photos in src/assets/homes/<slug>/ (jpg, png, webp or avif). The slug is the
     address in lower case with hyphens, for example '6616-deloache'.
  2. Copy one of the entries below and fill it in. Leave out anything you don't know.
  3. category: 'available' for a home, 'lot' for a lot.
     status: 'Available', 'For Sale', 'Pending', 'Coming Soon' or 'Sold'.
  4. For a lot, beds, baths, garage, features and units describe the home planned for it.
  5. address puts a map with a pin on the listing's page. Write the street, city and state.
  6. lotSize is the area in square feet. lotDimensions (frontage × depth) is only for
     rectangular lots; leave it out for an irregular one.
  7. Run `npm test`: it lists any photo name that does not match a file exactly.

  Lot drawings: save the drawing as lot-drawing.jpg in the lot's folder and set `cover` to it.
  A cover that is square or tall is shown whole beside the details. On the cards it is cropped,
  and coverPosition says which part to keep: '50% 100%' keeps the bottom, where the logo sits,
  and '50% 0%' keeps the top.

  Lot prices: every lot shows "Contact for pricing" (LOT_PRICE below). The spreadsheet's figures
  appear to be prices with a finished house, so they are not shown. To show a real lot price,
  replace LOT_PRICE in that lot's entry with the price, for example '$850,000'.

  Sources: the "Lardner Available Lots & Homes 2026" spreadsheet for the lots (lot areas are the
  sheet's figure, or frontage × depth where it gives dimensions). 4103 Saranac's details come
  from Colin's April 2026 flyer and magazine cover; its price ($3,000,000) and size (4,957 sq ft)
  were updated by Caleb on 14 October 2026. The 6616 Deloache images are concept
  renderings and are labelled as such. The gallery (src/data/projects.ts) keeps its own,
  shorter set of 4103 Saranac photos.
*/

const LOT_PRICE = 'Contact for pricing';

export const listings: Listing[] = [
  {
    slug: '4103-saranac',
    title: '4103 Saranac',
    category: 'available',
    status: 'For Sale',
    neighborhood: 'Midway Hollow',
    address: '4103 Saranac Drive, Dallas, TX 75220',
    price: '$3,000,000',
    beds: 4,
    baths: 5,
    sqft: 4957,
    lotSize: 'Approx. 14,000 sq ft (0.32 acres)',
    features: ['Home office', 'Workout room', 'Game room', 'Mudroom', 'Two laundry rooms', 'Two balconies', 'Covered patio'],
    description:
      'A modern residence by Lardner Custom Homes, set beneath mature oak trees on an oversized lot in Midway Hollow. Expansive glass, soaring ceilings and wide sliding doors connect the living spaces to the outdoors, with warm wood accents and custom tile throughout.',
    cover: '01-exterior.jpg',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: 'Front of the house at dusk, with wood siding, pale brick and a dark metal roof' },
      { file: '02-exterior.jpg', room: 'exterior', alt: 'Front of the house in daylight, with a paved walk between two oaks' },
      { file: '03-exterior.jpg', room: 'exterior', alt: 'Front of the house in daylight, behind a large oak' },
      { file: '04-exterior.jpg', room: 'exterior', alt: 'Corner of the house from the lawn, with a wood fence beside it' },
      { file: '05-exterior.jpg', room: 'exterior', alt: 'Wood-clad gable and metal roof beside the brick upper floor' },
      { file: '06-exterior.jpg', room: 'exterior', alt: 'Glass front doors under the metal roof' },
      { file: '07-other.jpg', room: 'other', alt: 'Entry hall with a slate floor and glass front doors' },
      { file: '08-living.jpg', room: 'living', alt: 'Living room with two long sofas facing a fireplace wall' },
      { file: '09-living.jpg', room: 'living', alt: 'Living room open to the kitchen, with sliding glass doors to the yard' },
      { file: '10-living.jpg', room: 'living', alt: 'Dining table beside floor-to-ceiling windows' },
      { file: '11-living.jpg', room: 'living', alt: 'Two armchairs at a window facing the courtyard' },
      { file: '12-kitchen.jpg', room: 'kitchen', alt: 'Kitchen with a long white island, open to the dining and living areas' },
      { file: '13-kitchen.jpg', room: 'kitchen', alt: 'Kitchen island sink with a brushed metal faucet' },
      { file: '14-kitchen.jpg', room: 'kitchen', alt: 'Kitchen faucet with the dining table and yard beyond' },
      { file: '15-other.jpg', room: 'other', alt: 'Office with a vaulted ceiling, a glass desk and a glass door to the courtyard' },
      { file: '16-other.jpg', room: 'other', alt: 'Office with tall windows facing the street' },
      { file: '17-other.jpg', room: 'other', alt: 'Glass desk with a lamp beside a window' },
      { file: '18-other.jpg', room: 'other', alt: 'Wood staircase beside the living room' },
      { file: '19-other.jpg', room: 'other', alt: 'Bedroom with a vaulted ceiling and a glass wall onto the courtyard' },
      { file: '20-other.jpg', room: 'other', alt: 'Bedroom with a vaulted ceiling and wood floors' },
      { file: '21-bath.jpg', room: 'bath', alt: 'Bath with a long white vanity and a black freestanding tub' },
      { file: '22-bath.jpg', room: 'bath', alt: 'Bath vanity with two mirrors beside a walk-in shower' },
      { file: '23-bath.jpg', room: 'bath', alt: 'Black freestanding tub against a fluted tile wall' },
      { file: '24-bath.jpg', room: 'bath', alt: 'Walk-in shower with a bench and fluted tile' },
      { file: '25-other.jpg', room: 'other', alt: 'Dressing room with built-in cabinets and an island of drawers' },
      { file: '26-other.jpg', room: 'other', alt: 'Bedroom with a large window onto the trees' },
      { file: '27-bath.jpg', room: 'bath', alt: 'Bath with a pale green vanity and a green tile wall' },
      { file: '28-bath.jpg', room: 'bath', alt: 'Bath with a white vanity and a tall frosted window' },
      { file: '29-other.jpg', room: 'other', alt: 'Laundry room with a sink and open shelves' },
      { file: '30-other.jpg', room: 'other', alt: 'White cabinets, open shelves and a counter with a sink' },
      { file: '31-exterior.jpg', room: 'exterior', alt: 'Covered balcony with outdoor seating and a view of the trees' },
      { file: '32-exterior.jpg', room: 'exterior', alt: 'Covered balcony with wood-clad walls and a metal railing' },
      { file: '33-exterior.jpg', room: 'exterior', alt: 'Back of the house at dusk, with glass doors opening to the lawn' },
      { file: '34-exterior.jpg', room: 'exterior', alt: 'Paved terrace and lawn behind the house, with chairs around a fire bowl' },
      { file: '35-exterior.jpg', room: 'exterior', alt: 'Back lawn with the house and a wood fence' },
      { file: '36-exterior.jpg', room: 'exterior', alt: 'House and yard seen from directly above' },
      { file: '37-exterior.jpg', room: 'exterior', alt: 'Aerial view of the house and yard, with a city skyline on the horizon' },
    ],
    placeholder: false,
  },
  {
    slug: '6616-deloache',
    title: '6616 Deloache',
    category: 'lot',
    status: 'Available',
    neighborhood: 'Preston Hollow',
    address: '6616 Deloache Avenue, Dallas, TX',
    lotSize: '10,500 sq ft',
    lotDimensions: '75 × 140 ft',
    price: LOT_PRICE,
    beds: 4,
    baths: 5,
    garage: 2,
    features: ['Game room', 'Flex room'],
    cover: 'rendering-front.jpg',
    coverCaption: 'Concept rendering of the planned home',
    photosHeading: 'Concept renderings',
    photos: [
      { file: 'rendering-front.jpg', room: 'exterior', alt: 'Concept rendering of the planned home: stone walls, a dark metal roof and wood garage doors behind a large oak' },
      { file: 'rendering-entry.jpg', room: 'exterior', alt: 'Concept rendering: front entry under a wood and steel canopy between stone walls' },
      { file: 'rendering-courtyard.jpg', room: 'exterior', alt: 'Concept rendering: stone courtyard with glass doors on two sides' },
      { file: 'rendering-upstairs-bar.jpg', room: 'other', alt: 'Concept rendering: upstairs bar with oak cabinets and a marble backsplash' },
    ],
    placeholder: false,
  },
  {
    slug: '301-thompson',
    title: '301 Thompson',
    category: 'lot',
    status: 'Available',
    neighborhood: 'Richardson Heights',
    address: '301 Thompson Drive, Richardson, TX',
    // Irregular creek lot: the sheet gives 95 × 131 ft, so the area is an estimate.
    lotSize: 'Approx. 12,400 sq ft',
    price: LOT_PRICE,
    beds: 4,
    baths: 5,
    garage: 2,
    features: ['Creek lot', 'Office', 'Game room', 'Flex room'],
    cover: 'lot-drawing.jpg',
    coverAlt: 'Drawing of the lot at 301 Thompson Drive, which backs onto a creek',
    coverPosition: '50% 100%',
    photos: [],
    placeholder: false,
  },
  {
    slug: '3632-duchess-trail',
    title: '3632 Duchess Trail',
    category: 'lot',
    status: 'Available',
    neighborhood: 'Sparkman Estates',
    address: '3632 Duchess Trail, Dallas, TX',
    lotSize: '10,000 sq ft',
    lotDimensions: '80 × 125 ft',
    price: LOT_PRICE,
    beds: 4,
    baths: 5,
    garage: 2,
    features: ['Office', 'Game room'],
    cover: 'lot-drawing.jpg',
    coverAlt: 'Drawing of the rectangular lot at 3632 Duchess Trail',
    coverPosition: '50% 100%',
    photos: [],
    placeholder: false,
  },
  {
    slug: '9911-hurley-way',
    title: '9911 Hurley Way',
    category: 'lot',
    status: 'Available',
    neighborhood: 'Midway Hollow',
    address: '9911 Hurley Way, Dallas, TX',
    lotSize: '12,320 sq ft',
    lotDimensions: '70 × 176 ft',
    price: LOT_PRICE,
    beds: 4,
    cover: 'lot-drawing.jpg',
    coverAlt: 'Drawing of the rectangular lot at 9911 Hurley Way, near Williamsburg Road',
    coverPosition: '50% 100%',
    photos: [],
    placeholder: false,
  },
  {
    slug: '9903-coppedge-lane',
    title: '9903 Coppedge Lane',
    category: 'lot',
    status: 'Available',
    neighborhood: 'Midway Hollow',
    address: '9903 Coppedge Lane, Dallas, TX',
    lotSize: '16,707 sq ft',
    price: LOT_PRICE,
    beds: 4,
    baths: 5,
    garage: 2,
    features: ['Office', 'Flex room', 'Pool'],
    cover: 'lot-drawing.jpg',
    coverAlt: 'Drawing of the five-sided lot at 9903 Coppedge Lane',
    coverPosition: '50% 100%',
    photos: [],
    placeholder: false,
  },
  {
    slug: '4405-scurry',
    title: '4405 Scurry',
    category: 'lot',
    status: 'Available',
    neighborhood: 'East Village Dallas',
    address: '4405 Scurry Street, Dallas, TX',
    lotSize: '11,360 sq ft',
    price: LOT_PRICE,
    units: 6,
    beds: 2,
    baths: 2.5,
    garage: 2,
    features: ['Flex room'],
    // Ascend II renderings supplied by Caleb, October 2026.
    cover: 'rendering-front.jpg',
    coverCaption: 'Concept rendering of Ascend II, the planned townhomes',
    coverPosition: '50% 70%',
    photosHeading: 'Concept renderings and lot drawing',
    photos: [
      { file: 'rendering-front.jpg', room: 'exterior', alt: 'Concept rendering of Ascend II from the street: two dark townhome buildings with vertical cladding either side of a shared driveway, under a flowering tree' },
      { file: 'rendering-corner.jpg', room: 'exterior', alt: 'Concept rendering of Ascend II: corner view of the townhomes, with a cantilevered upper floor, a wood front door and a long wood fence' },
      { file: 'lot-drawing.jpg', room: 'other', alt: 'Drawing of the lot at 4405 Scurry Street, near Burlew Street' },
    ],
    placeholder: false,
  },
];
