# ITSC Website

เว็บไซต์ของ Information Technology Service Center (ITSC) ที่พัฒนาด้วย Astro framework พร้อมระบบ multi-language และ modern UI/UX

## 🚀 Features

- 🌐 **Multi-language Support**: รองรับภาษาไทยและอังกฤษด้วย Paraglide.js
- 📱 **Responsive Design**: ออกแบบให้รองรับทุกขนาดหน้าจอด้วย Tailwind CSS + DaisyUI
- ⚡ **High Performance**: ใช้ Astro framework เพื่อประสิทธิภาพสูงสุด
- 🎨 **Modern Animations**: เอฟเฟกต์และ animations ด้วย GSAP
- 📝 **Content Management**: เชื่อมต่อกับ Strapi CMS
- 🔍 **SEO Optimized**: เพิ่มประสิทธิภาพ SEO และ accessibility

## 🛠️ Tech Stack

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS 4.x + DaisyUI
- **Internationalization**: Paraglide.js + Inlang
- **Animations**: GSAP
- **CMS**: Strapi integration
- **UI Components**: Vue 3 components
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended package manager)

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/itsc-website.git
cd itsc-website

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Environment Setup

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Configure your environment variables in `.env`

## 🧞 Available Commands

| Command          | Action                                        |
| ---------------- | --------------------------------------------- |
| `pnpm install`   | ติดตั้ง dependencies                          |
| `pnpm dev`       | เริ่ม development server ที่ `localhost:4321` |
| `pnpm build`     | Build production site ไปยัง `./dist/`         |
| `pnpm preview`   | Preview production build locally              |
| `pnpm astro ...` | รัน Astro CLI commands                        |

## 📁 Project Structure

```
/
├── public/                 # Static assets
│   ├── fonts/             # Custom fonts (RSU, Sarabun)
│   ├── brandsvg/          # Brand logos and icons
│   └── ...
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── home/         # Homepage components
│   │   ├── shared/       # Shared components
│   │   ├── guide/        # Guide-related components
│   │   └── ...
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   │   └── [locale]/     # Localized routes
│   ├── paraglide/        # Generated i18n files
│   ├── styles/           # Global styles
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript type definitions
├── messages/             # Translation files
│   ├── en.json          # English translations
│   └── th.json          # Thai translations
├── project.inlang/       # Inlang configuration
└── ...
```

## 🌐 Internationalization

โปรเจคนี้รองรับ 2 ภาษา:

- **Thai (th)**: ภาษาหลัก
- **English (en)**: ภาษารอง

### Adding New Translations

1. เพิ่ม key ใหม่ใน `messages/th.json` และ `messages/en.json`
2. รัน `pnpm dev` เพื่อ compile translations
3. ใช้ในโค้ดด้วย `m.your_key()`

## 🎨 Styling Guidelines

- ใช้ **Tailwind CSS** สำหรับ utility classes
- ใช้ **DaisyUI** สำหรับ component classes
- รองรับ **Dark Mode** อัตโนมัติ
- ใช้ semantic color classes เช่น `bg-base-100`, `text-base-content`

## 🚀 Deployment

### GitHub Pages

```bash
pnpm build
# Deploy dist/ folder to your hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---
