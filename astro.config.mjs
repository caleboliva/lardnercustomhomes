import { defineConfig } from 'astro/config';

// SITE_MODE=holding builds only the temporary holding page in ./holding instead of the
// full site in ./src. The deploy workflow sets it until the site is ready to launch.
const holding = process.env.SITE_MODE === 'holding';

export default defineConfig({
  site: 'https://lardnercustomhomes.com',
  srcDir: holding ? './holding' : './src',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
