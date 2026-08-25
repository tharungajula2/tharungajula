/**
 * Pure deterministic Treasury & Liquidity Engine
 * Implements LCR, NSFR, and Funds Transfer Pricing (FTP) calculations
 */

export interface LCRInput {
  hqlaGBP?: number;
  hqlaInrCr?: number; // High-Quality Liquid Assets
  totalNetOutflows30DaysGBP?: number;
  totalNetOutflows30DaysInrCr?: number;
}

export interface NSFRInput {
  availableStableFundingGBP?: number;
  availableStableFundingInrCr?: number; // ASF
  requiredStableFundingGBP?: number;
  requiredStableFundingInrCr?: number; // RSF
}

export interface FTPInput {
  baseRatePercent: number; // RBI Repo / Base Rate e.g. 6.5%
  liquidityPremiumPercent: number; // Liquidity term premium e.g. 0.8%
  creditRiskPremiumPercent: number; // Borrower credit spread e.g. 1.2%
}

/**
 * Calculates Liquidity Coverage Ratio (LCR)
 * RBI Supervisory Requirement: LCR >= 100%
 */
export function calculateLCR(input: LCRInput): { ratioPercent: number; isCompliant: boolean } {
  const hqla = input.hqlaInrCr ?? input.hqlaGBP ?? 0;
  const outflows = input.totalNetOutflows30DaysInrCr ?? input.totalNetOutflows30DaysGBP ?? 0;
  if (outflows <= 0) return { ratioPercent: 999, isCompliant: true };
  const ratioPercent = (hqla / outflows) * 100;
  return {
    ratioPercent,
    isCompliant: ratioPercent >= 100,
  };
}

/**
 * Calculates Net Stable Funding Ratio (NSFR)
 * RBI Supervisory Requirement: NSFR >= 100%
 */
export function calculateNSFR(input: NSFRInput): { ratioPercent: number; isCompliant: boolean } {
  const asf = input.availableStableFundingInrCr ?? input.availableStableFundingGBP ?? 0;
  const rsf = input.requiredStableFundingInrCr ?? input.requiredStableFundingGBP ?? 0;
  if (rsf <= 0) return { ratioPercent: 999, isCompliant: true };
  const ratioPercent = (asf / rsf) * 100;
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
