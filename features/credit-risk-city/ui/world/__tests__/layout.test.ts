import { describe, expect, it } from 'vitest';
import { contentPack } from '../../../content';
import {
  GROUND_RADIUS, PLOT_SIZE, ROAD_RADIUS, STUDIO_ORDER, anchorOffsets, focusGoal, placement, toWorld, treePositions, waterPlacement,
} from '../layout';
import { buildWalk } from '../walk';

describe('city layout', () => {
  const all = contentPack.districts.map((d) => ({ d, p: placement(d.order) }));
  it('puts the BA Studio at the centre and every other district on the ring', () => {
    const studio = all.find((a) => a.d.order === STUDIO_ORDER)!;
    expect([studio.p.x, studio.p.z]).toEqual([0, 0]);
    for (const a of all.filter((x) => x.d.order !== STUDIO_ORDER)) {
      expect(Math.hypot(a.p.x, a.p.z)).toBeGreaterThan(ROAD_RADIUS + PLOT_SIZE / 2);
    }
  });
  it('plots never overlap and stay on the ground', () => {
    for (let i = 0; i < all.length; i++) {
      expect(Math.hypot(all[i].p.x, all[i].p.z) + PLOT_SIZE).toBeLessThan(GROUND_RADIUS);
      for (let j = i + 1; j < all.length; j++) {
        expect(Math.hypot(all[i].p.x - all[j].p.x, all[i].p.z - all[j].p.z)).toBeGreaterThan(PLOT_SIZE);
      }
    }
  });
  it('walking order goes around the ring in sequence, starting nearest the camera', () => {
    expect(placement(1).z).toBeGreaterThan(40);
    for (let o = 1; o < 17; o++) expect(placement(o + 1).angle).toBeGreaterThan(placement(o).angle);
  });
  it('each district faces the centre', () => {
    for (let o = 1; o <= 17; o++) {
      const p = placement(o);
      const front = toWorld(p, { x: 0, z: 10 });
      expect(Math.hypot(front.x, front.z)).toBeLessThan(Math.hypot(p.x, p.z));
    }
  });
  it('anchors stay inside the plot', () => {
    for (const n of [1, 2, 4]) for (const a of anchorOffsets(n)) {
      expect(Math.abs(a.x)).toBeLessThan(PLOT_SIZE / 2);
      expect(Math.abs(a.z)).toBeLessThan(PLOT_SIZE / 2);
    }
  });
  it('camera goals look at their district from outside the ring', () => {
    for (let o = 1; o <= 17; o++) {
      const g = focusGoal(o);
      expect(Math.hypot(g.position[0], g.position[2])).toBeGreaterThan(Math.hypot(g.target[0], g.target[2]));
    }
  });
  it('trees are deterministic and keep clear of the harbours', () => {
    expect(treePositions(50)).toEqual(treePositions(50));
    for (const t of treePositions(80)) for (const o of [6, 13]) {
      const w = waterPlacement(o);
      expect(Math.hypot(w.x - t.x, w.z - t.z)).toBeGreaterThanOrEqual(16);
    }
  });
});

describe('Palace Walk', () => {
  it('alternates where/what questions with valid answers', () => {
    let h = 5;
    const rand = () => ((h = (h * 16807) % 2147483647) / 2147483647);
    const qs = buildWalk(contentPack, contentPack.concepts.map((c) => c.id), rand);
    expect(qs).toHaveLength(6);
    qs.forEach((q, i) => {
      expect(q.kind).toBe(i % 2 === 0 ? 'where' : 'what');
      if (q.kind === 'what') {
        expect(q.options).toHaveLength(4);
        const right = contentPack.concepts.find((c) => c.name === q.options[q.answerIndex])!;
        expect(right.district).toBe(q.district);
        expect(new Set(q.options).size).toBe(4);
      }
    });
  });
});
