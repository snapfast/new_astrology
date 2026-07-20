1. **Analyze Requirements:**
   - Remove "Edit Birth Details" button (the one labelled "Generate New Chart" or "Close Form" that toggles `showEditForm`).
   - Add a collapsed version of birth details that expands on click.
   - The collapsed view should be a subtle, minimal one-liner.
   - Reduce the size/make minimal the other action buttons in the header section ("Compact Dashboard", "Share Report").
2. **Implement Changes in `src/app/horoscope/HoroscopeClientPage.tsx`:**
   - Remove `showEditForm` state.
   - Remove the `ChartGeneration` component wrapper that was rendered based on `showEditForm`.
   - Remove the button toggling `showEditForm`.
   - Add a new state `detailsExpanded` (default `false`).
   - Modify the "Birth Information" section. When collapsed, show a single minimal line summarizing name, date, time, and place. When clicked, toggle `detailsExpanded`. When expanded, show the current full view.
   - Update the styling for the "Compact View" and "Share" buttons to be smaller, more minimal. Specifically, the prompt asks to make them smaller and minimal *in that section*, so change `h-10` to maybe `h-8`, reduce padding, smaller text, maybe secondary button style instead of primary accent.
3. **Verify Changes:**
   - Run linter/type check.
   - Check if playwright tests fail and need updates (e.g. if a test clicked "Generate New Chart").
4. **Pre-commit:**
   - Run pre-commit instructions.
5. **Submit:**
   - Commit and push changes.
