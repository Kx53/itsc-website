---
Date: 2025-08-01
TaskRef: "Fix skewed layout on resource page"

Learnings:
- Diagnosed and confirmed a conflict between GSAP ScrollSmoother and Tailwind CSS's `container mx-auto` utility.
- ScrollSmoother uses CSS `transform` which interferes with the margin-based centering of `mx-auto`.
- The effective solution is to remove `container mx-auto` and instead enforce centering using flexbox properties on the parent container (e.g., `w-full`, `flex`, `items-center`). This is a robust pattern for centering content within a transformed parent.

Difficulties:
- None. The diagnostic process was straightforward.

Successes:
- Correctly identified the root cause by systematically analyzing the component tree from child to parent (Component -> Page -> Layout -> JS).

Improvements_Identified_For_Consolidation:
- General pattern: When using scroll-hijacking libraries like GSAP ScrollSmoother, avoid `margin: auto` for centering. Use flexbox or grid layouts instead.
- Project Specific: The project uses GSAP ScrollSmoother, which should be the first suspect for any layout alignment issues, especially centering problems.
---
