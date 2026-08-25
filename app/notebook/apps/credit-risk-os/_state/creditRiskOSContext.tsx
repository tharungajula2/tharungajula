"use client";

import React, { createContext, useContext, useState } from 'react';
import { Facility, WorkspaceId, SubToolId } from '../_types';
import { SYNTHETIC_INDIA_FACILITIES } from '../_data/indiaSyntheticBank';
import { ScenarioType, PREBUILT_SCENARIOS, applyScenarioToFacilities } from '../_engine/scenarios';

export type NavSection = SubToolId;

interface CreditRiskOSContextType {
  activeWorkspace: WorkspaceId;
  setActiveWorkspace: (workspace: WorkspaceId) => void;
  activeSubTool: SubToolId;
  setActiveSubTool: (tool: SubToolId) => void;
  activeSection: NavSection;
  setActiveSection: (section: NavSection) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  selectedCustomerId: string | null;
  setSelectedCustomerId: (id: string | null) => void;
  selectedFacilityId: string | null;
  setSelectedFacilityId: (id: string | null) => void;
  facilities: Facility[];
  activeScenario: ScenarioType;
  setScenario: (scenario: ScenarioType) => void;
  updateFacility: (updatedFacility: Facility) => void;
  resetPortfolio: () => void;
  isGuidedDemoOpen: boolean;
  setIsGuidedDemoOpen: (open: boolean) => void;
  currentDemoStepIndex: number;
  setCurrentDemoStepIndex: (step: number) => void;
  startGuidedDemo: () => void;
  isLearnDrawerOpen: boolean;
  setIsLearnDrawerOpen: (open: boolean) => void;
  isSearchPaletteOpen: boolean;
  setIsSearchPaletteOpen: (open: boolean) => void;
  isMasterGraphOpen: boolean;
  setIsMasterGraphOpen: (open: boolean) => void;
  
  // CONNECTED OPERATING SYSTEM DEEP-LINKING ACTIONS
  activeTargetCaseId: string | null;
  setActiveTargetCaseId: (caseId: string | null) => void;
  navigateToCase: (caseId: string) => void;
  navigateToWorkspace: (workspace: WorkspaceId, subTool?: SubToolId) => void;
}

const CreditRiskOSContext = createContext<CreditRiskOSContextType | undefined>(undefined);

export function CreditRiskOSProvider({ children }: { children: React.ReactNode }) {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>('command-centre');
  const [activeSubTool, setActiveSubTool] = useState<SubToolId>('bank');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>('OBL-IND-103');
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>('FAC-2026-IND-03');

  const [activeScenario, setActiveScenarioState] = useState<ScenarioType>('baseline');
  const [facilities, setFacilities] = useState<Facility[]>(SYNTHETIC_INDIA_FACILITIES);

  const [isGuidedDemoOpen, setIsGuidedDemoOpen] = useState(false);
  const [currentDemoStepIndex, setCurrentDemoStepIndex] = useState(0);
  const [isLearnDrawerOpen, setIsLearnDrawerOpen] = useState(false);
  const [isSearchPaletteOpen, setIsSearchPaletteOpen] = useState(false);
  const [isMasterGraphOpen, setIsMasterGraphOpen] = useState(false);

  const [activeTargetCaseId, setActiveTargetCaseId] = useState<string | null>(null);

  const startGuidedDemo = () => {
    setCurrentDemoStepIndex(0);
    setActiveWorkspace('command-centre');
    setSelectedFacilityId('FAC-2026-IND-03');
    setIsGuidedDemoOpen(true);
  };

  const setScenario = (scenario: ScenarioType) => {
    setActiveScenarioState(scenario);
    const config = PREBUILT_SCENARIOS[scenario];
    const updated = applyScenarioToFacilities(SYNTHETIC_INDIA_FACILITIES, config);
    setFacilities(updated);
  };

  const updateFacility = (updatedFacility: Facility) => {
    setFacilities((prev) =>
      prev.map((f) => (f.id === updatedFacility.id ? updatedFacility : f))
    );
  };

  const resetPortfolio = () => {
    setActiveScenarioState('baseline');
    setFacilities(SYNTHETIC_INDIA_FACILITIES);
  };

  const setActiveSection = (section: SubToolId) => {
    setActiveSubTool(section);
    if (['credit-risk', 'iracp', 'ifrs9', 'capital', 'treasury', 'simulation-lab', 'bank'].includes(section)) {
      setActiveWorkspace('risk-engine');
    } else if (['data', 'customers'].includes(section)) {
      setActiveWorkspace('data-lab');
    } else if (['change', 'regulation', 'reporting'].includes(section)) {
      setActiveWorkspace('delivery-studio');
    }
  };

  const navigateToCase = (caseId: string) => {
    setActiveTargetCaseId(caseId);
    setActiveWorkspace('case-room');
  };

  const navigateToWorkspace = (workspace: WorkspaceId, subTool?: SubToolId) => {
    setActiveWorkspace(workspace);
    if (subTool) {
      setActiveSubTool(subTool);
    }
  };

  return (
    <CreditRiskOSContext.Provider
      value={{
        activeWorkspace,
        setActiveWorkspace,
        activeSubTool,
        setActiveSubTool,
        activeSection: activeSubTool,
        setActiveSection,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        selectedCustomerId,
        setSelectedCustomerId,
        selectedFacilityId,
        setSelectedFacilityId,
        facilities,
        activeScenario,
        setScenario,
        updateFacility,
        resetPortfolio,
        isGuidedDemoOpen,
        setIsGuidedDemoOpen,
        currentDemoStepIndex,
        setCurrentDemoStepIndex,
        startGuidedDemo,
        isLearnDrawerOpen,
        setIsLearnDrawerOpen,
        isSearchPaletteOpen,
        setIsSearchPaletteOpen,
        isMasterGraphOpen,
        setIsMasterGraphOpen,
        activeTargetCaseId,
        setActiveTargetCaseId,
        navigateToCase,
        navigateToWorkspace,
      }}
    >
      {children}
    </CreditRiskOSContext.Provider>
  );
}

export function useCreditRiskOS() {
  const context = useContext(CreditRiskOSContext);
  if (!context) {
    throw new Error('useCreditRiskOS must be used within CreditRiskOSProvider');
  }
  return context;
}
