import { describe, expect, it } from 'vitest';
import { rules } from '../../content/rules';
import { absorbProbability, calibrate, transitionRow } from '../sim/rollrates';

describe('roll-rate calibration (Bible §6.2)', () => {
  it('rows are valid probabilities', () => {
    for (const s of [0, 0.01, 0.2, 0.95]) {
      for (let b = 0; b < 4; b++) {
        const r = transitionRow(b, s, rules);
        expect(r.miss + r.cure + r.stay).toBeCloseTo(1, 12);
        for (const p of [r.miss, r.cure, r.stay]) expect(p).toBeGreaterThanOrEqual(0);
      }
    }
  });
  it('absorption rises with s', () => {
    let prev = -1;
    for (const s of [0, 0.01, 0.05, 0.1, 0.3, 0.9]) {
      const a = absorbProbability(s, rules);
      expect(a).toBeGreaterThan(prev);
      prev = a;
    }
  });
  it.each([0.0003, 0.005, 0.02, 0.1, 0.4, 0.9])('bisection hits pd %s', (pd) => {
    const { s, capped } = calibrate(pd, rules);
    expect(capped).toBe(false);
    expect(absorbProbability(s, rules)).toBeCloseTo(pd, 9);
  });
  it('flags unreachable PDs as capped', () => {
    const tight = { ...rules, rollMissCap: { ...rules.rollMissCap, value: 0.02 } };
    expect(calibrate(0.5, tight).capped).toBe(true);
  });
});
