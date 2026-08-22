export type UKSector =
  | 'Commercial Real Estate'
  | 'Residential Mortgages'
  | 'Wholesale Corporate'
  | 'SME Lending'
  | 'Retail Unsecured'
  | 'Specialized Infrastructure'
  | 'Financial Institutions';

export type InternalRating =
  | 'AAA'
  | 'AA'
  | 'A'
  | 'BBB'
  | 'BB'
  | 'B'
  | 'CCC'
  | 'D';

export type IFRS9Stage = 1 | 2 | 3;

export type RegulatoryApproach = 'Standardised' | 'AIRB' | 'FIRB';

export interface Collateral {
  id: string;
  type: 'Property' | 'Equipment' | 'Cash' | 'Corporate Guarantee' | 'Unsecured';
  valuationGBP: number;
  lastValuationDate: string;
  haircut: number; // e.g. 0.20 for 20%
}

export interface Obligor {
  id: string;
  name: string;
  groupName: string;
  groupCode: string;
  registrationNumber: string;
  sector: UKSector;
  geography: string; // e.g. 'London, UK', 'Manchester, UK'
  internalRating: InternalRating;
  externalRating: string;
  annualTurnoverGBP: number;
  watchlistStatus: boolean;
  watchlistReason?: string;
}

export interface Facility {
  id: string;
  facilityNumber: string;
  obligorId: string;
  obligorName: string;
  product: 'Term Loan' | 'Revolving Credit' | 'Mortgage' | 'Trade Finance' | 'Overdraft';
  currency: 'GBP' | 'EUR' | 'USD';
  limitGBP: number;
  drawnGBP: number;
  undrawnGBP: number;
  ccf: number; // Credit Conversion Factor (e.g. 0.50, 1.0)
  originationDate: string;
  maturityDate: string;
  collateral: Collateral;
  dpd: number; // Days Past Due
  isDefaulted: boolean;
  pd: number; // Probability of Default (e.g. 0.015 = 1.5%)
  lgd: number; // Loss Given Default (e.g. 0.35 = 35%)
  ead: number; // Exposure at Default = drawn + (ccf * undrawn)
  ifrs9Stage: IFRS9Stage;
  sicrTriggered: boolean;
  sicrReason?: string;
  ecl12mGBP: number;
  eclLifetimeGBP: number;
  provisionGBP: number; // Active carrying provision
  regulatoryApproach: RegulatoryApproach;
  riskWeight: number; // e.g. 0.75 or 1.00
  rwaGBP: number; // Risk Weighted Assets
  reportingStatus: 'Verified' | 'Pending Review' | 'Validation Warning';
}

export interface BankEntity {
  name: string;
  legalEntityCode: string;
  jurisdiction: string;
  regulator: string;
  baseCurrency: string;
  simulationDate: string; // '31 July 2026'
  wholeBankCet1CapitalGBP: number; // £420M CET1 Capital
  wholeBankTotalRwaGBP: number; // £2.80B Whole-Bank RWA (includes Credit, Market & OpRisk)
  wholeBankCet1RatioPercent: number; // ~15.00%
  totalAssetsGBP: number; // £3.85B Balance Sheet
  tier1CapitalGBP: number;
}

export interface PortfolioTotals {
  facilityCount: number;
  obligorCount: number;
  totalLimitGBP: number;
  totalDrawnGBP: number;
  totalUndrawnGBP: number;
  totalEadGBP: number;
  totalProvisionGBP: number;
  totalRwaGBP: number; // Credit portfolio RWA
  attributablePillar1CapitalGBP: number; // 8% of portfolio RWA
  stage1Count: number;
  stage2Count: number;
  stage3Count: number;
  watchlistCount: number;
  defaultCount: number;
}
