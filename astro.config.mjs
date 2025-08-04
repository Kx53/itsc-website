// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";
import Components from "unplugin-vue-components/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      Components({
        dts: true,
      }),
    ],
  },

  integrations: [vue()],

  image: {
    domains: ["picsum.photos"],
  },

  i18n: {
    locales: ["th", "en"],
    defaultLocale: "th",
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
