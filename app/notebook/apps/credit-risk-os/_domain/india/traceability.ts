/**
 * CREDIT RISK OS 2.0 — REGULATORY TRACEABILITY METADATA
 * Maps system modules and calculation engines directly to RBI regulatory documents.
 */

import { REGULATORY_TRUTH_RULES, RegulatoryRuleMetadata } from './truthModel';

export interface RegulatoryTraceabilityMapping {
  moduleId: string;
  moduleName: string;
  ruleMetadata: RegulatoryRuleMetadata;
  targetCalculationEngine: string;
  verificationStatus: 'Verified Active' | 'Future State Prototype' | 'Internal Simulation';
}

export const REGULATORY_TRACEABILITY_CATALOG: RegulatoryTraceabilityMapping[] = [
  {
    moduleId: 'MOD-IRACP-01',
    moduleName: 'IRACP Asset Quality & Provisioning Engine',
    ruleMetadata: REGULATORY_TRUTH_RULES.IRACP_PROVISIONING,
    targetCalculationEngine: '_engine/iracp.ts',
    verificationStatus: 'Verified Active',
  },
  {
    moduleId: 'MOD-CAPITAL-01',
    moduleName: 'RBI Basel III Capital & CRAR Engine',
    ruleMetadata: REGULATORY_TRUTH_RULES.RBI_BASEL_III_CAPITAL,
    targetCalculationEngine: '_engine/rbiCapital.ts',
    verificationStatus: 'Verified Active',
  },
  {
    moduleId: 'MOD-TREASURY-01',
    moduleName: 'LCR & NSFR Liquidity Engine',
    ruleMetadata: REGULATORY_TRUTH_RULES.LIQUIDITY_LCR_NSFR,
    targetCalculationEngine: '_engine/treasury.ts',
    verificationStatus: 'Verified Active',
  },
  {
    moduleId: 'MOD-FTP-01',
    moduleName: 'Funds Transfer Pricing (FTP) Stack',
    ruleMetadata: REGULATORY_TRUTH_RULES.FTP_INTERNAL_POLICY,
    targetCalculationEngine: '_engine/treasury.ts',
    verificationStatus: 'Internal Simulation',
  },
  {
    moduleId: 'MOD-ECL-FUTURE',
    moduleName: 'ECL Transition Simulation Engine',
    ruleMetadata: REGULATORY_TRUTH_RULES.ECL_TRANSITION_READINESS,
    targetCalculationEngine: '_engine/ifrs9.ts (Legacy Reference)',
    verificationStatus: 'Future State Prototype',
  },
];
