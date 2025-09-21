import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Writings
const writings = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writings" }),
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

// Projects
const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
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
      version: z.string().optional(),
    }),
});

// Photos
const photos = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/photos" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = {
  writings,
  projects,
  photos,
};
