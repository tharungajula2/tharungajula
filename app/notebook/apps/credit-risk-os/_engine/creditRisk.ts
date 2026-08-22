/**
 * Pure deterministic Credit Risk Engine
 * Implements EAD and Expected Loss (EL) calculations
 */

export interface EADInput {
  drawnGBP: number;
  undrawnGBP: number;
  ccf: number; // e.g. 0.50, 0.75, 1.00
}

export interface ELInput {
  pd: number; // e.g. 0.015 (1.5%)
  lgd: number; // e.g. 0.35 (35%)
  ead: number; // Exposure at Default in GBP
}

/**
 * Calculates Exposure at Default (EAD)
 * Formula: EAD = Drawn + (CCF * Undrawn)
 */
export function calculateEAD(input: EADInput): number {
  const { drawnGBP, undrawnGBP, ccf } = input;
  const clampedCCF = Math.max(0, Math.min(1, ccf));
  return drawnGBP + (clampedCCF * undrawnGBP);
}

/**
 * Calculates 1-Year Expected Loss (EL)
 * Formula: EL = PD * LGD * EAD
 */
export function calculateExpectedLoss(input: ELInput): number {
  const { pd, lgd, ead } = input;
  const clampedPD = Math.max(0, Math.min(1, pd));
  const clampedLGD = Math.max(0, Math.min(1, lgd));
  return clampedPD * clampedLGD * ead;
}

/**
 * Calculates Collateral Haircut Adjusted Value
 */
export function calculateNetCollateralValue(valuationGBP: number, haircut: number): number {
  const clampedHaircut = Math.max(0, Math.min(1, haircut));
  return valuationGBP * (1 - clampedHaircut);
}
