"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { WorkspaceId } from '../../_types';
import {
  LayoutDashboard,
  Briefcase,
  Cpu,
  Database,
  Layers,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface WorkspaceNavItem {
  id: WorkspaceId;
  code: string;
  label: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
}

const WORKSPACE_ITEMS: WorkspaceNavItem[] = [
  {
    id: 'command-centre',
    code: '01',
    label: 'Command Centre',
    description: 'Bank state, work queue & operational pulse',
    icon: LayoutDashboard,
  },
  {
    id: 'case-room',
    code: '02',
    label: 'Case Room',
    description: 'End-to-end banking transformation cases',
    icon: Briefcase,
    badge: '3 CASES',
  },
  {
    id: 'risk-engine',
    code: '03',
    label: 'Risk Engine',
    description: 'Credit risk, impairment, capital & treasury math',
    icon: Cpu,
    badge: 'LIVE',
  },
  {
    id: 'data-lab',
    code: '04',
    label: 'Data Lab',
    description: 'Lineage, data quality & catalog',
    icon: Database,
  },
  {
    id: 'delivery-studio',
    code: '05',
    label: 'Delivery Studio',
    description: 'BA requirements, traceability & TOM',
    icon: Layers,
  },
  {
    id: 'test-release',
    code: '06',
    label: 'Test & Release',
    description: 'SIT, UAT, defects & release readiness',
    icon: CheckCircle2,
  },
];

export default function Sidebar() {
  const { activeWorkspace, setActiveWorkspace, isSidebarCollapsed, setIsSidebarCollapsed } = useCreditRiskOS();

  return (
    <aside
      className={`relative z-30 bg-[#0f172a]/95 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between transition-all duration-300 select-none ${
        isSidebarCollapsed ? 'w-16' : 'w-64 md:w-72'
      }`}
    >
      {/* WORKSPACE NAVIGATION HEADER */}
      <div className="p-3">
        <div className="px-2 py-2 mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
          {!isSidebarCollapsed && <span>WORKSPACES</span>}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-colors ml-auto cursor-pointer"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* WORKSPACE ITEMS LIST */}
        <nav className="space-y-1.5" aria-label="Workspaces">
          {WORKSPACE_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeWorkspace === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveWorkspace(item.id)}
                className={`w-full group relative flex items-center gap-3 p-2.5 rounded-xl transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-semibold'
                    : 'bg-transparent border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 hover:border-white/10'
                }`}
                title={isSidebarCollapsed ? `${item.code} — ${item.label}` : undefined}
              >
                {/* Active Indicator Strip */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-400 rounded-r-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                )}

                {/* Workspace Icon */}
                <div
                  className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                    isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/80 text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Expanded Item Text */}
                {!isSidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-xs uppercase tracking-tight truncate">
                        <span className="text-slate-500 mr-1.5 font-mono text-[11px]">{item.code}</span>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 font-sans truncate mt-0.5">
                      {item.description}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* FOOTER ENVIRONMENT IDENTITY IN SIDEBAR */}
      {!isSidebarCollapsed && (
        <div className="p-3 border-t border-white/5 font-mono text-[10px] text-slate-500 space-y-1">
          <div className="flex items-center justify-between">
            <span className="uppercase text-slate-400">BANK MODEL</span>
            <span className="text-cyan-400 font-semibold">INDIA HQ</span>
          </div>
          <p className="text-[9px] text-slate-500 font-sans leading-tight">
            Indus Apex Bank India • Simulated Risk OS
          </p>
        </div>
      )}
    </aside>
  );
}
