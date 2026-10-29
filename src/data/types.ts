export const ROOM_PAGES = ['exterior', 'kitchen', 'bath', 'living'] as const;
export type RoomPage = (typeof ROOM_PAGES)[number];
export type Room = RoomPage | 'other';

export const ROOM_LABELS: Record<RoomPage, string> = {
  exterior: 'Exterior',
  kitchen: 'Kitchen',
  bath: 'Bath',
  living: 'Living',
};

export type Photo = {
  /** File name inside the item's image folder, or null to show a placeholder tile. */
  file: string | null;
  /** Which Gallery room page this photo also appears on. Use 'other' for none. */
  room: Room;
  /** Describes the photo for people who cannot see it. */
  alt: string;
};

export type ListingCategory = 'available' | 'lot';
export type ListingStatus = 'Available' | 'For Sale' | 'Pending' | 'Coming Soon' | 'Sold';

export type Listing = {
  /** Used in the address: /homes/<slug>/. Lowercase letters, numbers and hyphens. */
  slug: string;
  title: string;
  category: ListingCategory;
  status: ListingStatus;
  neighborhood?: string;
  /** Street, city and state, for example '6616 Deloache Avenue, Dallas, TX'. Also places the map pin. */
  address?: string;
  price?: string;
  /** For a lot, beds, baths, garage and features describe the home planned for it. */
  beds?: number;
  baths?: number;
  sqft?: number;
  /** Number of cars. */
  garage?: number;
  /** For example 'Office', 'Game room', 'Flex room', 'Pool'. */
  features?: string[];
  /** For a lot planned for more than one home. */
  units?: number;
  /** The lot's area, for example '10,500 sq ft'. */
  lotSize?: string;
  /** Frontage by depth, for example '75 × 140 ft'. Leave out for an irregular lot. */
  lotDimensions?: string;
  description?: string;
  /** File name in src/assets/homes/<slug>/, or null for a placeholder tile. */
  cover: string | null;
  /** Describes the cover when it is not one of `photos`, such as a lot drawing. */
  coverAlt?: string;
  /** The part of the cover kept in view when a card crops it: across, then down. Default 'center'. */
  coverPosition?: string;
  /** A short note shown under the cover, for example 'Concept rendering of the planned home'. */
  coverCaption?: string;
  /** The heading over `photos` when they are not photographs. Default 'Photos'. */
  photosHeading?: string;
  /** The photographer, credited under the photos, for example 'Robert Tsai'. */
  photoCredit?: string;
  photos: Photo[];
  /** True for sample entries that must be replaced before launch. */
  placeholder: boolean;
};

export type Project = {
  /** Used in the address: /gallery/<slug>/. Lowercase letters, numbers and hyphens. */
  slug: string;
  name: string;
  location?: string;
  /** What kind of project, when it is not a new build, for example 'Remodel'. */
  kind?: string;
  /** Front elevation. File name in src/assets/projects/<slug>/, or null. */
  cover: string | null;
  /** The photographer, credited under the photos, for example 'Robert Tsai'. */
  photoCredit?: string;
  photos: Photo[];
  /** Featured projects appear on the home page (first three). */
  featured: boolean;
  placeholder: boolean;
};

/** Slugs that would collide with fixed pages. */
export const RESERVED_LISTING_SLUGS: readonly string[] = ['available', 'lots', 'build-on-your-lot'];
export const RESERVED_PROJECT_SLUGS: readonly string[] = ROOM_PAGES;
