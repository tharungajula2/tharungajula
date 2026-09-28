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
    const storm = readings(run(setStorm(createCityBank(9, rules), true, rules), 24)).cet1Ratio;
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
  });
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
