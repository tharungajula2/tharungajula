"use client";

import { CASE_01_METADATA, CasePhase } from '../case01Data';
import { Briefcase, AlertTriangle, FileText, CheckCircle2, Clock, ShieldAlert, ArrowRight } from 'lucide-react';

interface Props {
  currentPhase: CasePhase;
  onNavigatePhase: (phase: CasePhase) => void;
}

export default function CaseOverviewSection({ currentPhase, onNavigatePhase }: Props) {
  const formatInrCr = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 1 }).format(val) + ' Cr';

  return (
    <div className="space-y-6 font-sans text-slate-100">
      {/* CASE OBJECTIVE BANNER */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900 border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono text-xs font-bold uppercase tracking-wider">
            ASSIGNED TRANSFORMATION PROGRAMME • {CASE_01_METADATA.code}
          </span>
          <span className="font-mono text-xs text-slate-400">
            TARGET DEADLINE: <strong className="text-rose-400">{CASE_01_METADATA.targetDeadline}</strong>
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black uppercase text-slate-100 font-mono tracking-tight">
            PROBLEM STATEMENT & CASE OBJECTIVE
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-4xl font-sans">
            {CASE_01_METADATA.problemStatement}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-white/5">
          <div>SPONSORS: <strong className="text-slate-200">{CASE_01_METADATA.businessOwner}</strong></div>
          <div className="text-slate-600">|</div>
          <div>INSTITUTION: <strong className="text-cyan-400">{CASE_01_METADATA.institution}</strong></div>
        </div>
      </div>

      {/* KEY OPERATING INDICATORS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 uppercase text-[10px]">FACILITIES IN SCOPE</span>
          <div className="text-2xl font-black text-slate-100 cros-num">8 Corporate Loans</div>
          <span className="text-[10px] text-slate-400 font-sans">₹2,645.0 Cr Total Outstanding</span>
        </div>

        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 uppercase text-[10px]">CLASSIFICATION MISMATCHES</span>
          <div className="text-2xl font-black text-amber-400 cros-num">3 Accounts</div>
          <span className="text-[10px] text-slate-400 font-sans">PUN-MFG-4403, CHN-RES-5507, DEL-MED-7706</span>
        </div>

        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 uppercase text-[10px]">PROVISION VARIANCE</span>
          <div className="text-2xl font-black text-rose-400 cros-num">{formatInrCr(18.8)}</div>
          <span className="text-[10px] text-slate-400 font-sans">Finance GL Reserve Deficit</span>
        </div>

        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 uppercase text-[10px]">UNRESOLVED DEFECTS</span>
          <div className="text-2xl font-black text-cyan-300 cros-num">4 Seeded Defects</div>
          <span className="text-[10px] text-slate-400 font-sans">2 Blockers, 1 Critical, 1 Major</span>
        </div>
      </div>

      {/* CASE PHASE LIFECYCLE STEPPER */}
      <div className="cros-glass-card p-6 rounded-2xl space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-bold text-slate-100 uppercase tracking-wider">// CASE LIFECYCLE PROGRESSION</span>
          <span className="text-cyan-400 font-bold uppercase">CURRENT PHASE: {currentPhase.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { phase: 'Discovery' as CasePhase, code: '01', title: 'Evidence Discovery' },
            { phase: 'Requirements' as CasePhase, code: '02', title: 'BRD & STTM' },
            { phase: 'Build Validation' as CasePhase, code: '03', title: 'Data Investigation' },
            { phase: 'UAT' as CasePhase, code: '04', title: 'UAT & Defects' },
            { phase: 'Sign-off' as CasePhase, code: '05', title: 'Reconciliation' },
            { phase: 'Completed' as CasePhase, code: '06', title: 'Final Release' },
          ].map((step) => {
            const isCurrent = currentPhase === step.phase;
            return (
              <button
                key={step.phase}
                onClick={() => onNavigatePhase(step.phase)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                  isCurrent
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold shadow-md'
                    : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">{step.code}</span>
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                </div>
                <div className="text-xs truncate">{step.title}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
