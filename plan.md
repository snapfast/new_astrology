1. **Identify the missing standard**: The memory mentions "Rashi transit labels conditionally append Unicode Rashi symbols (e.g., ♈) for visual clarity." in `TransitsClientPage.tsx`. Also, "Sub-cards for Combustion and Retrograde utilize de-cluttered, neutralized themes (using standard surface/outline colors rather than highly colorful red/amber alerts)".
2. **Review `TransitsClientPage.tsx`**:
   - `RASHI_SYMBOLS` mapping needs to be added (e.g., Aries: "♈", Taurus: "♉", ...).
   - In the Rashi transits section, update `{ev.fromValue} &rarr; {ev.toValue}` to append symbols if available.
   - For Combustion and Retrograde sub-cards, they currently use `bg-red-50/50`, `border-red-200/80` and `bg-amber-50/50`, `border-amber-200/80`. Change these to standard surface/outline colors to match the neutralized theme requirement (e.g. `bg-surface border border-outline/40`).
   - Also, update text colors for those sub-cards appropriately if they use deep red/amber, they might need standard text colors like `text-on-surface`.
3. **Draft Changes**:
   - Define `RASHI_SYMBOLS` in `TransitsClientPage.tsx`.
   - Update `ev.fromValue` and `ev.toValue` rendering in `TransitsClientPage.tsx` to include `RASHI_SYMBOLS[ev.fromValue]`.
   - Modify class names for Retrograde card: replace `bg-amber-50/50` with `bg-surface`, `border-amber-200/80` with `border-outline/40`, remove `bg-amber-100`, etc.
   - Modify class names for Combustion card: replace `bg-red-50/50` with `bg-surface`, `border-red-200/80` with `border-outline/40`, remove `bg-red-100`, etc.
   - Run tests.
