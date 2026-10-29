# Content still needed

The site is live with real projects, lots and Colin's details. These items are still open.

## Photos

- [ ] **Two lot drawings to redo**: Caleb is redrawing two of the lot drawings by hand. Save each new drawing as `lot-drawing.jpg` in that lot's folder under `src/assets/homes/`, replacing the old one.
- [ ] **6616 Deloache, lot drawing**: the other five lots show their lot drawing. No drawing was supplied for 6616 Deloache, so its page shows the concept renderings of the planned home, labelled as renderings. Add a drawing as `lot-drawing.jpg` in `src/assets/homes/6616-deloache/` if one is made.
- [ ] **Not used from the second upload**: the mood boards (they contain other people's inspiration photos and paint brand names), one closet photo that shows a company's shopping bag, and loose photos of other projects. The new headshot of Colin is listed below.
- [ ] **More projects**: the gallery shows a selection of photos for 4103 Saranac, Durango Drive, Eagles Landing, Eaton Drive, Moser Avenue, Scurry Street and the Purple Sage Road remodel. Add more projects and photos as they come in. Sold homes are named by street only, never the house number (Colin, October 2026).
- [ ] **Project locations**: Eagles Landing, Eaton Drive, Moser Avenue and Purple Sage Road show no neighborhood yet. Add `location` in `src/data/projects.ts` once confirmed.
- [ ] **Colin's portrait**: the current file is 447 × 447px. The second upload includes a large new headshot (orange shirt, in a kitchen), the same one used on the 4103 Saranac flyer. Say the word and it replaces the portrait on the About page.

## Photo rights

- [ ] The project photos were taken by professional photographers (Bradley Evans for Eaton Drive, Robert Tsai for Moser Avenue, Robert Yu for Scurry Street, Shoot2sell.com for the home page's dusk photo of 4103 Saranac, and others). Since October 2026 every 4103 Saranac listing and gallery photo is Robert Tsai's (April 2026 shoot), credited on those pages as "Photography: Robert Tsai". Their names and copyright notices were removed from the files along with all other embedded data. Confirm that Colin's agreements with them allow use on the website, and whether any of them require a photo credit.

## Listings

- [ ] **301 Thompson lot size**: the lot is irregular and the spreadsheet gives only 95 × 131 ft, so the site shows "Approx. 12,400 sq ft" (95 × 131, rounded). Replace it with the surveyed area.
- [ ] **Lot sizes**: for the rectangular lots the area is frontage × depth from the spreadsheet (6616 Deloache 10,500 sq ft, 3632 Duchess Trail 10,000 sq ft, 9911 Hurley Way 12,320 sq ft). Confirm against the surveys.
- [ ] **6616 Deloache renderings**: the four images are concept renderings made with AI. They are labelled "Concept rendering" on the site. Confirm Colin is happy to show them.
- [ ] **Lot prices**: every lot shows "Contact for pricing", because the spreadsheet's prices appear to include a finished house. Add a lot's own price in `src/data/homes.ts` once Colin confirms it.
- [ ] **Project stages** (Bidding, Demolition, Leasing, Design) from the spreadsheet are not shown on the site. Add them if Colin wants them public.
- [ ] **Descriptions**: none of the lots has a description yet.

## Text

- [ ] **Neighborhood descriptions**: a few paragraphs each for Midway Hollow, Preston Hollow, Richardson Heights, Sparkman Estates and East Village Dallas, in `src/data/neighborhoods.ts`. They appear on every home and lot in that neighborhood.
- [ ] **Planned home descriptions**: a short description of the home planned for each lot, as `description` on that lot in `src/data/homes.ts`. It appears under "The planned home".
- [ ] **Services wording** (About page): written from the Residential Property Management and Builder Services pages on lardnergroup.com. Confirm Colin is happy with how "Luxury management", "Brokerage" and "Development" are described.
- [ ] **Inventory wording**: the page promises "first access to Lardner homes and lots, including upcoming projects before they come to market". Confirm Colin is comfortable making that promise.
- [ ] **Press**: the five articles come from the Press & Media page on lardnergroup.com. Add any newer coverage to `src/data/press.ts`.
- [ ] **Build on Your Lot**: a few sentences on how it works (`copy.homes.buildOnYourLot.body`).
- [ ] **Biography**: confirm the three paragraphs, adapted from lardnercustomhomes.com/about and lardnergroup.com. They name Colin's wife and daughter because the old site did; remove that sentence if he prefers.
- [ ] **Company description and values**: confirm the wording, adapted from the old site.
- [ ] **Neighborhood list** on the home page: confirm it is current.

## Details to confirm

- [ ] **Phone number**: the site uses (844) 527-3637. The old site showed 214-282-3144.
- [ ] **Facebook link**: `https://www.facebook.com/dallashomesforsale` shows "This content isn't available right now" to visitors who are not logged in to Facebook. Confirm the page is public, or supply the correct address.
- [ ] **Job title**: shown as "CEO", as on the old site.

## To do

- [ ] **Google Search Console**: add and verify lardnercustomhomes.com, then submit `https://lardnercustomhomes.com/sitemap.xml` (see "Search engines" in the README). Colin signs in with his own Google account.
- [ ] **Google Business Profile**: claim or create the "Lardner Custom Homes" profile (category "Custom home builder"), with the same phone number as the site. This is what local searches use.
- [ ] **Search keywords**: review the phrases in `src/data/seo.ts`. They lean on Midway Hollow, modern homes, available lots and building on a client's lot. Add a neighborhood only if Lardner works there.
- [ ] **Connect the sign-up form** (see "Connect the Inventory form" in the README for the options). Until then, signing up opens the visitor's email app with their details written out to Colin.
