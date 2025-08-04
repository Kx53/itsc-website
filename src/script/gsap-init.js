import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// ใช้ตัวแปรเดียว mainContext สำหรับจัดการ GSAP context ทั้งหมด
let mainContext = null;
let smoother = null;

/**
 * เริ่มต้นการทำงานของ Smooth Scrolling โดยใช้ GSAP ScrollSmoother
 * - สร้าง gsap.context() ใหม่เพื่อจัดการ lifecycle ของ animations และ event listeners
 * - ตั้งค่า ScrollSmoother และ ScrollTrigger ต่างๆ
 * - จัดการปุ่ม Back to Top และ anchor links
 */
export function initSmoothScrolling() {
  // Kill previous context and animations if they exist
  killSmoothScrolling();

  // Create a new GSAP context to handle all animations and event listeners
  mainContext = gsap.context(() => {
    // Create the smooth scroller with improved settings
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1, // reduced from 1.5 for better control
      effects: true, // look for data-speed and data-lag attributes on elements
      normalizeScroll: true, // prevents address bar from showing/hiding on mobile
      smoothTouch: 0.1, // much shorter smoothing time on touch devices
    });

    // Prevent scrolling beyond the footer
    ScrollTrigger.create({
      trigger: "#contact",
      start: "bottom bottom",
      onEnter: () => {
        // Optional: add a slight bounce effect when reaching the bottom
        gsap.to(window, {
          duration: 0.2,
          scrollTo: { y: document.body.scrollHeight, autoKill: true },
        });
      },
    });

    // Initialize back to top button
    initBackToTopButton();

    // Initialize anchor links
    initAnchorLinks();

    console.log("GSAP ScrollSmoother Initialized with context");
  });
}

/**
 * ตั้งค่าปุ่ม Back to Top
 * - จัดการการแสดง/ซ่อนตามตำแหน่งการเลื่อน
 * - เพิ่ม event listener สำหรับการคลิก
 */
function initBackToTopButton() {
  // Find the button from BackToTop.astro component by its ID
  const backToTopBtn = document.getElementById("back-to-top");

  if (!backToTopBtn) {
    console.warn(
      "Back to top button not found - check that BackToTop component is loaded"
    );
    return;
  }

  // Show/hide button based on scroll position
  ScrollTrigger.create({
    start: 400, // show after scrolling down 400px
    onEnter: () =>
      gsap.to(backToTopBtn, {
        opacity: 1,
        visibility: "visible",
        duration: 0.3,
      }),
    onLeaveBack: () =>
      gsap.to(backToTopBtn, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.3,
      }),
  });

  // Add click event listener - this will be automatically cleaned up by gsap.context().revert()
  backToTopBtn.addEventListener("click", () => {
    // Scroll to top smoothly using GSAP
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: 0,
        autoKill: true,
      },
      ease: "power2.inOut",
    });
  });
}

/**
 * ตั้งค่า anchor links สำหรับการนำทางภายในหน้า
 * - เพิ่ม event listener สำหรับลิงก์ที่เริ่มต้นด้วย #
 * - ใช้ GSAP ScrollToPlugin เพื่อเลื่อนไปยังเป้าหมายอย่างนุ่มนวล
 */
function initAnchorLinks() {
  // Fix for anchor links navigation with ScrollSmoother
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    // Event listeners created within gsap.context() will be automatically cleaned up
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetElement,
          offsetY: 80, // account for fixed header
        },
        ease: "power2.inOut",
      });
    });
  });
}

/**
 * ทำความสะอาดและยกเลิก animations และ event listeners ทั้งหมด
 * - เรียก mainContext.revert() เพื่อยกเลิก GSAP animations และ event listeners ทั้งหมด
 * - ล้างตัวแปร global เพื่อเตรียมพร้อมสำหรับการโหลดหน้าถัดไป
 */
export function killSmoothScrolling() {
  // If we have a context, revert it (this cleans up all animations and event listeners)
  if (mainContext) {
    console.log("Reverting GSAP context and cleaning up all animations");
    mainContext.revert();
    mainContext = null;
  }

  // Reset smoother reference
  smoother = null;

}

// --- Astro View Transitions Integration ---
// Event listeners are now handled in Layout.astro to prevent duplicate registrations
