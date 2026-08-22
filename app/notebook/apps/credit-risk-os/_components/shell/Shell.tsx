"use client";

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import GuidedMasterclassModal from '../ui/GuidedMasterclassModal';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';

import BankView from '../views/BankView';
import CustomersView from '../views/CustomersView';
import CreditRiskView from '../views/CreditRiskView';
import IFRS9View from '../views/IFRS9View';
import CapitalView from '../views/CapitalView';
import TreasuryView from '../views/TreasuryView';
import ReportingView from '../views/ReportingView';
import DataView from '../views/DataView';
import ChangeView from '../views/ChangeView';
import RegulationView from '../views/RegulationView';
import SimulationLabView from '../views/SimulationLabView';

export default function Shell() {
  const { activeSection } = useCreditRiskOS();

  const renderActiveView = () => {
    switch (activeSection) {
      case 'bank':
        return <BankView />;
      case 'customers':
        return <CustomersView />;
      case 'credit-risk':
        return <CreditRiskView />;
      case 'ifrs9':
        return <IFRS9View />;
      case 'capital':
        return <CapitalView />;
      case 'treasury':
        return <TreasuryView />;
      case 'reporting':
        return <ReportingView />;
      case 'data':
        return <DataView />;
      case 'change':
        return <ChangeView />;
      case 'regulation':
        return <RegulationView />;
      case 'simulation-lab':
        return <SimulationLabView />;
      default:
        return <BankView />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-surface text-ink overflow-hidden select-none">
      {/* COMPACT TOP APPLICATION BAR */}
      <Header />

      {/* WORKSPACE MIDDLE LAYER: SIDEBAR + MAIN VIEW */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* LEFT NAVIGATION SIDEBAR */}
        <Sidebar />

        {/* MAIN WORKSPACE VIEW */}
        <main className="flex-1 overflow-y-auto bg-surface-sunken/20 no-scrollbar relative">
          {renderActiveView()}
        </main>
      </div>

      {/* GUIDED MASTERCLASS OVERLAY MODAL */}
      <GuidedMasterclassModal />

      {/* COMPACT FOOTER STATUS BAR */}
      <Footer />
    </div>
  );
}
