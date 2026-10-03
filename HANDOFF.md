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

1. Get the project onto his computer and unzip it somewhere simple, such as `Documents\lardner-custom-homes`. Either sign in to GitHub, open the `caleboliva/lardnercustomhomes` repository and choose Code > Download ZIP (this is always the latest version), or copy `lardner-custom-homes.zip` over. Avoid a folder that syncs to OneDrive or iCloud.
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

The site is live at lardnercustomhomes.com. GitHub Pages republishes it from the `caleboliva/lardnercustomhomes` repository on every push to `main`, so publishing an update is:

1. Run `npm test`, `npm run launch-check` and `npm run build`, and look through the changed pages in the local preview.
2. Commit and push (ask Claude to do it). GitHub re-runs the launch check, then publishes.
3. Open lardnercustomhomes.com a few minutes later and check the changed pages.

To connect the form, add its address on GitHub (Settings > Secrets and variables > Actions > Variables, named `PUBLIC_FORM_ENDPOINT`) and push any change.

### Take care with the domain

- **The domain's DNS is managed at Squarespace and already points at GitHub.** It needs no further changes.
- **Leave any email records (MX) alone.** Changing them stops email on that domain.
- **The domain registration is still with Squarespace.** If Colin cancels the old Squarespace website plan, he must keep the domain registration itself.

## 6. After launch

- Send one more test enquiry from the live site.
- Open the site on a phone.
- Check the two footer documents and both social links open.
