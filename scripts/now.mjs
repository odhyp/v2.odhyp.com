#!/usr/bin/env node

import { execSync } from "child_process";

// Get current time in Jakarta timezone
const now = new Date();
const formatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Jakarta",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

// Format parts
const parts = formatter.formatToParts(now).reduce((acc, part) => {
  if (part.type !== "literal") acc[part.type] = part.value;
  return acc;
}, {});

// Build string like 2025-09-10T14:00:00+07:00
const isoString = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}+07:00`;

// Copy to clipboard
try {
  execSync(`echo ${isoString} | clip`);
  console.log("Copied:", isoString);
} catch {
  console.error(
    `Could not copy to clipboard. Here's the value: \n${isoString}`,
  );
}
