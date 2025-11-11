import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const writings = await getCollection("writings");
  return rss({
    title: "Odhy Pradhana",
    description:
      "I write about programming and automation, building useful apps, working with data, and exploring technology.",
    site: context.site,
    items: writings.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.updatedDate,
      link: `/${post.id}`,
    })),
  });
}
