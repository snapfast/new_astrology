1. **Refactor Nominatim search into a Custom Hook (`src/hooks/useNominatim.ts`)**:
   - Extract the repetitive `fetch` logic, caching mechanism (`SUGGESTIONS_CACHE`), and debouncing from `ChartGeneration.tsx`, `KPHoraryGeneration.tsx`, and `BtrClientPage.tsx` into a reusable React hook.
   - This improves code re-use and reduces the file size of the form components significantly.

2. **Optimize `ChartGeneration.tsx`, `KPHoraryGeneration.tsx`, and `BtrClientPage.tsx`**:
   - Replace the internal API call and state with the new `useNominatim` hook.
   - This standardizes the place-of-birth search functionality across all forms.

3. **Optimize Array Operations in Astrology Library (`src/lib/astrology.ts`)**:
   - In `calculateAllShadBala`, replace the `.find` operation over `orderedPlanets` inside a loop with a direct dictionary lookup or an optimized assignment to eliminate O(N^2) complexity.
   - Replace `amantaMonth` index lookup (`LUNAR_MONTHS.findIndex`) in `calculatePanchang` with a pre-computed map or simpler modular arithmetic where possible.
   - Improve `getPlanetTransits` event transitions search by merging `.filter` calls into a single loop to reduce iterations over the large `uniqueEvents` array.

4. **Optimize `ExploreTools.tsx` Component**:
   - Refactor `filteredCards` logic to avoid multiple `.find()` and `.filter()` operations over `ALL_CARDS` on every render.
   - Use a single pass loop or simplify the logic to partition the array based on the current path, minimizing redundant iterations.

5. **Consolidate Types (`src/lib/types.ts`)**:
   - Move shared types like `StoredChartData` and `Suggestion` into `src/lib/types.ts` and import them where necessary.

6. **Pre-commit Steps**:
   - Ensure proper testing, verification, review, and reflection are done.

7. **Submit Changes**:
   - Once all optimizations are implemented and tests pass, commit and submit the branch.
