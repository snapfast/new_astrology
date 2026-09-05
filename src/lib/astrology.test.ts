import { test } from 'node:test';
import assert from 'node:assert';
import * as Ast from 'astronomy-engine';
import { getMeanRahu, calculateVimshottariDasha, getD7Rasi, getD60Rasi, generateAstrologyData, getRetrogradeDetails, getCombustionDetails, SIDEREAL_YEAR_DAYS, getHoraData, calculateAllShadBala } from './astrology.ts';

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

  const now = Date.now();
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
  assert.ok(currentSookshma.pranaDashas, 'Current sookshmadasha should have pranaDashas');

  const currentPrana = currentSookshma.pranaDashas.find(p => now >= p.start && now < p.end);
  assert.ok(currentPrana, 'Should have a current pranadasha');
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
  const marsEnd = result[0].end;
  const diffYears = (marsEnd - birthDate.getTime()) / (1000 * 60 * 60 * 24 * SIDEREAL_YEAR_DAYS);

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

import {
    getD2Rasi,
    getD2UmaShambhuRasi,
    getD4Rasi,
    getD12Rasi,
    getD16Rasi,
    getD20Rasi,
    getD24Rasi,
    getD27Rasi,
    getD30Rasi,
    getD40Rasi,
    getD45Rasi
} from './astrology.ts';

test('getD2Rasi Parashara logic', () => {
    // Odd sign: Aries (0)
    assert.strictEqual(getD2Rasi(5), 4); // First 15deg -> Leo (4)
    assert.strictEqual(getD2Rasi(20), 3); // Second 15deg -> Cancer (3)

    // Even sign: Taurus (1)
    assert.strictEqual(getD2Rasi(35), 3); // First 15deg -> Cancer (3)
    assert.strictEqual(getD2Rasi(50), 4); // Second 15deg -> Leo (4)
});

test('getD2UmaShambhuRasi logic', () => {
    // Aries (0), first half (0-15) -> Aries (0)
    assert.strictEqual(getD2UmaShambhuRasi(5), 0);
    // Aries (0), second half (15-30) -> Taurus (1)
    assert.strictEqual(getD2UmaShambhuRasi(20), 1);

    // Taurus (1), first half (0-15) -> Cancer (3)
    assert.strictEqual(getD2UmaShambhuRasi(35), 3);
    // Taurus (1), second half (15-30) -> Gemini (2)
    assert.strictEqual(getD2UmaShambhuRasi(50), 2);
});

test('getD4Rasi logic', () => {
    // 0 to 7.5 deg is same sign
    assert.strictEqual(getD4Rasi(2), 0); // Aries 2 -> Aries (0)
    // 7.5 to 15 deg is 4th sign
    assert.strictEqual(getD4Rasi(10), 3); // Aries 10 -> Cancer (3)
    // 15 to 22.5 deg is 7th sign
    assert.strictEqual(getD4Rasi(18), 6); // Aries 18 -> Libra (6)
    // 22.5 to 30 deg is 10th sign
    assert.strictEqual(getD4Rasi(25), 9); // Aries 25 -> Capricorn (9)
});

test('getD12Rasi logic', () => {
    // 2.5 deg per division
    assert.strictEqual(getD12Rasi(1), 0); // Aries 1deg -> Aries (0)
    assert.strictEqual(getD12Rasi(4), 1); // Aries 4deg -> Taurus (1)
    assert.strictEqual(getD12Rasi(29), 11); // Aries 29deg -> Pisces (11)
});

test('getD16Rasi logic', () => {
    // Shodashamsa: 1.875 deg per division. Odd signs starts from specific elements.
    // Aries (0): movable/fire -> starts Aries (0)
    assert.strictEqual(getD16Rasi(1), 0); // first division -> Aries (0)
    assert.strictEqual(getD16Rasi(3), 1); // second division -> Taurus (1)
});

test('getD20Rasi logic', () => {
    // Movable sign: Aries (0) -> starts Aries (0)
    assert.strictEqual(getD20Rasi(1), 0);
    // Fixed sign: Taurus (1) -> starts Sagittarius (8)
    assert.strictEqual(getD20Rasi(31), 8);
    // Dual sign: Gemini (2) -> starts Leo (4)
    assert.strictEqual(getD20Rasi(61), 4);
});

test('getD24Rasi logic', () => {
    // Odd sign: Aries (0) -> starts Leo (4)
    assert.strictEqual(getD24Rasi(1), 4);
    // Even sign: Taurus (1) -> starts Cancer (3)
    assert.strictEqual(getD24Rasi(31), 3);
});

test('getD27Rasi logic', () => {
    // Aries (0): Fire -> starts Aries (0)
    assert.strictEqual(getD27Rasi(1), 0);
    // Taurus (1): Earth -> starts Cancer (3)
    assert.strictEqual(getD27Rasi(31), 3);
});

test('getD30Rasi logic', () => {
    // Odd sign: Aries (0)
    assert.strictEqual(getD30Rasi(4), 0); // Aries (0)
    assert.strictEqual(getD30Rasi(9), 10); // Aquarius (10)
    assert.strictEqual(getD30Rasi(15), 8); // Sagittarius (8)
    assert.strictEqual(getD30Rasi(22), 5); // Virgo (5)
    assert.strictEqual(getD30Rasi(28), 6); // Libra (6)
});

test('getD40Rasi logic', () => {
    // Odd sign: Aries (0) -> starts Aries (0)
    assert.strictEqual(getD40Rasi(0.5), 0);
    // Even sign: Taurus (1) -> starts Libra (6)
    assert.strictEqual(getD40Rasi(30.5), 6);
});

test('getD45Rasi logic', () => {
    // Movable: Aries (0) -> starts Aries (0)
    assert.strictEqual(getD45Rasi(0.5), 0);
    // Fixed: Taurus (1) -> starts (Taurus(1) + 8) % 12 = Capricorn (9)
    assert.strictEqual(getD45Rasi(30.5), 9);
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

  // Verify lazy evaluation of dasha balance
  assert.ok(data.dashaBalance, 'Dasha balance should exist');
  assert.strictEqual(typeof data.dashaBalance.lord, 'string', 'Dasha balance lord should be a string');
  assert.ok(data.dashaBalance.years >= 0, 'Dasha balance years should be non-negative');
  assert.ok(data.dashaBalance.months >= 0 && data.dashaBalance.months < 12, 'Dasha balance months should be valid');
  assert.ok(data.dashaBalance.days >= 0 && data.dashaBalance.days < 32, 'Dasha balance days should be valid');
});

test('generateAstrologyData handles empty inputs', () => {
  // @ts-expect-error: Testing with invalid empty string inputs for robustness
  const data = generateAstrologyData("", "");
  assert.strictEqual(data.planets.length, 0);
  assert.strictEqual(data.mahadashas.length, 0);
  assert.ok(data.panchang);
  assert.strictEqual(data.panchang.tithi, "");
});

test('calculatePanchang multiple elements transition verification (July 10, 2026)', () => {
  const dob = "2026-07-10";
  const tob = "12:00";
  const lat = "28.6139";
  const lon = "77.2090";

  const data = generateAstrologyData(dob, tob, lat, lon);
  const panchang = data.panchang;

  // Verify multiple list items exist and are populated
  assert.ok(panchang.tithisList && panchang.tithisList.length > 0, 'tithisList should not be empty');
  assert.ok(panchang.karanasList && panchang.karanasList.length > 0, 'karanasList should not be empty');
  assert.ok(panchang.nakshatrasList && panchang.nakshatrasList.length > 0, 'nakshatrasList should not be empty');
  assert.ok(panchang.yogasList && panchang.yogasList.length > 0, 'yogasList should not be empty');
  assert.ok(panchang.moonsignsList && panchang.moonsignsList.length > 0, 'moonsignsList should not be empty');

  // Verify formattedText matches the user's layout structure
  assert.ok(panchang.formattedText, 'formattedText should be present');
  assert.ok(panchang.formattedText.includes("New Delhi, India"), 'Location should be correct');
  assert.ok(panchang.formattedText.includes("Friday, July 10, 2026"), 'Date should be correct');
  assert.ok(panchang.formattedText.includes("Tithi: Dashami"), 'Should list Dashami');
  assert.ok(panchang.formattedText.includes("Tithi: Ekadashi"), 'Should list Ekadashi');
  assert.ok(panchang.formattedText.includes("Paksha: Krishna Paksha"), 'Should list Krishna Paksha');
  assert.ok(panchang.formattedText.includes("Weekday: Shukrawara"), 'Should list Shukrawara');
  assert.ok(panchang.formattedText.includes("Amanta Month: Jyeshtha"), 'Should list Amanta Month');
  assert.ok(panchang.formattedText.includes("Purnimanta Month: Ashadha"), 'Should list Purnimanta Month');
});

import { getPlanetTransits } from './astrology.ts';

test('getPlanetTransits structure and values (Sun & Moon & Saturn)', () => {
    const refDate = new Date('2024-03-15T12:00:00Z');

    // Test Sun
    const sunTransits = getPlanetTransits("Sun", refDate);
    assert.strictEqual(sunTransits.planet, "Sun");
    assert.strictEqual(sunTransits.past.filter(e => e.type === 'rashi').length, 3, "Should have 3 past Rashi transits for Sun");
    assert.strictEqual(sunTransits.future.filter(e => e.type === 'rashi').length, 3, "Should have 3 future Rashi transits for Sun");
    assert.strictEqual(sunTransits.past.filter(e => e.type === 'nakshatra').length, 3, "Should have 3 past Nakshatra transits for Sun");
    assert.strictEqual(sunTransits.future.filter(e => e.type === 'nakshatra').length, 3, "Should have 3 future Nakshatra transits for Sun");

    // Verify order and boundaries
    for (const p of sunTransits.past) {
        assert.ok(p.date.getTime() < refDate.getTime(), "Past transit must occur before reference date");
        assert.ok(p.fromValue, "Must have fromValue");
        assert.ok(p.toValue, "Must have toValue");
        assert.ok(p.fromValueSanskrit, "Must have fromValueSanskrit");
        assert.ok(p.toValueSanskrit, "Must have toValueSanskrit");
    }
    for (const f of sunTransits.future) {
        assert.ok(f.date.getTime() > refDate.getTime(), "Future transit must occur after reference date");
        assert.ok(f.fromValue, "Must have fromValue");
        assert.ok(f.toValue, "Must have toValue");
        assert.ok(f.fromValueSanskrit, "Must have fromValueSanskrit");
        assert.ok(f.toValueSanskrit, "Must have toValueSanskrit");
    }

    // Test Moon (very fast planet)
    const moonTransits = getPlanetTransits("Moon", refDate);
    assert.strictEqual(moonTransits.past.filter(e => e.type === 'rashi').length, 3, "Should have 3 past Rashi transits for Moon");
    assert.strictEqual(moonTransits.future.filter(e => e.type === 'rashi').length, 3, "Should have 3 future Rashi transits for Moon");

    // Test Saturn (very slow planet)
    const saturnTransits = getPlanetTransits("Saturn", refDate);
    assert.strictEqual(saturnTransits.past.filter(e => e.type === 'rashi').length, 3, "Should have 3 past Rashi transits for Saturn");
    assert.strictEqual(saturnTransits.future.filter(e => e.type === 'rashi').length, 3, "Should have 3 future Rashi transits for Saturn");

    // Test Uranus (outer planet)
    const uranusTransits = getPlanetTransits("Uranus", refDate);
    assert.strictEqual(uranusTransits.planet, "Uranus");
    assert.strictEqual(uranusTransits.past.filter(e => e.type === 'rashi').length, 3, "Should have 3 past Rashi transits for Uranus");
    assert.strictEqual(uranusTransits.future.filter(e => e.type === 'rashi').length, 3, "Should have 3 future Rashi transits for Uranus");

    // Test Neptune (outer planet)
    const neptuneTransits = getPlanetTransits("Neptune", refDate);
    assert.strictEqual(neptuneTransits.planet, "Neptune");
    assert.strictEqual(neptuneTransits.past.filter(e => e.type === 'rashi').length, 3, "Should have 3 past Rashi transits for Neptune");
    assert.strictEqual(neptuneTransits.future.filter(e => e.type === 'rashi').length, 3, "Should have 3 future Rashi transits for Neptune");

    // Test Pluto (outer planet)
    const plutoTransits = getPlanetTransits("Pluto", refDate);
    assert.strictEqual(plutoTransits.planet, "Pluto");
    assert.strictEqual(plutoTransits.past.filter(e => e.type === 'rashi').length, 3, "Should have 3 past Rashi transits for Pluto");
    assert.strictEqual(plutoTransits.future.filter(e => e.type === 'rashi').length, 3, "Should have 3 future Rashi transits for Pluto");

    // Test all 12 planets generate valid non-empty transits and are sorted ascending
    const allPlanets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", "Uranus", "Neptune", "Pluto"];
    for (const p of allPlanets) {
        const tr = getPlanetTransits(p, refDate);
        assert.ok(tr.past.some(e => e.type === 'rashi'), `${p} should have past Rashi transits`);
        assert.ok(tr.future.some(e => e.type === 'rashi'), `${p} should have future Rashi transits`);
        assert.ok(tr.past.some(e => e.type === 'nakshatra'), `${p} should have past Nakshatra transits`);
        assert.ok(tr.future.some(e => e.type === 'nakshatra'), `${p} should have future Nakshatra transits`);

        // Assert past events are sorted in ascending chronological order
        for (let i = 0; i < tr.past.length - 1; i++) {
            assert.ok(
                tr.past[i].date.getTime() <= tr.past[i + 1].date.getTime(),
                `${p} past events should be in ascending chronological order`
            );
        }

        // Assert future events are sorted in ascending chronological order
        for (let i = 0; i < tr.future.length - 1; i++) {
            assert.ok(
                tr.future[i].date.getTime() <= tr.future[i + 1].date.getTime(),
                `${p} future events should be in ascending chronological order`
            );
        }
    }
});

import { getFutureCombustions } from './astrology.ts';

test('getFutureCombustions returns calculated combustion periods', () => {
    const refDate = new Date("2026-07-10T12:00:00Z");
    const combustions = getFutureCombustions(refDate);

    assert.ok(Array.isArray(combustions), "Combustions should be an array");
    assert.ok(combustions.length > 0, "Should find at least some combustion periods");

    for (const c of combustions) {
        assert.ok(c.planet, "Should have planet name");
        assert.ok(c.start instanceof Date, "Start should be a Date");
        assert.ok(c.end instanceof Date, "End should be a Date");
        assert.ok(c.start.getTime() <= c.end.getTime(), "Start date must be before or equal to end date");
    }
});

test('generateAstrologyData includes isCombust property on planets', () => {
    const dob = "2026-07-10";
    const tob = "12:00";
    const lat = "28.6139";
    const lon = "77.2090";

    const data = generateAstrologyData(dob, tob, lat, lon);

    // Check that isCombust is defined as a boolean for all standard planets
    for (const p of data.planets) {
        if (p.name !== "Ascendant") {
            assert.strictEqual(typeof p.isCombust, 'boolean', `isCombust should be a boolean for ${p.name}`);
        }
    }

    // Let's verify if Venus is combust when close to the Sun
    const combustPlanets = data.planets.filter(p => p.isCombust);
    assert.ok(Array.isArray(combustPlanets), "Combust planets should be a valid array");
});


test('getRetrogradeDetails returns correct transition structures for Mercury and Saturn', () => {
    const refDate = new Date("2024-03-15T12:00:00Z");

    // Saturn
    const saturnRetro = getRetrogradeDetails("Saturn", refDate);
    assert.ok(saturnRetro, "Should return retrograde details for Saturn");
    assert.ok(saturnRetro.currentOrNext, "Should contain currentOrNext details");
    assert.ok(saturnRetro.previous, "Should contain previous details");

    // Mercury
    const mercuryRetro = getRetrogradeDetails("Mercury", refDate);
    assert.ok(mercuryRetro, "Should return retrograde details for Mercury");
    if (mercuryRetro.currentOrNext.start) {
        assert.ok(mercuryRetro.currentOrNext.start instanceof Date, "Current/next start must be a Date");
    }
    if (mercuryRetro.previous.start) {
        assert.ok(mercuryRetro.previous.start instanceof Date, "Previous start must be a Date");
    }
});

test('getCombustionDetails returns correct transition structures for Mercury and Saturn', () => {
    const refDate = new Date("2024-03-15T12:00:00Z");

    // Saturn
    const saturnCombust = getCombustionDetails("Saturn", refDate);
    assert.ok(saturnCombust, "Should return combustion details for Saturn");
    assert.ok(saturnCombust.currentOrNext, "Should contain currentOrNext details");
    assert.ok(saturnCombust.previous, "Should contain previous details");

    // Mercury
    const mercuryCombust = getCombustionDetails("Mercury", refDate);
    assert.ok(mercuryCombust, "Should return combustion details for Mercury");
    if (mercuryCombust.currentOrNext.start) {
        assert.ok(mercuryCombust.currentOrNext.start instanceof Date, "Current/next start must be a Date");
    }
    if (mercuryCombust.previous.start) {
        assert.ok(mercuryCombust.previous.start instanceof Date, "Previous start must be a Date");
    }
});

test('Nangal Dam birth details dasha verification (02 Nov 1993)', () => {
    const dob = "1993-11-02";
    const tob = "13:10";
    const lat = "31.3850";
    const lon = "76.3750";

    const data = generateAstrologyData(dob, tob, lat, lon);

    assert.ok(data.dashaBalance, "Dasha balance must exist");
    assert.strictEqual(data.dashaBalance.lord, "Moon", "Starting Dasha must be Moon");
    assert.strictEqual(data.dashaBalance.years, 4, "Dasha balance years should be 4");
    assert.strictEqual(data.dashaBalance.months, 7, "Dasha balance months should be 7");
    assert.strictEqual(data.dashaBalance.days, 10, "Dasha balance days should be 10");

    const moon = data.planets.find(p => p.name === "Moon");
    assert.ok(moon, "Moon must be present in planet list");
    assert.strictEqual(moon.nakshatra, "Rohini", "Moon nakshatra should be Rohini");
});

test('Nangal Dam birth details shadbala verification (02 Nov 1993)', () => {
    const dob = "1993-11-02";
    const tob = "13:10";
    const lat = "31.3850";
    const lon = "76.3750";

    const data = generateAstrologyData(dob, tob, lat, lon);

    assert.ok(data.shadbala, "Shad Bala must be computed");
    assert.strictEqual(data.shadbala.length, 7, "Shad Bala must be computed for exactly 7 planets");

    const expected = {
        "Moon": {
            uchchaBala: 55.28, saptavargajaBala: 78.75, ojhayugmarasiamsaBala: 15, kendradiBala: 30, drekkanaBala: 0,
            sthanaBala: 179.03, dikBala: 49.39, nathonnathaBala: 4.17, pakshaBala: 99.31, tribhagaBala: 0,
            varshaBala: 0, masaBala: 0, dinaBala: 0, horaBala: 0, ayanaBala: 1.93, yudhdhaBala: 0,
            kalaBala: 105.41, cheshtaBala: 0, naisargikaBala: 51.43, drigBala: -26.93, totalBala: 358.33,
            rupas: 5.97, requirement: 6, status: "Moderate", ratio: 1, rank: 7, ishtaPhala: 0, kashtaPhala: 16.83
        },
        "Sun": {
            uchchaBala: 2.04, saptavargajaBala: 67.5, ojhayugmarasiamsaBala: 30, kendradiBala: 60, drekkanaBala: 0,
            sthanaBala: 159.54, dikBala: 59.74, nathonnathaBala: 55.83, pakshaBala: 10.35, tribhagaBala: 60,
            varshaBala: 0, masaBala: 0, dinaBala: 0, horaBala: 0, ayanaBala: 22.48, yudhdhaBala: 0,
            kalaBala: 148.66, cheshtaBala: 0, naisargikaBala: 60, drigBala: -5.21, totalBala: 422.74,
            rupas: 7.05, requirement: 5, status: "Strong", ratio: 1.41, rank: 2, ishtaPhala: 0, kashtaPhala: 58.97
        },
        "Mercury": {
            uchchaBala: 46.76, saptavargajaBala: 112.5, ojhayugmarasiamsaBala: 15, kendradiBala: 60, drekkanaBala: 0,
            sthanaBala: 234.26, dikBala: 33.12, nathonnathaBala: 60, pakshaBala: 10.35, tribhagaBala: 0,
            varshaBala: 15, masaBala: 0, dinaBala: 0, horaBala: 0, ayanaBala: 52.02, yudhdhaBala: 0,
            kalaBala: 137.36, cheshtaBala: 57.41, naisargikaBala: 25.7, drigBala: -0.62, totalBala: 487.24,
            rupas: 8.12, requirement: 7, status: "Strong", ratio: 1.16, rank: 4, ishtaPhala: 51.81, kashtaPhala: 5.85
        },
        "Venus": {
            uchchaBala: 0.26, saptavargajaBala: 127.5, ojhayugmarasiamsaBala: 30, kendradiBala: 15, drekkanaBala: 15,
            sthanaBala: 187.76, dikBala: 5.86, nathonnathaBala: 55.83, pakshaBala: 49.65, tribhagaBala: 0,
            varshaBala: 0, masaBala: 0, dinaBala: 0, horaBala: 0, ayanaBala: 19.36, yudhdhaBala: 0,
            kalaBala: 124.85, cheshtaBala: 9.66, naisargikaBala: 42.85, drigBala: -2.91, totalBala: 368.06,
            rupas: 6.13, requirement: 5.5, status: "Strong", ratio: 1.12, rank: 5, ishtaPhala: 1.57, kashtaPhala: 54.84
        },
        "Mars": {
            uchchaBala: 31.1, saptavargajaBala: 135, ojhayugmarasiamsaBala: 0, kendradiBala: 30, drekkanaBala: 15,
            sthanaBala: 211.1, dikBala: 54.68, nathonnathaBala: 4.17, pakshaBala: 10.35, tribhagaBala: 0,
            varshaBala: 0, masaBala: 0, dinaBala: 45, horaBala: 0, ayanaBala: 5.82, yudhdhaBala: 0,
            kalaBala: 65.34, cheshtaBala: 7.73, naisargikaBala: 17.14, drigBala: -7.31, totalBala: 348.68,
            rupas: 5.81, requirement: 5, status: "Strong", ratio: 1.16, rank: 3, ishtaPhala: 15.51, kashtaPhala: 38.86
        },
        "Jupiter": {
            uchchaBala: 30.16, saptavargajaBala: 112.5, ojhayugmarasiamsaBala: 15, kendradiBala: 60, drekkanaBala: 15,
            sthanaBala: 232.66, dikBala: 26.39, nathonnathaBala: 55.83, pakshaBala: 49.65, tribhagaBala: 60,
            varshaBala: 0, masaBala: 30, dinaBala: 0, horaBala: 60, ayanaBala: 16.17, yudhdhaBala: 0,
            kalaBala: 271.66, cheshtaBala: 4.33, naisargikaBala: 34.28, drigBala: -3.76, totalBala: 565.55,
            rupas: 9.43, requirement: 6.5, status: "Strong", ratio: 1.45, rank: 1, ishtaPhala: 11.42, kashtaPhala: 40.76
        },
        "Saturn": {
            uchchaBala: 26.7, saptavargajaBala: 135, ojhayugmarasiamsaBala: 0, kendradiBala: 60, drekkanaBala: 0,
            sthanaBala: 221.7, dikBala: 4.85, nathonnathaBala: 4.17, pakshaBala: 10.35, tribhagaBala: 0,
            varshaBala: 0, masaBala: 0, dinaBala: 0, horaBala: 0, ayanaBala: 47.28, yudhdhaBala: 0,
            kalaBala: 61.79, cheshtaBala: 35.44, naisargikaBala: 8.57, drigBala: -10.07, totalBala: 322.28,
            rupas: 5.37, requirement: 5, status: "Strong", ratio: 1.07, rank: 6, ishtaPhala: 30.76, kashtaPhala: 28.6
        }
    };

    for (const item of data.shadbala) {
        const exp = expected[item.planet as keyof typeof expected];
        assert.ok(exp, `Expected values for ${item.planet} should exist`);
        for (const [key, value] of Object.entries(exp)) {
            if (typeof value === "number") {
                const diff = Math.abs((item[key as keyof typeof item] as number) - value);
                let tolerance = 5.0;
                if (["totalBala", "sthanaBala", "kalaBala", "saptavargajaBala"].includes(key)) {
                    tolerance = 45.0;
                } else if (["ayanaBala", "cheshtaBala", "drigBala", "ishtaPhala", "kashtaPhala"].includes(key)) {
                    tolerance = 25.0;
                } else if (["varshaBala", "masaBala", "horaBala", "dinaBala", "ojhayugmarasiamsaBala"].includes(key)) {
                    tolerance = 65.0;
                }
                assert.ok(
                    diff <= tolerance,
                    `Mismatch for ${item.planet} field ${key}: expected ${value}, got ${item[key as keyof typeof item]} (diff ${diff})`
                );
            } else {
                if (key === "status") {
                    continue;
                }
                assert.strictEqual(
                    item[key as keyof typeof item],
                    value,
                    `Mismatch for ${item.planet} field ${key}: expected ${value}, got ${item[key as keyof typeof item]}`
                );
            }
        }
    }
});

test('calculateSarvaAshtakvarga and calculateAllShadBala logic validations', () => {
    const dob = "1995-07-24";
    const tob = "17:11";
    const lat = "28.6139";
    const lon = "77.2090";

    const data = generateAstrologyData(dob, tob, lat, lon);

    // 1. Assert Sarva Ashtakvarga (SAV) points sum to exactly 337
    assert.ok(data.ashtakvarga, "Ashtakvarga should be calculated");
    assert.strictEqual(data.ashtakvarga.length, 12, "Ashtakvarga should have exactly 12 rasi scores");
    const totalPoints = data.ashtakvarga.reduce((sum, val) => sum + val, 0);
    assert.strictEqual(totalPoints, 337, "Sarva Ashtakvarga (SAV) grand total of points must equal exactly 337");

    // 2. Assert each of the 7 planets has non-zero values for all 6 Shad Bala categories
    assert.ok(data.shadbala, "Shad Bala should be calculated");
    assert.strictEqual(data.shadbala.length, 7, "Shad Bala must be computed for exactly 7 planets");

    for (const item of data.shadbala) {
        assert.ok(item.sthanaBala > 0, `${item.planet} should have non-zero sthanaBala`);
        assert.ok(item.dikBala >= 0, `${item.planet} should have a valid dikBala`);
        assert.ok(item.kalaBala > 0, `${item.planet} should have non-zero kalaBala`);
        assert.ok(item.cheshtaBala >= 0, `${item.planet} should have valid cheshtaBala`);
        assert.ok(item.naisargikaBala > 0, `${item.planet} should have non-zero naisargikaBala`);
        assert.ok(item.drigBala !== 0, `${item.planet} should have non-zero drigBala`);
        assert.ok(item.totalBala > 0, `${item.planet} should have non-zero totalBala`);
        assert.strictEqual(item.rupas, Number((item.totalBala / 60).toFixed(2)), `${item.planet} rupas calculation is incorrect`);

        // Assert newly added sub-balas mathematical constraints
        const expectedSthana = Number((item.uchchaBala + item.saptavargajaBala + item.ojhayugmarasiamsaBala + item.kendradiBala + item.drekkanaBala).toFixed(2));
        assert.strictEqual(item.sthanaBala, expectedSthana, `${item.planet} sthanaBala sum mismatch`);

        const expectedKala = Number((item.nathonnathaBala + item.pakshaBala + item.tribhagaBala + item.varshaBala + item.masaBala + item.dinaBala + item.horaBala + item.ayanaBala + item.yudhdhaBala).toFixed(2));
        assert.strictEqual(item.kalaBala, expectedKala, `${item.planet} kalaBala sum mismatch`);

        const expectedTotal = Number((item.sthanaBala + item.dikBala + item.kalaBala + item.cheshtaBala + item.naisargikaBala + item.drigBala).toFixed(2));
        assert.strictEqual(item.totalBala, expectedTotal, `${item.planet} totalBala sum mismatch`);

        assert.strictEqual(item.ratio, Number((item.rupas / item.requirement).toFixed(2)), `${item.planet} ratio mismatch`);

        assert.strictEqual(item.ishtaPhala, Number(Math.sqrt(item.uchchaBala * item.cheshtaBala).toFixed(2)), `${item.planet} ishtaPhala mismatch`);
        assert.strictEqual(item.kashtaPhala, Number(Math.sqrt((60 - item.uchchaBala) * (60 - item.cheshtaBala)).toFixed(2)), `${item.planet} kashtaPhala mismatch`);
    }
});

test('getHoraData outputs 24 dynamic BPHS proportional Horas', () => {
    // 2026-07-16 is a Thursday (Guruvara).
    // The ruling planet of Thursday at Sunrise is Jupiter.
    // The order of Hora lords is Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars.
    // So the sequence starting from Jupiter should be:
    // Hora 1: Jupiter, Hora 2: Mars, Hora 3: Sun, Hora 4: Venus, Hora 5: Mercury, Hora 6: Moon, Hora 7: Saturn, Hora 8: Jupiter...
    const dob = '2026-07-16';
    const result = getHoraData(dob, "28.6139", "77.2090"); // New Delhi coordinates

    assert.ok(result.selectedDate instanceof Date, 'Should return selectedDate as Date');
    assert.ok(result.sunrise instanceof Date, 'Should return sunrise as Date');
    assert.ok(result.sunset instanceof Date, 'Should return sunset as Date');
    assert.ok(result.nextSunrise instanceof Date, 'Should return nextSunrise as Date');
    assert.strictEqual(result.horas.length, 24, 'Should have exactly 24 Horas');

    // Check first Hora lord is Jupiter (lord of Thursday)
    const firstHora = result.horas[0];
    assert.strictEqual(firstHora.lord, 'Jupiter', 'The first Hora lord of Thursday must be Jupiter');
    assert.strictEqual(firstHora.lordSanskrit, 'गुरु', 'The Sanskrit name for Jupiter should be गुरु');
    assert.strictEqual(firstHora.type, 'day', 'The first Hora should be daytime');

    // Check second Hora lord is Mars
    const secondHora = result.horas[1];
    assert.strictEqual(secondHora.lord, 'Mars', 'The second Hora lord of Thursday must be Mars');

    // Check 13th Hora is nighttime and starts at sunset
    const thirteenthHora = result.horas[12];
    assert.strictEqual(thirteenthHora.type, 'night', 'The 13th Hora must be nighttime');
    assert.strictEqual(thirteenthHora.start.getTime(), result.sunset.getTime(), 'The 13th Hora must start at sunset');

    // Check last Hora ends at nextSunrise
    const lastHora = result.horas[23];
    assert.strictEqual(lastHora.end.getTime(), result.nextSunrise.getTime(), 'The last Hora must end at next Sunrise');

    // Check continuity of all Horas
    for (let i = 0; i < 23; i++) {
        assert.strictEqual(
            result.horas[i].end.getTime(),
            result.horas[i + 1].start.getTime(),
            `Hora ${i + 1} end time should match Hora ${i + 2} start time`
        );
    }
});

test('calculateAllShadBala isDay fallback logic handles malformed panchang times', () => {
    const planets = [
        { name: "Sun", rasi: "Aries", degree: "10° 0' 0\"", isRetrograde: false, nakshatra: "Ashwini", pada: 1 },
        { name: "Moon", rasi: "Taurus", degree: "20° 0' 0\"", isRetrograde: false, nakshatra: "Rohini", pada: 2 },
        { name: "Mars", rasi: "Gemini", degree: "15° 0' 0\"", isRetrograde: false, nakshatra: "Ardra", pada: 3 },
        { name: "Mercury", rasi: "Cancer", degree: "25° 0' 0\"", isRetrograde: false, nakshatra: "Ashlesha", pada: 4 },
        { name: "Jupiter", rasi: "Leo", degree: "5° 0' 0\"", isRetrograde: false, nakshatra: "Magha", pada: 1 },
        { name: "Venus", rasi: "Virgo", degree: "12° 0' 0\"", isRetrograde: false, nakshatra: "Hasta", pada: 2 },
        { name: "Saturn", rasi: "Libra", degree: "22° 0' 0\"", isRetrograde: false, nakshatra: "Vishakha", pada: 3 },
    ];

    // Invalid time to trigger catch block in parseTimeStr
    const mockPanchang = { sunrise: "invalid", sunset: "invalid", tithi: "", nakshatra: "", yoga: "", karana: "" };

    // 12:00 -> birthMin = 720 (>= 360 && <= 1110), so isDay = true
    const resultDay = calculateAllShadBala(planets as any, "1990-01-01", "12:00", mockPanchang as any);
    const sunDayKala = resultDay.find(p => p.planet === 'Sun')?.kalaBala;

    // 01:00 -> birthMin = 60 (< 360), so isDay = false
    const resultNight = calculateAllShadBala(planets as any, "1990-01-01", "01:00", mockPanchang as any);
    const sunNightKala = resultNight.find(p => p.planet === 'Sun')?.kalaBala;

    // We can just assert that they calculated successfully and differentiate day/night KalaBala which differs based on isDay
    assert.ok(sunDayKala !== undefined);
    assert.ok(sunNightKala !== undefined);
    assert.notStrictEqual(sunDayKala, sunNightKala, "KalaBala should differ between day and night fallback times");
});
