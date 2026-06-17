## 2025-05-22 - [Horoscope Form Accessibility]
**Learning:** Form inputs without associated labels and disconnected error messages significantly hinder accessibility for screen reader users. Simply having placeholder text or adjacent labels is insufficient; explicit `htmlFor`/`id` pairing and `aria-describedby` links are essential for a professional Vedic astrology platform where precision is valued.
**Action:** Always ensure every input has a unique `id` paired with a label's `htmlFor`, and link validation errors to inputs using `aria-describedby` and `role="alert"`.

## 2025-05-23 - [Localized UI Feedback vs Browser Alerts]
**Learning:** Native browser `alert()` calls are jarring and break the user's flow. Replacing them with transient, localized UI feedback (like a "Link Copied!" tooltip) provides a much more polished and professional experience. Furthermore, adding explicit `aria-label` and `title` attributes to icon-only buttons using localized strings is crucial for international accessibility.
**Action:** Prefer transient, localized UI notifications over native browser alerts, and always provide localized accessibility labels for icon-only interactive elements.

## 2026-06-05 - [Global Back to Top Navigation]
**Learning:** For content-heavy Vedic astrology platforms, a global "Back to Top" button significantly improves mobile and desktop navigation efficiency. Adhering to established UI standards (w-10 h-10 circular buttons) ensures design consistency. Throttling scroll event listeners to ~200ms prevents performance degradation during fast scrolling without sacrificing responsiveness.
**Action:** Implement throttled scroll listeners for global navigation elements and maintain consistent button sizing across all floating UI actions.

## 2026-06-06 - [Transition-Hidden Element Accessibility]
**Learning:** When hiding interactive elements using CSS transitions (e.g., `opacity-0`) instead of conditional rendering, they remain in the tab order and are discoverable by screen readers unless explicitly managed. To ensure a truly "hidden" state, it is mandatory to combine the transition with `pointer-events-none`, `tabIndex={-1}`, and `aria-hidden={true}`.
**Action:** Always synchronize `tabIndex`, `aria-hidden`, and `pointer-events` with the visibility state when using CSS transitions for UI elements.

## Support Section Enhancement
- Restructured the support section on the About page to include distinct UPI and PayPal blocks.
- Integrated brand-appropriate SVG logos (UPI and PayPal) using the theme's accent color.
- Added "Pay using Email ID" label for PayPal to clarify the payment method.
- Ensured full opacity for all text and icons, adhering to the 'Text Clarity & Readability Standard'.
- Maintained "copy to clipboard" functionality with localized feedback (Copied).
