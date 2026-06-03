## 2025-05-22 - [Horoscope Form Accessibility]
**Learning:** Form inputs without associated labels and disconnected error messages significantly hinder accessibility for screen reader users. Simply having placeholder text or adjacent labels is insufficient; explicit `htmlFor`/`id` pairing and `aria-describedby` links are essential for a professional Vedic astrology platform where precision is valued.
**Action:** Always ensure every input has a unique `id` paired with a label's `htmlFor`, and link validation errors to inputs using `aria-describedby` and `role="alert"`.

## 2025-05-23 - [Localized UI Feedback vs Browser Alerts]
**Learning:** Native browser `alert()` calls are jarring and break the user's flow. Replacing them with transient, localized UI feedback (like a "Link Copied!" tooltip) provides a much more polished and professional experience. Furthermore, adding explicit `aria-label` and `title` attributes to icon-only buttons using localized strings is crucial for international accessibility.
**Action:** Prefer transient, localized UI notifications over native browser alerts, and always provide localized accessibility labels for icon-only interactive elements.
