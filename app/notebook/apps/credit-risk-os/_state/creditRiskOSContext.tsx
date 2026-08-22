"use client";

import React, { createContext, useContext, useState } from 'react';
import { Facility } from '../_types';
import { SYNTHETIC_FACILITIES } from '../_data/syntheticBank';
import { ScenarioType, PREBUILT_SCENARIOS, applyScenarioToFacilities } from '../_engine/scenarios';

export type NavSection =
  | 'bank'
  | 'customers'
  | 'credit-risk'
  | 'ifrs9'
  | 'capital'
  | 'treasury'
  | 'reporting'
  | 'data'
  | 'change'
  | 'regulation'
  | 'simulation-lab';

interface CreditRiskOSContextType {
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
}

const CreditRiskOSContext = createContext<CreditRiskOSContextType | undefined>(undefined);

export function CreditRiskOSProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<NavSection>('bank');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>('OBL-103');
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>('FAC-2025-003');

  const [activeScenario, setActiveScenarioState] = useState<ScenarioType>('baseline');
  const [facilities, setFacilities] = useState<Facility[]>(SYNTHETIC_FACILITIES);

  const [isGuidedDemoOpen, setIsGuidedDemoOpen] = useState(false);
  const [currentDemoStepIndex, setCurrentDemoStepIndex] = useState(0);
  const [isLearnDrawerOpen, setIsLearnDrawerOpen] = useState(false);
  const [isSearchPaletteOpen, setIsSearchPaletteOpen] = useState(false);

  const startGuidedDemo = () => {
    setCurrentDemoStepIndex(0);
    setActiveSection('bank');
    setSelectedFacilityId('FAC-2025-003');
    setIsGuidedDemoOpen(true);
  };

  const setScenario = (scenario: ScenarioType) => {
    setActiveScenarioState(scenario);
    const config = PREBUILT_SCENARIOS[scenario];
    const updated = applyScenarioToFacilities(SYNTHETIC_FACILITIES, config);
    setFacilities(updated);
  };

  const updateFacility = (updatedFacility: Facility) => {
    setFacilities((prev) =>
      prev.map((f) => (f.id === updatedFacility.id ? updatedFacility : f))
    );
  };

  const resetPortfolio = () => {
    setActiveScenarioState('baseline');
    setFacilities(SYNTHETIC_FACILITIES);
  };

  return (
    <CreditRiskOSContext.Provider
      value={{
        activeSection,
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

