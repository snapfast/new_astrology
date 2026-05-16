import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sanitize, sanitizeCoord } from './security.ts';

describe('Security Utilities', () => {
  describe('sanitize', () => {
    it('should remove potential HTML tags', () => {
      assert.strictEqual(sanitize('<script>alert("xss")</script>', 100), 'scriptalert("xss")/script');
      assert.strictEqual(sanitize('<b>Bold</b>', 10), 'bBold/b');
    });

    it('should enforce maximum length', () => {
      assert.strictEqual(sanitize('This is a very long name that should be truncated', 10), 'This is a ');
    });

    it('should handle null or empty values', () => {
      assert.strictEqual(sanitize(null, 10), '');
      assert.strictEqual(sanitize('', 10), '');
    });

    it('should allow normal characters', () => {
      assert.strictEqual(sanitize('Rahul Bali', 100), 'Rahul Bali');
      assert.strictEqual(sanitize('2025-01-01', 10), '2025-01-01');
    });
  });

  describe('sanitizeCoord', () => {
    it('should allow valid coordinates', () => {
      assert.strictEqual(sanitizeCoord('28.6139'), '28.6139');
      assert.strictEqual(sanitizeCoord('-77.2090'), '-77.2090');
      assert.strictEqual(sanitizeCoord('0'), '0');
    });

    it('should reject non-numeric characters', () => {
      assert.strictEqual(sanitizeCoord('28.6139a'), '');
      assert.strictEqual(sanitizeCoord('12.34.56'), '');
      assert.strictEqual(sanitizeCoord('<script>'), '');
    });

    it('should enforce maximum length of 20', () => {
      const longCoord = '28.61391234567890123456';
      // 20 characters is '28.61391234567890123'
      assert.strictEqual(sanitizeCoord(longCoord), '28.61391234567890123');

      const longNumeric = '123456789012345678901';
      assert.strictEqual(sanitizeCoord(longNumeric), '12345678901234567890');
    });

    it('should handle null or empty values', () => {
      assert.strictEqual(sanitizeCoord(null), '');
      assert.strictEqual(sanitizeCoord(''), '');
    });
  });
});
