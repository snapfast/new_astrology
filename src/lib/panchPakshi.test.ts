import { test } from 'node:test';
import assert from 'node:assert';
import { getPanchPakshiSchedule } from './panchPakshi.ts';

test('getPanchPakshiSchedule correctly returns schedule for a valid bird', () => {
  const schedule = getPanchPakshiSchedule("Owl");
  assert.strictEqual(schedule.bird, "Owl");
  assert.strictEqual(schedule.activities.length, 5);
  assert.strictEqual(schedule.activities[0].activity, "Eating");
});

test('getPanchPakshiSchedule returns fallback Vulture schedule for an invalid bird', () => {
  const schedule = getPanchPakshiSchedule("InvalidBird");
  assert.strictEqual(schedule.bird, "Vulture");
  assert.strictEqual(schedule.activities.length, 5);
  assert.strictEqual(schedule.activities[0].activity, "Ruling");
});

test('getPanchPakshiSchedule returns fallback Vulture schedule for an empty string', () => {
  const schedule = getPanchPakshiSchedule("");
  assert.strictEqual(schedule.bird, "Vulture");
  assert.strictEqual(schedule.activities.length, 5);
  assert.strictEqual(schedule.activities[0].activity, "Ruling");
});
