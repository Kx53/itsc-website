/// <reference types="astro/client" />
import type { Locale } from "./paraglide/runtime.js";

declare namespace App {
  interface Locals {
    paraglide: {
      lang: Locale;
      textDirection: "ltr" | "rtl";
      availableLanguageTags: Locale[];
    };
  }
}

interface ImportMetaEnv {
  readonly STRAPI_URL: string;
}
