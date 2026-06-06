import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sanitize, sanitizeCoord, sanitizeDate, sanitizeTime } from './security.ts';

describe('Security Utilities', () => {
  it('sanitize handles tags, length, and non-strings', () => {
    assert.strictEqual(sanitize('<script>', 10), 'script');
    assert.strictEqual(sanitize('Very long string', 5), 'Very');
    assert.strictEqual(sanitize(['array'], 10), '');
  });

  it('sanitize prevents common XSS vectors', () => {
    assert.strictEqual(sanitize('javascript:alert(1)', 20), 'alert(1)');
    assert.strictEqual(sanitize('<img src=x onerror=alert(1)>', 30), 'img src=x alert(1)');
    assert.strictEqual(sanitize('onclick=evil()', 20), 'evil()');
  });

  it('sanitize handles advanced security cases', () => {
    // Null bytes
    assert.strictEqual(sanitize('hello\0world', 20), 'helloworld');

    // Other protocols
    assert.strictEqual(sanitize('vbscript:msgbox("XSS")', 30), 'msgbox("XSS")');
    assert.strictEqual(sanitize('data:text/html,<script>alert(1)</script>', 50), 'text/html,scriptalert(1)/script');
    assert.strictEqual(sanitize('file:///etc/passwd', 30), '///etc/passwd');
    assert.strictEqual(sanitize('jar:https://example.com!/', 30), 'https://example.com!/');

    // Recursive bypasses
    assert.strictEqual(sanitize('javascjavascript:ript:alert(1)', 40), 'alert(1)');
    assert.strictEqual(sanitize('jajavascjavascript:ript:vascript:alert(1)', 50), 'alert(1)');

    // Whitespace in event handlers
    assert.strictEqual(sanitize('onmouseover  =  alert(1)', 30), 'alert(1)');

    // Trimming
    assert.strictEqual(sanitize('  clean me  ', 20), 'clean me');
  });

  it('sanitizeCoord validates numeric format and range strictly', () => {
    assert.strictEqual(sanitizeCoord('28.6'), '28.6');
    assert.strictEqual(sanitizeCoord('-77.2'), '-77.2');
    assert.strictEqual(sanitizeCoord('0'), '0');
    assert.strictEqual(sanitizeCoord('180'), '180');
    assert.strictEqual(sanitizeCoord('-180'), '-180');
    assert.strictEqual(sanitizeCoord('180.1'), '');
    assert.strictEqual(sanitizeCoord('-180.1'), '');
    assert.strictEqual(sanitizeCoord('999'), '');
    assert.strictEqual(sanitizeCoord('invalid'), '');
    assert.strictEqual(sanitizeCoord('.'), '');
    assert.strictEqual(sanitizeCoord('-'), '');
    assert.strictEqual(sanitizeCoord('1.2.3'), '');
    assert.strictEqual(sanitizeCoord(123), '');
  });

  it('sanitizeDate validates YYYY-MM-DD', () => {
    assert.strictEqual(sanitizeDate('2025-01-01'), '2025-01-01');
    assert.strictEqual(sanitizeDate('01-01-2025'), '');
    assert.strictEqual(sanitizeDate('2025-1-1'), '');
  });

  it('sanitizeTime validates HH:mm', () => {
    assert.strictEqual(sanitizeTime('12:34'), '12:34');
    assert.strictEqual(sanitizeTime('12-34'), '');
    assert.strictEqual(sanitizeTime('9:00'), '');
  });
});
