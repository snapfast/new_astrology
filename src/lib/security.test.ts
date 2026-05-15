import { test } from 'node:test';
import assert from 'node:assert';
import { sanitize, sanitizeCoord } from './security.ts';

test('sanitize - strips tags', () => {
  assert.strictEqual(sanitize('<script>alert(1)</script>', 100), 'scriptalert(1)/script');
  assert.strictEqual(sanitize('Hello <b>World</b>', 100), 'Hello bWorld/b');
});

test('sanitize - enforces length', () => {
  assert.strictEqual(sanitize('1234567890', 5), '12345');
});

test('sanitize - handles null/undefined', () => {
  assert.strictEqual(sanitize(null, 100), '');
});

test('sanitizeCoord - allows valid coordinates', () => {
  assert.strictEqual(sanitizeCoord('28.6139'), '28.6139');
  assert.strictEqual(sanitizeCoord('-77.2090'), '-77.2090');
  assert.strictEqual(sanitizeCoord('0'), '0');
  assert.strictEqual(sanitizeCoord(' 123.456 '), '123.456');
});

test('sanitizeCoord - rejects invalid characters', () => {
  assert.strictEqual(sanitizeCoord('28.6139a'), '');
  assert.strictEqual(sanitizeCoord('12.34.56'), '');
  assert.strictEqual(sanitizeCoord('<script>'), '');
});

test('sanitizeCoord - enforces length', () => {
  assert.strictEqual(sanitizeCoord('12.3456789012345678901'), '');
});

test('sanitizeCoord - handles null/undefined', () => {
  assert.strictEqual(sanitizeCoord(null), '');
});
