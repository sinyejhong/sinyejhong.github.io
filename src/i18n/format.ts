import type { Lang } from "./config";

const MONTHS_SHORT_EN = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

export interface DateParts {
  month: string;
  day: string;
  year: string;
}

// Parse an ISO date (YYYY-MM-DD) as UTC midnight. Shared so date displays stay
// consistent across components (NewsCarousel, GalleryCard). Null on invalid.
export function parseISODateUTC(dateStr: string): Date | null {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(Date.UTC(y, m - 1, d));
  return isNaN(date.getTime()) ? null : date;
}

// Parse an ISO date (YYYY-MM-DD) in UTC and return display parts per language.
// EN -> { month: "MAR", day: "28", year: "2026" }
// ZH -> { month: "3月", day: "28", year: "2026" }
export function formatDateParts(dateStr: string, lang: Lang): DateParts {
  const date = parseISODateUTC(dateStr);
  if (!date) return { month: "", day: "", year: "" };
  const monthIdx = date.getUTCMonth();
  const day = String(date.getUTCDate());
  const year = String(date.getUTCFullYear());
  if (lang === "zh") {
    return { month: `${monthIdx + 1}月`, day, year };
  }
  return { month: MONTHS_SHORT_EN[monthIdx], day, year };
}

// Full human date per language.
// EN -> "March 28, 2026"   ZH -> "2026年3月28日"
export function formatDateFull(dateStr: string, lang: Lang): string {
  const date = parseISODateUTC(dateStr);
  if (!date) return "";
  if (lang === "zh") {
    return `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`;
  }
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Count + noun, handling English plural and Chinese measure words.
// formatCount(3, "publication", "publications", "篇論文", lang)
//   EN -> "3 publications"   ZH -> "3 篇論文"
export function formatCount(
  n: number,
  enSingular: string,
  enPlural: string,
  zh: string,
  lang: Lang,
): string {
  if (lang === "zh") return `${n} ${zh}`;
  return `${n} ${n === 1 ? enSingular : enPlural}`;
}
