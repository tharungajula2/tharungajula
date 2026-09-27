export const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));

/** Effective monthly rate equivalent to an annual effective rate. */
export const monthlyRate = (annual: number): number => Math.pow(1 + annual, 1 / 12) - 1;

export const safeDiv = (num: number, den: number): number | null => (den === 0 ? null : num / den);
