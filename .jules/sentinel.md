## 2025-05-22 - Reusable Security Headers Pattern
**Vulnerability:** Lack of defense-in-depth headers (CSP, HSTS, X-Frame-Options, etc.) making the app vulnerable to clickjacking, XSS, and MIME-sniffing.
**Learning:** Next.js `headers()` in `next.config.ts` provides a centralized way to enforce these.
**Prevention:** Always include a baseline CSP and security headers in `next.config.ts` for all new projects.

## 2025-05-23 - Transitive Dependency Security Enforcement
**Vulnerability:** Known vulnerabilities in transitive dependencies (e.g., PostCSS XSS risk) that are not resolved by simply updating top-level packages.
**Learning:** NPM's `overrides` field in `package.json` allows forcing a specific version of a package across the entire dependency tree, ensuring that even packages like `next` use the secure version.
**Prevention:** Regularly run `npm audit` and use `overrides` to address vulnerabilities in nested dependencies that aren't easily updated otherwise.

## 2025-06-05 - URL Parameter Sanitization in Client Components
**Vulnerability:** Directly using URL search parameters (e.g., from `useSearchParams()`) in the UI or application logic without sanitization can lead to XSS (if rendered unsafely), UI redressing, or logic errors from malformed data.
**Learning:** React's built-in XSS protection is good for rendering, but sanitizing at the point of ingestion (using utilities to limit length, strip tags, or enforce regex for numeric data) provides a robust layer of defense-in-depth that prevents broader categories of issues like browser DoS or unexpected processing states.
**Prevention:** Always wrap `searchParams.get()` calls in sanitization utilities, especially when the data is used in complex logic or passed to sensitive functions.
