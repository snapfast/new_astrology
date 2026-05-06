import { test } from 'node:test';
import assert from 'node:assert';
import * as Ast from 'astronomy-engine';
import { getMeanRahu, calculateVimshottariDasha } from './astrology.ts';

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

test('calculateVimshottariDasha basic structure', () => {
  const moonLongitude = 306.475; // Approx Aquarius 6.475
  const birthDate = new Date('1990-01-01T12:00:00Z');

  const result = calculateVimshottariDasha(moonLongitude, birthDate);

  assert.strictEqual(result.length, 9, 'Should have 9 Mahadashas');

  const now = new Date();
  const currentMahadasha = result.find(d => now >= d.start && now < d.end);
  assert.ok(currentMahadasha, 'Should have a current dasha based on dates');

  // Verify hierarchical layers exist on the current dasha
  assert.ok(currentMahadasha.antardashas, 'Current dasha should have antardashas');

  const currentAntar = currentMahadasha.antardashas.find(a => now >= a.start && now < a.end);
  assert.ok(currentAntar, 'Should have a current antardasha');
  assert.ok(currentAntar.pratyantardashas, 'Current antardasha should have pratyantardashas');

  const currentPratyantar = currentAntar.pratyantardashas.find(p => now >= p.start && now < p.end);
  assert.ok(currentPratyantar, 'Should have a current pratyantardasha');
  assert.ok(currentPratyantar.sookshmaDashas, 'Current pratyantardasha should have sookshmaDashas');

  const currentSookshma = currentPratyantar.sookshmaDashas.find(s => now >= s.start && now < s.end);
  assert.ok(currentSookshma, 'Should have a current sookshmadasha');
});

test('calculateVimshottariDasha balance of dasha', () => {
  // Dhanishta (Moon in 23.33 to 36.66 of Capricorn-Aquarius or 293.33 to 306.66 total)
  // Let's pick something near the end of Dhanishta (Mars dasha)
  const moonLongitude = 306.0;
  const birthDate = new Date('1990-01-01T12:00:00Z');

  const result = calculateVimshottariDasha(moonLongitude, birthDate);

  // Mars should be the first dasha
  assert.strictEqual(result[0].lord, 'Mars');

  // Since it's near the end, Mars dasha should end soon after birth
  const marsEnd = new Date(result[0].end);
  const diffYears = (marsEnd.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

  // Total Mars dasha is 7 years. 306 is near 306.66.
  assert.ok(diffYears < 1.0, 'Mars dasha should be nearly finished');
});
