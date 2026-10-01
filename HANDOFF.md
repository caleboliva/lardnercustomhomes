# Finishing the site on Colin's computer

The site is built. Three jobs remain: add the real content, connect the enquiry form, and publish. This page walks through them in order.

## Before the visit

Ask Colin to have these ready. It saves most of the time on the day.

- **Photos sorted into one folder per project**, with the front-of-house photo easy to spot. That photo becomes the project's cover.
- **A list of homes and lots to show**: name or address, neighborhood, status (For Sale, Pending, Coming Soon, Sold), price, beds, baths, square feet or lot size, and a sentence or two about each.
- **One wide photo for the home page**, at least 2400 pixels across.
- **A few sentences on how "Build on Your Lot" works.**
- **His logins** for wherever the lardnercustomhomes.com domain is managed and for Squarespace. He types these himself; Claude does not handle passwords.

`CONTENT-TODO.md` has the complete list, including details to confirm (phone number, job title, the Facebook link).

## 1. Set up on Colin's computer

1. Copy `lardner-custom-homes.zip` to his computer and unzip it somewhere simple, such as `Documents\lardner-custom-homes`. Avoid a folder that syncs to OneDrive or iCloud.
2. Install Node.js from https://nodejs.org (the LTS version). This is a one-time step.
3. Open the Claude desktop app, go to the Code tab, and open the unzipped folder.

Either Claude account works. The project carries its own instructions (`CLAUDE.md`), so Claude on Colin's account knows the project as soon as the folder is open.

## 2. Start with this prompt

Paste this into Claude:

> This is the Lardner Custom Homes website. Read CLAUDE.md, HANDOFF.md, CONTENT-TODO.md and README.md. Run `npm install`, then start the local preview and open it. Then run `npm run launch-check` and take me through what it lists, one item at a time: ask me for each piece of content, put it in the right place, and show me the result in the preview. Do not invent anything. If I don't have something yet, leave the placeholder.

## 3. Add the content

Work through it with Claude. Useful things to say:

- "The photos for the project called *Name* are in *folder*. Create the project, use the front elevation as the cover, look at each photo to write its description, and tell me which room you think each one is so I can confirm."
- "Add a home: *address, neighborhood, status, price, beds, baths, square feet*. Its photos are in *folder*."
- "Change the About text to this: …"
- "Delete the sample entries now that the real ones are in."

After each batch, look at the preview on both a wide window and a narrow one.

## 4. Connect the enquiry form

The form shows "not connected" until this is done.

1. Colin creates an account with a form service that forwards submissions by email (for example Formspree or Web3Forms) and sets the recipient to colin@lardnergroup.com.
2. Tell Claude the address the service gives you. Claude puts it in a `.env` file.
3. Send a test enquiry from the preview and confirm it arrives in Colin's inbox.

Details are in the README under "Connect the Inventory form".

## 5. Check, then publish

1. Run `npm run launch-check`. It must say "Ready to launch". It lists any sample entry, placeholder or missing setting that is left.
2. Run `npm test` and `npm run build`. The finished site is the `dist` folder.
3. Publish `dist` to a static host (for example Netlify or Cloudflare Pages). Colin creates the account. Set the form address there too, as described in the README.
4. Open the host's temporary address and check every page before touching the domain.
5. Point lardnercustomhomes.com at the new host, following the host's instructions for a custom domain.

### Take care with the domain

- **Squarespace cannot host this site.** The domain has to point at the new host.
- **Change only the website records** (the ones for the bare domain and `www`). Leave any email records (MX) exactly as they are, or email on that domain will stop.
- **Do not cancel anything at Squarespace until the new site is live on the domain** and checked. If the domain itself is registered through Squarespace, cancel only the website plan and keep the domain registration.
- DNS changes can take from a few minutes to a day to reach everyone.

## 6. After launch

- Send one more test enquiry from the live site.
- Open the site on a phone.
- Check the two footer documents and both social links open.
