import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const articles = await getCollection("articles");
  return rss({
    title: "Odhy Pradhana",
    description:
      "Thoughts and lessons on programming, web development, and the things I learn along the way.",
    site: context.site,
    items: articles.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.updatedDate,
      link: `/articles/${post.id}/`,
    })),
  });
}
