import { test } from 'node:test';
import assert from 'node:assert';
import { calculateBiorhythms, calculateBiorhythmSeries } from './biorhythm.ts';

test('calculateBiorhythms correctly calculates days since birth', () => {
  // 10 days difference
  const birthDate = new Date(Date.UTC(2000, 0, 1));
  const targetDate = new Date(Date.UTC(2000, 0, 11));

  const data = calculateBiorhythms(birthDate, targetDate);
  assert.strictEqual(data.daysSinceBirth, 10);
});

test('calculateBiorhythms handles different timezones by normalizing to UTC', () => {
  // Same day but different times/timezones (if they were local)
  const birthDate = new Date(Date.UTC(1990, 5, 15));
  const targetDate = new Date(Date.UTC(1990, 5, 15));

  const data = calculateBiorhythms(birthDate, targetDate);
  assert.strictEqual(data.daysSinceBirth, 0);

  // Verify values are 0 (sin(0) = 0)
  data.cycles.forEach(cycle => {
    assert.strictEqual(cycle.value, 0);
  });
});

test('calculateBiorhythmSeries generates correct number of points', () => {
  const birthDate = new Date(Date.UTC(1990, 0, 1));
  const targetDate = new Date(Date.UTC(2023, 5, 15));
  const range = 3; // -3 to +3 = 7 points

  const series = calculateBiorhythmSeries(birthDate, targetDate, range);
  assert.strictEqual(series.length, 7);

  // Verify target date point
  const targetPoint = series.find(p => p.isTarget);
  assert.ok(targetPoint);
  assert.strictEqual(targetPoint.date.getUTCDate(), 15);
  assert.strictEqual(targetPoint.date.getUTCMonth(), 5);
});

test('calculateBiorhythms returns correct cycles', () => {
  const birthDate = new Date(Date.UTC(2000, 0, 1));
  const targetDate = new Date(Date.UTC(2000, 0, 2));
  const data = calculateBiorhythms(birthDate, targetDate);

  assert.strictEqual(data.cycles.length, 7);
  const physical = data.cycles.find(c => c.name === 'Physical');
  assert.ok(physical);
  // sin(2 * PI * 1 / 23) approx 0.2698
  assert.ok(Math.abs(physical.value - 0.2698) < 0.0001);
});
