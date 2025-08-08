import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// === CONFIGURATION ===
const CONFIG = {
  // ScrollSmoother settings
  smoother: {
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1,
    effects: true,
    normalizeScroll: true,
    smoothTouch: 0.1,
  },

  // Animation durations and settings
  animations: {
    backToTop: {
      showThreshold: 400,
      duration: 0.3,
      scrollDuration: 1,
      ease: "power2.inOut",
    },
    anchorScroll: {
      duration: 1,
      offsetY: 80,
      ease: "power2.inOut",
    },
    crossPageDelay: 800,
    footerBounce: {
      duration: 0.2,
    },
  },

  // Element selectors
  selectors: {
    backToTopBtn: "#back-to-top",
    aboutSection: "#about",
    anchorLinks: 'a[href*="#"]',
  },
};

// === STATE MANAGEMENT ===
let mainContext = null;
let smoother = null;

// === UTILITY FUNCTIONS ===

/**
 * สร้าง GSAP animation object สำหรับการ show/hide element
 */
const createVisibilityAnimation = (
  element,
  isVisible,
  duration = CONFIG.animations.backToTop.duration
) => ({
  opacity: isVisible ? 1 : 0,
  visibility: isVisible ? "visible" : "hidden",
  duration,
});

/**
 * สร้าง scroll animation object
 */
const createScrollAnimation = (target, options = {}) => ({
  duration: options.duration || CONFIG.animations.anchorScroll.duration,
  scrollTo: {
    y: target,
    offsetY: options.offsetY || CONFIG.animations.anchorScroll.offsetY,
    autoKill: true,
  },
  ease: options.ease || CONFIG.animations.anchorScroll.ease,
});

/**
 * ตรวจสอบว่า anchor link เป็นการนำทางในหน้าเดียวกันหรือไม่
 */
const isSamePageAnchor = (href) => {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return false;

  const linkPath = href.substring(0, hashIndex);
  const currentPath = window.location.pathname;

  return !linkPath || linkPath === currentPath || linkPath === "";
};

/**
 * แยก hash จาก href
 */
const extractHash = (href) => {
  const hashIndex = href.indexOf("#");
  return hashIndex !== -1 ? href.substring(hashIndex) : null;
};

/**
 * จัดการการ scroll ไปยัง element ที่กำหนด
 */
const scrollToElement = (element, options = {}) => {
  if (!element) return;

  gsap.to(window, createScrollAnimation(element, options));
};

// === INITIALIZATION FUNCTIONS ===

/**
 * ตั้งค่าปุ่ม Back to Top
 */
function initBackToTopButton() {
  const backToTopBtn = document.querySelector(CONFIG.selectors.backToTopBtn);

  if (!backToTopBtn) {
    console.warn(
      "Back to top button not found - check that BackToTop component is loaded"
    );
    return;
  }

  const { showThreshold, duration, scrollDuration, ease } =
    CONFIG.animations.backToTop;

  // Show/hide button based on scroll position
  ScrollTrigger.create({
    start: showThreshold,
    onEnter: () =>
      gsap.to(
        backToTopBtn,
        createVisibilityAnimation(backToTopBtn, true, duration)
      ),
    onLeaveBack: () =>
      gsap.to(
        backToTopBtn,
        createVisibilityAnimation(backToTopBtn, false, duration)
      ),
  });

  // Add click event listener
  backToTopBtn.addEventListener("click", () => {
    gsap.to(window, {
      duration: scrollDuration,
      scrollTo: { y: 0, autoKill: true },
      ease,
    });
  });
}

/**
 * ตั้งค่า anchor links สำหรับการนำทางภายในหน้า
 */
function initAnchorLinks() {
  document.querySelectorAll(CONFIG.selectors.anchorLinks).forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const targetHash = extractHash(href);

      // Early returns for invalid cases
      if (!targetHash || targetHash === "#") return;
      if (!isSamePageAnchor(href)) return;

      // Handle same-page anchor link
      e.preventDefault();

      const targetElement = document.querySelector(targetHash);
      if (targetElement) {
        scrollToElement(targetElement);
      }
    });
  });
}

/**
 * ตั้งค่าการป้องกันการ scroll เกิน footer
 */
function initFooterScrollLimit() {
  const aboutElement = document.querySelector(CONFIG.selectors.aboutSection);

  if (!aboutElement) return;

  ScrollTrigger.create({
    trigger: CONFIG.selectors.aboutSection,
    start: "bottom bottom",
    onEnter: () => {
      gsap.to(window, {
        duration: CONFIG.animations.footerBounce.duration,
        scrollTo: { y: document.body.scrollHeight, autoKill: true },
      });
    },
  });
}

/**
 * จัดการการนำทางข้ามหน้าไปยัง anchor
 */
function handleCrossPageAnchorNavigation() {
  const hash = window.location.hash;

  if (!hash || hash === "#") return;

  setTimeout(() => {
    const targetElement = document.querySelector(hash);
    if (targetElement && smoother) {
      smoother.scrollTo(targetElement, true, "top top+=80");
    }
  }, CONFIG.animations.crossPageDelay);
}

// === MAIN FUNCTIONS ===

/**
 * เริ่มต้นการทำงานของ Smooth Scrolling โดยใช้ GSAP ScrollSmoother
 */
export function initSmoothScrolling() {
  // Kill previous context and animations if they exist
  killSmoothScrolling();

  // Create a new GSAP context to handle all animations and event listeners
  mainContext = gsap.context(() => {
    // Create the smooth scroller
    smoother = ScrollSmoother.create(CONFIG.smoother);

    // Initialize all components
    // initFooterScrollLimit(); // Disabled this to prevent "snap to footer" effect
    initBackToTopButton();
    initAnchorLinks();
    handleCrossPageAnchorNavigation();

    console.log("GSAP ScrollSmoother Initialized with context");
  });
}

/**
 * ทำความสะอาดและยกเลิก animations และ event listeners ทั้งหมด
 */
export function killSmoothScrolling() {
  if (mainContext) {
    mainContext.revert();
    mainContext = null;
  }

  smoother = null;
}

// --- Astro View Transitions Integration ---
// Event listeners are now handled in Layout.astro to prevent duplicate registrations
