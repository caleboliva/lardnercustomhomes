# Website audit and improvements, October 2026

Scope: the brief "Lardner Custom Homes: Website Audit and Improvement Brief", applied to the code
in this repository and the live site at https://lardnercustomhomes.com on 22 October 2026.

## How it was checked

- `npm test` (unit tests), `npm run launch-check`, `npm run build` (includes `astro check`).
- A script over every built page in `dist/`: titles, descriptions, canonical links, share images,
  heading order, one `h1`, duplicate ids, image `alt`, `target="_blank"` links, iframe titles,
  structured data that parses, and page weight.
- In the browser (production build served locally) at 390, 768 and 1440px wide, on 14 key pages
  (42 page-and-width combinations): horizontal overflow, text contrast against WCAG AA (4.5:1, or
  3:1 for large text), tap targets under 24 × 24px, and the number of `h1` elements.
- The live domain: HTTP and `www` redirects, trailing-slash redirects, `robots.txt`, `sitemap.xml`,
  and the GitHub Pages settings (read only).
- Journeys clicked through: listing → enquiry, Build on Your Lot → enquiry, home page → each path.

Not measured: Core Web Vitals from real visitors (needs field data, for example PageSpeed Insights
or Search Console after launch). The browser here cannot run Lighthouse reliably, so performance
was judged from page weight, image loading and the build output instead.

## Baseline (before)

| Area | Result |
|---|---|
| Build health | 99 tests pass, launch check clean, 0 type errors, 26 pages build |
| Overflow, contrast, tap targets | No problems at 390, 768 or 1440px (contrast checked against the colours actually used; muted text is 5.6:1 on honeydew and 4.7:1 on champagne) |
| Headings | One `h1` per page, no skipped levels |
| SEO tags | Unique title and description on every page, canonical links, share image, valid structured data, sitemap and robots.txt |
| Redirects | `www` → bare domain (301) and missing trailing slash → slash (301) work |
| HTTPS | **Not enforced**: `http://lardnercustomhomes.com/` serves the site with no redirect; GitHub Pages reports `https_enforced: false` |
| Images | Responsive `srcset`, WebP, lazy below the fold, the home page photo loads with high priority |
| Fonts | Latin subsets only (Jost 27 kB, Cormorant 38 kB); `font-display: swap`; not preloaded |

## Findings

| # | Severity | Finding | Status |
|---|---|---|---|
| 1 | High | HTTPS not enforced: visitors on `http://` are not redirected | Verified. Needs the "Enforce HTTPS" box in GitHub → Settings → Pages (not a code change) |
| 2 | High | Build on Your Lot was a dead end: a heading, one sentence and a button (about 25 words), for one of the three main ways customers come to Lardner | Verified. Fixed |
| 3 | Medium | "Ask about this home/lot" opened the Inventory page at the exclusive-access banner, with nothing showing which home it was about | Verified. Fixed |
| 4 | Medium | The home page did not separate the three journeys (buy a home, buy a lot, build on your own lot) | Verified. Fixed |
| 5 | Medium | Project pages showed no context, though location, architect and press coverage are published for three of them, and 4103 Saranac's page did not link to its listing | Verified. Fixed |
| 6 | Low | Share previews had no image description (`og:image:alt`) | Verified. Fixed |
| 7 | Low | The two main fonts were found only after the stylesheet loaded | Verified. Preloaded (same files as the stylesheet, so nothing downloads twice) |
| 8 | Low | Two unused placeholder images were copied into every build | Verified. Removed; the script that makes them now writes only to listing folders |
| 9 | Low | No link to Colin's brokerage outside the Inventory page | Fixed: footer link on every page |
| — | Info | Reported "images without width/height": the hidden photo viewer and the slideshow photos | Checked: not a layout-shift risk (fixed-size containers) |
| — | Info | Old Squarespace addresses may now return 404 | Needs testing: the Internet Archive was unavailable during the audit. Check Search Console's "Not found" report after verifying the site |

## What changed

| Area | Files |
|---|---|
| Home page: "Start here" section with three paths and live counts ("1 home for sale", "6 lots available") | `src/components/PathCards.astro`, `src/pages/index.astro`, `src/data/copy.ts` (`home.paths`), `src/lib/content.ts` (`openListingCounts`) |
| Build on Your Lot: why build with Lardner, no lot yet, recent custom homes, a closing call to action | `src/pages/homes/build-on-your-lot.astro`, `src/data/copy.ts` (`homes.buildOnYourLot`) |
| Enquiry journeys: links land on the form, tick what the visitor came for and name the listing in the heading | `src/lib/validation.ts` (`signupHref`, `interestForParam`), `src/scripts/inquiry-form.ts`, `src/pages/inventory.astro`, `src/pages/homes/[slug].astro`, `src/pages/index.astro` |
| Project pages: location, architect, press coverage, link to the listing | `src/pages/gallery/[slug].astro`, `src/data/projects.ts`, `src/data/types.ts`, `src/data/copy.ts` (`gallery`) |
| Head: `og:image:alt`, font preloads | `src/layouts/BaseLayout.astro`, `src/pages/homes/[slug].astro`, `src/pages/gallery/[slug].astro` |
| Footer: Lardner Group link | `src/components/Footer.astro`, `src/data/site.ts` |
| Clean-up | `src/assets/site/lot-plan.png` and `home-plan.png` removed; `scripts/make-placeholder-art.mjs` |
| Tests | `tests/validation.test.ts`, `tests/content.test.ts`, `tests/data.test.ts` |

Every new statement comes from a source already in the project: Colin's licences (About page), the
company description, Texas Architect (FAR + DANG designed Ascend at Burlew and Scurry, Old East
Dallas), Candy's Dirt (3880 Durango, Midway Hollow) and Colin's April 2026 flyer for 4103 Saranac
(Midway Hollow; architect Far+Dang; 2x6 framing, engineered slab on piers, full foam
encapsulation). Nothing about prices, availability, awards or reviews was added.

## Before and after

| Measure | Before | After |
|---|---|---|
| Unit tests | 99 pass | 102 pass |
| Type errors / build | 0 / 26 pages | 0 / 26 pages |
| Overflow, contrast and tap-target problems (42 page-and-width checks) | 0 | 0 |
| Build on Your Lot, words of content | about 25 | 189 |
| Clicks from a lot's page to a ready, labelled enquiry | 1 click, then scroll past the banner; no sign of which lot | 1 click; lands on the form, "Ask about 6616 Deloache", "Lots" ticked |
| Home page HTML / CSS | 30 kB / 31 kB | 34 kB / 33 kB |
| Images loaded with the home page (before scrolling) | 4 | 4 (the three new photos load lazily) |
| Other pages | | +1 kB HTML each (preload tags, image description, footer link) |
| Unused images in the build | 2 | 0 |

## Deliberately not changed

- **The opening slideshow and hidden headline.** The brief asks for the Dallas focus to be clear
  immediately; the slideshow-first opening was requested by the owner. The page title, the
  headline after the first scroll and the new "Start here" section carry the message instead.
- **Navigation labels.** "Inventory" overlaps with "Homes" in meaning, but it is Colin's chosen
  name for the exclusive-access page. Worth revisiting with him (see below).
- **Brand, palette and typography.** Already consistent across routes; no new identity.
- **Image file names.** Names like `01-exterior.jpg` are not descriptive, but every photo has
  specific alt text, and renaming over 200 files would churn the repository for little gain.
- **Conversion tracking.** The site has no analytics, so there is nothing to attach it to.

## Needs a person

1. Turn on **Enforce HTTPS** in GitHub → Settings → Pages.
2. Create the **Web3Forms access key** with colin@lardnergroup.com so sign-ups reach Colin
   directly (until then the form opens the visitor's email app). Then send a test sign-up.
3. **Search Console**: verify the site, submit the sitemap, and watch "Not found" for old addresses.
4. Colin's own words for **Build on Your Lot** (`copy.homes.buildOnYourLot.body`), the lots'
   planned homes, and the neighborhoods (`src/data/neighborhoods.ts`).
5. Check field performance in PageSpeed Insights once there is traffic.

## Next phase, by business impact

1. Connect Web3Forms (or Lardner Group's Luxury Presence lead inbox) so every enquiry is captured.
2. Enforce HTTPS and set up Search Console and a Google Business Profile.
3. Add Colin's text for Build on Your Lot, each lot's planned home and each neighborhood: these
   pages rank and convert on specifics.
4. Full-size photos for the remaining 20 small 4103 Saranac images.
5. Decide with Colin whether the menu should say "Get access" or "Contact" instead of "Inventory".
6. Privacy-friendly analytics (for example Plausible or Cloudflare Web Analytics) to measure the
   paths and enquiries added here.
