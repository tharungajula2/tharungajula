/**
 * CREDIT RISK OS 2.0 — RBI BASEL III CAPITAL ENGINE
 * Capital Adequacy & Risk-Weighted Asset (RWA) Engine for Scheduled Commercial Banks in India.
 */

import { RBI_BASEL_III_CAPITAL_RULES } from '../_domain/india/truthModel';

export interface RBICapitalCalculationInput {
  exposureInrCr: number;
  riskWeightPercent: number; // e.g. 75.0, 100.0, 150.0
  provisionInrCr: number;
  isNPA: boolean;
}

export interface RBICapitalCalculationResult {
  exposureInrCr: number;
  riskWeightPercent: number;
  netExposureInrCr: number;
  rwaInrCr: number;
  pillar1CapitalReqInrCr: number; // 9.0% of RWA
  capitalPlusCcbReqInrCr: number; // 11.5% of RWA
}

/**
 * Calculates RBI Standardised Risk-Weighted Asset (RWA) for an exposure
 */
export function calculateRBIRWA(input: RBICapitalCalculationInput): RBICapitalCalculationResult {
  const { exposureInrCr, riskWeightPercent, provisionInrCr, isNPA } = input;

  // Under RBI rules, NPA exposures carry risk weights on net unprovisioned exposure
  const netExposureInrCr = isNPA ? Math.max(0, exposureInrCr - provisionInrCr) : exposureInrCr;
  const rwaInrCr = (netExposureInrCr * riskWeightPercent) / 100;

  const pillar1CapitalReqInrCr = (rwaInrCr * RBI_BASEL_III_CAPITAL_RULES.minimumCrarPercent) / 100;
  const capitalPlusCcbReqInrCr = (rwaInrCr * RBI_BASEL_III_CAPITAL_RULES.totalCapitalPlusCcbRequirementPercent) / 100;

  return {
    exposureInrCr,
    riskWeightPercent,
    netExposureInrCr,
    rwaInrCr,
    pillar1CapitalReqInrCr,
    capitalPlusCcbReqInrCr,
  };
}

/**
 * Calculates Bank Capital Adequacy Ratios (CET1 Ratio & CRAR)
 */
export function calculateBankCapitalRatios(
  cet1CapitalInrCr: number,
  tier1CapitalInrCr: number,
  totalCapitalInrCr: number,
  totalRwaInrCr: number
): {
  cet1RatioPercent: number;
  tier1RatioPercent: number;
  crarPercent: number;
  isCet1Compliant: boolean;
  isCrarCompliant: boolean;
  cet1BufferPercent: number;
  crarBufferPercent: number;
} {
  if (totalRwaInrCr <= 0) {
    return {
      cet1RatioPercent: 0,
      tier1RatioPercent: 0,
      crarPercent: 0,
      isCet1Compliant: false,
      isCrarCompliant: false,
      cet1BufferPercent: 0,
      crarBufferPercent: 0,
    };
  }

  const cet1RatioPercent = (cet1CapitalInrCr / totalRwaInrCr) * 100;
  const tier1RatioPercent = (tier1CapitalInrCr / totalRwaInrCr) * 100;
  const crarPercent = (totalCapitalInrCr / totalRwaInrCr) * 100;

  const isCet1Compliant = cet1RatioPercent >= RBI_BASEL_III_CAPITAL_RULES.cet1PlusCcbRequirementPercent;
  const isCrarCompliant = crarPercent >= RBI_BASEL_III_CAPITAL_RULES.totalCapitalPlusCcbRequirementPercent;

  const cet1BufferPercent = cet1RatioPercent - RBI_BASEL_III_CAPITAL_RULES.cet1PlusCcbRequirementPercent;
  const crarBufferPercent = crarPercent - RBI_BASEL_III_CAPITAL_RULES.totalCapitalPlusCcbRequirementPercent;

  return {
    cet1RatioPercent,
    tier1RatioPercent,
    crarPercent,
    isCet1Compliant,
    isCrarCompliant,
    cet1BufferPercent,
    crarBufferPercent,
  };
}
