"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import {
  Building2,
  Briefcase,
  Cpu,
  Database,
  Layers,
  ArrowRight,
  AlertTriangle,
  Clock,
  Activity,
  CheckCircle2,
  FileSpreadsheet,
  ShieldAlert,
} from 'lucide-react';
import { getIndiaPortfolioTotals, INDUS_APEX_BANK_ENTITY } from '../../_data/indiaSyntheticBank';
import { ALL_CASES, deriveCaseReleaseStatus, deriveCaseReconciliationStatus } from '../../_state/operatingSystemStore';

export default function CommandCentreView() {
  const { setActiveWorkspace, setActiveSubTool, facilities, setIsSearchPaletteOpen } = useCreditRiskOS();
  const totals = getIndiaPortfolioTotals(facilities);

  const formatInrCr = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 1 }).format(val) + ' Cr';

  return (
    <div className="w-full min-h-full p-4 sm:p-6 lg:p-8 space-y-8 select-none text-slate-100 font-sans">
      {/* ─── 01 · HERO OPERATING HEADER ─── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900 border border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>SCHEDULED COMMERCIAL BANK • INDIA TRUTH MODEL</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              CREDIT RISK <span className="text-cyan-400">OS</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              India-first simulated banking risk & transformation workbench for <strong>{INDUS_APEX_BANK_ENTITY.name}</strong>. Experience how Credit Risk Analytics, RBI IRACP Asset Quality, RBI Basel III Capital, Treasury & ALM, BCBS 239 Data Lineage, and Delivery Studio connect in practice.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveWorkspace('case-room')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <span>EXPLORE CASE ROOM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsSearchPaletteOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-white/10 font-bold uppercase tracking-wider text-xs transition-all cursor-pointer"
            >
              <span>QUICK SEARCH (⌘K)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── 02 · LIVE INDIA BANK OPERATING METRICS ─── */}
      <section aria-label="Bank Status" className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
            <Building2 className="w-4 h-4" />
            <span>INSTITUTIONAL OPERATING STATUS • {INDUS_APEX_BANK_ENTITY.name.toUpperCase()}</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
            SIMULATION DATE: {INDUS_APEX_BANK_ENTITY.simulationDate}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          {/* GROSS ADVANCES EXPOSURE */}
          <div className="cros-glass-card p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 uppercase">
              <span>GROSS PORTFOLIO ADVANCES</span>
              <span className="text-cyan-400 text-[10px]">{totals.facilityCount} FACILITIES</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-100 cros-num">
              {formatInrCr(totals.totalOutstandingInrCr)}
            </div>
            <p className="text-[10px] text-slate-400 font-sans">
              Sanctioned Limit: {formatInrCr(totals.totalLimitInrCr)}
            </p>
          </div>

          {/* GROSS NPA RATIO */}
          <div className="cros-glass-card p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 uppercase">
              <span>GROSS NPA RATIO</span>
              <span className="text-amber-400 text-[10px]">{totals.npaCount} NPA EXPOSURE</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 cros-num">
              {totals.grossNpaRatioPercent.toFixed(2)}<span className="text-xs font-normal text-amber-300">%</span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans">
              Gross NPA: {formatInrCr(totals.grossNpaInrCr)}
            </p>
          </div>

          {/* REQUIRED IRACP PROVISIONS */}
          <div className="cros-glass-card p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 uppercase">
              <span>IRACP REQUIRED PROVISION</span>
              <span className="text-cyan-400 text-[10px]">RBI SUPERVISORY</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-300 cros-num">
              {formatInrCr(totals.totalIracpProvisionInrCr)}
            </div>
            <p className="text-[10px] text-slate-400 font-sans">
              Mandatory Balance Sheet Reserve
            </p>
          </div>

          {/* CET1 CAPITAL & CRAR */}
          <div className="cros-glass-card p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 uppercase">
              <span>WHOLE-BANK CET1 / CRAR</span>
              <span className="text-emerald-400 text-[10px]">RBI FRAMEWORK</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 cros-num">
              {INDUS_APEX_BANK_ENTITY.wholeBankCet1RatioPercent.toFixed(2)}<span className="text-xs font-normal text-emerald-300">%</span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans">
              CRAR: {INDUS_APEX_BANK_ENTITY.wholeBankCrarPercent.toFixed(2)}% | RWA: ₹28,000 Cr
            </p>
          </div>
        </div>
      </section>

      {/* ─── 03 · OPERATING PULSE ─── */}
      <section aria-label="Operating Pulse" className="space-y-4">
        <div className="border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>OPERATING PULSE & ASSET QUALITY BREAKDOWN</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="cros-glass-card p-4 rounded-xl flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase">STANDARD ASSETS</div>
              <div className="text-lg font-bold text-emerald-400 cros-num">{totals.standardCount} Facilities</div>
            </div>
          </div>

          <div className="cros-glass-card p-4 rounded-xl flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase">SMA-1 / SMA-2</div>
              <div className="text-lg font-bold text-amber-400 cros-num">{totals.sma1Count + totals.sma2Count} Facilities</div>
            </div>
          </div>

          <div className="cros-glass-card p-4 rounded-xl flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase">SUBSTANDARD NPA</div>
              <div className="text-lg font-bold text-rose-400 cros-num">{totals.npaCount} Facility</div>
            </div>
          </div>

          <div className="cros-glass-card p-4 rounded-xl flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase">LCR / NSFR</div>
              <div className="text-lg font-bold text-cyan-300 cros-num">118.4% / 108.8%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04 · ACTIVE WORK / CASE PREVIEWS ─── */}
      <section aria-label="Active Work" className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-300">
            <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
            <span>TRANSFORMATION ASSIGNMENT PREVIEWS</span>
          </div>
          <button
            onClick={() => setActiveWorkspace('case-room')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 uppercase tracking-wider cursor-pointer"
          >
            <span>VIEW CASE ROOM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ALL_CASES.map((c, idx) => {
            const reconcileEval = deriveCaseReconciliationStatus(c.definition.defects, c.definition.reconciliationSummary);
            const releaseEval = deriveCaseReleaseStatus(c.definition.defects, c.definition.uatTestPack, c.definition.signoffs, reconcileEval.isReconciled);
            const targetTools = ['iracp', 'treasury', 'capital'] as const;
            const toolLabels = ['OPEN IRACP ENGINE', 'OPEN TREASURY TOOL', 'OPEN CAPITAL TOOL'];
            const targetTool = targetTools[idx] || 'credit-risk';
            const toolLabel = toolLabels[idx] || 'OPEN SUB-TOOL';

            return (
              <div key={c.caseId} className="cros-glass-interactive p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-cyan-400 font-semibold">
                    <span>{c.definition.metadata.code}</span>
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${releaseEval.bgClass} ${releaseEval.textClass}`}>
                      {releaseEval.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 uppercase tracking-tight">
                    {c.definition.metadata.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {c.definition.metadata.problemStatement}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveWorkspace('risk-engine');
                    setActiveSubTool(targetTool);
                  }}
                  className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all border border-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{toolLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── 05 · WORKSPACE PATHWAYS ─── */}
      <section aria-label="Workspace Pathways" className="space-y-4">
        <div className="border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-300">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>PRIMARY WORKBENCH PATHWAYS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveWorkspace('case-room')}
            className="cros-glass-interactive p-5 rounded-2xl text-left space-y-3 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-slate-500 font-semibold">02</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-100 uppercase tracking-tight group-hover:text-cyan-400">
                Case Room
              </h4>
              <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                End-to-end banking & consulting transformation assignments.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveWorkspace('risk-engine')}
            className="cros-glass-interactive p-5 rounded-2xl text-left space-y-3 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-slate-500 font-semibold">03</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-100 uppercase tracking-tight group-hover:text-cyan-400">
                Risk Engine
              </h4>
              <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                Credit risk, RBI IRACP, RBI Basel capital & treasury math.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveWorkspace('data-lab')}
            className="cros-glass-interactive p-5 rounded-2xl text-left space-y-3 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <Database className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-slate-500 font-semibold">04</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-100 uppercase tracking-tight group-hover:text-cyan-400">
                Data Lab
              </h4>
              <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                BCBS 239 data lineage, schema dictionary & quality rules.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveWorkspace('delivery-studio')}
            className="cros-glass-interactive p-5 rounded-2xl text-left space-y-3 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-slate-500 font-semibold">05</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-100 uppercase tracking-tight group-hover:text-cyan-400">
                Delivery Studio
              </h4>
              <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                BA requirements, traceability matrix & target operating model.
              </p>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}
