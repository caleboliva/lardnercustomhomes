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
*/

export const projects: Project[] = [
  {
    slug: '4103-saranac',
    name: '4103 Saranac',
    // Colin's April 2026 flyer: Midway Hollow.
    location: 'Midway Hollow',
    cover: '01-exterior.jpg',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: '4103 Saranac: front of the house at dusk, with wood siding, pale brick and a dark metal roof' },
      { file: '02-exterior.jpg', room: 'exterior', alt: '4103 Saranac: front of the house in daylight, with a paved walk between two oaks' },
      { file: '03-exterior.jpg', room: 'exterior', alt: '4103 Saranac: corner of the house from the lawn, with a wood fence beside it' },
      { file: '04-exterior.jpg', room: 'exterior', alt: '4103 Saranac: paved terrace and lawn behind the house, with chairs around a fire bowl' },
      { file: '05-exterior.jpg', room: 'exterior', alt: '4103 Saranac: covered balcony with outdoor seating and a view of the trees' },
      { file: '06-exterior.jpg', room: 'exterior', alt: '4103 Saranac: house and yard seen from directly above' },
      { file: '07-living.jpg', room: 'living', alt: '4103 Saranac: living room with two long sofas facing a fireplace wall' },
      { file: '08-living.jpg', room: 'living', alt: '4103 Saranac: living room open to the kitchen, with sliding glass doors to the yard' },
      { file: '09-living.jpg', room: 'living', alt: '4103 Saranac: dining table beside floor-to-ceiling windows' },
      { file: '10-living.jpg', room: 'living', alt: '4103 Saranac: two armchairs at a window facing the courtyard' },
      { file: '11-kitchen.jpg', room: 'kitchen', alt: '4103 Saranac: kitchen with a long white island, open to the dining and living areas' },
      { file: '12-kitchen.jpg', room: 'kitchen', alt: '4103 Saranac: kitchen island sink with a brushed metal faucet' },
      { file: '13-bath.jpg', room: 'bath', alt: '4103 Saranac: bath with a long white vanity and a black freestanding tub' },
      { file: '14-bath.jpg', room: 'bath', alt: '4103 Saranac: black freestanding tub against a fluted tile wall' },
      { file: '15-bath.jpg', room: 'bath', alt: '4103 Saranac: bath with a pale green vanity and a green tile wall' },
      { file: '16-other.jpg', room: 'other', alt: '4103 Saranac: entry hall with a slate floor and glass front doors' },
      { file: '17-other.jpg', room: 'other', alt: '4103 Saranac: bedroom with a vaulted ceiling and a glass wall onto the courtyard' },
      { file: '18-other.jpg', room: 'other', alt: '4103 Saranac: office with a vaulted ceiling, a glass desk and a glass door to the courtyard' },
    ],
    featured: true,
    placeholder: false,
  },
  {
    slug: 'durango-drive',
    name: 'Durango Drive',
    // Candy's Dirt, March 2025.
    location: 'Midway Hollow',
    cover: '01-exterior.jpg',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: 'Durango Drive: front of the house with a dark garage door and black-framed windows' },
      { file: '02-exterior.jpg', room: 'exterior', alt: 'Durango Drive: back of the house across the lawn' },
      { file: '03-exterior.jpg', room: 'exterior', alt: 'Durango Drive: covered patio with outdoor seating' },
      { file: '04-living.jpg', room: 'living', alt: 'Durango Drive: open living room and kitchen under a high ceiling' },
      { file: '05-living.jpg', room: 'living', alt: 'Durango Drive: living room with glass doors to the patio' },
      { file: '06-living.jpg', room: 'living', alt: 'Durango Drive: living room with a fireplace and clerestory windows' },
      { file: '07-living.jpg', room: 'living', alt: 'Durango Drive: dining room with woven pendant lights' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: 'Durango Drive: kitchen island with stools and white oak cabinets' },
      { file: '09-kitchen.jpg', room: 'kitchen', alt: 'Durango Drive: kitchen looking toward the living room' },
      { file: '10-kitchen.jpg', room: 'kitchen', alt: 'Durango Drive: range wall and long kitchen counters' },
      { file: '11-bath.jpg', room: 'bath', alt: 'Durango Drive: powder room with a stone vessel sink and patterned wall' },
      { file: '12-bath.jpg', room: 'bath', alt: 'Durango Drive: bath vanity with an oval mirror and a glass shower' },
      { file: '13-bath.jpg', room: 'bath', alt: 'Durango Drive: freestanding tub beside a window' },
      { file: '14-other.jpg', room: 'other', alt: 'Durango Drive: study with a desk facing a window' },
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
      { file: '05-living.jpg', room: 'living', alt: 'Eagles Landing: great room with exposed beams and terracotta floors' },
      { file: '06-living.jpg', room: 'living', alt: 'Eagles Landing: fireplace with a blue tile surround and stone floors' },
      { file: '07-kitchen.jpg', room: 'kitchen', alt: 'Eagles Landing: kitchen with a blue island and a wood range hood' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: 'Eagles Landing: large blue kitchen island' },
      { file: '09-kitchen.jpg', room: 'kitchen', alt: 'Eagles Landing: kitchen with two islands' },
      { file: '10-bath.jpg', room: 'bath', alt: 'Eagles Landing: bath with a wood vanity and a soaking tub' },
      { file: '11-bath.jpg', room: 'bath', alt: 'Eagles Landing: double vanity with a green tile wall' },
      { file: '12-other.jpg', room: 'other', alt: 'Eagles Landing: library lined with built-in shelves' },
      { file: '13-other.jpg', room: 'other', alt: 'Eagles Landing: upstairs landing with built-in shelves' },
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
      { file: '02-exterior.jpg', room: 'exterior', alt: 'Eaton Drive: front of the house with a walkway across the lawn' },
      { file: '03-exterior.jpg', room: 'exterior', alt: 'Eaton Drive: entry with a wood front door beside white brick' },
      { file: '04-exterior.jpg', room: 'exterior', alt: 'Eaton Drive: back of the house and covered patio at dusk' },
      { file: '05-exterior.jpg', room: 'exterior', alt: 'Eaton Drive: covered patio with outdoor seating at dusk' },
      { file: '06-living.jpg', room: 'living', alt: 'Eaton Drive: living room under a vaulted ceiling' },
      { file: '07-living.jpg', room: 'living', alt: 'Eaton Drive: dining area opening onto the covered patio' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: 'Eaton Drive: kitchen with a white waterfall island and wood cabinets' },
      { file: '09-kitchen.jpg', room: 'kitchen', alt: 'Eaton Drive: kitchen island looking out through sliding glass doors' },
      { file: '10-kitchen.jpg', room: 'kitchen', alt: 'Eaton Drive: kitchen and dining area under a vaulted ceiling' },
      { file: '11-bath.jpg', room: 'bath', alt: 'Eaton Drive: freestanding tub beside a glass shower' },
      { file: '12-bath.jpg', room: 'bath', alt: 'Eaton Drive: double vanity with tall mirrors' },
      { file: '13-other.jpg', room: 'other', alt: 'Eaton Drive: bedroom with a vaulted ceiling' },
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
      { file: '04-exterior.jpg', room: 'exterior', alt: 'Moser Avenue: balcony above the garage' },
      { file: '05-exterior.jpg', room: 'exterior', alt: 'Moser Avenue: balcony and wood privacy fence' },
      { file: '06-exterior.jpg', room: 'exterior', alt: 'Moser Avenue: tall narrow facade with slim windows' },
      { file: '07-exterior.jpg', room: 'exterior', alt: 'Moser Avenue: garage side of the house' },
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
      { file: '02-exterior.jpg', room: 'exterior', alt: 'Scurry Street: three dark gabled townhomes in daylight' },
      { file: '03-exterior.jpg', room: 'exterior', alt: 'Scurry Street: white and dark townhomes side by side' },
      { file: '04-exterior.jpg', room: 'exterior', alt: 'Scurry Street: corner townhome at dusk' },
      { file: '05-exterior.jpg', room: 'exterior', alt: 'Scurry Street: garage side of the townhomes at sunset' },
      { file: '06-living.jpg', room: 'living', alt: 'Scurry Street: living room with a vaulted ceiling' },
      { file: '07-living.jpg', room: 'living', alt: 'Scurry Street: living area with open shelving' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: 'Scurry Street: kitchen and dining area with a large window' },
      { file: '09-kitchen.jpg', room: 'kitchen', alt: 'Scurry Street: white kitchen with an island' },
      { file: '10-bath.jpg', room: 'bath', alt: 'Scurry Street: bath with a double vanity and a glass shower' },
      { file: '11-bath.jpg', room: 'bath', alt: 'Scurry Street: tiled shower with a tall window' },
      { file: '12-other.jpg', room: 'other', alt: 'Scurry Street: bedroom with a tall window' },
      { file: '13-other.jpg', room: 'other', alt: 'Scurry Street: bedroom with a vaulted ceiling' },
      { file: '14-other.jpg', room: 'other', alt: 'Scurry Street: oak staircase' },
    ],
    featured: false,
    placeholder: false,
  },
];
