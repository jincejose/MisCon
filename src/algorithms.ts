export type TraceStep = { low: number; high: number; mid: number; value: number; target: number; action: 'compare' | 'move left' | 'move right' | 'found' | 'not found'; explanation: string; line: number };

/** Deterministic, verified binary-search execution trace for sorted input. */
export function binarySearchTrace(input: number[], target: number): TraceStep[] {
  if (input.some((n, i) => i > 0 && input[i - 1] > n)) throw new Error('Binary search requires sorted input.');
  const trace: TraceStep[] = [];
  let low = 0, high = input.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2), value = input[mid];
    if (value === target) { trace.push({ low, high, mid, value, target, action: 'found', explanation: `Match: ${value} equals ${target}, so the search is complete.`, line: 6 }); return trace; }
    if (value < target) {
      trace.push({ low, high, mid, value, target, action: 'move right', explanation: `${value} is smaller than ${target}; discard the left half and move low to mid + 1.`, line: 8 });
      low = mid + 1;
    } else {
      trace.push({ low, high, mid, value, target, action: 'move left', explanation: `${value} is larger than ${target}; discard the right half and move high to mid - 1.`, line: 10 });
      high = mid - 1;
    }
  }
  trace.push({ low, high, mid: -1, value: NaN, target, action: 'not found', explanation: `low (${low}) passed high (${high}); ${target} is not in this array.`, line: 13 });
  return trace;
}

export function buggyBinarySearch(input: number[], target: number) {
  let low = 0, high = input.length - 1;
  while (low < high) { // Deliberate demo bug: the final candidate is never checked.
    const mid = Math.floor((low + high) / 2);
    if (input[mid] === target) return mid;
    if (input[mid] < target) low = mid + 1; else high = mid - 1;
  }
  return -1;
}

/** Runs the built-in boundary-condition lesson only; this is not general source execution. */
export function runDemoBinarySearch(input: number[], target: number, includeFinalCandidate: boolean) {
  if (includeFinalCandidate) {
    const found = binarySearchTrace(input, target).find(step => step.action === 'found');
    return found?.mid ?? -1;
  }
  return buggyBinarySearch(input, target);
}
