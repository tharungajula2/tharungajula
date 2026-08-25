"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { Terminal, Building2 } from 'lucide-react';

export default function Footer() {
  const { activeScenario, facilities } = useCreditRiskOS();

  return (
    <footer className="h-7 bg-[#0b0f19] border-t border-white/10 px-4 flex items-center justify-between z-40 select-none text-[10px] font-mono text-slate-400">
      {/* LEFT: SIMULATION STATUS & DATE */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-slate-300 font-semibold uppercase">CREDIT RISK OS 2.0</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">SIMULATION DATE: <span className="text-slate-200">31 JULY 2026</span></span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-slate-500">
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span>ENGINE: <span className="text-cyan-400 font-semibold">DETERMINISTIC V2</span></span>
        </div>
      </div>

      {/* CENTER: ACTIVE SCENARIO STATUS */}
      <div className="hidden lg:flex items-center gap-2">
        <span className="text-slate-500">MACRO SCENARIO:</span>
        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold uppercase tracking-wider text-[9px]">
          {activeScenario.replace('-', ' ')}
        </span>
      </div>

      {/* RIGHT: PORTFOLIO COUNT & NEUTRAL STATUS BADGE */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-slate-500">
          FACILITIES: <span className="text-slate-200 font-bold">{facilities.length}</span>
        </span>

        <div className="flex items-center gap-1 text-cyan-400 font-semibold uppercase tracking-wider text-[9px] bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
          <Building2 className="w-3 h-3 text-cyan-400" />
          <span>SIMULATED BANK · INDIA</span>
        </div>
      </div>
    </footer>
  );
}
