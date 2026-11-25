// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';

import tailwindcss from '@tailwindcss/vite';
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
    plugins: [tailwindcss()],
    build: {
      // NewsCarousel's client script (about 5 KB, no imports) is inlined instead of being emitted
      // as a separate module: an external module in the middle of the page delays every script
      // after it (hero, mobile menu) until it has downloaded. Everything else keeps Vite's default.
      // The component is used on the home page only; if another page starts using it, an external
      // (cacheable) file may be the better trade-off again.
      assetsInlineLimit: (filePath) =>
        /(?:^|\/)NewsCarousel\.astro_astro_type_script_index_0_lang\.[\w-]+\.js$/.test(filePath)
          ? true
          : undefined,
    },
  },
  integrations: [sitemap(), sitemapAlias()]
});