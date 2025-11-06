export function formatDate(
  date: string | Date,
  format: "iso" | "short" | "long" | "relative" = "iso",
): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid date";

  const year = d.getUTCFullYear();

  const day = d.getUTCDate().toString().padStart(2, "0");

  if (format === "iso") {
    return `${year}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${day}`;
  }

  if (format === "short") {
    const month = d.toLocaleString("en-US", { month: "short" });
    return `${month} ${day}, ${year}`;
  }

  if (format === "long") {
    const month = d.toLocaleString("en-US", { month: "long" });
    return `${month} ${day}, ${year}`;
  }

  if (format === "relative") {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (seconds < 0) return "In the future";

    const intervals: Record<string, number> = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    const vowelSoundExceptions = ["hour"];

    for (let unit in intervals) {
      const interval = Math.floor(seconds / intervals[unit]);
      const remainder = seconds % intervals[unit];

      if (interval >= 1) {
        // Special case: "Yesterday"
        if (unit === "day" && interval === 1 && seconds < 172800) {
          return "Yesterday";
        }

        // "Nearly" when close to next unit
        if (remainder >= intervals[unit] * 0.9) {
          return `Nearly ${interval + 1} ${unit}${
            interval + 1 > 1 ? "s" : ""
          } ago`;
        }

        // Article check for singulars
        const article =
          interval === 1 &&
          (["a", "e", "i", "o", "u"].includes(unit[0]) ||
            vowelSoundExceptions.includes(unit))
            ? "An"
            : "A";

        if (interval === 1) return `${article} ${unit} ago`;
        return `${interval} ${unit}s ago`;
      }
    }

    return "Just now";
  }

  return "";
}
