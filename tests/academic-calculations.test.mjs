import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAttendance, calculateSgpa } from '../lib/academic-calculations.mjs';

test('attendance percentage and consecutive classes are calculated', () => {
  assert.deepEqual(calculateAttendance({ held: 10, attended: 6, target: 75 }), { valid: true, percentage: 60, classesNeeded: 6 });
});
test('attendance handles a target already met', () => {
  assert.equal(calculateAttendance({ held: 4, attended: 4, target: 75 }).classesNeeded, 0);
});
test('attendance handles 100 percent target', () => {
  assert.equal(calculateAttendance({ held: 4, attended: 3, target: 100 }).classesNeeded, null);
  assert.equal(calculateAttendance({ held: 4, attended: 4, target: 100 }).classesNeeded, 0);
});
test('attendance rejects invalid counts and targets', () => {
  for (const input of [{ held: 2, attended: 3, target: 75 }, { held: -1, attended: 0, target: 75 }, { held: 2.5, attended: 1, target: 75 }, { held: 2, attended: 1, target: 101 }]) {
    assert.equal(calculateAttendance(input).valid, false);
  }
});
test('SGPA uses credit-weighted grade points', () => {
  assert.equal(calculateSgpa([4, 3, 3, 2], [9, 8, 8, 10]), 8.583333333333334);
});
test('SGPA rejects mismatched, empty, or invalid inputs', () => {
  assert.equal(calculateSgpa([], []), null);
  assert.equal(calculateSgpa([3], [8, 9]), null);
  assert.equal(calculateSgpa([0], [8]), null);
  assert.equal(calculateSgpa([3], [11]), null);
});
