import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

let ctx; // GSAP Context for easy cleanup

export function initAnimations() {
  console.log("Initializing animations...");

  ctx = gsap.context(() => {
    const sections = gsap.utils.toArray(".scroll-section");
    const container = document.querySelector(".scrolling-sections-container");
    const scrollingEl = document.querySelector(".scrolling-sections");

    if (!sections.length || !container || !scrollingEl) {
      console.warn("Required elements for scrolling animation not found.");
      return;
    }

    // --- Hero Animation ---
    document.fonts.ready.then(function () {
      const heroContent = sections[0]?.querySelector(".content-wrapper");
      if (heroContent) {
        const heroHeading = new SplitText(heroContent.querySelector("h1"), {
          type: "words,chars",
        });
        const heroP = new SplitText(heroContent.querySelector("p"), {
          type: "words",
        });
        const scrollIndicator = document.querySelector(
          ".scroll-indicator-wrapper"
        );

        const heroTl = gsap.timeline({ delay: 0.2 });

        heroTl
          .from(heroHeading.chars, {
            autoAlpha: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.03,
          })
          .from(
            heroP.words,
            {
              autoAlpha: 0,
              y: 20,
              duration: 1,
              ease: "power3.out",
              stagger: 0.05,
            },
            "-=0.5"
          );

        if (scrollIndicator) {
          // Use a standalone fromTo for the indicator to ensure its lifecycle is independent and robust
          gsap.fromTo(
            scrollIndicator,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              // Delay until after the main text animation
              delay: heroTl.duration() - 0.5,
              onComplete: () => {
                // Add the bounce animation once the fade-in is complete
                gsap.to(scrollIndicator, {
                  y: -10,
                  repeat: -1,
                  yoyo: true,
                  ease: "power1.inOut",
                  duration: 0.8,
                });
              },
            }
          );
        }
      }
    });

    // --- Scrolling Sections Animation ---
    // --- Scrolling Sections Animation ---
    // Immediately hide the content of sections that will be faded in to prevent FOUC
    const contentsToAnimate = sections
      .slice(1)
      .map((s) => s.querySelector(".content-wrapper"));
    gsap.set(contentsToAnimate, { autoAlpha: 0, y: 50 });

    // Set the container height to create scroll space
    gsap.set(container, { height: sections.length * 100 + "vh" });

    // Create a single timeline for all scrolling animations
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: scrollingEl,
        scrub: 1,
        end: () => `+=${container.offsetHeight - scrollingEl.offsetHeight}`,
      },
    });

    // Animate each section transition sequentially
    sections.forEach((section, index) => {
      const content = section.querySelector(".content-wrapper");
      if (!content) return;

      // Fade in the current section's content
      if (index > 0) {
        mainTimeline.to(content, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }

      // Add a pause to view the content, but don't add a pause after the last section
      if (index < sections.length - 1) {
        mainTimeline.addLabel(`view_section_${index}`);
        // Fade out the current section before the next one appears
        mainTimeline.to(
          content,
          {
            autoAlpha: 0,
            y: -50,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "+=1" // Pause for 1 second after the label
        );
      }
    });
    // Add a final pause to keep the last section pinned for a bit longer
    mainTimeline.to({}, { duration: 1.5 });
  });
}

export function killAnimations() {
  console.log("Killing animations...");
  if (ctx) {
    ctx.revert();
  }
}
