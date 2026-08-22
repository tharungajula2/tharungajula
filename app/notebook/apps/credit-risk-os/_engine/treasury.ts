/**
 * Pure deterministic Treasury & Liquidity Engine
 * Implements LCR, NSFR, and Funds Transfer Pricing (FTP) calculations
 */

export interface LCRInput {
  hqlaGBP: number; // High-Quality Liquid Assets
  totalNetOutflows30DaysGBP: number;
}

export interface NSFRInput {
  availableStableFundingGBP: number; // ASF
  requiredStableFundingGBP: number; // RSF
}

export interface FTPInput {
  baseRatePercent: number; // Bank of England Base Rate e.g. 4.5%
  liquidityPremiumPercent: number; // Liquidity term premium e.g. 0.8%
  creditRiskPremiumPercent: number; // Borrower credit spread e.g. 1.2%
}

/**
 * Calculates Liquidity Coverage Ratio (LCR)
 * PRA Target Requirement: LCR >= 100%
 */
export function calculateLCR(input: LCRInput): { ratioPercent: number; isCompliant: boolean } {
  const { hqlaGBP, totalNetOutflows30DaysGBP } = input;
  if (totalNetOutflows30DaysGBP <= 0) return { ratioPercent: 999, isCompliant: true };
  const ratioPercent = (hqlaGBP / totalNetOutflows30DaysGBP) * 100;
  return {
    ratioPercent,
    isCompliant: ratioPercent >= 100,
  };
}

/**
 * Calculates Net Stable Funding Ratio (NSFR)
 * PRA Target Requirement: NSFR >= 100%
 */
export function calculateNSFR(input: NSFRInput): { ratioPercent: number; isCompliant: boolean } {
  const { availableStableFundingGBP, requiredStableFundingGBP } = input;
  if (requiredStableFundingGBP <= 0) return { ratioPercent: 999, isCompliant: true };
  const ratioPercent = (availableStableFundingGBP / requiredStableFundingGBP) * 100;
  return {
    ratioPercent,
    isCompliant: ratioPercent >= 100,
  };
}

/**
 * Decomposes Funds Transfer Pricing (FTP) loan rate
 * All-in Rate = Base Rate + Liquidity Premium + Credit Risk Premium
 */
export function calculateFTPRate(input: FTPInput): {
  baseRatePercent: number;
  liquidityPremiumPercent: number;
  creditRiskPremiumPercent: number;
  totalAllInRatePercent: number;
} {
  const { baseRatePercent, liquidityPremiumPercent, creditRiskPremiumPercent } = input;
  const totalAllInRatePercent = baseRatePercent + liquidityPremiumPercent + creditRiskPremiumPercent;
  return {
    baseRatePercent,
    liquidityPremiumPercent,
    creditRiskPremiumPercent,
    totalAllInRatePercent,
  };
}
