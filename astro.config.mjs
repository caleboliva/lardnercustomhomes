import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lardnercustomhomes.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
