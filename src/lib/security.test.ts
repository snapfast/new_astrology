import { test } from 'node:test';
import assert from 'node:assert';
import { sanitize, sanitizeCoord } from './security.ts';

test('sanitize strips < and > tags', () => {
  assert.strictEqual(sanitize('<script>alert(1)</script>', 100), 'scriptalert(1)/script');
});

test('sanitize enforces maxLength', () => {
  assert.strictEqual(sanitize('abcdefghij', 5), 'abcde');
});

test('sanitize handles null/empty input', () => {
  assert.strictEqual(sanitize('', 100), '');
  // @ts-expect-error - testing invalid input
  assert.strictEqual(sanitize(null, 100), '');
});

test('sanitizeCoord allows valid coordinates', () => {
  assert.strictEqual(sanitizeCoord('28.6139'), '28.6139');
  assert.strictEqual(sanitizeCoord('-77.2090'), '-77.2090');
  assert.strictEqual(sanitizeCoord('0'), '0');
  assert.strictEqual(sanitizeCoord('.5'), '.5');
});

test('sanitizeCoord rejects invalid characters', () => {
  assert.strictEqual(sanitizeCoord('28.6139<script>'), '');
  assert.strictEqual(sanitizeCoord('abc'), '');
  assert.strictEqual(sanitizeCoord('12.34.56'), '');
});

test('sanitizeCoord enforces length limit', () => {
  assert.strictEqual(sanitizeCoord('1234567890123456789012345'), '12345678901234567890');
});
