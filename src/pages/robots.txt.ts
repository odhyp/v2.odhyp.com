import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `\
# 1999
# here i'm alive
# everything all of the time

User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL));
};
