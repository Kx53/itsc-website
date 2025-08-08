// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";
import Components from "unplugin-vue-components/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  vite: {
    plugins: [
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/paraglide",
        strategy: ["url", "cookie", "baseLocale"],
      }),
      tailwindcss(),
      Components({
        dts: true,
      }),
    ],
  },

  integrations: [vue()],

  image: {
    domains: ["picsum.photos", "strapi.placeholder.com"],
  },
});
