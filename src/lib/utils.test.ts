import { describe, it } from 'node:test';
import assert from 'node:assert';
import { cn } from './utils.ts';

describe('utils', () => {
  describe('cn', () => {
    it('merges basic classes', () => {
      assert.strictEqual(cn('foo', 'bar'), 'foo bar');
    });

    it('merges tailwind classes and resolves conflicts', () => {
      assert.strictEqual(cn('p-4 text-red-500', 'p-8'), 'text-red-500 p-8');
    });

    it('handles conditional classes', () => {
      assert.strictEqual(cn('foo', true && 'bar', false && 'baz', null, undefined), 'foo bar');
    });

    it('handles arrays and objects', () => {
      assert.strictEqual(cn(['foo', 'bar'], { baz: true, qux: false }), 'foo bar baz');
    });
  });
});
