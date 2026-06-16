import { test } from 'node:test';
import assert from 'node:assert';
import * as Ast from 'astronomy-engine';
import { getMeanRahu, calculateVimshottariDasha, getD7Rasi, getD60Rasi, generateAstrologyData } from './astrology.ts';

/**
 * Calculates the expected mean longitude of Rahu based on the formula from Meeus.
 * This is used for verification in tests.
 */
function calculateExpectedRahu(T: number): number {
    const L = 125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + T * T * T / 467441.0 - T * T * T * T / 60616000.0;
    return (L % 360 + 360) % 360;
}

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
    const expected = calculateExpectedRahu(T);

    const rahu = getMeanRahu(time);

    assert.ok(Math.abs(rahu - expected) < 1e-10, `Expected ${expected}, got ${rahu}`);
});

test('getMeanRahu at another date (2024)', () => {
    // 2024-01-01 00:00:00 UTC
    const date = new Date(Date.UTC(2024, 0, 1, 0, 0, 0));
    const time = Ast.MakeTime(date);
    const T = time.tt / 36525.0;
    const expected = calculateExpectedRahu(T);

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

test('getD7Rasi logic', () => {
    // Aries (Odd), 0-4.28 deg -> Aries (0)
    assert.strictEqual(getD7Rasi(2), 0);
    // Aries (Odd), 4.28-8.57 deg -> Taurus (1)
    assert.strictEqual(getD7Rasi(5), 1);

    // Taurus (Even), 0-4.28 deg -> 7th from Taurus = Scorpio (7)
    assert.strictEqual(getD7Rasi(32), 7);
    // Taurus (Even), 4.28-8.57 deg -> 8th from Taurus = Sagittarius (8)
    assert.strictEqual(getD7Rasi(35), 8);
});

test('getD60Rasi logic', () => {
    // 0-0.5 deg in any sign -> sign itself
    // Aries 0.2 -> Aries (0)
    assert.strictEqual(getD60Rasi(0.2), 0);
    // Taurus 0.2 -> Taurus (1)
    assert.strictEqual(getD60Rasi(30.2), 1);

    // 0.5-1.0 deg -> next sign
    // Aries 0.7 -> Taurus (1)
    assert.strictEqual(getD60Rasi(0.7), 1);

    // 29.5-30.0 deg -> 60th division
    // Aries 29.7 -> (0 + 59) % 12 = 59 % 12 = 11 (Pisces)
    assert.strictEqual(getD60Rasi(29.7), 11);
});

test('generateAstrologyData returns complete and valid data structure', () => {
  const dob = "1990-01-01";
  const tob = "12:00";
  const lat = "28.6139";
  const lon = "77.2090";

  const data = generateAstrologyData(dob, tob, lat, lon);

  // Check top-level properties
  assert.ok(Array.isArray(data.planets), 'planets should be an array');
  assert.ok(data.planets.length > 0, 'planets should not be empty');

  assert.ok(data.d1, 'D1 chart should exist');
  assert.ok(data.d9, 'D9 chart should exist');
  assert.ok(data.d60, 'D60 chart should exist');

  assert.ok(Array.isArray(data.mahadashas), 'mahadashas should be an array');
  assert.ok(data.mahadashas.length === 9, 'should have 9 mahadashas');

  assert.ok(data.panchang, 'panchang should exist');
  assert.ok(data.panchang.tithi, 'panchang should have tithi');

  // Check lazy evaluation and data consistency
  const sun = data.planets.find(p => p.name === "Sun");
  assert.ok(sun, 'Sun should be in planets');
  assert.strictEqual(typeof sun.degree, 'string', 'Sun degree should be a string');

  // Verify divisional charts have houses and houseRasis
  assert.ok(data.d1.houses[1], 'D1 should have house 1');
  assert.ok(data.d1.houseRasis[1], 'D1 should have houseRasis for house 1');
});

test('generateAstrologyData handles empty inputs', () => {
  // @ts-ignore
  const data = generateAstrologyData("", "");
  assert.strictEqual(data.planets.length, 0);
  assert.strictEqual(data.mahadashas.length, 0);
  assert.ok(data.panchang);
  assert.strictEqual(data.panchang.tithi, "");
});
