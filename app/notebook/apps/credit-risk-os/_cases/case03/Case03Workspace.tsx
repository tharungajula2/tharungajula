"use client";

import { useState } from 'react';
import { CASE_03_DEFINITION } from './case03Data';
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
import CapitalImpactInspector from './components/CapitalImpactInspector';
import RegulatoryChangeRegister from './components/RegulatoryChangeRegister';
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
  Award,
  BookOpen,
} from 'lucide-react';

interface Props {
  onBackToCaseRoom: () => void;
}

export default function Case03Workspace({ onBackToCaseRoom }: Props) {
  const [activeTab, setActiveTab] = useState<StandardTabId | 'capital-inspector' | 'reg-change'>('overview');

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
  } = useCaseState(CASE_03_DEFINITION);

  const openDefectsCount = defects.filter((d) => d.status === 'Open').length;

  const tabs: (TabConfig | { id: 'capital-inspector' | 'reg-change'; label: string; icon: React.ElementType; badge?: string | number })[] = [
    { id: 'overview', label: '01 · Overview', icon: Briefcase },
    { id: 'stakeholders', label: '02 · Stakeholders', icon: Users },
    { id: 'evidence', label: '03 · Evidence Pack', icon: FileText },
    { id: 'reg-change', label: '04 · Regulatory Change Register', icon: BookOpen },
    { id: 'current-state', label: '05 · As-Is Architecture', icon: Layers },
    { id: 'requirements', label: '06 · Requirements & Rules', icon: FileText },
    { id: 'data-mapping', label: '07 · Data Mapping (STTM)', icon: Database },
    { id: 'investigation', label: '08 · RWA Investigation', icon: Search },
    { id: 'capital-inspector', label: '09 · Capital Impact Inspector', icon: Award },
    { id: 'target-state', label: '10 · Target Architecture', icon: Layers },
    { id: 'uat-defects', label: '11 · UAT & Defects', icon: CheckCircle2, badge: openDefectsCount > 0 ? `${openDefectsCount} Open` : 'Passed' },
    { id: 'reconciliation', label: '12 · RWA Reconciliation', icon: Activity },
    { id: 'sign-off', label: '13 · Release Sign-off', icon: ShieldCheck },
  ];

  const handleCompleteCase = () => {
    setCurrentPhase('Completed');
    setActiveTab('overview');
  };

  return (
    <CaseShell
      caseDefinition={CASE_03_DEFINITION}
      currentPhase={currentPhase}
      capabilityScores={capabilityScores}
      tabs={tabs as TabConfig[]}
      activeTab={activeTab as StandardTabId}
      onTabChange={(tab) => setActiveTab(tab as any)}
      onBackToCaseRoom={onBackToCaseRoom}
    >
      {activeTab === 'overview' && (
        <CaseOverviewSection
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
          stakeholders={CASE_03_DEFINITION.stakeholders}
          institutionName={CASE_03_DEFINITION.metadata.institution}
        />
      )}

      {activeTab === 'evidence' && (
        <EvidenceViewer
          evidencePack={CASE_03_DEFINITION.evidence}
          onMarkReviewed={markEvidenceReviewed}
        />
      )}

      {activeTab === 'reg-change' && <RegulatoryChangeRegister />}

      {activeTab === 'current-state' && (
        <ProcessFlowViewer
          title="AS-IS CREDIT RWA & CAPITAL CALCULATION FLOW"
          subtitle="AS-IS ARCHITECTURE • 6 CONTROL BREAKS IDENTIFIED"
          mode="CurrentState"
          nodes={CASE_03_DEFINITION.currentStateNodes}
        />
      )}

      {activeTab === 'requirements' && (
        <RequirementsRegister
          requirements={CASE_03_DEFINITION.requirements}
          rules={CASE_03_DEFINITION.rules}
        />
      )}

      {activeTab === 'data-mapping' && (
        <DataMappingWorkbench mappings={CASE_03_DEFINITION.mappings} />
      )}

      {activeTab === 'investigation' && (
        <DataInvestigationBench
          tasks={CASE_03_DEFINITION.investigationTasks}
          onMarkCompleted={markInvestigationCompleted}
        />
      )}

      {activeTab === 'capital-inspector' && <CapitalImpactInspector />}

      {activeTab === 'target-state' && (
        <ProcessFlowViewer
          title="TARGET-STATE CREDIT RWA & REGULATORY CAPITAL OPERATING ARCHITECTURE"
          subtitle="TARGET ARCHITECTURE • 6 AUTOMATED CONTROL GATES"
          mode="TargetState"
          nodes={CASE_03_DEFINITION.targetStateNodes}
        />
      )}

      {activeTab === 'uat-defects' && (
        <UatDefectWorkbench
          defects={defects}
          testPack={testPack}
          traceabilityMatrix={CASE_03_DEFINITION.traceabilityMatrix}
          onToggleDefectFix={toggleDefectFix}
        />
      )}

      {activeTab === 'reconciliation' && (
        <ReconciliationBench
          reconciliationSummary={CASE_03_DEFINITION.reconciliationSummary}
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
