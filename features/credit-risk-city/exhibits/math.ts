// Statistics behind the exhibits: normal distribution, the one-factor (Vasicek) loss model, and the Basel IRB formula.

/** Complementary error function (Numerical Recipes erfcc; fractional error < 1.2e-7 everywhere, including the tails). */
function erfc(x: number): number {
  const z = Math.abs(x);
  const t = 1 / (1 + 0.5 * z);
  const r =
    t *
    Math.exp(
      -z * z - 1.26551223 +
        t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))),
    );
  return x >= 0 ? r : 2 - r;
}

/** Standard normal CDF. */
export function normCdf(x: number): number {
  return 0.5 * erfc(-x / Math.SQRT2);
}

/** Inverse standard normal CDF (Acklam's rational approximation, relative error < 1.2e-9). */
export function normInv(p: number): number {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const lo = 0.02425;
  if (p < lo) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > 1 - lo) {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  const q = p - 0.5;
  const r = q * q;
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

/**
 * One-factor model, large portfolio: the share of borrowers defaulting in a year is
 * p(Z) = Φ((Φ⁻¹(PD) − √ρ·Z) / √(1−ρ)). Returns P(default rate ≤ x).
 */
export function vasicekCdf(x: number, pd: number, rho: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return normCdf((Math.sqrt(1 - rho) * normInv(x) - normInv(pd)) / Math.sqrt(rho));
}

/** Default rate that is only exceeded with probability 1 − q (e.g. q = 0.999). */
export function vasicekQuantile(q: number, pd: number, rho: number): number {
  return normCdf((normInv(pd) + Math.sqrt(rho) * normInv(q)) / Math.sqrt(1 - rho));
}

/** Probability mass of the portfolio loss rate (LGD × default rate) in equal bins up to maxLoss. */
export function lossHistogram(pd: number, lgd: number, rho: number, bins: number, maxLoss: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < bins; i++) {
    const a = (i * maxLoss) / bins / lgd;
    const b = ((i + 1) * maxLoss) / bins / lgd;
    out.push(vasicekCdf(b, pd, rho) - vasicekCdf(a, pd, rho));
  }
  return out;
}

/** Basel IRB asset correlation for corporate exposures. */
export function irbCorrelation(pd: number): number {
  const w = (1 - Math.exp(-50 * pd)) / (1 - Math.exp(-50));
  return 0.12 * w + 0.24 * (1 - w);
}

/** Basel IRB corporate risk weight (capital requirement K × 12.5), maturity M in years. */
export function irbRiskWeight(pd: number, lgd: number, maturity: number): number {
  const p = Math.max(pd, 0.0003);
  const r = irbCorrelation(p);
  const b = Math.pow(0.11852 - 0.05478 * Math.log(p), 2);
  const k = lgd * (normCdf((normInv(p) + Math.sqrt(r) * normInv(0.999)) / Math.sqrt(1 - r)) - p);
  const ma = (1 + (maturity - 2.5) * b) / (1 - 1.5 * b);
  return k * ma * 12.5;
}

/** Deterministic binomial draw of n trials with probability p from a seed (for the PD crowd). */
export function seededFallers(n: number, p: number, seed: number): number[] {
  let h = (Math.floor(seed) * 2654435761) >>> 0 || 1;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    h ^= h << 13; h >>>= 0;
    h ^= h >>> 17;
    h ^= h << 5; h >>>= 0;
    if (h / 4294967296 < p) out.push(i);
  }
  return out;
}
