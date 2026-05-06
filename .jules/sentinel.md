## 2025-05-22 - Reusable Security Headers Pattern
**Vulnerability:** Lack of defense-in-depth headers (CSP, HSTS, X-Frame-Options, etc.) making the app vulnerable to clickjacking, XSS, and MIME-sniffing.
**Learning:** Next.js `headers()` in `next.config.ts` provides a centralized way to enforce these.
**Prevention:** Always include a baseline CSP and security headers in `next.config.ts` for all new projects.
