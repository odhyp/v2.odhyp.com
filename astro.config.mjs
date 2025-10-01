// @ts-check
import { defineConfig } from "astro/config";

// TailwindCSS
import tailwindcss from "@tailwindcss/vite";

// Astro Integration
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// Expressive Code
import astroExpressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

// Rehype
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://odhyp.com",
  devToolbar: {
    enabled: false,
  },
  integrations: [
    astroExpressiveCode({
      themes: "material-theme-darker",
      styleOverrides: {
        codeFontFamily: "Geist Mono, monospace",
        codeFontSize: "0.9rem",
        uiFontFamily: "Geist, sans-serif",
        frames: {},
      },
      plugins: [pluginLineNumbers()],
      defaultProps: {
        // Disable line numbers by default
        showLineNumbers: false,
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
