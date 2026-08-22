import {
  BankEntity,
  Obligor,
  Facility,
  PortfolioTotals,
  InternalRating,
  UKSector,
  IFRS9Stage
} from '../_types';

export const RENFORGE_BANK_ENTITY: BankEntity = {
  name: 'Renforge Bank plc',
  legalEntityCode: 'LEI-UK-213800RFB99120',
  jurisdiction: 'United Kingdom',
  regulator: 'Prudential Regulation Authority (PRA) / FCA',
  baseCurrency: 'GBP',
  simulationDate: '31 July 2026',
  wholeBankCet1CapitalGBP: 420_000_000, // £420M Whole-Bank CET1 Capital
  wholeBankTotalRwaGBP: 2_800_000_000, // £2.80B Whole-Bank RWA (Credit, Market, OpRisk)
  wholeBankCet1RatioPercent: 15.00, // 15.00% Whole-Bank CET1 Ratio
  totalAssetsGBP: 3_850_000_000, // £3.85B Balance Sheet Assets
  tier1CapitalGBP: 480_000_000,
};

export const SYNTHETIC_OBLIGORS: Obligor[] = [
  {
    id: 'OBL-101',
    name: 'Thames Logistics & Distribution Group plc',
    groupName: 'Thames Logistics Group',
    groupCode: 'GRP-THAMES-01',
    registrationNumber: 'UK-08472910',
    sector: 'Commercial Real Estate',
    geography: 'London & SE, UK',
    internalRating: 'BBB',
    externalRating: 'Baa2',
    annualTurnoverGBP: 145_000_000,
    watchlistStatus: false,
  },
  {
    id: 'OBL-102',
    name: 'Caledonia Energy & Marine Ltd',
    groupName: 'Caledonia Holdings',
    groupCode: 'GRP-CAL-04',
    registrationNumber: 'SC-19283711',
    sector: 'Specialized Infrastructure',
    geography: 'Aberdeen, UK',
    internalRating: 'A',
    externalRating: 'A3',
    annualTurnoverGBP: 220_000_000,
    watchlistStatus: false,
  },
  {
    id: 'OBL-103',
    name: 'Midland Retail Properties plc',
    groupName: 'Midland Holdings',
    groupCode: 'GRP-MID-02',
    registrationNumber: 'UK-04820194',
    sector: 'Commercial Real Estate',
    geography: 'Birmingham, UK',
    internalRating: 'BB',
    externalRating: 'Ba2',
    annualTurnoverGBP: 68_000_000,
    watchlistStatus: true,
    watchlistReason: 'LTV breached 70% threshold due to commercial property revaluation.',
  },
  {
    id: 'OBL-104',
    name: 'Bristol Precision Engineering Ltd',
    groupName: 'Bristol Industrial Group',
    groupCode: 'GRP-BRIS-01',
    registrationNumber: 'UK-09382011',
    sector: 'SME Lending',
    geography: 'Bristol, UK',
    internalRating: 'BBB',
    externalRating: 'Baa3',
    annualTurnoverGBP: 34_000_000,
    watchlistStatus: false,
  },
  {
    id: 'OBL-105',
    name: 'Yorkshire Health & Care Facilities Ltd',
    groupName: 'Care Trust UK',
    groupCode: 'GRP-CARE-09',
    registrationNumber: 'UK-05739102',
    sector: 'Wholesale Corporate',
    geography: 'Leeds, UK',
    internalRating: 'AA',
    externalRating: 'Aa3',
    annualTurnoverGBP: 180_000_000,
    watchlistStatus: false,
  },
  {
    id: 'OBL-106',
    name: 'Highland Hospitality & Leisure Ltd',
    groupName: 'Highland Leisure Group',
    groupCode: 'GRP-[#HIGH-03',
    registrationNumber: 'SC-20948172',
    sector: 'SME Lending',
    geography: 'Edinburgh, UK',
    internalRating: 'CCC',
    externalRating: 'Caa1',
    annualTurnoverGBP: 14_000_000,
    watchlistStatus: true,
    watchlistReason: 'Defaulted: Overdue payments > 90 days past due.',
  },
  {
    id: 'OBL-107',
    name: 'Manchester Residential Developments Ltd',
    groupName: 'Manchester Property Group',
    groupCode: 'GRP-MAN-05',
    registrationNumber: 'UK-07391048',
    sector: 'Residential Mortgages',
    geography: 'Manchester, UK',
    internalRating: 'B',
    externalRating: 'B2',
    annualTurnoverGBP: 42_000_000,
    watchlistStatus: true,
    watchlistReason: '30+ DPD backstop triggered; relative PD increased by 3.2x.',
  },
  {
    id: 'OBL-108',
    name: 'Apex Data Technology Systems Ltd',
    groupName: 'Apex Tech Group',
    groupCode: 'GRP-APEX-01',
    registrationNumber: 'UK-10928374',
    sector: 'Wholesale Corporate',
    geography: 'Cambridge, UK',
    internalRating: 'A',
    externalRating: 'A2',
    annualTurnoverGBP: 95_000_000,
    watchlistStatus: false,
  },
];

export const SYNTHETIC_FACILITIES: Facility[] = [
  {
    id: 'FAC-2025-001',
    facilityNumber: 'LON-CRE-8801',
    obligorId: 'OBL-101',
    obligorName: 'Thames Logistics & Distribution Group plc',
    product: 'Term Loan',
    currency: 'GBP',
    limitGBP: 50_000_000,
    drawnGBP: 45_000_000,
    undrawnGBP: 5_000_000,
    ccf: 0.50,
    originationDate: '2022-03-15',
    maturityDate: '2028-03-15',
    collateral: {
      id: 'COL-901',
      type: 'Property',
      valuationGBP: 65_000_000,
      lastValuationDate: '2025-11-30',
      haircut: 0.15,
    },
    dpd: 0,
    isDefaulted: false,
    pd: 0.012, // 1.2%
    lgd: 0.25, // 25%
    ead: 47_500_000, // 45M + 0.50*5M
    ifrs9Stage: 1,
    sicrTriggered: false,
    ecl12mGBP: 142_500, // 47.5M * 0.012 * 0.25
    eclLifetimeGBP: 427_500,
    provisionGBP: 142_500,
    regulatoryApproach: 'AIRB',
    riskWeight: 0.45,
    rwaGBP: 21_375_000,
    reportingStatus: 'Verified',
  },
  {
    id: 'FAC-2025-002',
    facilityNumber: 'SCO-INF-9902',
    obligorId: 'OBL-102',
    obligorName: 'Caledonia Energy & Marine Ltd',
    product: 'Term Loan',
    currency: 'GBP',
    limitGBP: 80_000_000,
    drawnGBP: 70_000_000,
    undrawnGBP: 10_000_000,
    ccf: 0.50,
    originationDate: '2023-01-10',
    maturityDate: '2030-01-10',
    collateral: {
      id: 'COL-902',
      type: 'Equipment',
      valuationGBP: 95_000_000,
      lastValuationDate: '2025-10-15',
      haircut: 0.20,
    },
    dpd: 0,
    isDefaulted: false,
    pd: 0.008, // 0.8%
    lgd: 0.20, // 20%
    ead: 75_000_000,
    ifrs9Stage: 1,
    sicrTriggered: false,
    ecl12mGBP: 120_000,
    eclLifetimeGBP: 360_000,
    provisionGBP: 120_000,
    regulatoryApproach: 'AIRB',
    riskWeight: 0.35,
    rwaGBP: 26_250_000,
    reportingStatus: 'Verified',
  },
  {
    id: 'FAC-2025-003',
    facilityNumber: 'MID-CRE-4403',
    obligorId: 'OBL-103',
    obligorName: 'Midland Retail Properties plc',
    product: 'Revolving Credit',
    currency: 'GBP',
    limitGBP: 35_000_000,
    drawnGBP: 30_000_000,
    undrawnGBP: 5_000_000,
    ccf: 0.75,
    originationDate: '2021-06-20',
    maturityDate: '2026-06-20',
    collateral: {
      id: 'COL-903',
      type: 'Property',
      valuationGBP: 38_000_000,
      lastValuationDate: '2025-12-01',
      haircut: 0.25,
    },
    dpd: 42, // Stage 2 (>30 DPD)
    isDefaulted: false,
    pd: 0.065, // 6.5%
    lgd: 0.40, // 40%
    ead: 33_750_000, // 30M + 0.75*5M
    ifrs9Stage: 2,
    sicrTriggered: true,
    sicrReason: '30+ DPD backstop hit and 2-notch internal rating downgrade (BBB -> BB)',
    ecl12mGBP: 877_500,
    eclLifetimeGBP: 2_632_500,
    provisionGBP: 2_632_500, // Lifetime ECL for Stage 2
    regulatoryApproach: 'AIRB',
    riskWeight: 0.95,
    rwaGBP: 32_062_500,
    reportingStatus: 'Verified',
  },
  {
    id: 'FAC-2025-004',
    facilityNumber: 'BRIS-SME-1104',
    obligorId: 'OBL-104',
    obligorName: 'Bristol Precision Engineering Ltd',
    product: 'Term Loan',
    currency: 'GBP',
    limitGBP: 12_000_000,
    drawnGBP: 10_000_000,
    undrawnGBP: 2_000_000,
    ccf: 0.50,
    originationDate: '2022-09-01',
    maturityDate: '2027-09-01',
    collateral: {
      id: 'COL-904',
      type: 'Equipment',
      valuationGBP: 14_000_000,
      lastValuationDate: '2025-08-20',
      haircut: 0.20,
    },
    dpd: 0,
    isDefaulted: false,
    pd: 0.018,
    lgd: 0.30,
    ead: 11_000_000,
    ifrs9Stage: 1,
    sicrTriggered: false,
    ecl12mGBP: 59_400,
    eclLifetimeGBP: 178_200,
    provisionGBP: 59_400,
    regulatoryApproach: 'Standardised',
    riskWeight: 0.75,
    rwaGBP: 8_250_000,
    reportingStatus: 'Verified',
  },
  {
    id: 'FAC-2025-005',
    facilityNumber: 'YORK-COR-3305',
    obligorId: 'OBL-105',
    obligorName: 'Yorkshire Health & Care Facilities Ltd',
    product: 'Term Loan',
    currency: 'GBP',
    limitGBP: 60_000_000,
    drawnGBP: 55_000_000,
    undrawnGBP: 5_000_000,
    ccf: 0.50,
    originationDate: '2020-04-15',
    maturityDate: '2029-04-15',
    collateral: {
      id: 'COL-905',
      type: 'Property',
      valuationGBP: 85_000_000,
      lastValuationDate: '2025-11-10',
      haircut: 0.15,
    },
    dpd: 0,
    isDefaulted: false,
    pd: 0.005,
    lgd: 0.18,
    ead: 57_500_000,
    ifrs9Stage: 1,
    sicrTriggered: false,
    ecl12mGBP: 51_750,
    eclLifetimeGBP: 155_250,
    provisionGBP: 51_750,
    regulatoryApproach: 'AIRB',
    riskWeight: 0.25,
    rwaGBP: 14_375_000,
    reportingStatus: 'Verified',
  },
  {
    id: 'FAC-2025-006',
    facilityNumber: 'HIG-DEF-7706',
    obligorId: 'OBL-106',
    obligorName: 'Highland Hospitality & Leisure Ltd',
    product: 'Overdraft',
    currency: 'GBP',
    limitGBP: 8_000_000,
    drawnGBP: 8_000_000,
    undrawnGBP: 0,
    ccf: 1.00,
    originationDate: '2019-11-01',
    maturityDate: '2024-11-01',
    collateral: {
      id: 'COL-906',
      type: 'Unsecured',
      valuationGBP: 0,
      lastValuationDate: '2025-01-01',
      haircut: 1.00,
    },
    dpd: 112, // Stage 3 (>90 DPD Defaulted)
    isDefaulted: true,
    pd: 1.00, // 100% default
    lgd: 0.65, // 65% loss expected
    ead: 8_000_000,
    ifrs9Stage: 3,
    sicrTriggered: true,
    sicrReason: 'Default precedence triggered: >90 DPD overdue and liquidation notice filed.',
    ecl12mGBP: 5_200_000,
    eclLifetimeGBP: 5_200_000,
    provisionGBP: 5_200_000, // Stage 3 Specific Provision
    regulatoryApproach: 'Standardised',
    riskWeight: 1.50, // Default risk weight
    rwaGBP: 12_000_000,
    reportingStatus: 'Verified',
  },
  {
    id: 'FAC-2025-007',
    facilityNumber: 'MAN-RES-5507',
    obligorId: 'OBL-107',
    obligorName: 'Manchester Residential Developments Ltd',
    product: 'Term Loan',
    currency: 'GBP',
    limitGBP: 22_000_000,
    drawnGBP: 20_000_000,
    undrawnGBP: 2_000_000,
    ccf: 0.50,
    originationDate: '2023-05-10',
    maturityDate: '2028-05-10',
    collateral: {
      id: 'COL-907',
      type: 'Property',
      valuationGBP: 24_000_000,
      lastValuationDate: '2025-10-01',
      haircut: 0.20,
    },
    dpd: 38, // Stage 2
    isDefaulted: false,
    pd: 0.085,
    lgd: 0.45,
    ead: 21_000_000,
    ifrs9Stage: 2,
    sicrTriggered: true,
    sicrReason: 'Relative PD threshold breached (>3.0x vs origination PD of 2.2%)',
    ecl12mGBP: 803_250,
    eclLifetimeGBP: 2_409_750,
    provisionGBP: 2_409_750,
    regulatoryApproach: 'Standardised',
    riskWeight: 1.00,
    rwaGBP: 21_000_000,
    reportingStatus: 'Verified',
  },
  {
    id: 'FAC-2025-008',
    facilityNumber: 'CAM-TC-2208',
    obligorId: 'OBL-108',
    obligorName: 'Apex Data Technology Systems Ltd',
    product: 'Revolving Credit',
    currency: 'GBP',
    limitGBP: 40_000_000,
    drawnGBP: 25_000_000,
    undrawnGBP: 15_000_000,
    ccf: 0.50,
    originationDate: '2024-02-01',
    maturityDate: '2029-02-01',
    collateral: {
      id: 'COL-908',
      type: 'Cash',
      valuationGBP: 10_000_000,
      lastValuationDate: '2025-12-01',
      haircut: 0.00,
    },
    dpd: 0,
    isDefaulted: false,
    pd: 0.010,
    lgd: 0.22,
    ead: 32_500_000,
    ifrs9Stage: 1,
    sicrTriggered: false,
    ecl12mGBP: 71_500,
    eclLifetimeGBP: 214_500,
    provisionGBP: 71_500,
    regulatoryApproach: 'AIRB',
    riskWeight: 0.40,
    rwaGBP: 13_000_000,
    reportingStatus: 'Verified',
  },
];

// ─── REUSABLE SELECTORS & HELPERS ───

export function getCustomerById(id: string): Obligor | undefined {
  return SYNTHETIC_OBLIGORS.find((o) => o.id === id);
}

export function getFacilityById(id: string): Facility | undefined {
  return SYNTHETIC_FACILITIES.find((f) => f.id === id);
}

export function getFacilitiesByObligor(obligorId: string): Facility[] {
  return SYNTHETIC_FACILITIES.filter((f) => f.obligorId === obligorId);
}

export function getFacilitiesByStage(stage: IFRS9Stage): Facility[] {
  return SYNTHETIC_FACILITIES.filter((f) => f.ifrs9Stage === stage);
}

export function getPortfolioTotals(facilities: Facility[] = SYNTHETIC_FACILITIES): PortfolioTotals {
  const facilityCount = facilities.length;
  const uniqueObligors = new Set(facilities.map((f) => f.obligorId));
  const obligorCount = uniqueObligors.size;

  const totalLimitGBP = facilities.reduce((sum, f) => sum + f.limitGBP, 0);
  const totalDrawnGBP = facilities.reduce((sum, f) => sum + f.drawnGBP, 0);
  const totalUndrawnGBP = facilities.reduce((sum, f) => sum + f.undrawnGBP, 0);
  const totalEadGBP = facilities.reduce((sum, f) => sum + f.ead, 0);
  const totalProvisionGBP = facilities.reduce((sum, f) => sum + f.provisionGBP, 0);
  const totalRwaGBP = facilities.reduce((sum, f) => sum + f.rwaGBP, 0);
  const attributablePillar1CapitalGBP = totalRwaGBP * 0.08;

  const stage1Count = facilities.filter((f) => f.ifrs9Stage === 1).length;
  const stage2Count = facilities.filter((f) => f.ifrs9Stage === 2).length;
  const stage3Count = facilities.filter((f) => f.ifrs9Stage === 3).length;

  const watchlistCount = facilities.filter((f) => {
    const obligor = getCustomerById(f.obligorId);
    return obligor?.watchlistStatus || f.sicrTriggered;
  }).length;

  const defaultCount = facilities.filter((f) => f.isDefaulted).length;

  return {
    facilityCount,
    obligorCount,
    totalLimitGBP,
    totalDrawnGBP,
    totalUndrawnGBP,
    totalEadGBP,
    totalProvisionGBP,
    totalRwaGBP,
    attributablePillar1CapitalGBP,
    stage1Count,
    stage2Count,
    stage3Count,
    watchlistCount,
    defaultCount,
  };
}

export function getRatingDistribution(facilities: Facility[] = SYNTHETIC_FACILITIES): Record<InternalRating, number> {
  const dist: Record<InternalRating, number> = {
    AAA: 0, AA: 0, A: 0, BBB: 0, BB: 0, B: 0, CCC: 0, D: 0,
  };

  facilities.forEach((f) => {
    const obligor = getCustomerById(f.obligorId);
    if (obligor && obligor.internalRating in dist) {
      dist[obligor.internalRating]++;
    }
  });

  return dist;
}

export function getSectorConcentration(facilities: Facility[] = SYNTHETIC_FACILITIES): Record<UKSector | string, number> {
  const dist: Record<string, number> = {};

  facilities.forEach((f) => {
    const obligor = getCustomerById(f.obligorId);
    const sector = obligor?.sector || 'Other';
    dist[sector] = (dist[sector] || 0) + f.ead;
  });

  return dist;
}
