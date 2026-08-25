import { AssetQualityStatus, SMAStatus, ExposureCategory } from '../_engine/iracp';

export type WorkspaceId =
  | 'command-centre'
  | 'case-room'
  | 'risk-engine'
  | 'data-lab'
  | 'delivery-studio'
  | 'test-release';

export type SubToolId =
  | 'bank'
  | 'customers'
  | 'credit-risk'
  | 'iracp'
  | 'ifrs9'
  | 'capital'
  | 'treasury'
  | 'reporting'
  | 'data'
  | 'change'
  | 'regulation'
  | 'simulation-lab';

export type UKSector =
  | 'Commercial Real Estate'
  | 'Residential Mortgages'
  | 'Wholesale Corporate'
  | 'SME Lending'
  | 'Retail Unsecured'
  | 'Specialized Infrastructure'
  | 'Financial Institutions';

export type IndiaSector =
  | 'Commercial Real Estate'
  | 'Residential Housing'
  | 'Infrastructure & Energy'
  | 'Manufacturing & Industrial'
  | 'MSME & SME Enterprise'
  | 'Renewable Energy'
  | 'Healthcare & Pharma'
  | 'Technology Services'
  | 'Retail Unsecured';

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
  valuationInrCr: number;
  lastValuationDate: string;
  haircut: number;
  realisableValueInrCr: number;
}

export interface Obligor {
  id: string;
  name: string;
  groupName: string;
  groupCode: string;
  registrationNumber: string;
  sector: UKSector | IndiaSector | string;
  geography: string;
  internalRating: InternalRating;
  externalRating: string;
  annualTurnoverGBP: number;
  annualTurnoverInrCr: number;
  watchlistStatus: boolean;
  watchlistReason?: string;
}

export interface Facility {
  id: string;
  facilityNumber: string;
  obligorId: string;
  obligorName: string;
  product: 'Term Loan' | 'Revolving Credit' | 'Mortgage' | 'Trade Finance' | 'Overdraft' | 'Cash Credit';
  currency: 'INR' | 'GBP' | 'EUR' | 'USD';
  limitGBP: number;
  drawnGBP: number;
  undrawnGBP: number;
  ead: number;
  ecl12mGBP: number;
  eclLifetimeGBP: number;
  provisionGBP: number;
  rwaGBP: number;

  // India Domain Fields
  sanctionedLimitInrCr: number;
  outstandingInrCr: number;
  undrawnInrCr: number;
  drawingPowerInrCr: number;
  daysPastDue: number;
  dpd: number;
  isDefaulted: boolean;
  isNPA: boolean;
  assetQualityStatus: AssetQualityStatus;
  smaStatus: SMAStatus;
  exposureCategory: ExposureCategory;
  npaSinceDate?: string;
  ccf: number;
  originationDate: string;
  maturityDate: string;
  collateral: Collateral;
  securedFlag: boolean;
  realisableSecurityInrCr: number;
  pd: number;
  lgd: number;
  eadInrCr: number;
  ifrs9Stage: IFRS9Stage;
  sicrTriggered: boolean;
  sicrReason?: string;
  iracpProvisionRatePercent: number;
  iracpProvisionRequiredInrCr: number;
  iracpProvisionInrCr?: number;
  internalRating?: InternalRating;
  sector?: string;
  regulatoryApproach: RegulatoryApproach;
  riskWeightPercent: number;
  riskWeight: number;
  rwaInrCr: number;
  reportingStatus: 'Verified' | 'Pending Review' | 'Validation Warning';
}

export interface BankEntity {
  name: string;
  legalEntityCode: string;
  jurisdiction: string;
  regulator: string;
  baseCurrency: string;
  simulationDate: string;
  wholeBankCet1CapitalInrCr: number;
  wholeBankTotalRwaInrCr: number;
  wholeBankCet1RatioPercent: number;
  wholeBankTier1RatioPercent: number;
  wholeBankCrarPercent: number;
  totalAssetsInrCr: number;
  tier1CapitalInrCr: number;
  wholeBankCet1CapitalGBP: number;
  wholeBankTotalRwaGBP: number;
  totalAssetsGBP: number;
  tier1CapitalGBP: number;
}

export interface PortfolioTotals {
  facilityCount: number;
  obligorCount: number;
  totalLimitInrCr: number;
  totalOutstandingInrCr: number;
  totalUndrawnInrCr: number;
  totalEadInrCr: number;
  totalIracpProvisionInrCr: number;
  totalRwaInrCr: number;
  attributableCapitalReqInrCr: number;
  grossNpaInrCr: number;
  grossNpaRatioPercent: number;
  standardCount: number;
  sma0Count: number;
  sma1Count: number;
  sma2Count: number;
  npaCount: number;
  watchlistCount: number;
  totalLimitGBP: number;
  totalDrawnGBP: number;
  totalUndrawnGBP: number;
  totalEadGBP: number;
  totalProvisionGBP: number;
  totalRwaGBP: number;
  attributablePillar1CapitalGBP: number;
  stage1Count: number;
  stage2Count: number;
  stage3Count: number;
  defaultCount: number;
}
