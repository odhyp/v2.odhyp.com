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

// Notes
const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    toc: z.boolean().optional(),
  }),
});

// Journals
const journals = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/journals" }),
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
  }),
});

// Logs
const logs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/logs" }),
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
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
    }),
});

export const collections = { articles, notes, journals, logs, projects };
