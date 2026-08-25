/**
 * CREDIT RISK OS 2.0 — SHARED OPERATING SYSTEM STORE & SELECTORS
 * Authoritative single-source canonical bank state and dynamic cross-workspace aggregate selectors.
 */

import { INSTITUTION_TRUTH_MODEL, RBI_BASEL_III_CAPITAL_RULES } from '../_domain/india/truthModel';
import { CASE_01_DEFINITION } from '../_cases/case01/case01Data';
import { CASE_02_DEFINITION } from '../_cases/case02/case02Data';
import { CASE_03_DEFINITION } from '../_cases/case03/case03Data';
import {
  CaseDefinition,
  BusinessRequirement,
  BusinessRule,
  SourceToTargetMapping,
  InvestigationTask,
  CaseDefect,
  UATTestCase,
  TraceabilityChain,
  CaseStakeholder,
  SignOffRequirement,
  CaseEvidence,
} from '../_cases/_framework/types';

export interface CanonicalBankState {
  name: string;
  classification: string;
  sector: string;
  dSibStatus: string;
  jurisdiction: string;
  regulator: string;
  asOfDate: string;
  headlineAssetsInrCr: number;
  headlineCet1CapitalInrCr: number;
  headlineTotalRwaInrCr: number;
  headlineCet1RatioPercent: number;
  headlineCrarPercent: number;
  minCet1RequirementPercent: number;
  minCrarRequirementPercent: number;
}

// CANONICAL BANK STATE CONSUMES DIRECTLY FROM INSTITUTION_TRUTH_MODEL
export const CANONICAL_BANK_STATE: CanonicalBankState = {
  name: INSTITUTION_TRUTH_MODEL.name,
  classification: INSTITUTION_TRUTH_MODEL.classification,
  sector: INSTITUTION_TRUTH_MODEL.sector,
  dSibStatus: INSTITUTION_TRUTH_MODEL.dSibStatus,
  jurisdiction: INSTITUTION_TRUTH_MODEL.jurisdiction,
  regulator: INSTITUTION_TRUTH_MODEL.regulator,
  asOfDate: INSTITUTION_TRUTH_MODEL.simulationDate,
  headlineAssetsInrCr: INSTITUTION_TRUTH_MODEL.headlineAssetsInrCr,
  headlineCet1CapitalInrCr: INSTITUTION_TRUTH_MODEL.headlineCet1CapitalInrCr,
  headlineTotalRwaInrCr: INSTITUTION_TRUTH_MODEL.headlineTotalRwaInrCr,
  headlineCet1RatioPercent: INSTITUTION_TRUTH_MODEL.headlineCet1RatioPercent,
  headlineCrarPercent: INSTITUTION_TRUTH_MODEL.headlineCrarPercent,
  minCet1RequirementPercent: RBI_BASEL_III_CAPITAL_RULES.cet1PlusCcbRequirementPercent,
  minCrarRequirementPercent: RBI_BASEL_III_CAPITAL_RULES.totalCapitalPlusCcbRequirementPercent,
};

export const ALL_CASES: { caseId: string; definition: CaseDefinition }[] = [
  { caseId: 'CASE-2026-01', definition: CASE_01_DEFINITION },
  { caseId: 'CASE-2026-02', definition: CASE_02_DEFINITION },
  { caseId: 'CASE-2026-03', definition: CASE_03_DEFINITION },
];

export interface EnrichedEntity<T> {
  caseId: string;
  caseCode: string;
  caseTitle: string;
  item: T;
}

// DYNAMIC PROGRAMMATIC SELECTORS
export function getAllRequirements(): EnrichedEntity<BusinessRequirement>[] {
  return ALL_CASES.flatMap((c) =>
    c.definition.requirements.map((req) => ({
      caseId: c.caseId,
      caseCode: c.definition.metadata.code,
      caseTitle: c.definition.metadata.title,
      item: req,
    }))
  );
}

export function getAllBusinessRules(): EnrichedEntity<BusinessRule>[] {
  return ALL_CASES.flatMap((c) =>
    c.definition.rules.map((rule) => ({
      caseId: c.caseId,
      caseCode: c.definition.metadata.code,
      caseTitle: c.definition.metadata.title,
      item: rule,
    }))
  );
}

export function getAllMappings(): EnrichedEntity<SourceToTargetMapping>[] {
  return ALL_CASES.flatMap((c) =>
    c.definition.mappings.map((map) => ({
      caseId: c.caseId,
      caseCode: c.definition.metadata.code,
      caseTitle: c.definition.metadata.title,
      item: map,
    }))
  );
}

export function getAllInvestigations(): EnrichedEntity<InvestigationTask>[] {
  return ALL_CASES.flatMap((c) =>
    c.definition.investigationTasks.map((inv) => ({
      caseId: c.caseId,
      caseCode: c.definition.metadata.code,
      caseTitle: c.definition.metadata.title,
      item: inv,
    }))
  );
}

export function getAllDefects(defectsState?: Record<string, CaseDefect[]>): EnrichedEntity<CaseDefect>[] {
  return ALL_CASES.flatMap((c) => {
    const caseDefects = defectsState?.[c.caseId] || defectsState?.[c.definition.metadata.id] || c.definition.defects;
    return caseDefects.map((def) => ({
      caseId: c.definition.metadata.id,
      caseCode: c.definition.metadata.code,
      caseTitle: c.definition.metadata.title,
      item: def,
    }));
  });
}

export function getAllUatTests(testPackState?: Record<string, UATTestCase[]>): EnrichedEntity<UATTestCase>[] {
  return ALL_CASES.flatMap((c) => {
    const caseTests = testPackState?.[c.caseId] || testPackState?.[c.definition.metadata.id] || c.definition.uatTestPack;
    return caseTests.map((test) => ({
      caseId: c.definition.metadata.id,
      caseCode: c.definition.metadata.code,
      caseTitle: c.definition.metadata.title,
      item: test,
    }));
  });
}

export function getAllRtmChains(): EnrichedEntity<TraceabilityChain>[] {
  return ALL_CASES.flatMap((c) =>
    c.definition.traceabilityMatrix.map((rtm) => ({
      caseId: c.definition.metadata.id,
      caseCode: c.definition.metadata.code,
      caseTitle: c.definition.metadata.title,
      item: rtm,
    }))
  );
}

export function getAllStakeholders(): EnrichedEntity<CaseStakeholder>[] {
  return ALL_CASES.flatMap((c) =>
    c.definition.stakeholders.map((stk) => ({
      caseId: c.definition.metadata.id,
      caseCode: c.definition.metadata.code,
      caseTitle: c.definition.metadata.title,
      item: stk,
    }))
  );
}

export function getAllSignoffs(signoffsState?: Record<string, SignOffRequirement[]>): EnrichedEntity<SignOffRequirement>[] {
  return ALL_CASES.flatMap((c) => {
    const caseSignoffs = signoffsState?.[c.caseId] || signoffsState?.[c.definition.metadata.id] || c.definition.signoffs;
    return caseSignoffs.map((so) => ({
      caseId: c.definition.metadata.id,
      caseCode: c.definition.metadata.code,
      caseTitle: c.definition.metadata.title,
      item: so,
    }));
  });
}

export function getAllEvidence(): EnrichedEntity<CaseEvidence>[] {
  return ALL_CASES.flatMap((c) =>
    c.definition.evidence.map((ev) => ({
      caseId: c.caseId,
      caseCode: c.definition.metadata.code,
      caseTitle: c.definition.metadata.title,
      item: ev,
    }))
  );
}

export type ReleaseStatus = 'BLOCKED' | 'AT_RISK' | 'READY_FOR_SIGNOFF' | 'READY_FOR_RELEASE' | 'COMPLETE';

export function deriveCaseReleaseStatus(
  defects: CaseDefect[],
  uatTests: UATTestCase[],
  signoffs: SignOffRequirement[],
  isReconciled: boolean
): { status: ReleaseStatus; label: string; bgClass: string; textClass: string } {
  const openBlockers = defects.filter((d) => d.status === 'Open' && (d.severity === 'BLOCKER' || d.severity === 'CRITICAL'));
  const openDefectsCount = defects.filter((d) => d.status === 'Open').length;
  const passedTestsCount = uatTests.filter((t) => t.status === 'PASSED').length;
  const uatPassPercent = (passedTestsCount / uatTests.length) * 100;
  const approvedSignoffs = signoffs.filter((s) => s.status === 'APPROVED').length;

  if (approvedSignoffs === signoffs.length && openDefectsCount === 0 && uatPassPercent === 100 && isReconciled) {
    return { status: 'COMPLETE', label: 'RELEASE COMPLETE', bgClass: 'bg-emerald-500/20 border-emerald-500/40', textClass: 'text-emerald-400' };
  }
  if (openBlockers.length > 0 || !isReconciled) {
    return { status: 'BLOCKED', label: 'RELEASE BLOCKED', bgClass: 'bg-rose-500/20 border-rose-500/40', textClass: 'text-rose-400' };
  }
  if (openDefectsCount > 0 || uatPassPercent < 100) {
    return { status: 'AT_RISK', label: 'AT RISK (OPEN DEFECTS)', bgClass: 'bg-amber-500/20 border-amber-500/40', textClass: 'text-amber-400' };
  }
  if (approvedSignoffs < signoffs.length) {
    return { status: 'READY_FOR_SIGNOFF', label: 'READY FOR SIGNOFF', bgClass: 'bg-cyan-500/20 border-cyan-500/40', textClass: 'text-cyan-400' };
  }
  return { status: 'READY_FOR_RELEASE', label: 'READY FOR RELEASE', bgClass: 'bg-emerald-500/20 border-emerald-500/40', textClass: 'text-emerald-300' };
}
