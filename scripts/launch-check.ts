// Lists anything that should be fixed before the site is published.
// Run with: npm run launch-check
import { existsSync, readFileSync } from 'node:fs';
import { copy } from '../src/data/copy.ts';
import { listings } from '../src/data/homes.ts';
import { projects } from '../src/data/projects.ts';
import { prelaunchProblems } from '../src/lib/prelaunch.ts';

/** The form address from the environment, or from a local .env file if there is one. */
function formEndpoint(): string {
  if (process.env.PUBLIC_FORM_ENDPOINT) return process.env.PUBLIC_FORM_ENDPOINT;
  if (!existsSync('.env')) return '';
  const line = readFileSync('.env', 'utf8')
    .split(/\r?\n/)
    .find((entry) => entry.trim().startsWith('PUBLIC_FORM_ENDPOINT='));
  if (!line) return '';
  return line
    .slice(line.indexOf('=') + 1)
    .trim()
    .replace(/^["']|["']$/g, '');
}

// In holding mode only the holding page is published, so unfinished content cannot go public.
const holding = process.env.SITE_MODE === 'holding';

const problems = holding
  ? []
  : prelaunchProblems({
      listings,
      projects,
      copy,
      heroImage: copy.home.hero.image,
      formEndpoint: formEndpoint(),
    });

if (holding) {
  console.log('Holding mode: only the holding page will be published, so the launch check is skipped.');
} else if (problems.length === 0) {
  console.log('Ready to launch: no sample content, placeholders or missing settings found.');
  if (!formEndpoint()) {
    console.log("Note: the enquiry form is not connected, so the Inventory page shows Colin's phone and email instead.");
  }
} else {
  console.log(`Not ready to launch yet. ${problems.length} thing(s) to fix:\n`);
  for (const problem of problems) console.log(`  - ${problem}`);
  console.log('\nCONTENT-TODO.md has the full list of what Colin needs to supply.');
  process.exitCode = 1;
}
