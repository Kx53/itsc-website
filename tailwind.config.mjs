import daisyui from "daisyui";
import aspectRatio from "@tailwindcss/aspect-ratio";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,pika,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      // คุณสามารถเพิ่ม Custom Colors หรือ Font Families ได้ที่นี่
      colors: {
        // ตัวอย่างการเพิ่มสีจาก Navigation Bar ในรูป
        "itsc-bg": "#1e2a33",
        "itsc-green": "#66ff99",
      },
    },
  },
  plugins: [daisyui, aspectRatio], // Add daisyUI and aspect-ratio plugins here
};
