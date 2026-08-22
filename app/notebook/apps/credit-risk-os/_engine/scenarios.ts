/**
 * Pure deterministic Macroeconomic Scenario Stress Engine
 * Applies deterministic shocks to facility portfolios and computes before/after impact
 */

import { Facility } from '../_types';
import { calculateEAD, calculateExpectedLoss } from './creditRisk';
import { assessIFRS9Staging } from './ifrs9';
import { calculateCapitalWithFloor } from './capital';

export type ScenarioType =
  | 'baseline'
  | 'mild-recession'
  | 'severe-recession'
  | 'rating-downgrade-wave'
  | 'property-crash'
  | 'liquidity-squeeze';

export interface ScenarioShockConfig {
  id: ScenarioType;
  name: string;
  description: string;
  pdMultiplier: number;
  lgdMultiplier: number;
  collateralHaircutAddon: number;
  ccfMultiplier: number;
  unemploymentDeltaPercent: number; // e.g. +3.5%
  gdpGrowthDeltaPercent: number; // e.g. -2.5%
  propertyPriceDeltaPercent: number; // e.g. -20%
}

export const PREBUILT_SCENARIOS: Record<ScenarioType, ScenarioShockConfig> = {
  baseline: {
    id: 'baseline',
    name: 'Baseline Economic Path',
    description: 'Current UK macroeconomic outlook (BoE 4.5% base rate, 1.8% GDP, 4.2% unemployment).',
    pdMultiplier: 1.0,
    lgdMultiplier: 1.0,
    collateralHaircutAddon: 0.0,
    ccfMultiplier: 1.0,
    unemploymentDeltaPercent: 0.0,
    gdpGrowthDeltaPercent: 0.0,
    propertyPriceDeltaPercent: 0.0,
  },
  'mild-recession': {
    id: 'mild-recession',
    name: 'Mild Economic Downturn',
    description: 'Moderate UK slowdown: GDP declines 1.5%, unemployment rises 2.0%, commercial property dips 10%.',
    pdMultiplier: 1.35,
    lgdMultiplier: 1.15,
    collateralHaircutAddon: 0.10,
    ccfMultiplier: 1.10,
    unemploymentDeltaPercent: 2.0,
    gdpGrowthDeltaPercent: -1.5,
    propertyPriceDeltaPercent: -10.0,
  },
  'severe-recession': {
    id: 'severe-recession',
    name: 'Severe Systemic Crisis',
    description: 'Deep recession shock: GDP drops 4.0%, unemployment spikes 4.5%, property values plunge 25%.',
    pdMultiplier: 2.10,
    lgdMultiplier: 1.40,
    collateralHaircutAddon: 0.25,
    ccfMultiplier: 1.25,
    unemploymentDeltaPercent: 4.5,
    gdpGrowthDeltaPercent: -4.0,
    propertyPriceDeltaPercent: -25.0,
  },
  'rating-downgrade-wave': {
    id: 'rating-downgrade-wave',
    name: 'Widespread Credit Downgrades',
    description: 'Systemic corporate credit migration: 2-notch rating downgrade across CRE and SME books.',
    pdMultiplier: 1.80,
    lgdMultiplier: 1.10,
    collateralHaircutAddon: 0.05,
    ccfMultiplier: 1.05,
    unemploymentDeltaPercent: 1.2,
    gdpGrowthDeltaPercent: -0.8,
    propertyPriceDeltaPercent: -5.0,
  },
  'property-crash': {
    id: 'property-crash',
    name: 'Commercial Property Crash',
    description: 'Severe CRE market devaluation: Commercial property valuations fall 35%, boosting LGDs.',
    pdMultiplier: 1.40,
    lgdMultiplier: 1.50,
    collateralHaircutAddon: 0.35,
    ccfMultiplier: 1.00,
    unemploymentDeltaPercent: 1.5,
    gdpGrowthDeltaPercent: -2.0,
    propertyPriceDeltaPercent: -35.0,
  },
  'liquidity-squeeze': {
    id: 'liquidity-squeeze',
    name: 'Wholesale Drawdown & Squeeze',
    description: 'Corporates draw max undrawn commitments under tight credit conditions.',
    pdMultiplier: 1.20,
    lgdMultiplier: 1.10,
    collateralHaircutAddon: 0.05,
    ccfMultiplier: 1.50,
    unemploymentDeltaPercent: 0.8,
    gdpGrowthDeltaPercent: -0.5,
    propertyPriceDeltaPercent: -2.0,
  },
};

/**
 * Applies a scenario shock config to a facility list and returns recalculations
 */
export function applyScenarioToFacilities(
  facilities: Facility[],
  config: ScenarioShockConfig
): Facility[] {
  return facilities.map((facility) => {
    const shockedPD = Math.min(0.99, facility.pd * config.pdMultiplier);
    const shockedLGD = Math.min(0.95, facility.lgd * config.lgdMultiplier);
    const shockedCCF = Math.min(1.00, facility.ccf * config.ccfMultiplier);

    const shockedEAD = calculateEAD({
      drawnGBP: facility.drawnGBP,
      undrawnGBP: facility.undrawnGBP,
      ccf: shockedCCF,
    });

    const shockedHaircut = Math.min(0.90, facility.collateral.haircut + config.collateralHaircutAddon);
    const shockedCollateralValuation = facility.collateral.valuationGBP * (1 + config.propertyPriceDeltaPercent / 100);

    const stagingResult = assessIFRS9Staging({
      dpd: facility.dpd,
      isDefaulted: facility.isDefaulted,
      currentPD: shockedPD,
      originationPD: facility.pd / 1.2, // Baseline proxy
      ratingDowngradeNotches: config.pdMultiplier > 1.5 ? 2 : 0,
      watchlistStatus: facility.sicrTriggered || config.pdMultiplier > 1.5,
    });

    const ecl12mGBP = calculateExpectedLoss({
      pd: shockedPD,
      lgd: shockedLGD,
      ead: shockedEAD,
    });

    const eclLifetimeGBP = stagingResult.stage >= 2 ? ecl12mGBP * 3.2 : ecl12mGBP;
    const provisionGBP = stagingResult.stage >= 2 ? eclLifetimeGBP : ecl12mGBP;

    const capitalResult = calculateCapitalWithFloor({
      eadGBP: shockedEAD,
      riskWeight: facility.riskWeight,
      pd: shockedPD,
      lgd: shockedLGD,
      isDefaulted: facility.isDefaulted,
      provisionGBP,
    });

    return {
      ...facility,
      pd: shockedPD,
      lgd: shockedLGD,
      ccf: shockedCCF,
      ead: shockedEAD,
      collateral: {
        ...facility.collateral,
        haircut: shockedHaircut,
        valuationGBP: Math.max(0, shockedCollateralValuation),
      },
      ifrs9Stage: stagingResult.stage,
      sicrTriggered: stagingResult.sicrTriggered,
      ecl12mGBP,
      eclLifetimeGBP,
      provisionGBP,
      rwaGBP: capitalResult.finalRwaGBP,
    };
  });
}
