import { defineCollection } from "astro:content";
import { generateCollections } from "@sensinum/astro-strapi-loader";

// ดึงข้อมูล collection type ทั้งหมดจาก Strapi
// library จะสร้าง collection ให้เราโดยอัตโนมัติตามชื่อ collection type ใน Strapi
export const collections = await generateCollections(
  {
    url: import.meta.env.STRAPI_URL,
    // หาก Strapi API ต้องใช้ token ให้ใส่ที่นี่
    token: import.meta.env.STRAPI_TOKEN,
  },
  ["articles", "authors", "categories", "posts", "tags"]
); // ระบุเฉพาะ collection ที่ต้องการเพื่อป้องกัน error จาก collection อื่นที่ยังไม่พร้อม
