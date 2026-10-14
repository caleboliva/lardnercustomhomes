# Lardner Custom Homes website

The website for Lardner Custom Homes: Home, Homes, Gallery, About and Inventory.
Built with [Astro](https://astro.build). The output is plain HTML, CSS and a small amount of JavaScript.

## Run it

You need [Node.js](https://nodejs.org) 22.18 or newer (the current LTS release is fine).

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
| `npm test` | Runs the unit tests and lists photo names that do not match a file |
| `npm run launch-check` | Lists sample content, placeholders and missing settings that block launch |
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
| Page text, including the About page services and the Inventory sign-up | `src/data/copy.ts` |
| Press coverage (About page and the home page's "As featured in" line) | `src/data/press.ts` |
| A few paragraphs about each neighborhood, shown on its homes and lots | `src/data/neighborhoods.ts` |
| Search titles, descriptions and keywords (SEO) | `src/data/seo.ts` (notes at the top of the file) |
| Colours, fonts, spacing | `src/styles/tokens.css` |

### Photos

- Project photos go in `src/assets/projects/<project-slug>/`.
- Home and lot photos go in `src/assets/homes/<listing-slug>/`.
- The home page opens with a slideshow. Its photos go in `src/assets/site/` and are listed, in order, at `copy.home.hero.slides` in `src/data/copy.ts`. Each slide has the file name, a description (`alt`), the part of the photo to keep in view when a screen crops it (`position`: `'center'`, or across then down, such as `'60% 18%'`), and the small link shown under it (`label` and `href`). Use photos at least 2000px wide. The first slide is also the picture shown when the site is shared.
- Use JPG, PNG, WebP or AVIF. Upload the largest version you have; the site resizes and compresses automatically.
- iPhone photos are often HEIC files, which the site cannot use. Export them as JPG first.
- The name in the data must match the file name exactly, including capital letters: `IMG_0001.JPG` is not `img_0001.jpg`.
- If a name does not match a file, the site shows a "Placeholder" tile instead of a broken image. Run `npm test` after adding photos: it lists any name that does not match.
- Cards and cover images crop photos to a fixed shape from the centre, so landscape photos work best there. The project page and the photo viewer show each photo uncropped.
- Each photo's `room` decides which Gallery room page it also appears on.
- A lot drawing goes in the lot's folder as `lot-drawing.jpg`, with the lot's `cover` set to that name. A square or tall cover is shown whole beside the lot's details instead of being cropped to a banner.
- A listing with an `address` gets a Location section: a map with a pin and a link that opens Google Maps.
- On a lot's page, the lot's `description` appears under "The planned home". Text about the neighborhood comes from `src/data/neighborhoods.ts` and appears on every home and lot in it. In the local preview, outlined boxes show where text can still be added; they never appear on the live site.
- Write `alt` text that describes the photo for someone who cannot see it.

### Placeholders

Text that reads `[Placeholder: …]` with a blue highlight, and tiles labelled "Placeholder", mark content that still has to be supplied. `CONTENT-TODO.md` lists all of it.

## Search engines (SEO)

Each page carries a search title, a description, keywords, a share picture and structured data (the company's details, and each home's or lot's address, size and price). Homes, lots and projects write theirs from their own details, so adding one needs nothing extra. The fixed pages take theirs from `src/data/seo.ts`.

The site also publishes `/sitemap.xml` and `/robots.txt`, rebuilt on every publish.

Two jobs happen outside the site and matter as much as anything in it:

1. **Google Search Console** (search.google.com/search-console): add lardnercustomhomes.com, verify it, and submit `https://lardnercustomhomes.com/sitemap.xml`. This is how Google is told about new pages.
2. **Google Business Profile** (business.google.com): claim or create the "Lardner Custom Homes" profile with the category "Custom home builder", the same phone number as the site, the service areas and photos. Local searches such as "custom home builder near me" are answered from these profiles.

## Connect the Inventory form

The Inventory page is a sign-up for early access to homes and lots. Until a form service is connected, pressing "Sign up" opens the visitor's own email app with their details written out to Colin, ready to send. Nothing passes through a third party, but it relies on the visitor having an email app and pressing send, so connecting a service is better.

A static site cannot receive form entries by itself; something has to accept them. Options, simplest first:

- **Web3Forms or Formspree**: each sign-up arrives in Colin's inbox. Free tiers cover a small site. Set up as below; nothing else changes.
- **Lardner Group's own lead system**: lardnergroup.com runs on Luxury Presence, which captures leads for agents. Ask them whether sign-ups from this site can go into the same lead inbox or CRM, so every lead is in one place.
- **A CRM with tickets, such as HubSpot (free plan)**: each sign-up becomes a contact Colin can track and follow up. HubSpot's forms can accept entries posted from another site.
- **A small function of your own** (for example a free Cloudflare Worker) that turns each sign-up into an email or a GitHub issue. This avoids a form company, but someone has to look after it.

To connect a form service:

1. Create an account with a form service that forwards submissions to email (for example Formspree or Web3Forms) and set the recipient to colin@lardnergroup.com in that service.
2. Copy `.env.example` to `.env`.
3. Set `PUBLIC_FORM_ENDPOINT` to the address the service gives you.
4. If the service needs a key in the message and that key is designed to be public, set `PUBLIC_FORM_ACCESS_KEY`.
5. On the hosting provider, set the same variables, then rebuild.
6. Send one test enquiry from the live site and confirm it arrives in Colin's inbox.

The site treats any "OK" reply from the form service as sent. Choose a service that replies with an error when delivery fails, so visitors are told when a message did not go through.

Never put a private or secret key in a `PUBLIC_` variable. Anything with that prefix is sent to every visitor's browser.

To preview the form's states without sending anything, run `npm run dev` and open `/inventory/?formDemo=success` or `/inventory/?formDemo=error`. This only works locally.

## Publish

The site is published by GitHub Pages from the `caleboliva/lardnercustomhomes` repository. Every push to the `main` branch rebuilds and republishes it at lardnercustomhomes.com; the steps are in `.github/workflows/deploy.yml`.

**The full site is live.** Before publishing, GitHub runs `npm run launch-check` and stops if any sample entry or placeholder text has crept back in, so unfinished content cannot go live by accident.

Until a form service is connected, the Inventory page shows Colin's phone and email instead of the enquiry form. Once it is connected, add its address on GitHub under Settings > Secrets and variables > Actions > Variables, as `PUBLIC_FORM_ENDPOINT`, and push any change to republish.

A simple holding page (logo and contact details only) is kept in `holding/`. To publish it instead of the full site, add `SITE_MODE: holding` under `env:` in `.github/workflows/deploy.yml` and push. To see it locally, build it and preview the result:

```bash
SITE_MODE=holding npm run build
```

```bash
npm run preview
```

`HANDOFF.md` walks through the whole launch in order.

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

To regenerate the "L" mark, the favicon and the light logo used over the home page slideshow: `npm run brand-assets`.

## Troubleshooting

**"An Application Control policy has blocked this file" on Windows.** Windows Smart App Control checks new programs the first time they run, and Astro includes a few. If `npm run dev` or `npm run build` fails with this message, run the command again; it passed on the second attempt when this project was set up. If it keeps failing, it is a Windows security setting on that computer, not a problem with the site.
