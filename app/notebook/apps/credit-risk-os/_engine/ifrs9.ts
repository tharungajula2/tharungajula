/**
 * Pure deterministic IFRS 9 & Ind AS 109 Engine
 * Implements Staging, SICR assessment, and Multi-Year Term Structure ECL Calculation
 */

import { IFRS9Stage } from '../_types';

export interface StagingAssessmentInput {
  dpd: number;
  isDefaulted: boolean;
  currentPD: number;
  originationPD: number;
  ratingDowngradeNotches?: number;
  watchlistStatus: boolean;
  relativePDRatioThreshold?: number; // Default 3.0x
}

export interface StagingAssessmentResult {
  stage: IFRS9Stage;
  sicrTriggered: boolean;
  reasons: string[];
}

export interface TermStructureYear {
  year: number;
  marginalPD: number;
  cumulativePD: number;
  survivalProb: number; // S(t)
  eadGBP: number;
  lgd: number;
  discountFactor: number;
  discountedECLGBP: number;
}

export interface LifetimeECLInput {
  eadGBP: number;
  base1YrPD: number;
  lgd: number;
  discountRate: number; // e.g. 0.05 for 5% Effective Interest Rate
  lifetimeYears: number; // e.g. 5 years
}

/**
 * Assesses IFRS 9 Staging (Stage 1, 2, 3) based on bank policy rules
 */
export function assessIFRS9Staging(input: StagingAssessmentInput): StagingAssessmentResult {
  const {
    dpd,
    isDefaulted,
    currentPD,
    originationPD,
    ratingDowngradeNotches = 0,
    watchlistStatus,
    relativePDRatioThreshold = 3.0,
  } = input;

  const reasons: string[] = [];

  // Stage 3 Check: Default Precedence (>90 DPD or explicit default event)
  if (isDefaulted || dpd >= 90) {
    if (isDefaulted) reasons.push('Obligor declared in default / bankruptcy event.');
    if (dpd >= 90) reasons.push(`Overdue > 90 Days Past Due (${dpd} DPD backstop breached).`);
    return {
      stage: 3,
      sicrTriggered: true,
      reasons,
    };
  }

  // Stage 2 Check: Significant Increase in Credit Risk (SICR)
  const pdRatio = originationPD > 0 ? currentPD / originationPD : 1.0;
  let sicr = false;

  if (dpd >= 30) {
    sicr = true;
    reasons.push(`30+ DPD backstop breached (${dpd} DPD).`);
  }

  if (pdRatio >= relativePDRatioThreshold) {
    sicr = true;
    reasons.push(`Relative PD ratio increased by ${pdRatio.toFixed(1)}x (Threshold: ${relativePDRatioThreshold}x).`);
  }

  if (ratingDowngradeNotches >= 2) {
    sicr = true;
    reasons.push(`Internal rating downgraded by ${ratingDowngradeNotches} notches since origination.`);
  }

  if (watchlistStatus) {
    sicr = true;
    reasons.push('Obligor placed on Credit Risk Watchlist.');
  }

  if (sicr) {
    return {
      stage: 2,
      sicrTriggered: true,
      reasons,
    };
  }

  // Otherwise Stage 1
  return {
    stage: 1,
    sicrTriggered: false,
    reasons: ['Normal credit performance within risk appetite.'],
  };
}

/**
 * Computes Multi-Year Term Structure ECL over facility lifetime
 */
export function calculateLifetimeTermStructureECL(input: LifetimeECLInput): {
  ecl12mGBP: number;
  eclLifetimeGBP: number;
  termStructure: TermStructureYear[];
} {
  const { eadGBP, base1YrPD, lgd, discountRate, lifetimeYears } = input;
  const termStructure: TermStructureYear[] = [];

  let cumulativePD = 0;
  let prevSurvival = 1.0;
  let ecl12mGBP = 0;
  let eclLifetimeGBP = 0;

  for (let year = 1; year <= lifetimeYears; year++) {
    // Annualized marginal PD growth model
    const yearlyMarginalPD = base1YrPD * Math.pow(1.15, year - 1);
    const clampedMarginalPD = Math.min(0.99, yearlyMarginalPD);

    const survivalProb = prevSurvival * (1 - clampedMarginalPD);
    const yearMarginalDefault = prevSurvival * clampedMarginalPD;
    cumulativePD += yearMarginalDefault;

    const discountFactor = 1 / Math.pow(1 + discountRate, year);
    const yearUndiscountedECL = yearMarginalDefault * lgd * eadGBP;
    const discountedECLGBP = yearUndiscountedECL * discountFactor;

    termStructure.push({
      year,
      marginalPD: clampedMarginalPD,
      cumulativePD: Math.min(1.0, cumulativePD),
      survivalProb,
      eadGBP,
      lgd,
      discountFactor,
      discountedECLGBP,
    });

    if (year === 1) {
      ecl12mGBP = discountedECLGBP;
    }

    eclLifetimeGBP += discountedECLGBP;
    prevSurvival = survivalProb;
  }

  return {
    ecl12mGBP,
    eclLifetimeGBP,
    termStructure,
  };
}
