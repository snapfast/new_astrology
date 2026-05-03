import { test } from 'node:test';
import assert from 'node:assert';
import * as Ast from 'astronomy-engine';
import { getMeanRahu } from './astrology.js';

test('getMeanRahu at J2000.0 TT', () => {
    // We want T=0 exactly. In astronomy-engine, time.tt is days from J2000 TT.
    // So we can try to find a time where tt is 0.
    // Or we just use a known date and calculate expected using the same T.

    // Using a value that should result in T=0 if we could pass it.
    // Since we can only create AstroTime from Date or number (ut),
    // it's easier to just calculate expected based on the resulting T.

    const date = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
    const time = Ast.MakeTime(date);
    const T = time.tt / 36525.0;

    const L = 125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + T * T * T / 467441.0 - T * T * T * T / 60616000.0;
    const expected = (L % 360 + 360) % 360;

    const rahu = getMeanRahu(time);

    assert.ok(Math.abs(rahu - expected) < 1e-10, `Expected ${expected}, got ${rahu}`);
});

test('getMeanRahu at another date (2024)', () => {
    // 2024-01-01 00:00:00 UTC
    const date = new Date(Date.UTC(2024, 0, 1, 0, 0, 0));
    const time = Ast.MakeTime(date);
    const T = time.tt / 36525.0;

    const L = 125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + T * T * T / 467441.0 - T * T * T * T / 60616000.0;
    const expected = (L % 360 + 360) % 360;

    const rahu = getMeanRahu(time);

    assert.ok(Math.abs(rahu - expected) < 1e-10, `Expected ${expected}, got ${rahu}`);
});

test('getMeanRahu modulo 360', () => {
    // Test with a date far in the past to ensure modulo works for negative values
    const date = new Date(Date.UTC(1800, 0, 1, 0, 0, 0));
    const time = Ast.MakeTime(date);
    const rahu = getMeanRahu(time);

    assert.ok(rahu >= 0 && rahu < 360, `Rahu should be in [0, 360), got ${rahu}`);
});
