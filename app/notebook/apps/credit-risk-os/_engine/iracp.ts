/**
 * CREDIT RISK OS 2.0 — RBI IRACP ENGINE
 * Income Recognition, Asset Classification and Provisioning (IRACP) Engine for Indian Scheduled Commercial Banks.
 */

export type SMAStatus = 'Standard' | 'SMA-0' | 'SMA-1' | 'SMA-2';

export type NPACategory = 'Substandard' | 'Doubtful-1' | 'Doubtful-2' | 'Doubtful-3' | 'Loss';

export type AssetQualityStatus = SMAStatus | NPACategory;

export type ExposureCategory =
  | 'CRE'
  | 'CRE-Residential'
  | 'Farm-MSE-Housing'
  | 'Other-Commercial';

export interface IRACPClassificationInput {
  dpd: number;
  npaMonths?: number;
  isLossAsset?: boolean;
  isOutOfOrderCashCredit?: boolean;
}

export interface IRACPClassificationResult {
  assetQualityStatus: AssetQualityStatus;
  isNPA: boolean;
  smaStatus: SMAStatus;
  npaCategory?: NPACategory;
  classificationReason: string;
}

export interface IRACPProvisionInput {
  outstandingInrCr: number;
  realisableSecurityInrCr: number;
  assetQualityStatus: AssetQualityStatus;
  exposureCategory: ExposureCategory;
  isSecured: boolean;
}

export interface IRACPProvisionResult {
  outstandingInrCr: number;
  realisableSecurityInrCr: number;
  securedPortionInrCr: number;
  unsecuredPortionInrCr: number;
  assetQualityStatus: AssetQualityStatus;
  securedProvisionRatePercent: number;
  unsecuredProvisionRatePercent: number;
  securedProvisionInrCr: number;
  unsecuredProvisionInrCr: number;
  totalRequiredProvisionInrCr: number;
  effectiveProvisionRatePercent: number;
}

/**
 * Assesses Asset Quality classification under RBI IRACP guidelines
 */
export function classifyIRACPAsset(input: IRACPClassificationInput): IRACPClassificationResult {
  const { dpd, npaMonths = 0, isLossAsset = false, isOutOfOrderCashCredit = false } = input;

  if (isLossAsset) {
    return {
      assetQualityStatus: 'Loss',
      isNPA: true,
      smaStatus: 'SMA-2',
      npaCategory: 'Loss',
      classificationReason: 'Loss asset identified by bank/auditor inspection.',
    };
  }

  // Check NPA threshold (>90 DPD or Cash Credit out-of-order)
  if (dpd > 90 || isOutOfOrderCashCredit) {
    let npaCategory: NPACategory = 'Substandard';
    let reason = `Overdue >90 DPD (${dpd} DPD). Classified as Substandard NPA.`;

    if (isOutOfOrderCashCredit && dpd <= 90) {
      reason = 'Cash Credit / Overdraft facility out-of-order >90 days. Classified as Substandard NPA.';
    }

    if (npaMonths > 36) {
      npaCategory = 'Doubtful-3';
      reason = `Substandard status exceeded 36 months (${npaMonths} mo). Classified as Doubtful-3 NPA (>3 years).`;
    } else if (npaMonths > 12) {
      npaCategory = 'Doubtful-2';
      reason = `Substandard status exceeded 12 months (${npaMonths} mo). Classified as Doubtful-2 NPA (1-3 years).`;
    } else if (npaMonths > 0) {
      npaCategory = 'Doubtful-1';
      reason = `Substandard status reached 12 months (${npaMonths} mo). Classified as Doubtful-1 NPA (up to 1 year).`;
    }

    return {
      assetQualityStatus: npaCategory,
      isNPA: true,
      smaStatus: 'SMA-2',
      npaCategory,
      classificationReason: reason,
    };
  }

  // Performing SMA classification
  if (dpd > 60) {
    return {
      assetQualityStatus: 'SMA-2',
      isNPA: false,
      smaStatus: 'SMA-2',
      classificationReason: `Overdue >60 to 90 DPD (${dpd} DPD). Special Mention Account 2.`,
    };
  }

  if (dpd > 30) {
    return {
      assetQualityStatus: 'SMA-1',
      isNPA: false,
      smaStatus: 'SMA-1',
      classificationReason: `Overdue >30 to 60 DPD (${dpd} DPD). Special Mention Account 1.`,
    };
  }

  if (dpd > 0) {
    return {
      assetQualityStatus: 'SMA-0',
      isNPA: false,
      smaStatus: 'SMA-0',
      classificationReason: `Overdue 1 to 30 DPD (${dpd} DPD). Special Mention Account 0.`,
    };
  }

  return {
    assetQualityStatus: 'Standard',
    isNPA: false,
    smaStatus: 'Standard',
    classificationReason: 'Fully performing standard asset.',
  };
}

/**
 * Calculates RBI IRACP Required Provision
 */
export function calculateIRACPProvision(input: IRACPProvisionInput): IRACPProvisionResult {
  const { outstandingInrCr, realisableSecurityInrCr, assetQualityStatus, exposureCategory, isSecured } = input;

  const securedPortionInrCr = Math.min(outstandingInrCr, isSecured ? realisableSecurityInrCr : 0);
  const unsecuredPortionInrCr = Math.max(0, outstandingInrCr - securedPortionInrCr);

  let securedProvisionRatePercent = 0.40;
  let unsecuredProvisionRatePercent = 0.40;

  switch (assetQualityStatus) {
    case 'Standard':
    case 'SMA-0':
    case 'SMA-1':
    case 'SMA-2':
      if (exposureCategory === 'Farm-MSE-Housing') {
        securedProvisionRatePercent = 0.25;
        unsecuredProvisionRatePercent = 0.25;
      } else if (exposureCategory === 'CRE') {
        securedProvisionRatePercent = 1.00;
        unsecuredProvisionRatePercent = 1.00;
      } else if (exposureCategory === 'CRE-Residential') {
        securedProvisionRatePercent = 0.75;
        unsecuredProvisionRatePercent = 0.75;
      } else {
        securedProvisionRatePercent = 0.40;
        unsecuredProvisionRatePercent = 0.40;
      }
      break;

    case 'Substandard':
      securedProvisionRatePercent = 15.0;
      unsecuredProvisionRatePercent = 25.0;
      break;

    case 'Doubtful-1':
      securedProvisionRatePercent = 25.0;
      unsecuredProvisionRatePercent = 100.0;
      break;

    case 'Doubtful-2':
      securedProvisionRatePercent = 40.0;
      unsecuredProvisionRatePercent = 100.0;
      break;

    case 'Doubtful-3':
      securedProvisionRatePercent = 100.0;
      unsecuredProvisionRatePercent = 100.0;
      break;

    case 'Loss':
      securedProvisionRatePercent = 100.0;
      unsecuredProvisionRatePercent = 100.0;
      break;
  }

  const securedProvisionInrCr = (securedPortionInrCr * securedProvisionRatePercent) / 100;
  const unsecuredProvisionInrCr = (unsecuredPortionInrCr * unsecuredProvisionRatePercent) / 100;
  const totalRequiredProvisionInrCr = securedProvisionInrCr + unsecuredProvisionInrCr;

  const effectiveProvisionRatePercent =
    outstandingInrCr > 0 ? (totalRequiredProvisionInrCr / outstandingInrCr) * 100 : 0;

  return {
    outstandingInrCr,
    realisableSecurityInrCr,
    securedPortionInrCr,
    unsecuredPortionInrCr,
    assetQualityStatus,
    securedProvisionRatePercent,
    unsecuredProvisionRatePercent,
    securedProvisionInrCr,
    unsecuredProvisionInrCr,
    totalRequiredProvisionInrCr,
    effectiveProvisionRatePercent,
  };
}
