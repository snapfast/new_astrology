import { describe, it } from "node:test";
import assert from "node:assert";
import {
  sanitize,
  sanitizeCoord,
  sanitizeDate,
  sanitizeTime,
} from "./security.ts";

describe("Security Utilities", () => {
  it("sanitize handles tags, length, and non-strings", () => {
    assert.strictEqual(sanitize("<script>", 10), "script");
    assert.strictEqual(sanitize("Very long string", 5), "Very");
    assert.strictEqual(sanitize(["array"], 10), "");
  });

  it("sanitize prevents common XSS vectors", () => {
    assert.strictEqual(sanitize("javascript:alert(1)", 20), "alert(1)");
    assert.strictEqual(
      sanitize("<img src=x onerror=alert(1)>", 30),
      "img src=x alert(1)",
    );
    assert.strictEqual(sanitize("onclick=evil()", 20), "evil()");
  });

  it("sanitize handles advanced security cases", () => {
    // Null bytes and ASCII control characters
    assert.strictEqual(sanitize("hello\0world", 20), "helloworld");
    assert.strictEqual(sanitize("hello\x01world", 20), "helloworld");
    assert.strictEqual(sanitize("hello\x1Fworld", 20), "helloworld");
    assert.strictEqual(sanitize("hello\x7Fworld", 20), "helloworld");

    // Unicode Bidi control characters
    assert.strictEqual(sanitize("hello\u200Eworld", 20), "helloworld");
    assert.strictEqual(sanitize("hello\u202Aworld", 20), "helloworld");
    assert.strictEqual(sanitize("hello\u2066world", 20), "helloworld");

    // Other protocols
    assert.strictEqual(sanitize('vbscript:msgbox("XSS")', 30), 'msgbox("XSS")');
    assert.strictEqual(
      sanitize("data:text/html,<script>alert(1)</script>", 50),
      "text/html,scriptalert(1)/script",
    );
    assert.strictEqual(sanitize("file:///etc/passwd", 30), "///etc/passwd");
    assert.strictEqual(
      sanitize("jar:https://example.com!/", 30),
      "https://example.com!/",
    );
    assert.strictEqual(sanitize("srcdoc:test", 20), "test");
    assert.strictEqual(sanitize("about:blank", 20), "blank");
    assert.strictEqual(sanitize("content:test", 20), "test");

    // Recursive bypasses
    assert.strictEqual(
      sanitize("javascjavascript:ript:alert(1)", 40),
      "alert(1)",
    );
    assert.strictEqual(
      sanitize("jajavascjavascript:ript:vascript:alert(1)", 50),
      "alert(1)",
    );

    // Whitespace in event handlers
    assert.strictEqual(sanitize("onmouseover  =  alert(1)", 30), "alert(1)");

    // Trimming
    assert.strictEqual(sanitize("  clean me  ", 20), "clean me");

    // Obfuscation characters (tabs, newlines, carriage returns)
    assert.strictEqual(sanitize("java\tscript:alert(1)", 30), "alert(1)");
    assert.strictEqual(sanitize("java\nscript:alert(1)", 30), "alert(1)");
    assert.strictEqual(sanitize("java\rscript:alert(1)", 30), "alert(1)");
    assert.strictEqual(sanitize("j\ta\nv\rascript:alert(1)", 30), "alert(1)");

    // Invisible Unicode characters (Zero Width Space, etc.)
    assert.strictEqual(sanitize("java\u200Bscript:alert(1)", 30), "alert(1)");
    assert.strictEqual(sanitize("java\u200Cscript:alert(1)", 30), "alert(1)");
    assert.strictEqual(sanitize("java\u200Dscript:alert(1)", 30), "alert(1)");
    assert.strictEqual(sanitize("java\uFEFFscript:alert(1)", 30), "alert(1)");

    // Unicode separators
    assert.strictEqual(sanitize("java\u2028script:alert(1)", 30), "alert(1)");
    assert.strictEqual(sanitize("java\u2029script:alert(1)", 30), "alert(1)");

    // Additional obfuscation characters
    assert.strictEqual(sanitize("java\u00ADscript:alert(1)", 30), "alert(1)"); // Soft Hyphen
    assert.strictEqual(sanitize("java\u180Escript:alert(1)", 30), "alert(1)"); // Mongolian Vowel Separator
    assert.strictEqual(sanitize("java\u2060script:alert(1)", 30), "alert(1)"); // Word Joiner

    // New dangerous protocols
    assert.strictEqual(
      sanitize("blob:https://example.com/uuid", 40),
      "https://example.com/uuid",
    );
    assert.strictEqual(
      sanitize("filesystem:https://example.com/path", 40),
      "https://example.com/path",
    );

    // Dangerous attributes and slash-based bypasses
    assert.strictEqual(
      sanitize('srcdoc="<script>alert(1)</script>"', 50),
      '"scriptalert(1)/script"',
    );
    assert.strictEqual(sanitize('onload/="alert(1)"', 30), '"alert(1)"');
    assert.strictEqual(sanitize("onmouseover//=/alert(1)/", 30), "/alert(1)/");
    assert.strictEqual(
      sanitize('action="javascript:alert(1)"', 40),
      '"alert(1)"',
    );
  });

  it("sanitizeCoord validates numeric format and range strictly", () => {
    assert.strictEqual(sanitizeCoord("28.6"), "28.6");
    assert.strictEqual(sanitizeCoord("-77.2"), "-77.2");
    assert.strictEqual(sanitizeCoord("0"), "0");
    assert.strictEqual(sanitizeCoord("180"), "180");
    assert.strictEqual(sanitizeCoord("-180"), "-180");
    assert.strictEqual(sanitizeCoord("180.1"), "");
    assert.strictEqual(sanitizeCoord("-180.1"), "");
    assert.strictEqual(sanitizeCoord("999"), "");
    assert.strictEqual(sanitizeCoord("invalid"), "");
    assert.strictEqual(sanitizeCoord("."), "");
    assert.strictEqual(sanitizeCoord("-"), "");
    assert.strictEqual(sanitizeCoord("1.2.3"), "");
    assert.strictEqual(sanitizeCoord(123), "");
  });

  it("sanitizeDate validates YYYY-MM-DD", () => {
    assert.strictEqual(sanitizeDate("2025-01-01"), "2025-01-01");
    assert.strictEqual(sanitizeDate("01-01-2025"), "");
    assert.strictEqual(sanitizeDate("2025-1-1"), "");
  });

  it("sanitizeTime validates HH:mm", () => {
    assert.strictEqual(sanitizeTime("12:34"), "12:34");
    assert.strictEqual(sanitizeTime("12-34"), "");
    assert.strictEqual(sanitizeTime("9:00"), "");
  });
});
