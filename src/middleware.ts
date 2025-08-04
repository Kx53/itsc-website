import { defineMiddleware } from "astro:middleware";
import { languages, defaultLang } from "./i18n/ui";

const supportedLangs = Object.keys(languages);

export const onRequest = defineMiddleware((context, next) => {
  // --- ส่วนที่ 1: Redirect ผู้ใช้ที่หน้าแรก (/) ---
  // ทำงานเฉพาะเมื่อผู้ใช้อยู่ที่ path "/" เท่านั้น
  if (context.url.pathname === "/" && !context.isPrerendered) {
    // 1. ตรวจหาภาษาจาก Cookie ที่เคยบันทึกไว้
    const langFromCookie = context.cookies.get("lang")?.value;

    if (langFromCookie && supportedLangs.includes(langFromCookie)) {
      // ถ้าภาษาใน cookie ไม่ใช่ภาษา default, ให้ redirect
      if (langFromCookie !== defaultLang) {
        return context.redirect(`/${langFromCookie}/`);
      }
    } else {
      // 2. ถ้าไม่มี cookie, ตรวจหาภาษาจาก Header ของเบราว์เซอร์
      const acceptLanguage = context.request.headers.get("accept-language");
      if (acceptLanguage) {
        // หาภาษาที่รองรับตัวแรกที่เจอใน header
        const preferredLang = acceptLanguage
          .split(",")
          .map((lang) => lang.split(";")[0].trim().slice(0, 2))
          .find((lang) => supportedLangs.includes(lang));

        // ถ้าเจอภาษาที่ต้องการและไม่ใช่ภาษา default, ให้ redirect
        if (preferredLang && preferredLang !== defaultLang) {
          return context.redirect(`/${preferredLang}/`);
        }
      }
    }
  }

  // --- ส่วนที่ 2: บันทึกภาษาลง Cookie ---
  // ทำงานเมื่อผู้ใช้เข้าชมหน้าที่มีการระบุภาษาใน URL
  const currentLocale = context.currentLocale;
  if (currentLocale && supportedLangs.includes(currentLocale)) {
    // บันทึก/อัปเดต cookie ชื่อ 'lang' ให้มีอายุ 1 ปี
    context.cookies.set("lang", currentLocale, {
      path: "/",
      maxAge: 31536000, // 1 ปี (หน่วยเป็นวินาที)
      httpOnly: true,
      sameSite: "lax",
    });
  }

  // --- ส่วนที่ 3: ไปต่อ ---
  // ปล่อยให้ request ดำเนินการต่อไปเพื่อ render หน้าเพจ
  return next();
});
