import { en } from "./en.ts";
import { uk, type Key } from "./uk.ts";

export type { Key };
export type Lang = "uk" | "en";

export interface LangConfig {
  /** Value for <html lang> and hreflang. */
  code: string;
  /** Locale used to format numbers in the calculator. */
  locale: string;
  /** Short label in the language switcher. */
  label: string;
  /** Output directory relative to the site root ("" = root). */
  dir: string;
}

export const LANGS: Record<Lang, LangConfig> = {
  uk: { code: "uk", locale: "uk-UA", label: "UA", dir: "" },
  en: { code: "en", locale: "en-US", label: "EN", dir: "en" },
};

export const DEFAULT_LANG: Lang = "uk";

const dicts: Record<Lang, Record<Key, string>> = { uk, en };

/** Translate function for one language. Values are trusted HTML. */
export type T = (key: Key) => string;

export const translator = (lang: Lang): T => key => dicts[lang][key];
