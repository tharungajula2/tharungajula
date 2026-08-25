"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { SubToolId } from '../../_types';
import { Database, GitFork, Users } from 'lucide-react';

import DataView from './DataView';
import CustomersView from './CustomersView';

interface SubToolTab {
  id: SubToolId;
  label: string;
  icon: React.ElementType;
}

const DATA_SUBTOOLS: SubToolTab[] = [
  { id: 'data', label: 'BCBS 239 Lineage & Catalog', icon: GitFork },
  { id: 'customers', label: 'Obligor Registry & Data', icon: Users },
];

export default function DataLabWorkspace() {
  const { activeSubTool, setActiveSubTool } = useCreditRiskOS();

  const renderSubToolView = () => {
    switch (activeSubTool) {
      case 'data':
        return <DataView />;
      case 'customers':
        return <CustomersView />;
      default:
        return <DataView />;
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col select-none text-slate-100">
      {/* DATA LAB SUB-TOOL BAR */}
      <div className="bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10 px-4 py-2 flex items-center justify-between overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 font-mono text-xs">
          <div className="flex items-center gap-2 pr-3 mr-2 border-r border-white/10 text-cyan-400 font-bold uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>DATA LAB</span>
          </div>

          <div className="flex items-center gap-1">
            {DATA_SUBTOOLS.map((tab) => {
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
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ACTIVE SUB-TOOL CONTENT CANVAS */}
      <div className="flex-1 overflow-y-auto">
        {renderSubToolView()}
      </div>
    </div>
  );
}
