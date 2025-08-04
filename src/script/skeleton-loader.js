import { gsap } from "gsap";

let ctx;
let timeoutId;

/**
 * Initializes the skeleton loader with GSAP animations and proper lifecycle management.
 * @param {object} options
 * @param {string} options.skeletonId - The ID of the skeleton container.
 * @param {string} options.contentId - The ID of the real content container.
 * @param {number} options.delay - The delay in milliseconds before starting the transition.
 */
function initSkeletonLoader({ skeletonId, contentId, delay }) {
  const skeleton = document.getElementById(skeletonId);
  const realContent = document.getElementById(contentId);

  if (!skeleton || !realContent) {
    console.warn(
      `Skeleton or real content element not found. Aborting skeleton loader.`
    );
    return;
  }

  // Ensure skeleton is visible (content is already hidden by the 'hidden' class)
  gsap.set(skeleton, { autoAlpha: 1 });

  ctx = gsap.context(() => {
    const showContent = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Clean up after animation is complete
          skeleton.classList.add("hidden");
        },
      });

      tl.to(skeleton, {
        duration: 0.15, // Faster fade out
        autoAlpha: 0,
        ease: "power1.in",
      })
        .call(() => {
          // Remove hidden class at the precise moment needed
          realContent.classList.remove("hidden");
        })
        .from(
          realContent,
          {
            duration: 0.25, // Faster fade in
            autoAlpha: 0,
            ease: "power1.out",
          },
          "-=0.1" // Adjust overlap
        );
    };

    // Use a timeout to simulate loading and then show the content
    timeoutId = setTimeout(showContent, delay);
  });
}

/**
 * Cleans up animations and timers to prevent memory leaks during page transitions.
 */
function cleanup() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  if (ctx) {
    ctx.revert(); // Reverts all GSAP animations and event listeners within the context
    ctx = null;
  }
}

/**
 * Sets up the skeleton loader for a page, listening to Astro's lifecycle events.
 * This ensures animations are properly initialized and cleaned up.
 * @param {object} options
 * @param {string} [options.skeletonId='skeleton-loader'] - The ID of the skeleton container.
 * @param {string} [options.contentId='real-content'] - The ID of the real content container.
 * @param {number} [options.delay=1000] - The delay in ms before showing the content.
 */
export function setupSkeletonLoader(options = {}) {
  const {
    skeletonId = "skeleton-loader",
    contentId = "real-content",
    delay = 50, // Set the desired low delay as the default
  } = options;

  const runLoader = () => initSkeletonLoader({ skeletonId, contentId, delay });

  // Astro's lifecycle events for View Transitions
  document.addEventListener("astro:page-load", runLoader);
  document.addEventListener("astro:before-swap", cleanup);

  // The 'astro:page-load' event will handle all page loads,
  // including the initial one, when using View Transitions.
}
