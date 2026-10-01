# Lardner Custom Homes Website — Design Spec

Date: 2026-10-01
Status: awaiting review
Source brief: `Lardner Custom Homes Revised.txt` (Downloads)
Source assets: `OneDrive\Documents\Lardner Custom Homes Website`

## 1. Goal

Build a new, production-ready website for Lardner Custom Homes that replaces the
outdated Squarespace site. It must showcase homes and portfolio photography,
make it easy to contact Colin Lardner, and read as a separate brand from the
brokerage site (lardnergroup.com).

Success means:

- Five page areas work on desktop, tablet and mobile: Home, Homes, Gallery,
  About, Inventory.
- The look is modern, minimal, clean and elegant, using the four-colour palette.
- No invented facts. Missing content shows as clearly labelled placeholders.
- Adding a home, project or photo means editing a data file, not layout code.
- The verification checklist in section 12 passes.

Out of scope for this build: going live, DNS changes, choosing a host, and
connecting real email delivery. See section 13.

## 2. Decisions already made

| Topic | Decision |
|---|---|
| Photos and project content | Labelled placeholders now; real content added later |
| Tech stack | Astro static site (Node.js 24 LTS) |
| Gallery structure | Project grid, plus four room pages that pull tagged photos from all projects |
| Project location | `C:\Users\User\Projects\lardner-custom-homes` (outside OneDrive) |
| Phone number | (844) 527-3637, as the brief states |
| Footer PDFs | IABS → `broker-services-870518246.pdf`; CPN → `CN 1-5_0.pdf`; `trec.pdf` is not linked |

## 3. Tech stack

- **Astro**, static output. Every page is pre-built HTML.
- **No UI framework.** Interactivity is small TypeScript modules: navigation,
  lightbox, scroll reveal, enquiry form.
- **Plain CSS with custom properties.** No Tailwind or component library.
- **Astro's built-in image pipeline** for resizing, modern formats and
  `srcset`.
- **Fontsource** packages so fonts ship with the site (no Google Fonts request).
- **Tests** run on Node's built-in test runner. No test framework dependency.

The brief lists the `web-artifacts-builder` skill. That skill produces
single-file React artifacts for claude.ai, which does not suit a multi-page
production site, so it is not used. The other listed skills are used where they
apply (design, theme-factory for token cohesion, humanizer for copy,
design-critique, writing-plans, executing-plans, verification-before-completion).

## 4. Site map

| Address | Page | Notes |
|---|---|---|
| `/` | Home | |
| `/homes/` | All homes and lots | 3-column card grid |
| `/homes/available/` | Homes for sale | Same grid, filtered |
| `/homes/lots/` | Lots | Same grid, filtered |
| `/homes/build-on-your-lot/` | Build on Your Lot | Short explainer and a button to the enquiry form |
| `/homes/<slug>/` | Listing detail | Photos, specs, enquiry button |
| `/gallery/` | Project grid | 2-column, 3:2 covers, name below |
| `/gallery/<slug>/` | Project view | Dark immersive page, lightbox |
| `/gallery/exterior/`, `/kitchen/`, `/bath/`, `/living/` | Room pages | Photos with that tag from every project |
| `/about/` | About | F-pattern layout |
| `/inventory/` | Inventory | Form left, gallery right |
| `/404` | Not found | Links back to Home, Homes, Gallery |

Project slugs may not be `exterior`, `kitchen`, `bath` or `living`. Listing
slugs may not be `available`, `lots` or `build-on-your-lot`. A data test
enforces both.

## 5. Shared layout

### Header

- Fixed bar with a solid Honeydew background, so the logo stays legible and the
  bar never sits on top of photography.
- Desktop (1024px and up): `Homes ▾  Gallery ▾  [logo]  About  Inventory`.
  The logo is centred and links to `/`.
- Homes and Gallery are links to their index pages. Each also has a submenu
  that opens on hover, on focus, and through a small disclosure button for
  touch and keyboard users.
- The current section is marked with `aria-current` and an underline, not
  colour alone.
- **Hide and show:** the bar slides up when the user scrolls down past a short
  threshold and slides back when they scroll up. It always shows at the top of
  the page, while keyboard focus is inside it, and while a menu is open.
- Page content starts below the bar, and `scroll-padding-top` matches its
  height, so the bar never covers content or anchor targets.
- Below 1024px: menu button on the left, logo centred. The button opens a
  full-screen menu with all pages and sub-pages listed, large touch targets, a
  focus trap, and Escape to close.

### Logo

The supplied logo is a stacked lockup (colour-block "L" above the wordmark,
1500 × 1346, transparent background). At header sizes the wordmark becomes too
small to read on phones.

- Desktop header and footer: the full supplied logo.
- Mobile header: the "L" mark only, cropped from the supplied file. The link
  keeps the accessible name "Lardner Custom Homes — home".

The crop is derived from the supplied file. Nothing is redrawn.

### Footer

Three columns on desktop, stacked and centred on mobile:

- **Left — Contact:** phone `(844) 527-3637` (`tel:8445273637`), email
  `colin@lardnergroup.com` (`mailto:`), `Dallas, TX 75220`.
- **Centre — Social:** Facebook and Instagram icons (inline SVG). They open in
  a new tab with `rel="noopener noreferrer"` and have text labels for screen
  readers.
- **Right — Legal:** "Texas Real Estate Commission Information About Brokerage
  Services" and "Texas Real Estate Commission Consumer Protection Notice",
  each linking to its PDF in a new tab.

A copyright line sits below the three columns.

## 6. Visual system

### Colour tokens

| Token | Value | Role |
|---|---|---|
| `--color-honeydew` | `#F0FFF0` | Page background |
| `--color-champagne` | `#F7E6CA` | Section bands, panels, placeholder tiles |
| `--color-powder` | `#B8E3E9` | Hover and focus accents, thin rules, selected states |
| `--color-midnight` | `#272757` | All text, buttons, icons |
| `--color-midnight-deep` | `#12122B` (Midnight, darkened) | Project view and lightbox backdrop |
| `--color-white` | `#FFFFFF` | Text on dark backgrounds |

Components use semantic tokens (`--surface`, `--text`, `--accent`, and so on)
that point at these, so the palette can change in one file.

The brief calls Champagne "Accent #1 / Foreground". Champagne text on Honeydew
has a contrast ratio of about 1.2:1, which is unreadable, so Champagne is used
as a surface colour. Midnight Blue text measures about 13:1 on Honeydew, 11:1
on Champagne and 10:1 on Powder Blue.

### Typography

- **Headings:** Cormorant Garamond. A refined serif that echoes the logo
  wordmark.
- **Body, navigation, buttons, captions:** Jost. A clean geometric sans.
- One fluid type scale using `clamp()`, with a largest heading of roughly 64px
  on desktop. Body text is 17–18px with a line length capped near 65
  characters.
- Navigation and small labels use uppercase Jost with modest letter-spacing.

### Shape and space

- Square corners, no drop shadows, no gradients. Separation comes from
  whitespace and the occasional thin rule.
- A spacing scale in tokens. Sections have generous vertical padding that
  reduces on smaller screens.
- Content width caps at about 1320px with side gutters of at least 20px.

### Motion

- Sections fade and rise a few pixels as they enter the viewport, once.
- Images scale to about 1.03 on hover inside a clipped frame.
- Links and buttons have short colour and underline transitions.
- Pages cross-fade using the browser's native view transitions where
  supported. Other browsers navigate normally.
- Everything above is switched off under `prefers-reduced-motion: reduce`.
- Content is visible without JavaScript; the reveal effect only applies once
  the script has loaded.

### Breakpoints

| Range | Homes grid | Gallery grid | Inventory | Navigation |
|---|---|---|---|---|
| under 640px | 1 column | 1 column | stacked | mobile menu |
| 640–1023px | 2 columns | 2 columns | stacked | mobile menu |
| 1024px and up | 3 columns | 2 columns | 2 columns | full bar |

Images keep their aspect ratio at every size using `aspect-ratio` and
`object-fit: cover`. Nothing may cause horizontal scrolling.

## 7. Pages

### Home

1. **Hero:** one full-width image filling the first screen below the header,
   the line "Making Dallas Better, One Home at a Time." (from the current
   site), and two buttons: "View homes" and "See the gallery".
2. **Introduction:** two or three sentences about the company, adapted from
   the current site, with a link to About.
3. **Featured projects:** up to three projects flagged `featured` in the data.
4. **Where we build:** the neighbourhoods named on the current site.
5. **Quote:** "Good design is good business." — Colin Lardner.
6. **Closing band:** a short prompt and a button to Inventory.

### Homes

- A sub-navigation row: All, Available, Lots, Build on Your Lot.
- Cards: 4:3 cover image, name, neighbourhood, a status label in text
  (For Sale, Pending, Coming Soon, Sold), and a line of specs when present.
  The whole card is one link to the detail page.
- Empty state for a category with no entries: one sentence and a button to
  Inventory.
- **Detail page:** cover image, title, status, a spec list, a short
  description, a photo grid that opens the lightbox, and an "Ask about this
  home" button to Inventory.
- **Build on Your Lot:** heading, a short explanation (placeholder until Colin
  supplies it) and a button to Inventory.

### Gallery

- **Index:** a sub-navigation row (Projects, Exterior, Kitchen, Bath, Living)
  and a 2-column grid of projects. Each cover is the front elevation at 3:2
  with the project name below.
- **Project view:** a dark, full-screen page. The project name sits at the
  top, photos follow in one centred column at their natural proportions, and a
  close button (X) stays fixed in the top corner while scrolling. The X, and a
  click on the dark area beside the photos, return to the gallery. If the
  visitor arrived from a room page, they return there.
- **Room pages:** a 2-column grid of 3:2 thumbnails with the project name as a
  caption linking to that project.
- **Lightbox** (shared by project view, room pages, listing detail and
  Inventory):
  - Built on the native `<dialog>` element, which gives focus trapping and
    Escape handling.
  - Closes with the X, a click outside the image, or Escape. Focus returns to
    the thumbnail that opened it.
  - Previous and next buttons, left and right arrow keys, and swipe on touch
    screens move through the current set.
  - Shows a position counter ("3 / 12") and the image caption.
  - Page scrolling is locked while it is open.
  - Controls are at least 44 × 44px.
- The first row of images loads eagerly. Everything below the fold is lazy.

### About

F-pattern, read top-left to right, then down the left edge:

1. **First bar:** page heading, Colin's photo on the left, his name, title and
   biography on the right.
2. **Second bar:** the company description, with its heading at the left edge.
3. **Stem:** values as a left-aligned list, each with a short heading and one
   or two sentences.

Colin's photo is 447 × 447px, so it displays at no more than about 400px wide
to stay sharp.

Copy comes only from lardnercustomhomes.com and lardnergroup.com, rewritten to
be concise and passed through the humanizer skill. Each block in the copy file
records its source. Anything the two sites do not support is a labelled
placeholder.

### Inventory

- **Left column:** heading, a short introduction and the enquiry form.
- **Right column:** a gallery of project photos that stays in view while the
  form scrolls, and opens the lightbox on click.
- Below 1024px the form comes first and the gallery follows.

Form fields:

| Field | Control | Required |
|---|---|---|
| First name | text | yes |
| Last name | text | yes |
| Email | email | yes |
| Phone | tel | yes |
| Tell us what you're looking for | textarea | no |
| Price point | radio group: Under $1M, $1M–$2M, $2M–$3M, $3M+ | yes |
| Are you working with a realtor? | radio group: Yes, No | yes |
| How did you hear about us? | select: Friend or family, Realtor, Instagram, Facebook, Google search, Saw a home or sign, Lardner Group, Other | no |
| Other (please tell us) | text, shown only when "Other" is chosen | no |

Form behaviour:

- Required fields are marked with an asterisk and the word "required", plus a
  note at the top of the form explaining the asterisk.
- Validation runs when a field loses focus and again on submit. Email must be
  a plausible address. Phone must be a 10-digit US number; common formatting
  is accepted.
- Errors appear beside the field as text with an icon, linked with
  `aria-describedby`. On a failed submit, focus moves to the first field with
  an error.
- A hidden honeypot field filters basic spam.
- **States:** idle; sending (button disabled, "Sending…"); success (the form
  is replaced by a confirmation message); error (a message with a retry
  button, plus Colin's email and phone as a fallback).

Delivery:

- The form posts JSON to the address in `PUBLIC_FORM_ENDPOINT`, set in `.env`.
- Until that is set, submitting shows the error state with the text "This form
  isn't connected yet" and Colin's contact details. It never shows a false
  success.
- In local development only, `?formDemo=success` or `?formDemo=error`
  previews each state. This does nothing in the production build.
- The README explains how to connect a form service whose recipient
  (colin@lardnergroup.com) is configured on the service side, so no private
  key appears in browser code.

## 8. Content and data

All content lives in `src/data/`, separate from components.

```ts
// site.ts — phone, email, address, social links, PDF paths, navigation
// copy.ts — page copy, each block with a `source` note or `placeholder: true`

// homes.ts
type Listing = {
  slug: string;
  title: string;
  category: 'available' | 'lot';
  status: 'For Sale' | 'Pending' | 'Coming Soon' | 'Sold';
  neighborhood?: string;
  address?: string;
  price?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  lotSize?: string;
  description?: string;
  cover: string | null;      // file name, or null for a placeholder tile
  photos: Photo[];
  placeholder: boolean;
};

// projects.ts
type Room = 'exterior' | 'kitchen' | 'bath' | 'living' | 'other';
type Photo = { file: string | null; room: Room; alt: string };
type Project = {
  slug: string;
  name: string;
  location?: string;
  cover: string | null;      // front elevation
  photos: Photo[];
  featured: boolean;
  placeholder: boolean;
};
```

- Image files go in `src/assets/projects/<slug>/` and
  `src/assets/homes/<slug>/`. A helper matches file names to optimised images.
- A missing or `null` image renders the placeholder tile instead of a broken
  image.
- Adding a home or project is one new entry plus its photos.

### Placeholders

- **Images:** a Champagne tile at the correct aspect ratio with the text
  "Placeholder — project photo".
- **Text:** shown as `[Placeholder: what is needed]`.
- **Sample data:** six sample listings (four homes, two lots) and four sample
  projects with photos tagged across all room types, so every grid, page and
  lightbox can be seen working. All are named "Sample …" and flagged
  `placeholder: true`.
- `CONTENT-TODO.md` at the project root lists everything Colin needs to
  supply.

## 9. Project structure

```
src/
  assets/        logo, logo mark, Colin's photo, project and home photos
  components/    Header, MobileMenu, Footer, SubNav, ListingCard, ProjectCard,
                 PhotoGrid, Lightbox, Placeholder, Picture, InquiryForm,
                 SocialLinks, Button
  data/          site.ts, copy.ts, homes.ts, projects.ts
  layouts/       BaseLayout.astro, ImmersiveLayout.astro
  lib/           images.ts, validation.ts, format.ts
  scripts/       nav.ts, lightbox.ts, reveal.ts, inquiry-form.ts
  styles/        tokens.css, base.css, components.css
  pages/         routes listed in section 4
public/
  documents/     iabs.pdf, consumer-protection-notice.pdf
  favicon
tests/           validation and data tests
```

Each script module has one job and is loaded only on pages that need it.

## 10. Accessibility

- Semantic landmarks, one `h1` per page, headings in order.
- A "Skip to content" link as the first focusable element.
- A visible focus ring on every interactive element (Midnight outline with an
  offset; white on dark pages).
- Full keyboard operation of navigation, submenus, mobile menu, cards,
  lightbox and form.
- Form controls have visible labels. Radio groups use `fieldset` and `legend`.
- Alt text describes the photo when the subject is known. Placeholder tiles
  carry their label as text.
- Touch targets are at least 44 × 44px.
- Status, errors and required fields never rely on colour alone.

## 11. Performance

- Images are resized, served in modern formats with `srcset` and `sizes`, and
  given explicit dimensions to prevent layout shift.
- Below-the-fold images use `loading="lazy"` and `decoding="async"`. The hero
  image loads with high priority.
- Fonts are self-hosted, subset to Latin, and use `font-display: swap`.
- No JavaScript framework is shipped. Scripts are small and deferred.
- Animations use only `opacity` and `transform`.

## 12. Verification

Automated:

- Unit tests for the validation functions (email, phone, required fields).
- Data tests: unique slugs, no reserved slugs, every photo has alt text and a
  valid room tag.
- `astro check` and `astro build` complete without errors.

Manual, in a browser at 375, 768, 1280 and 1440px wide — every item from the
brief's "Verification Before Completion" list:

- Every page, navigation link and external link works; the logo links home.
- The header hides and shows correctly; the mobile menu works.
- Homes and Gallery grids respond correctly at each width.
- Project view and lightbox open and close by X, outside click and Escape;
  the page behind does not scroll.
- Form validation and the sending, success and error states work.
- No missing images or broken assets; no horizontal overflow.
- Typography, spacing and colours are consistent across pages.
- Keyboard navigation works and focus is always visible.
- No console errors or warnings.

A design-critique pass and an accessibility review follow, and their findings
are fixed before the site is reported complete.

## 13. Out of scope and open items for Colin

- **Hosting and go-live.** Squarespace cannot host a custom-coded site. Going
  live will mean publishing the built site to a static host and pointing the
  existing domain at it. That is a later step.
- **Email delivery.** The form is ready to connect but is not connected.
- **Content Colin needs to supply:** portfolio photos grouped by project with
  room types; current homes and lots with specs; final biography, company
  description and values; Build on Your Lot text; a larger photo of Colin.
- **Confirm:** the public phone number (the brief says 844-527-3637; the
  current site shows 214-282-3144) and whether `trec.pdf` is still needed.
