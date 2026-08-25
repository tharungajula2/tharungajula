"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { SubToolId } from '../../_types';
import { Cpu, Calculator, ShieldAlert, LineChart, Landmark, Layers, Activity, ArrowRight } from 'lucide-react';

import CreditRiskView from './CreditRiskView';
import IRACPView from './IRACPView';
import CapitalView from './CapitalView';
import TreasuryView from './TreasuryView';
import SimulationLabView from './SimulationLabView';
import BankView from './BankView';

interface SubToolTab {
  id: SubToolId;
  label: string;
  code: string;
  icon: React.ElementType;
  linkedCaseId?: string;
  linkedCaseCode?: string;
}

const RISK_SUBTOOLS: SubToolTab[] = [
  { id: 'bank', label: 'Bank Overview', code: '01', icon: Landmark },
  { id: 'credit-risk', label: 'Risk Parameters', code: '02', icon: Calculator },
  { id: 'iracp', label: 'Asset Quality & IRACP', code: '03', icon: ShieldAlert, linkedCaseId: 'CASE-2026-01', linkedCaseCode: 'CASE-001' },
  { id: 'capital', label: 'RBI Basel III Capital', code: '04', icon: Layers, linkedCaseId: 'CASE-2026-03', linkedCaseCode: 'CASE-003' },
  { id: 'treasury', label: 'Treasury & FTP', code: '05', icon: LineChart, linkedCaseId: 'CASE-2026-02', linkedCaseCode: 'CASE-002' },
  { id: 'simulation-lab', label: 'Macro Stress Lab', code: '06', icon: Activity },
];

export default function RiskEngineWorkspace() {
  const { activeSubTool, setActiveSubTool, navigateToCase } = useCreditRiskOS();

  const activeTabConfig = RISK_SUBTOOLS.find((t) => t.id === activeSubTool) || RISK_SUBTOOLS[0];

  const renderSubToolView = () => {
    switch (activeSubTool) {
      case 'bank':
        return <BankView />;
      case 'credit-risk':
        return <CreditRiskView />;
      case 'iracp':
        return <IRACPView />;
      case 'capital':
        return <CapitalView />;
      case 'treasury':
        return <TreasuryView />;
      case 'simulation-lab':
        return <SimulationLabView />;
      default:
        return <IRACPView />;
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col select-none text-slate-100 font-sans">
      {/* RISK ENGINE SUB-TOOL BAR */}
      <div className="bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10 px-4 py-2 flex flex-wrap items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 font-mono text-xs">
          <div className="flex items-center gap-2 pr-3 mr-2 border-r border-white/10 text-cyan-400 font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>RISK ENGINE</span>
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            {RISK_SUBTOOLS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubTool === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTool(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-mono text-xs uppercase tracking-tight whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-semibold shadow-sm'
                      : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.linkedCaseCode && (
                    <span className="px-1.5 py-0.2 text-[9px] rounded bg-cyan-500/20 text-cyan-400 font-mono font-bold">
                      {tab.linkedCaseCode}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* LINKED CASE DEEP-LINK BUTTON */}
        {activeTabConfig.linkedCaseId && (
          <button
            onClick={() => navigateToCase(activeTabConfig.linkedCaseId!)}
            className="px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>LAUNCH {activeTabConfig.linkedCaseCode} WORKSPACE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* ACTIVE SUB-TOOL CONTENT CANVAS */}
      <div className="flex-1 overflow-y-auto">
        {renderSubToolView()}
      </div>
    </div>
  );
}
