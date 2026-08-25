"use client";

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import GlobalSearchPalette from '../ui/GlobalSearchPalette';
import OrientationModal from '../ui/OrientationModal';
import CapabilityLedgerModal from '../ui/CapabilityLedgerModal';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';

import CommandCenterView from '../views/CommandCenterView';
import CaseRoomView from '../views/CaseRoomView';
import RiskEngineWorkspace from '../views/RiskEngineWorkspace';
import DataLabView from '../views/DataLabView';
import DeliveryStudioView from '../views/DeliveryStudioView';
import TestReleaseView from '../views/TestReleaseView';

export default function Shell() {
  const { activeWorkspace } = useCreditRiskOS();
  const [isOrientationOpen, setIsOrientationOpen] = useState(false);
  const [isCapabilityLedgerOpen, setIsCapabilityLedgerOpen] = useState(false);

  const renderActiveWorkspace = () => {
    switch (activeWorkspace) {
      case 'command-centre':
        return <CommandCenterView />;
      case 'case-room':
        return <CaseRoomView />;
      case 'risk-engine':
        return <RiskEngineWorkspace />;
      case 'data-lab':
        return <DataLabView />;
      case 'delivery-studio':
        return <DeliveryStudioView />;
      case 'test-release':
        return <TestReleaseView />;
      default:
        return <CommandCenterView />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0b0f19] text-slate-100 overflow-hidden select-none font-sans">
      {/* TOP APPLICATION BAR */}
      <Header
        onOpenOrientation={() => setIsOrientationOpen(true)}
        onOpenCapabilityLedger={() => setIsCapabilityLedgerOpen(true)}
      />

      {/* WORKSPACE MIDDLE LAYER: SIDEBAR + MAIN CANVAS */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* LEFT NAVIGATION SIDEBAR */}
        <Sidebar />

        {/* MAIN WORKSPACE CANVAS */}
        <main className="flex-1 overflow-y-auto bg-[#0b0f19] relative no-scrollbar">
          {renderActiveWorkspace()}
        </main>
      </div>

      {/* FIRST-TIME ORIENTATION MODAL */}
      <OrientationModal
        isOpen={isOrientationOpen}
        onClose={() => setIsOrientationOpen(false)}
      />

      {/* PRACTITIONER CAPABILITY PRACTICE LEDGER MODAL */}
      <CapabilityLedgerModal
        isOpen={isCapabilityLedgerOpen}
        onClose={() => setIsCapabilityLedgerOpen(false)}
      />

      {/* GLOBAL SEARCH PALETTE (CMD+K) */}
      <GlobalSearchPalette />

      {/* FOOTER STATUS BAR */}
      <Footer />
    </div>
  );
}
