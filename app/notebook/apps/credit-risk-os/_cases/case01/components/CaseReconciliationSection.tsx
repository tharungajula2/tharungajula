"use client";

import { RECONCILIATION_SUMMARY, SeededDefect } from '../case01Data';
import { ArrowRight, CheckCircle2, AlertTriangle, FileSpreadsheet, ShieldCheck } from 'lucide-react';

interface Props {
  defects: SeededDefect[];
}

export default function CaseReconciliationSection({ defects }: Props) {
  const openDefects = defects.filter((d) => d.status === 'Open');
  const isFullyReconciled = openDefects.length === 0;

  const formatInrCr = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 1 }).format(val) + ' Cr';

  const currentVariance = isFullyReconciled
    ? RECONCILIATION_SUMMARY.afterFix.unexplainedVarianceInrCr
    : RECONCILIATION_SUMMARY.beforeFix.unexplainedVarianceInrCr;

  const currentStatus = isFullyReconciled
    ? RECONCILIATION_SUMMARY.afterFix.reconciliationStatus
    : RECONCILIATION_SUMMARY.beforeFix.reconciliationStatus;

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // END-TO-END RISK-TO-FINANCE RECONCILIATION BENCH
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            DYNAMIC RISK-TO-FINANCE RECONCILIATION
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          PERIOD AS AT: {RECONCILIATION_SUMMARY.asOfDate}
        </span>
      </div>

      {/* RECONCILIATION STATUS BANNER */}
      <div className={`p-4 rounded-xl border flex items-center justify-between font-mono text-xs ${
        isFullyReconciled
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
      }`}>
        <div className="flex items-center gap-2">
          {isFullyReconciled ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
          <div>
            <span className="font-bold block">STATUS: {currentStatus}</span>
            <span className="text-[11px] font-sans text-slate-300">
              {isFullyReconciled
                ? 'All defects remediated. 100% Risk-to-Finance provisions reconciled with zero variance.'
                : `${openDefects.length} open defects creating ₹18.8 Cr provision GL deficit.`}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase text-slate-400 block">NET VARIANCE:</span>
          <span className="text-lg font-black">{formatInrCr(currentVariance)}</span>
        </div>
      </div>

      {/* COMPARISON CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {/* BEFORE-FIX CARD */}
        <div className={`cros-glass-card p-6 rounded-2xl border transition-all space-y-4 ${
          !isFullyReconciled ? 'border-rose-500/40 bg-rose-500/5 shadow-lg' : 'border-white/10 opacity-60'
        }`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold text-rose-400 uppercase text-sm">// BEFORE FIX (UN-REMEDIATED STATE)</span>
            <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
              DEFICIT ALERT
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">Total Portfolio Facilities:</span>
              <span className="font-bold text-slate-100">{RECONCILIATION_SUMMARY.beforeFix.facilityCount} (Includes 1 Duplicate)</span>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">Gross Portfolio Outstanding:</span>
              <span className="font-bold text-rose-400">{formatInrCr(RECONCILIATION_SUMMARY.beforeFix.grossOutstandingInrCr)}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">Gross NPA Exposure:</span>
              <span className="font-bold text-rose-400">{formatInrCr(RECONCILIATION_SUMMARY.beforeFix.npaOutstandingInrCr)}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">Required Provision Reserve:</span>
              <span className="font-bold text-slate-100">{formatInrCr(RECONCILIATION_SUMMARY.beforeFix.requiredProvisionInrCr)}</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold text-sm">
              <span>UNEXPLAINED VARIANCE:</span>
              <span>{formatInrCr(RECONCILIATION_SUMMARY.beforeFix.unexplainedVarianceInrCr)}</span>
            </div>
          </div>
        </div>

        {/* AFTER-FIX CARD */}
        <div className={`cros-glass-card p-6 rounded-2xl border transition-all space-y-4 ${
          isFullyReconciled ? 'border-emerald-500/40 bg-emerald-500/5 shadow-lg' : 'border-white/10 opacity-60'
        }`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold text-emerald-400 uppercase text-sm">// AFTER FIX (REMEDIATED STATE)</span>
            <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
              RECONCILED
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">Total Portfolio Facilities:</span>
              <span className="font-bold text-slate-100">{RECONCILIATION_SUMMARY.afterFix.facilityCount} (Deduplicated)</span>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">Gross Portfolio Outstanding:</span>
              <span className="font-bold text-emerald-400">{formatInrCr(RECONCILIATION_SUMMARY.afterFix.grossOutstandingInrCr)}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">Gross NPA Exposure:</span>
              <span className="font-bold text-emerald-400">{formatInrCr(RECONCILIATION_SUMMARY.afterFix.npaOutstandingInrCr)}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
              <span className="text-slate-400">Required Provision Reserve:</span>
              <span className="font-bold text-slate-100">{formatInrCr(RECONCILIATION_SUMMARY.afterFix.requiredProvisionInrCr)}</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-sm">
              <span>UNEXPLAINED VARIANCE:</span>
              <span>{formatInrCr(RECONCILIATION_SUMMARY.afterFix.unexplainedVarianceInrCr)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
