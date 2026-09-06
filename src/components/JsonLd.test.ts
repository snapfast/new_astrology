import { describe, it } from "node:test";
import assert from "node:assert";
import React from "react";
import { renderToString } from "react-dom/server";
import JsonLd from "./JsonLd.tsx";

describe("JsonLd Component", () => {
  it("should render JSON-LD data correctly", () => {
    const data = { a: 1, b: "test" };
    const html = renderToString(React.createElement(JsonLd, { data }));
    assert.ok(html.includes('{"a":1,"b":"test"}'));
  });

  it("should securely escape HTML tags to prevent XSS", () => {
    const data = { html: "<script>alert('xss')</script>" };
    const html = renderToString(React.createElement(JsonLd, { data }));
    assert.ok(html.includes('\\u003C\\u002Fscript\\u003E'));
    assert.ok(html.includes('\\u003Cscript\\u003E'));
  });

  it("should render ampersands properly without unnecessarily escaping if safe", () => {
    const data = { query: "a=1&b=2" };
    const html = renderToString(React.createElement(JsonLd, { data }));
    assert.ok(html.includes('a=1&b=2'));
  });

  it("should render unicode line separators properly", () => {
    const data = { text: "Line 1\u2028Line 2\u2029Line 3" };
    const html = renderToString(React.createElement(JsonLd, { data }));
    assert.ok(html.includes('\\u2028'));
    assert.ok(html.includes('\\u2029'));
  });
});
