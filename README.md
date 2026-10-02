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
| Page text | `src/data/copy.ts` |
| Colours, fonts, spacing | `src/styles/tokens.css` |

### Photos

- Project photos go in `src/assets/projects/<project-slug>/`.
- Home and lot photos go in `src/assets/homes/<listing-slug>/`.
- The home page hero goes in `src/assets/site/`; set its file name at `copy.home.hero.image` and describe it in `copy.home.hero.imageAlt`.
- Use JPG, PNG, WebP or AVIF. Upload the largest version you have; the site resizes and compresses automatically.
- iPhone photos are often HEIC files, which the site cannot use. Export them as JPG first.
- The name in the data must match the file name exactly, including capital letters: `IMG_0001.JPG` is not `img_0001.jpg`.
- If a name does not match a file, the site shows a "Placeholder" tile instead of a broken image. Run `npm test` after adding photos: it lists any name that does not match.
- Cards and cover images crop photos to a fixed shape from the centre, so landscape photos work best there. The project page and the photo viewer show each photo uncropped.
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
6. Send one test enquiry from the live site and confirm it arrives in Colin's inbox.

The site treats any "OK" reply from the form service as sent. Choose a service that replies with an error when delivery fails, so visitors are told when a message did not go through.

Never put a private or secret key in a `PUBLIC_` variable. Anything with that prefix is sent to every visitor's browser.

To preview the form's states without sending anything, run `npm run dev` and open `/inventory/?formDemo=success` or `/inventory/?formDemo=error`. This only works locally.

## Publish

The site is published by GitHub Pages from the `caleboliva/lardnercustomhomes` repository. Every push to the `main` branch rebuilds and republishes it at lardnercustomhomes.com; the steps are in `.github/workflows/deploy.yml`.

**Right now only a holding page is published.** The workflow sets `SITE_MODE: holding`, which builds the single page in `holding/` instead of the full site in `src/`. Visitors see the logo and Colin's contact details; none of the sample content is public.

To launch the full site:

1. Run `npm run launch-check`. It must say "Ready to launch".
2. If the form is connected, add its address on GitHub under Settings > Secrets and variables > Actions > Variables, as `PUBLIC_FORM_ENDPOINT`.
3. Delete the `SITE_MODE: holding` line from `.github/workflows/deploy.yml` and push.

GitHub runs the launch check again before publishing the full site and stops if anything is unfinished, so sample content cannot go live by accident.

To see the holding page locally, build it and preview the result:

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

To regenerate the "L" mark and favicon from the logo: `npm run brand-assets`.

## Troubleshooting

**"An Application Control policy has blocked this file" on Windows.** Windows Smart App Control checks new programs the first time they run, and Astro includes a few. If `npm run dev` or `npm run build` fails with this message, run the command again; it passed on the second attempt when this project was set up. If it keeps failing, it is a Windows security setting on that computer, not a problem with the site.
