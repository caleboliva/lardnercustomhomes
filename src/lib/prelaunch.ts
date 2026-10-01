import type { Listing, Photo, Project } from '../data/types.ts';
import { isPlaceholder } from './format.ts';

export type PrelaunchInput = {
  listings: Listing[];
  projects: Project[];
  /** The whole page-copy object; every string in it is checked. */
  copy: unknown;
  heroImage: string | null;
  formEndpoint: string;
};

function placeholderPaths(value: unknown, path: string): string[] {
  if (typeof value === 'string') return isPlaceholder(value) ? [path] : [];
  if (Array.isArray(value)) return value.flatMap((item, i) => placeholderPaths(item, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => placeholderPaths(item, `${path}.${key}`));
  }
  return [];
}

function emptySlots(cover: string | null, photos: Photo[]): number {
  return (cover ? 0 : 1) + photos.filter((photo) => !photo.file).length;
}

const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** Everything that would be embarrassing to publish. An empty list means the site is ready. */
export function prelaunchProblems(input: PrelaunchInput): string[] {
  const problems: string[] = [];

  const sampleListings = input.listings.filter((listing) => listing.placeholder);
  if (sampleListings.length > 0) {
    problems.push(
      `${count(sampleListings.length, 'sample entry', 'sample entries')} still in src/data/homes.ts: ${sampleListings.map((l) => l.title).join(', ')}.`,
    );
  }

  const sampleProjects = input.projects.filter((project) => project.placeholder);
  if (sampleProjects.length > 0) {
    problems.push(
      `${count(sampleProjects.length, 'sample entry', 'sample entries')} still in src/data/projects.ts: ${sampleProjects.map((p) => p.name).join(', ')}.`,
    );
  }

  for (const listing of input.listings.filter((l) => !l.placeholder)) {
    const empty = emptySlots(listing.cover, listing.photos);
    if (empty > 0) problems.push(`${listing.title} has ${count(empty, 'photo', 'photos')} without a file (src/data/homes.ts).`);
  }

  for (const project of input.projects.filter((p) => !p.placeholder)) {
    const empty = emptySlots(project.cover, project.photos);
    if (empty > 0) problems.push(`${project.name} has ${count(empty, 'photo', 'photos')} without a file (src/data/projects.ts).`);
  }

  for (const path of placeholderPaths(input.copy, 'copy')) {
    problems.push(`Placeholder text remains at ${path} (src/data/copy.ts).`);
  }

  if (!input.heroImage) {
    problems.push('The home page hero photo is not set (copy.home.hero.image in src/data/copy.ts).');
  }

  if (!input.formEndpoint) {
    problems.push(
      'The Inventory form is not connected (PUBLIC_FORM_ENDPOINT is empty), so enquiries would not reach Colin. See README.',
    );
  }

  return problems;
}
