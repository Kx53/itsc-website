/**
 * สคริปต์จัดการธีมสำหรับ Astro ที่ใช้ View Transitions
 * - จัดการการจำธีมผ่าน localStorage
 * - กำหนดธีมที่ถูกต้องทุกครั้งที่เปลี่ยนหน้า
 * - ผูก Event Listener กับปุ่มสลับธีมอย่างถูกต้อง
 * - ตอบสนองต่อการเปลี่ยนธีมของระบบ
 */

const THEME_STORAGE_KEY = "theme";
const htmlElement = document.documentElement;

/**
 * หาธีมที่ควรจะใช้จาก localStorage หรือค่าจากระบบ
 * @returns {'dark' | 'light'}
 */
const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme) return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

/**
 * กำหนดธีมให้กับหน้าเว็บและอัปเดตสถานะของปุ่มควบคุม
 * @param {'dark' | 'light'} theme - ธีมที่ต้องการใช้
 */
const applyTheme = (theme) => {
  htmlElement.setAttribute("data-theme", theme);
  document.querySelectorAll(".theme-controller").forEach((controller) => {
    controller.checked = theme === "dark";
  });
};

/**
 * ผูก Event Listener ให้กับปุ่มควบคุมธีมทั้งหมดในหน้า
 * ใช้ flag เพื่อป้องกันการผูก listener ซ้ำกับ element เดียวกัน
 */
const attachEventListeners = () => {
  document.querySelectorAll(".theme-controller").forEach((controller) => {
    if (controller.dataset.listenerAttached) return;

    controller.dataset.listenerAttached = "true";
    controller.addEventListener("change", (event) => {
      const newTheme = event.target.checked ? "dark" : "light";
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      applyTheme(newTheme);
    });
  });
};

/**
 * ฟังก์ชันหลักที่จะทำงานทุกครั้งที่โหลดหน้าเว็บ
 * กำหนดธีมที่ถูกต้องและผูก Event Listener
 */
const onPageLoad = () => {
  // Re-apply theme on every page load to support Astro's View Transitions
  applyTheme(getPreferredTheme());
  attachEventListeners();
};

// --- การทำงานหลัก ---

// 1. ตรวจจับการเปลี่ยนแปลงธีมของระบบ (จะทำงานก็ต่อเมื่อผู้ใช้ยังไม่เคยเลือกธีมเอง)
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(getPreferredTheme());
    }
  });

// 2. กำหนดธีมและผูก Listener ทุกครั้งที่มีการเปลี่ยนหน้า
document.addEventListener("astro:page-load", onPageLoad);
