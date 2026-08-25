"use client";

import { useState } from 'react';
import { CASE_02_DEFINITION } from './case02Data';
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
import FtpRateInspector from './components/FtpRateInspector';
import CaseOverviewSection from '../case01/components/CaseOverviewSection';

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
  Percent,
} from 'lucide-react';

interface Props {
  onBackToCaseRoom: () => void;
}

export default function Case02Workspace({ onBackToCaseRoom }: Props) {
  const [activeTab, setActiveTab] = useState<StandardTabId | 'ftp-inspector'>('overview');

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
  } = useCaseState(CASE_02_DEFINITION);

  const openDefectsCount = defects.filter((d) => d.status === 'Open').length;

  const tabs: (TabConfig | { id: 'ftp-inspector'; label: string; icon: React.ElementType; badge?: string | number })[] = [
    { id: 'overview', label: '01 · Overview', icon: Briefcase },
    { id: 'stakeholders', label: '02 · Stakeholders', icon: Users },
    { id: 'evidence', label: '03 · Evidence Pack', icon: FileText },
    { id: 'current-state', label: '04 · As-Is Architecture', icon: Layers },
    { id: 'requirements', label: '05 · Requirements & Rules', icon: FileText },
    { id: 'data-mapping', label: '06 · Data Mapping (STTM)', icon: Database },
    { id: 'investigation', label: '07 · Data Investigation', icon: Search },
    { id: 'ftp-inspector', label: '08 · FTP Rate Inspector', icon: Percent },
    { id: 'target-state', label: '09 · Target Architecture', icon: Layers },
    { id: 'uat-defects', label: '10 · UAT & Defects', icon: CheckCircle2, badge: openDefectsCount > 0 ? `${openDefectsCount} Open` : 'Passed' },
    { id: 'reconciliation', label: '11 · Reconciliation', icon: Activity },
    { id: 'sign-off', label: '12 · Release Sign-off', icon: ShieldCheck },
  ];

  const handleCompleteCase = () => {
    setCurrentPhase('Completed');
    setActiveTab('overview');
  };

  return (
    <CaseShell
      caseDefinition={CASE_02_DEFINITION}
      currentPhase={currentPhase}
      capabilityScores={capabilityScores}
      tabs={tabs as TabConfig[]}
      activeTab={activeTab as StandardTabId}
      onTabChange={(tab) => setActiveTab(tab as any)}
      onBackToCaseRoom={onBackToCaseRoom}
    >
      {activeTab === 'overview' && (
        <CaseOverviewSection
          definition={CASE_02_DEFINITION}
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
          stakeholders={CASE_02_DEFINITION.stakeholders}
          institutionName={CASE_02_DEFINITION.metadata.institution}
        />
      )}

      {activeTab === 'evidence' && (
        <EvidenceViewer
          evidencePack={CASE_02_DEFINITION.evidence}
          onMarkReviewed={markEvidenceReviewed}
        />
      )}

      {activeTab === 'current-state' && (
        <ProcessFlowViewer
          title="AS-IS TREASURY DATA INGESTION & FTP CALCULATION FLOW"
          subtitle="AS-IS ARCHITECTURE • 6 CONTROL BREAKS IDENTIFIED"
          mode="CurrentState"
          nodes={CASE_02_DEFINITION.currentStateNodes}
        />
      )}

      {activeTab === 'requirements' && (
        <RequirementsRegister
          requirements={CASE_02_DEFINITION.requirements}
          rules={CASE_02_DEFINITION.rules}
        />
      )}

      {activeTab === 'data-mapping' && (
        <DataMappingWorkbench mappings={CASE_02_DEFINITION.mappings} />
      )}

      {activeTab === 'investigation' && (
        <DataInvestigationBench
          tasks={CASE_02_DEFINITION.investigationTasks}
          onMarkCompleted={markInvestigationCompleted}
        />
      )}

      {activeTab === 'ftp-inspector' && <FtpRateInspector />}

      {activeTab === 'target-state' && (
        <ProcessFlowViewer
          title="TARGET-STATE TREASURY DATA & FTP OPERATING ARCHITECTURE"
          subtitle="TARGET ARCHITECTURE • 6 AUTOMATED CONTROL GATES"
          mode="TargetState"
          nodes={CASE_02_DEFINITION.targetStateNodes}
        />
      )}

      {activeTab === 'uat-defects' && (
        <UatDefectWorkbench
          defects={defects}
          testPack={testPack}
          traceabilityMatrix={CASE_02_DEFINITION.traceabilityMatrix}
          onToggleDefectFix={toggleDefectFix}
        />
      )}

      {activeTab === 'reconciliation' && (
        <ReconciliationBench
          reconciliationSummary={CASE_02_DEFINITION.reconciliationSummary}
          defects={defects}
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
