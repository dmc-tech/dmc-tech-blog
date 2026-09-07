// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// -----------------------------------------------------------------------------
// IMPORTANT: replace `https://example.com` below with your real custom domain
// once you've decided on it (e.g. https://blog.dmc.tech). This value is used to
// generate absolute URLs for the sitemap, RSS feed, and canonical <link> tags.
//
// Because the site is served from the ROOT of a custom domain, no `base` is
// needed. If you ever fall back to a project page (dmc-tech.github.io/dmc-tech-blog)
// you would add `base: '/dmc-tech-blog'` here and remove public/CNAME.
// -----------------------------------------------------------------------------
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
