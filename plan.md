1. **Update `src/lib/astrology.ts` to add True Node calculation**
   - Add a function `getTrueRahu(time: Ast.AstroTime): number` using Meeus formula for the true node of the Moon.
   - Update `generateAstrologyData` and `calculatePlanetaryAndDivisionalData` to accept an optional `nodeType` parameter (`'mean'` or `'true'`) defaulting to `'mean'`.

2. **Add Settings Modal Component**
   - Create `src/components/HoroscopeSettingsModal.tsx` which uses `BaseModal` to show a toggle for "Node Calculation" (Mean Node vs. True Node).
   - This modal will modify the URL search parameters to include `nodeType=true` or `nodeType=mean`, which will re-trigger the page generation.

3. **Integrate Settings Modal into Horoscope Pages**
   - In `src/app/horoscope/HoroscopeClientPage.tsx` and `src/app/horoscope/compact/CompactHoroscopeClientPage.tsx`:
     - Parse `nodeType` from `useSearchParams`.
     - Pass `nodeType` into `generateAstrologyData`.
     - Add a "Settings" button (gear icon) in the control bar next to "Share" / "Compact View" buttons.
     - Add the `HoroscopeSettingsModal` and trigger it via the settings button.

4. **Verify Implementation**
   - Run `pnpm build` to check for type errors.
   - Make sure pre-commit checks pass.
