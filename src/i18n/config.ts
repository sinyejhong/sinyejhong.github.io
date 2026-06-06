// i18n configuration — single source of truth for languages.
// Strategy: same-URL client-side toggle (no /zh routes). English is the
// server-rendered default to protect existing SEO; Chinese is shown by
// flipping html[data-lang] via CSS + a small client script.

export type Lang = "en" | "zh";

export const LANGS: Lang[] = ["en", "zh"];
export const DEFAULT_LANG: Lang = "en";

// NOTE: STORAGE_KEY and HTML_LANG are duplicated as literals in the is:inline
// FOUC script in BaseLayout.astro (inline scripts cannot import). If you change
// either value here, update that script too.

// localStorage key holding the user's language preference.
export const STORAGE_KEY = "site-lang";

// Value written to <html lang>. Chinese uses Traditional (Taiwan).
export const HTML_LANG: Record<Lang, string> = {
  en: "en",
  zh: "zh-Hant-TW",
};
