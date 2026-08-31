1. **Calculate Chalit Chart in `src/lib/astrology.ts`**:
   - Add `chalit: DivisionalChartData` to `ChartData` interface and add `chalit` to `chartKeys`.
   - Calculate Chalit positions using Sripathi or equal house system (usually equal house system: shift 15 degrees behind lagna).
   - Equal house system is simple: 1st house is `Lagna - 15` to `Lagna + 15`. A planet is in the `N`th house if its longitude is in the `N`th 30-degree segment starting from `Lagna - 15`.
   - Wait, "Chalit" chart traditionally shows planets in houses based on Bhava Chalit.
   - A straightforward equal house system (Bhava Chalit) calculates a planet's house as: `Math.floor(((planetLong - lagnaSidereal + 15 + 360) % 360) / 30) + 1`.
   - However, since Rasi numbers in KundliChart correspond to the Rasi of the house cusps. The Ascendant's Rasi is for house 1.
   - Wait, in a Chalit chart, we display planets in houses, but the rasi labels remain the same as D1, or maybe the rasi label for each house should be the rasi where the cusp falls. Usually, Chalit charts just display the same lagna rasi for house 1 as D1.
2. **Display Chalit Chart in `src/app/horoscope/HoroscopeClientPage.tsx`**:
   - Add a new section for "Bhav Chalit Chart" at the bottom of the horoscope page, just before the "More Divisional Charts (Vargas)" or near "Planetary Positions". The user said "at bottom of the hroroscope page".
   - Use `KundliChart` component to render it.

Let's do standard Bhava Chalit (Equal House system) using Ascendant as mid-point of the 1st house.
- `cusp 1 mid = lagnaSidereal`
- `house 1 starts = lagnaSidereal - 15`
- A planet's chalit house is `Math.floor(((siderealLong - lagnaSidereal + 15 + 360) % 360) / 30) + 1`.

Is there any specific translation or translation key? We'll add `chalitChart: "Bhav Chalit Chart"`, `chalitDesc: "Planetary positions in houses"`.
