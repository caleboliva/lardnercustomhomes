import type { Project } from './types.ts';

/*
  HOW TO ADD A PROJECT
  1. Put its photos in src/assets/projects/<slug>/ (jpg, png, webp or avif).
  2. Copy one of the entries below and fill it in. The slug is the address in lower case
     with hyphens, for example '3805-eaton-drive'.
  3. `cover` is the front elevation shown on the Gallery page.
  4. `room` decides which Gallery room page a photo also appears on:
     'exterior', 'kitchen', 'bath', 'living', or 'other' for none.
  5. `featured: true` puts a project on the home page (the first three are shown).
  6. Run `npm test`: it lists any photo name that does not match a file exactly.
*/

export const projects: Project[] = [
  {
    slug: '3880-durango',
    name: '3880 Durango',
    cover: '01-exterior.jpg',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: '3880 Durango: front of the house with a dark garage door and black-framed windows' },
      { file: '02-exterior.jpg', room: 'exterior', alt: '3880 Durango: back of the house across the lawn' },
      { file: '03-exterior.jpg', room: 'exterior', alt: '3880 Durango: covered patio with outdoor seating' },
      { file: '04-living.jpg', room: 'living', alt: '3880 Durango: open living room and kitchen under a high ceiling' },
      { file: '05-living.jpg', room: 'living', alt: '3880 Durango: living room with glass doors to the patio' },
      { file: '06-living.jpg', room: 'living', alt: '3880 Durango: living room with a fireplace and clerestory windows' },
      { file: '07-living.jpg', room: 'living', alt: '3880 Durango: dining room with woven pendant lights' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: '3880 Durango: kitchen island with stools and white oak cabinets' },
      { file: '09-kitchen.jpg', room: 'kitchen', alt: '3880 Durango: kitchen looking toward the living room' },
      { file: '10-kitchen.jpg', room: 'kitchen', alt: '3880 Durango: range wall and long kitchen counters' },
      { file: '11-bath.jpg', room: 'bath', alt: '3880 Durango: powder room with a stone vessel sink and patterned wall' },
      { file: '12-bath.jpg', room: 'bath', alt: '3880 Durango: bath vanity with an oval mirror and a glass shower' },
      { file: '13-bath.jpg', room: 'bath', alt: '3880 Durango: freestanding tub beside a window' },
      { file: '14-other.jpg', room: 'other', alt: '3880 Durango: study with a desk facing a window' },
      { file: '15-other.jpg', room: 'other', alt: '3880 Durango: bedroom with a tufted headboard' },
    ],
    featured: true,
    placeholder: false,
  },
  {
    slug: '721-eagles-landing',
    name: '721 Eagles Landing',
    cover: '01-exterior.jpg',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: '721 Eagles Landing: stone front of the house with blue shutters and an arched door' },
      { file: '02-exterior.jpg', room: 'exterior', alt: '721 Eagles Landing: front of the house across the lawn' },
      { file: '03-exterior.jpg', room: 'exterior', alt: '721 Eagles Landing: arched stone loggia looking toward the pool' },
      { file: '04-exterior.jpg', room: 'exterior', alt: '721 Eagles Landing: pool and lawn behind the house' },
      { file: '05-living.jpg', room: 'living', alt: '721 Eagles Landing: great room with exposed beams and terracotta floors' },
      { file: '06-living.jpg', room: 'living', alt: '721 Eagles Landing: fireplace with a blue tile surround and stone floors' },
      { file: '07-kitchen.jpg', room: 'kitchen', alt: '721 Eagles Landing: kitchen with a blue island and a wood range hood' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: '721 Eagles Landing: large blue kitchen island' },
      { file: '09-kitchen.jpg', room: 'kitchen', alt: '721 Eagles Landing: kitchen with two islands' },
      { file: '10-bath.jpg', room: 'bath', alt: '721 Eagles Landing: bath with a wood vanity and a soaking tub' },
      { file: '11-bath.jpg', room: 'bath', alt: '721 Eagles Landing: double vanity with a green tile wall' },
      { file: '12-other.jpg', room: 'other', alt: '721 Eagles Landing: library lined with built-in shelves' },
      { file: '13-other.jpg', room: 'other', alt: '721 Eagles Landing: upstairs landing with built-in shelves' },
    ],
    featured: true,
    placeholder: false,
  },
  {
    slug: '3805-eaton-drive',
    name: '3805 Eaton Drive',
    cover: '01-exterior.jpg',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: '3805 Eaton Drive: twin white brick gables lit at dusk' },
      { file: '02-exterior.jpg', room: 'exterior', alt: '3805 Eaton Drive: front of the house with a walkway across the lawn' },
      { file: '03-exterior.jpg', room: 'exterior', alt: '3805 Eaton Drive: entry with a wood front door beside white brick' },
      { file: '04-exterior.jpg', room: 'exterior', alt: '3805 Eaton Drive: back of the house and covered patio at dusk' },
      { file: '05-exterior.jpg', room: 'exterior', alt: '3805 Eaton Drive: covered patio with outdoor seating at dusk' },
      { file: '06-living.jpg', room: 'living', alt: '3805 Eaton Drive: living room under a vaulted ceiling' },
      { file: '07-living.jpg', room: 'living', alt: '3805 Eaton Drive: dining area opening onto the covered patio' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: '3805 Eaton Drive: kitchen with a white waterfall island and wood cabinets' },
      { file: '09-kitchen.jpg', room: 'kitchen', alt: '3805 Eaton Drive: kitchen island looking out through sliding glass doors' },
      { file: '10-kitchen.jpg', room: 'kitchen', alt: '3805 Eaton Drive: kitchen and dining area under a vaulted ceiling' },
      { file: '11-bath.jpg', room: 'bath', alt: '3805 Eaton Drive: freestanding tub beside a glass shower' },
      { file: '12-bath.jpg', room: 'bath', alt: '3805 Eaton Drive: double vanity with tall mirrors' },
      { file: '13-other.jpg', room: 'other', alt: '3805 Eaton Drive: bedroom with a vaulted ceiling' },
      { file: '14-other.jpg', room: 'other', alt: '3805 Eaton Drive: bedroom with a large corner window onto the yard' },
    ],
    featured: true,
    placeholder: false,
  },
  {
    slug: '2208-moser-avenue',
    name: '2208 Moser Avenue',
    cover: '01-exterior.jpg',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: '2208 Moser Avenue: front of the house at dusk' },
      { file: '02-exterior.jpg', room: 'exterior', alt: '2208 Moser Avenue: white gabled front with a balcony' },
      { file: '03-exterior.jpg', room: 'exterior', alt: '2208 Moser Avenue: side of the house along the driveway' },
      { file: '04-exterior.jpg', room: 'exterior', alt: '2208 Moser Avenue: balcony above the garage' },
      { file: '05-exterior.jpg', room: 'exterior', alt: '2208 Moser Avenue: balcony and wood privacy fence' },
      { file: '06-exterior.jpg', room: 'exterior', alt: '2208 Moser Avenue: tall narrow facade with slim windows' },
      { file: '07-exterior.jpg', room: 'exterior', alt: '2208 Moser Avenue: garage side of the house' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: '2208 Moser Avenue: kitchen and living area with wood floors' },
    ],
    featured: false,
    placeholder: false,
  },
  {
    slug: '4401-scurry-street',
    name: '4401 Scurry Street',
    cover: '01-exterior.jpg',
    photos: [
      { file: '01-exterior.jpg', room: 'exterior', alt: '4401 Scurry Street: three dark gabled townhomes lit at dusk' },
      { file: '02-exterior.jpg', room: 'exterior', alt: '4401 Scurry Street: three dark gabled townhomes in daylight' },
      { file: '03-exterior.jpg', room: 'exterior', alt: '4401 Scurry Street: white and dark townhomes side by side' },
      { file: '04-exterior.jpg', room: 'exterior', alt: '4401 Scurry Street: corner townhome at dusk' },
      { file: '05-exterior.jpg', room: 'exterior', alt: '4401 Scurry Street: garage side of the townhomes at sunset' },
      { file: '06-living.jpg', room: 'living', alt: '4401 Scurry Street: living room with a vaulted ceiling' },
      { file: '07-living.jpg', room: 'living', alt: '4401 Scurry Street: living area with open shelving' },
      { file: '08-kitchen.jpg', room: 'kitchen', alt: '4401 Scurry Street: kitchen and dining area with a large window' },
      { file: '09-kitchen.jpg', room: 'kitchen', alt: '4401 Scurry Street: white kitchen with an island' },
      { file: '10-bath.jpg', room: 'bath', alt: '4401 Scurry Street: bath with a double vanity and a glass shower' },
      { file: '11-bath.jpg', room: 'bath', alt: '4401 Scurry Street: tiled shower with a tall window' },
      { file: '12-other.jpg', room: 'other', alt: '4401 Scurry Street: bedroom with a tall window' },
      { file: '13-other.jpg', room: 'other', alt: '4401 Scurry Street: bedroom with a vaulted ceiling' },
      { file: '14-other.jpg', room: 'other', alt: '4401 Scurry Street: oak staircase' },
    ],
    featured: false,
    placeholder: false,
  },
];
