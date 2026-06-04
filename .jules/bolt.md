## 2025-05-15 - Optimize Image Delivery with `sizes` Attribute

**Learning:** When using `next/image` with the `fill` property in Next.js, omitting the `sizes` attribute causes the browser to default to `100vw`. This leads to the browser downloading high-resolution images even when they are displayed in smaller containers (e.g., in a grid), significantly increasing the transfer size and negatively impacting Largest Contentful Paint (LCP) and overall page load speed.

**Action:** Always provide a precise `sizes` attribute when using `fill` in `next/image`. This informs the browser about the actual rendered size of the image across different breakpoints, allowing it to request the appropriately scaled image from the Next.js image optimization API.

## 2025-05-16 - Safe Responsive State Transitions
**Learning:** Transitioning between responsive states (e.g., changing items-per-view in a carousel) using `matchMedia` can leave indices like `currentIndex` in an out-of-bounds state relative to the new `maxIndex`. This leads to broken layouts or empty slides.
**Action:** Always include clamping logic or a boundary-check effect when state variables that define layout constraints change across breakpoints.

## 2025-05-20 - Lazy Evaluation for Data-Heavy Utilities
**Learning:** Functions that return large objects with many computed properties (like `generateAstrologyData`) can become performance bottlenecks if callers only need a small subset of the data. Eagerly calculating everything is wasteful.
**Action:** Use `Object.defineProperty` with getters and closure-based memoization to implement lazy evaluation for expensive return properties. This ensures that heavy computations are only performed when actually accessed, significantly improving performance for partial-use scenarios while maintaining the same API.

## 2025-05-22 - Shared Memoization in Multi-Getter Utilities
**Learning:** In utilities using multiple lazy getters (via `Object.defineProperty`), redundant "base" calculations (like Sun/Moon positions) can occur if each getter independently computes its dependencies.
**Action:** Lift shared astronomical dependencies into memoized closure-based helpers within the main utility scope. This ensures that heavy "core" positions are computed once and shared across `panchang`, `mahadashas`, and `planets` getters, maximizing the efficiency of the lazy evaluation pattern.

## 2025-05-25 - Precision-Aware Loop Consolidation
**Learning:** Consolidating multiple search loops (like Panchang end-time lookups) into a single pass significantly reduces astronomical overhead, but a coarse step size (e.g., 15 minutes) leads to accuracy regressions if the original implementation used refinement.
**Action:** Always include a binary search refinement step within consolidated search loops to maintain the original data precision (e.g., 1-minute accuracy) while still benefiting from the reduced number of coarse-grained lookups.

## 2025-06-04 - Redundancy Elimination in Astronomical Utilities
**Learning:** Functions that calculate relative states (like `isPlanetRetrograde`) often perform the same coordinate lookups as their callers. In the case of `astronomy-engine`, these calls involve expensive trigonometric operations and multiple vector transformations.
**Action:** Design utility functions to accept optional pre-calculated values (like tropical longitude). In loops processing multiple planets, pass the already-calculated current-time longitude to state-checkers to avoid doubling the astronomical overhead per planet.
