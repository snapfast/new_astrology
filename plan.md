1. **Analyze Requirements:**
   - The user wants the edit section (Birth Details) to close once "Update Kundli" is clicked and the update happens.
2. **Implement Changes in `src/app/horoscope/HoroscopeClientPage.tsx`:**
   - Currently, `birthDetailsExpanded` state controls whether the edit section is open.
   - We need to close this section (`setBirthDetailsExpanded(false)`) when the URL search parameters change (which indicates a successful update).
   - Add a `useEffect` in `HoroscopeClientPage` that listens to `searchParams` and sets `birthDetailsExpanded(false)`.
3. **Pre-commit Step:**
   - Follow standard testing and verification instructions.
4. **Submit:**
   - Commit and push changes.
