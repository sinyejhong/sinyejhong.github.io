// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Alias /sitemap.xml -> /sitemap-index.xml so crawlers/tools that probe the
// conventional /sitemap.xml path still get a valid sitemap (Astro emits
// sitemap-index.xml by default). Runs after the sitemap integration.
function sitemapAlias() {
  return {
    name: 'sitemap-alias',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const from = new URL('sitemap-index.xml', dir);
        const to = new URL('sitemap.xml', dir);
        if (fs.existsSync(from)) {
          fs.copyFileSync(from, to);
          logger.info('Created sitemap.xml alias -> sitemap-index.xml');
        } else {
          logger.warn('sitemap-index.xml not found; skipped sitemap.xml alias');
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://sinyejhong.github.io',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react(), sitemap(), sitemapAlias()]
});