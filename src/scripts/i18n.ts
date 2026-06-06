import { STORAGE_KEY, HTML_LANG, type Lang } from "../i18n/config";

function readLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "zh" || stored === "en") return stored;
  } catch {}
  // Fallback to whatever the no-FOUC head script already set on <html>, so the
  // toggle still flips correctly even when localStorage is unavailable.
  return document.documentElement.dataset.lang === "zh" ? "zh" : "en";
}

// Apply a language across the document: data-lang (drives CSS), html lang,
// toggle state, data-driven aria-labels/placeholders, and notify islands.
function applyLanguage(lang: Lang): void {
  const html = document.documentElement;
  html.dataset.lang = lang;
  html.lang = HTML_LANG[lang];

  document.querySelectorAll<HTMLElement>("[data-lang-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", lang === "zh" ? "true" : "false");
  });

  // Localized aria-labels declared via data-i18n-aria-en / -zh
  document.querySelectorAll<HTMLElement>("[data-i18n-aria-en]").forEach((el) => {
    const val = lang === "zh" ? el.dataset.i18nAriaZh : el.dataset.i18nAriaEn;
    if (val != null) el.setAttribute("aria-label", val);
  });

  // Localized placeholders declared via data-i18n-ph-en / -zh
  document.querySelectorAll<HTMLElement>("[data-i18n-ph-en]").forEach((el) => {
    const val = lang === "zh" ? el.dataset.i18nPhZh : el.dataset.i18nPhEn;
    if (val != null) el.setAttribute("placeholder", val);
  });

  // Localized title attributes declared via data-i18n-title-en / -zh
  document
    .querySelectorAll<HTMLElement>("[data-i18n-title-en]")
    .forEach((el) => {
      const val =
        lang === "zh" ? el.dataset.i18nTitleZh : el.dataset.i18nTitleEn;
      if (val != null) el.setAttribute("title", val);
    });

  // Localized alt attributes declared via data-i18n-alt-en / -zh
  document.querySelectorAll<HTMLElement>("[data-i18n-alt-en]").forEach((el) => {
    const val = lang === "zh" ? el.dataset.i18nAltZh : el.dataset.i18nAltEn;
    if (val != null) el.setAttribute("alt", val);
  });

  // Notify language-aware islands (carousel, gallery, search, counts) to
  // re-render their JS-generated text in the active language.
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

function toggleLanguage(): void {
  const next: Lang = readLang() === "zh" ? "en" : "zh";
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  applyLanguage(next);
}

let initialized = false;

export function initLanguage(): void {
  if (initialized) return;
  initialized = true;
  // The head is:inline script already set html[data-lang] before paint (no
  // FOUC). Here we sync the rest (aria, listeners, islands) on load.
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest("[data-lang-toggle]")) {
      e.preventDefault();
      toggleLanguage();
    }
  });
  applyLanguage(readLang());
}

export function getCurrentLang(): Lang {
  return readLang();
}

// Run fn now and on every language switch. For islands whose text is generated
// by JS (counts, search results, filter labels) where CSS node-swapping alone
// can't localize.
export function onLangChange(fn: (lang: Lang) => void): void {
  fn(readLang());
  document.addEventListener("langchange", (e) => {
    const lang = (e as CustomEvent).detail?.lang ?? readLang();
    fn(lang);
  });
}

// Count + noun, handling English plural and Chinese measure words.
// countUnit(3, "publication", "publications", "篇") -> "3 publications" / "3 篇"
export function countUnit(
  n: number,
  enOne: string,
  enMany: string,
  zhUnit: string,
): string {
  return readLang() === "zh"
    ? `${n} ${zhUnit}`
    : `${n} ${n === 1 ? enOne : enMany}`;
}

export { applyLanguage, readLang };
