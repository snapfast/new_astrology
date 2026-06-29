1. **Define DashaBalance Interface**
   Add `export interface DashaBalance` in `src/lib/astrology.ts` to hold `lord`, `years`, `months`, and `days`.
2. **Update ChartData Interface**
   Add `dashaBalance?: DashaBalance` to `ChartData` in `src/lib/astrology.ts`.
3. **Calculate Dasha Balance**
   In `calculateVimshottariDasha` (or a separate helper), compute the remaining ms for the first dasha relative to `birthDate.getTime()`. Use `MS_PER_YEAR` to convert remaining ms to years, months, and days.
   Then attach this `dashaBalance` to `ChartData` in `generateAstrologyData`.
4. **Update VimshottariDasha Component**
   In `src/components/VimshottariDasha.tsx`, accept `dashaBalance` in `VimshottariDashaProps` and optionally display it at the top of the component (e.g. "Balance of Dasha: <Lord> <years> Y <months> M <days> D").
   Add relevant translation strings (`dashaBalance`, `years`, `months`, `days`).
5. **Pass dashaBalance to Component**
   Update both `src/app/horoscope/HoroscopeClientPage.tsx` and `src/app/horoscope/compact/CompactHoroscopeClientPage.tsx` to pass `dashaBalance={chartData.dashaBalance}` to `<VimshottariDasha />`.
6. **Pre-commit Steps**
   Run the pre-commit checks (`pre_commit_instructions`) and fix any issues before submitting.
