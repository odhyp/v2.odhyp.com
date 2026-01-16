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
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";

// Rehype
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://v2.odhyp.com",
  devToolbar: {
    enabled: false,
  },
  integrations: [
    astroExpressiveCode({
      themes: "material-theme-darker",
      styleOverrides: {
        codeFontFamily: "Geist Mono, monospace",
        uiFontFamily: "Geist, sans-serif",
        borderColor: "#343331", // ui-2
        frames: {
          editorBackground: "#100f0f", // bg
          editorActiveTabBackground: "#282726", // ui
          editorActiveTabIndicatorBottomColor: "#cecdc3", // tx
          editorTabBarBackground: "#1c1b1a", // bg-2
          editorTabBarBorderColor: "#343331", // ui-2
          editorTabBarBorderBottomColor: "#343331", // ui-2
          terminalBackground: "#100f0f", // bg
          terminalTitlebarBackground: "#282726", // ui
        },
      },
      plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
      defaultProps: {
        // Disable line numbers by default
        showLineNumbers: false,

        // Change the default style of ExpressiveCode collapsible section plugin
        collapseStyle: "collapsible-auto",
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
