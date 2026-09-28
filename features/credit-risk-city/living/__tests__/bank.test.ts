import { describe, expect, it } from 'vitest';
import { contentPack } from '../../content';
import { builtShare, createCityBank, liveLine, readings, setStorm, tickCityBank, BOOK_SIZE, type CityBank } from '../bank';

const rules = contentPack.rules;
const run = (bank: CityBank, months: number) => {
  let b = bank;
  for (let i = 0; i < months; i++) b = tickCityBank(b, rules);
  return b;
};

describe('the living city bank', () => {
  it('is deterministic and keeps its book near full size', () => {
    const a = run(createCityBank(5, rules), 24);
    const b = run(createCityBank(5, rules), 24);
    expect(JSON.stringify(readings(a))).toBe(JSON.stringify(readings(b)));
    const open = a.sim.facilities.filter((f) => !f.closed).length;
    expect(open).toBeGreaterThanOrEqual(BOOK_SIZE - 1);
    expect(a.sim.facilities.length).toBeLessThan(BOOK_SIZE * 2);
  });
  it('a storm hurts: more Stage 2, more defaults, lower capital than calm', () => {
    let calmS2 = 0, stormS2 = 0, calmDef = 0, stormDef = 0, calmCet1 = 0, stormCet1 = 0;
    for (let seed = 1; seed <= 12; seed++) {
      const calm = run(createCityBank(seed, rules), 18);
      const storm = run(setStorm(createCityBank(seed, rules), true, rules), 18);
      calmS2 += readings(calm).stageShare[1];
      stormS2 += readings(storm).stageShare[1];
      calmDef += Object.keys(calm.defaultedAt).length;
      stormDef += Object.keys(storm.defaultedAt).length;
      calmCet1 += readings(calm).cet1Ratio;
      stormCet1 += readings(storm).cet1Ratio;
    }
    expect(stormS2).toBeGreaterThan(calmS2 * 1.5);
    expect(stormDef).toBeGreaterThanOrEqual(calmDef);
    expect(stormCet1).toBeLessThan(calmCet1);
  });
  it('in calm weather dividends hold CET1 at the 16% target; a storm pushes it below', () => {
    const calm = readings(run(createCityBank(9, rules), 24)).cet1Ratio;
    expect(calm).toBeGreaterThan(0.155);
    expect(calm).toBeLessThanOrEqual(0.1601);
    const storm = readings(run(setStorm(createCityBank(9, rules), true, rules), 6)).cet1Ratio;
    expect(storm).toBeLessThan(calm);
  });
  it('the storm hits up front: within 2 months Stage 2 jumps and CET1 falls below the calm path (cliff effect)', () => {
    let hits = 0;
    for (let seed = 1; seed <= 10; seed++) {
      const base = run(createCityBank(seed, rules), 6);
      const calm = readings(run(base, 2));
      const storm = readings(run(setStorm(base, true, rules), 2));
      if (storm.stageShare[1] > calm.stageShare[1] + 0.2 && storm.cet1Ratio < calm.cet1Ratio - 0.005) hits++;
    }
    expect(hits).toBeGreaterThanOrEqual(9);
  });
  it('capital never stays below the 4.5% minimum: the bank is recapitalised', () => {
    for (let seed = 1; seed <= 8; seed++) {
      let b = setStorm(run(createCityBank(seed, rules), 3), true, rules);
      for (let m = 0; m < 24; m++) {
        b = tickCityBank(b, rules);
        expect(readings(b).cet1Ratio).toBeGreaterThanOrEqual(0.045 - 1e-9);
      }
    }
  }, 60000);
  it('no ghost facilities: RWA stays in proportion to the loan book over 20 years', () => {
    let b = createCityBank(20260928, rules);
    for (let m = 1; m <= 240; m++) {
      b = tickCityBank(b, rules);
      if (m > 36) expect(b.sim.kpis.rwa, `m${m}`).toBeLessThan(b.sim.kpis.totalGca * 1.6 + 1);
    }
  }, 60000);
  it('a storm lasts 12 months, then clears by itself', () => {
    let b = setStorm(createCityBank(2, rules), true, rules);
    b = run(b, 11);
    expect(b.storm).toBe(true);
    expect(readings(b).stormLeft).toBe(1);
    b = run(b, 1);
    expect(b.storm).toBe(false);
  });
  it.each([false, true])('240 months stay healthy in the long run (storm at month 60: %s)', (withStorm) => {
    // A 45-loan bank has bad-luck years (several defaults close together), so judge years 10–20 on averages;
    // the hard floor is the 4.5% minimum, which recapitalisation guarantees.
    for (const seed of [20260928, 3, 7, 11]) {
      let b = createCityBank(seed, rules);
      const s3: number[] = [];
      const cet1: number[] = [];
      for (let m = 1; m <= 240; m++) {
        if (withStorm && m === 60) b = setStorm(b, true, rules);
        b = tickCityBank(b, rules);
        const r = readings(b);
        if (m >= 120) {
          s3.push(r.stage3Ratio);
          cet1.push(r.cet1Ratio);
          expect(r.cet1Ratio, `seed ${seed} m${m}`).toBeGreaterThanOrEqual(0.045 - 1e-9);
        }
        expect(b.sim.facilities.length).toBeLessThan(110);
      }
      const avg = (xs: number[]) => xs.reduce((a, x) => a + x, 0) / xs.length;
      expect(avg(s3), `seed ${seed}`).toBeLessThan(0.045);
      expect(avg(cet1), `seed ${seed}`).toBeGreaterThan(0.125); // measured 12.8–15.5% across 16 runs; below the 16% payout target on average, as a bank with bad years should be
    }
  }, 60000);
  it('after the storm passes, Stage 2 falls back', () => {
    let s = run(setStorm(createCityBank(4, rules), true, rules), 12);
    const peak = readings(s).stageShare[1];
    s = run({ ...s, storm: false }, 18);
    expect(readings(s).stageShare[1]).toBeLessThan(peak);
  });
  it('readings are finite and every district has a live line', () => {
    const r = readings(run(createCityBank(3, rules), 18));
    for (const x of [r.gca, r.delinquentShare, r.avgPd, r.cet1Ratio, r.stage3Ratio, r.costOfRisk, r.collateralCover, ...r.stageShare]) expect(Number.isFinite(x)).toBe(true);
    expect(r.stageShare[0] + r.stageShare[1] + r.stageShare[2]).toBeCloseTo(1, 6);
    for (const d of contentPack.districts) expect(liveLine(d.id, r).length).toBeGreaterThan(20);
  });
  it('built share rises with mastery', () => {
    expect(builtShare(['new', 'new'])).toBe(0);
    expect(builtShare(['recalled', 'mastered'])).toBe(0.75);
    expect(builtShare([])).toBe(0);
  });
});
