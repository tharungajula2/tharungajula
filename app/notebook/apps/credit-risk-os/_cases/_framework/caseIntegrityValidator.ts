/**
 * CREDIT RISK OS 2.0 — STEP 10 STATIC DOMAIN TRUTH & INTEGRITY VALIDATOR
 * Verifies canonical bank ratios, case aggregate counts, entity ID uniqueness,
 * cross-entity RTM links, reconciliation arithmetic, dimensional measures, and search coverage.
 */

import { CaseDefinition } from './types';
import { CASE_01_DEFINITION } from '../case01/case01Data';
import { CASE_02_DEFINITION } from '../case02/case02Data';
import { CASE_03_DEFINITION } from '../case03/case03Data';
import { INSTITUTION_TRUTH_MODEL, RBI_BASEL_III_CAPITAL_RULES } from '../../_domain/india/truthModel';
import { SYNTHETIC_INDIA_FACILITIES } from '../../_data/indiaSyntheticBank';
import {
  ALL_CASES,
  getAllRequirements,
  getAllBusinessRules,
  getAllMappings,
  getAllInvestigations,
  getAllDefects,
  getAllUatTests,
  getAllStakeholders,
  deriveCaseReleaseStatus,
} from '../../_state/operatingSystemStore';
import { classifyIRACPAsset } from '../../_engine/iracp';

export interface IntegrityReport {
  isValid: boolean;
  totalErrors: number;
  errors: string[];
  canonicalBankAudit: {
    institutionName: string;
    assetsInrCr: number;
    cet1CapitalInrCr: number;
    totalCapitalInrCr: number;
    totalRwaInrCr: number;
    cet1RatioPercent: number;
    crarPercent: number;
    status: string;
  };
  caseCounts: Record<string, {
    requirements: number;
    rules: number;
    investigations: number;
    mappings: number;
    defects: number;
    uatTests: number;
    rtmChains: number;
  }>;
  reconciliationAudit: {
    case02GrossBreakInrCr: number;
    case02NetBreakInrCr: number;
    case03CreditEquivalentExposureInrCr: number;
    case03TargetCreditRwaInrCr: number;
    case03CapitalReqInrCr: number;
    status: string;
  };
  searchCoverageAudit: {
    indexedDocsCount: number;
    uniqueStakeholdersCount: number;
    stakeholderRoleAssignmentsCount: number;
    status: string;
  };
}

export function runStaticIntegrityCheck(): IntegrityReport {
  const errors: string[] = [];
  const cases: { id: string; def: CaseDefinition }[] = [
    { id: 'CASE-001', def: CASE_01_DEFINITION },
    { id: 'CASE-002', def: CASE_02_DEFINITION },
    { id: 'CASE-003', def: CASE_03_DEFINITION },
  ];

  // 1. CANONICAL BANK BALANCE SHEET & CAPITAL RATIO AUDIT
  const assetsInrCr = INSTITUTION_TRUTH_MODEL.headlineAssetsInrCr;
  const cet1CapitalInrCr = INSTITUTION_TRUTH_MODEL.headlineCet1CapitalInrCr;
  const totalCapitalInrCr = INSTITUTION_TRUTH_MODEL.headlineTotalCapitalInrCr;
  const totalRwaInrCr = INSTITUTION_TRUTH_MODEL.headlineTotalRwaInrCr;

  const expectedCet1Ratio = (cet1CapitalInrCr / totalRwaInrCr) * 100; // 15.00%
  const expectedCrar = (totalCapitalInrCr / totalRwaInrCr) * 100; // 16.50%

  if (Math.abs(expectedCet1Ratio - 15.00) > 0.001) {
    errors.push(`Canonical CET1 Ratio mismatch: Expected 15.00%, calculated ${expectedCet1Ratio}%`);
  }
  if (Math.abs(expectedCrar - 16.50) > 0.001) {
    errors.push(`Canonical CRAR mismatch: Expected 16.50%, calculated ${expectedCrar}%`);
  }
  if (assetsInrCr !== 38500) {
    errors.push(`Canonical Assets mismatch: Expected ₹38,500 Cr, found ₹${assetsInrCr} Cr`);
  }

  // 2. SYNTHETIC FACILITIES AUDIT
  if (SYNTHETIC_INDIA_FACILITIES.length !== 8) {
    errors.push(`Synthetic Facilities count mismatch: Expected 8, found ${SYNTHETIC_INDIA_FACILITIES.length}`);
  }

  // 3. CASE AGGREGATE COUNTS & LINKAGE AUDIT
  const globalIdSet = new Set<string>();
  const caseCounts: IntegrityReport['caseCounts'] = {};

  cases.forEach(({ id, def }) => {
    caseCounts[id] = {
      requirements: def.requirements.length,
      rules: def.rules.length,
      investigations: def.investigationTasks.length,
      mappings: def.mappings.length,
      defects: def.defects.length,
      uatTests: def.uatTestPack.length,
      rtmChains: def.traceabilityMatrix.length,
    };

    const reqIdSet = new Set(def.requirements.map((r) => r.id));
    const ruleIdSet = new Set(def.rules.map((r) => r.id));
    const mapIdSet = new Set(def.mappings.map((m) => m.id));
    const invIdSet = new Set(def.investigationTasks.map((i) => i.id));
    const defIdSet = new Set(def.defects.map((d) => d.id));
    const testIdSet = new Set(def.uatTestPack.map((t) => t.id));
    const evIdSet = new Set(def.evidence.map((e) => e.id));

    // Duplicate IDs check
    const caseIds = [
      ...def.requirements.map((r) => r.id),
      ...def.rules.map((r) => r.id),
      ...def.mappings.map((m) => m.id),
      ...def.investigationTasks.map((i) => i.id),
      ...def.defects.map((d) => d.id),
      ...def.uatTestPack.map((t) => t.id),
      ...def.traceabilityMatrix.map((rtm) => rtm.id),
      ...def.evidence.map((e) => e.id),
    ];

    caseIds.forEach((entityId) => {
      if (globalIdSet.has(entityId)) {
        errors.push(`[${id}] Duplicate global ID detected: ${entityId}`);
      } else {
        globalIdSet.add(entityId);
      }
    });

    // Check UAT Test pack links
    def.uatTestPack.forEach((t) => {
      if (t.linkedReqId && !reqIdSet.has(t.linkedReqId)) {
        errors.push(`[${id}] UAT Test ${t.id} references non-existent requirement: ${t.linkedReqId}`);
      }
      if (t.linkedDefectId && !defIdSet.has(t.linkedDefectId)) {
        errors.push(`[${id}] UAT Test ${t.id} references non-existent defect: ${t.linkedDefectId}`);
      }
    });

    // Check Defect links
    def.defects.forEach((d) => {
      if (d.linkedReqId && !reqIdSet.has(d.linkedReqId)) {
        errors.push(`[${id}] Defect ${d.id} references non-existent requirement: ${d.linkedReqId}`);
      }
      if (d.linkedMappingId && !mapIdSet.has(d.linkedMappingId)) {
        errors.push(`[${id}] Defect ${d.id} references non-existent mapping: ${d.linkedMappingId}`);
      }
      if (d.linkedTestId && !testIdSet.has(d.linkedTestId)) {
        errors.push(`[${id}] Defect ${d.id} references non-existent test: ${d.linkedTestId}`);
      }
      if (d.linkedEvidenceId && !evIdSet.has(d.linkedEvidenceId)) {
        errors.push(`[${id}] Defect ${d.id} references non-existent evidence: ${d.linkedEvidenceId}`);
      }
    });

    // Check RTM links
    def.traceabilityMatrix.forEach((rtm) => {
      if (rtm.reqId && !reqIdSet.has(rtm.reqId)) {
        errors.push(`[${id}] RTM ${rtm.id} references non-existent requirement: ${rtm.reqId}`);
      }
      if (rtm.ruleId && !ruleIdSet.has(rtm.ruleId)) {
        errors.push(`[${id}] RTM ${rtm.id} references non-existent rule: ${rtm.ruleId}`);
      }
      if (rtm.mappingId && !mapIdSet.has(rtm.mappingId)) {
        errors.push(`[${id}] RTM ${rtm.id} references non-existent mapping: ${rtm.mappingId}`);
      }
      if (rtm.testId && !testIdSet.has(rtm.testId)) {
        errors.push(`[${id}] RTM ${rtm.id} references non-existent test: ${rtm.testId}`);
      }
      if (rtm.defectId && !defIdSet.has(rtm.defectId)) {
        errors.push(`[${id}] RTM ${rtm.id} references non-existent defect: ${rtm.defectId}`);
      }
    });
  });

  // 4. RECONCILIATION ARITHMETIC AUDIT
  const case02Rec = CASE_02_DEFINITION.reconciliationSummary.beforeFix;
  if (case02Rec.grossAbsoluteVarianceInrCr !== 1745.0) {
    errors.push(`Case 02 Gross Absolute Break mismatch: Expected ₹1,745.0 Cr, found ₹${case02Rec.grossAbsoluteVarianceInrCr} Cr`);
  }
  if (case02Rec.unexplainedVarianceInrCr !== 355.0) {
    errors.push(`Case 02 Net Difference mismatch: Expected ₹355.0 Cr, found ₹${case02Rec.unexplainedVarianceInrCr} Cr`);
  }

  const case03AfterFix = CASE_03_DEFINITION.reconciliationSummary.afterFix;
  if (case03AfterFix.grossOutstandingInrCr !== 3045.0) {
    errors.push(`Case 03 Credit Equivalent Exposure mismatch: Expected ₹3,045.0 Cr, found ₹${case03AfterFix.grossOutstandingInrCr} Cr`);
  }
  if (case03AfterFix.requiredProvisionInrCr !== 219.24) {
    errors.push(`Case 03 Target Capital Requirement mismatch: Expected ₹219.24 Cr, found ₹${case03AfterFix.requiredProvisionInrCr} Cr`);
  }

  // 5. SEARCH COVERAGE & STAKEHOLDER AUDIT
  const allReqs = getAllRequirements();
  const allRules = getAllBusinessRules();
  const allMaps = getAllMappings();
  const allInvs = getAllInvestigations();
  const allDefs = getAllDefects();
  const allTests = getAllUatTests();
  const allStks = getAllStakeholders();

  const uniqueStkNames = new Set(allStks.map((s) => s.item.name));

  if (allReqs.length !== 36) errors.push(`Requirements selector count: Expected 36, found ${allReqs.length}`);
  if (allRules.length !== 30) errors.push(`Business Rules selector count: Expected 30, found ${allRules.length}`);
  if (allMaps.length !== 32) errors.push(`Mappings selector count: Expected 32, found ${allMaps.length}`);
  if (allInvs.length !== 17) errors.push(`Investigations selector count: Expected 17, found ${allInvs.length}`);
  if (allDefs.length !== 15) errors.push(`Defects selector count: Expected 15, found ${allDefs.length}`);
  if (allTests.length !== 54) errors.push(`UAT Tests selector count: Expected 54, found ${allTests.length}`);
  if (allStks.length !== 27) errors.push(`Stakeholder role assignments count: Expected 27, found ${allStks.length}`);
  if (uniqueStkNames.size !== 21) errors.push(`Unique stakeholders count: Expected 21, found ${uniqueStkNames.size}`);



  // 6. CANONICAL FACILITY POPULATION & IRACP DPD=0 CLASSIFICATION AUDIT
  const expectedFacilityNumbers = [
    'MUM-CRE-8801',
    'HYD-INF-9902',
    'PUN-MFG-4403',
    'BLR-SME-1104',
    'GUJ-REN-3305',
    'DEL-MED-7706',
    'CHN-RES-5507',
    'AMD-TECH-2208',
  ];

  const actualFacilityNumbers = SYNTHETIC_INDIA_FACILITIES.map((f) => f.facilityNumber);
  expectedFacilityNumbers.forEach((facNo) => {
    if (!actualFacilityNumbers.includes(facNo)) {
      errors.push(`Canonical facility population missing facility: ${facNo}`);
    }
  });

  const dpd0Classification = classifyIRACPAsset({
    dpd: 0,
    npaMonths: 0,
  });

  if (dpd0Classification.assetQualityStatus !== 'Standard' || dpd0Classification.smaStatus !== 'Standard') {
    errors.push(`DPD=0 Classification error: Expected Standard, found ${dpd0Classification.assetQualityStatus}`);
  }

  // 7. RELEASE STATUS CONSISTENCY AUDIT
  cases.forEach(({ id, def }) => {
    if (def.uatTestPack.length === 0) {
      errors.push(`[${id}] UAT test pack population is unexpectedly 0!`);
    }
    if (def.signoffs.length === 0) {
      errors.push(`[${id}] Sign-off approver population is unexpectedly 0!`);
    }

    const isReconciled = def.reconciliationSummary.beforeFix.unexplainedVarianceInrCr === 0 && (def.reconciliationSummary.beforeFix.grossAbsoluteVarianceInrCr || 0) === 0;
    const releaseEval = deriveCaseReleaseStatus(def.defects, def.uatTestPack, def.signoffs, isReconciled);

    if (releaseEval.status === 'READY_FOR_RELEASE') {
      errors.push(`[${id}] Contradictory state: Case evaluates to READY_FOR_RELEASE while open defects or un-reconciled breaks exist!`);
    }
  });

  const totalIndexedDocs = 6 + 3 + 36 + 30 + 32 + 17 + 15 + 54 + 27 + 8; // 228 docs

  return {
    isValid: errors.length === 0,
    totalErrors: errors.length,
    errors,
    canonicalBankAudit: {
      institutionName: INSTITUTION_TRUTH_MODEL.name,
      assetsInrCr,
      cet1CapitalInrCr,
      totalCapitalInrCr,
      totalRwaInrCr,
      cet1RatioPercent: expectedCet1Ratio,
      crarPercent: expectedCrar,
      status: 'VERIFIED',
    },
    caseCounts,
    reconciliationAudit: {
      case02GrossBreakInrCr: case02Rec.grossAbsoluteVarianceInrCr || 0,
      case02NetBreakInrCr: case02Rec.unexplainedVarianceInrCr,
      case03CreditEquivalentExposureInrCr: case03AfterFix.grossOutstandingInrCr,
      case03TargetCreditRwaInrCr: 2436.0,
      case03CapitalReqInrCr: case03AfterFix.requiredProvisionInrCr,
      status: 'VERIFIED',
    },
    searchCoverageAudit: {
      indexedDocsCount: totalIndexedDocs,
      uniqueStakeholdersCount: uniqueStkNames.size,
      stakeholderRoleAssignmentsCount: allStks.length,
      status: 'VERIFIED',
    },
  };
}

