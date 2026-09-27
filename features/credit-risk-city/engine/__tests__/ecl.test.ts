import { describe, expect, it } from 'vitest';
import { rules } from '../../content/rules';
import { boundaries, ecl12m, eclLifetime, eclRows, eclStage3, netRecovery, termBalanceAt } from '../sim/ecl';
import type { SimRules } from '../../content/types';

const noRecovery: SimRules = {
  ...rules,
  unsecuredRecoveryRate: { ...rules.unsecuredRecoveryRate, value: 0 },
  recoveryCostRate: { ...rules.recoveryCostRate, value: 0 },
};
const base = { kind: 'revolving' as const, drawn: 100, undrawn: 0, remainingMonths: 36, eir: 0.1, pd: 0.02, rv: 0 };

describe('Stage 3 ECL (Bible §6.5 anchor)', () => {
  it('GCA 100, NetRec 100, EIR 10%, τ 1 → 9.0909', () => {
    const r: SimRules = { ...noRecovery, unsecuredRecoveryRate: { ...rules.unsecuredRecoveryRate, value: 1 } };
    expect(netRecovery(100, 0, 1, 0)).toBe(100);
    expect(eclStage3(100, 0, 0.1, 1, r)).toBeCloseTo(100 - 100 / 1.1, 9);
  });
  it('longer recovery delay increases the loss', () => {
    const r: SimRules = { ...noRecovery, unsecuredRecoveryRate: { ...rules.unsecuredRecoveryRate, value: 1 } };
    expect(eclStage3(100, 0, 0.1, 2, r)).toBeGreaterThan(eclStage3(100, 0, 0.1, 1, r));
  });
  it('is bounded by [0, GCA]', () => {
    expect(eclStage3(50, 1000, 0.1, 0, noRecovery)).toBe(0);
    expect(eclStage3(50, 0, 0.1, 3, noRecovery)).toBe(50);
  });
});

describe('Stage 1 and 2 ECL', () => {
  it('12-month ECL with LGD 1 = PD × EAD × DF', () => {
    expect(ecl12m(base, noRecovery)).toBeCloseTo((0.02 * 100) / 1.1, 9);
  });
  it('lifetime ECL sums marginal PDs over whole years', () => {
    const S = (t: number) => Math.pow(0.98, t);
    let expected = 0;
    for (let t = 1; t <= 3; t++) expected += (S(t - 1) - S(t)) * 100 * Math.pow(1.1, -t);
    expect(eclLifetime(base, noRecovery)).toBeCloseTo(expected, 9);
  });
  it('fractional final period', () => {
    expect(boundaries(1.5)).toEqual([0, 1, 1.5]);
    const rows = eclRows({ ...base, remainingMonths: 18 }, noRecovery);
    expect(rows).toHaveLength(2);
    expect(rows[1].pd).toBeCloseTo(Math.pow(0.98, 1) - Math.pow(0.98, 1.5), 12);
    expect(rows[1].df).toBeCloseTo(Math.pow(1.1, -1.5), 12);
  });
  it('12-month horizon is capped by remaining life', () => {
    const short = { ...base, remainingMonths: 6 };
    expect(ecl12m(short, noRecovery)).toBeCloseTo(eclLifetime(short, noRecovery), 12);
    expect(ecl12m(short, noRecovery)).toBeCloseTo((1 - Math.pow(0.98, 0.5)) * 100 * Math.pow(1.1, -0.5), 12);
  });
  it('maturity edge cases', () => {
    expect(eclLifetime({ ...base, drawn: 0, remainingMonths: 0 }, noRecovery)).toBe(0);
    expect(eclLifetime({ ...base, remainingMonths: 0 }, noRecovery)).toBeGreaterThan(0);
  });
  it('term loans amortise equal principal', () => {
    expect(termBalanceAt(120, 24, 1)).toBeCloseTo(60, 12);
    expect(termBalanceAt(120, 24, 2)).toBe(0);
  });
  it('collateral lowers LGD and so ECL', () => {
    expect(ecl12m({ ...base, rv: 60 }, rules)).toBeLessThan(ecl12m(base, rules));
  });
  it('Stage 2 lifetime ECL exceeds Stage 1 for a multi-year loan', () => {
    expect(eclLifetime(base, rules)).toBeGreaterThan(ecl12m(base, rules));
  });
});
