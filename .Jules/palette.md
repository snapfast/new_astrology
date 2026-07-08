## 2025-02-12 - [Modal Accessibility]
**Learning:** The `BaseModal` component, which underpins the majority of modals in the application (`LearnMoreModal`, `BookConsultationModal`, `ServiceDetailModal`), lacked a global `Escape` key dismiss handler. This is a fundamental keyboard accessibility expectation for modals.
**Action:** Always verify that foundational UI container components (like `BaseModal`, `Sheet`, `Drawer`) implement comprehensive keyboard navigation support (Escape to close, focus trapping) to propagate these accessibility wins globally across the application.
