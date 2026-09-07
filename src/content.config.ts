import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// A single "blog" collection backed by Markdown/MDX files in src/content/blog/.
// The frontmatter of every post is validated against this schema at build time,
// so a typo in a date or a missing title fails the build instead of shipping.
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // The function form gives the schema access to `image()`, which turns a
  // relative path in frontmatter into a processed, optimised image asset.
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      // Optional hero image. Path is relative to the Markdown file, e.g.
      //   heroImage: './images/1/azure-local-lab-hero.png'
      heroImage: image().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
