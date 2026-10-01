import type { Listing, ListingCategory, Photo, Project, RoomPage } from '../data/types.ts';

export type RoomPhoto = { photo: Photo; project: Project };

export function filterListings(all: Listing[], category?: ListingCategory): Listing[] {
  return category ? all.filter((listing) => listing.category === category) : all;
}

/** Every photo tagged with `room`, across all projects, in project order. */
export function photosForRoom(all: Project[], room: RoomPage): RoomPhoto[] {
  return all.flatMap((project) =>
    project.photos.filter((photo) => photo.room === room).map((photo) => ({ photo, project })),
  );
}

export function featuredProjects(all: Project[], limit = 3): Project[] {
  return all.filter((project) => project.featured).slice(0, limit);
}

/** A small cross-section of photos: the first `perProject` from each project, capped at `limit`. */
export function previewPhotos(all: Project[], perProject: number, limit: number): RoomPhoto[] {
  return all
    .flatMap((project) => project.photos.slice(0, perProject).map((photo) => ({ photo, project })))
    .slice(0, limit);
}
