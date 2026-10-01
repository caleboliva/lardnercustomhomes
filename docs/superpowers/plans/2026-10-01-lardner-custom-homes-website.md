# Lardner Custom Homes Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a five-area static website (Home, Homes, Gallery, About, Inventory) for Lardner Custom Homes with labelled placeholder content, ready for real photos and copy to be dropped in.

**Architecture:** An Astro static site. Content lives in typed data files under `src/data/`; pure logic lives in `src/lib/` and is unit-tested with Node's built-in test runner; presentation is `.astro` components with scoped CSS on top of shared design tokens. Interactivity (navigation, lightbox, scroll reveal, enquiry form) is four small TypeScript modules with no framework.

**Tech Stack:** Astro 7.3, TypeScript 6.0, Node.js 24, plain CSS custom properties, Fontsource (Cormorant Garamond, Jost), `astro:assets` (sharp) for images, `node --test` for tests.

**Spec:** `docs/superpowers/specs/2026-10-01-lardner-custom-homes-website-design.md`

## Global Constraints

- Node.js `>=22.12.0` (installed: 24.19.0). On this machine Node was installed mid-session, so every shell command must first run `$env:Path = "C:\Program Files\nodejs;" + $env:Path`.
- Shell is PowerShell. Chain with `;`, not `&&`.
- Dependencies are limited to: `astro`, `@fontsource-variable/jost`, `@fontsource-variable/cormorant-garamond`, and dev-only `@astrojs/check`, `typescript@^6` (`@astrojs/check` does not support TypeScript 7), `@types/node`. Add nothing else.
- Palette, exactly: Honeydew `#F0FFF0`, Champagne `#F7E6CA`, Powder Blue `#B8E3E9`, Midnight Blue `#272757`, plus derived `#12122B` and `#FFFFFF`. No other colours. Components use the semantic tokens, never raw hex.
- Text colour is Midnight Blue on light surfaces and white on dark. Champagne is never a text colour.
- Square corners, no box shadows, no gradients used as decoration.
- No invented facts. Copy comes from lardnercustomhomes.com or lardnergroup.com, with the source recorded in a comment. Anything else is `placeholder('…')`, which renders as `[Placeholder: …]`.
- Sample data entries are named `Sample …` and carry `placeholder: true`.
- American English in all site copy.
- Contact constants, exactly: phone `(844) 527-3637` / `tel:8445273637`; email `colin@lardnergroup.com`; address `Dallas, TX 75220`; Facebook `https://www.facebook.com/dallashomesforsale`; Instagram `https://www.instagram.com/lardner_group/`.
- Breakpoints: mobile under `40rem` (640px), tablet `40rem`–`63.99rem`, desktop `64rem` (1024px) and up.
- Every interactive control is at least 44 × 44px and has a visible `:focus-visible` state.
- All motion is disabled under `prefers-reduced-motion: reduce`. Animate only `opacity` and `transform`.
- Astro 7 strips whitespace between elements that sit on separate lines (JSX rules). Keep inline text and its inline elements on one line, or add `{' '}`.
- Astro 7's compiler rejects unclosed tags and invalid nesting. Inside `<button>` and `<a>` wrappers that hold photos, use `<span>` elements, not `<div>`.
- Relative imports of TypeScript files include the `.ts` extension, and type-only imports use `import type` (required for `node --test`).
- Every commit message ends with the line `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

These are the conditions the spec implies but does not spell out. Each has a test or check in the task named.

1. **Phone numbers typed the way people type them** (`+1 (214) 555-0100`, `214.555.0100`, `214 555 0100`) are accepted; 7-digit and 11-digit-not-starting-with-1 numbers are rejected. Tests in Task 11.
2. **Whitespace-only required fields** are treated as empty. Test in Task 11.
3. **A photo file name in the data that does not exist on disk** renders the placeholder tile, not a broken image. Test in Task 5.
4. **A lightbox set of one photo** hides previous/next and never navigates; sets of many wrap at both ends. Tests in Task 6.
5. **A category with no listings** (for example, no lots) shows the empty state, not an empty grid. Test in Task 2, check in Task 7.
6. **The form service failing or timing out** shows the error state with the visitor's entries intact, and a second click while sending does nothing. Check in Task 11.
7. **Opening a project page directly** (no referrer) makes the X go to `/gallery/` instead of leaving the site. Check in Task 8.

## File Structure

```
.claude/launch.json                     dev server entry for the browser pane
.env.example                            documents PUBLIC_FORM_ENDPOINT
astro.config.mjs
package.json
tsconfig.json
README.md                               how to run, add content, connect the form
CONTENT-TODO.md                         what Colin needs to supply
scripts/make-brand-assets.mjs           crops the L mark and favicon from the logo
public/
  favicon.png
  documents/iabs.pdf
  documents/consumer-protection-notice.pdf
src/
  env.d.ts
  assets/
    brand/lardner-custom-homes-logo.webp
    brand/lardner-custom-homes-mark.png
    people/colin-lardner.jpg
    projects/<slug>/…                   project photos (empty for now)
    homes/<slug>/…                      listing photos (empty for now)
    site/…                              hero and other page photos (empty for now)
  data/
    types.ts                            Listing, Project, Photo, Room types
    site.ts                             contact, social, legal constants
    navigation.ts                       primary nav and the two sub-navs
    homes.ts                            listings
    projects.ts                         gallery projects
    copy.ts                             page copy with sources
  lib/
    format.ts                           placeholder(), specLine(), formatNumber()
    content.ts                          filterListings(), photosForRoom(), …
    nav-utils.ts                        isCurrentPage(), isCurrentSection()
    scroll.ts                           nextHeaderState()
    carousel.ts                         wrapIndex(), swipeDirection()
    pick-image.ts                       pickImage()
    images.ts                           resolveImage(), toGalleryItem() (Astro-only)
    validation.ts                       form rules and payload
  scripts/
    scroll-lock.ts                      lockScroll(), unlockScroll()
    nav.ts                              header hide/show, submenus, mobile menu
    reveal.ts                           scroll reveal
    lightbox.ts                         lightbox behaviour
    project-view.ts                     close/back behaviour on project pages
    inquiry-form.ts                     form validation UI and submission
  styles/
    tokens.css                          colour, type, space, motion tokens
    base.css                            reset and element styles
    components.css                      shared classes (container, btn, grid, …)
  layouts/BaseLayout.astro
  components/
    Icon.astro  Copy.astro  Photo.astro
    Header.astro  NavList.astro  MobileMenu.astro  Footer.astro  SocialLinks.astro
    PageHeader.astro  SubNav.astro
    ListingCard.astro  ListingsView.astro
    ProjectCard.astro  RoomView.astro
    LightboxTrigger.astro  PhotoGrid.astro  Lightbox.astro
    InquiryForm.astro
  pages/
    index.astro  about.astro  inventory.astro  404.astro
    homes/index.astro  homes/available.astro  homes/lots.astro
    homes/build-on-your-lot.astro  homes/[slug].astro
    gallery/index.astro  gallery/exterior.astro  gallery/kitchen.astro
    gallery/bath.astro  gallery/living.astro  gallery/[slug].astro
tests/
  data.test.ts  content.test.ts  scroll.test.ts  carousel.test.ts
  pick-image.test.ts  validation.test.ts
```

Departures from the spec, each deliberate:

- **File list.** The project view uses `BaseLayout` with `header={false}` instead of a separate `ImmersiveLayout`, and `Picture`/`Placeholder`/`Button` are folded into `Photo.astro` and the `.btn` class. This removes duplication.
- **Header logo.** On desktop the full logo shows at the top of the page; once the visitor scrolls, the bar shrinks and shows the "L" mark. This keeps the wordmark readable where there is room and stops a tall bar covering content when it reappears.
- **Submenus.** They open on hover and through the disclosure button, not on focus alone. Opening on focus would leave the button's `aria-expanded` state wrong for screen-reader users; the button is the standard keyboard route.
- **Round icon buttons.** The social links and the close/previous/next controls are circles. Everything else has square corners. A circle is the familiar shape for an icon-only control and keeps them distinct from text links.

---

### Task 1: Project scaffold and brand assets

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `.env.example`, `src/env.d.ts`, `.claude/launch.json`
- Create: `scripts/make-brand-assets.mjs`
- Create: `src/pages/index.astro` (temporary; replaced in Task 9)
- Copy in: logo, Colin's photo, two PDFs
- Generate: `src/assets/brand/lardner-custom-homes-mark.png`, `public/favicon.png`

**Interfaces:**
- Consumes: source assets in `C:\Users\User\OneDrive\Documents\Lardner Custom Homes Website`
- Produces: `npm run dev`, `npm run build`, `npm run check`, `npm test`; asset paths listed above; env vars `PUBLIC_FORM_ENDPOINT`, `PUBLIC_FORM_ACCESS_KEY`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "lardner-custom-homes",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "engines": { "node": ">=22.12.0" },
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "node --test \"tests/**/*.test.ts\"",
    "brand-assets": "node scripts/make-brand-assets.mjs"
  }
}
```

- [ ] **Step 2: Install dependencies**

```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
npm install astro@^7.3.5 @fontsource-variable/jost@^5.3.0 @fontsource-variable/cormorant-garamond@^5.3.0
npm install -D @astrojs/check@^0.9.10 typescript@^6.0.3 @types/node@^24.19.0
```

Expected: both commands finish with "added N packages" and no `ERESOLVE` error.

- [ ] **Step 3: Write config files**

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lardnercustomhomes.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
```

`tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "types": ["node"]
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "node_modules"]
}
```

`.gitignore`:

```
node_modules/
dist/
.astro/
.env
.env.*
!.env.example
.DS_Store
Thumbs.db
```

`.env.example`:

```
# Address the Inventory form posts to. Leave empty until a form service is set up.
PUBLIC_FORM_ENDPOINT=

# Optional. Only for services whose key is designed to be public (for example Web3Forms).
# Never put a private or secret key in a PUBLIC_ variable: it ships to every visitor's browser.
PUBLIC_FORM_ACCESS_KEY=
```

`src/env.d.ts`:

```ts
interface ImportMetaEnv {
  readonly PUBLIC_FORM_ENDPOINT?: string;
  readonly PUBLIC_FORM_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

`.claude/launch.json`:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "lardner-dev",
      "runtimeExecutable": "C:\\Program Files\\nodejs\\npm.cmd",
      "runtimeArgs": ["run", "dev"],
      "port": 4321
    }
  ]
}
```

- [ ] **Step 4: Copy the supplied assets**

```powershell
$src = "C:\Users\User\OneDrive\Documents\Lardner Custom Homes Website"
New-Item -ItemType Directory -Force src\assets\brand, src\assets\people, src\assets\projects, src\assets\homes, src\assets\site, public\documents | Out-Null
Copy-Item "$src\Lardner-Custom-Homes-Logo.webp" src\assets\brand\lardner-custom-homes-logo.webp
Copy-Item "$src\About.Colin.Lardner.jpg" src\assets\people\colin-lardner.jpg
Copy-Item "$src\broker-services-870518246.pdf" public\documents\iabs.pdf
Copy-Item "$src\CN 1-5_0.pdf" public\documents\consumer-protection-notice.pdf
foreach ($d in "projects","homes","site") { New-Item -ItemType File -Force "src\assets\$d\.gitkeep" | Out-Null }
```

- [ ] **Step 5: Write `scripts/make-brand-assets.mjs`**

The supplied logo is 1500 × 1346 with a transparent background. The colour-block "L" occupies x 410–1095 and y 34–905 (measured from the file).

```js
// Derives the "L" mark and the favicon from the supplied logo. Nothing is redrawn.
import sharp from 'sharp';

const logo = 'src/assets/brand/lardner-custom-homes-logo.webp';
const mark = { left: 410, top: 34, width: 686, height: 872 };
const clear = { r: 0, g: 0, b: 0, alpha: 0 };

await sharp(logo).extract(mark).png().toFile('src/assets/brand/lardner-custom-homes-mark.png');

await sharp(logo)
  .extract(mark)
  .resize({ width: 180, height: 180, fit: 'contain', background: clear })
  .png()
  .toFile('public/favicon.png');

console.log('Wrote lardner-custom-homes-mark.png and favicon.png');
```

- [ ] **Step 6: Generate the mark and favicon, then look at them**

```powershell
npm run brand-assets
```

Expected: `Wrote lardner-custom-homes-mark.png and favicon.png`. Open `src/assets/brand/lardner-custom-homes-mark.png` with the Read tool and confirm it shows the complete "L" with no clipped squares and no wordmark.

- [ ] **Step 7: Write a temporary home page**

`src/pages/index.astro`:

```astro
---
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lardner Custom Homes</title>
  </head>
  <body>
    <h1>Lardner Custom Homes</h1>
  </body>
</html>
```

- [ ] **Step 8: Build**

```powershell
npm run build
```

Expected: `astro check` reports `0 errors`, then `1 page(s) built` and `dist/index.html` exists.

- [ ] **Step 9: Commit**

```powershell
git add -A
git commit -m "Scaffold Astro project and add brand assets" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Content model, sample data and pure helpers

**Files:**
- Create: `src/data/types.ts`, `src/data/site.ts`, `src/data/navigation.ts`, `src/data/homes.ts`, `src/data/projects.ts`, `src/data/copy.ts`
- Create: `src/lib/format.ts`, `src/lib/content.ts`, `src/lib/nav-utils.ts`
- Test: `tests/data.test.ts`, `tests/content.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `types.ts`: `ROOM_PAGES`, `ROOM_LABELS`, `RoomPage`, `Room`, `Photo`, `ListingCategory`, `ListingStatus`, `Listing`, `Project`, `RESERVED_LISTING_SLUGS`, `RESERVED_PROJECT_SLUGS`
  - `site.ts`: `site` (`name`, `url`, `description`, `phone`, `email`, `address`, `social[]`, `legal[]`)
  - `navigation.ts`: `NavItem`, `primaryNav: { left: NavItem[]; right: NavItem[] }`, `homesSubNav`, `gallerySubNav`
  - `homes.ts`: `listings: Listing[]`; `projects.ts`: `projects: Project[]`; `copy.ts`: `copy`
  - `format.ts`: `placeholder(need: string): string`, `isPlaceholder(text: string): boolean`, `formatNumber(n: number): string`, `specLine(listing: Listing): string`
  - `content.ts`: `filterListings(all, category?)`, `photosForRoom(all, room): RoomPhoto[]`, `featuredProjects(all, limit?)`, `previewPhotos(all, perProject, limit): RoomPhoto[]`, type `RoomPhoto = { photo: Photo; project: Project }`
  - `nav-utils.ts`: `isCurrentPage(pathname, href): boolean`, `isCurrentSection(pathname, href): boolean`

- [ ] **Step 1: Write `src/data/types.ts`**

```ts
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
```

- [ ] **Step 2: Write `src/data/site.ts` and `src/data/navigation.ts`**

`src/data/site.ts`:

```ts
export const site = {
  name: 'Lardner Custom Homes',
  url: 'https://lardnercustomhomes.com',
  description: 'Lardner Custom Homes designs and builds custom homes in Dallas, Texas.',
  phone: { display: '(844) 527-3637', href: 'tel:8445273637' },
  email: { display: 'colin@lardnergroup.com', href: 'mailto:colin@lardnergroup.com' },
  address: 'Dallas, TX 75220',
  social: [
    { name: 'Facebook', href: 'https://www.facebook.com/dallashomesforsale', icon: 'facebook' },
    { name: 'Instagram', href: 'https://www.instagram.com/lardner_group/', icon: 'instagram' },
  ],
  legal: [
    {
      label: 'Texas Real Estate Commission Information About Brokerage Services',
      href: '/documents/iabs.pdf',
    },
    {
      label: 'Texas Real Estate Commission Consumer Protection Notice',
      href: '/documents/consumer-protection-notice.pdf',
    },
  ],
} as const;
```

`src/data/navigation.ts`:

```ts
import { ROOM_LABELS, ROOM_PAGES } from './types.ts';

export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

const homesChildren: NavLink[] = [
  { label: 'Available', href: '/homes/available/' },
  { label: 'Lots', href: '/homes/lots/' },
  { label: 'Build on Your Lot', href: '/homes/build-on-your-lot/' },
];

const galleryChildren: NavLink[] = ROOM_PAGES.map((room) => ({
  label: ROOM_LABELS[room],
  href: `/gallery/${room}/`,
}));

/** The logo sits between `left` and `right` on desktop. */
export const primaryNav: { left: NavItem[]; right: NavItem[] } = {
  left: [
    { label: 'Homes', href: '/homes/', children: homesChildren },
    { label: 'Gallery', href: '/gallery/', children: galleryChildren },
  ],
  right: [
    { label: 'About', href: '/about/' },
    { label: 'Inventory', href: '/inventory/' },
  ],
};

export const homesSubNav: NavLink[] = [{ label: 'All Homes', href: '/homes/' }, ...homesChildren];
export const gallerySubNav: NavLink[] = [{ label: 'Projects', href: '/gallery/' }, ...galleryChildren];
```

- [ ] **Step 3: Write `src/lib/format.ts`, `src/lib/content.ts`, `src/lib/nav-utils.ts` as empty stubs**

So the tests in the next step fail on behaviour, not on a missing file.

`src/lib/format.ts`:

```ts
import type { Listing } from '../data/types.ts';

export function placeholder(_need: string): string {
  return '';
}

export function isPlaceholder(_text: string): boolean {
  return false;
}

export function formatNumber(_n: number): string {
  return '';
}

export function specLine(_listing: Listing): string {
  return '';
}
```

`src/lib/content.ts`:

```ts
import type { Listing, ListingCategory, Photo, Project, RoomPage } from '../data/types.ts';

export type RoomPhoto = { photo: Photo; project: Project };

export function filterListings(_all: Listing[], _category?: ListingCategory): Listing[] {
  return [];
}

export function photosForRoom(_all: Project[], _room: RoomPage): RoomPhoto[] {
  return [];
}

export function featuredProjects(_all: Project[], _limit = 3): Project[] {
  return [];
}

export function previewPhotos(_all: Project[], _perProject: number, _limit: number): RoomPhoto[] {
  return [];
}
```

`src/lib/nav-utils.ts`:

```ts
export function isCurrentPage(_pathname: string, _href: string): boolean {
  return false;
}

export function isCurrentSection(_pathname: string, _href: string): boolean {
  return false;
}
```

- [ ] **Step 4: Write the failing tests in `tests/content.test.ts`**

```ts
import assert from 'node:assert/strict';
import test from 'node:test';
import type { Listing, Project } from '../src/data/types.ts';
import { featuredProjects, filterListings, photosForRoom, previewPhotos } from '../src/lib/content.ts';
import { formatNumber, isPlaceholder, placeholder, specLine } from '../src/lib/format.ts';
import { isCurrentPage, isCurrentSection } from '../src/lib/nav-utils.ts';

const listing = (over: Partial<Listing>): Listing => ({
  slug: 'a',
  title: 'A',
  category: 'available',
  status: 'For Sale',
  cover: null,
  photos: [],
  placeholder: false,
  ...over,
});

const project = (over: Partial<Project>): Project => ({
  slug: 'p',
  name: 'P',
  cover: null,
  photos: [],
  featured: false,
  placeholder: false,
  ...over,
});

test('placeholder() wraps the need and isPlaceholder() recognises it', () => {
  assert.equal(placeholder('a bio'), '[Placeholder: a bio]');
  assert.equal(isPlaceholder('[Placeholder: a bio]'), true);
  assert.equal(isPlaceholder('A real sentence.'), false);
});

test('formatNumber() adds thousands separators', () => {
  assert.equal(formatNumber(4250), '4,250');
  assert.equal(formatNumber(980), '980');
});

test('specLine() joins the specs that exist, with singular and plural', () => {
  assert.equal(specLine(listing({ beds: 4, baths: 1, sqft: 4250 })), '4 beds · 1 bath · 4,250 sq ft');
  assert.equal(specLine(listing({ category: 'lot', lotSize: '0.4 acre' })), '0.4 acre lot');
});

test('specLine() is empty for a real listing with no specs and a labelled placeholder for a sample', () => {
  assert.equal(specLine(listing({})), '');
  assert.equal(specLine(listing({ placeholder: true })), '[Placeholder: beds, baths, sq ft]');
  assert.equal(specLine(listing({ placeholder: true, category: 'lot' })), '[Placeholder: lot size]');
});

test('filterListings() returns everything with no category and only matches with one', () => {
  const all = [listing({ slug: 'h' }), listing({ slug: 'l', category: 'lot' })];
  assert.deepEqual(filterListings(all).map((l) => l.slug), ['h', 'l']);
  assert.deepEqual(filterListings(all, 'lot').map((l) => l.slug), ['l']);
});

test('filterListings() returns an empty list when a category has no entries', () => {
  assert.deepEqual(filterListings([listing({})], 'lot'), []);
});

test('photosForRoom() collects matching photos across projects in order', () => {
  const all = [
    project({ slug: 'one', photos: [
      { file: null, room: 'kitchen', alt: 'k1' },
      { file: null, room: 'bath', alt: 'b1' },
    ] }),
    project({ slug: 'two', photos: [{ file: null, room: 'kitchen', alt: 'k2' }] }),
  ];
  const result = photosForRoom(all, 'kitchen');
  assert.deepEqual(result.map((r) => `${r.project.slug}:${r.photo.alt}`), ['one:k1', 'two:k2']);
  assert.deepEqual(photosForRoom(all, 'living'), []);
});

test('featuredProjects() keeps only featured projects, up to the limit', () => {
  const all = ['a', 'b', 'c', 'd'].map((slug) => project({ slug, featured: slug !== 'b' }));
  assert.deepEqual(featuredProjects(all, 2).map((p) => p.slug), ['a', 'c']);
  assert.deepEqual(featuredProjects(all).map((p) => p.slug), ['a', 'c', 'd']);
});

test('previewPhotos() takes the first few photos of each project, up to the limit', () => {
  const photos = (n: number) => Array.from({ length: n }, (_, i) => ({ file: null, room: 'other' as const, alt: `x${i}` }));
  const all = [project({ slug: 'one', photos: photos(3) }), project({ slug: 'two', photos: photos(1) }), project({ slug: 'three', photos: photos(3) })];
  const result = previewPhotos(all, 2, 4).map((r) => `${r.project.slug}:${r.photo.alt}`);
  assert.deepEqual(result, ['one:x0', 'one:x1', 'two:x0', 'three:x0']);
});

test('isCurrentPage() matches exactly, ignoring a missing trailing slash', () => {
  assert.equal(isCurrentPage('/homes/', '/homes/'), true);
  assert.equal(isCurrentPage('/homes', '/homes/'), true);
  assert.equal(isCurrentPage('/homes/lots/', '/homes/'), false);
});

test('isCurrentSection() matches a page and everything beneath it, but "/" only matches itself', () => {
  assert.equal(isCurrentSection('/homes/lots/', '/homes/'), true);
  assert.equal(isCurrentSection('/gallery/sample-project-01/', '/gallery/'), true);
  assert.equal(isCurrentSection('/about/', '/homes/'), false);
  assert.equal(isCurrentSection('/homes/', '/'), false);
  assert.equal(isCurrentSection('/', '/'), true);
});
```

- [ ] **Step 5: Run the tests and confirm they fail**

```powershell
npm test
```

Expected: FAIL. `placeholder() wraps the need…` fails with `'' !== '[Placeholder: a bio]'`, and the other tests fail on empty results.

- [ ] **Step 6: Implement the three helper modules**

`src/lib/format.ts`:

```ts
import type { Listing } from '../data/types.ts';

const PLACEHOLDER_PREFIX = '[Placeholder:';

/** Marks text that still needs to be supplied. Renders highlighted on the page. */
export function placeholder(need: string): string {
  return `${PLACEHOLDER_PREFIX} ${need}]`;
}

export function isPlaceholder(text: string): boolean {
  return text.startsWith(PLACEHOLDER_PREFIX);
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

/** One line of specs for a listing card, for example "4 beds · 3 baths · 4,250 sq ft". */
export function specLine(listing: Listing): string {
  const parts: string[] = [];
  if (listing.beds !== undefined) parts.push(`${listing.beds} ${listing.beds === 1 ? 'bed' : 'beds'}`);
  if (listing.baths !== undefined) parts.push(`${listing.baths} ${listing.baths === 1 ? 'bath' : 'baths'}`);
  if (listing.sqft !== undefined) parts.push(`${formatNumber(listing.sqft)} sq ft`);
  if (listing.lotSize) parts.push(`${listing.lotSize} lot`);
  if (parts.length > 0) return parts.join(' · ');
  if (!listing.placeholder) return '';
  return placeholder(listing.category === 'lot' ? 'lot size' : 'beds, baths, sq ft');
}
```

`src/lib/content.ts`:

```ts
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
```

`src/lib/nav-utils.ts`:

```ts
function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

export function isCurrentPage(pathname: string, href: string): boolean {
  return withTrailingSlash(pathname) === withTrailingSlash(href);
}

/** True when `pathname` is `href` or a page beneath it. The home page only matches itself. */
export function isCurrentSection(pathname: string, href: string): boolean {
  const path = withTrailingSlash(pathname);
  const target = withTrailingSlash(href);
  return target === '/' ? path === '/' : path.startsWith(target);
}
```

- [ ] **Step 7: Run the tests and confirm they pass**

```powershell
npm test
```

Expected: PASS, 11 tests.

- [ ] **Step 8: Write the failing data tests in `tests/data.test.ts`**

```ts
import assert from 'node:assert/strict';
import test from 'node:test';
import { copy } from '../src/data/copy.ts';
import { listings } from '../src/data/homes.ts';
import { gallerySubNav, homesSubNav, primaryNav } from '../src/data/navigation.ts';
import { projects } from '../src/data/projects.ts';
import { site } from '../src/data/site.ts';
import { RESERVED_LISTING_SLUGS, RESERVED_PROJECT_SLUGS, ROOM_PAGES } from '../src/data/types.ts';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ROOMS: readonly string[] = [...ROOM_PAGES, 'other'];

function assertUnique(values: string[], what: string): void {
  assert.equal(new Set(values).size, values.length, `${what} must be unique`);
}

test('listing slugs are unique, URL-safe and do not collide with fixed pages', () => {
  const slugs = listings.map((l) => l.slug);
  assertUnique(slugs, 'listing slugs');
  for (const slug of slugs) {
    assert.match(slug, SLUG);
    assert.equal(RESERVED_LISTING_SLUGS.includes(slug), false, `"${slug}" is reserved`);
  }
});

test('project slugs are unique, URL-safe and do not collide with room pages', () => {
  const slugs = projects.map((p) => p.slug);
  assertUnique(slugs, 'project slugs');
  for (const slug of slugs) {
    assert.match(slug, SLUG);
    assert.equal(RESERVED_PROJECT_SLUGS.includes(slug), false, `"${slug}" is reserved`);
  }
});

test('every photo has alt text and a known room', () => {
  const photos = [...listings.flatMap((l) => l.photos), ...projects.flatMap((p) => p.photos)];
  assert.ok(photos.length > 0);
  for (const photo of photos) {
    assert.ok(photo.alt.trim().length > 0, 'photo alt text must not be empty');
    assert.ok(ROOMS.includes(photo.room), `unknown room "${photo.room}"`);
  }
});

test('sample entries are labelled so they cannot be mistaken for real ones', () => {
  for (const l of listings.filter((x) => x.placeholder)) assert.match(l.title, /^Sample /);
  for (const p of projects.filter((x) => x.placeholder)) assert.match(p.name, /^Sample /);
});

test('sample data exercises every page: both categories and all four rooms', () => {
  assert.ok(listings.some((l) => l.category === 'available'));
  assert.ok(listings.some((l) => l.category === 'lot'));
  for (const room of ROOM_PAGES) {
    assert.ok(projects.some((p) => p.photos.some((photo) => photo.room === room)), `no ${room} photo`);
  }
  assert.ok(projects.some((p) => p.featured));
});

test('contact constants match the brief', () => {
  assert.equal(site.phone.href, 'tel:8445273637');
  assert.equal(site.email.href, 'mailto:colin@lardnergroup.com');
  assert.equal(site.address, 'Dallas, TX 75220');
  assert.deepEqual(site.social.map((s) => s.href), [
    'https://www.facebook.com/dallashomesforsale',
    'https://www.instagram.com/lardner_group/',
  ]);
  assert.equal(site.legal.length, 2);
});

test('navigation links are site-relative and end with a slash', () => {
  const top = [...primaryNav.left, ...primaryNav.right];
  const links = [...top, ...top.flatMap((i) => i.children ?? []), ...homesSubNav, ...gallerySubNav];
  for (const link of links) assert.match(link.href, /^\/[a-z0-9/-]*\/$/, link.href);
});

test('copy has no empty strings', () => {
  const walk = (value: unknown, path: string): void => {
    if (typeof value === 'string') assert.ok(value.trim().length > 0, `${path} is empty`);
    else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`));
    else if (value && typeof value === 'object') {
      for (const [key, v] of Object.entries(value)) walk(v, `${path}.${key}`);
    }
  };
  walk(copy, 'copy');
});
```

- [ ] **Step 9: Run the tests and confirm the new file fails**

```powershell
npm test
```

Expected: FAIL with `Cannot find module` for `src/data/copy.ts` (then `homes.ts`, `projects.ts`).

- [ ] **Step 10: Write `src/data/homes.ts`**

```ts
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
```

- [ ] **Step 11: Write `src/data/projects.ts`**

```ts
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
```

- [ ] **Step 12: Write `src/data/copy.ts`**

Every block names its source. Anything Colin's two sites do not support is a `placeholder()`.

```ts
import { placeholder } from '../lib/format.ts';

export const copy = {
  home: {
    // Source: lardnercustomhomes.com home page ("Design Matters." and
    // "Making Dallas Better, One Home at a Time.").
    hero: {
      eyebrow: 'Design matters',
      title: 'Making Dallas better, one home at a time.',
      /** File name in src/assets/site/, for example 'hero.jpg'. Null shows a placeholder tile. */
      image: null as string | null,
      imageAlt: 'A home built by Lardner Custom Homes',
      primaryCta: 'View homes',
      secondaryCta: 'See the gallery',
    },
    // Source: lardnercustomhomes.com home page ("We are innovative. We develop and build homes
    // that are creative, aesthetic, efficient, and most importantly; the way you live… We hire
    // professional, accomplished and creative team members…").
    intro: {
      eyebrow: 'Lardner Custom Homes',
      heading: 'Homes built around the way you live.',
      body: [
        'We design and build homes in Dallas that are creative, efficient and good to look at. Most of all, each one is planned around the way its owners live.',
        'Our team is made up of accomplished, creative people who care about design, energy efficiency and well-chosen finishes.',
      ],
      link: 'About us',
    },
    featured: { eyebrow: 'Gallery', heading: 'Recent work', link: 'See the gallery' },
    // Source: lardnercustomhomes.com home page neighborhood list ("…And more to come!").
    neighborhoods: {
      eyebrow: 'Where we build',
      names: ['Midway Hollow', 'M-Streets', 'Uptown', 'East Village', 'Knox-Henderson', 'Preston Hollow'],
      note: 'And more to come.',
    },
    // Source: lardnercustomhomes.com home page ("Good design is good business. — Colin Lardner, CEO").
    quote: { text: 'Good design is good business.', attribution: 'Colin Lardner, CEO' },
    cta: {
      heading: 'Looking for a home, a lot or a builder?',
      body: "Tell us what you're looking for and we'll take it from there.",
      button: 'Get in touch',
    },
  },

  homes: {
    index: { title: 'Homes', intro: 'Homes for sale, lots, and building on land you already own.' },
    available: { title: 'Available Homes', intro: 'Homes for sale now and coming soon.' },
    lots: { title: 'Lots', intro: 'Land ready for a custom home.' },
    empty: {
      heading: 'Nothing is listed here right now.',
      body: "Tell us what you're looking for and we'll let you know when something comes up.",
      button: 'Get in touch',
    },
    detailCta: 'Ask about this home',
    lotDetailCta: 'Ask about this lot',
    buildOnYourLot: {
      title: 'Build on Your Lot',
      intro: 'Already have the land? We can design and build on it.',
      body: [placeholder("how building on a client's own lot works, in a few sentences from Colin")],
      button: 'Start a conversation',
    },
  },

  gallery: {
    index: { title: 'Gallery', intro: 'Select a project to see it in full.' },
    rooms: {
      exterior: 'Exteriors from across our projects.',
      kitchen: 'Kitchens from across our projects.',
      bath: 'Baths from across our projects.',
      living: 'Living spaces from across our projects.',
    },
    projectHint: 'Select a photo to view it larger.',
    empty: 'Photos are on the way.',
  },

  about: {
    title: 'About',
    colin: {
      name: 'Colin Lardner',
      // Source: lardnercustomhomes.com/about ("Colin Lardner | CEO").
      role: 'CEO',
      photoAlt: 'Colin Lardner seated in a cream armchair',
      // Sources: lardnergroup.com home page ("He'll be the guy looking up at buildings, pointing
      // out spaces…", "Texas-sized personality and New York City determination") and
      // lardnercustomhomes.com/about ("roll-up-your-sleeves attitude", "like his father and
      // grandfather before him…", "spent time in Africa and South America…", "Master's in Real
      // Estate, Columbia University", "Licenced General Contractor", "Texas Real Estate Broker",
      // "Husband to Tracy, Dad to Stoneleigh").
      bio: [
        'Colin Lardner is the one looking up at buildings and pointing out what they could become. He pairs a Texas-sized personality with New York City determination and a roll-up-your-sleeves attitude.',
        'Building runs in the family. Like his father and grandfather before him, Colin has spent his career rebuilding communities, and the Live-Work-Play concept in Dallas is part of that work. He has also spent time in Africa and South America helping people rebuild their lives, and he mentors a number of people closer to home.',
        "He holds a master's in real estate from Columbia University and is a licensed general contractor and Texas real estate broker. At home, he is husband to Tracy and dad to Stoneleigh.",
      ],
    },
    // Source: lardnercustomhomes.com home page (neighborhood list; "We hire professional,
    // accomplished and creative team members to execute on thoughtfully refined homes that feature
    // captivating design elements, energy-efficiency and sophisticated finishes. Our team is
    // tireless in maximizing the beauty, uniqueness and efficiency of each home.").
    company: {
      heading: 'The company',
      body: [
        'Lardner Custom Homes designs and builds homes across Dallas, from Midway Hollow and the M-Streets to Preston Hollow.',
        'We hire accomplished, creative people and ask them to sweat the details: design that holds your attention, energy efficiency, and finishes chosen with care. The aim is a home that is distinctive, efficient and built for the way you live.',
      ],
    },
    // Sources: lardnercustomhomes.com home page ("Design Matters.", "Good design is good
    // business.", "maximizing the beauty, uniqueness and efficiency of each home", "Making Dallas
    // Better, One Home at a Time.") and lardnergroup.com home page ("Relationships built on
    // trust, has given us a solid, reputable name in the business.").
    values: {
      heading: 'What we value',
      items: [
        {
          title: 'Design matters',
          body: 'Good design is good business. We start with how you live and design the home around it.',
        },
        {
          title: 'Beauty and efficiency',
          body: 'We work to get the most out of every home: how it looks, what makes it different and how efficiently it runs.',
        },
        {
          title: 'Trust',
          body: 'Relationships built on trust are how we earned our name in this business.',
        },
        {
          title: 'One home at a time',
          body: 'Our goal is simple. Make Dallas better, one home at a time.',
        },
      ],
    },
  },

  inventory: {
    eyebrow: 'Inventory',
    title: "Let's find your home.",
    intro: 'Share a few details and Colin will follow up about current and upcoming homes and lots.',
    galleryHeading: 'Previous projects',
    galleryLink: 'See the gallery',
  },

  notFound: {
    title: 'Page not found',
    body: "That page doesn't exist or has moved. Here are a few places to go instead.",
  },
};
```

- [ ] **Step 13: Run the tests and confirm they pass**

```powershell
npm test
```

Expected: PASS, 19 tests.

- [ ] **Step 14: Type-check and commit**

```powershell
npm run check
git add -A
git commit -m "Add content model, sample data and tested helpers" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Expected: `astro check` reports `0 errors`.

---

### Task 3: Design tokens, base styles and layout shell

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/components.css`
- Create: `src/layouts/BaseLayout.astro`, `src/components/Icon.astro`, `src/components/Copy.astro`, `src/scripts/reveal.ts`
- Modify: `src/pages/index.astro` (use the layout)

**Interfaces:**
- Consumes: `site` from `src/data/site.ts`; `isPlaceholder` from `src/lib/format.ts`
- Produces:
  - CSS tokens: `--bg`, `--surface`, `--accent`, `--text`, `--text-muted`, `--rule`, `--focus`, `--btn-bg`, `--btn-text`, `--font-display`, `--font-body`, `--step--1` … `--step-4`, `--space-1` … `--space-9`, `--space-section`, `--gutter`, `--content-max`, `--header-h`, `--header-h-compact`, `--tap`, `--ease`, `--dur-fast`, `--dur`, `--dur-slow`
  - Shared classes: `.container`, `.section`, `.section--tight`, `.section--surface`, `.section--accent`, `.eyebrow`, `.lead`, `.prose`, `.visually-hidden`, `.skip-link`, `.btn`, `.btn--ghost`, `.link-arrow`, `.grid`, `.grid--2`, `.grid--3`, `.placeholder-text`, `.empty`
  - Attribute `data-reveal` (optional `style="--reveal-i: N"` for stagger); theme attribute `data-theme="dark"`
  - `BaseLayout` props: `title: string`, `description?: string`, `header?: boolean` (default `true`)
  - `Icon` props: `name: 'menu' | 'close' | 'chevron-down' | 'arrow-left' | 'arrow-right' | 'check' | 'alert' | 'facebook' | 'instagram'`, `size?: number`
  - `Copy` props: `text: string`
  - `initReveal(): void` from `src/scripts/reveal.ts`

- [ ] **Step 1: Write `src/styles/tokens.css`**

```css
:root {
  /* Palette. Names from figma.com/colors. Change the site's colours here. */
  --color-honeydew: #f0fff0;
  --color-champagne: #f7e6ca;
  --color-powder: #b8e3e9;
  --color-midnight: #272757;
  --color-midnight-deep: #12122b;
  --color-white: #ffffff;

  /* Roles. Components use these, never the palette directly. */
  --bg: var(--color-honeydew);
  --surface: var(--color-champagne);
  --accent: var(--color-powder);
  --text: var(--color-midnight);
  --text-muted: color-mix(in srgb, var(--color-midnight) 72%, var(--color-honeydew));
  --rule: color-mix(in srgb, var(--color-midnight) 18%, transparent);
  --field-border: color-mix(in srgb, var(--color-midnight) 60%, transparent);
  --focus: var(--color-midnight);
  --btn-bg: var(--color-midnight);
  --btn-text: var(--color-honeydew);

  /* Type */
  --font-display: 'Cormorant Garamond Variable', 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --font-body: 'Jost Variable', Jost, 'Helvetica Neue', Arial, sans-serif;
  --step--1: clamp(0.8125rem, 0.79rem + 0.11vw, 0.875rem);
  --step-0: clamp(1.0625rem, 1.04rem + 0.11vw, 1.125rem);
  --step-1: clamp(1.25rem, 1.16rem + 0.45vw, 1.5rem);
  --step-2: clamp(1.625rem, 1.4rem + 1.1vw, 2.25rem);
  --step-3: clamp(2.125rem, 1.72rem + 2vw, 3.25rem);
  --step-4: clamp(2.5rem, 1.95rem + 2.7vw, 4rem);
  --leading-tight: 1.1;
  --leading-body: 1.65;
  --tracking-caps: 0.14em;
  --measure: 65ch;

  /* Space */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --space-section: clamp(4rem, 2.5rem + 6vw, 8rem);
  --gutter: clamp(1.25rem, 0.5rem + 3.2vw, 3rem);
  --content-max: 82.5rem;

  /* Layout */
  --header-h: 4rem;
  --header-h-compact: 4rem;
  --tap: 2.75rem;

  /* Motion */
  --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
  --dur-fast: 180ms;
  --dur: 320ms;
  --dur-slow: 700ms;
}

@media (min-width: 64rem) {
  :root {
    --header-h: 8.5rem;
    --header-h-compact: 4.5rem;
  }
}

[data-theme='dark'] {
  --bg: var(--color-midnight-deep);
  --text: var(--color-white);
  --text-muted: color-mix(in srgb, var(--color-white) 74%, var(--color-midnight-deep));
  --rule: color-mix(in srgb, var(--color-white) 22%, transparent);
  --focus: var(--color-powder);
  --btn-bg: var(--color-honeydew);
  --btn-text: var(--color-midnight);
}
```

- [ ] **Step 2: Write `src/styles/base.css`**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  scroll-padding-top: calc(var(--header-h-compact) + var(--space-4));
  scrollbar-gutter: stable;
}

html.is-scroll-locked {
  overflow: hidden;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: var(--step-0);
  font-weight: 400;
  line-height: var(--leading-body);
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
}

body[data-header='on'] {
  padding-top: var(--header-h);
}

main {
  flex: 1;
}

main:focus {
  outline: none;
}

h1,
h2,
h3,
h4 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 500;
  line-height: var(--leading-tight);
  text-wrap: balance;
}

h1 {
  font-size: var(--step-4);
}

h2 {
  font-size: var(--step-3);
}

h3 {
  font-size: var(--step-2);
}

h4 {
  font-size: var(--step-1);
}

p,
ul,
ol,
dl,
dd,
figure,
blockquote {
  margin: 0;
}

p {
  text-wrap: pretty;
}

ul[role='list'],
ol[role='list'] {
  padding: 0;
  list-style: none;
}

img,
svg {
  display: block;
  max-width: 100%;
}

img {
  height: auto;
}

a {
  color: inherit;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.22em;
}

a:hover {
  text-decoration-thickness: 2px;
}

button,
input,
select,
textarea {
  color: inherit;
  font: inherit;
}

button {
  cursor: pointer;
}

:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 3px;
}

::selection {
  background: var(--accent);
  color: var(--color-midnight);
}

[hidden] {
  display: none !important;
}

/* Scroll reveal. Elements are only hidden once reveal.ts marks them, so the page reads fine without JavaScript. */
[data-reveal] {
  transition:
    opacity var(--dur-slow) var(--ease),
    transform var(--dur-slow) var(--ease);
  transition-delay: calc(var(--reveal-i, 0) * 90ms);
}

[data-reveal].reveal-pending {
  opacity: 0;
  transform: translateY(1rem);
}

@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-delay: 0s !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Write `src/styles/components.css`**

```css
.container {
  width: 100%;
  max-width: calc(var(--content-max) + 2 * var(--gutter));
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.section {
  padding-block: var(--space-section);
}

.section--tight {
  padding-block: calc(var(--space-section) * 0.6);
}

.section--surface {
  background: var(--surface);
}

.section--accent {
  background: var(--accent);
}

.eyebrow {
  color: var(--text-muted);
  font-family: var(--font-body);
  font-size: var(--step--1);
  font-weight: 500;
  letter-spacing: var(--tracking-caps);
  line-height: 1.4;
  text-transform: uppercase;
}

.lead {
  max-width: var(--measure);
  font-size: var(--step-1);
  line-height: 1.5;
}

.prose {
  max-width: var(--measure);
}

.prose > * + * {
  margin-top: var(--space-4);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip-path: inset(50%);
  white-space: nowrap;
}

.skip-link {
  position: fixed;
  top: var(--space-3);
  left: var(--space-3);
  z-index: 100;
  padding: var(--space-3) var(--space-5);
  background: var(--color-midnight);
  color: var(--color-honeydew);
  transform: translateY(-200%);
}

.skip-link:focus {
  transform: none;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 3rem;
  padding: var(--space-3) var(--space-6);
  border: 1px solid var(--btn-bg);
  background: var(--btn-bg);
  color: var(--btn-text);
  font-size: var(--step--1);
  font-weight: 500;
  letter-spacing: var(--tracking-caps);
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition:
    background-color var(--dur-fast) var(--ease),
    border-color var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease);
}

.btn:hover {
  border-color: var(--text);
  background: var(--accent);
  color: var(--color-midnight);
}

.btn:active {
  transform: translateY(1px);
}

.btn--ghost {
  border-color: currentColor;
  background: transparent;
  color: var(--text);
}

.link-arrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: var(--tap);
  font-size: var(--step--1);
  font-weight: 500;
  letter-spacing: var(--tracking-caps);
  text-decoration: underline;
  text-transform: uppercase;
}

.link-arrow::after {
  content: '\2192';
  transition: transform var(--dur-fast) var(--ease);
}

.link-arrow:hover::after {
  transform: translateX(0.25rem);
}

.grid {
  display: grid;
  gap: var(--space-7) var(--space-6);
  grid-template-columns: minmax(0, 1fr);
  margin: 0;
}

@media (min-width: 40rem) {
  .grid--2,
  .grid--3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 64rem) {
  .grid--3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Text that still has to be supplied. Deliberately loud so it is never missed. */
.placeholder-text {
  padding: 0.1em 0.4em;
  background: var(--color-powder);
  color: var(--color-midnight);
  font-family: var(--font-body);
  font-size: 0.9em;
  font-style: normal;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.empty {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  max-width: var(--measure);
  padding-block: var(--space-7);
}
```

- [ ] **Step 4: Write `src/components/Icon.astro` and `src/components/Copy.astro`**

`src/components/Icon.astro`:

```astro
---
interface Props {
  name: 'menu' | 'close' | 'chevron-down' | 'arrow-left' | 'arrow-right' | 'check' | 'alert' | 'facebook' | 'instagram';
  size?: number;
}

const { name, size = 24 } = Astro.props;
---

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  focusable="false"
>
  {name === 'menu' && <path d="M3 7h18M3 12h18M3 17h18" />}
  {name === 'close' && <path d="M5 5l14 14M19 5L5 19" />}
  {name === 'chevron-down' && <path d="M6 9l6 6 6-6" />}
  {name === 'arrow-left' && <path d="M19 12H5m6-6l-6 6 6 6" />}
  {name === 'arrow-right' && <path d="M5 12h14m-6-6l6 6-6 6" />}
  {name === 'check' && <path d="M5 12.5l4.5 4.5L19 7.5" />}
  {name === 'alert' && (
    <Fragment>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5v.01" />
    </Fragment>
  )}
  {name === 'instagram' && (
    <Fragment>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" />
    </Fragment>
  )}
  {name === 'facebook' && (
    <path
      d="M14 8.5V7c0-.8.5-1.3 1.3-1.3H17V3h-2.4C12.3 3 11 4.5 11 6.7v1.8H8.5v2.9H11V21h3v-9.6h2.5l.5-2.9H14z"
      fill="currentColor"
      stroke="none"
    />
  )}
</svg>
```

`src/components/Copy.astro`:

```astro
---
import { isPlaceholder } from '../lib/format.ts';

interface Props {
  text: string;
}

const { text } = Astro.props;
---

{isPlaceholder(text) ? <mark class="placeholder-text">{text}</mark> : text}
```

- [ ] **Step 5: Write `src/scripts/reveal.ts`**

```ts
/**
 * Fades sections in as they scroll into view. Only elements that start below the
 * viewport are hidden, so nothing above the fold flashes and the page works without JS.
 */
export function initReveal(): void {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );

  for (const element of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
    if (element.getBoundingClientRect().top < window.innerHeight) continue;
    element.classList.add('reveal-pending');
    observer.observe(element);
  }
}
```

- [ ] **Step 6: Write `src/layouts/BaseLayout.astro`**

The header and footer are added in Task 4.

```astro
---
import '@fontsource-variable/jost/wght.css';
import '@fontsource-variable/cormorant-garamond/wght.css';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/components.css';
import { site } from '../data/site.ts';

interface Props {
  title: string;
  description?: string;
  /** Set to false for immersive pages that supply their own way out (the project view). */
  header?: boolean;
}

const { title, description = site.description, header = true } = Astro.props;
const pageTitle = title === site.name ? title : `${title} | ${site.name}`;
const canonical = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{pageTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta name="theme-color" content="#f0fff0" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={site.name} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
  </head>
  <body data-header={header ? 'on' : 'off'}>
    <a class="skip-link" href="#main">Skip to content</a>
    <main id="main" tabindex="-1">
      <slot />
    </main>
    <script>
      import { initReveal } from '../scripts/reveal.ts';
      initReveal();
    </script>
  </body>
</html>
```

- [ ] **Step 7: Replace `src/pages/index.astro` with a type specimen**

This page is temporary. It exists to check the tokens in a browser and is replaced in Task 9.

```astro
---
import Copy from '../components/Copy.astro';
import Icon from '../components/Icon.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
import { placeholder } from '../lib/format.ts';
import { site } from '../data/site.ts';
---

<BaseLayout title={site.name}>
  <section class="section container">
    <p class="eyebrow">Eyebrow label</p>
    <h1>Heading one in Cormorant</h1>
    <p class="lead">Lead paragraph in Jost, a little larger than body text.</p>
    <div class="prose">
      <p>Body text in Jost. The quick brown fox jumps over the lazy dog. <a href="/">An inline link</a>.</p>
      <p><Copy text={placeholder('a sample of missing copy')} /></p>
    </div>
    <p style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:2rem">
      <a class="btn" href="/">Primary button</a>
      <a class="btn btn--ghost" href="/">Ghost button</a>
      <a class="link-arrow" href="/">Arrow link</a>
    </p>
    <p style="display:flex;gap:1rem;margin-top:2rem">
      <Icon name="menu" /><Icon name="close" /><Icon name="chevron-down" /><Icon name="arrow-left" />
      <Icon name="arrow-right" /><Icon name="check" /><Icon name="alert" /><Icon name="facebook" /><Icon name="instagram" />
    </p>
  </section>
  <section class="section section--surface"><div class="container"><h2>Champagne band</h2></div></section>
  <section class="section section--accent"><div class="container"><h2 data-reveal>Powder Blue band, revealed on scroll</h2></div></section>
  <section class="section" data-theme="dark" style="background:var(--bg);color:var(--text)">
    <div class="container"><h2>Dark theme</h2><p><a class="btn" href="/">Button on dark</a></p></div>
  </section>
</BaseLayout>
```

- [ ] **Step 8: Build and check in the browser**

```powershell
npm run build
```

Expected: `0 errors`, `1 page(s) built`.

Start the dev server with `preview_start` (name `lardner-dev`) and open `http://localhost:4321/`. Confirm:
- Headings render in Cormorant Garamond and body text in Jost (not Georgia or Arial).
- The page background is Honeydew, text is Midnight Blue, and the two bands are Champagne and Powder Blue.
- All nine icons are recognisable, including the Facebook "f" and the Instagram camera.
- The primary button turns Powder Blue on hover; tabbing shows a Midnight focus ring.
- The placeholder text has a Powder Blue highlight.
- The browser console has no errors.

- [ ] **Step 9: Commit**

```powershell
git add -A
git commit -m "Add design tokens, base styles and layout shell" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Header, mobile menu and footer

**Files:**
- Create: `src/lib/scroll.ts`, `src/scripts/scroll-lock.ts`, `src/scripts/nav.ts`
- Create: `src/components/Header.astro`, `src/components/NavList.astro`, `src/components/MobileMenu.astro`, `src/components/Footer.astro`, `src/components/SocialLinks.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Test: `tests/scroll.test.ts`

**Interfaces:**
- Consumes: `primaryNav`, `NavItem` from `src/data/navigation.ts`; `site` from `src/data/site.ts`; `isCurrentPage`, `isCurrentSection` from `src/lib/nav-utils.ts`; `Icon`; tokens `--header-h`, `--header-h-compact`
- Produces:
  - `scroll.ts`: `type HeaderState = { hidden: boolean; lastY: number }`, `nextHeaderState(prev: HeaderState, y: number, options?: { threshold: number; delta: number }): HeaderState`
  - `scroll-lock.ts`: `lockScroll(): void`, `unlockScroll(): void` (counted, so nested locks are safe; toggles `html.is-scroll-locked`)
  - `nav.ts`: `initNav(): void`
  - Header attributes set at runtime: `data-compact`, `data-hidden`
  - `BaseLayout` now renders `Header` (when `header` is true) and `Footer`

- [ ] **Step 1: Write the failing test `tests/scroll.test.ts`**

```ts
import assert from 'node:assert/strict';
import test from 'node:test';
import { nextHeaderState } from '../src/lib/scroll.ts';

test('the header is always shown near the top of the page', () => {
  assert.deepEqual(nextHeaderState({ hidden: true, lastY: 500 }, 100), { hidden: false, lastY: 100 });
  assert.deepEqual(nextHeaderState({ hidden: true, lastY: 500 }, 0), { hidden: false, lastY: 0 });
});

test('the header hides when scrolling down past the threshold', () => {
  assert.deepEqual(nextHeaderState({ hidden: false, lastY: 300 }, 340), { hidden: true, lastY: 340 });
});

test('the header shows again when scrolling up', () => {
  assert.deepEqual(nextHeaderState({ hidden: true, lastY: 600 }, 560), { hidden: false, lastY: 560 });
});

test('movements smaller than the delta are ignored so the header does not flicker', () => {
  const prev = { hidden: true, lastY: 600 };
  assert.equal(nextHeaderState(prev, 603), prev);
  assert.equal(nextHeaderState(prev, 596), prev);
});

test('threshold and delta can be overridden', () => {
  const options = { threshold: 50, delta: 2 };
  assert.deepEqual(nextHeaderState({ hidden: false, lastY: 60 }, 63, options), { hidden: true, lastY: 63 });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

```powershell
npm test
```

Expected: FAIL with `Cannot find module` for `src/lib/scroll.ts`.

- [ ] **Step 3: Write `src/lib/scroll.ts`**

```ts
export type HeaderState = { hidden: boolean; lastY: number };

const DEFAULTS = { threshold: 160, delta: 8 };

/**
 * Decides whether the header should be hidden after the page scrolls to `y`.
 * Near the top it always shows; below that it hides on scroll down and returns on scroll up.
 */
export function nextHeaderState(prev: HeaderState, y: number, options = DEFAULTS): HeaderState {
  if (y <= options.threshold) return { hidden: false, lastY: y };
  const moved = y - prev.lastY;
  if (Math.abs(moved) < options.delta) return prev;
  return { hidden: moved > 0, lastY: y };
}
```

- [ ] **Step 4: Run the test and confirm it passes**

```powershell
npm test
```

Expected: PASS, 24 tests.

- [ ] **Step 5: Write `src/scripts/scroll-lock.ts`**

```ts
let locks = 0;

/** Stops the page behind an overlay from scrolling. Calls are counted, so overlays can nest. */
export function lockScroll(): void {
  locks += 1;
  if (locks === 1) document.documentElement.classList.add('is-scroll-locked');
}

export function unlockScroll(): void {
  if (locks === 0) return;
  locks -= 1;
  if (locks === 0) document.documentElement.classList.remove('is-scroll-locked');
}
```

- [ ] **Step 6: Write `src/scripts/nav.ts`**

```ts
import { nextHeaderState, type HeaderState } from '../lib/scroll.ts';
import { lockScroll, unlockScroll } from './scroll-lock.ts';

const COMPACT_AFTER = 24;
const DESKTOP = '(min-width: 64rem)';

function initHeaderScroll(header: HTMLElement): void {
  let state: HeaderState = { hidden: false, lastY: window.scrollY };
  let queued = false;

  // Never hide the bar while someone is using it.
  const isPinned = () =>
    header.querySelector(':focus-visible') !== null || header.querySelector('[aria-expanded="true"]') !== null;

  const update = () => {
    queued = false;
    const y = Math.max(window.scrollY, 0);
    state = nextHeaderState(state, y);
    header.toggleAttribute('data-compact', y > COMPACT_AFTER);
    header.toggleAttribute('data-hidden', state.hidden && !isPinned());
  };

  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  header.addEventListener('focusin', () => header.removeAttribute('data-hidden'));
  update();
}

function initSubmenus(header: HTMLElement): void {
  const toggles = Array.from(header.querySelectorAll<HTMLButtonElement>('[data-submenu-toggle]'));
  const closeAll = () => toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', 'false'));

  for (const toggle of toggles) {
    const item = toggle.closest<HTMLElement>('[data-submenu]');
    if (!item) continue;

    toggle.addEventListener('click', () => {
      const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
      closeAll();
      toggle.setAttribute('aria-expanded', String(!wasOpen));
    });

    item.addEventListener('focusout', (event) => {
      if (!item.contains(event.relatedTarget as Node | null)) toggle.setAttribute('aria-expanded', 'false');
    });

    item.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') return;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    });
  }

  document.addEventListener('click', (event) => {
    if (!(event.target as Element).closest('[data-submenu]')) closeAll();
  });
}

function initMobileMenu(): void {
  const menu = document.querySelector<HTMLDialogElement>('[data-menu]');
  const openButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeButton = menu?.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!menu || !openButton || !closeButton) return;

  openButton.addEventListener('click', () => {
    menu.showModal();
    openButton.setAttribute('aria-expanded', 'true');
    lockScroll();
  });

  closeButton.addEventListener('click', () => menu.close());

  // Fires for the close button and for Escape.
  menu.addEventListener('close', () => {
    openButton.setAttribute('aria-expanded', 'false');
    unlockScroll();
    openButton.focus();
  });

  window.matchMedia(DESKTOP).addEventListener('change', (event) => {
    if (event.matches && menu.open) menu.close();
  });
}

export function initNav(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  initHeaderScroll(header);
  initSubmenus(header);
  initMobileMenu();
}
```

- [ ] **Step 7: Write `src/components/NavList.astro`**

```astro
---
import type { NavItem } from '../data/navigation.ts';
import { isCurrentPage, isCurrentSection } from '../lib/nav-utils.ts';
import Icon from './Icon.astro';

interface Props {
  items: NavItem[];
  pathname: string;
  align: 'start' | 'end';
}

const { items, pathname, align } = Astro.props;
const submenuId = (label: string) => `submenu-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
const current = (href: string) =>
  isCurrentPage(pathname, href) ? 'page' : isCurrentSection(pathname, href) ? 'true' : undefined;
---

<ul class="nav-list" data-align={align} role="list">
  {
    items.map((item) => (
      <li class="nav-list__item" data-submenu={item.children ? '' : undefined}>
        <a class="nav-list__link" href={item.href} aria-current={current(item.href)}>{item.label}</a>
        {item.children && (
          <Fragment>
            <button
              type="button"
              class="nav-list__toggle"
              data-submenu-toggle
              aria-expanded="false"
              aria-controls={submenuId(item.label)}
            >
              <Icon name="chevron-down" size={16} />
              <span class="visually-hidden">{`${item.label} submenu`}</span>
            </button>
            <ul class="nav-list__submenu" id={submenuId(item.label)} role="list">
              {item.children.map((child) => (
                <li>
                  <a
                    class="nav-list__sublink"
                    href={child.href}
                    aria-current={isCurrentPage(pathname, child.href) ? 'page' : undefined}
                  >{child.label}</a>
                </li>
              ))}
            </ul>
          </Fragment>
        )}
      </li>
    ))
  }
</ul>

<style>
  /* `display` is set by Header.astro so the list can be hidden on small screens. */
  .nav-list {
    align-items: center;
    gap: var(--space-7);
    margin: 0;
  }

  .nav-list[data-align='end'] {
    justify-content: flex-end;
  }

  .nav-list[data-align='start'] {
    justify-content: flex-start;
  }

  .nav-list__item {
    position: relative;
    display: flex;
    align-items: center;
  }

  .nav-list__link {
    display: inline-flex;
    align-items: center;
    min-height: var(--tap);
    background: linear-gradient(currentColor, currentColor) no-repeat left calc(50% + 0.95em) / 0 1px;
    font-size: var(--step--1);
    font-weight: 500;
    letter-spacing: var(--tracking-caps);
    text-decoration: none;
    text-transform: uppercase;
    transition: background-size var(--dur) var(--ease);
  }

  .nav-list__link:hover,
  .nav-list__link[aria-current] {
    background-size: 100% 1px;
  }

  .nav-list__toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: var(--tap);
    padding: 0;
    border: 0;
    background: none;
  }

  .nav-list__toggle :global(svg) {
    transition: transform var(--dur-fast) var(--ease);
  }

  .nav-list__toggle[aria-expanded='true'] :global(svg) {
    transform: rotate(180deg);
  }

  .nav-list__submenu {
    position: absolute;
    top: 100%;
    left: calc(var(--space-5) * -1);
    min-width: 14rem;
    margin: 0;
    padding: var(--space-2) 0;
    border: 1px solid var(--rule);
    background: var(--bg);
    opacity: 0;
    transform: translateY(-0.25rem);
    visibility: hidden;
    transition:
      opacity var(--dur-fast) var(--ease),
      transform var(--dur-fast) var(--ease),
      visibility 0s linear var(--dur-fast);
  }

  .nav-list__item:hover > .nav-list__submenu,
  .nav-list__toggle[aria-expanded='true'] + .nav-list__submenu {
    opacity: 1;
    transform: none;
    visibility: visible;
    transition-delay: 0s;
  }

  .nav-list__sublink {
    display: flex;
    align-items: center;
    min-height: var(--tap);
    padding: var(--space-2) var(--space-5);
    font-size: var(--step--1);
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
    transition: background-color var(--dur-fast) var(--ease);
  }

  .nav-list__sublink:hover {
    background: var(--accent);
  }

  .nav-list__sublink[aria-current='page'] {
    text-decoration: underline;
  }
</style>
```

- [ ] **Step 8: Write `src/components/MobileMenu.astro`**

```astro
---
import { primaryNav } from '../data/navigation.ts';
import { site } from '../data/site.ts';
import { isCurrentPage } from '../lib/nav-utils.ts';
import Icon from './Icon.astro';

interface Props {
  pathname: string;
}

const { pathname } = Astro.props;
const items = [...primaryNav.left, ...primaryNav.right];
const current = (href: string) => (isCurrentPage(pathname, href) ? 'page' : undefined);
---

<dialog class="menu" id="mobile-menu" data-menu aria-label="Site menu">
  <div class="menu__bar container">
    <button type="button" class="menu__close" data-menu-close>
      <Icon name="close" />
      <span class="visually-hidden">Close menu</span>
    </button>
  </div>
  <nav class="menu__nav container" aria-label="Site menu">
    <ul class="menu__list" role="list">
      <li><a class="menu__link" href="/" aria-current={current('/')}>Home</a></li>
      {
        items.map((item) => (
          <li>
            <a class="menu__link" href={item.href} aria-current={current(item.href)}>{item.label}</a>
            {item.children && (
              <ul class="menu__sublist" role="list">
                {item.children.map((child) => (
                  <li>
                    <a class="menu__sublink" href={child.href} aria-current={current(child.href)}>{child.label}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))
      }
    </ul>
    <ul class="menu__contact" role="list">
      <li><a href={site.phone.href}>{site.phone.display}</a></li>
      <li><a href={site.email.href}>{site.email.display}</a></li>
    </ul>
  </nav>
</dialog>

<style>
  .menu {
    position: fixed;
    inset: 0;
    width: 100%;
    max-width: none;
    height: 100%;
    max-height: none;
    margin: 0;
    padding: 0;
    border: 0;
    background: var(--bg);
    color: var(--text);
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .menu[open] {
    animation: menu-in var(--dur) var(--ease);
  }

  .menu::backdrop {
    background: var(--bg);
  }

  @keyframes menu-in {
    from {
      opacity: 0;
      transform: translateY(-0.5rem);
    }
  }

  .menu__bar {
    display: flex;
    align-items: center;
    height: var(--header-h);
  }

  .menu__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--tap);
    height: var(--tap);
    margin-left: calc(var(--space-2) * -1);
    padding: 0;
    border: 0;
    background: none;
  }

  .menu__nav {
    padding-block: var(--space-5) var(--space-8);
  }

  .menu__list {
    display: grid;
    gap: var(--space-2);
    margin: 0;
  }

  .menu__link {
    display: inline-flex;
    align-items: center;
    min-height: 3.25rem;
    font-family: var(--font-display);
    font-size: var(--step-3);
    line-height: var(--leading-tight);
    text-decoration: none;
  }

  .menu__link[aria-current='page'],
  .menu__sublink[aria-current='page'] {
    text-decoration: underline;
  }

  .menu__sublist {
    display: grid;
    margin: 0 0 var(--space-3);
    padding-left: var(--space-4);
    border-left: 1px solid var(--rule);
  }

  .menu__sublink {
    display: inline-flex;
    align-items: center;
    min-height: var(--tap);
    font-size: var(--step--1);
    letter-spacing: var(--tracking-caps);
    text-decoration: none;
    text-transform: uppercase;
  }

  .menu__contact {
    display: grid;
    margin: var(--space-7) 0 0;
    padding-top: var(--space-5);
    border-top: 1px solid var(--rule);
  }

  .menu__contact a {
    display: inline-flex;
    align-items: center;
    min-height: var(--tap);
  }
</style>
```

- [ ] **Step 9: Write `src/components/Header.astro`**

```astro
---
import { Image } from 'astro:assets';
import logoFull from '../assets/brand/lardner-custom-homes-logo.webp';
import logoMark from '../assets/brand/lardner-custom-homes-mark.png';
import { primaryNav } from '../data/navigation.ts';
import Icon from './Icon.astro';
import MobileMenu from './MobileMenu.astro';
import NavList from './NavList.astro';

const { pathname } = Astro.url;
---

<header class="header" data-header>
  <div class="header__inner container">
    <button
      type="button"
      class="header__menu-btn"
      data-menu-open
      aria-haspopup="dialog"
      aria-controls="mobile-menu"
      aria-expanded="false"
    >
      <Icon name="menu" />
      <span class="visually-hidden">Open menu</span>
    </button>
    <nav class="header__nav" aria-label="Primary">
      <NavList items={primaryNav.left} pathname={pathname} align="end" />
      <a class="header__logo" href="/" aria-label="Lardner Custom Homes, home page">
        <Image class="header__logo-full" src={logoFull} alt="" width={260} loading="eager" />
        <Image class="header__logo-mark" src={logoMark} alt="" width={96} loading="eager" />
      </a>
      <NavList items={primaryNav.right} pathname={pathname} align="start" />
    </nav>
  </div>
</header>
<MobileMenu pathname={pathname} />

<style>
  .header {
    position: fixed;
    inset: 0 0 auto;
    z-index: 50;
    border-bottom: 1px solid transparent;
    background: var(--bg);
    transition:
      transform var(--dur) var(--ease),
      border-color var(--dur) var(--ease);
  }

  .header[data-compact] {
    border-bottom-color: var(--rule);
  }

  .header[data-hidden] {
    transform: translateY(-100%);
  }

  .header__inner {
    display: grid;
    align-items: center;
    grid-template-columns: var(--tap) minmax(0, 1fr) var(--tap);
    height: var(--header-h);
    transition: height var(--dur) var(--ease);
  }

  .header[data-compact] .header__inner {
    height: var(--header-h-compact);
  }

  .header__menu-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--tap);
    height: var(--tap);
    margin-left: calc(var(--space-2) * -1);
    padding: 0;
    border: 0;
    background: none;
  }

  .header__nav {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header__nav :global(.nav-list) {
    display: none;
  }

  .header__logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--tap);
    min-height: var(--tap);
  }

  .header__logo :global(img) {
    width: auto;
  }

  .header__logo :global(.header__logo-full) {
    display: none;
    height: calc(var(--header-h) - 2rem);
  }

  .header__logo :global(.header__logo-mark) {
    height: 2.5rem;
  }

  @media (min-width: 64rem) {
    .header__inner {
      grid-template-columns: minmax(0, 1fr);
    }

    .header__menu-btn {
      display: none;
    }

    .header__nav {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      column-gap: var(--space-8);
    }

    .header__nav :global(.nav-list) {
      display: flex;
    }

    .header:not([data-compact]) .header__logo :global(.header__logo-full) {
      display: block;
    }

    .header:not([data-compact]) .header__logo :global(.header__logo-mark) {
      display: none;
    }

    .header[data-compact] .header__logo :global(.header__logo-mark) {
      height: 2.75rem;
    }
  }
</style>
```

- [ ] **Step 10: Write `src/components/SocialLinks.astro` and `src/components/Footer.astro`**

`src/components/SocialLinks.astro`:

```astro
---
import { site } from '../data/site.ts';
import Icon from './Icon.astro';
---

<ul class="social" role="list">
  {
    site.social.map((profile) => (
      <li>
        <a class="social__link" href={profile.href} target="_blank" rel="noopener noreferrer">
          <Icon name={profile.icon} size={22} />
          <span class="visually-hidden">{`${profile.name} (opens in a new tab)`}</span>
        </a>
      </li>
    ))
  }
</ul>

<style>
  .social {
    display: flex;
    justify-content: center;
    gap: var(--space-3);
    margin: 0;
  }

  .social__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border: 1px solid var(--text);
    border-radius: 50%;
    transition:
      background-color var(--dur-fast) var(--ease),
      transform var(--dur-fast) var(--ease);
  }

  .social__link:hover {
    background: var(--accent);
    transform: translateY(-2px);
  }
</style>
```

The round social buttons are the one place corners are not square: a circle is the familiar shape for a social icon, and it sets the two controls apart from text links.

`src/components/Footer.astro`:

```astro
---
import { Image } from 'astro:assets';
import logoFull from '../assets/brand/lardner-custom-homes-logo.webp';
import { site } from '../data/site.ts';
import SocialLinks from './SocialLinks.astro';

const year = new Date().getFullYear();
---

<footer class="footer">
  <div class="container">
    <a class="footer__logo" href="/" aria-label="Lardner Custom Homes, home page">
      <Image src={logoFull} alt="" width={220} loading="lazy" />
    </a>
    <div class="footer__cols">
      <div class="footer__col footer__col--contact">
        <h2 class="eyebrow">Contact</h2>
        <ul role="list">
          <li><a href={site.phone.href}>{site.phone.display}</a></li>
          <li><a href={site.email.href}>{site.email.display}</a></li>
          <li><span class="footer__text">{site.address}</span></li>
        </ul>
      </div>
      <div class="footer__col footer__col--social">
        <h2 class="eyebrow">Follow</h2>
        <SocialLinks />
      </div>
      <div class="footer__col footer__col--legal">
        <h2 class="eyebrow">Information</h2>
        <ul role="list">
          {
            site.legal.map((doc) => (
              <li>
                <a href={doc.href} target="_blank" rel="noopener noreferrer">{doc.label}<span class="visually-hidden"> (PDF, opens in a new tab)</span></a>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
    <p class="footer__copyright">&copy; {year} {site.name}</p>
  </div>
</footer>

<style>
  .footer {
    padding-block: var(--space-8) var(--space-6);
    border-top: 1px solid var(--rule);
    background: var(--color-honeydew);
    color: var(--color-midnight);
    /* 15px. Texas requires the two TREC links to be at least 10 point. */
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .footer__logo {
    display: flex;
    justify-content: center;
    margin-bottom: var(--space-7);
  }

  .footer__logo :global(img) {
    width: auto;
    height: 5.5rem;
  }

  .footer__cols {
    display: grid;
    gap: var(--space-7);
    text-align: center;
  }

  .footer__col ul {
    margin: var(--space-2) 0 0;
  }

  .footer__col--social .eyebrow {
    margin-bottom: var(--space-4);
  }

  .footer__col a,
  .footer__text {
    display: inline-block;
    padding-block: var(--space-3);
  }

  .footer__copyright {
    margin-top: var(--space-8);
    padding-top: var(--space-5);
    border-top: 1px solid var(--rule);
    color: var(--text-muted);
    font-size: var(--step--1);
    text-align: center;
  }

  @media (min-width: 64rem) {
    .footer__cols {
      align-items: start;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      column-gap: var(--space-8);
    }

    .footer__col--contact {
      text-align: left;
    }

    .footer__col--legal {
      text-align: right;
    }

    .footer__col--legal li {
      max-width: 26rem;
      margin-left: auto;
    }
  }
</style>
```

The footer pins its own colours to the light palette so it looks the same beneath the dark project view.

- [ ] **Step 11: Wire the header, footer and nav script into `src/layouts/BaseLayout.astro`**

Add the imports to the frontmatter, after the `site` import:

```astro
import Footer from '../components/Footer.astro';
import Header from '../components/Header.astro';
```

Replace the `<body>` element with:

```astro
  <body data-header={header ? 'on' : 'off'}>
    <a class="skip-link" href="#main">Skip to content</a>
    {header && <Header />}
    <main id="main" tabindex="-1">
      <slot />
    </main>
    <Footer />
    <script>
      import { initNav } from '../scripts/nav.ts';
      import { initReveal } from '../scripts/reveal.ts';
      initNav();
      initReveal();
    </script>
  </body>
```

- [ ] **Step 12: Build and check in the browser**

```powershell
npm run build
```

Expected: `0 errors`, `1 page(s) built`.

In the browser at `http://localhost:4321/`:
- **1280px wide:** the bar reads `HOMES ▾  GALLERY ▾  [full logo]  ABOUT  INVENTORY`. Hovering Homes shows Available, Lots, Build on Your Lot. Clicking a chevron opens the submenu and sets `aria-expanded="true"`; Escape closes it. Scrolling down hides the bar; scrolling up brings back a shorter bar with the "L" mark; at the top the full logo returns.
- **375px wide:** menu button on the left, "L" mark centred, no nav links. The button opens a full-screen menu listing Home, Homes (with three sub-links), Gallery (with four), About, Inventory, phone and email. Escape and the X both close it and focus returns to the menu button. The page behind does not scroll while it is open.
- **Footer:** contact left, social centre, the two TREC links right on desktop; stacked and centred on mobile. Both PDFs open. Both social links open the right profiles in a new tab.
- Tab from the top: the first stop is "Skip to content".
- Run this in the console at 375px and at 1280px and confirm it prints `true`:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

- [ ] **Step 13: Commit**

```powershell
git add -A
git commit -m "Add header, mobile menu and footer" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Image pipeline and the Photo component

**Files:**
- Create: `src/lib/pick-image.ts`, `src/lib/images.ts`, `src/components/Photo.astro`
- Test: `tests/pick-image.test.ts`

**Interfaces:**
- Consumes: Astro's `ImageMetadata`, `Image`, `getImage`
- Produces:
  - `pick-image.ts`: `pickImage<T>(files: Record<string, { default: T }>, path: string | null): T | null`
  - `images.ts`: `resolveImage(path: string | null): ImageMetadata | null` (path relative to `src/assets/`), `projectImage(slug: string, file: string | null)`, `homeImage(slug: string, file: string | null)`, `siteImage(file: string | null)`, `type GalleryItem = { image: ImageMetadata | null; full: { src: string; width: number; height: number } | null; alt: string; caption?: string; href?: string }`, `toGalleryItem(image, alt, caption?, href?): Promise<GalleryItem>`
  - `Photo` props: `image: ImageMetadata | null`, `alt: string`, `ratio?: string` (a CSS ratio such as `"4/3"`, `"natural"`, or `"fill"`; default `"3/2"`), `sizes?: string`, `eager?: boolean`, `placeholderLabel?: string`

- [ ] **Step 1: Write the failing test `tests/pick-image.test.ts`**

```ts
import assert from 'node:assert/strict';
import test from 'node:test';
import { pickImage } from '../src/lib/pick-image.ts';

const files = {
  '../assets/projects/one/front.jpg': { default: 'FRONT' },
  '../assets/site/hero.webp': { default: 'HERO' },
};

test('pickImage() finds a file by its path under src/assets', () => {
  assert.equal(pickImage(files, 'projects/one/front.jpg'), 'FRONT');
  assert.equal(pickImage(files, 'site/hero.webp'), 'HERO');
});

test('pickImage() returns null for a file that is not on disk, so a placeholder shows instead of a broken image', () => {
  assert.equal(pickImage(files, 'projects/one/typo.jpg'), null);
  assert.equal(pickImage(files, 'projects/two/front.jpg'), null);
});

test('pickImage() returns null when no file is named', () => {
  assert.equal(pickImage(files, null), null);
  assert.equal(pickImage(files, ''), null);
});
```

- [ ] **Step 2: Run the test and confirm it fails**

```powershell
npm test
```

Expected: FAIL with `Cannot find module` for `src/lib/pick-image.ts`.

- [ ] **Step 3: Write `src/lib/pick-image.ts`**

```ts
/**
 * Looks up an imported image by its path under src/assets/.
 * Returns null when nothing matches, so callers can fall back to a placeholder.
 */
export function pickImage<T>(files: Record<string, { default: T }>, path: string | null): T | null {
  if (!path) return null;
  return files[`../assets/${path}`]?.default ?? null;
}
```

- [ ] **Step 4: Run the test and confirm it passes**

```powershell
npm test
```

Expected: PASS, 27 tests.

- [ ] **Step 5: Write `src/lib/images.ts`**

```ts
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
```

- [ ] **Step 6: Write `src/components/Photo.astro`**

```astro
---
import type { ImageMetadata } from 'astro';
import { Image } from 'astro:assets';

interface Props {
  image: ImageMetadata | null;
  alt: string;
  /** A CSS aspect ratio such as "4/3"; "natural" for the photo's own shape; "fill" to fill the parent. */
  ratio?: string;
  sizes?: string;
  /** Load immediately. Use for photos visible when the page opens. */
  eager?: boolean;
  placeholderLabel?: string;
}

const {
  image,
  alt,
  ratio = '3/2',
  sizes = '100vw',
  eager = false,
  placeholderLabel = 'Project photo',
} = Astro.props;

const fill = ratio === 'fill';
const cssRatio = ratio === 'natural' ? (image ? `${image.width}/${image.height}` : '3/2') : ratio;
const maxWidth = image ? Math.min(image.width, 2000) : 0;
const widths = image ? [...[480, 800, 1200, 1600].filter((w) => w < maxWidth), maxWidth] : [];
---

<span class:list={['photo', { 'photo--fill': fill }]} style={fill ? undefined : `--ratio: ${cssRatio}`}>
  {
    image ? (
      <Image
        src={image}
        alt={alt}
        width={maxWidth}
        widths={widths}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={eager ? 'high' : 'auto'}
      />
    ) : (
      <span class="photo__placeholder" role="img" aria-label={`Placeholder: ${alt}`}>
        <span class="photo__tag">Placeholder</span>
        <span class="photo__label">{placeholderLabel}</span>
      </span>
    )
  }
</span>

<style>
  .photo {
    position: relative;
    display: block;
    overflow: hidden;
    background: var(--color-champagne);
    aspect-ratio: var(--ratio);
  }

  .photo--fill {
    height: 100%;
    aspect-ratio: auto;
  }

  .photo :global(img) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--dur-slow) var(--ease);
  }

  :global(a:hover) .photo :global(img),
  :global(button:hover) .photo :global(img) {
    transform: scale(1.03);
  }

  .photo__placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-4);
    color: var(--color-midnight);
    text-align: center;
    transition: background-color var(--dur) var(--ease);
  }

  :global(a:hover) .photo__placeholder,
  :global(button:hover) .photo__placeholder {
    background: color-mix(in srgb, var(--color-powder) 45%, var(--color-champagne));
  }

  .photo__tag {
    font-size: var(--step--1);
    font-weight: 500;
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }

  .photo__label {
    font-family: var(--font-display);
    font-size: var(--step-1);
    font-style: italic;
    line-height: 1.2;
  }
</style>
```

- [ ] **Step 7: Type-check and commit**

```powershell
npm run check
git add -A
git commit -m "Add image pipeline and Photo component" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Expected: `0 errors`.

---

### Task 6: Lightbox and photo grid

**Files:**
- Create: `src/lib/carousel.ts`, `src/scripts/lightbox.ts`
- Create: `src/components/LightboxTrigger.astro`, `src/components/PhotoGrid.astro`, `src/components/Lightbox.astro`
- Modify: `src/pages/index.astro` (temporary demo section)
- Test: `tests/carousel.test.ts`

**Interfaces:**
- Consumes: `GalleryItem` from `src/lib/images.ts`; `Photo`; `Icon`; `lockScroll`, `unlockScroll`
- Produces:
  - `carousel.ts`: `wrapIndex(index: number, length: number): number`, `type SwipeDirection = 'next' | 'prev' | null`, `swipeDirection(dx: number, dy: number, threshold?: number): SwipeDirection`
  - `lightbox.ts`: `initLightbox(): void`
  - `LightboxTrigger` props: `item: GalleryItem`, `class?: string`; default slot. Renders a `<button data-lightbox>` carrying `data-lb-src`, `data-lb-width`, `data-lb-height`, `data-lb-alt`, `data-lb-caption`
  - `PhotoGrid` props: `items: GalleryItem[]`, `layout?: 'two' | 'three' | 'dense'` (default `'two'`), `ratio?: string` (default `'3/2'`), `captions?: boolean` (default `false`), `eagerCount?: number` (default `0`). Its root carries `data-lightbox-group`
  - `Lightbox` (no props): one per page that has triggers. A trigger's set is every `[data-lightbox]` inside its nearest `[data-lightbox-group]`

- [ ] **Step 1: Write the failing test `tests/carousel.test.ts`**

```ts
import assert from 'node:assert/strict';
import test from 'node:test';
import { swipeDirection, wrapIndex } from '../src/lib/carousel.ts';

test('wrapIndex() leaves an index inside the set alone', () => {
  assert.equal(wrapIndex(0, 5), 0);
  assert.equal(wrapIndex(4, 5), 4);
});

test('wrapIndex() wraps past either end', () => {
  assert.equal(wrapIndex(5, 5), 0);
  assert.equal(wrapIndex(-1, 5), 4);
  assert.equal(wrapIndex(-6, 5), 4);
});

test('wrapIndex() always returns 0 for a set of one or an empty set', () => {
  assert.equal(wrapIndex(1, 1), 0);
  assert.equal(wrapIndex(-1, 1), 0);
  assert.equal(wrapIndex(3, 0), 0);
});

test('swipeDirection() reads a leftward swipe as next and a rightward swipe as previous', () => {
  assert.equal(swipeDirection(-80, 5), 'next');
  assert.equal(swipeDirection(80, -5), 'prev');
});

test('swipeDirection() ignores short movements and mostly vertical ones', () => {
  assert.equal(swipeDirection(-20, 0), null);
  assert.equal(swipeDirection(-80, 90), null);
  assert.equal(swipeDirection(0, 0), null);
});
```

- [ ] **Step 2: Run the test and confirm it fails**

```powershell
npm test
```

Expected: FAIL with `Cannot find module` for `src/lib/carousel.ts`.

- [ ] **Step 3: Write `src/lib/carousel.ts`**

```ts
/** Keeps `index` inside 0..length-1, wrapping past either end. */
export function wrapIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

export type SwipeDirection = 'next' | 'prev' | null;

/** Interprets a touch movement. Swiping left moves to the next photo. */
export function swipeDirection(dx: number, dy: number, threshold = 48): SwipeDirection {
  if (Math.abs(dx) < threshold) return null;
  if (Math.abs(dx) < Math.abs(dy) * 1.5) return null;
  return dx < 0 ? 'next' : 'prev';
}
```

- [ ] **Step 4: Run the test and confirm it passes**

```powershell
npm test
```

Expected: PASS, 32 tests.

- [ ] **Step 5: Write `src/scripts/lightbox.ts`**

```ts
import { swipeDirection, wrapIndex } from '../lib/carousel.ts';
import { lockScroll, unlockScroll } from './scroll-lock.ts';

type Slide = { src: string | null; width: number; height: number; alt: string; caption: string };

function readSlide(trigger: HTMLElement): Slide {
  return {
    src: trigger.dataset.lbSrc || null,
    width: Number(trigger.dataset.lbWidth) || 0,
    height: Number(trigger.dataset.lbHeight) || 0,
    alt: trigger.dataset.lbAlt ?? '',
    caption: trigger.dataset.lbCaption ?? '',
  };
}

export function initLightbox(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
  if (!dialog) return;

  const image = dialog.querySelector<HTMLImageElement>('[data-lightbox-img]');
  const placeholder = dialog.querySelector<HTMLElement>('[data-lightbox-placeholder]');
  const placeholderText = dialog.querySelector<HTMLElement>('[data-lightbox-placeholder-text]');
  const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption]');
  const counter = dialog.querySelector<HTMLElement>('[data-lightbox-counter]');
  const closeButton = dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]');
  const prevButton = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
  const nextButton = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]');
  if (!image || !placeholder || !placeholderText || !caption || !counter || !closeButton || !prevButton || !nextButton) {
    return;
  }

  let triggers: HTMLElement[] = [];
  let index = 0;
  let opener: HTMLElement | null = null;

  const preload = (i: number) => {
    const neighbour = triggers[wrapIndex(i, triggers.length)];
    const src = neighbour ? readSlide(neighbour).src : null;
    if (src) new Image().src = src;
  };

  const show = (i: number) => {
    index = wrapIndex(i, triggers.length);
    const trigger = triggers[index];
    if (!trigger) return;
    const slide = readSlide(trigger);

    if (slide.src) {
      image.src = slide.src;
      image.alt = slide.alt;
      image.width = slide.width;
      image.height = slide.height;
      image.hidden = false;
      placeholder.hidden = true;
    } else {
      image.hidden = true;
      image.removeAttribute('src');
      placeholderText.textContent = slide.alt;
      placeholder.hidden = false;
    }

    caption.textContent = slide.caption;
    counter.textContent = `${index + 1} / ${triggers.length}`;
    preload(index + 1);
    preload(index - 1);
  };

  const step = (by: number) => {
    if (triggers.length > 1) show(index + by);
  };

  const open = (trigger: HTMLElement) => {
    const group = trigger.closest<HTMLElement>('[data-lightbox-group]') ?? document.body;
    triggers = Array.from(group.querySelectorAll<HTMLElement>('[data-lightbox]'));
    opener = trigger;
    const single = triggers.length < 2;
    prevButton.hidden = single;
    nextButton.hidden = single;
    show(triggers.indexOf(trigger));
    dialog.showModal();
    lockScroll();
  };

  document.addEventListener('click', (event) => {
    const trigger = (event.target as Element | null)?.closest<HTMLElement>('[data-lightbox]');
    if (!trigger) return;
    event.preventDefault();
    open(trigger);
  });

  closeButton.addEventListener('click', () => dialog.close());
  prevButton.addEventListener('click', () => step(-1));
  nextButton.addEventListener('click', () => step(1));

  // A click anywhere that is not the photo, its caption or a control closes the viewer.
  dialog.addEventListener('click', (event) => {
    if (!(event.target as Element).closest('[data-lightbox-keep]')) dialog.close();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    }
  });

  let startX = 0;
  let startY = 0;
  dialog.addEventListener(
    'touchstart',
    (event) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
    },
    { passive: true },
  );
  dialog.addEventListener(
    'touchend',
    (event) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      const direction = swipeDirection(touch.clientX - startX, touch.clientY - startY);
      if (direction === 'next') step(1);
      if (direction === 'prev') step(-1);
    },
    { passive: true },
  );

  // Fires for the X, a click outside, and Escape.
  dialog.addEventListener('close', () => {
    unlockScroll();
    image.removeAttribute('src');
    opener?.focus();
    opener = null;
  });
}
```

- [ ] **Step 6: Write `src/components/LightboxTrigger.astro`**

```astro
---
import type { GalleryItem } from '../lib/images.ts';

interface Props {
  item: GalleryItem;
  class?: string;
}

const { item, class: className } = Astro.props;
---

<button
  type="button"
  class:list={['lb-trigger', className]}
  data-lightbox
  data-lb-src={item.full?.src ?? ''}
  data-lb-width={item.full?.width ?? 0}
  data-lb-height={item.full?.height ?? 0}
  data-lb-alt={item.alt}
  data-lb-caption={item.caption ?? ''}
  aria-label={`View larger: ${item.alt}`}
>
  <slot />
</button>

<style>
  .lb-trigger {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    background: none;
    cursor: zoom-in;
    text-align: inherit;
  }
</style>
```

- [ ] **Step 7: Write `src/components/PhotoGrid.astro`**

```astro
---
import type { GalleryItem } from '../lib/images.ts';
import LightboxTrigger from './LightboxTrigger.astro';
import Photo from './Photo.astro';

interface Props {
  items: GalleryItem[];
  /** two: 1 column on phones, then 2. three: 1, 2, then 3. dense: always 2, small gaps. */
  layout?: 'two' | 'three' | 'dense';
  ratio?: string;
  /** Show each item's caption beneath its photo. */
  captions?: boolean;
  /** How many photos at the start load immediately. */
  eagerCount?: number;
}

const { items, layout = 'two', ratio = '3/2', captions = false, eagerCount = 0 } = Astro.props;

const sizes = {
  two: '(min-width: 40rem) 46vw, 92vw',
  three: '(min-width: 64rem) 30vw, (min-width: 40rem) 46vw, 92vw',
  dense: '(min-width: 64rem) 24vw, 46vw',
}[layout];
const perRow = layout === 'three' ? 3 : 2;
---

<ul class="photo-grid" data-layout={layout} data-lightbox-group role="list">
  {
    items.map((item, i) => (
      <li class="photo-grid__item" data-reveal style={`--reveal-i: ${i % perRow}`}>
        <LightboxTrigger item={item}>
          <Photo image={item.image} alt={item.alt} ratio={ratio} sizes={sizes} eager={i < eagerCount} />
        </LightboxTrigger>
        {captions && item.caption && (
          <p class="photo-grid__caption">
            {item.href ? <a href={item.href}>{item.caption}</a> : item.caption}
          </p>
        )}
      </li>
    ))
  }
</ul>

<style>
  .photo-grid {
    display: grid;
    gap: var(--space-6);
    grid-template-columns: minmax(0, 1fr);
    margin: 0;
  }

  .photo-grid[data-layout='dense'] {
    gap: var(--space-3);
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 40rem) {
    .photo-grid[data-layout='two'],
    .photo-grid[data-layout='three'] {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 64rem) {
    .photo-grid[data-layout='three'] {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .photo-grid__caption {
    margin-top: var(--space-2);
    font-size: var(--step--1);
    letter-spacing: 0.04em;
  }

  .photo-grid__caption a {
    display: inline-flex;
    align-items: center;
    min-height: var(--tap);
  }
</style>
```

- [ ] **Step 8: Write `src/components/Lightbox.astro`**

The close button is first in the markup so it receives focus when the viewer opens.

```astro
---
import Icon from './Icon.astro';
---

<dialog class="lightbox" data-lightbox-dialog aria-label="Photo viewer">
  <button type="button" class="lightbox__btn lightbox__close" data-lightbox-close data-lightbox-keep>
    <Icon name="close" />
    <span class="visually-hidden">Close photo viewer</span>
  </button>
  <figure class="lightbox__figure">
    <img class="lightbox__img" data-lightbox-img data-lightbox-keep alt="" hidden />
    <span class="lightbox__placeholder" data-lightbox-placeholder data-lightbox-keep hidden>
      <span class="lightbox__tag">Placeholder</span>
      <span class="lightbox__label" data-lightbox-placeholder-text></span>
    </span>
    <figcaption class="lightbox__caption" data-lightbox-keep>
      <span data-lightbox-caption></span>
      <span class="lightbox__counter" data-lightbox-counter aria-live="polite"></span>
    </figcaption>
  </figure>
  <button type="button" class="lightbox__btn lightbox__prev" data-lightbox-prev data-lightbox-keep>
    <Icon name="arrow-left" />
    <span class="visually-hidden">Previous photo</span>
  </button>
  <button type="button" class="lightbox__btn lightbox__next" data-lightbox-next data-lightbox-keep>
    <Icon name="arrow-right" />
    <span class="visually-hidden">Next photo</span>
  </button>
</dialog>

<script>
  import { initLightbox } from '../scripts/lightbox.ts';
  initLightbox();
</script>

<style>
  .lightbox {
    --focus: var(--color-powder);
    --frame-h: calc(100dvh - 9.5rem);

    position: fixed;
    inset: 0;
    width: 100%;
    max-width: none;
    height: 100%;
    max-height: none;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--color-white);
    overflow: hidden;
    overscroll-behavior: contain;
  }

  .lightbox[open] {
    display: grid;
    place-items: center;
    animation: lightbox-in var(--dur) var(--ease);
  }

  .lightbox::backdrop {
    background: color-mix(in srgb, var(--color-midnight-deep) 96%, transparent);
  }

  @keyframes lightbox-in {
    from {
      opacity: 0;
    }
  }

  .lightbox__figure {
    display: grid;
    justify-items: center;
    gap: var(--space-3);
    max-width: 100%;
    margin: 0;
    padding: 4.5rem var(--space-4) var(--space-4);
  }

  .lightbox__img {
    width: auto;
    max-width: min(100%, 92vw);
    height: auto;
    max-height: var(--frame-h);
    object-fit: contain;
  }

  .lightbox__placeholder {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-2);
    width: min(92vw, 60rem, calc(var(--frame-h) * 1.5));
    padding: var(--space-5);
    background: var(--color-champagne);
    color: var(--color-midnight);
    text-align: center;
    aspect-ratio: 3 / 2;
  }

  .lightbox__tag {
    font-size: var(--step--1);
    font-weight: 500;
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }

  .lightbox__label {
    font-family: var(--font-display);
    font-size: var(--step-2);
    font-style: italic;
    line-height: 1.2;
  }

  .lightbox__caption {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-2) var(--space-5);
    font-size: var(--step--1);
    letter-spacing: 0.06em;
  }

  .lightbox__counter {
    color: color-mix(in srgb, var(--color-white) 74%, var(--color-midnight-deep));
    font-variant-numeric: tabular-nums;
  }

  .lightbox__btn {
    position: fixed;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    padding: 0;
    border: 1px solid color-mix(in srgb, var(--color-white) 55%, transparent);
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-midnight-deep) 70%, transparent);
    color: var(--color-white);
    transition:
      background-color var(--dur-fast) var(--ease),
      color var(--dur-fast) var(--ease);
  }

  .lightbox__btn:hover {
    background: var(--color-powder);
    color: var(--color-midnight);
  }

  .lightbox__close {
    top: var(--space-4);
    right: var(--space-4);
  }

  .lightbox__prev,
  .lightbox__next {
    bottom: var(--space-4);
  }

  .lightbox__prev {
    left: var(--space-4);
  }

  .lightbox__next {
    right: var(--space-4);
  }

  @media (min-width: 64rem) {
    .lightbox__prev,
    .lightbox__next {
      top: 50%;
      bottom: auto;
      margin-top: -1.5rem;
    }

    .lightbox__prev {
      left: var(--space-5);
    }

    .lightbox__next {
      right: var(--space-5);
    }
  }
</style>
```

- [ ] **Step 9: Add a temporary lightbox demo to `src/pages/index.astro`**

Add to the frontmatter:

```astro
import Lightbox from '../components/Lightbox.astro';
import PhotoGrid from '../components/PhotoGrid.astro';
import colin from '../assets/people/colin-lardner.jpg';
import { toGalleryItem } from '../lib/images.ts';

const demoItems = await Promise.all([
  toGalleryItem(null, 'Sample placeholder one', 'Demo set'),
  toGalleryItem(colin, 'Colin Lardner seated in a cream armchair', 'Demo set'),
  toGalleryItem(null, 'Sample placeholder two', 'Demo set'),
]);
const singleItem = await toGalleryItem(null, 'A set of one', 'Single photo');
```

Add before the closing `</BaseLayout>`:

```astro
  <section class="section container">
    <h2>Lightbox demo (three photos)</h2>
    <PhotoGrid items={demoItems} layout="three" captions eagerCount={3} />
    <h2 style="margin-top:3rem">Lightbox demo (one photo)</h2>
    <PhotoGrid items={[singleItem]} />
  </section>
  <Lightbox />
```

- [ ] **Step 10: Build and check in the browser**

```powershell
npm run build
```

Expected: `0 errors`, `1 page(s) built`. The build log lists a generated `.webp` for Colin's photo.

In the browser at `http://localhost:4321/`, in the three-photo set:
- Clicking a tile opens the viewer on a near-black backdrop with "1 / 3" (or the clicked position) and the caption "Demo set".
- The middle item shows Colin's real photo, undistorted. The other two show a Champagne placeholder with the alt text.
- Next and previous buttons, and the left and right arrow keys, move through the set and wrap from 3 to 1 and from 1 to 3.
- The X, a click on the dark area, and Escape each close it. Focus returns to the tile that opened it.
- With the viewer open, the mouse wheel does not scroll the page behind.
- In the one-photo set, the viewer shows "1 / 1" with no previous or next buttons, and the arrow keys do nothing.
- At 375px wide, the previous and next buttons sit at the bottom corners and are easy to tap.
- The console has no errors.

- [ ] **Step 11: Commit**

```powershell
git add -A
git commit -m "Add lightbox and photo grid" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Homes pages

**Files:**
- Create: `src/components/PageHeader.astro`, `src/components/SubNav.astro`, `src/components/ListingCard.astro`, `src/components/ListingsView.astro`
- Create: `src/pages/homes/index.astro`, `src/pages/homes/available.astro`, `src/pages/homes/lots.astro`, `src/pages/homes/build-on-your-lot.astro`, `src/pages/homes/[slug].astro`
- Modify: `src/styles/components.css` (shared card styles)

**Interfaces:**
- Consumes: `listings`, `copy`, `homesSubNav`, `filterListings`, `specLine`, `formatNumber`, `placeholder`, `homeImage`, `toGalleryItem`, `Photo`, `PhotoGrid`, `Lightbox`, `Copy`, `BaseLayout`
- Produces:
  - `PageHeader` props: `title: string`, `eyebrow?: string`, `intro?: string`
  - `SubNav` props: `label: string`, `items: { label: string; href: string }[]`
  - `ListingCard` props: `listing: Listing`, `eager?: boolean`
  - `ListingsView` props: `title: string`, `intro: string`, `eyebrow?: string`, `category?: ListingCategory`
  - Shared classes `.card`, `.card__link`, `.card__body`, `.card__status`, `.card__title`, `.card__meta`, `.card__specs` (reused by `ProjectCard` in Task 8)
  - Listing detail pages link to `/inventory/?home=<title>`, which Task 11's form reads

- [ ] **Step 1: Add the shared card styles to the end of `src/styles/components.css`**

```css
/* Cards. Shared by listings and projects so spacing, type and hover match. */
.card__link {
  display: grid;
  gap: var(--space-4);
  text-decoration: none;
}

.card__body {
  display: grid;
  gap: var(--space-1);
}

.card__status {
  color: var(--text-muted);
  font-size: var(--step--1);
  font-weight: 500;
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
}

.card__title {
  font-size: var(--step-2);
  text-decoration: underline transparent 1px;
  text-underline-offset: 0.18em;
  transition: text-decoration-color var(--dur) var(--ease);
}

.card__link:hover .card__title {
  text-decoration-color: currentColor;
}

.card__meta {
  color: var(--text-muted);
}

.card__specs {
  font-size: var(--step--1);
  letter-spacing: 0.04em;
}
```

- [ ] **Step 2: Write `src/components/PageHeader.astro` and `src/components/SubNav.astro`**

`src/components/PageHeader.astro`:

```astro
---
import Copy from './Copy.astro';

interface Props {
  title: string;
  eyebrow?: string;
  intro?: string;
}

const { title, eyebrow, intro } = Astro.props;
---

<header class="page-header container">
  {eyebrow && <p class="eyebrow">{eyebrow}</p>}
  <h1>{title}</h1>
  {intro && <p class="lead"><Copy text={intro} /></p>}
</header>

<style>
  .page-header {
    display: grid;
    gap: var(--space-4);
    padding-block: var(--space-8) var(--space-6);
  }
</style>
```

`src/components/SubNav.astro`:

```astro
---
import { isCurrentPage } from '../lib/nav-utils.ts';

interface Props {
  /** Names the group for screen readers, for example "Homes sections". */
  label: string;
  items: { label: string; href: string }[];
}

const { label, items } = Astro.props;
const { pathname } = Astro.url;
---

<nav class="subnav container" aria-label={label}>
  <ul class="subnav__list" role="list">
    {
      items.map((item) => (
        <li>
          <a class="subnav__link" href={item.href} aria-current={isCurrentPage(pathname, item.href) ? 'page' : undefined}>{item.label}</a>
        </li>
      ))
    }
  </ul>
</nav>

<style>
  .subnav__list {
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--space-6);
    margin: 0;
    border-bottom: 1px solid var(--rule);
  }

  .subnav__link {
    display: inline-flex;
    align-items: center;
    min-height: var(--tap);
    margin-bottom: -1px;
    border-bottom: 2px solid transparent;
    font-size: var(--step--1);
    font-weight: 500;
    letter-spacing: var(--tracking-caps);
    text-decoration: none;
    text-transform: uppercase;
    transition: border-color var(--dur-fast) var(--ease);
  }

  .subnav__link:hover {
    border-bottom-color: var(--accent);
  }

  .subnav__link[aria-current='page'] {
    border-bottom-color: var(--text);
  }
</style>
```

- [ ] **Step 3: Write `src/components/ListingCard.astro`**

```astro
---
import type { Listing } from '../data/types.ts';
import { placeholder, specLine } from '../lib/format.ts';
import { homeImage } from '../lib/images.ts';
import Copy from './Copy.astro';
import Photo from './Photo.astro';

interface Props {
  listing: Listing;
  eager?: boolean;
}

const { listing, eager = false } = Astro.props;
const cover = homeImage(listing.slug, listing.cover);
const coverAlt = listing.photos.find((photo) => photo.file === listing.cover)?.alt ?? listing.title;
const neighborhood = listing.neighborhood ?? (listing.placeholder ? placeholder('neighborhood') : '');
const specs = specLine(listing);
---

<article class="card">
  <a class="card__link" href={`/homes/${listing.slug}/`}>
    <Photo
      image={cover}
      alt={coverAlt}
      ratio="4/3"
      sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 46vw, 92vw"
      eager={eager}
      placeholderLabel={listing.category === 'lot' ? 'Lot photo' : 'Home photo'}
    />
    <div class="card__body">
      <p class="card__status">{listing.status}</p>
      <h2 class="card__title">{listing.title}</h2>
      {neighborhood && <p class="card__meta"><Copy text={neighborhood} /></p>}
      {specs && <p class="card__specs"><Copy text={specs} /></p>}
    </div>
  </a>
</article>
```

- [ ] **Step 4: Write `src/components/ListingsView.astro`**

```astro
---
import { copy } from '../data/copy.ts';
import { listings } from '../data/homes.ts';
import { homesSubNav } from '../data/navigation.ts';
import type { ListingCategory } from '../data/types.ts';
import { filterListings } from '../lib/content.ts';
import ListingCard from './ListingCard.astro';
import PageHeader from './PageHeader.astro';
import SubNav from './SubNav.astro';

interface Props {
  title: string;
  intro: string;
  eyebrow?: string;
  /** Leave out to show every listing. */
  category?: ListingCategory;
}

const { title, intro, eyebrow, category } = Astro.props;
const items = filterListings(listings, category);
---

<PageHeader title={title} eyebrow={eyebrow} intro={intro} />
<SubNav label="Homes sections" items={homesSubNav} />
<section class="section section--tight container" aria-label={title}>
  {
    items.length > 0 ? (
      <ul class="grid grid--3" role="list">
        {items.map((listing, i) => (
          <li data-reveal style={`--reveal-i: ${i % 3}`}>
            <ListingCard listing={listing} eager={i < 3} />
          </li>
        ))}
      </ul>
    ) : (
      <div class="empty">
        <p class="lead">{copy.homes.empty.heading}</p>
        <p>{copy.homes.empty.body}</p>
        <a class="btn" href="/inventory/">{copy.homes.empty.button}</a>
      </div>
    )
  }
</section>
```

- [ ] **Step 5: Write the three listing pages**

`src/pages/homes/index.astro`:

```astro
---
import ListingsView from '../../components/ListingsView.astro';
import { copy } from '../../data/copy.ts';
import BaseLayout from '../../layouts/BaseLayout.astro';

const { title, intro } = copy.homes.index;
---

<BaseLayout title={title} description="Homes for sale, lots and build-on-your-lot options from Lardner Custom Homes in Dallas.">
  <ListingsView title={title} intro={intro} />
</BaseLayout>
```

`src/pages/homes/available.astro`:

```astro
---
import ListingsView from '../../components/ListingsView.astro';
import { copy } from '../../data/copy.ts';
import BaseLayout from '../../layouts/BaseLayout.astro';

const { title, intro } = copy.homes.available;
---

<BaseLayout title={title} description="Homes for sale and coming soon from Lardner Custom Homes in Dallas.">
  <ListingsView title={title} intro={intro} eyebrow="Homes" category="available" />
</BaseLayout>
```

`src/pages/homes/lots.astro`:

```astro
---
import ListingsView from '../../components/ListingsView.astro';
import { copy } from '../../data/copy.ts';
import BaseLayout from '../../layouts/BaseLayout.astro';

const { title, intro } = copy.homes.lots;
---

<BaseLayout title={title} description="Lots available for a custom home from Lardner Custom Homes in Dallas.">
  <ListingsView title={title} intro={intro} eyebrow="Homes" category="lot" />
</BaseLayout>
```

- [ ] **Step 6: Write `src/pages/homes/build-on-your-lot.astro`**

```astro
---
import Copy from '../../components/Copy.astro';
import PageHeader from '../../components/PageHeader.astro';
import SubNav from '../../components/SubNav.astro';
import { copy } from '../../data/copy.ts';
import { homesSubNav } from '../../data/navigation.ts';
import BaseLayout from '../../layouts/BaseLayout.astro';

const page = copy.homes.buildOnYourLot;
---

<BaseLayout title={page.title} description="Build a custom home on your own lot with Lardner Custom Homes in Dallas.">
  <PageHeader title={page.title} eyebrow="Homes" intro={page.intro} />
  <SubNav label="Homes sections" items={homesSubNav} />
  <section class="section section--tight container">
    <div class="prose">
      {page.body.map((paragraph) => <p><Copy text={paragraph} /></p>)}
    </div>
    <p class="cta"><a class="btn" href="/inventory/">{page.button}</a></p>
  </section>
</BaseLayout>

<style>
  .cta {
    margin-top: var(--space-6);
  }
</style>
```

- [ ] **Step 7: Write `src/pages/homes/[slug].astro`**

```astro
---
import Copy from '../../components/Copy.astro';
import Lightbox from '../../components/Lightbox.astro';
import Photo from '../../components/Photo.astro';
import PhotoGrid from '../../components/PhotoGrid.astro';
import { copy } from '../../data/copy.ts';
import { listings } from '../../data/homes.ts';
import type { Listing } from '../../data/types.ts';
import BaseLayout from '../../layouts/BaseLayout.astro';
import { formatNumber, placeholder } from '../../lib/format.ts';
import { homeImage, toGalleryItem } from '../../lib/images.ts';

export function getStaticPaths() {
  return listings.map((listing) => ({ params: { slug: listing.slug }, props: { listing } }));
}

interface Props {
  listing: Listing;
}

const { listing } = Astro.props;
const isLot = listing.category === 'lot';
const cover = homeImage(listing.slug, listing.cover);
const coverAlt = listing.photos.find((photo) => photo.file === listing.cover)?.alt ?? listing.title;
const items = await Promise.all(
  listing.photos.map((photo) => toGalleryItem(homeImage(listing.slug, photo.file), photo.alt, listing.title)),
);

const facts: { label: string; value: string }[] = [];
if (listing.neighborhood) facts.push({ label: 'Neighborhood', value: listing.neighborhood });
if (listing.address) facts.push({ label: 'Address', value: listing.address });
if (listing.price) facts.push({ label: 'Price', value: listing.price });
if (listing.beds !== undefined) facts.push({ label: 'Bedrooms', value: String(listing.beds) });
if (listing.baths !== undefined) facts.push({ label: 'Bathrooms', value: String(listing.baths) });
if (listing.sqft !== undefined) facts.push({ label: 'Square feet', value: formatNumber(listing.sqft) });
if (listing.lotSize) facts.push({ label: 'Lot size', value: listing.lotSize });
if (facts.length === 0 && listing.placeholder) {
  facts.push({
    label: 'Details',
    value: placeholder(isLot ? 'neighborhood, address, price, lot size' : 'neighborhood, address, price, beds, baths, square feet'),
  });
}

const description =
  listing.description ?? (listing.placeholder ? placeholder(`a short description of this ${isLot ? 'lot' : 'home'}`) : '');
const back = isLot ? { href: '/homes/lots/', label: 'All lots' } : { href: '/homes/available/', label: 'Available homes' };
const inquiryHref = `/inventory/?home=${encodeURIComponent(listing.title)}`;
---

<BaseLayout title={listing.title} description={`${listing.title} from Lardner Custom Homes in Dallas.`}>
  <article class="listing">
    <header class="listing__header container">
      <a class="listing__back" href={back.href}><span aria-hidden="true">&larr;</span> {back.label}</a>
      <p class="eyebrow">{listing.status}</p>
      <h1>{listing.title}</h1>
    </header>

    <div class="container">
      <Photo
        image={cover}
        alt={coverAlt}
        ratio="16/9"
        sizes="(min-width: 90rem) 82rem, 92vw"
        eager
        placeholderLabel={isLot ? 'Lot photo' : 'Home photo'}
      />
    </div>

    <section class="listing__summary section section--tight container" aria-label="Details">
      <dl class="listing__facts">
        {
          facts.map((fact) => (
            <div class="listing__fact">
              <dt>{fact.label}</dt>
              <dd><Copy text={fact.value} /></dd>
            </div>
          ))
        }
      </dl>
      <div class="listing__about">
        {description && <p class="lead"><Copy text={description} /></p>}
        <a class="btn" href={inquiryHref}>{isLot ? copy.homes.lotDetailCta : copy.homes.detailCta}</a>
      </div>
    </section>

    {
      items.length > 0 && (
        <section class="listing__photos container" aria-labelledby="photos-heading">
          <h2 id="photos-heading">Photos</h2>
          <PhotoGrid items={items} layout="three" ratio="4/3" />
        </section>
      )
    }
  </article>
  <Lightbox />
</BaseLayout>

<style>
  .listing__header {
    display: grid;
    justify-items: start;
    gap: var(--space-3);
    padding-block: var(--space-7) var(--space-6);
  }

  .listing__back {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--tap);
    font-size: var(--step--1);
    font-weight: 500;
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }

  .listing__summary {
    display: grid;
    gap: var(--space-7);
  }

  .listing__facts {
    display: grid;
    align-content: start;
    margin: 0;
  }

  .listing__fact {
    display: grid;
    gap: var(--space-1) var(--space-5);
    grid-template-columns: 9rem minmax(0, 1fr);
    padding-block: var(--space-3);
    border-top: 1px solid var(--rule);
  }

  .listing__fact dt {
    color: var(--text-muted);
    font-size: var(--step--1);
    font-weight: 500;
    letter-spacing: var(--tracking-caps);
    line-height: 2;
    text-transform: uppercase;
  }

  .listing__about {
    display: grid;
    align-content: start;
    justify-items: start;
    gap: var(--space-5);
  }

  .listing__photos {
    display: grid;
    gap: var(--space-6);
    padding-bottom: var(--space-section);
  }

  @media (min-width: 64rem) {
    .listing__summary {
      grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
      column-gap: var(--space-9);
    }
  }
</style>
```

- [ ] **Step 8: Build and check in the browser**

```powershell
npm run build
```

Expected: `0 errors`, `11 page(s) built` (home, four Homes pages, six detail pages).

In the browser:
- `/homes/` shows six cards: three columns at 1280px, two at 768px, one at 375px. Cover tiles are 4:3. Each card shows status, title, a highlighted `[Placeholder: neighborhood]` and a highlighted spec placeholder.
- The sub-navigation underlines the current page. `/homes/available/` shows four cards and `/homes/lots/` shows two.
- Hovering a card underlines its title and tints the tile.
- A card opens its detail page. The detail page shows the status, title, a 16:9 cover, a details row, a description placeholder, the "Ask about this home" button (which goes to `/inventory/?home=Sample%20Home%2001`; a 404 is expected until Task 11), and a photo grid that opens the lightbox.
- `/homes/build-on-your-lot/` shows the intro, a highlighted placeholder paragraph and a button.
- The header's Homes link shows as current on every Homes page.
- **Empty state:** temporarily edit `src/data/homes.ts` so both sample lots have `category: 'available'`, load `/homes/lots/`, and confirm the "Nothing is listed here right now." message and button appear in place of the grid. Then undo the edit with `git checkout src/data/homes.ts`.
- No horizontal overflow at 375px: `document.documentElement.scrollWidth <= window.innerWidth` prints `true`.

- [ ] **Step 9: Commit**

```powershell
git add -A
git commit -m "Add Homes pages" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Gallery pages

**Files:**
- Create: `src/components/ProjectCard.astro`, `src/components/RoomView.astro`, `src/scripts/project-view.ts`
- Create: `src/pages/gallery/index.astro`, `src/pages/gallery/exterior.astro`, `src/pages/gallery/kitchen.astro`, `src/pages/gallery/bath.astro`, `src/pages/gallery/living.astro`, `src/pages/gallery/[slug].astro`

**Interfaces:**
- Consumes: `projects`, `copy`, `gallerySubNav`, `ROOM_LABELS`, `photosForRoom`, `projectImage`, `toGalleryItem`, `Photo`, `PhotoGrid`, `Lightbox`, `LightboxTrigger`, `PageHeader`, `SubNav`, `Icon`, `BaseLayout` (`header={false}`), shared `.card*` classes
- Produces:
  - `ProjectCard` props: `project: Project`, `headingLevel?: 2 | 3` (default `2`), `eager?: boolean`, `sizes?: string`
  - `RoomView` props: `room: RoomPage`
  - `project-view.ts`: `initProjectView(): void`

- [ ] **Step 1: Write `src/components/ProjectCard.astro`**

```astro
---
import type { Project } from '../data/types.ts';
import { projectImage } from '../lib/images.ts';
import Photo from './Photo.astro';

interface Props {
  project: Project;
  /** 2 on the Gallery page; 3 where the cards sit under another heading. */
  headingLevel?: 2 | 3;
  eager?: boolean;
  sizes?: string;
}

const { project, headingLevel = 2, eager = false, sizes = '(min-width: 40rem) 46vw, 92vw' } = Astro.props;
const Heading = `h${headingLevel}` as const;
const cover = projectImage(project.slug, project.cover);
const coverAlt = project.photos.find((photo) => photo.file === project.cover)?.alt ?? `${project.name}: front elevation`;
---

<article class="card">
  <a class="card__link" href={`/gallery/${project.slug}/`}>
    <Photo image={cover} alt={coverAlt} ratio="3/2" sizes={sizes} eager={eager} placeholderLabel="Front elevation" />
    <div class="card__body">
      <Heading class="card__title">{project.name}</Heading>
      {project.location && <p class="card__meta">{project.location}</p>}
    </div>
  </a>
</article>
```

- [ ] **Step 2: Write `src/pages/gallery/index.astro`**

```astro
---
import PageHeader from '../../components/PageHeader.astro';
import ProjectCard from '../../components/ProjectCard.astro';
import SubNav from '../../components/SubNav.astro';
import { copy } from '../../data/copy.ts';
import { gallerySubNav } from '../../data/navigation.ts';
import { projects } from '../../data/projects.ts';
import BaseLayout from '../../layouts/BaseLayout.astro';

const { title, intro } = copy.gallery.index;
---

<BaseLayout title={title} description="A portfolio of homes designed and built by Lardner Custom Homes in Dallas.">
  <PageHeader title={title} intro={intro} />
  <SubNav label="Gallery sections" items={gallerySubNav} />
  <section class="section section--tight container" aria-label="Projects">
    {
      projects.length > 0 ? (
        <ul class="grid grid--2" role="list">
          {projects.map((project, i) => (
            <li data-reveal style={`--reveal-i: ${i % 2}`}>
              <ProjectCard project={project} eager={i < 2} />
            </li>
          ))}
        </ul>
      ) : (
        <div class="empty"><p class="lead">{copy.gallery.empty}</p></div>
      )
    }
  </section>
</BaseLayout>
```

- [ ] **Step 3: Write `src/components/RoomView.astro` and the four room pages**

`src/components/RoomView.astro`:

```astro
---
import { copy } from '../data/copy.ts';
import { gallerySubNav } from '../data/navigation.ts';
import { projects } from '../data/projects.ts';
import { ROOM_LABELS, type RoomPage } from '../data/types.ts';
import { photosForRoom } from '../lib/content.ts';
import { projectImage, toGalleryItem } from '../lib/images.ts';
import Lightbox from './Lightbox.astro';
import PageHeader from './PageHeader.astro';
import PhotoGrid from './PhotoGrid.astro';
import SubNav from './SubNav.astro';

interface Props {
  room: RoomPage;
}

const { room } = Astro.props;
const items = await Promise.all(
  photosForRoom(projects, room).map(({ photo, project }) =>
    toGalleryItem(projectImage(project.slug, photo.file), photo.alt, project.name, `/gallery/${project.slug}/`),
  ),
);
---

<PageHeader title={ROOM_LABELS[room]} eyebrow="Gallery" intro={copy.gallery.rooms[room]} />
<SubNav label="Gallery sections" items={gallerySubNav} />
<section class="section section--tight container" aria-label={`${ROOM_LABELS[room]} photos`}>
  {
    items.length > 0 ? (
      <PhotoGrid items={items} layout="two" ratio="3/2" captions eagerCount={2} />
    ) : (
      <div class="empty"><p class="lead">{copy.gallery.empty}</p></div>
    )
  }
</section>
<Lightbox />
```

`src/pages/gallery/exterior.astro`:

```astro
---
import RoomView from '../../components/RoomView.astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout title="Exterior" description="Exterior photos of homes built by Lardner Custom Homes in Dallas.">
  <RoomView room="exterior" />
</BaseLayout>
```

`src/pages/gallery/kitchen.astro`:

```astro
---
import RoomView from '../../components/RoomView.astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout title="Kitchen" description="Kitchen photos from homes built by Lardner Custom Homes in Dallas.">
  <RoomView room="kitchen" />
</BaseLayout>
```

`src/pages/gallery/bath.astro`:

```astro
---
import RoomView from '../../components/RoomView.astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout title="Bath" description="Bath photos from homes built by Lardner Custom Homes in Dallas.">
  <RoomView room="bath" />
</BaseLayout>
```

`src/pages/gallery/living.astro`:

```astro
---
import RoomView from '../../components/RoomView.astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout title="Living" description="Living space photos from homes built by Lardner Custom Homes in Dallas.">
  <RoomView room="living" />
</BaseLayout>
```

- [ ] **Step 4: Write `src/scripts/project-view.ts`**

```ts
/**
 * The project page behaves like an overlay: the X, the dark area beside the photos and
 * Escape all return to the gallery. Going "back" restores the visitor's scroll position;
 * if they arrived from somewhere else, the X's own link (/gallery/) is used instead.
 */
export function initProjectView(): void {
  const view = document.querySelector<HTMLElement>('[data-project-view]');
  const closeLink = view?.querySelector<HTMLAnchorElement>('[data-project-close]');
  if (!view || !closeLink) return;

  const cameFromGallery = (() => {
    try {
      const referrer = new URL(document.referrer);
      return (
        referrer.origin === window.location.origin &&
        referrer.pathname.startsWith('/gallery/') &&
        referrer.pathname !== window.location.pathname
      );
    } catch {
      return false;
    }
  })();

  const leave = () => {
    if (cameFromGallery && window.history.length > 1) window.history.back();
    else window.location.assign(closeLink.href);
  };

  closeLink.addEventListener('click', (event) => {
    // Let modified clicks (new tab, new window) behave normally.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    leave();
  });

  // Only the bare dark area counts: clicks on text, photos or the gaps between them do nothing.
  view.addEventListener('click', (event) => {
    if (event.target === view) leave();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !document.querySelector('dialog[open]')) leave();
  });
}
```

- [ ] **Step 5: Write `src/pages/gallery/[slug].astro`**

```astro
---
import Icon from '../../components/Icon.astro';
import Lightbox from '../../components/Lightbox.astro';
import LightboxTrigger from '../../components/LightboxTrigger.astro';
import Photo from '../../components/Photo.astro';
import { copy } from '../../data/copy.ts';
import { projects } from '../../data/projects.ts';
import type { Project } from '../../data/types.ts';
import BaseLayout from '../../layouts/BaseLayout.astro';
import { projectImage, toGalleryItem } from '../../lib/images.ts';

export function getStaticPaths() {
  return projects.map((project) => ({ params: { slug: project.slug }, props: { project } }));
}

interface Props {
  project: Project;
}

const { project } = Astro.props;
const items = await Promise.all(
  project.photos.map((photo) => toGalleryItem(projectImage(project.slug, photo.file), photo.alt, project.name)),
);
---

<BaseLayout title={project.name} description={`Photos of ${project.name} by Lardner Custom Homes.`} header={false}>
  <div class="project" data-theme="dark" data-project-view>
    <a class="project__close" href="/gallery/" data-project-close>
      <Icon name="close" />
      <span class="visually-hidden">Close this project and return to the gallery</span>
    </a>
    <header class="project__header">
      <p class="eyebrow"><a href="/gallery/">Gallery</a></p>
      <h1>{project.name}</h1>
      {project.location && <p class="project__location">{project.location}</p>}
      <p class="project__hint">{copy.gallery.projectHint}</p>
    </header>
    <ul class="project__photos" role="list" data-lightbox-group>
      {
        items.map((item, i) => (
          <li data-reveal>
            <LightboxTrigger item={item}>
              <Photo
                image={item.image}
                alt={item.alt}
                ratio="natural"
                sizes="(min-width: 76rem) 68rem, 92vw"
                eager={i === 0}
              />
            </LightboxTrigger>
          </li>
        ))
      }
    </ul>
  </div>
  <Lightbox />
</BaseLayout>

<script>
  import { initProjectView } from '../../scripts/project-view.ts';
  initProjectView();
</script>

<style>
  .project {
    min-height: 100dvh;
    padding: var(--space-8) var(--gutter) var(--space-section);
    background: var(--bg);
    color: var(--text);
    cursor: zoom-out;
  }

  .project > * {
    cursor: auto;
  }

  .project__close {
    position: fixed;
    top: var(--space-4);
    right: var(--space-4);
    z-index: 10;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border: 1px solid color-mix(in srgb, var(--color-white) 55%, transparent);
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-midnight-deep) 70%, transparent);
    color: var(--color-white);
    transition:
      background-color var(--dur-fast) var(--ease),
      color var(--dur-fast) var(--ease);
  }

  .project__close:hover {
    background: var(--color-powder);
    color: var(--color-midnight);
  }

  .project__header,
  .project__photos {
    width: 100%;
    max-width: 68rem;
    margin-inline: auto;
  }

  .project__header {
    display: grid;
    justify-items: start;
    gap: var(--space-3);
    padding-right: var(--space-8);
    padding-bottom: var(--space-7);
  }

  .project__header .eyebrow a {
    display: inline-flex;
    align-items: center;
    min-height: var(--tap);
  }

  .project__location,
  .project__hint {
    color: var(--text-muted);
  }

  .project__hint {
    font-size: var(--step--1);
    letter-spacing: 0.04em;
  }

  .project__photos {
    display: grid;
    gap: var(--space-6);
  }
</style>
```

- [ ] **Step 6: Build and check in the browser**

```powershell
npm run build
```

Expected: `0 errors`, `20 page(s) built`.

In the browser:
- `/gallery/` shows four project cards in two columns at 1280px and 768px, one at 375px. Covers are 3:2 with the project name below.
- `/gallery/kitchen/` shows eight tiles (two per project) with the project name beneath each; the name links to that project. Clicking a tile opens the lightbox, and next/previous move through all eight.
- `/gallery/exterior/`, `/gallery/bath/` and `/gallery/living/` each show eight tiles.
- Opening a project from `/gallery/` shows a dark page with no site header, the project name, eight stacked tiles and the standard light footer.
- The X stays fixed in the top-right corner while scrolling. Clicking it returns to `/gallery/` at the same scroll position.
- At 1280px, clicking the dark area to the left or right of the photos returns to the gallery. Clicking a photo opens the lightbox instead.
- With the lightbox open, Escape closes only the lightbox. A second Escape returns to the gallery.
- Opening a project from `/gallery/kitchen/` (via a caption link) and clicking the X returns to `/gallery/kitchen/`.
- **Direct visit:** paste `http://localhost:4321/gallery/sample-project-01/` into a new tab and click the X. It goes to `/gallery/` and does not leave the site.
- Tab order on a project page: Skip to content, X, Gallery link, then each photo.
- The header's Gallery link shows as current on `/gallery/` and the room pages.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "Add Gallery pages and project view" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Home page

**Files:**
- Modify: `src/pages/index.astro` (replace the temporary specimen page entirely)

**Interfaces:**
- Consumes: `copy.home`, `projects`, `featuredProjects`, `siteImage`, `Photo`, `ProjectCard`, `BaseLayout`, `site`

- [ ] **Step 1: Replace `src/pages/index.astro`**

```astro
---
import Photo from '../components/Photo.astro';
import ProjectCard from '../components/ProjectCard.astro';
import { copy } from '../data/copy.ts';
import { projects } from '../data/projects.ts';
import { site } from '../data/site.ts';
import BaseLayout from '../layouts/BaseLayout.astro';
import { featuredProjects } from '../lib/content.ts';
import { siteImage } from '../lib/images.ts';

const { hero, intro, featured, neighborhoods, quote, cta } = copy.home;
const heroImage = siteImage(hero.image);
const featuredList = featuredProjects(projects, 3);
---

<BaseLayout title={site.name}>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__media">
      <Photo image={heroImage} alt={hero.imageAlt} ratio="fill" sizes="100vw" eager placeholderLabel="Hero photo" />
    </div>
    <div class="hero__panel">
      <p class="eyebrow">{hero.eyebrow}</p>
      <h1 id="hero-title">{hero.title}</h1>
      <p class="hero__actions">
        <a class="btn" href="/homes/">{hero.primaryCta}</a>
        <a class="btn btn--ghost" href="/gallery/">{hero.secondaryCta}</a>
      </p>
    </div>
  </section>

  <section class="intro section container" aria-labelledby="intro-title">
    <div class="intro__heading" data-reveal>
      <p class="eyebrow">{intro.eyebrow}</p>
      <h2 id="intro-title">{intro.heading}</h2>
    </div>
    <div class="intro__body prose" data-reveal style="--reveal-i: 1">
      {intro.body.map((paragraph) => <p>{paragraph}</p>)}
      <p><a class="link-arrow" href="/about/">{intro.link}</a></p>
    </div>
  </section>

  {
    featuredList.length > 0 && (
      <section class="featured section section--tight container" aria-labelledby="featured-title">
        <div class="featured__header" data-reveal>
          <div>
            <p class="eyebrow">{featured.eyebrow}</p>
            <h2 id="featured-title">{featured.heading}</h2>
          </div>
          <a class="link-arrow" href="/gallery/">{featured.link}</a>
        </div>
        <ul class="grid grid--3" role="list">
          {featuredList.map((project, i) => (
            <li data-reveal style={`--reveal-i: ${i}`}>
              <ProjectCard
                project={project}
                headingLevel={3}
                sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 46vw, 92vw"
              />
            </li>
          ))}
        </ul>
      </section>
    )
  }

  <section class="section section--surface" aria-labelledby="neighborhoods-title">
    <div class="neighborhoods container" data-reveal>
      <h2 class="eyebrow" id="neighborhoods-title">{neighborhoods.eyebrow}</h2>
      <ul class="neighborhoods__list" role="list">
        {neighborhoods.names.map((name) => <li>{name}</li>)}
      </ul>
      <p class="neighborhoods__note">{neighborhoods.note}</p>
    </div>
  </section>

  <section class="section container" aria-label="A word from Colin Lardner">
    <figure class="quote" data-reveal>
      <blockquote><p>&ldquo;{quote.text}&rdquo;</p></blockquote>
      <figcaption class="eyebrow">{quote.attribution}</figcaption>
    </figure>
  </section>

  <section class="section section--accent" aria-labelledby="cta-title">
    <div class="cta container" data-reveal>
      <h2 id="cta-title">{cta.heading}</h2>
      <p class="lead">{cta.body}</p>
      <a class="btn" href="/inventory/">{cta.button}</a>
    </div>
  </section>
</BaseLayout>

<style>
  .hero {
    display: grid;
    grid-template-rows: minmax(52svh, 1fr) auto;
    min-height: calc(100svh - var(--header-h));
  }

  .hero__media {
    grid-row: 1;
  }

  .hero__panel {
    display: grid;
    justify-items: start;
    gap: var(--space-4);
    grid-row: 2;
    padding: var(--space-6) var(--gutter) var(--space-7);
    background: var(--bg);
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-3);
  }

  .intro {
    display: grid;
    gap: var(--space-6);
  }

  .intro__heading {
    display: grid;
    align-content: start;
    gap: var(--space-3);
  }

  .featured {
    display: grid;
    gap: var(--space-7);
  }

  .featured__header {
    display: flex;
    align-items: end;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--space-4) var(--space-6);
  }

  .featured__header > div {
    display: grid;
    gap: var(--space-3);
  }

  .neighborhoods {
    display: grid;
    gap: var(--space-5);
  }

  .neighborhoods__list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-7);
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--step-2);
    line-height: 1.25;
  }

  .neighborhoods__note {
    color: var(--text-muted);
    font-style: italic;
  }

  .quote {
    display: grid;
    justify-items: center;
    gap: var(--space-5);
    max-width: 56rem;
    margin-inline: auto;
    text-align: center;
  }

  .quote blockquote {
    font-family: var(--font-display);
    font-size: var(--step-4);
    font-style: italic;
    line-height: var(--leading-tight);
    text-wrap: balance;
  }

  .cta {
    display: grid;
    justify-items: start;
    gap: var(--space-4);
  }

  .cta .btn {
    margin-top: var(--space-3);
  }

  @media (min-width: 64rem) {
    .hero {
      grid-template-rows: minmax(0, 1fr);
    }

    .hero__media,
    .hero__panel {
      grid-area: 1 / 1;
    }

    .hero__panel {
      z-index: 1;
      align-self: end;
      justify-self: start;
      max-width: 46rem;
      padding: var(--space-7) var(--space-8) var(--space-7) var(--gutter);
    }

    .intro {
      grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
      column-gap: var(--space-9);
    }
  }
</style>
```

- [ ] **Step 2: Build and check in the browser**

```powershell
npm run build
```

Expected: `0 errors`, `20 page(s) built`.

In the browser at `/`:
- **1280px:** the hero fills the first screen below the header. The Honeydew title panel overlaps the bottom-left of the hero tile and the "Hero photo" placeholder label is still visible. The page has exactly one `h1`.
- **375px:** the hero tile sits above the title panel; both buttons fit without overflowing.
- Scrolling reveals: the two-column introduction, three featured project cards, the Champagne neighborhoods band with six names, the quote, and the Powder Blue closing band.
- Sections fade in once as they enter view. With "Emulate CSS prefers-reduced-motion: reduce" turned on, nothing fades or moves.
- "View homes" goes to `/homes/`; "See the gallery" and the featured link go to `/gallery/`; "About us" goes to `/about/` (404 until Task 10); "Get in touch" goes to `/inventory/` (404 until Task 11).
- No horizontal overflow at 375px, 768px and 1280px.

- [ ] **Step 3: Commit**

```powershell
git add -A
git commit -m "Add home page" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: About page

**Files:**
- Create: `src/pages/about.astro`

**Interfaces:**
- Consumes: `copy.about`, `src/assets/people/colin-lardner.jpg`, `PageHeader`, `BaseLayout`

- [ ] **Step 1: Write `src/pages/about.astro`**

The F-pattern: a full first bar (photo and biography), a second bar (the company), then a left-aligned stem (values).

```astro
---
import { Image } from 'astro:assets';
import colinPhoto from '../assets/people/colin-lardner.jpg';
import PageHeader from '../components/PageHeader.astro';
import { copy } from '../data/copy.ts';
import BaseLayout from '../layouts/BaseLayout.astro';

const { title, colin, company, values } = copy.about;
---

<BaseLayout title={title} description="Meet Colin Lardner and the team behind Lardner Custom Homes in Dallas.">
  <PageHeader title={title} />

  <section class="colin container" aria-labelledby="colin-name">
    <div class="colin__photo" data-reveal>
      <Image src={colinPhoto} alt={colin.photoAlt} width={447} height={447} loading="eager" />
    </div>
    <div class="colin__text" data-reveal style="--reveal-i: 1">
      <div class="colin__heading">
        <h2 id="colin-name">{colin.name}</h2>
        <p class="eyebrow">{colin.role}</p>
      </div>
      <div class="prose">
        {colin.bio.map((paragraph) => <p>{paragraph}</p>)}
      </div>
    </div>
  </section>

  <section class="section section--surface" aria-labelledby="company-title">
    <div class="split container" data-reveal>
      <h2 id="company-title">{company.heading}</h2>
      <div class="prose">
        {company.body.map((paragraph) => <p>{paragraph}</p>)}
      </div>
    </div>
  </section>

  <section class="section container" aria-labelledby="values-title">
    <h2 id="values-title" data-reveal>{values.heading}</h2>
    <ul class="values" role="list">
      {
        values.items.map((value) => (
          <li class="values__item" data-reveal>
            <h3>{value.title}</h3>
            <p>{value.body}</p>
          </li>
        ))
      }
    </ul>
  </section>
</BaseLayout>

<style>
  .colin {
    display: grid;
    gap: var(--space-6);
    padding-bottom: var(--space-section);
  }

  /* The source photo is 447px square, so it is never shown wider than 400px. */
  .colin__photo {
    max-width: 25rem;
  }

  .colin__photo :global(img) {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
  }

  .colin__text {
    display: grid;
    align-content: start;
    gap: var(--space-5);
  }

  .colin__heading {
    display: grid;
    gap: var(--space-2);
  }

  .split {
    display: grid;
    gap: var(--space-5);
  }

  .values {
    margin: var(--space-6) 0 0;
  }

  .values__item {
    display: grid;
    gap: var(--space-2);
    padding-block: var(--space-5);
    border-top: 1px solid var(--rule);
  }

  .values__item p {
    max-width: var(--measure);
  }

  @media (min-width: 64rem) {
    .colin {
      align-items: start;
      grid-template-columns: 25rem minmax(0, 1fr);
      column-gap: var(--space-9);
    }

    .split,
    .values__item {
      grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
      column-gap: var(--space-8);
    }
  }
</style>
```

- [ ] **Step 2: Build and check in the browser**

```powershell
npm run build
```

Expected: `0 errors`, `21 page(s) built`.

In the browser at `/about/`:
- **1280px:** Colin's photo sits left at 400px, sharp and square, with his name, "CEO" and three paragraphs to the right. Below is a Champagne band with "The company" at the left edge and two paragraphs to its right. Below that, "What we value" heads four rows, each with its title at the left edge and its sentence to the right, separated by thin rules.
- **375px:** everything stacks in one column in the same order; text lines are comfortable to read.
- Heading order is `h1` About, `h2` Colin Lardner, `h2` The company, `h2` What we value, then four `h3`s.
- No placeholder highlights appear on this page: all copy is sourced.

- [ ] **Step 3: Commit**

```powershell
git add -A
git commit -m "Add About page" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Inventory page and enquiry form

**Files:**
- Create: `src/lib/validation.ts`, `src/scripts/inquiry-form.ts`
- Create: `src/components/FieldError.astro`, `src/components/Field.astro`, `src/components/ChoiceField.astro`, `src/components/InquiryForm.astro`
- Create: `src/pages/inventory.astro`
- Modify: `src/styles/components.css` (form styles)
- Test: `tests/validation.test.ts`

**Interfaces:**
- Consumes: `site`, `copy.inventory`, `projects`, `previewPhotos`, `projectImage`, `toGalleryItem`, `PhotoGrid`, `Lightbox`, `Icon`, `BaseLayout`; env `PUBLIC_FORM_ENDPOINT`, `PUBLIC_FORM_ACCESS_KEY`; the `?home=` query parameter from Task 7
- Produces:
  - `validation.ts`: `PRICE_POINTS`, `REALTOR_OPTIONS`, `REFERRAL_OPTIONS`, `LIMITS`, `INQUIRY_FIELDS`, types `InquiryValues`, `InquiryField`, `InquiryErrors`, and `isValidEmail(value): boolean`, `normalizePhone(value): string | null`, `formatPhone(digits): string`, `validateField(field, values): string | undefined`, `validateInquiry(values): InquiryErrors`, `buildPayload(values, accessKey?): Record<string, string>`
  - `inquiry-form.ts`: `initInquiryForm(): void`
  - Dev-only preview: `/inventory/?formDemo=success` and `/inventory/?formDemo=error`

- [ ] **Step 1: Write the failing test `tests/validation.test.ts`**

```ts
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildPayload,
  formatPhone,
  isValidEmail,
  LIMITS,
  normalizePhone,
  validateField,
  validateInquiry,
  type InquiryValues,
} from '../src/lib/validation.ts';

const valid: InquiryValues = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  phone: '(214) 555-0100',
  message: '',
  pricePoint: '$1M–$2M',
  realtor: 'No',
  referral: '',
  referralOther: '',
};

const empty: InquiryValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  pricePoint: '',
  realtor: '',
  referral: '',
  referralOther: '',
};

test('a complete inquiry has no errors, and the optional fields may be left empty', () => {
  assert.deepEqual(validateInquiry(valid), {});
});

test('an empty form reports exactly the six required fields', () => {
  assert.deepEqual(Object.keys(validateInquiry(empty)).sort(), [
    'email',
    'firstName',
    'lastName',
    'phone',
    'pricePoint',
    'realtor',
  ]);
});

test('whitespace-only required fields count as empty', () => {
  assert.equal(validateField('firstName', { ...valid, firstName: '   ' }), 'Enter your first name.');
  assert.equal(validateField('lastName', { ...valid, lastName: '\t' }), 'Enter your last name.');
  assert.equal(validateField('email', { ...valid, email: '  ' }), 'Enter your email address.');
  assert.equal(validateField('phone', { ...valid, phone: ' ' }), 'Enter your phone number.');
});

test('isValidEmail() accepts ordinary addresses and ignores surrounding spaces', () => {
  for (const email of ['ada@example.com', 'first.last+tag@sub.example.co', '  ada@example.com  ']) {
    assert.equal(isValidEmail(email), true, email);
  }
});

test('isValidEmail() rejects malformed addresses', () => {
  for (const email of ['', 'ada', 'ada@', '@example.com', 'ada@example', 'ada @example.com', 'ada@exa mple.com']) {
    assert.equal(isValidEmail(email), false, email);
  }
});

test('normalizePhone() accepts the ways people type a US number', () => {
  for (const phone of ['2145550100', '(214) 555-0100', '214-555-0100', '214.555.0100', '214 555 0100', '+1 (214) 555-0100', '1-214-555-0100']) {
    assert.equal(normalizePhone(phone), '2145550100', phone);
  }
});

test('normalizePhone() rejects numbers that are too short, too long, or not numbers', () => {
  for (const phone of ['', '555-0100', '214555010', '21455501001', '2-214-555-0100', 'call me', '214-555-01OO']) {
    assert.equal(normalizePhone(phone), null, phone);
  }
});

test('formatPhone() writes ten digits in the standard US form', () => {
  assert.equal(formatPhone('2145550100'), '(214) 555-0100');
});

test('price point and realtor must be one of the offered choices', () => {
  assert.equal(validateField('pricePoint', { ...valid, pricePoint: '' }), 'Choose a price point.');
  assert.equal(validateField('pricePoint', { ...valid, pricePoint: '$9M' }), 'Choose a price point.');
  assert.equal(validateField('pricePoint', { ...valid, pricePoint: '$3M+' }), undefined);
  assert.equal(validateField('realtor', { ...valid, realtor: 'Maybe' }), 'Choose yes or no.');
  assert.equal(validateField('realtor', { ...valid, realtor: 'Yes' }), undefined);
});

test('"how did you hear about us" is optional but must come from the list', () => {
  assert.equal(validateField('referral', { ...valid, referral: '' }), undefined);
  assert.equal(validateField('referral', { ...valid, referral: 'Instagram' }), undefined);
  assert.equal(validateField('referral', { ...valid, referral: 'Carrier pigeon' }), 'Choose an option from the list.');
});

test('over-long entries are rejected with the limit in the message', () => {
  const long = (n: number) => 'x'.repeat(n);
  assert.equal(validateField('firstName', { ...valid, firstName: long(LIMITS.name) }), undefined);
  assert.equal(
    validateField('firstName', { ...valid, firstName: long(LIMITS.name + 1) }),
    'First name must be 80 characters or fewer.',
  );
  assert.equal(
    validateField('message', { ...valid, message: long(LIMITS.message + 1) }),
    'Your message must be 2000 characters or fewer.',
  );
  assert.equal(
    validateField('referralOther', { ...valid, referralOther: long(LIMITS.referralOther + 1) }),
    'Your answer must be 120 characters or fewer.',
  );
});

test('buildPayload() trims text, formats the phone and names the sender', () => {
  const payload = buildPayload({ ...valid, firstName: ' Ada ', phone: '214.555.0100', message: ' A lot in Uptown. ' });
  assert.equal(payload.name, 'Ada Lovelace');
  assert.equal(payload.subject, 'New website inquiry from Ada Lovelace');
  assert.equal(payload.phone, '(214) 555-0100');
  assert.equal(payload.message, 'A lot in Uptown.');
  assert.equal(payload.pricePoint, '$1M–$2M');
  assert.equal(payload.workingWithRealtor, 'No');
  assert.equal('access_key' in payload, false);
});

test('buildPayload() folds the "Other" answer in and adds an access key only when given', () => {
  const other = buildPayload({ ...valid, referral: 'Other', referralOther: ' A yard sign ' }, 'public-key');
  assert.equal(other.howDidYouHear, 'Other: A yard sign');
  assert.equal(other.access_key, 'public-key');
  assert.equal(buildPayload({ ...valid, referral: 'Other' }).howDidYouHear, 'Other');
  assert.equal(buildPayload({ ...valid, referral: 'Realtor', referralOther: 'ignored' }).howDidYouHear, 'Realtor');
});
```

- [ ] **Step 2: Run the test and confirm it fails**

```powershell
npm test
```

Expected: FAIL with `Cannot find module` for `src/lib/validation.ts`.

- [ ] **Step 3: Write `src/lib/validation.ts`**

```ts
export const PRICE_POINTS = ['Under $1M', '$1M–$2M', '$2M–$3M', '$3M+'] as const;
export const REALTOR_OPTIONS = ['Yes', 'No'] as const;
export const REFERRAL_OPTIONS = [
  'Friend or family',
  'Realtor',
  'Instagram',
  'Facebook',
  'Google search',
  'Saw a home or sign',
  'Lardner Group',
  'Other',
] as const;

export const LIMITS = { name: 80, email: 254, message: 2000, referralOther: 120 } as const;

export type InquiryValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  pricePoint: string;
  realtor: string;
  referral: string;
  referralOther: string;
};

export type InquiryField = keyof InquiryValues;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

/** In the order the fields appear on the form. */
export const INQUIRY_FIELDS: readonly InquiryField[] = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'message',
  'pricePoint',
  'realtor',
  'referral',
  'referralOther',
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL.test(value.trim());
}

/** Returns the ten digits of a US phone number, or null if `value` is not one. */
export function normalizePhone(value: string): string | null {
  if (/[^\d\s().+-]/.test(value)) return null;
  let digits = value.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  return digits.length === 10 ? digits : null;
}

export function formatPhone(digits: string): string {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function tooLong(value: string, max: number, label: string): string | undefined {
  return value.length > max ? `${label} must be ${max} characters or fewer.` : undefined;
}

function isOneOf(options: readonly string[], value: string): boolean {
  return options.includes(value);
}

/** Returns a message for the visitor, or undefined when the field is fine. */
export function validateField(field: InquiryField, values: InquiryValues): string | undefined {
  const value = values[field].trim();
  switch (field) {
    case 'firstName':
      return value ? tooLong(value, LIMITS.name, 'First name') : 'Enter your first name.';
    case 'lastName':
      return value ? tooLong(value, LIMITS.name, 'Last name') : 'Enter your last name.';
    case 'email':
      if (!value) return 'Enter your email address.';
      return value.length <= LIMITS.email && isValidEmail(value)
        ? undefined
        : 'Enter an email address like name@example.com.';
    case 'phone':
      if (!value) return 'Enter your phone number.';
      return normalizePhone(value) ? undefined : 'Enter a 10-digit phone number, like (214) 555-0100.';
    case 'message':
      return tooLong(value, LIMITS.message, 'Your message');
    case 'pricePoint':
      return isOneOf(PRICE_POINTS, value) ? undefined : 'Choose a price point.';
    case 'realtor':
      return isOneOf(REALTOR_OPTIONS, value) ? undefined : 'Choose yes or no.';
    case 'referral':
      return !value || isOneOf(REFERRAL_OPTIONS, value) ? undefined : 'Choose an option from the list.';
    case 'referralOther':
      return tooLong(value, LIMITS.referralOther, 'Your answer');
  }
}

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  for (const field of INQUIRY_FIELDS) {
    const message = validateField(field, values);
    if (message) errors[field] = message;
  }
  return errors;
}

/** The message sent to the form service. Field names are chosen to read well in an email. */
export function buildPayload(values: InquiryValues, accessKey = ''): Record<string, string> {
  const firstName = values.firstName.trim();
  const lastName = values.lastName.trim();
  const digits = normalizePhone(values.phone);
  const other = values.referralOther.trim();

  const payload: Record<string, string> = {
    subject: `New website inquiry from ${firstName} ${lastName}`,
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    email: values.email.trim(),
    phone: digits ? formatPhone(digits) : values.phone.trim(),
    message: values.message.trim(),
    pricePoint: values.pricePoint,
    workingWithRealtor: values.realtor,
    howDidYouHear: values.referral === 'Other' && other ? `Other: ${other}` : values.referral,
    source: 'lardnercustomhomes.com inventory form',
  };
  if (accessKey) payload.access_key = accessKey;
  return payload;
}
```

- [ ] **Step 4: Run the test and confirm it passes**

```powershell
npm test
```

Expected: PASS, 45 tests.

- [ ] **Step 5: Add the form styles to the end of `src/styles/components.css`**

```css
/* Forms */
.field {
  display: grid;
  gap: var(--space-2);
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.field__label {
  padding: 0;
  font-size: var(--step--1);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.field__input {
  width: 100%;
  min-height: 3rem;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--field-border);
  border-radius: 0;
  background: color-mix(in srgb, var(--color-white) 65%, var(--bg));
  transition: border-color var(--dur-fast) var(--ease);
}

textarea.field__input {
  min-height: 8rem;
  resize: vertical;
}

.field__input:hover,
.field__input:focus {
  border-color: var(--text);
}

.field[data-invalid] .field__input {
  border-color: var(--text);
  border-width: 2px;
}

.field__error {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.4;
}

.field__error svg {
  flex: none;
  margin-top: 0.1em;
}

.select {
  position: relative;
}

.select select {
  padding-right: 3rem;
  appearance: none;
}

.select svg {
  position: absolute;
  top: 50%;
  right: var(--space-4);
  margin-top: -0.5625rem;
  pointer-events: none;
}

.choices {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.choice {
  position: relative;
  display: inline-flex;
}

.choice__input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;
  opacity: 0;
}

.choice__label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: var(--tap);
  padding: var(--space-2) var(--space-5);
  border: 1px solid var(--field-border);
  transition:
    background-color var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease);
}

/* A ring that fills when chosen, so the choice never depends on colour alone. */
.choice__label::before {
  width: 0.75rem;
  height: 0.75rem;
  border: 1px solid currentColor;
  border-radius: 50%;
  content: '';
}

.choice__input:hover + .choice__label {
  background: var(--accent);
}

.choice__input:checked + .choice__label {
  border-color: var(--color-midnight);
  background: var(--color-midnight);
  color: var(--color-honeydew);
}

.choice__input:checked + .choice__label::before {
  background: currentColor;
}

.choice__input:focus-visible + .choice__label {
  outline: 2px solid var(--focus);
  outline-offset: 3px;
}
```

- [ ] **Step 6: Write `src/components/FieldError.astro`, `src/components/Field.astro` and `src/components/ChoiceField.astro`**

`src/components/FieldError.astro`:

```astro
---
import Icon from './Icon.astro';

interface Props {
  id: string;
}

const { id } = Astro.props;
---

<p class="field__error" id={id} hidden><Icon name="alert" size={18} /><span data-error-text></span></p>
```

`src/components/Field.astro`:

```astro
---
import FieldError from './FieldError.astro';

interface Props {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel';
  autocomplete?: string;
  required?: boolean;
  maxlength?: number;
  multiline?: boolean;
}

const { name, label, type = 'text', autocomplete, required = false, maxlength, multiline = false } = Astro.props;
const id = `inq-${name}`;
---

<div class="field" data-field={name}>
  <label class="field__label" for={id}>{label}{required && <Fragment>{' '}<span aria-hidden="true">*</span><span class="visually-hidden"> (required)</span></Fragment>}</label>
  {
    multiline ? (
      <textarea class="field__input" id={id} name={name} rows="5" maxlength={maxlength} required={required}></textarea>
    ) : (
      <input class="field__input" id={id} name={name} type={type} autocomplete={autocomplete} maxlength={maxlength} required={required} />
    )
  }
  <FieldError id={`${id}-error`} />
</div>
```

`src/components/ChoiceField.astro`:

```astro
---
import FieldError from './FieldError.astro';

interface Props {
  name: string;
  legend: string;
  options: readonly string[];
  required?: boolean;
}

const { name, legend, options, required = false } = Astro.props;
const id = `inq-${name}`;
---

<fieldset class="field" data-field={name} role="radiogroup" aria-required={required ? 'true' : undefined}>
  <legend class="field__label">{legend}{required && <Fragment>{' '}<span aria-hidden="true">*</span><span class="visually-hidden"> (required)</span></Fragment>}</legend>
  <div class="choices">
    {
      options.map((option, i) => (
        <span class="choice">
          <input class="choice__input" type="radio" id={`${id}-${i}`} name={name} value={option} required={required} />
          <label class="choice__label" for={`${id}-${i}`}>{option}</label>
        </span>
      ))
    }
  </div>
  <FieldError id={`${id}-error`} />
</fieldset>
```

- [ ] **Step 7: Write `src/components/InquiryForm.astro`**

```astro
---
import { site } from '../data/site.ts';
import { LIMITS, PRICE_POINTS, REALTOR_OPTIONS, REFERRAL_OPTIONS } from '../lib/validation.ts';
import ChoiceField from './ChoiceField.astro';
import Field from './Field.astro';
import FieldError from './FieldError.astro';
import Icon from './Icon.astro';

const endpoint = import.meta.env.PUBLIC_FORM_ENDPOINT ?? '';
const accessKey = import.meta.env.PUBLIC_FORM_ACCESS_KEY ?? '';
---

<div class="inquiry" data-inquiry>
  <form
    class="inquiry__form"
    data-inquiry-form
    method="post"
    action={endpoint || undefined}
    data-endpoint={endpoint}
    data-access-key={accessKey}
    data-demo={import.meta.env.DEV ? '' : undefined}
  >
    <p class="inquiry__note"><span aria-hidden="true">*</span> marks a required field.</p>

    <div class="inquiry__row">
      <Field name="firstName" label="First name" autocomplete="given-name" maxlength={LIMITS.name} required />
      <Field name="lastName" label="Last name" autocomplete="family-name" maxlength={LIMITS.name} required />
    </div>
    <div class="inquiry__row">
      <Field name="email" label="Email" type="email" autocomplete="email" maxlength={LIMITS.email} required />
      <Field name="phone" label="Phone" type="tel" autocomplete="tel" maxlength={24} required />
    </div>
    <Field name="message" label="Tell us what you're looking for" maxlength={LIMITS.message} multiline />
    <ChoiceField name="pricePoint" legend="Price point" options={PRICE_POINTS} required />
    <ChoiceField name="realtor" legend="Are you working with a realtor?" options={REALTOR_OPTIONS} required />

    <div class="field" data-field="referral">
      <label class="field__label" for="inq-referral">How did you hear about us?</label>
      <div class="select">
        <select class="field__input" id="inq-referral" name="referral">
          <option value="">Select one</option>
          {REFERRAL_OPTIONS.map((option) => <option value={option}>{option}</option>)}
        </select>
        <Icon name="chevron-down" size={18} />
      </div>
      <FieldError id="inq-referral-error" />
    </div>
    <div data-referral-other>
      <Field name="referralOther" label="Other (please tell us)" maxlength={LIMITS.referralOther} />
    </div>

    <!-- Spam trap. People never see or reach this field; simple bots fill it in. -->
    <div class="visually-hidden" aria-hidden="true">
      <label for="inq-company">Company</label>
      <input id="inq-company" name="company" type="text" tabindex="-1" autocomplete="off" />
    </div>

    <div class="inquiry__alert" data-inquiry-alert role="alert" tabindex="-1" hidden>
      <Icon name="alert" />
      <div>
        <p class="inquiry__alert-title" data-inquiry-alert-title></p>
        <p>You can also reach Colin at <a href={site.email.href}>{site.email.display}</a> or <a href={site.phone.href}>{site.phone.display}</a>.</p>
      </div>
    </div>

    <button class="btn inquiry__submit" type="submit" data-inquiry-submit>
      <span data-inquiry-submit-label>Send</span>
    </button>

    <noscript>
      <p class="inquiry__note">This form needs JavaScript. You can also reach Colin at {site.email.display} or {site.phone.display}.</p>
    </noscript>
  </form>

  <div class="inquiry__success" data-inquiry-success role="status" tabindex="-1" hidden>
    <Icon name="check" size={32} />
    <h2>Thank you.</h2>
    <p class="lead" data-inquiry-success-text>Your message is on its way to Colin. We'll be in touch soon.</p>
  </div>
</div>

<script>
  import { initInquiryForm } from '../scripts/inquiry-form.ts';
  initInquiryForm();
</script>

<style>
  .inquiry__form {
    display: grid;
    gap: var(--space-5);
  }

  .inquiry__note {
    color: var(--text-muted);
    font-size: 0.9375rem;
  }

  .inquiry__row {
    display: grid;
    gap: var(--space-5);
  }

  .inquiry__alert {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
    border: 2px solid var(--text);
    background: var(--surface);
  }

  .inquiry__alert :global(svg) {
    flex: none;
    margin-top: 0.15em;
  }

  .inquiry__alert-title {
    font-weight: 500;
  }

  .inquiry__submit {
    justify-self: start;
    min-width: 10rem;
  }

  .inquiry__submit[data-loading]::after {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: inquiry-spin 0.8s linear infinite;
    content: '';
  }

  .inquiry__submit[aria-disabled='true'] {
    cursor: progress;
  }

  @keyframes inquiry-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .inquiry__success {
    display: grid;
    justify-items: start;
    gap: var(--space-4);
    padding: var(--space-7) var(--space-6);
    background: var(--surface);
  }

  .inquiry__success:focus {
    outline: none;
  }

  @media (min-width: 40rem) {
    .inquiry__row {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
```

- [ ] **Step 8: Write `src/scripts/inquiry-form.ts`**

```ts
import {
  buildPayload,
  formatPhone,
  normalizePhone,
  validateField,
  validateInquiry,
  INQUIRY_FIELDS,
  type InquiryErrors,
  type InquiryField,
  type InquiryValues,
} from '../lib/validation.ts';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const TIMEOUT_MS = 15_000;
const DEMO_DELAY_MS = 1_200;
const MESSAGES = {
  notConnected: "This form isn't connected yet, so your message was not sent.",
  failed: 'Sorry, something went wrong and your message was not sent.',
  demoSuccess: 'Demo mode: this is how a successful send looks. Nothing was sent.',
};

class NotConnectedError extends Error {}

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

function isInquiryField(name: string | undefined): name is InquiryField {
  return INQUIRY_FIELDS.includes(name as InquiryField);
}

export function initInquiryForm(): void {
  const root = document.querySelector<HTMLElement>('[data-inquiry]');
  const form = root?.querySelector<HTMLFormElement>('[data-inquiry-form]');
  const submit = form?.querySelector<HTMLButtonElement>('[data-inquiry-submit]');
  const submitLabel = form?.querySelector<HTMLElement>('[data-inquiry-submit-label]');
  const alert = form?.querySelector<HTMLElement>('[data-inquiry-alert]');
  const alertTitle = form?.querySelector<HTMLElement>('[data-inquiry-alert-title]');
  const success = root?.querySelector<HTMLElement>('[data-inquiry-success]');
  const successText = root?.querySelector<HTMLElement>('[data-inquiry-success-text]');
  const referral = form?.querySelector<HTMLSelectElement>('select[name="referral"]');
  const referralOther = form?.querySelector<HTMLElement>('[data-referral-other]');
  if (!form || !submit || !submitLabel || !alert || !alertTitle || !success || !successText || !referral || !referralOther) {
    return;
  }

  // The script takes over validation so messages match the site's wording.
  form.noValidate = true;

  const params = new URLSearchParams(window.location.search);
  const demo = form.hasAttribute('data-demo') ? params.get('formDemo') : null;
  let status: Status = 'idle';

  const readValues = (): InquiryValues => {
    const data = new FormData(form);
    const get = (name: InquiryField) => String(data.get(name) ?? '');
    return {
      firstName: get('firstName'),
      lastName: get('lastName'),
      email: get('email'),
      phone: get('phone'),
      message: get('message'),
      pricePoint: get('pricePoint'),
      realtor: get('realtor'),
      referral: get('referral'),
      referralOther: get('referralOther'),
    };
  };

  const wrapperFor = (field: InquiryField) => form.querySelector<HTMLElement>(`[data-field="${field}"]`);
  const controlIn = (wrapper: HTMLElement) =>
    wrapper.querySelector<HTMLElement>('input, textarea, select');

  const setError = (field: InquiryField, message: string | undefined) => {
    const wrapper = wrapperFor(field);
    const error = wrapper?.querySelector<HTMLElement>('.field__error');
    const text = error?.querySelector<HTMLElement>('[data-error-text]');
    if (!wrapper || !error || !text) return;
    // Radio groups are described at the group; single controls at the control.
    const target = wrapper.matches('fieldset') ? wrapper : controlIn(wrapper);
    if (!target) return;

    if (message) {
      text.textContent = message;
      error.hidden = false;
      wrapper.setAttribute('data-invalid', '');
      target.setAttribute('aria-invalid', 'true');
      target.setAttribute('aria-describedby', error.id);
    } else {
      text.textContent = '';
      error.hidden = true;
      wrapper.removeAttribute('data-invalid');
      target.removeAttribute('aria-invalid');
      target.removeAttribute('aria-describedby');
    }
  };

  const showErrors = (errors: InquiryErrors) => {
    for (const field of INQUIRY_FIELDS) setError(field, errors[field]);
  };

  const setStatus = (next: Status, message = '') => {
    status = next;
    const busy = next === 'submitting';
    form.setAttribute('aria-busy', String(busy));
    submit.setAttribute('aria-disabled', String(busy));
    submit.toggleAttribute('data-loading', busy);
    submitLabel.textContent = busy ? 'Sending…' : next === 'error' ? 'Try again' : 'Send';

    if (next === 'error') {
      alertTitle.textContent = message;
      alert.hidden = false;
      alert.focus();
    } else {
      alert.hidden = true;
    }

    if (next === 'success') {
      if (message) successText.textContent = message;
      form.hidden = true;
      success.hidden = false;
      success.focus();
    }
  };

  const deliver = async (values: InquiryValues): Promise<void> => {
    // The spam trap was filled in: drop the message without telling the bot.
    if (String(new FormData(form).get('company') ?? '') !== '') return;

    if (demo === 'success' || demo === 'error') {
      await wait(DEMO_DELAY_MS);
      if (demo === 'error') throw new Error('Demo error');
      return;
    }

    const endpoint = form.dataset.endpoint;
    if (!endpoint) throw new NotConnectedError();

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(buildPayload(values, form.dataset.accessKey)),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Form service responded with ${response.status}`);
    } finally {
      window.clearTimeout(timer);
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const values = readValues();
    const errors = validateInquiry(values);
    showErrors(errors);
    const firstInvalid = INQUIRY_FIELDS.find((field) => errors[field]);
    if (firstInvalid) {
      const wrapper = wrapperFor(firstInvalid);
      if (wrapper) controlIn(wrapper)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      await deliver(values);
      setStatus('success', demo === 'success' ? MESSAGES.demoSuccess : '');
    } catch (error) {
      setStatus('error', error instanceof NotConnectedError ? MESSAGES.notConnected : MESSAGES.failed);
    }
  });

  // Check a field when the visitor leaves it.
  form.addEventListener('focusout', (event) => {
    const wrapper = (event.target as Element).closest<HTMLElement>('[data-field]');
    const field = wrapper?.dataset.field;
    if (!wrapper || !isInquiryField(field)) return;
    if (wrapper.contains(event.relatedTarget as Node | null)) return;

    if (field === 'phone') {
      const input = controlIn(wrapper) as HTMLInputElement | null;
      const digits = input ? normalizePhone(input.value) : null;
      if (input && digits) input.value = formatPhone(digits);
    }
    setError(field, validateField(field, readValues()));
  });

  // Clear a message as soon as the problem is fixed.
  const recheck = (event: Event) => {
    const wrapper = (event.target as Element).closest<HTMLElement>('[data-field]');
    const field = wrapper?.dataset.field;
    if (!wrapper || !isInquiryField(field) || !wrapper.hasAttribute('data-invalid')) return;
    setError(field, validateField(field, readValues()));
  };
  form.addEventListener('input', recheck);
  form.addEventListener('change', recheck);

  const syncOther = () => {
    referralOther.hidden = referral.value !== 'Other';
  };
  referral.addEventListener('change', syncOther);
  syncOther();

  // Arriving from a listing: start the message for them.
  const home = params.get('home')?.replace(/[\u0000-\u001f]/g, '').trim().slice(0, 120);
  const message = form.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
  if (home && message && !message.value) message.value = `I'm interested in ${home}.`;
}
```

- [ ] **Step 9: Write `src/pages/inventory.astro`**

```astro
---
import InquiryForm from '../components/InquiryForm.astro';
import Lightbox from '../components/Lightbox.astro';
import PhotoGrid from '../components/PhotoGrid.astro';
import { copy } from '../data/copy.ts';
import { projects } from '../data/projects.ts';
import BaseLayout from '../layouts/BaseLayout.astro';
import { previewPhotos } from '../lib/content.ts';
import { projectImage, toGalleryItem } from '../lib/images.ts';

const page = copy.inventory;
const items = await Promise.all(
  previewPhotos(projects, 2, 6).map(({ photo, project }) =>
    toGalleryItem(projectImage(project.slug, photo.file), photo.alt, project.name),
  ),
);
---

<BaseLayout title="Inventory" description="Tell Lardner Custom Homes what you're looking for and hear about current and upcoming homes and lots in Dallas.">
  <div class="inventory container">
    <div class="inventory__form">
      <div class="inventory__intro">
        <p class="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p class="lead">{page.intro}</p>
      </div>
      <InquiryForm />
    </div>
    {
      items.length > 0 && (
        <aside class="inventory__gallery" aria-labelledby="inventory-gallery-title">
          <h2 class="eyebrow" id="inventory-gallery-title">{page.galleryHeading}</h2>
          <PhotoGrid items={items} layout="dense" ratio="3/2" eagerCount={2} />
          <a class="link-arrow" href="/gallery/">{page.galleryLink}</a>
        </aside>
      )
    }
  </div>
  <Lightbox />
</BaseLayout>

<style>
  .inventory {
    display: grid;
    gap: var(--space-8);
    padding-block: var(--space-8) var(--space-section);
  }

  .inventory__intro {
    display: grid;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .inventory__gallery {
    display: grid;
    align-content: start;
    justify-items: start;
    gap: var(--space-4);
  }

  .inventory__gallery :global(.photo-grid) {
    width: 100%;
  }

  @media (min-width: 64rem) {
    .inventory {
      align-items: start;
      grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
      column-gap: var(--space-9);
    }
  }

  /* Keep the gallery in view beside the form, but only when the window is tall enough to show all of it. */
  @media (min-width: 64rem) and (min-height: 56rem) {
    .inventory__gallery {
      position: sticky;
      top: calc(var(--header-h-compact) + var(--space-5));
    }
  }
</style>
```

- [ ] **Step 10: Build and check in the browser**

```powershell
npm run build
```

Expected: `0 errors`, `22 page(s) built`.

In the browser at `/inventory/`:
- **1280px:** form on the left, six photo tiles in two columns on the right. **768px and 375px:** the form comes first, the gallery follows, still two tiles per row.
- Submitting the empty form shows six messages (first name, last name, email, phone, price point, realtor), each with an icon, and focus moves to First name.
- Typing `ada@example` in Email and tabbing away shows "Enter an email address like name@example.com."; correcting it clears the message as you type.
- Typing `214.555.0100` in Phone and tabbing away reformats it to `(214) 555-0100`.
- Price point and realtor choices show a filled ring and a dark fill when selected, and can be changed with the arrow keys.
- "Other (please tell us)" appears only when "Other" is chosen.
- `/inventory/?formDemo=success`: fill the form and send. The button shows "Sending…" with a spinner for about a second; clicking it again during that time does nothing; then the form is replaced by "Thank you." and the demo note.
- `/inventory/?formDemo=error`: after sending, an alert appears reading "Sorry, something went wrong and your message was not sent." with Colin's email and phone, the button reads "Try again", and everything typed is still in the form.
- `/inventory/` with no demo parameter: sending shows "This form isn't connected yet, so your message was not sent."
- `/inventory/?home=Sample%20Home%2001` pre-fills the message with "I'm interested in Sample Home 01."
- Clicking a gallery tile opens the lightbox.
- The whole form can be completed and sent using only the keyboard.

- [ ] **Step 11: Confirm the demo switch is absent from the production build**

```powershell
npm run build
Select-String -Path dist\inventory\index.html -Pattern "<form[^>]*data-demo" -Quiet
```

Expected: `False`. (The pattern checks the `<form>` tag itself; the attribute name may still appear inside the page's script.)

- [ ] **Step 12: Commit**

```powershell
git add -A
git commit -m "Add Inventory page and enquiry form" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Not-found page and project documents

**Files:**
- Create: `src/pages/404.astro`, `README.md`, `CONTENT-TODO.md`
- Modify: `src/data/copy.ts` (only if the copy review in Step 4 finds something)

**Interfaces:**
- Consumes: `copy.notFound`, `PageHeader`, `BaseLayout`

- [ ] **Step 1: Write `src/pages/404.astro`**

```astro
---
import PageHeader from '../components/PageHeader.astro';
import { copy } from '../data/copy.ts';
import BaseLayout from '../layouts/BaseLayout.astro';

const { title, body } = copy.notFound;
---

<BaseLayout title={title}>
  <PageHeader title={title} intro={body} />
  <section class="container">
    <p class="links">
      <a class="btn" href="/">Home</a>
      <a class="btn btn--ghost" href="/homes/">Homes</a>
      <a class="btn btn--ghost" href="/gallery/">Gallery</a>
    </p>
  </section>
</BaseLayout>

<style>
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    padding-bottom: var(--space-section);
  }
</style>
```

- [ ] **Step 2: Write `README.md`**

````markdown
# Lardner Custom Homes website

The website for Lardner Custom Homes: Home, Homes, Gallery, About and Inventory.
Built with [Astro](https://astro.build). The output is plain HTML, CSS and a small amount of JavaScript.

## Run it

You need [Node.js](https://nodejs.org) 22.12 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:4321.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the site locally and reloads as you edit |
| `npm test` | Runs the unit tests |
| `npm run build` | Checks the code and builds the finished site into `dist/` |
| `npm run preview` | Serves the built site from `dist/` |

## Change content

Everything that changes often lives in `src/data/`. You should not need to edit any layout code.

| To change | Edit |
|---|---|
| Phone, email, address, social links | `src/data/site.ts` |
| Menu items | `src/data/navigation.ts` |
| Homes and lots | `src/data/homes.ts` (instructions at the top of the file) |
| Gallery projects and photos | `src/data/projects.ts` (instructions at the top of the file) |
| Page text | `src/data/copy.ts` |
| Colours, fonts, spacing | `src/styles/tokens.css` |

### Photos

- Project photos go in `src/assets/projects/<project-slug>/`.
- Home and lot photos go in `src/assets/homes/<listing-slug>/`.
- The home page hero goes in `src/assets/site/`; set its file name at `copy.home.hero.image`.
- Use JPG, PNG, WebP or AVIF. Upload the largest version you have; the site resizes and compresses automatically.
- If a file name in the data does not match a file on disk, the site shows a "Placeholder" tile instead of a broken image.
- Each photo's `room` decides which Gallery room page it also appears on.
- Write `alt` text that describes the photo for someone who cannot see it.

### Placeholders

Text that reads `[Placeholder: …]` with a blue highlight, and tiles labelled "Placeholder", mark content that still has to be supplied. `CONTENT-TODO.md` lists all of it.

## Connect the Inventory form

The form does not send email until it is connected to a form service. Until then it tells visitors it isn't connected and shows Colin's phone and email.

1. Create an account with a form service that forwards submissions to email (for example Formspree or Web3Forms) and set the recipient to colin@lardnergroup.com in that service.
2. Copy `.env.example` to `.env`.
3. Set `PUBLIC_FORM_ENDPOINT` to the address the service gives you.
4. If the service needs a key in the message and that key is designed to be public, set `PUBLIC_FORM_ACCESS_KEY`.
5. On the hosting provider, set the same variables, then rebuild.

Never put a private or secret key in a `PUBLIC_` variable. Anything with that prefix is sent to every visitor's browser.

To preview the form's states without sending anything, run `npm run dev` and open `/inventory/?formDemo=success` or `/inventory/?formDemo=error`. This only works locally.

## Publish

`npm run build` writes the finished site to `dist/`. That folder can be uploaded to any static host (Netlify, Cloudflare Pages, Vercel and similar).

Squarespace cannot host this site. To go live, publish `dist/` to a static host and point the lardnercustomhomes.com domain at it.

## Project layout

```
src/data/        content
src/lib/         logic with unit tests in tests/
src/scripts/     browser behaviour: navigation, lightbox, scroll reveal, form
src/components/  reusable page pieces
src/layouts/     the page shell
src/pages/       one file per address
src/styles/      design tokens and shared styles
public/          files served as-is (PDFs, favicon)
```

To regenerate the "L" mark and favicon from the logo: `npm run brand-assets`.
````

- [ ] **Step 3: Write `CONTENT-TODO.md`**

```markdown
# Content still needed

Everything on this list is currently a labelled placeholder or needs Colin's sign-off.

## Photos

- [ ] **Home page hero**: one wide photo, at least 2400px across. Save to `src/assets/site/` and set `copy.home.hero.image`.
- [ ] **Portfolio projects**: for each project, a name, its location, a front-elevation cover photo, and photos tagged by room (exterior, kitchen, bath, living). Replace the four "Sample Project" entries in `src/data/projects.ts`.
- [ ] **Colin's portrait**: the current file is 447 × 447px. A version at least 1200px wide would let it be shown larger. Replace `src/assets/people/colin-lardner.jpg`.

## Homes and lots

- [ ] **Available homes**: for each, name or address, neighborhood, status (For Sale, Pending, Coming Soon, Sold), price, beds, baths, square feet, a short description and photos. Replace the four "Sample Home" entries in `src/data/homes.ts`.
- [ ] **Lots**: for each, name or address, neighborhood, status, price, lot size, a short description and photos. Replace the two "Sample Lot" entries.

## Text

- [ ] **Build on Your Lot**: a few sentences on how it works (`copy.homes.buildOnYourLot.body`).
- [ ] **Biography**: confirm the three paragraphs, adapted from lardnercustomhomes.com/about and lardnergroup.com. They name Colin's wife and daughter because the current site does; remove that sentence if he prefers.
- [ ] **Company description and values**: confirm the wording, adapted from the current sites.
- [ ] **Neighborhood list** on the home page: confirm it is current.
- [ ] **Inventory introduction**: confirm the wording.

## Details to confirm

- [ ] **Phone number**: the site uses (844) 527-3637. The current site shows 214-282-3144.
- [ ] **Job title**: shown as "CEO", as on the current site.
- [ ] **TREC documents**: the footer links to the IABS form and Consumer Protection Notice CN 1-5. The third supplied file (`trec.pdf`) is an older notice and is not used.

## Before going live

- [ ] Connect the Inventory form to a form service (see README).
- [ ] Choose a static host and point the domain at it (Squarespace cannot host this site).
- [ ] Remove every remaining "Sample" entry and `[Placeholder: …]` text.
```

- [ ] **Step 4: Review the site copy with the humanizer skill**

Invoke `anthropic-skills:humanizer` on the visitor-facing strings in `src/data/copy.ts` (hero, introduction, biography, company, values, Inventory introduction, empty states, not-found). Apply its edits only where they keep every statement traceable to the source comment above the block. Do not add facts.

Then run:

```powershell
npm test
```

Expected: PASS, 45 tests.

- [ ] **Step 5: Build and check**

```powershell
npm run build
```

Expected: `0 errors`, `23 page(s) built`, and `dist/404.html` exists.

In the browser, open `http://localhost:4321/does-not-exist/` and confirm the not-found page shows with the header, three buttons and the footer.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "Add not-found page, README and content checklist" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 13: Full verification pass

**Files:**
- Modify: any file where a check below fails

**Interfaces:**
- Consumes: the whole site

Use `superpowers:verification-before-completion`. Record the actual output of each command and the actual result of each check. Fix failures as they are found, re-run the affected checks, and commit the fixes.

- [ ] **Step 1: Automated checks**

```powershell
npm test
npm run build
```

Expected: 45 tests pass; `astro check` reports `0 errors`, `0 warnings`; `23 page(s) built`.

- [ ] **Step 2: Real-photo smoke test**

The sample data has no image files, so the optimised-image path is only exercised by this step.

```powershell
New-Item -ItemType Directory -Force src\assets\projects\sample-project-01, src\assets\homes\sample-home-01, src\assets\site | Out-Null
Copy-Item src\assets\people\colin-lardner.jpg src\assets\projects\sample-project-01\front.jpg
Copy-Item src\assets\people\colin-lardner.jpg src\assets\homes\sample-home-01\front.jpg
Copy-Item src\assets\people\colin-lardner.jpg src\assets\site\hero.jpg
```

Temporarily edit the data. Append to the end of `src/data/projects.ts`:

```ts
// TEMPORARY: real-photo smoke test. Removed by `git checkout src/data`.
const smokeProject = projects[0];
if (smokeProject) {
  smokeProject.cover = 'front.jpg';
  const first = smokeProject.photos[0];
  if (first) first.file = 'front.jpg';
}
```

Append to the end of `src/data/homes.ts`:

```ts
// TEMPORARY: real-photo smoke test. Removed by `git checkout src/data`.
const smokeListing = listings[0];
if (smokeListing) {
  smokeListing.cover = 'front.jpg';
  const first = smokeListing.photos[0];
  if (first) first.file = 'front.jpg';
}
```

In `src/data/copy.ts`, change `image: null as string | null,` to `image: 'hero.jpg' as string | null,`.

```powershell
npm run build
```

Expected: build succeeds and the log lists generated `.webp` files.

In the browser confirm:
- `/` hero shows the photo filling the frame, cropped not stretched.
- `/gallery/` first card shows the photo at 3:2, cropped not stretched; `/gallery/sample-project-01/` shows it at its natural square shape; the lightbox opens it at full size.
- `/gallery/exterior/` shows the photo in the first tile.
- `/homes/` first card shows the photo at 4:3; `/homes/sample-home-01/` shows it as the 16:9 cover.
- `/inventory/` gallery shows it in the first tile.
- In the Network panel, images below the fold are requested only after scrolling (lazy loading), and the served files are `.webp`.

Then undo everything from this step:

```powershell
git checkout src/data
Remove-Item -Recurse -Force src\assets\projects\sample-project-01, src\assets\homes\sample-home-01
Remove-Item -Force src\assets\site\hero.jpg
git status --short
```

Expected: `git status --short` prints nothing.

- [ ] **Step 3: Page-by-page check at 375, 768, 1280 and 1440px**

For every address below, at each width, confirm: the page loads; nothing overflows sideways (`document.documentElement.scrollWidth <= window.innerWidth` is `true`); spacing and type look consistent with the other pages; the console has no errors or warnings.

```
/
/homes/  /homes/available/  /homes/lots/  /homes/build-on-your-lot/  /homes/sample-home-01/  /homes/sample-lot-01/
/gallery/  /gallery/exterior/  /gallery/kitchen/  /gallery/bath/  /gallery/living/  /gallery/sample-project-01/
/about/
/inventory/
/does-not-exist/
```

- [ ] **Step 4: The brief's verification list**

Confirm each item and note the result:

- Every navigation link, sub-navigation link, mobile-menu link, card link and button goes to a page that exists.
- Facebook, Instagram and both PDF links open the right target in a new tab.
- The header and footer logos link to `/`.
- The header hides on scroll down and returns on scroll up, at mobile and desktop widths.
- The mobile menu opens, traps focus, closes with X and Escape, and returns focus to the menu button.
- Homes grid: 3 / 2 / 1 columns at 1280 / 768 / 375px. Gallery grid: 2 / 2 / 1.
- Inventory: two columns at 1280px; stacked at 768px and 375px.
- Project view opens from the gallery and closes with the X, a click on the dark area, and Escape.
- Lightbox opens; closes with the X, a click outside the photo, and Escape; previous/next work; the page behind does not scroll.
- Form validation works; sending, success and error states work (via `?formDemo=`).
- No missing images or broken assets (Network panel shows no 404s).
- Colours match the four-colour palette; no stray colours.
- With the keyboard only: every link, button, menu, card, photo and form control can be reached and operated, and the focus ring is always visible.
- With `prefers-reduced-motion: reduce` emulated: no fades, slides or zooms.
- With JavaScript disabled: every page's content is visible and links work.

- [ ] **Step 5: Design critique**

Invoke `design:design-critique` with screenshots of `/`, `/homes/`, `/gallery/`, `/gallery/sample-project-01/`, `/about/` and `/inventory/` at 1280px and 375px. Fix findings about hierarchy, spacing consistency and clarity. Do not change the palette, layouts or structure set by the brief.

- [ ] **Step 6: Accessibility review**

Invoke `design:accessibility-review` on the same pages. Fix every WCAG 2.1 AA finding (contrast, keyboard access, target size, names and roles, heading order).

- [ ] **Step 7: Final automated run and commit**

```powershell
npm test
npm run build
git add -A
git commit -m "Fix issues found in verification" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Expected: tests pass, build succeeds. If Steps 1–6 required no changes, skip the commit.

- [ ] **Step 8: Report**

Tell the user what was built, what was verified (with the evidence), and the assumptions made:

- Placeholder content and where `CONTENT-TODO.md` is.
- The form is not connected to email.
- Squarespace cannot host the site.
- The desktop header shows the full logo at the top of the page and the "L" mark once scrolled.
- The phone number, job title and family sentence need Colin's confirmation.

