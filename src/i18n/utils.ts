import { ui, defaultLang, languages } from "./ui";
import { getRelativeLocaleUrl } from "astro:i18n";

// Type definitions for better type safety
export type SupportedLanguage = keyof typeof ui;
export type TranslationKey = keyof (typeof ui)[typeof defaultLang];

/**
 * Create a translation function that works with Astro.currentLocale
 * This is the recommended way to use translations in Astro components
 * @param currentLocale - Current locale from Astro.currentLocale
 * @returns Translation function
 */
export function createTranslator(currentLocale: string | undefined) {
  const lang =
    currentLocale && isValidLanguage(currentLocale)
      ? currentLocale
      : defaultLang;

  return function t(key: TranslationKey): string {
    // Type-safe access with proper fallback
    const langTranslations = ui[lang] as Record<string, string>;
    const translation = langTranslations?.[key];

    if (translation !== undefined) {
      return translation;
    }

    // Fallback to default language
    const defaultTranslations = ui[defaultLang] as Record<string, string>;
    const fallback = defaultTranslations[key];

    if (fallback !== undefined) {
      return fallback;
    }

    // Last resort: return the key itself
    console.warn(`Translation missing for key: ${key} in language: ${lang}`);
    return key;
  };
}

/**
 * Check if a language code is supported
 * @param lang - Language code to check
 * @returns True if language is supported
 */
export function isValidLanguage(lang: string): lang is SupportedLanguage {
  return lang in ui;
}

/**
 * Get the default language
 * @returns Default language code
 */
export function getDefaultLanguage(): SupportedLanguage {
  return defaultLang;
}

/**
 * Get all available languages
 * @returns Languages object
 */
export function getLanguages() {
  return languages;
}

/**
 * Generate a localized URL for language switching
 * Preserves the current path and adds proper language prefix
 * @param targetLang - Target language code
 * @param currentPath - Current pathname (from Astro.url.pathname)
 * @returns Localized URL path
 */
export function getLanguageSwitchUrl(
  targetLang: SupportedLanguage,
  currentPath: string
): string {
  // Remove any existing language prefix from the path
  let cleanPath = currentPath;

  // Check if path starts with a language prefix
  const pathSegments = currentPath.split("/").filter(Boolean);
  if (pathSegments.length > 0 && isValidLanguage(pathSegments[0])) {
    // Remove the language prefix
    cleanPath = "/" + pathSegments.slice(1).join("/");
  }

  // Generate new URL with target language using Astro's helper
  return getRelativeLocaleUrl(targetLang, cleanPath);
}

// Re-export Astro helpers for convenience
export { getRelativeLocaleUrl } from "astro:i18n";

// Re-export ui constants for direct access
export { languages, defaultLang } from "./ui";
