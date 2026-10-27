import { describe, expect, it } from 'vitest';
import { binarySearchTrace, buggyBinarySearch, runDemoBinarySearch } from './algorithms';

describe('binary search trace', () => {
  it('finds a value and exposes each comparison', () => { const steps = binarySearchTrace([1, 3, 5, 7, 9], 7); expect(steps[steps.length - 1]?.action).toBe('found'); expect(steps.map(s => s.value)).toEqual([5, 7]); });
  it('records a not-found terminal state', () => { const steps = binarySearchTrace([2, 4, 6], 5); expect(steps[steps.length - 1]?.action).toBe('not found'); });
  it('rejects unsorted input', () => expect(() => binarySearchTrace([2, 1], 1)).toThrow('sorted'));
  it('reproduces the final-candidate boundary bug', () => expect(buggyBinarySearch([2, 4, 6], 2)).toBe(-1));
  it('passes the same edge case after the inclusive-bound fix', () => expect(runDemoBinarySearch([2, 4, 6], 2, true)).toBe(0));
});
