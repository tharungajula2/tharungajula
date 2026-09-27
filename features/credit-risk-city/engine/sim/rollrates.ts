import type { SimRules } from '../../content/types';

export interface Row {
  miss: number;
  cure: number;
  stay: number;
}

/** Monthly transition from bucket b (0 = Current, 1 = 1–30, 2 = 31–60, 3 = 61–90). */
export function transitionRow(b: number, s: number, rules: SimRules): Row {
  const w = rules.rollMissWeights.value[b];
  const miss = Math.min(rules.rollMissCap.value, s * w);
  const rest = 1 - miss;
  if (b === 0) return { miss, cure: 0, stay: rest };
  const alpha = rules.rollCureShares.value[b];
  return { miss, cure: alpha * rest, stay: (1 - alpha) * rest };
}

/** Probability of absorbing into Default (bucket 4) within `months` steps from Current. */
export function absorbProbability(s: number, rules: SimRules, months = 12): number {
  let v = [1, 0, 0, 0, 0];
  for (let m = 0; m < months; m++) {
    const n = [0, 0, 0, 0, v[4]];
    for (let b = 0; b < 4; b++) {
      if (v[b] === 0) continue;
      const r = transitionRow(b, s, rules);
      n[b + 1] += v[b] * r.miss;
      n[0] += v[b] * r.cure;
      n[b] += v[b] * r.stay;
    }
    v = n;
  }
  return v[4];
}

/** Find s so that 12-month absorption = pd (bisection, 60 iterations). */
export function calibrate(pd: number, rules: SimRules): { s: number; capped: boolean } {
  const sMax = rules.rollMissCap.value / Math.min(...rules.rollMissWeights.value);
  if (absorbProbability(sMax, rules) < pd) return { s: sMax, capped: true };
  let lo = 0;
  let hi = sMax;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (absorbProbability(mid, rules) < pd) lo = mid;
    else hi = mid;
  }
  return { s: (lo + hi) / 2, capped: false };
}
