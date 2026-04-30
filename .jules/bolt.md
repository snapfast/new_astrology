## 2025-05-15 - Optimize Image Delivery with `sizes` Attribute

**Learning:** When using `next/image` with the `fill` property in Next.js, omitting the `sizes` attribute causes the browser to default to `100vw`. This leads to the browser downloading high-resolution images even when they are displayed in smaller containers (e.g., in a grid), significantly increasing the transfer size and negatively impacting Largest Contentful Paint (LCP) and overall page load speed.

**Action:** Always provide a precise `sizes` attribute when using `fill` in `next/image`. This informs the browser about the actual rendered size of the image across different breakpoints, allowing it to request the appropriately scaled image from the Next.js image optimization API.

## 2025-05-16 - Safe Responsive State Transitions
**Learning:** Transitioning between responsive states (e.g., changing items-per-view in a carousel) using `matchMedia` can leave indices like `currentIndex` in an out-of-bounds state relative to the new `maxIndex`. This leads to broken layouts or empty slides.
**Action:** Always include clamping logic or a boundary-check effect when state variables that define layout constraints change across breakpoints.
