import type { Project } from './types.ts';

/*
  HOW TO ADD A PROJECT
  1. Put its photos in src/assets/projects/<slug>/ (jpg, png, webp or avif).
  2. Copy one of the entries below and fill it in. The slug is the name in lower case with
     hyphens, for example 'eaton-drive'.
     Homes that have been sold are someone's home now, so at Colin's request (October 2026)
     they are named by the street only, never the house number: 'Elm Street', not
     '123 Elm Street'. Use the same name at the start of each photo's `alt`.
     Architects are not named anywhere on the site, also at Colin's request.
  3. `cover` is the front elevation shown on the Gallery page.
  4. `room` decides which Gallery room page a photo also appears on:
     'exterior', 'kitchen', 'bath', 'living', or 'other' for none.
  5. `featured: true` puts a project on the home page (the first three are shown).
  6. Run `npm test`: it lists any photo name that does not match a file exactly.

  Curation (October 2026): each project shows only its 6–10 strongest photos, with the best
  front view as its cover. Photos not taken by Robert Tsai were given a gentle grade (slightly
  deeper midtones and contrast) so the bright listing-style shots sit closer to his.
*/

export const projects: Project[] = [
  {
    slug: '4103-saranac',
    name: '4103 Saranac',
    // Colin's April 2026 flyer: Midway Hollow.
    location: 'Midway Hollow',
    cover: '01-exterior.jpg',
    // Photos: Robert Tsai, April 2026, a selection from the listing.
    photoCredit: 'Robert Tsai',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: '4103 Saranac: front of the house at dusk, with wood siding, pale brick, a dark metal roof and a walk between the oaks' },
      { file: '03-exterior.jpg', room: 'exterior', alt: '4103 Saranac: front of the house straight on: the wood-clad gable, the glass entry and the brick upper floor with its balcony' },
      { file: '05-other.jpg', room: 'other', alt: '4103 Saranac: wood pivot front door standing open onto a slate entry' },
      { file: '07-living.jpg', room: 'living', alt: '4103 Saranac: living room with two cream sofas facing a concrete fireplace wall and built-in oak shelves' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: '4103 Saranac: kitchen island with a white quartz top, open to the living room' },
      { file: '10-living.jpg', room: 'living', alt: '4103 Saranac: dining table beside sliding glass doors that open to the back lawn' },
      { file: '11-other.jpg', room: 'other', alt: '4103 Saranac: bedroom with a vaulted ceiling and glass doors onto the courtyard' },
      { file: '12-bath.jpg', room: 'bath', alt: '4103 Saranac: bath with a long white vanity, two mirrors and a black freestanding tub' },
      { file: '13-bath.jpg', room: 'bath', alt: '4103 Saranac: black freestanding tub with a wall-mounted faucet against fluted tile' },
      { file: '17-exterior.jpg', room: 'exterior', alt: '4103 Saranac: back terrace at dusk, with glass walls along the house and chairs around a fire bowl' },
    ],
    featured: true,
    placeholder: false,
  },
  {
    slug: 'durango-drive',
    name: 'Durango Drive',
    // Candy's Dirt, March 2025.
    location: 'Midway Hollow',
    cover: '00-exterior.jpg',
    photos: [
      { file: '00-exterior.jpg', room: 'exterior', alt: 'Durango Drive: front of the house at dusk, white and gabled, lit from within' },
      { file: '02-exterior.jpg', room: 'exterior', alt: 'Durango Drive: back of the house across the lawn' },
      { file: '03-exterior.jpg', room: 'exterior', alt: 'Durango Drive: covered patio with outdoor seating' },
      { file: '04-living.jpg', room: 'living', alt: 'Durango Drive: open living room and kitchen under a high ceiling' },
      { file: '07-living.jpg', room: 'living', alt: 'Durango Drive: dining room with woven pendant lights' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: 'Durango Drive: kitchen island with stools and white oak cabinets' },
      { file: '11-bath.jpg', room: 'bath', alt: 'Durango Drive: powder room with a stone vessel sink and patterned wall' },
      { file: '13-bath.jpg', room: 'bath', alt: 'Durango Drive: freestanding tub beside a window' },
      { file: '15-other.jpg', room: 'other', alt: 'Durango Drive: bedroom with a tufted headboard' },
    ],
    featured: true,
    placeholder: false,
  },
  {
    slug: 'eagles-landing',
    name: 'Eagles Landing',
    cover: '01-exterior.jpg',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: 'Eagles Landing: stone front of the house with blue shutters and an arched door' },
      { file: '02-exterior.jpg', room: 'exterior', alt: 'Eagles Landing: front of the house across the lawn' },
      { file: '03-exterior.jpg', room: 'exterior', alt: 'Eagles Landing: arched stone loggia looking toward the pool' },
      { file: '04-exterior.jpg', room: 'exterior', alt: 'Eagles Landing: pool and lawn behind the house' },
      { file: '06-living.jpg', room: 'living', alt: 'Eagles Landing: fireplace with a blue tile surround and stone floors' },
      { file: '07-kitchen.jpg', room: 'kitchen', alt: 'Eagles Landing: kitchen with a blue island and a wood range hood' },
      { file: '09-kitchen.jpg', room: 'kitchen', alt: 'Eagles Landing: kitchen with two islands' },
      { file: '11-bath.jpg', room: 'bath', alt: 'Eagles Landing: double vanity with a green tile wall' },
      { file: '12-other.jpg', room: 'other', alt: 'Eagles Landing: library lined with built-in shelves' },
    ],
    featured: true,
    placeholder: false,
  },
  {
    slug: 'eaton-drive',
    name: 'Eaton Drive',
    cover: '01-exterior.jpg',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: 'Eaton Drive: twin white brick gables lit at dusk' },
      { file: '03-exterior.jpg', room: 'exterior', alt: 'Eaton Drive: entry with a wood front door beside white brick' },
      { file: '04-exterior.jpg', room: 'exterior', alt: 'Eaton Drive: back of the house and covered patio at dusk' },
      { file: '05-exterior.jpg', room: 'exterior', alt: 'Eaton Drive: covered patio with outdoor seating at dusk' },
      { file: '06-living.jpg', room: 'living', alt: 'Eaton Drive: living room under a vaulted ceiling' },
      { file: '07-living.jpg', room: 'living', alt: 'Eaton Drive: dining area opening onto the covered patio' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: 'Eaton Drive: kitchen with a white waterfall island and wood cabinets' },
      { file: '11-bath.jpg', room: 'bath', alt: 'Eaton Drive: freestanding tub beside a glass shower' },
      { file: '14-other.jpg', room: 'other', alt: 'Eaton Drive: bedroom with a large corner window onto the yard' },
    ],
    featured: true,
    placeholder: false,
  },
  {
    slug: 'moser-avenue',
    name: 'Moser Avenue',
    cover: '01-exterior.jpg',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: 'Moser Avenue: front of the house at dusk' },
      { file: '02-exterior.jpg', room: 'exterior', alt: 'Moser Avenue: white gabled front with a balcony' },
      { file: '03-exterior.jpg', room: 'exterior', alt: 'Moser Avenue: side of the house along the driveway' },
      { file: '05-exterior.jpg', room: 'exterior', alt: 'Moser Avenue: balcony and wood privacy fence' },
      { file: '06-exterior.jpg', room: 'exterior', alt: 'Moser Avenue: tall narrow facade with slim windows' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: 'Moser Avenue: kitchen and living area with wood floors' },
    ],
    featured: false,
    placeholder: false,
  },
  {
    slug: 'scurry-street',
    name: 'Scurry Street',
    // Texas Architect, July 2019: Ascend, five townhouses in Old East Dallas.
    location: 'Old East Dallas',
    cover: '01-exterior.jpg',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: 'Scurry Street: three dark gabled townhomes lit at dusk' },
      { file: '03-exterior.jpg', room: 'exterior', alt: 'Scurry Street: white and dark townhomes side by side' },
      { file: '04-exterior.jpg', room: 'exterior', alt: 'Scurry Street: corner townhome at dusk' },
      { file: '05-exterior.jpg', room: 'exterior', alt: 'Scurry Street: garage side of the townhomes at sunset' },
      { file: '06-living.jpg', room: 'living', alt: 'Scurry Street: living room with a vaulted ceiling' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: 'Scurry Street: kitchen and dining area with a large window' },
      { file: '10-bath.jpg', room: 'bath', alt: 'Scurry Street: bath with a double vanity and a glass shower' },
      { file: '12-other.jpg', room: 'other', alt: 'Scurry Street: bedroom with a tall window' },
      { file: '14-other.jpg', room: 'other', alt: 'Scurry Street: oak staircase' },
    ],
    featured: false,
    placeholder: false,
  },
];
