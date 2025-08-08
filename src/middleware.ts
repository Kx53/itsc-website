import { defineMiddleware } from "astro/middleware";
import { paraglideMiddleware } from "./paraglide/server.js";
import { locales } from "./paraglide/runtime.js";

export const onRequest = defineMiddleware((context, next) => {
  return paraglideMiddleware(context.request, ({ locale, request }) => {
    // Populate Astro.locals.paraglide with the locale data
    (context.locals as any).paraglide = {
      lang: locale,
      textDirection: "ltr" as const,
      availableLanguageTags: locales,
    };

    // Update the context.request to use the de-localized request
    context.request = request;

    return next();
  });
});
