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

## 2026-06-17 - [Whitespace Protocol Bypass and Attribute Hardening]
**Vulnerability:** Protocol-based XSS filters could be bypassed using whitespace (e.g., `javascript :`). Additionally, generic event handler stripping (`on\w+`) caused false positives for words like `long=` or `version=`.
**Learning:** Regex for protocol detection must account for optional whitespace before the colon. Attribute stripping should use word boundaries (`\b`) to avoid over-matching and include a broader set of dangerous attributes (style, formaction, etc.).
**Prevention:** Always use `\s*:` for protocol checks and `\b` word boundaries for attribute/event handler blacklists.

## 2026-06-19 - [Invisible Unicode Character Bypass]
**Vulnerability:** Attackers can bypass protocol and keyword filters (e.g., "javascript:") by injecting invisible Unicode characters like Zero Width Space (\u200B), Non-Joiner (\u200C), Joiner (\u200D), or Byte Order Mark (\uFEFF) inside the string.
**Learning:** Many "invisible" characters are ignored by browsers during URI parsing but effectively break simple string matching or regex filters that don't explicitly account for them.
**Prevention:** Expand character stripping regex to include the full range of Zero Width characters (\u200B-\u200F) and the Byte Order Mark (\uFEFF) before performing security-critical filtering.

## 2025-06-20 - Correct Pnpm Override Configuration
**Vulnerability:** Security overrides for transitive dependencies (like `postcss`) were not being applied because they were defined in the top-level `overrides` field, which `pnpm` ignores in favor of `pnpm.overrides`.
**Learning:** Dependency managers have specific keys for version overrides. Misconfiguring these keys leaves the application vulnerable despite having "fix" code present.
**Prevention:** Always verify that security overrides are active by running the manager-specific audit command (e.g., `pnpm audit`) after applying changes to `package.json`.

## 2025-06-21 - [Keyword Obfuscation and Attribute Bypass Hardening]
**Vulnerability:** Attackers can bypass keyword-based XSS filters (e.g., `javascript:`) by injecting non-printable characters like soft hyphens (\u00AD), word joiners (\u2060), or Mongolian vowel separators (\u180E) that browsers ignore during parsing. Additionally, filters looking for `on*=` can be bypassed using slashes instead of whitespace (e.g., `onload/=`).
**Learning:** Simple string sanitization is insufficient against browser-level parser normalization. Characters that are "invisible" to users but interpreted as delimiters or ignored by parsers must be explicitly stripped before keyword matching.
**Prevention:** Extend character stripping regex to include the full range of formatting and control characters known to be ignored by browser URI/HTML parsers. Robustify attribute detection regex to account for non-whitespace delimiters like `/`.

## 2025-06-22 - [Unicode Separator and Protocol Hardening]
**Vulnerability:** Unicode Line Separator (\u2028) and Paragraph Separator (\u2029) are treated as newlines in JavaScript and can break string literals if sanitized content is injected into scripts. Modern protocols like `blob:` and `filesystem:` can also be used as XSS vectors to bypass standard protocol filters.
**Learning:** Sanitization must account for characters that have special semantic meaning in the target execution environment (like JS newlines) even if they aren't standard ASCII controls. The protocol blacklist must be continuously updated to cover emerging browser APIs.
**Prevention:** Always strip \u2028 and \u2029 in generic string sanitizers. Include `blob:` and `filesystem:` in protocol blacklists for defense-in-depth.
