"use client";

import { useState } from 'react';
import { CASE_01_DEFINITION } from './case01Data';
import { useCaseState } from '../_framework/useCaseState';
import CaseShell, { StandardTabId, TabConfig } from '../_framework/components/CaseShell';
import StakeholderDirectory from '../_framework/components/StakeholderDirectory';
import EvidenceViewer from '../_framework/components/EvidenceViewer';
import RequirementsRegister from '../_framework/components/RequirementsRegister';
import DataMappingWorkbench from '../_framework/components/DataMappingWorkbench';
import DataInvestigationBench from '../_framework/components/DataInvestigationBench';
import ProcessFlowViewer from '../_framework/components/ProcessFlowViewer';
import UatDefectWorkbench from '../_framework/components/UatDefectWorkbench';
import ReconciliationBench from '../_framework/components/ReconciliationBench';
import SignOffGateway from '../_framework/components/SignOffGateway';
import CaseOverviewSection from './components/CaseOverviewSection';

import {
  Briefcase,
  Users,
  FileText,
  Layers,
  Database,
  Search,
  CheckCircle2,
  Activity,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  onBackToCaseRoom: () => void;
}

export default function Case01Workspace({ onBackToCaseRoom }: Props) {
  const [activeTab, setActiveTab] = useState<StandardTabId>('overview');

  const {
    currentPhase,
    setCurrentPhase,
    defects,
    testPack,
    signoffs,
    toggleDefectFix,
    toggleSignoff,
    markEvidenceReviewed,
    markInvestigationCompleted,
    governanceEvaluation,
    capabilityScores,
  } = useCaseState(CASE_01_DEFINITION);

  const openDefectsCount = defects.filter((d) => d.status === 'Open').length;

  const tabs: TabConfig[] = [
    { id: 'overview', label: '01 · Overview', icon: Briefcase },
    { id: 'stakeholders', label: '02 · Stakeholders', icon: Users },
    { id: 'evidence', label: '03 · Evidence Pack', icon: FileText },
    { id: 'current-state', label: '04 · Current State', icon: Layers },
    { id: 'requirements', label: '05 · Requirements & Rules', icon: FileText },
    { id: 'data-mapping', label: '06 · Data Mapping (STTM)', icon: Database },
    { id: 'investigation', label: '07 · Data Investigation', icon: Search },
    { id: 'target-state', label: '08 · Target State', icon: Layers },
    { id: 'uat-defects', label: '09 · UAT & Defects', icon: CheckCircle2, badge: openDefectsCount > 0 ? `${openDefectsCount} Open` : 'Passed' },
    { id: 'reconciliation', label: '10 · Reconciliation', icon: Activity },
    { id: 'sign-off', label: '11 · Release Sign-off', icon: ShieldCheck },
  ];

  const handleCompleteCase = () => {
    setCurrentPhase('Completed');
    setActiveTab('overview');
  };

  return (
    <CaseShell
      caseDefinition={CASE_01_DEFINITION}
      currentPhase={currentPhase}
      capabilityScores={capabilityScores}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBackToCaseRoom={onBackToCaseRoom}
    >
      {activeTab === 'overview' && (
        <CaseOverviewSection
          definition={CASE_01_DEFINITION}
          defects={defects}
          currentPhase={currentPhase}
          onNavigatePhase={(phase) => {
            setCurrentPhase(phase);
            if (phase === 'Discovery') setActiveTab('evidence');
            else if (phase === 'Requirements') setActiveTab('requirements');
            else if (phase === 'Build Validation') setActiveTab('investigation');
            else if (phase === 'UAT') setActiveTab('uat-defects');
            else if (phase === 'Sign-off') setActiveTab('sign-off');
          }}
        />
      )}

      {activeTab === 'stakeholders' && (
        <StakeholderDirectory
          stakeholders={CASE_01_DEFINITION.stakeholders}
          institutionName={CASE_01_DEFINITION.metadata.institution}
        />
      )}

      {activeTab === 'evidence' && (
        <EvidenceViewer
          evidencePack={CASE_01_DEFINITION.evidence}
          onMarkReviewed={markEvidenceReviewed}
        />
      )}

      {activeTab === 'current-state' && (
        <ProcessFlowViewer
          title="CURRENT-STATE ASSET QUALITY PROCESS FLOW"
          subtitle="AS-IS WORKFLOW • 6 CONTROL BREAKS"
          mode="CurrentState"
          nodes={CASE_01_DEFINITION.currentStateNodes}
        />
      )}

      {activeTab === 'requirements' && (
        <RequirementsRegister
          requirements={CASE_01_DEFINITION.requirements}
          rules={CASE_01_DEFINITION.rules}
        />
      )}

      {activeTab === 'data-mapping' && (
        <DataMappingWorkbench mappings={CASE_01_DEFINITION.mappings} />
      )}

      {activeTab === 'investigation' && (
        <DataInvestigationBench
          tasks={CASE_01_DEFINITION.investigationTasks}
          onMarkCompleted={markInvestigationCompleted}
        />
      )}

      {activeTab === 'target-state' && (
        <ProcessFlowViewer
          title="TARGET-STATE ASSET QUALITY OPERATING FLOW"
          subtitle="TARGET ARCHITECTURE • 6 CONTROL GATES"
          mode="TargetState"
          nodes={CASE_01_DEFINITION.targetStateNodes}
        />
      )}

      {activeTab === 'uat-defects' && (
        <UatDefectWorkbench
          defects={defects}
          testPack={testPack}
          traceabilityMatrix={CASE_01_DEFINITION.traceabilityMatrix}
          onToggleDefectFix={toggleDefectFix}
        />
      )}

      {activeTab === 'reconciliation' && (
        <ReconciliationBench
          reconciliationSummary={CASE_01_DEFINITION.reconciliationSummary}
          defects={defects}
          caseId="CASE-001"
        />
      )}

      {activeTab === 'sign-off' && (
        <SignOffGateway
          signoffs={signoffs}
          isGovernanceCleared={governanceEvaluation.isCleared}
          blockingReasons={governanceEvaluation.blockingReasons}
          onToggleSignoff={toggleSignoff}
          onCompleteCase={handleCompleteCase}
        />
      )}
    </CaseShell>
  );
}
