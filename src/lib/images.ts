import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { pickImage } from './pick-image.ts';

// Every image under src/assets, keyed by its path relative to this file.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

const FULL_MAX_WIDTH = 2000;

/** `path` is relative to src/assets/, for example "projects/my-project/front.jpg". */
export function resolveImage(path: string | null): ImageMetadata | null {
  return pickImage(files, path);
}

export function projectImage(slug: string, file: string | null): ImageMetadata | null {
  return resolveImage(file ? `projects/${slug}/${file}` : null);
}

export function homeImage(slug: string, file: string | null): ImageMetadata | null {
  return resolveImage(file ? `homes/${slug}/${file}` : null);
}

export function siteImage(file: string | null): ImageMetadata | null {
  return resolveImage(file ? `site/${file}` : null);
}

/** Everything the photo grid and the lightbox need to show one photo. */
export type GalleryItem = {
  image: ImageMetadata | null;
  /** The large version opened in the lightbox. Null when the photo is a placeholder. */
  full: { src: string; width: number; height: number } | null;
  alt: string;
  caption?: string;
  /** Where the caption links to, if anywhere. */
  href?: string;
};

export async function toGalleryItem(
  image: ImageMetadata | null,
  alt: string,
  caption?: string,
  href?: string,
): Promise<GalleryItem> {
  if (!image) return { image: null, full: null, alt, caption, href };
  const width = Math.min(image.width, FULL_MAX_WIDTH);
  const height = Math.round((image.height * width) / image.width);
  const full = await getImage({ src: image, width, height, format: 'webp' });
  return { image, full: { src: full.src, width, height }, alt, caption, href };
}
