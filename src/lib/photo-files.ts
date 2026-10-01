export type PhotoRef = {
  /** Folder under src/assets/, for example "projects/my-project". */
  dir: string;
  file: string;
};

// Keep in step with the file pattern in images.ts.
const USABLE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'JPG', 'JPEG', 'PNG', 'WEBP'];

/**
 * Lists photo names in the data that the site cannot show: no file with exactly that name
 * (upper and lower case matter), or a file type the site does not handle. Each of these
 * would otherwise appear on the site as a "Placeholder" tile.
 */
export function findMissingPhotos(refs: PhotoRef[], readDir: (dir: string) => string[]): string[] {
  return refs
    .filter(({ dir, file }) => {
      const extension = file.split('.').pop() ?? '';
      return !USABLE_EXTENSIONS.includes(extension) || !readDir(dir).includes(file);
    })
    .map(({ dir, file }) => `${dir}/${file}`);
}
