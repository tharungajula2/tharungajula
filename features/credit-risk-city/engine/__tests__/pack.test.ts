import { describe, expect, it } from 'vitest';
import { contentPack } from '../../content';
import { validatePack } from '../validatePack';
import { advanceSim, nextStep, startCase } from '../case';
import { simValue } from '../sim/step';
import { defaultGrader } from '../learning/grading';
import type { SimEventKind } from '../../content/types';
import { RECALL_TYPES } from '../learning/mastery';

describe('content pack', () => {
  it('passes the validator', () => {
    expect(validatePack(contentPack)).toEqual([]);
  });
  it('has all 18 districts, each with ≥ 1 concept', () => {
    expect(contentPack.districts).toHaveLength(18);
    for (const d of contentPack.districts) expect(contentPack.concepts.some((c) => c.district === d.id)).toBe(true);
  });
  const realDistricts = contentPack.districts.filter((d) => contentPack.concepts.some((c) => c.district === d.id && !c.placeholder));
  it('batches 1–3: all 18 districts carry real content', () => {
    expect(realDistricts.map((d) => d.order)).toEqual(Array.from({ length: 18 }, (_, i) => i + 1));
  });
  it.each(realDistricts.map((d) => [d.name, d.id] as const))('%s meets the content quality gates', (_name, id) => {
    const cs = contentPack.concepts.filter((c) => c.district === id);
    expect(cs.length).toBeGreaterThanOrEqual(4);
    expect(cs.every((c) => !c.placeholder)).toBe(true);
    const own = contentPack.items.filter((i) => cs.some((c) => c.id === i.conceptIds[0]) && !i.id.startsWith('case-'));
    expect(own.every((i) => !i.placeholder)).toBe(true);
    expect(own.filter((i) => i.payload.type === 'anchor')).toHaveLength(1);
    for (const c of cs) {
      const mine = contentPack.items.filter((i) => i.conceptIds.includes(c.id));
      expect(mine.length, c.id).toBeGreaterThanOrEqual(2);
      // Mastery needs a correct recall-type answer, so every concept must have one.
      expect(mine.some((i) => RECALL_TYPES.includes(i.payload.type)), c.id).toBe(true);
      expect(c.explanation.length, c.id).toBeGreaterThan(80);
    }
  });
  it('item hygiene: unique prompts, anchors and options', () => {
    const prompts = contentPack.items.map((i) => i.prompt);
    expect(new Set(prompts).size).toBe(prompts.length);
    const anchors = contentPack.concepts.map((c) => c.anchor);
    expect(new Set(anchors).size).toBe(anchors.length);
    for (const i of contentPack.items) {
      const p = i.payload;
      const opts = 'options' in p && p.options ? p.options : [];
      expect(new Set(opts).size, i.id).toBe(opts.length);
      if (p.type === 'classify') expect(new Set(p.entries.map((e) => e.bucket)).size, i.id).toBeGreaterThan(1);
      if (p.type === 'anchor') expect(p.options[p.answerIndex].length).toBeGreaterThan(0);
      expect(i.explanation.length, i.id).toBeGreaterThan(10);
    }
  });
  it('anchor items name a concept or district that really lives there', () => {
    for (const i of contentPack.items.filter((x) => x.payload.type === 'anchor' && !x.placeholder)) {
      const p = i.payload as Extract<typeof i.payload, { type: 'anchor' }>;
      const c = contentPack.concepts.find((x) => x.id === i.conceptIds[0])!;
      const answer = p.options[p.answerIndex];
      const d = contentPack.districts.find((x) => x.id === c.district)!;
      expect([c.name, d.name], i.id).toContain(answer);
      expect(c.anchor, i.id).toBe(p.anchor);
    }
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
