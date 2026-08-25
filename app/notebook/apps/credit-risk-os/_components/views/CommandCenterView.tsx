"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import {
  CANONICAL_BANK_STATE,
  ALL_CASES,
  getAllDefects,
  getAllUatTests,
  getAllSignoffs,
  deriveCaseReleaseStatus,
} from '../../_state/operatingSystemStore';
import {
  Activity,
  Briefcase,
  Layers,
  Database,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Award,
  Play,
  Clock,
} from 'lucide-react';

export default function CommandCenterView() {
  const { navigateToCase, navigateToWorkspace } = useCreditRiskOS();

  const allDefects = getAllDefects();
  const allUatTests = getAllUatTests();
  const allSignoffs = getAllSignoffs();

  const openBlockers = allDefects.filter(
    (d) => d.item.status === 'Open' && (d.item.severity === 'BLOCKER' || d.item.severity === 'CRITICAL')
  );

  return (
    <div className="w-full min-h-full p-4 sm:p-6 lg:p-8 space-y-8 text-slate-100 select-none font-sans">
      {/* HEADER & CANONICAL BANK STATE BANNER */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
              <Activity className="w-4 h-4" />
              <span>COMMAND CENTRE • ENTERPRISE OPERATING HOME</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              {CANONICAL_BANK_STATE.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
              Scheduled Commercial Bank (Private Sector) • Non-D-SIB • RBI Prudential Regulation • {CANONICAL_BANK_STATE.asOfDate}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              3 ACTIVE TRANSFORMATIONS
            </span>
          </div>
        </div>

        {/* CANONICAL FINANCIAL BASELINE KPI STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="cros-glass-card p-4 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block font-sans">TOTAL ASSETS (CBS):</span>
            <span className="text-xl font-black text-slate-100">
              ₹{CANONICAL_BANK_STATE.headlineAssetsInrCr.toLocaleString('en-IN')} Cr
            </span>
            <span className="text-[10px] text-slate-400 block font-sans">Authoritative Core Banking Baseline</span>
          </div>

          <div className="cros-glass-card p-4 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block font-sans">WHOLE-BANK CET1 RATIO:</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-cyan-400">
                {CANONICAL_BANK_STATE.headlineCet1RatioPercent.toFixed(2)}%
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">
                (min {CANONICAL_BANK_STATE.minCet1RequirementPercent.toFixed(1)}%)
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block font-sans">
              CET1 Capital: ₹{CANONICAL_BANK_STATE.headlineCet1CapitalInrCr.toLocaleString('en-IN')} Cr
            </span>
          </div>

          <div className="cros-glass-card p-4 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block font-sans">TOTAL CRAR ADEQUACY:</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-emerald-400">
                {CANONICAL_BANK_STATE.headlineCrarPercent.toFixed(2)}%
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">
                (min {CANONICAL_BANK_STATE.minCrarRequirementPercent.toFixed(1)}%)
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block font-sans">Supervisory Capital Adequate</span>
          </div>

          <div className="cros-glass-card p-4 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block font-sans">WHOLE-BANK TOTAL RWA:</span>
            <span className="text-xl font-black text-slate-100">
              ₹{CANONICAL_BANK_STATE.headlineTotalRwaInrCr.toLocaleString('en-IN')} Cr
            </span>
            <span className="text-[10px] text-slate-400 block font-sans">Credit RWA ₹25,500 Cr | Mkt/Ops ₹2,500 Cr</span>
          </div>
        </div>
      </div>

      {/* ACTIVE TRANSFORMATIONS SURFACES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold uppercase text-slate-100 font-mono tracking-tight">
              ACTIVE BANK TRANSFORMATION PROGRAMMES ({ALL_CASES.length})
            </h2>
          </div>
          <button
            onClick={() => navigateToWorkspace('case-room')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 cursor-pointer"
          >
            <span>GO TO CASE ROOM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ALL_CASES.map((c) => {
            const caseDefects = allDefects.filter((d) => d.caseId === c.caseId).map((d) => d.item);
            const caseTests = allUatTests.filter((t) => t.caseId === c.caseId).map((t) => t.item);
            const caseSignoffs = allSignoffs.filter((s) => s.caseId === c.caseId).map((s) => s.item);

            const openBlockersCount = caseDefects.filter(
              (d) => d.status === 'Open' && (d.severity === 'BLOCKER' || d.severity === 'CRITICAL')
            ).length;
            const openTotalDefects = caseDefects.filter((d) => d.status === 'Open').length;
            const passedTestsCount = caseTests.filter((t) => t.status === 'PASSED').length;
            const uatPassPercent = (passedTestsCount / caseTests.length) * 100;
            const isReconciled = c.definition.reconciliationSummary.afterFix.unexplainedVarianceInrCr === 0;

            const releaseEval = deriveCaseReleaseStatus(caseDefects, caseTests, caseSignoffs, isReconciled);

            return (
              <div
                key={c.caseId}
                className="cros-glass-card p-5 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-cyan-400 font-bold">{c.definition.metadata.code}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${releaseEval.bgClass} ${releaseEval.textClass}`}>
                      {releaseEval.label}
                    </span>
                  </div>
                  <h3 className="text-base font-bold uppercase text-slate-100 font-mono leading-snug">
                    {c.definition.metadata.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans line-clamp-2">
                    {c.definition.metadata.problemStatement}
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs pt-3 border-t border-white/5">
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-slate-950 border border-white/5">
                      <span className="text-slate-500 block text-[9px] uppercase">OPEN DEFECTS:</span>
                      <span className={`font-bold ${openTotalDefects > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {openTotalDefects} ({openBlockersCount} Blocker/Crit)
                      </span>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-white/5">
                      <span className="text-slate-500 block text-[9px] uppercase">UAT PASS RATE:</span>
                      <span className={`font-bold ${uatPassPercent === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {uatPassPercent.toFixed(0)}% ({passedTestsCount}/{caseTests.length})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Reconciliation Status:</span>
                    <span className={`font-bold ${isReconciled ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isReconciled ? 'RECONCILED' : 'BREAK ALERT'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigateToCase(c.caseId)}
                  className="w-full py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>LAUNCH WORKSPACE</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* TWO-COLUMN LOWER SECTION: ATTENTION QUEUE + ACTIVITY FEED & QUICK DEEP LINKS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        {/* LEFT 7 COLS: OPERATIONAL ATTENTION QUEUE */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-bold uppercase text-slate-100 font-mono tracking-tight">
              OPERATIONAL ATTENTION QUEUE ({openBlockers.length} BLOCKERS)
            </h2>
          </div>

          <div className="space-y-3">
            {openBlockers.slice(0, 5).map((def) => (
              <div
                key={def.item.id}
                className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold text-[10px]">
                      {def.item.code}
                    </span>
                    <span className="text-slate-300 font-bold text-xs">{def.caseCode} • {def.item.severity}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{def.item.category}</span>
                </div>
                <p className="text-slate-200 font-sans text-xs font-semibold">{def.item.title}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5 font-sans">
                  <span>Impact: <strong className="text-slate-200">₹{def.item.financialImpactInrCr.toFixed(1)} Cr</strong></span>
                  <button
                    onClick={() => navigateToCase(def.caseId)}
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[10px] cursor-pointer"
                  >
                    <span>INVESTIGATE IN {def.caseCode}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT 5 COLS: WORKSPACE QUICK ACCESS NAVIGATOR */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold uppercase text-slate-100 font-mono tracking-tight">
              WORKSPACE QUICK NAVIGATOR
            </h2>
          </div>

          <div className="space-y-3 font-sans text-xs">
            <button
              onClick={() => navigateToWorkspace('data-lab')}
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/50 text-left transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <span className="font-mono text-cyan-400 text-xs font-bold uppercase block">WORKSPACE 03 · DATA LAB</span>
                <span className="text-slate-300 text-xs font-bold block">STTM Mappings, DQ Workbench & Lineage</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Browse 38 mappings across synthetic sources</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            </button>

            <button
              onClick={() => navigateToWorkspace('delivery-studio')}
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/50 text-left transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <span className="font-mono text-cyan-400 text-xs font-bold uppercase block">WORKSPACE 04 · DELIVERY STUDIO</span>
                <span className="text-slate-300 text-xs font-bold block">Lead BA Workspace & Traceability</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">36 REQs, 30 Rules & 24 RTM Chains</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            </button>

            <button
              onClick={() => navigateToWorkspace('test-release')}
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/50 text-left transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <span className="font-mono text-cyan-400 text-xs font-bold uppercase block">WORKSPACE 05 · TEST & RELEASE</span>
                <span className="text-slate-300 text-xs font-bold block">Release Control Tower & Governance</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">54 UAT Tests, 15 Defects & 15 Sign-offs</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            </button>

            <button
              onClick={() => navigateToWorkspace('risk-engine')}
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/50 text-left transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <span className="font-mono text-cyan-400 text-xs font-bold uppercase block">WORKSPACE 06 · RISK ENGINE</span>
                <span className="text-slate-300 text-xs font-bold block">Domain Calculation Workbench</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">IRACP, Treasury FTP, Capital RWA & Stress Test</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
