## 2026-06-20 - Accessible Autocomplete Pattern
**Learning:** Custom dropdowns (like history or search suggestions) are inaccessible to keyboard and screen reader users without explicit state management for active items and ARIA attributes. Providing only mouse-based interaction or simple focus visibility isn't enough for a professional UX.
**Action:** Implement the WAI-ARIA Combobox pattern: use `role="combobox"`, `aria-autocomplete="list"`, and `aria-activedescendant` on the input; `role="listbox"` and `role="option"` on the dropdown; and handle ArrowUp/Down, Enter, and Escape keys for navigation and selection.

## 2026-06-20 - Standardized Focus and Tactile Feedback
**Learning:** High-quality UX requires consistent sensory feedback for all input methods. While hover states are often prioritized for mouse users, keyboard users need `focus-visible` rings, and touch/click users benefit from subtle `active:scale` transformations. Standardizing these across components (Hero, Modals, Panchang, Social) creates a professional, "snappy" feel and ensures WCAG-compliant navigation.
**Action:** Always pair `hover:` states with `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2` and `active:scale-95` (or similar) to ensure the interface is both accessible and tactilely responsive.
