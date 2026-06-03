## 2025-05-22 - [Horoscope Form Accessibility]
**Learning:** Form inputs without associated labels and disconnected error messages significantly hinder accessibility for screen reader users. Simply having placeholder text or adjacent labels is insufficient; explicit `htmlFor`/`id` pairing and `aria-describedby` links are essential for a professional Vedic astrology platform where precision is valued.
**Action:** Always ensure every input has a unique `id` paired with a label's `htmlFor`, and link validation errors to inputs using `aria-describedby` and `role="alert"`.
