"use client";

import Link from 'next/link';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { Search, ArrowLeft, Activity, Compass, Award } from 'lucide-react';
import { WorkspaceId } from '../../_types';

const WORKSPACE_TITLES: Record<WorkspaceId, string> = {
  'command-centre': 'Command Centre',
  'case-room': 'Case Room',
  'risk-engine': 'Risk Engine',
  'data-lab': 'Data Lab',
  'delivery-studio': 'Delivery Studio',
  'test-release': 'Test & Release',
};

interface HeaderProps {
  onOpenOrientation?: () => void;
  onOpenCapabilityLedger?: () => void;
}

export default function Header({ onOpenOrientation, onOpenCapabilityLedger }: HeaderProps) {
  const {
    activeWorkspace,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    setIsSearchPaletteOpen,
  } = useCreditRiskOS();

  return (
    <header className="h-14 bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10 px-4 flex items-center justify-between z-40 select-none font-sans">
      {/* LEFT: COLLAPSE TOGGLE + BRAND & SIMULATION CONTEXT */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors text-xs font-mono cursor-pointer"
          title="Toggle Sidebar Navigation"
        >
          {isSidebarCollapsed ? '☰' : '✕'}
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold tracking-wider text-slate-100 uppercase">
                CREDIT RISK <span className="text-cyan-400">OS</span>
              </span>
              <span className="text-slate-600 font-mono text-xs hidden sm:inline">|</span>
              <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold uppercase hidden sm:inline-block">
                INDUS APEX BANK • INDIA
              </span>
            </div>
          </div>
        </div>

        {/* WORKSPACE BREADCRUMB INDICATOR */}
        <div className="hidden lg:flex items-center gap-1.5 ml-4 pl-4 border-l border-white/10 font-mono text-xs text-slate-400">
          <span className="text-slate-500">WORKSPACE:</span>
          <span className="text-slate-200 font-semibold uppercase tracking-wide">
            {WORKSPACE_TITLES[activeWorkspace]}
          </span>
        </div>
      </div>

      {/* CENTER & RIGHT: ORIENTATION, LEDGER, SEARCH & NOTEBOOK LINK */}
      <div className="flex items-center gap-2 font-mono text-xs">
        {onOpenOrientation && (
          <button
            onClick={onOpenOrientation}
            className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold uppercase text-[11px] flex items-center gap-1 cursor-pointer"
            title="First-Time Orientation"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden md:inline">ORIENTATION</span>
          </button>
        )}

        {onOpenCapabilityLedger && (
          <button
            onClick={onOpenCapabilityLedger}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold uppercase text-[11px] flex items-center gap-1 cursor-pointer"
            title="Practitioner Capability Record"
          >
            <Award className="w-3.5 h-3.5" />
            <span className="hidden md:inline">PRACTICE RECORD</span>
          </button>
        )}

        {/* QUICK SEARCH CMD+K */}
        <button
          onClick={() => setIsSearchPaletteOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-white/10 font-semibold uppercase text-[11px] transition-colors cursor-pointer"
          title="Global Search (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline">SEARCH</span>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] bg-slate-900 border border-white/10 rounded text-slate-400">⌘K</kbd>
        </button>

        {/* SUBTLE SECONDARY LINK BACK TO NOTEBOOK */}
        <div className="ml-1 pl-2 border-l border-white/10">
          <Link
            href="/notebook"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-white/5 font-mono text-[11px] font-medium transition-all cursor-pointer"
            title="Return to Portfolio Notebook Hub"
          >
            <ArrowLeft className="w-3 h-3" />
            <span className="hidden sm:inline">Notebook</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
