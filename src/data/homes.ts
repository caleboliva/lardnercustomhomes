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
  and coverPosition says which part to keep, across then down: '50% 0%' keeps the top and
  '50% 100%' the bottom. Pick the value that keeps the red lot in view. The drawings were
  redone without the Lardner logo in October 2026.

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
    // Photos: Robert Tsai, April 2026 (supplied by Caleb in October 2026).
    photoCredit: 'Robert Tsai',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: 'Front of the house at dusk, with wood siding, pale brick, a dark metal roof and a walk between the oaks' },
      { file: '02-exterior.jpg', room: 'exterior', alt: 'Front of the house in daylight, with a paved walk to the glass front doors under a large oak' },
      { file: '03-exterior.jpg', room: 'exterior', alt: 'Front of the house straight on: the wood-clad gable, the glass entry and the brick upper floor with its balcony' },
      { file: '04-exterior.jpg', room: 'exterior', alt: 'Wood-clad wing and brick upper floor seen across the front lawn, under an oak' },
      { file: '05-exterior.jpg', room: 'exterior', alt: 'The house from the street, set back behind large oak trees' },
      { file: '06-exterior.jpg', room: 'exterior', alt: 'Front of the house at dusk beside a large oak, with the brick upper floor rising behind' },
      { file: '07-exterior.jpg', room: 'exterior', alt: 'Black slatted balcony set into the pale brick upper floor' },
      { file: '08-other.jpg', room: 'other', alt: 'Wood pivot front door standing open onto a slate entry' },
      { file: '09-living.jpg', room: 'living', alt: 'Open living, dining and kitchen area behind a wall of sliding glass doors' },
      { file: '10-living.jpg', room: 'living', alt: 'Living room with two cream sofas facing a concrete fireplace wall and built-in oak shelves' },
      { file: '11-living.jpg', room: 'living', alt: 'Living room with a fireplace and sliding glass doors to the courtyard' },
      { file: '12-kitchen.jpg', room: 'kitchen', alt: 'Kitchen island with a white quartz top, open to the living room' },
      { file: '13-kitchen.jpg', room: 'kitchen', alt: 'Kitchen with oak upper cabinets, white lower cabinets and a long island' },
      { file: '14-living.jpg', room: 'living', alt: 'Dining table beside sliding glass doors that open to the back lawn' },
      { file: '15-other.jpg', room: 'other', alt: 'Oak staircase with white walls and a recessed handrail' },
      { file: '16-other.jpg', room: 'other', alt: 'Bedroom with a vaulted ceiling and glass doors onto the courtyard' },
      { file: '17-other.jpg', room: 'other', alt: 'Two armchairs at a glass wall looking across the courtyard to the wood-clad wing' },
      { file: '18-other.jpg', room: 'other', alt: 'Bedroom with an upholstered headboard, a dark dresser and tall narrow windows' },
      { file: '19-bath.jpg', room: 'bath', alt: 'Bath with a long white vanity, two mirrors and a black freestanding tub' },
      { file: '20-bath.jpg', room: 'bath', alt: 'Double vanity with two tall mirrors and black sconces' },
      { file: '21-bath.jpg', room: 'bath', alt: 'Black freestanding tub with a wall-mounted faucet against fluted tile' },
      { file: '22-bath.jpg', room: 'bath', alt: 'Walk-in shower with two shower heads, fluted tile and a bench' },
      { file: '23-other.jpg', room: 'other', alt: 'Walk-in closet with open shelving and hanging space' },
      { file: '24-bath.jpg', room: 'bath', alt: 'Bath with a sage green vanity, green tile and a brass-framed mirror' },
      { file: '25-other.jpg', room: 'other', alt: 'Laundry room with a sink, tall cabinets and open shelves' },
      { file: '26-other.jpg', room: 'other', alt: 'Upstairs hallway beside a glass wall onto the covered balcony' },
      { file: '27-other.jpg', room: 'other', alt: 'Upstairs room with a large window and glass doors to the covered balcony' },
      { file: '28-exterior.jpg', room: 'exterior', alt: 'Covered balcony with outdoor seating, wood-clad walls and a view of the trees' },
      { file: '29-other.jpg', room: 'other', alt: 'Upstairs room with glass doors to a balcony and a window over the metal roof' },
      { file: '30-other.jpg', room: 'other', alt: 'Upstairs bedroom with large windows onto the trees' },
      { file: '31-other.jpg', room: 'other', alt: 'Upstairs bedroom with corner windows and an armchair' },
      { file: '32-bath.jpg', room: 'bath', alt: 'Bath with a white vanity, a frameless mirror and a black tiled shower' },
      { file: '33-exterior.jpg', room: 'exterior', alt: 'Back terrace at dusk, with glass walls along the house and chairs around a fire bowl' },
      { file: '34-exterior.jpg', room: 'exterior', alt: 'Back of the house at dusk, with a glass-walled room and chairs on the lawn' },
      { file: '35-exterior.jpg', room: 'exterior', alt: 'Paved terrace between the brick house and the wood-clad wing' },
      { file: '36-exterior.jpg', room: 'exterior', alt: 'Back of the house around the lawn, with a balcony on the upper floor' },
      { file: '37-exterior.jpg', room: 'exterior', alt: 'Glass-fronted corner of the wood-clad wing' },
      { file: '38-exterior.jpg', room: 'exterior', alt: 'The house and yard from above, with the metal roofs and the street beyond' },
      { file: '39-exterior.jpg', room: 'exterior', alt: 'Courtyard and terrace seen from directly above' },
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
    photosHeading: 'Concept renderings and lot drawing',
    photos: [
      { file: 'rendering-front.jpg', room: 'exterior', alt: 'Concept rendering of the planned home: stone walls, a dark metal roof and wood garage doors behind a large oak' },
      { file: 'rendering-entry.jpg', room: 'exterior', alt: 'Concept rendering: front entry under a wood and steel canopy between stone walls' },
      { file: 'rendering-courtyard.jpg', room: 'exterior', alt: 'Concept rendering: stone courtyard with glass doors on two sides' },
      { file: 'rendering-upstairs-bar.jpg', room: 'other', alt: 'Concept rendering: upstairs bar with oak cabinets and a marble backsplash' },
      { file: 'lot-drawing.jpg', room: 'other', alt: 'Drawing of the rectangular lot at 6616 Deloache Avenue, between neighboring homes' },
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
    coverPosition: '50% 25%',
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
    coverPosition: '50% 15%',
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
    coverPosition: '50% 35%',
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
