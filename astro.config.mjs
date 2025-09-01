// @ts-check
import { defineConfig } from "astro/config";

// Astro Integration
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// TailwindCSS
import tailwindcss from "@tailwindcss/vite";

// Rehype
import rehypeExternalLinks from "rehype-external-links";
import astroExpressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://odhy.netlify.app/", // TODO: update site URL
  integrations: [
    astroExpressiveCode({
      themes: "material-theme-darker",
      styleOverrides: {
        codeFontSize: "0.9rem",
      },
    }),
    mdx(),
    icon(),
    sitemap(),
    partytown(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer", "external"],
        },
      ],
    ],
  },
});
