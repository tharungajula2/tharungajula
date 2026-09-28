import { describe, expect, it } from 'vitest';
import { contentPack } from '../../content';
import { exhibits, exhibitsFor } from '..';
import type { Exhibit, SceneSpec, Vals } from '../types';

const finiteScene = (s: SceneSpec): boolean => {
  switch (s.kind) {
    case 'crowd':
      return s.fallen.every((i) => i >= 0 && i < s.total);
    case 'bars':
      return s.bars.every((b) => b.segs.every((g) => Number.isFinite(g.value) && g.value >= -1e-9) && Number.isFinite(b.base ?? 0)) && (s.lines ?? []).every((l) => Number.isFinite(l.value));
    case 'doors':
      return [1, 2, 3].includes(s.token) && Number.isFinite(s.provision);
    case 'gauge':
      return Number.isFinite(s.value) && s.value <= s.max + 1e-9;
    case 'tank':
      return s.drawn <= s.limit + 1e-9 && s.ead <= s.limit + 1e-9 && s.ead >= s.drawn - 1e-9;
  }
};

function randomVals(e: Exhibit, seed: number): Vals {
  let h = seed * 9301 + 49297;
  const r = () => ((h = (h * 9301 + 49297) % 233280) / 233280);
  const v: Vals = { ...e.initial };
  for (const c of e.controls) {
    if (c.kind === 'slider') v[c.id] = c.min + Math.round((r() * (c.max - c.min)) / c.step) * c.step;
    if (c.kind === 'toggle') v[c.id] = r() > 0.5 ? 1 : 0;
  }
  return v;
}

describe('exhibits', () => {
  it('every concept in the Observatory, Vault and Fortress has exactly one exhibit', () => {
    for (const d of ['observatory', 'vault', 'fortress'] as const) {
      const concepts = contentPack.concepts.filter((c) => c.district === d).map((c) => c.id).sort();
      expect(exhibitsFor(d).map((e) => e.conceptId).sort()).toEqual(concepts);
    }
    expect(new Set(exhibits.map((e) => e.id)).size).toBe(exhibits.length);
  });
  it.each(exhibits.map((e) => [e.id, e] as const))('%s gives sane output across 200 random settings and every action', (_id, e) => {
    for (let s = 0; s < 200; s++) {
      let v = randomVals(e, s);
      for (const c of e.controls) if (c.kind === 'action' && e.act && s % 3 === 0) v = e.act(v, c.id);
      const out = e.model(v);
      expect(out.scene.length).toBeGreaterThan(0);
      for (const sc of out.scene) expect(finiteScene(sc), `${e.id} seed ${s}`).toBe(true);
      expect(out.insight.length).toBeGreaterThan(10);
      for (const r of out.readouts) expect(r.value, `${e.id} ${r.label}`).not.toContain('NaN');
    }
  });
  it('three doors: the real engine moves the loan between stages', () => {
    const e = exhibits.find((x) => x.id === 'ex-stages')!;
    const stage = (v: Vals) => (e.model(v).scene[0] as Extract<SceneSpec, { kind: 'doors' }>).token;
    let v = e.initial;
    expect(stage(v)).toBe(1);
    v = e.act!(v, 'miss');
    expect(stage(v)).toBe(1); // one miss: under 30 DPD
    v = e.act!(v, 'miss');
    expect(stage(v)).toBe(2); // > 30 DPD
    v = e.act!(e.act!(v, 'miss'), 'miss');
    expect(stage(v)).toBe(3); // > 90 DPD: default
    v = e.act!(v, 'payAll');
    for (let i = 0; i < 2; i++) v = e.act!(v, 'wait');
    expect(stage(v)).toBe(2); // cured after 3 clean months — to Stage 2, not 1
    let d = e.act!(e.initial, 'down');
    expect(stage(d)).toBe(2); // G4 → G5 doubles PD
    d = e.act!(d, 'up');
    for (let i = 0; i < 2; i++) d = e.act!(d, 'wait');
    expect(stage(d)).toBe(1); // probation served
    expect(stage(e.act!(e.initial, 'watch'))).toBe(2);
  });
  it('IRB gate hits the output floor for a strong borrower and exceeds SA for a weak one', () => {
    const e = exhibits.find((x) => x.id === 'ex-irb')!;
    const applied = (pd: number) => (e.model({ pd, lgd: 0.45, m: 2.5 }).scene[0] as Extract<SceneSpec, { kind: 'bars' }>).bars[2].segs[0].value;
    expect(applied(0.001)).toBeCloseTo(72.5, 5);
    expect(applied(0.05)).toBeGreaterThan(100);
  });
  it('weighted ECL exceeds the base case whenever the downside has weight', () => {
    const e = exhibits.find((x) => x.id === 'ex-scenarios')!;
    const bars = (v: Vals) => (e.model(v).scene[0] as Extract<SceneSpec, { kind: 'bars' }>).bars;
    const b = bars({ wb: 0.6, wd: 0.2, sev: 3 });
    expect(b[3].segs[0].value).toBeGreaterThan(b[1].segs[0].value);
  });
});
