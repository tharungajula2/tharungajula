import { describe, expect, it } from 'vitest';
import { contentPack } from '../../content';
import { validatePack } from '../validatePack';
import { advanceSim, nextStep, startCase } from '../case';
import { simValue } from '../sim/step';
import { defaultGrader } from '../learning/grading';
import type { SimEventKind } from '../../content/types';

describe('content pack', () => {
  it('passes the validator', () => {
    expect(validatePack(contentPack)).toEqual([]);
  });
  it('has all 18 districts, each with ≥ 1 concept; placeholder limits respected', () => {
    expect(contentPack.districts).toHaveLength(18);
    for (const d of contentPack.districts) {
      const cs = contentPack.concepts.filter((c) => c.district === d.id);
      expect(cs.length).toBeGreaterThanOrEqual(1);
      expect(cs.length).toBeLessThanOrEqual(2);
      const its = contentPack.items.filter((i) => cs.some((c) => c.id === i.conceptIds[0]));
      expect(its.length).toBeLessThanOrEqual(4);
    }
    expect(contentPack.items.every((i) => i.placeholder)).toBe(true);
    expect(contentPack.concepts.every((c) => !c.verified)).toBe(true);
  });
  it('covers every item type', () => {
    const types = new Set(contentPack.items.map((i) => i.payload.type));
    for (const t of ['recall', 'explain', 'choice', 'spot', 'predict', 'calculate', 'classify', 'sequence', 'anchor']) expect(types).toContain(t);
  });
  it('the validator catches broken references and cycles', () => {
    const bad = structuredClone(contentPack);
    bad.concepts[0].prerequisites = [bad.concepts[1].id];
    bad.concepts[1].prerequisites = [bad.concepts[0].id];
    bad.items[0].conceptIds = ['missing'];
    const errs = validatePack(bad);
    expect(errs.some((e) => e.includes('cycle'))).toBe(true);
    expect(errs.some((e) => e.includes('unknown concept'))).toBe(true);
  });
});

describe('placeholder SME case', () => {
  const def = contentPack.cases[0];
  it('has 11 steps and exercises every sim event kind', () => {
    expect(def.steps).toHaveLength(11);
    const kinds = new Set(def.events.map((e) => e.kind));
    const all: SimEventKind[] = ['payment', 'draw', 'repay', 'grade', 'watchlist', 'utp', 'collateralIndex', 'recoveryDue', 'postWriteOffRecovery'];
    for (const k of all) expect(kinds).toContain(k);
  });
  it('every predict answer matches the simulation', () => {
    let s = startCase(def, def.defaultSeed, contentPack.rules);
    let atDefault = 0;
    while (!s.done) {
      s = advanceSim(s, def, contentPack.rules);
      const step = def.steps[s.stepIndex];
      if (step.id === 's7') atDefault = s.sim.facilities.find((f) => f.id === 'tl1')!.allowance;
      for (const id of step.itemIds) {
        const item = contentPack.items.find((i) => i.id === id)!;
        const p = item.payload;
        if (p.type !== 'predict') continue;
        const after = simValue(s.sim, p.bindTo);
        const before = s.before ? simValue(s.before, p.bindTo) : null;
        if (p.numeric) {
          expect(defaultGrader.grade(p, { type: 'number', value: after! }, after).correct).toBe(true);
          expect(after!).toBeGreaterThan(0.07);
          expect(after!).toBeLessThan(0.14);
          continue;
        }
        if (p.bindTo.endsWith(':stage')) {
          const label = p.options![p.answerIndex!];
          expect(label).toContain(String(after));
        }
        if (id === 'case-slip-ecl') {
          const ratio = after! / before!;
          expect(ratio).toBeGreaterThan(5);
          expect(ratio).toBeLessThan(15);
        }
        if (id === 'case-recover-writeoff') expect(after!).toBeGreaterThan(atDefault);
      }
      s = nextStep(s, def);
    }
    expect(s.sim.month).toBe(19);
    expect(s.sim.facilities.filter((f) => f.borrowerId === 'b1').every((f) => f.closed)).toBe(true);
  });
});
