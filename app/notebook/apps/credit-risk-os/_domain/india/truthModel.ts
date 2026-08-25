/**
 * CREDIT RISK OS 2.0 — INDIA BANKING DOMAIN TRUTH LAYER
 * Authoritative institution parameters, regulatory classification rules, and currency unit standards.
 */

export type RegulatoryRuleStatus =
  | 'CURRENT_RBI_FRAMEWORK'
  | 'BANK_POLICY_SIMULATION'
  | 'FUTURE_PROPOSED_REGULATORY_CHANGE';

export interface RegulatoryRuleMetadata {
  id: string;
  ruleName: string;
  regulator: 'Reserve Bank of India (RBI)' | 'Internal ALCO / Bank Policy' | 'Basel Committee (BCBS)';
  status: RegulatoryRuleStatus;
  primaryReferenceDoc: string;
  effectiveYear: string;
  description: string;
}

export const INSTITUTION_TRUTH_MODEL = {
  name: 'Indus Apex Bank India',
  classification: 'Scheduled Commercial Bank (SCB)',
  sector: 'Private Sector Bank',
  dSibStatus: 'Non-D-SIB',
  jurisdiction: 'India',
  regulator: 'Reserve Bank of India (RBI)',
  baseCurrency: 'INR',
  displayUnit: '₹ Crore',
  headlineAssetsInrCr: 38500, // ₹38,500 Cr
  headlineCet1CapitalInrCr: 4200, // ₹4,200 Cr
  headlineTotalCapitalInrCr: 4620, // ₹4,620 Cr
  headlineTotalRwaInrCr: 28000, // ₹28,000 Cr
  headlineCet1RatioPercent: 15.00, // 4,200 / 28,000 * 100
  headlineTier1RatioPercent: 17.14, // ₹4,800 Cr Tier 1 / ₹28,000 Cr
  headlineCrarPercent: 16.50, // Total Capital / Total RWA
  simulationDate: '31 July 2026',
};

export const RBI_BASEL_III_CAPITAL_RULES = {
  minimumCet1Percent: 5.50,
  capitalConservationBufferPercent: 2.50,
  cet1PlusCcbRequirementPercent: 8.00,
  minimumTier1Percent: 7.00,
  minimumCrarPercent: 9.00,
  totalCapitalPlusCcbRequirementPercent: 11.50,
  dSibSurchargePercent: 0.00, // Non-D-SIB
  ccybActive: false,
};

export const REGULATORY_TRUTH_RULES: Record<string, RegulatoryRuleMetadata> = {
  IRACP_PROVISIONING: {
    id: 'RULE-IRACP-01',
    ruleName: 'Income Recognition, Asset Classification and Provisioning (IRACP)',
    regulator: 'Reserve Bank of India (RBI)',
    status: 'CURRENT_RBI_FRAMEWORK',
    primaryReferenceDoc: 'RBI Master Circular - Prudential norms on Income Recognition, Asset Classification and Provisioning pertaining to Advances',
    effectiveYear: 'Active Supervisory Standard',
    description: 'Mandates DPD-based SMA/NPA classification (SMA-0/1/2, Substandard, Doubtful 1-3 yrs, Loss) and supervisory provisioning rates.',
  },
  RBI_BASEL_III_CAPITAL: {
    id: 'RULE-CAPITAL-01',
    ruleName: 'RBI Master Circular - Capital Adequacy (Basel III)',
    regulator: 'Reserve Bank of India (RBI)',
    status: 'CURRENT_RBI_FRAMEWORK',
    primaryReferenceDoc: 'RBI Master Circular - Prudential Guidelines on Capital Adequacy and Risk Management - Basel III',
    effectiveYear: 'Active Supervisory Standard',
    description: 'Mandates 5.5% minimum CET1, 2.5% CCB, 7.0% Tier 1, and 9.0% minimum CRAR for Scheduled Commercial Banks.',
  },
  LIQUIDITY_LCR_NSFR: {
    id: 'RULE-TREASURY-01',
    ruleName: 'RBI Liquidity Coverage Ratio (LCR) & Net Stable Funding Ratio (NSFR)',
    regulator: 'Reserve Bank of India (RBI)',
    status: 'CURRENT_RBI_FRAMEWORK',
    primaryReferenceDoc: 'RBI Guidelines on Liquidity Risk Management Framework - LCR and NSFR',
    effectiveYear: 'Active Supervisory Standard',
    description: 'Enforces minimum 100% LCR over 30-day stressed outflows and minimum 100% NSFR structural funding.',
  },
  FTP_INTERNAL_POLICY: {
    id: 'RULE-FTP-01',
    ruleName: 'Internal Funds Transfer Pricing (FTP) Methodology',
    regulator: 'Internal ALCO / Bank Policy',
    status: 'BANK_POLICY_SIMULATION',
    primaryReferenceDoc: 'Indus Apex Bank ALCO Policy Manual v4.2',
    effectiveYear: 'Internal Bank Policy',
    description: 'Internal bank transfer pricing decomposing loan rates into Base Rate, Liquidity Premium, Credit Spread, and Business Margin.',
  },
  ECL_TRANSITION_READINESS: {
    id: 'RULE-ECL-01',
    ruleName: 'Expected Credit Loss (ECL) Transition Framework',
    regulator: 'Reserve Bank of India (RBI)',
    status: 'FUTURE_PROPOSED_REGULATORY_CHANGE',
    primaryReferenceDoc: 'RBI Discussion Paper on Introduction of Expected Credit Loss (ECL) Framework for SCBs',
    effectiveYear: 'Proposed Future Migration',
    description: 'Future-state transition framework moving from IRACP incurred provisioning to 3-stage Expected Credit Loss modeling.',
  },
  BASEL_OUTPUT_FLOOR: {
    id: 'RULE-FLOOR-01',
    ruleName: 'Basel Final Reforms Output Floor Readiness',
    regulator: 'Basel Committee (BCBS)',
    status: 'FUTURE_PROPOSED_REGULATORY_CHANGE',
    primaryReferenceDoc: 'BCBS Basel III: Finalising post-crisis reforms (72.5% Output Floor)',
    effectiveYear: 'Proposed Future Adoption',
    description: 'Future-state readiness assessment for 72.5% Standardised RWA output floor on internal IRB risk models.',
  },
};
