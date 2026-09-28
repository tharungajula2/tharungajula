import type { RuleValue, SimRules } from '../types';

// Every number here is a teaching parameter unless marked otherwise. PLACEHOLDER until the
// architect's content pack replaces this file.
const ill = (value: number, label: string, source?: string): RuleValue => ({
  value, label, illustrative: true, verified: false, source,
});

export const rules: SimRules = {
  gradePd: {
    G1: ill(0.0005, 'Grade 1 12-month PD'),
    G2: ill(0.001, 'Grade 2 12-month PD'),
    G3: ill(0.0025, 'Grade 3 12-month PD'),
    G4: ill(0.005, 'Grade 4 12-month PD'),
    G5: ill(0.01, 'Grade 5 12-month PD'),
    G6: ill(0.025, 'Grade 6 12-month PD'),
    G7: ill(0.06, 'Grade 7 12-month PD'),
    G8: ill(0.15, 'Grade 8 12-month PD'),
  },
  gradeOrder: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8'],
  pdFloor: ill(0.0003, 'PD floor', 'Basel IRB corporate PD floor 0.03% (Basel 3.1 raises many to 0.05%)'),
  pdCap: ill(0.999, 'PD cap for performing exposures'),
  sicrPdRatio: ill(2.0, 'SICR relative threshold: current PD ÷ origination PD'),
  stage2ProbationMonths: ill(3, 'Months all SICR triggers must be clear before Stage 2 → 1'),
  stage3ProbationMonths: ill(3, 'Months current, no UTP, before Stage 3 → 2'),
  rollMissWeights: { value: [1, 4, 8, 12], label: 'Relative miss propensity by bucket', illustrative: true, verified: false },
  rollCureShares: { value: [0, 0.5, 0.3, 0.2], label: 'Share of non-missing borrowers who clear all arrears', illustrative: true, verified: false },
  rollMissCap: ill(0.95, 'Maximum monthly miss probability'),
  ccfAccounting: ill(0.6, 'Behavioural CCF on undrawn (accounting ECL)'),
  ccfRegulatory: ill(0.4, 'Regulatory CCF on undrawn commitments (SA)', 'Basel 3.1 SA commitments 40% (UCC 10%)'),
  unsecuredRecoveryRate: ill(0.1, 'Recovery rate on the unsecured part'),
  recoveryCostRate: ill(0.05, 'Recovery costs as a share of exposure'),
  recoveryMonths: ill(12, 'Months from default to recovery'),
  riskWeights: {
    retail: ill(0.75, 'SA regulatory retail risk weight', 'Basel SA'),
    sme: ill(0.85, 'SA SME corporate risk weight', 'Basel 3.1 SA'),
    corporate: ill(1.0, 'SA unrated corporate risk weight', 'Basel SA'),
  },
  defaultedRwLowProvision: ill(1.5, 'Defaulted RW when specific provisions < threshold', 'Basel SA'),
  defaultedRwHighProvision: ill(1.0, 'Defaulted RW when specific provisions ≥ threshold', 'Basel SA'),
  defaultedProvisionThreshold: ill(0.2, 'Specific-provision threshold for defaulted RW', 'Basel SA'),
  opexRate: ill(0.01, 'Operating cost as an annual share of GCA'),
  cet1Target: ill(0.11, 'Target CET1 ratio used in pricing'),
  hurdleRate: ill(0.15, 'Hurdle return on capital used in pricing'),
  scenarios: {
    base: { id: 'base', label: 'Base', macro: [1], cvi: [1] },
    storm: { id: 'storm', label: 'Storm (living city)', macro: [1.8], cvi: [0.85] },
    downturn: {
      id: 'downturn',
      label: 'Downturn',
      macro: [1, 1, 1.1, 1.25, 1.5, 1.8, 2, 2, 1.9, 1.7, 1.5, 1.3, 1.2],
      cvi: [1, 1, 0.98, 0.95, 0.92, 0.9, 0.88, 0.88, 0.9, 0.92, 0.94, 0.96, 0.97],
    },
  },
};
