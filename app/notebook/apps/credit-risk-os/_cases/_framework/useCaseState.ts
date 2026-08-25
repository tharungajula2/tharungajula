"use client";

import { useState, useMemo } from 'react';
import {
  CaseDefinition,
  CasePhase,
  ExperienceMode,
  InvestigationState,
  CaseDefect,
  UATTestCase,
  SignOffRequirement,
  CapabilityScores,
} from './types';

export function useCaseState(caseDefinition: CaseDefinition) {
  const [currentPhase, setCurrentPhase] = useState<CasePhase>('Assigned');
  const [mode, setMode] = useState<ExperienceMode>('Assisted');

  // STATEFUL WORK INTERACTIONS
  const [reviewedEvidenceIds, setReviewedEvidenceIds] = useState<Set<string>>(
    new Set(caseDefinition.evidence.slice(0, 2).map((e) => e.id)) // Initialized partially
  );
  
  const [investigationStates, setInvestigationStates] = useState<Record<string, InvestigationState>>(() => {
    const initial: Record<string, InvestigationState> = {};
    caseDefinition.investigationTasks.forEach((task) => {
      initial[task.id] = 'NOT_STARTED';
    });
    return initial;
  });

  const [verifiedReqIds, setVerifiedReqIds] = useState<Set<string>>(new Set());
  const [validatedRtmIds, setValidatedRtmIds] = useState<Set<string>>(new Set());

  const [defects, setDefects] = useState<CaseDefect[]>(caseDefinition.defects);
  const [testPack, setTestPack] = useState<UATTestCase[]>(caseDefinition.uatTestPack);
  const [signoffs, setSignoffs] = useState<SignOffRequirement[]>(caseDefinition.signoffs);

  // INTERACTIVE DEFECT REMEDIATION TOGGLE
  const toggleDefectFix = (defectId: string) => {
    setDefects((prevDefects) => {
      const updatedDefects = prevDefects.map((def) => {
        if (def.id === defectId) {
          const nextStatus: 'Open' | 'Resolved' = def.status === 'Open' ? 'Resolved' : 'Open';
          return { ...def, status: nextStatus };
        }
        return def;
      });

      // Synchronize linked UAT test case status
      setTestPack((prevTests) =>
        prevTests.map((test) => {
          if (test.linkedDefectId === defectId) {
            const isResolved = updatedDefects.find((d) => d.id === defectId)?.status === 'Resolved';
            return {
              ...test,
              status: isResolved ? 'PASSED' : 'FAILED',
              actualResult: isResolved
                ? test.expectedResult + ' (Fix Verified)'
                : test.actualResult.replace(' (Fix Verified)', ''),
            };
          }
          return test;
        })
      );

      return updatedDefects;
    });
  };

  // INTERACTIVE SIGNOFF TOGGLE
  const toggleSignoff = (signoffId: string) => {
    setSignoffs((prev) =>
      prev.map((s) => {
        if (s.id === signoffId) {
          const nextStatus = s.status === 'APPROVED' ? 'PENDING' : 'APPROVED';
          return {
            ...s,
            status: nextStatus,
            signoffDate: nextStatus === 'APPROVED' ? '31 July 2026 17:45:00' : undefined,
            comments: nextStatus === 'APPROVED' ? 'Verified evidence & zero-variance reconciliation. Approved for production release.' : s.comments,
          };
        }
        return s;
      })
    );
  };

  // INTENTIONAL EVIDENCE REVIEW TOGGLE
  const markEvidenceReviewed = (id: string) => {
    setReviewedEvidenceIds((prev) => new Set(prev).add(id));
  };

  // STATEFUL INVESTIGATION PROGRESSION
  const setInvestigationTaskState = (id: string, state: InvestigationState) => {
    setInvestigationStates((prev) => ({ ...prev, [id]: state }));
  };

  const markInvestigationCompleted = (id: string) => {
    setInvestigationTaskState(id, 'COMPLETE');
  };

  // REQUIREMENT VERIFICATION
  const verifyRequirement = (id: string) => {
    setVerifiedReqIds((prev) => new Set(prev).add(id));
  };

  // RTM TRACEABILITY VALIDATION
  const validateRtmChain = (id: string) => {
    setValidatedRtmIds((prev) => new Set(prev).add(id));
  };

  // RECONCILIATION VARIANCE STATE
  const openDefects = useMemo(() => defects.filter((d) => d.status === 'Open'), [defects]);
  const isFullyReconciled = openDefects.length === 0;

  const currentVarianceInrCr = isFullyReconciled
    ? caseDefinition.reconciliationSummary.afterFix.unexplainedVarianceInrCr
    : caseDefinition.reconciliationSummary.beforeFix.unexplainedVarianceInrCr;

  const grossAbsoluteBreakInrCr = isFullyReconciled
    ? (caseDefinition.reconciliationSummary.afterFix.grossAbsoluteVarianceInrCr || 0.0)
    : (caseDefinition.reconciliationSummary.beforeFix.grossAbsoluteVarianceInrCr || 0.0);

  const isVersionLocked = isFullyReconciled
    ? true
    : (caseDefinition.reconciliationSummary.beforeFix.isVersionLocked ?? true);

  // SEVERITY-AWARE GOVERNANCE GATE EVALUATION
  const governanceEvaluation = useMemo(() => {
    const blockingSeverities = new Set(caseDefinition.governanceConfig.blockingSeverities);
    const activeBlockingDefects = openDefects.filter((d) => blockingSeverities.has(d.severity));
    const passedTestsCount = testPack.filter((t) => t.status === 'PASSED').length;
    const uatPassRatioPercent = (passedTestsCount / testPack.length) * 100;
    const isUatSufficient = uatPassRatioPercent >= caseDefinition.governanceConfig.requiredUatPassPercent;
    const isVariancePermitted = currentVarianceInrCr <= caseDefinition.governanceConfig.maxAllowedVarianceInrCr;
    const isGrossPermitted = grossAbsoluteBreakInrCr <= caseDefinition.governanceConfig.maxAllowedVarianceInrCr;

    const blockingReasons: string[] = [];

    if (activeBlockingDefects.length > 0) {
      blockingReasons.push(`${activeBlockingDefects.length} blocking defect(s) unresolved: ${activeBlockingDefects.map((d) => d.code).join(', ')}`);
    }
    if (!isUatSufficient) {
      blockingReasons.push(`UAT pass rate (${uatPassRatioPercent.toFixed(1)}%) below required threshold (${caseDefinition.governanceConfig.requiredUatPassPercent}%)`);
    }
    if (!isVariancePermitted) {
      blockingReasons.push(`Net Risk-to-Finance variance (₹${currentVarianceInrCr.toFixed(1)} Cr) exceeds limit (₹${caseDefinition.governanceConfig.maxAllowedVarianceInrCr.toFixed(1)} Cr)`);
    }
    if (!isGrossPermitted) {
      blockingReasons.push(`Gross Absolute Reconciliation Break (₹${grossAbsoluteBreakInrCr.toFixed(1)} Cr) masks compensating errors across ETL stages!`);
    }
    if (!isVersionLocked) {
      blockingReasons.push('Downstream extract consumed stale run version. Version lock required!');
    }

    return {
      isCleared: blockingReasons.length === 0,
      blockingReasons,
      activeBlockingDefects,
      uatPassRatioPercent,
    };
  }, [defects, openDefects, testPack, currentVarianceInrCr, grossAbsoluteBreakInrCr, isVersionLocked, caseDefinition]);

  // CAPABILITY SCORE DERIVED FROM ACTUAL LEARNER ENGAGEMENT
  const capabilityScores: CapabilityScores = useMemo(() => {
    const domainRatio = caseDefinition.evidence.length > 0 ? (reviewedEvidenceIds.size / caseDefinition.evidence.length) * 100 : 100;
    
    const verifiedReqsRatio = caseDefinition.requirements.length > 0 ? ((verifiedReqIds.size + 1) / caseDefinition.requirements.length) * 100 : 100;
    const reqsRatio = Math.min(100, Math.round(verifiedReqsRatio));

    const completedInvsCount = Object.values(investigationStates).filter((st) => st === 'COMPLETE' || st === 'FINDING_RECORDED').length;
    const invRatio = caseDefinition.investigationTasks.length > 0 ? (completedInvsCount / caseDefinition.investigationTasks.length) * 100 : 100;

    const validatedRtmRatio = caseDefinition.traceabilityMatrix.length > 0 ? ((validatedRtmIds.size + 2) / caseDefinition.traceabilityMatrix.length) * 100 : 100;
    const rtmRatio = Math.min(100, Math.round(validatedRtmRatio));

    const passedTestsCount = testPack.filter((t) => t.status === 'PASSED').length;
    const testRatio = testPack.length > 0 ? (passedTestsCount / testPack.length) * 100 : 100;

    const resolvedDefectsCount = defects.filter((d) => d.status === 'Resolved').length;
    const controlRatio = defects.length > 0 ? (resolvedDefectsCount / defects.length) * 100 : 100;

    const overall = Math.round((domainRatio + reqsRatio + invRatio + rtmRatio + testRatio + controlRatio) / 6);

    return {
      domainUnderstanding: Math.round(domainRatio),
      requirements: reqsRatio,
      dataAnalysis: Math.round(invRatio),
      traceability: rtmRatio,
      testing: Math.round(testRatio),
      controls: Math.round(controlRatio),
      overall,
    };
  }, [reviewedEvidenceIds, verifiedReqIds, investigationStates, validatedRtmIds, testPack, defects, caseDefinition]);

  return {
    currentPhase,
    setCurrentPhase,
    mode,
    setMode,
    defects,
    testPack,
    signoffs,
    reviewedEvidenceIds,
    investigationStates,
    verifiedReqIds,
    validatedRtmIds,
    toggleDefectFix,
    toggleSignoff,
    markEvidenceReviewed,
    setInvestigationTaskState,
    markInvestigationCompleted,
    verifyRequirement,
    validateRtmChain,
    isFullyReconciled,
    currentVarianceInrCr,
    grossAbsoluteBreakInrCr,
    governanceEvaluation,
    capabilityScores,
  };
}
