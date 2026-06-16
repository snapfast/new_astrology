## 2025-05-22 - Reusable Security Headers Pattern
**Vulnerability:** Lack of defense-in-depth headers (CSP, HSTS, X-Frame-Options, etc.) making the app vulnerable to clickjacking, XSS, and MIME-sniffing.
**Learning:** Next.js `headers()` in `next.config.ts` provides a centralized way to enforce these.
**Prevention:** Always include a baseline CSP and security headers in `next.config.ts` for all new projects.

## 2025-05-23 - Transitive Dependency Security Enforcement
**Vulnerability:** Known vulnerabilities in transitive dependencies (e.g., PostCSS XSS risk) that are not resolved by simply updating top-level packages.
**Learning:** NPM's `overrides` field in `package.json` allows forcing a specific version of a package across the entire dependency tree, ensuring that even packages like `next` use the secure version.
**Prevention:** Regularly run `npm audit` and use `overrides` to address vulnerabilities in nested dependencies that aren't easily updated otherwise.

## 2025-05-24 - Robust Input Sanitization Pattern
**Vulnerability:** Weak, generic string sanitization that could fail at runtime if passed non-string types (e.g., arrays or objects from query params) or allow invalid formats to reach core logic.
**Learning:** Generic "remove tags" functions are insufficient for specialized fields like dates, times, or coordinates. Sanitization must include explicit type checking (using `unknown` and `typeof` in TS) and format validation (regex).
**Prevention:** Implement specialized, format-aware sanitizers (`sanitizeDate`, `sanitizeTime`) for all structured user inputs and ensure generic sanitizers fail safely on unexpected types.

## 2025-05-25 - Enhanced XSS and Coordinate Validation
**Vulnerability:** `sanitizeCoord` used a loose regex that allowed non-numeric strings like ".", which could lead to `NaN` being passed to astronomical calculation functions. `sanitize` only stripped `<` and `>`, leaving it vulnerable to `javascript:` protocols and HTML event handlers.
**Learning:** Coordinate validation must be strict (`/^-?\d+(\.\d+)?$/`) to ensure only valid numbers are processed. Generic sanitization should include heuristic stripping of common XSS protocols and event handlers (e.g., `onmouseover=`).
**Prevention:** Use strict regex for numeric inputs and extend string sanitization to cover common attribute-based XSS vectors.

## 2025-06-12 - Recursive Protocol Sanitization and Range Validation
**Vulnerability:** Protocol-based XSS filters can often be bypassed by nesting keywords (e.g., `javasjavascriptcript:`) which become valid after a single-pass replacement. Additionally, coordinate sanitization without range checks could allow extreme values that might crash or degrade performance of astronomical calculation engines.
**Learning:** Protocol removal must be recursive (using a loop) to ensure no bypasses remain. Validating coordinates should include geographic range checks (+/- 90/180) to prevent out-of-bounds data from entering the system.
**Prevention:** Implement a `do-while` loop for protocol stripping and enforce strict numeric bounds for specialized inputs like coordinates.

## 2026-06-15 - [XSS Protocol Obfuscation Bypass]
**Vulnerability:** Attackers can bypass protocol filters (like "javascript:") by injecting browser-ignored whitespace characters (tabs, newlines, carriage returns) inside the protocol string (e.g., "java\tscript:").
**Learning:** Standard string replacement for "javascript:" is insufficient if it doesn't account for how browsers normalize and execute URIs. Recursive stripping combined with character normalization is required.
**Prevention:** Always strip whitespace characters (\t, \n, \r) before performing security-critical keyword or protocol filtering.

## 2026-06-16 - [Control Character and Protocol Hardening]
**Vulnerability:** Sanitization logic allowed ASCII control characters (0-31, 127) and Unicode Bidi control characters, which can be used for "Trojan Source" attacks or to bypass filters. Additionally, obscure but potentially dangerous protocols like `srcdoc` or `ms-appx` were not blocked.
**Learning:** Robust sanitization must cover non-printable and direction-control characters that browsers might interpret or that can obfuscate malicious payloads.
**Prevention:** Always strip the full range of ASCII control characters and known Bidi characters before processing user-provided strings. Expand protocol blacklists to include platform-specific or emerging web protocols.
