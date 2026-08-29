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

## 2025-06-05 - Lazy Evaluation for Panchang Search Loops
**Learning:** Eagerly calculating all Panchang elements (like Tithi end times, Rahu Kaal, etc.) via expensive search loops takes ~3.5ms per call, even when only basic fields (like Tithi name) are needed. This is a significant bottleneck on pages with high-density data or simple widgets.
**Action:** Implement lazy getters via `Object.defineProperty` for all search-based Panchang properties. Group related searches (e.g., the 30-hour end-time loop) into a single memoized internal helper to ensure they are executed at most once, and only when a dependent property is accessed. This reduced partial-access latency from ~3.5ms to ~0.2ms (~94% improvement).

## 2025-06-14 - Memoization of Core Astrometric Computations inside Search Loops
**Learning:** In astrometric calculations where multiple threshold crossings (like tithi, yoga, nakshatra) are evaluated via identical search loops across shared midpoints, recalculating heavy trigonometric properties like `Ast.Ecliptic(Ast.GeoVector(Ast.Body.Sun, t, true))` per search branch duplicates effort exponentially.
**Action:** Lift the longitudes (e.g., `getSun` and `getMoon`) into closures backed by local `Map()` objects scoped within the bounds of the outer evaluation function. Because the input float keys (`t.ut`) are determined identically via deterministic subdivision (`(L + H) / 2`), the `Map` correctly scores cache hits and significantly improves calculation speed across branches without accuracy loss.

## 2025-06-15 - Eliminating Redundant Astrometric Computations by Passing Variables
**Learning:** Functions evaluating `isPlanetRetrograde` internally recreate variables already known to the caller, specifically duplicating the longitudes for the evaluation timestep `t1`, which invokes heavy `Ast.GeoVector` and `Ast.Ecliptic` calls again.
**Action:** Always accept precomputed longitude values if they are known, and only calculate the next delta internally. This shaves off roughly 12% in compute time.

## 2025-06-15 - Seed Caches to Eliminate Initial Loop Redundancy
**Learning:** Even with closure-based memoization within search loops, if the initial state isn't explicitly seeded with known parameters, the first lookup will redundantly recompute heavy operations (like `Ast.GeoVector` and `Ast.Ecliptic`).
**Action:** When initializing a local calculation cache (e.g., `sunCache` and `moonCache` Map objects), explicitly set the key for the current evaluation tick (`time.ut`) using the parent function's precalculated arguments if they are passed.

## 2025-06-25 - Avoid Redundant Sequence Generation
**Learning:** In React components that display both a full data series and a smaller subset (like `BiorhythmClientPage.tsx` showing a 60-day chart and 7-day mini-charts), generating both sequences independently using `useMemo` duplicates expensive math calculations (e.g., sine waves over the exact same mid-points).
**Action:** Generate the largest required range first, then use array slicing (e.g., `seriesData.slice(27, 34)`) to derive the smaller subset. This eliminates redundant mathematical effort and maintains data parity.

## 2025-06-25 - Astrological Calculation Performance (Trigonometric Optimization)
**Learning:** The `Ast.Rotation_EQJ_ECT(time)` matrix computation (for nutation and precession) is expensive. Calling it redundantly for each planet at the same time instance (e.g., inside `calculatePlanetaryAndDivisionalData` or `calculatePanchang` interpolation loops) significantly degrades performance.
**Action:** When computing planetary longitudes for multiple bodies at the exact same `AstroTime`, pre-calculate the rotation matrix once using `Ast.Rotation_EQJ_ECT(time)` and pass it down as an optional parameter to functions like `getTrueEclipticLongitude` to avoid redundant trigonometric calculations.

## 2025-06-25 - Astrological Calculation Performance (Divisional Chart Mapping)
**Learning:** In the high-frequency calculation path (`calculatePlanetaryAndDivisionalData`), iterating over divisional chart configurations using `Array.prototype.forEach` or `switch` statements to assign planets to houses introduces unnecessary object creations, closure overhead, and array lookups.
**Action:** Unroll the loops and directly access the specific chart arrays (`assignments.d1`, `assignments.d9`, etc.) when assigning planetary degrees and states. This reduces execution time for core chart generation by ~25%.

## 2026-07-16 - Bounded FIFO Caching for Astrometric Computations
**Learning:** High-density calculations (like planetary transits scanning 1100 days across 12 bodies) repeatedly evaluate coordinates and rotation matrices at identical or overlapping time steps. Uncached calls to `Ast.GeoVector` and `Ast.Rotation_EQJ_ECT` create severe main thread blocking and CPU pressure.
**Action:** Wrap core low-level astrometric functions (`getLahiriAyanamsa`, `getTrueEclipticLongitude`, `getTrueMoonEclipticLongitude`, `getRotationMatrix`) with a bounded FIFO-pruned `BoundedMap` cache using the Julian date float `time.ut` as the key. Bound the size to prevent memory leaks in persistent processes while achieving up to 5x speedups on complex transit scans. Note that Node `--experimental-strip-types` requires explicit class property declarations rather than constructor parameter properties.
