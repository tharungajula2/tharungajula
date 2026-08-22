/**
 * Pure deterministic Regulatory Capital & RWA Engine
 * Implements Standardised RWA, IRB RWA Simulation, Basel 3.1 Output Floor, and CET1 Ratio Calculation
 */

export interface CapitalCalculationInput {
  eadGBP: number;
  riskWeight: number; // e.g. 0.75 or 1.00
  pd: number;
  lgd: number;
  isDefaulted: boolean;
  provisionGBP: number;
}

export interface CapitalCalculationResult {
  standardisedRwaGBP: number;
  irbRwaGBP: number;
  outputFloorRwaGBP: number; // 72.5% Basel 3.1 output floor
  finalRwaGBP: number;
  pillar1CapitalReqGBP: number; // 8% of RWA
}

/**
 * Calculates Standardised Risk-Weighted Assets (RWA)
 */
export function calculateStandardisedRWA(eadGBP: number, riskWeight: number): number {
  return eadGBP * riskWeight;
}

/**
 * Calculates Simplified Advanced IRB RWA (Basel III curve proxy)
 */
export function calculateIRBRWA(pd: number, lgd: number, eadGBP: number, isDefaulted: boolean): number {
  if (isDefaulted) {
    // Under Basel III, defaulted exposures carry a specific RWA multiplier or 150% risk weight on unprovisioned balance
    return eadGBP * 1.50;
  }

  // Simplified IRB correlation & risk weight mapping curve
  const correlation = 0.12 * (1 - Math.exp(-50 * pd)) / (1 - Math.exp(-50)) + 0.24 * (1 - (1 - Math.exp(-50 * pd)) / (1 - Math.exp(-50)));
  const irbRiskWeight = Math.min(2.5, Math.max(0.10, (lgd * 3.5 * Math.sqrt(pd)) + (correlation * 0.5)));

  return eadGBP * irbRiskWeight;
}

/**
 * Applies Basel 3.1 Output Floor (72.5% of Standardised RWA floor for IRB models)
 */
export function calculateCapitalWithFloor(input: CapitalCalculationInput): CapitalCalculationResult {
  const { eadGBP, riskWeight, pd, lgd, isDefaulted } = input;

  const standardisedRwaGBP = calculateStandardisedRWA(eadGBP, riskWeight);
  const irbRwaGBP = calculateIRBRWA(pd, lgd, eadGBP, isDefaulted);

  // Basel 3.1 Output Floor = 72.5% of Standardised RWA
  const outputFloorRwaGBP = standardisedRwaGBP * 0.725;

  // Final RWA is the maximum of IRB RWA and Output Floor RWA
  const finalRwaGBP = Math.max(irbRwaGBP, outputFloorRwaGBP);
  const pillar1CapitalReqGBP = finalRwaGBP * 0.08; // 8% Pillar 1 Requirement

  return {
    standardisedRwaGBP,
    irbRwaGBP,
    outputFloorRwaGBP,
    finalRwaGBP,
    pillar1CapitalReqGBP,
  };
}

/**
 * Computes CET1 Capital Ratio (%)
 */
export function calculateCET1Ratio(cet1CapitalGBP: number, totalRwaGBP: number): number {
  if (totalRwaGBP <= 0) return 0;
  return (cet1CapitalGBP / totalRwaGBP) * 100;
}
