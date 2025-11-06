export function readingTime(s?: string): number {
  if (!s) return 0;
  const wpm = 200;
  const n = s
    .replace(/[^\w\s]/gi, "")
    .replaceAll("\r", "")
    .replaceAll("\n", "")
    .split(" ").length;

  return Math.ceil(n / wpm);
}
