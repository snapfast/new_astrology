## 2025-05-22 - Reusable Security Headers Pattern
**Vulnerability:** Lack of defense-in-depth headers (CSP, HSTS, X-Frame-Options, etc.) making the app vulnerable to clickjacking, XSS, and MIME-sniffing.
**Learning:** Next.js `headers()` in `next.config.ts` provides a centralized way to enforce these.
**Prevention:** Always include a baseline CSP and security headers in `next.config.ts` for all new projects.

## 2025-05-23 - Transitive Dependency Security Enforcement
**Vulnerability:** Known vulnerabilities in transitive dependencies (e.g., PostCSS XSS risk) that are not resolved by simply updating top-level packages.
**Learning:** NPM's `overrides` field in `package.json` allows forcing a specific version of a package across the entire dependency tree, ensuring that even packages like `next` use the secure version.
**Prevention:** Regularly run `npm audit` and use `overrides` to address vulnerabilities in nested dependencies that aren't easily updated otherwise.
