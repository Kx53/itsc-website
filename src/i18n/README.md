# i18n Utils - Migration Guide

## 🚀 การปรับปรุงใหม่

โค้ด i18n utils ได้รับการปรับปรุงให้ใช้ Astro official i18n system แล้ว พร้อมกับ:

- ✅ **Type Safety ดีขึ้น** - TypeScript support เต็มรูปแบบ
- ✅ **Performance ดีขึ้น** - ใช้ Astro built-in helpers
- ✅ **Backward Compatible** - API เดิมยังใช้ได้
- ✅ **Enhanced Features** - รองรับ query params และ hash fragments

## 📖 วิธีการใช้งาน

### 1. การใช้งานแบบเดิม (ยังใช้ได้)

```typescript
// ใน .astro components
import {
  getLangFromUrl,
  useTranslations,
  switchLanguageUrl,
} from "../i18n/utils";

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
```

### 2. การใช้งานแบบใหม่ (แนะนำ)

```typescript
// ใน .astro components - ใช้ Astro.currentLocale
import { createTranslator, getRelativeLocaleUrl } from "../i18n/utils";

const t = createTranslator(Astro.currentLocale);
const localizedUrl = getRelativeLocaleUrl("en", "/about");
```

### 3. การใช้งาน Astro helpers โดยตรง

```typescript
// Import Astro helpers โดยตรง
import { getRelativeLocaleUrl } from "astro:i18n";

// ใช้ใน component
const aboutUrl = getRelativeLocaleUrl("en", "/about"); // "/en/about"
const currentLang = Astro.currentLocale; // "th" หรือ "en"
```

## 🔄 การ Migrate Components

### Navigation Component

```astro
---
// เดิม
import { getLangFromUrl, useTranslations } from "../i18n/utils";
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

// ใหม่ (แนะนำ)
import { createTranslator } from "../i18n/utils";
const t = createTranslator(Astro.currentLocale);
---
```

### Language Switcher

```astro
---
import { switchLanguageUrl, getAllLanguages } from "../i18n/utils";
const languages = getAllLanguages();
---

{Object.entries(languages).map(([langCode, langName]) => (
  <a href={switchLanguageUrl(Astro.url, langCode)}>
    {langName}
  </a>
))}
```

## 🆕 ฟีเจอร์ใหม่

### 1. Type Safety

```typescript
import type { SupportedLanguage, TranslationKey } from "../i18n/utils";

// TypeScript จะเตือนถ้า key ไม่มี
const text: string = t("common.service"); // ✅ Type safe
```

### 2. Language Validation

```typescript
import { isValidLanguage } from "../i18n/utils";

if (isValidLanguage("th")) {
  // ทำงานกับภาษาไทย
}
```

### 3. Enhanced URL Handling

```typescript
// รองรับ query params และ hash
const newUrl = switchLanguageUrl(
  new URL("https://site.com/about?tab=1#section"),
  "en"
); // "/en/about?tab=1#section"
```

## 🎯 Best Practices

1. **ใช้ `Astro.currentLocale`** แทน `getLangFromUrl()` ใน components ใหม่
2. **ใช้ `createTranslator()`** สำหรับ translation function
3. **ใช้ `getRelativeLocaleUrl()`** สำหรับ URL generation
4. **เก็บ backward compatibility** สำหรับ components เดิม

## 🔧 Configuration

Astro i18n config ใน `astro.config.mjs`:

```javascript
export default defineConfig({
  i18n: {
    locales: ["th", "en"],
    defaultLocale: "th",
    routing: {
      prefixDefaultLocale: false, // th ไม่มี prefix, en มี /en/
    },
  },
});
```

## 📚 เอกสารเพิ่มเติม

- [Astro i18n Documentation](https://docs.astro.build/en/guides/internationalization/)
- [TypeScript Support](https://docs.astro.build/en/guides/typescript/)
