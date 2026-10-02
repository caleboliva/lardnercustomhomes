# Lardner Custom Homes website

A static Astro site for Lardner Custom Homes, a Dallas custom home builder owned by Colin Lardner. The site is built and verified; what remains is real content, connecting the enquiry form, and publishing.

Read these first:

- `HANDOFF.md`: the remaining steps to launch, in order.
- `CONTENT-TODO.md`: every piece of content Colin still needs to supply or confirm.
- `README.md`: how to run the site, add content, connect the form and publish.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Run once after copying the project to a new computer |
| `npm run dev` | Local preview at http://localhost:4321 |
| `npm test` | Unit tests. Also lists any photo name in the data that does not match a file |
| `npm run launch-check` | Lists sample content, placeholders and missing settings that block launch |
| `npm run build` | Type-checks and builds the finished site into `dist/` |

On Windows, if a command fails with "An Application Control policy has blocked this file", run it again. It is a one-time Smart App Control check.

If the Browser pane's preview will not start on a Mac, change `runtimeExecutable` in `.claude/launch.json` to `npm`.

## Publishing

- The site is published by GitHub Pages from `caleboliva/lardnercustomhomes` (remote `origin`). Every push to `main` deploys to lardnercustomhomes.com through `.github/workflows/deploy.yml`.
- **The live domain currently shows only a holding page.** The workflow sets `SITE_MODE: holding`, which builds `holding/` instead of `src/`. Do not remove that line unless the user asks to launch.
- Launching means: `npm run launch-check` says "Ready to launch", then delete the `SITE_MODE: holding` line and push. The workflow re-runs the launch check and refuses to publish the full site while anything is unfinished.
- A push is a public deployment. Confirm with the user before pushing.

## Rules

- **Never invent facts** about the company, Colin, homes, prices, specs or projects. Use what Colin provides. Where something is missing, use `placeholder('what is needed')` from `src/lib/format.ts`.
- **Content lives in `src/data/`**: `site.ts` (contact details), `navigation.ts`, `homes.ts`, `projects.ts`, `copy.ts`. Change content there, not in components. `homes.ts` and `projects.ts` start with instructions and an example entry.
- **Photos** go in `src/assets/projects/<slug>/`, `src/assets/homes/<slug>/` and `src/assets/site/`. Names in the data must match file names exactly, including capital letters. JPG, PNG, WebP or AVIF only; convert HEIC first. Every photo needs `alt` text describing it and a `room` (`exterior`, `kitchen`, `bath`, `living` or `other`).
- **Delete the "Sample" entries** as real ones replace them. Sample entries have `placeholder: true`; real entries have `placeholder: false`.
- **The palette is fixed**: Honeydew `#F0FFF0`, Champagne `#F7E6CA`, Powder Blue `#B8E3E9`, Midnight Blue `#272757`, plus `#12122B` and white. Text is Midnight Blue, or white on dark. Champagne is never a text colour. Colours, fonts and spacing are tokens in `src/styles/tokens.css`.
- **No new dependencies** and no UI framework without asking.
- **The form must never show success** unless the form service confirmed delivery. Never put a private or secret key in a `PUBLIC_` variable.
- Relative TypeScript imports include the `.ts` extension, and type-only imports use `import type`. The tests rely on this.
- Astro 7 removes whitespace between elements that sit on separate lines. Keep inline text and its inline elements on one line, or add `{' '}`.
- **Before saying work is done**: `npm test` and `npm run build` must pass, and the changed page must be checked in a browser at phone and desktop widths.

## Where things are

```
src/data/        content
src/lib/         logic, unit-tested in tests/
src/scripts/     browser behaviour: navigation, lightbox, scroll reveal, form
src/components/  reusable page pieces
src/layouts/     the page shell
src/pages/       one file per address
src/styles/      design tokens and shared styles
public/          files served as-is (PDFs, favicon)
docs/            the design spec and the plan the site was built from
```
