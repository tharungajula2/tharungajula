import { describe, expect, it } from 'vitest';
import { contentPack } from '../../content';
import { exhibitsFor } from '..';
import { standPositions, standWidth } from '../../ui/interior/Interior';

describe('walk-in street layout', () => {
  it.each(contentPack.districts.map((d) => [d.name, d.id] as const))('%s: stands never overlap, even when sliders grow the pieces', (_n, id) => {
    const list = exhibitsFor(id);
    const xs = standPositions(list);
    for (let i = 1; i < list.length; i++) {
      // an 8-unit street gap between stands at their initial widths leaves room for pieces to grow while playing
      const gap = xs[i] - xs[i - 1] - standWidth(list[i]) / 2 - standWidth(list[i - 1]) / 2;
      expect(gap).toBeGreaterThanOrEqual(8 - 1e-9);
    }
  });
});
