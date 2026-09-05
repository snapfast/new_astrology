import { describe, it } from "node:test";
import assert from "node:assert";
import { sanitizeJsonLd } from "./JsonLd.tsx";

describe("sanitizeJsonLd", () => {
  it("should stringify simple objects correctly", () => {
    const input = { a: 1, b: "test" };
    assert.strictEqual(sanitizeJsonLd(input), '{"a":1,"b":"test"}');
  });

  it("should escape HTML tags to prevent XSS", () => {
    const input = { html: "<script>alert('xss')</script>" };
    assert.strictEqual(
      sanitizeJsonLd(input),
      '{"html":"\\u003cscript\\u003ealert(\'xss\')\\u003c/script\\u003e"}'
    );
  });

  it("should escape ampersands", () => {
    const input = { query: "a=1&b=2" };
    assert.strictEqual(sanitizeJsonLd(input), '{"query":"a=1\\u0026b=2"}');
  });

  it("should escape unicode line separators (U+2028 and U+2029)", () => {
    const input = { text: "Line 1\u2028Line 2\u2029Line 3" };
    assert.strictEqual(
      sanitizeJsonLd(input),
      '{"text":"Line 1\\u2028Line 2\\u2029Line 3"}'
    );
  });

  it("should handle mixed malicious content", () => {
    const input = {
      name: "John & Doe",
      script: "<script>alert(1)</script>\u2028",
      nested: { tag: "<img src=x onerror=alert(1)>" }
    };
    const expected = '{"name":"John \\u0026 Doe","script":"\\u003cscript\\u003ealert(1)\\u003c/script\\u003e\\u2028","nested":{"tag":"\\u003cimg src=x onerror=alert(1)\\u003e"}}';
    assert.strictEqual(sanitizeJsonLd(input), expected);
  });
});
