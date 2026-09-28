import { describe, expect, it } from 'vitest';
import { irbRiskWeight, lossHistogram, normCdf, normInv, seededFallers, vasicekCdf, vasicekQuantile } from '../math';

describe('exhibit maths', () => {
  it('normal CDF and its inverse agree', () => {
    for (const x of [-3, -1.5, -0.2, 0, 0.7, 2, 3.09]) expect(normInv(normCdf(x))).toBeCloseTo(x, 5);
    expect(normCdf(0)).toBeCloseTo(0.5, 7);
    expect(normInv(0.999)).toBeCloseTo(3.0902, 3);
  });
  it('Basel IRB corporate risk weight matches the published benchmark (PD 1%, LGD 45%, M 2.5 ≈ 92.3%)', () => {
    expect(irbRiskWeight(0.01, 0.45, 2.5)).toBeCloseTo(0.9232, 2);
    expect(irbRiskWeight(0.001, 0.45, 2.5)).toBeLessThan(irbRiskWeight(0.01, 0.45, 2.5));
  });
  it('Vasicek: the distribution is proper and the 99.9% quantile sits in its tail', () => {
    const h = lossHistogram(0.02, 1, 0.12, 400, 1);
    expect(h.reduce((s, x) => s + x, 0)).toBeCloseTo(1, 3);
    const q = vasicekQuantile(0.999, 0.02, 0.12);
    expect(vasicekCdf(q, 0.02, 0.12)).toBeCloseTo(0.999, 4);
    expect(q).toBeGreaterThan(0.02);
  });
  it('higher correlation fattens the tail but keeps the mean', () => {
    expect(vasicekQuantile(0.999, 0.02, 0.24)).toBeGreaterThan(vasicekQuantile(0.999, 0.02, 0.06));
    const mean = (rho: number) => lossHistogram(0.02, 1, rho, 2000, 1).reduce((s, m, i) => s + m * ((i + 0.5) / 2000), 0);
    expect(mean(0.06)).toBeCloseTo(0.02, 3);
    expect(mean(0.24)).toBeCloseTo(0.02, 3);
  });
  it('seeded fallers are deterministic and near the PD on average', () => {
    expect(seededFallers(100, 0.1, 3)).toEqual(seededFallers(100, 0.1, 3));
    let total = 0;
    for (let s = 1; s <= 200; s++) total += seededFallers(100, 0.1, s).length;
    expect(total / 200).toBeGreaterThan(8);
    expect(total / 200).toBeLessThan(12);
  });
});
