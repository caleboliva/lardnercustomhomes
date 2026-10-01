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
export type ListingStatus = 'For Sale' | 'Pending' | 'Coming Soon' | 'Sold';

export type Listing = {
  /** Used in the address: /homes/<slug>/. Lowercase letters, numbers and hyphens. */
  slug: string;
  title: string;
  category: ListingCategory;
  status: ListingStatus;
  neighborhood?: string;
  address?: string;
  price?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  lotSize?: string;
  description?: string;
  /** File name in src/assets/homes/<slug>/, or null for a placeholder tile. */
  cover: string | null;
  photos: Photo[];
  /** True for sample entries that must be replaced before launch. */
  placeholder: boolean;
};

export type Project = {
  /** Used in the address: /gallery/<slug>/. Lowercase letters, numbers and hyphens. */
  slug: string;
  name: string;
  location?: string;
  /** Front elevation. File name in src/assets/projects/<slug>/, or null. */
  cover: string | null;
  photos: Photo[];
  /** Featured projects appear on the home page (first three). */
  featured: boolean;
  placeholder: boolean;
};

/** Slugs that would collide with fixed pages. */
export const RESERVED_LISTING_SLUGS: readonly string[] = ['available', 'lots', 'build-on-your-lot'];
export const RESERVED_PROJECT_SLUGS: readonly string[] = ROOM_PAGES;
