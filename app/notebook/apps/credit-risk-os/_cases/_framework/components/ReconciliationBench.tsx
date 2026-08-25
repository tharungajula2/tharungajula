"use client";

import { ReconciliationSummary, CaseDefect } from '../types';
import { CheckCircle2, AlertTriangle, ShieldAlert, GitBranch, Layers, ArrowRight } from 'lucide-react';

interface Props {
  reconciliationSummary: ReconciliationSummary;
  defects: CaseDefect[];
}

export default function ReconciliationBench({ reconciliationSummary, defects }: Props) {
  const openDefects = defects.filter((d) => d.status === 'Open');
  const isFullyReconciled = openDefects.length === 0;

  const formatInrCr = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 1 }).format(val) + ' Cr';

  const currentVariance = isFullyReconciled
    ? reconciliationSummary.afterFix.unexplainedVarianceInrCr
    : reconciliationSummary.beforeFix.unexplainedVarianceInrCr;

  const currentStatus = isFullyReconciled
    ? reconciliationSummary.afterFix.reconciliationStatus
    : reconciliationSummary.beforeFix.reconciliationStatus;

  const currentGrossAbsolute = isFullyReconciled
    ? reconciliationSummary.afterFix.grossAbsoluteVarianceInrCr || 0.0
    : reconciliationSummary.beforeFix.grossAbsoluteVarianceInrCr || 0.0;

  const stageBreaks = isFullyReconciled
    ? reconciliationSummary.afterFix.stageBreaks || []
    : reconciliationSummary.beforeFix.stageBreaks || [];

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // MULTI-STAGE CONTROL & RECONCILIATION BENCH
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            MULTI-STAGE BALANCE, RECORD COUNT & RUN VERSION RECONCILIATION
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          PERIOD AS AT: {reconciliationSummary.asOfDate}
        </span>
      </div>

      {/* COMPENSATING ERROR WARNING BANNER */}
      {!isFullyReconciled && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-rose-400 text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>COMPENSATING ERROR WARNING — NETTING DOES NOT EQUAL RECONCILIATION</span>
          </div>
          <p className="font-sans text-xs text-slate-200">
            Netting compensating errors must <strong>never</strong> be allowed to hide underlying process breaks! While the Net Source → Output difference appears as +₹355.0 Cr, multiple independent control failures accumulate a <strong>Gross Absolute Reconciliation Break of {formatInrCr(currentGrossAbsolute)}</strong>.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-rose-300">
            <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30">Net Difference: +₹355.0 Cr</span>
            <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30 font-bold text-rose-200">Gross Absolute Break: {formatInrCr(currentGrossAbsolute)}</span>
            <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30">Open Defective Stages: 3 Breaks</span>
          </div>
        </div>
      )}

      {/* RECONCILIATION STATUS SUMMARY CARD */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs ${
        isFullyReconciled
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          : 'bg-slate-900 border-white/10 text-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          {isFullyReconciled ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
          <div>
            <span className="font-bold block uppercase text-slate-100">CONTROL STATUS: {currentStatus}</span>
            <span className="text-[11px] font-sans text-slate-300">
              {isFullyReconciled
                ? '100% Multi-stage balance, record count, rejected population, and run version locked with zero variance.'
                : `${openDefects.length} active defects creating independent stage breaks across ETL pipelines.`}
            </span>
          </div>
        </div>

        <div className="text-right flex items-center gap-4">
          <div>
            <span className="text-[9px] uppercase text-slate-400 block">NET VARIANCE:</span>
            <span className="text-sm font-bold text-slate-200">{formatInrCr(currentVariance)}</span>
          </div>
          <div>
            <span className="text-[9px] uppercase text-rose-400 block">GROSS ABSOLUTE BREAK:</span>
            <span className="text-base font-black text-rose-300">{formatInrCr(currentGrossAbsolute)}</span>
          </div>
        </div>
      </div>

      {/* INDEPENDENT STAGE BREAKS TABLE WITH DEFECT LINKAGE */}
      {stageBreaks.length > 0 && (
        <div className="cros-glass-card p-6 rounded-2xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold text-slate-100 uppercase tracking-wider">// INDEPENDENT STAGE BREAK ANALYSIS ({stageBreaks.length} STAGES)</span>
            <span className="text-cyan-400 font-bold text-[10px] uppercase">POPULATION & MONETARY DISCREPANCY AUDIT</span>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase">
                  <th className="p-2.5">Stage Transition</th>
                  <th className="p-2.5">Source Count → Target Count</th>
                  <th className="p-2.5">Source Amount → Target Amount</th>
                  <th className="p-2.5">Independent Stage Variance</th>
                  <th className="p-2.5">Root Cause & Defect Linkage</th>
                  <th className="p-2.5">Run Version ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {stageBreaks.map((sb, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="p-2.5 font-bold text-cyan-400">{sb.stageName}</td>
                    <td className="p-2.5">
                      <span className="text-slate-200">{sb.sourceCount} records</span>
                      <ArrowRight className="w-3 h-3 inline mx-1 text-slate-500" />
                      <span className="font-bold text-slate-100">{sb.targetCount} records</span>
                    </td>
                    <td className="p-2.5">
                      <span className="text-slate-200">{formatInrCr(sb.sourceAmountInrCr)}</span>
                      <ArrowRight className="w-3 h-3 inline mx-1 text-slate-500" />
                      <span className="font-bold text-slate-100">{formatInrCr(sb.targetAmountInrCr)}</span>
                    </td>
                    <td className="p-2.5 font-bold">
                      <span className={sb.varianceAmountInrCr === 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {sb.varianceAmountInrCr > 0 ? `+${formatInrCr(sb.varianceAmountInrCr)}` : formatInrCr(sb.varianceAmountInrCr)}
                      </span>
                    </td>
                    <td className="p-2.5 font-sans text-xs">
                      <p className="text-slate-300">{sb.reason}</p>
                      {sb.linkedDefectId && (
                        <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono text-[9px] font-bold inline-block mt-1">
                          LINKED DEFECT: {sb.linkedDefectId}
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 font-mono text-[10px] text-cyan-300">{sb.runVersionId || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* POPULATION CONTROL & RUN VERSION MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {/* POPULATION CONTROL CARD */}
        <div className="cros-glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold text-cyan-400 uppercase text-xs flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>POPULATION & EXCEPTION RECONCILIATION</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
              POPULATION GRAIN CONTROL
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">Total Core Banking Source Facilities:</span>
              <span className="font-bold text-slate-100">8 Facilities</span>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">Eligible Priced Population:</span>
              <span className="font-bold text-emerald-400">
                {isFullyReconciled ? '8 Facilities (100% Priced)' : '7 Facilities (1 Omitted)'}
              </span>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">Explicitly Accounted Rejected/Excluded:</span>
              <span className="font-bold text-slate-200">0 Facilities (Zero Unaccounted Dropped)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-[11px] text-slate-300 font-sans">
              Rule: Source Population (8) = Priced Population ({isFullyReconciled ? '8' : '7'}) + Accounted Rejections ({isFullyReconciled ? '0' : '1 Omitted'}).
            </div>
          </div>
        </div>

        {/* RUN VERSION CONTROL CARD */}
        <div className="cros-glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold text-cyan-400 uppercase text-xs flex items-center gap-1.5">
              <GitBranch className="w-4 h-4" />
              <span>RUN-VERSION GOVERNANCE MATRIX</span>
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              isFullyReconciled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}>
              {isFullyReconciled ? 'VERSION LOCKED' : 'STALE RUN DISCREPANCY'}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">FTP Input Stage Run ID:</span>
              <span className="font-bold text-cyan-300">RUN-20260731-01</span>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">FTP Engine Output Run ID:</span>
              <span className="font-bold text-cyan-300">RUN-20260731-01</span>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">Approved Target Output Version:</span>
              <span className="font-bold text-emerald-400">RUN-20260731-01</span>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">Downstream Extract Consumed Version:</span>
              <span className={`font-bold ${isFullyReconciled ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isFullyReconciled ? 'RUN-20260731-01 (LOCKED)' : 'RUN-20260730-01 (STALE DEFECT)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
