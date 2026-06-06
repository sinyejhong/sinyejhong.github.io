import type { Lang } from "./config";

// Pick a localized field from a data object. Falls back to the base (English)
// field when the *_zh variant is missing or empty — so untranslated proper
// nouns (paper titles, names, venues) naturally stay English.
export function pick<T extends Record<string, any>>(
  obj: T,
  field: string,
  lang: Lang,
): any {
  if (lang === "zh") {
    const zh = obj[`${field}_zh`];
    const hasZh = typeof zh === "string" ? zh.trim() !== "" : zh != null;
    if (hasZh) return zh;
  }
  return obj[field];
}
