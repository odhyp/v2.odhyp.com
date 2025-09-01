import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Articles
const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: ({ image }) =>
    z.object({
      draft: z.boolean(),
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date(),
      cover: image().optional(),
      tags: z.array(z.string()).optional(),
      toc: z.boolean().optional(),
    }),
});

export const collections = { articles };
