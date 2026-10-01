import type { Photo, Project } from './types.ts';

/*
  HOW TO ADD A PROJECT
  1. Put its photos in src/assets/projects/<slug>/ (jpg, png, webp or avif).
  2. Copy the example below into the `projects` array and fill it in.
  3. `cover` is the front elevation shown on the Gallery page.
  4. `room` decides which Gallery room page a photo also appears on:
     'exterior', 'kitchen', 'bath', 'living', or 'other' for none.
  5. Delete the sample entries once real ones exist.

  {
    slug: 'midway-hollow-modern',
    name: 'Midway Hollow Modern',
    location: 'Midway Hollow, Dallas',
    cover: 'front.jpg',
    photos: [
      { file: 'front.jpg', room: 'exterior', alt: 'Front elevation with a standing-seam roof' },
      { file: 'kitchen-1.jpg', room: 'kitchen', alt: 'Kitchen looking toward the breakfast nook' },
    ],
    featured: true,
    placeholder: false,
  },
*/

function samplePhotos(name: string): Photo[] {
  return [
    { file: null, room: 'exterior', alt: `${name}: front elevation` },
    { file: null, room: 'exterior', alt: `${name}: rear elevation and yard` },
    { file: null, room: 'living', alt: `${name}: living room` },
    { file: null, room: 'living', alt: `${name}: dining area` },
    { file: null, room: 'kitchen', alt: `${name}: kitchen` },
    { file: null, room: 'kitchen', alt: `${name}: kitchen island detail` },
    { file: null, room: 'bath', alt: `${name}: primary bath` },
    { file: null, room: 'bath', alt: `${name}: powder room` },
  ];
}

function sampleProject(number: string, featured: boolean): Project {
  const name = `Sample Project ${number}`;
  return {
    slug: `sample-project-${number}`,
    name,
    cover: null,
    photos: samplePhotos(name),
    featured,
    placeholder: true,
  };
}

export const projects: Project[] = [
  sampleProject('01', true),
  sampleProject('02', true),
  sampleProject('03', true),
  sampleProject('04', false),
];
