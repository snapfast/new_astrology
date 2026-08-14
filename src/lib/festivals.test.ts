import assert from 'node:assert';
import test from 'node:test';
import { generateAstrologyData } from './astrology.ts';
import { getFestivalsForDate, MAJOR_ANNUAL_FESTIVALS } from './festivals.ts';

test('Festivals module - MAJOR_ANNUAL_FESTIVALS sanity check', () => {
  assert.ok(MAJOR_ANNUAL_FESTIVALS.length > 20, 'Should contain major annual Hindu festivals');
  const shivaratri = MAJOR_ANNUAL_FESTIVALS.find(f => f.nameEn.includes('Shivaratri'));
  assert.ok(shivaratri, 'Maha Shivaratri should be present');
  assert.strictEqual(shivaratri?.tithi, 'Chaturdashi');
  assert.strictEqual(shivaratri?.paksha, 'Krishna');
});

test('Festivals detection for specific date panchang', () => {
  // Test Ekadashi detection on a date with Ekadashi
  const data = generateAstrologyData('2026-07-10', '12:00', '28.6139', '77.2090');
  const panchang = data.panchang;
  const festivals = getFestivalsForDate('2026-07-10', panchang);

  assert.ok(festivals.length > 0, 'Festivals array should not be empty');
  // Date July 10, 2026 in tests is Krishna Paksha Dashami/Ekadashi
  const hasEkadashiOrVrat = festivals.some(f => f.category === 'vrat' || f.category === 'major');
  assert.ok(hasEkadashiOrVrat, 'Should detect relevant festival or vrat');
});
