"use client";

import Link from 'next/link';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';

export default function Header() {
  const { activeSection, isSidebarCollapsed, setIsSidebarCollapsed } = useCreditRiskOS();

  return (
    <header className="h-14 bg-surface-raised border-b border-hairline px-4 flex items-center justify-between z-40 select-none">
      {/* LEFT: COLLAPSE TOGGLE + BRAND & APP IDENTITY */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-1.5 rounded-lg border border-hairline-faint text-ink-muted hover:text-accent hover:border-accent/40 transition-colors text-xs font-mono"
          title="Toggle Navigation Sidebar"
        >
          {isSidebarCollapsed ? '☰' : '✕'}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-accent animate-pulse" />
          <span className="font-mono text-sm font-bold tracking-wider text-ink uppercase">
            RENFORGE BANK <span className="text-accent">plc</span>
          </span>
          <span className="text-hairline-faint mx-1 font-mono text-xs">|</span>
          <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 font-semibold uppercase">
            UK REGULATED BANK • SIMULATION
          </span>
        </div>
      </div>

      {/* CENTER: ACTIVE SECTION BADGE */}
      <div className="hidden lg:flex items-center gap-2">
        <span className="text-[11px] font-mono text-ink-faint uppercase tracking-wider">// WORKSPACE:</span>
        <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest px-2.5 py-1 rounded bg-surface-sunken border border-hairline-faint">
          {activeSection.replace('-', ' ')}
        </span>
      </div>

      {/* RIGHT: BACK TO NOTEBOOK + OPERATIONAL CHIPS */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase">
          <span className="px-2 py-0.5 rounded bg-signal/10 text-signal border border-signal/30 font-bold">
            ● PRA IN FORCE
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-sunken text-ink-muted border border-hairline-faint font-medium">
            BASEL 3.1 READY
          </span>
        </div>

        {/* BACK TO NOTEBOOK CONTROL */}
        <Link
          href="/notebook"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 hover:bg-accent hover:text-surface text-accent border border-accent/30 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-sm"
        >
          <span>←</span>
          <span>Back to Notebook</span>
        </Link>
      </div>
    </header>
  );
}
