#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// __dirname workaround for ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const collections = {
  articles: "./src/content/articles",
  notes: "./src/content/notes",
  journals: "./src/content/journals",
  logs: "./src/content/logs",
  projects: "./src/content/projects",
};

// Get Jakarta time ISO string with offset
function getJakartaTime() {
  const now = new Date();
  const offsetMs = 7 * 60 * 60 * 1000; // UTC+7
  const jakarta = new Date(now.getTime() + offsetMs);
  return jakarta.toISOString().slice(0, 19) + "+07:00";
}

// Slugify title
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "collection",
      message: "Which collection?",
      choices: Object.keys(collections),
    },
    {
      type: "input",
      name: "title",
      message: "Title:",
      validate: (input) =>
        input.trim() !== "" ? true : "Title cannot be empty",
    },
    {
      type: "input",
      name: "description",
      message: "Description:",
      validate: (input) =>
        input.trim() !== "" ? true : "Description cannot be empty",
    },
  ]);

  const { collection, title, description } = answers;
  const slug = slugify(title);
  const filename = `${slug}.mdx`;
  const filepath = path.join(
    __dirname,
    "..",
    collections[collection],
    filename,
  );

  const now = getJakartaTime();

  // Common frontmatter
  let frontmatter = `---
draft: true
title: "${title}"
description: "${description}"
pubDate: ${now}
updatedDate: ${now}
`;

  // Collection-specific optional fields
  if (["articles", "notes", "projects"].includes(collection)) {
    frontmatter += `tags: []
toc: false
`;
  }
  if (["articles", "projects"].includes(collection)) {
    frontmatter += `cover: "https://placehold.co/1200x675"
`;
  }

  frontmatter += "---\n\nWrite your content here...\n";

  // Write file
  await fs.writeFile(filepath, frontmatter, "utf8");
  console.log(`✅ Created: ${filepath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
