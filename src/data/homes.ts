import type { Listing, Photo } from './types.ts';

/*
  HOW TO ADD A HOME OR LOT
  1. Put its photos in src/assets/homes/<slug>/ (jpg, png, webp or avif).
  2. Copy the example below into the `listings` array and fill it in.
  3. Delete the sample entries once real ones exist.

  {
    slug: '4103-saranac',
    title: '4103 Saranac',
    category: 'available',          // 'available' or 'lot'
    status: 'For Sale',             // 'For Sale', 'Pending', 'Coming Soon' or 'Sold'
    neighborhood: 'Midway Hollow',
    address: '4103 Saranac Dr, Dallas, TX',
    price: '$2,450,000',
    beds: 5,
    baths: 5,
    sqft: 5200,
    description: 'One or two sentences about the home.',
    cover: 'front.jpg',
    photos: [
      { file: 'front.jpg', room: 'exterior', alt: 'Front of 4103 Saranac at dusk' },
      { file: 'kitchen.jpg', room: 'kitchen', alt: 'Kitchen with a marble island' },
    ],
    placeholder: false,
  },
*/

function samplePhotos(title: string): Photo[] {
  return [
    { file: null, room: 'exterior', alt: `${title}: front elevation` },
    { file: null, room: 'living', alt: `${title}: living room` },
    { file: null, room: 'kitchen', alt: `${title}: kitchen` },
    { file: null, room: 'bath', alt: `${title}: primary bath` },
  ];
}

function sampleLotPhotos(title: string): Photo[] {
  return [
    { file: null, room: 'exterior', alt: `${title}: view from the street` },
    { file: null, room: 'other', alt: `${title}: site plan` },
  ];
}

export const listings: Listing[] = [
  {
    slug: 'sample-home-01',
    title: 'Sample Home 01',
    category: 'available',
    status: 'For Sale',
    cover: null,
    photos: samplePhotos('Sample Home 01'),
    placeholder: true,
  },
  {
    slug: 'sample-home-02',
    title: 'Sample Home 02',
    category: 'available',
    status: 'For Sale',
    cover: null,
    photos: samplePhotos('Sample Home 02'),
    placeholder: true,
  },
  {
    slug: 'sample-home-03',
    title: 'Sample Home 03',
    category: 'available',
    status: 'Pending',
    cover: null,
    photos: samplePhotos('Sample Home 03'),
    placeholder: true,
  },
  {
    slug: 'sample-home-04',
    title: 'Sample Home 04',
    category: 'available',
    status: 'Coming Soon',
    cover: null,
    photos: samplePhotos('Sample Home 04'),
    placeholder: true,
  },
  {
    slug: 'sample-lot-01',
    title: 'Sample Lot 01',
    category: 'lot',
    status: 'For Sale',
    cover: null,
    photos: sampleLotPhotos('Sample Lot 01'),
    placeholder: true,
  },
  {
    slug: 'sample-lot-02',
    title: 'Sample Lot 02',
    category: 'lot',
    status: 'For Sale',
    cover: null,
    photos: sampleLotPhotos('Sample Lot 02'),
    placeholder: true,
  },
];
