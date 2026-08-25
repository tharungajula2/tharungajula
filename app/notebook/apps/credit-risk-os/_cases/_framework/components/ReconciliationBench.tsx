"use client";

import { ReconciliationSummary, CaseDefect } from '../types';
import { CheckCircle2, AlertTriangle, ShieldAlert, GitBranch, Layers, ArrowRight } from 'lucide-react';

interface Props {
  reconciliationSummary: ReconciliationSummary;
  defects: CaseDefect[];
  caseId?: string;
}

export default function ReconciliationBench({ reconciliationSummary, defects, caseId = 'CASE-001' }: Props) {
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

  const isCase01 = caseId === 'CASE-001' || caseId === 'CASE-2026-01';
  const isCase02 = caseId === 'CASE-002' || caseId === 'CASE-2026-02';
  const isCase03 = caseId === 'CASE-003' || caseId === 'CASE-2026-03';

  // Case 01 specific stage breaks
  const case01StageBreaks = [
    {
      stageName: 'ETL Mart Ingestion & Deduplication',
      sourceCount: 8,
      targetCount: isFullyReconciled ? 8 : 9,
      sourceAmountInrCr: 2645.0,
      targetAmountInrCr: isFullyReconciled ? 2645.0 : 3095.0,
      varianceAmountInrCr: isFullyReconciled ? 0.0 : 450.0,
      reason: isFullyReconciled
        ? 'Composite key join ON obligor_id AND facility_id enforced.'
        : 'Missing composite join key generated 1 duplicate row for MUM-CRE-8801 (+₹450 Cr).',
      linkedDefectId: 'DEF-AQ-002',
    },
    {
      stageName: 'IRACP DPD Boundary Classification',
      sourceCount: 8,
      targetCount: 8,
      sourceAmountInrCr: 80.0,
      targetAmountInrCr: isFullyReconciled ? 80.0 : 280.0,
      varianceAmountInrCr: isFullyReconciled ? 0.0 : 200.0,
      reason: isFullyReconciled
        ? 'Boundary operator DPD > 90 enforced for Substandard NPA.'
        : 'Legacy DPD >= 90 operator prematurely classified 90 DPD account CHN-RES-5507 as Substandard NPA (+₹200 Cr false NPA).',
      linkedDefectId: 'DEF-AQ-001',
    },
    {
      stageName: 'CBS EOD Payment Clearing Synchronization',
      sourceCount: 8,
      targetCount: 8,
      sourceAmountInrCr: 300.0,
      targetAmountInrCr: 300.0,
      varianceAmountInrCr: isFullyReconciled ? 0.0 : 0.0,
      reason: isFullyReconciled
        ? 'ETL ingestion trigger rescheduled to 23:59:59 post EOD payment clearing.'
        : 'Ingestion cutoff at 18:00 prior to clearing captured stale DPD 28 (SMA-0) for PUN-MFG-4403 instead of actual DPD 42 (SMA-1).',
      linkedDefectId: 'DEF-AQ-003',
    },
    {
      stageName: 'IRACP Provision Calculation vs Finance GL',
      sourceCount: 8,
      targetCount: 8,
      sourceAmountInrCr: 74.8,
      targetAmountInrCr: isFullyReconciled ? 74.8 : 56.0,
      varianceAmountInrCr: isFullyReconciled ? 0.0 : 18.8,
      reason: isFullyReconciled
        ? 'Secured vs unsecured provision rate calculation corrected.'
        : 'Uninitialized secured flag applied 15% rate to unsecured facility DEL-MED-7706 instead of 25% (-₹8.0 Cr) plus classification defects (-₹10.8 Cr). Total deficit: ₹18.8 Cr.',
      linkedDefectId: 'DEF-AQ-004',
    },
  ];

  const stageBreaks = isCase01
    ? case01StageBreaks
    : isFullyReconciled
    ? reconciliationSummary.afterFix.stageBreaks || []
    : reconciliationSummary.beforeFix.stageBreaks || [];

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            {isCase01
              ? '// ASSET QUALITY & FINANCE GL PROVISION RECONCILIATION BENCH'
              : isCase03
              ? '// BASEL III CAPITAL & RWA RECONCILIATION BENCH'
              : '// MULTI-STAGE CONTROL & RECONCILIATION BENCH'}
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            {isCase01
              ? 'RISK ASSET QUALITY / PROVISION ENGINE vs FINANCE GL PROVISION RESERVE'
              : isCase03
              ? 'EXPOSURE AT DEFAULT, CREDIT EQUIVALENT EXPOSURE & CAPITAL ADEQUACY RECONCILIATION'
              : 'MULTI-STAGE BALANCE, RECORD COUNT & RUN VERSION RECONCILIATION'}
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          PERIOD AS AT: {reconciliationSummary.asOfDate}
        </span>
      </div>

      {/* WARNING BANNER FOR UNRESOLVED DEFECTS */}
      {!isFullyReconciled && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-rose-400 text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>
              {isCase01
                ? 'FINANCE GL PROVISION RESERVE DEFICIT ALERT — RECONCILIATION VARIANCE DETECTED'
                : isCase03
                ? 'CAPITAL & RWA RECONCILIATION ALERT — RWA DISCREPANCY DETECTED'
                : 'COMPENSATING ERROR WARNING — NETTING DOES NOT EQUAL RECONCILIATION'}
            </span>
          </div>
          <p className="font-sans text-xs text-slate-200">
            {isCase01
              ? 'Risk Asset Quality Engine computes mandatory IRACP provisions of ₹74.8 Cr, but Finance General Ledger currently reflects ₹56.0 Cr, creating an un-remediated Reserve Deficit of ₹18.8 Cr across 4 stage defects.'
              : isCase03
              ? 'Target Credit RWA of ₹2,436.0 Cr requires ₹219.24 Cr capital at 9% CRAR. Un-remediated ratings and CCF defects distort capital adequacy reserves.'
              : `Netting compensating errors must never be allowed to hide underlying process breaks! While the Net Source → Output difference appears as +₹355.0 Cr, multiple independent control failures accumulate a Gross Absolute Reconciliation Break of ${formatInrCr(currentGrossAbsolute)}.`}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-rose-300">
            {isCase01 ? (
              <>
                <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30">Target Risk Provision: ₹74.8 Cr</span>
                <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30">Finance GL Reserve: ₹56.0 Cr</span>
                <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30 font-bold text-rose-200">Reserve Deficit: ₹18.8 Cr</span>
              </>
            ) : isCase03 ? (
              <>
                <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30">Gross Commitments: ₹3,445.0 Cr</span>
                <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30">Credit Equivalent Exposure: ₹3,045.0 Cr</span>
                <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30 font-bold text-rose-200">Target Credit RWA: ₹2,436.0 Cr</span>
              </>
            ) : (
              <>
                <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30">Net Difference: +₹355.0 Cr</span>
                <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30 font-bold text-rose-200">Gross Absolute Break: {formatInrCr(currentGrossAbsolute)}</span>
                <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30">Open Defective Stages: 3 Breaks</span>
              </>
            )}
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
                ? isCase01
                  ? '100% Risk Engine vs Finance GL provision reconciliation cleared with zero variance (₹74.8 Cr reserve).'
                  : isCase03
                  ? '100% Basel III Standardised Credit RWA and Capital requirement reconciled (₹2,436.0 Cr RWA).'
                  : '100% Multi-stage balance, record count, rejected population, and run version locked with zero variance.'
                : isCase01
                ? '4 active defects creating a ₹18.8 Cr GL provision deficit and 1 duplicate facility row.'
                : `${openDefects.length} active defects creating stage breaks across ETL pipelines.`}
            </span>
          </div>
        </div>

        <div className="text-right flex items-center gap-4">
          <div>
            <span className="text-[9px] uppercase text-slate-400 block">{isCase01 ? 'PROVISION VARIANCE:' : 'NET VARIANCE:'}</span>
            <span className={`text-sm font-bold ${isFullyReconciled ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatInrCr(currentVariance)}
            </span>
          </div>
          {!isCase01 && !isCase03 && (
            <div>
              <span className="text-[9px] uppercase text-rose-400 block">GROSS ABSOLUTE BREAK:</span>
              <span className="text-base font-black text-rose-300">{formatInrCr(currentGrossAbsolute)}</span>
            </div>
          )}
        </div>
      </div>

      {/* INDEPENDENT STAGE BREAKS TABLE */}
      <div className="cros-glass-card p-6 rounded-2xl space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-bold text-slate-100 uppercase tracking-wider">// STAGE BREAK ANALYSIS ({stageBreaks.length} STAGES)</span>
          <span className="text-cyan-400 font-bold text-[10px] uppercase">POPULATION & MONETARY DISCREPANCY AUDIT</span>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase">
                <th className="p-2.5">Stage Transition</th>
                <th className="p-2.5">Source Count → Target Count</th>
                <th className="p-2.5">Source Amount → Target Amount</th>
                <th className="p-2.5">Stage Variance</th>
                <th className="p-2.5">Root Cause & Defect Linkage</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CASE-SPECIFIC CONTROL MATRICES */}
      {isCase01 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* RISK VS FINANCE PROVISION RECONCILIATION */}
          <div className="cros-glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-bold text-cyan-400 uppercase text-xs flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>RISK VS FINANCE PROVISION MATRIX</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                GL ACCOUNT 2401
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">Risk Analytics Engine Target Reserve:</span>
                <span className="font-bold text-slate-100">₹74.8 Cr</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">Finance GL Current Booked Reserve:</span>
                <span className={`font-bold ${isFullyReconciled ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isFullyReconciled ? '₹74.8 Cr' : '₹56.0 Cr'}
                </span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">Net Unexplained GL Deficit:</span>
                <span className={`font-bold ${isFullyReconciled ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isFullyReconciled ? '₹0.0 Cr' : '₹18.8 Cr'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-[11px] text-slate-300 font-sans">
                Control Rule: Finance GL Reserve (₹74.8 Cr) = Standard Provisions (₹12.3 Cr) + Substandard NPA Provision (₹20.0 Cr) + Doubtful/Loss Provisions (₹42.5 Cr).
              </div>
            </div>
          </div>

          {/* FACILITY POPULATION GRAIN CONTROL */}
          <div className="cros-glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-bold text-cyan-400 uppercase text-xs flex items-center gap-1.5">
                <GitBranch className="w-4 h-4" />
                <span>POPULATION GRAIN & DEDUPLICATION CONTROL</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                isFullyReconciled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}>
                {isFullyReconciled ? 'POPULATION LOCKED' : 'DUPLICATE ROW ALERT'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">CBS Source Credit Facilities:</span>
                <span className="font-bold text-cyan-300">8 Facilities (₹2,645.0 Cr)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">Risk Mart Ingested Records:</span>
                <span className={`font-bold ${isFullyReconciled ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isFullyReconciled ? '8 Facilities (₹2,645.0 Cr)' : '9 Records (₹3,095.0 Cr)'}
                </span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">Join Deduplication Status:</span>
                <span className={`font-bold ${isFullyReconciled ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isFullyReconciled ? 'COMPOSITE KEY ENFORCED (0 DUPLICATES)' : '1 DUPLICATE ROW (MUM-CRE-8801)'}
                </span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">Substandard NPA Facility Count:</span>
                <span className="font-bold text-slate-100">
                  {isFullyReconciled ? '1 NPA (DEL-MED-7706)' : '2 NPA (Includes False 90 DPD)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : isCase02 ? (
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
      ) : (
        /* CASE-003 CAPITAL / RWA CONTROL MATRIX */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="cros-glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-bold text-cyan-400 uppercase text-xs flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>EXPOSURE & CEE DECOMPOSITION</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                BASEL III SA
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">Gross Outstanding (Drawn):</span>
                <span className="font-bold text-slate-100">₹2,645.0 Cr</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">Undrawn Commitments:</span>
                <span className="font-bold text-cyan-300">₹800.0 Cr</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">Credit Conversion Factor (CCF 50%):</span>
                <span className="font-bold text-amber-400">₹400.0 Cr CEE</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">Total Credit Equivalent Exposure (CEE):</span>
                <span className="font-bold text-emerald-400">₹3,045.0 Cr</span>
              </div>
            </div>
          </div>

          <div className="cros-glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-bold text-cyan-400 uppercase text-xs flex items-center gap-1.5">
                <GitBranch className="w-4 h-4" />
                <span>RWA & CAPITAL REQUIREMENT</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                MINIMUM CRAR 9.00%
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">Target Credit RWA:</span>
                <span className="font-bold text-slate-100">₹2,436.0 Cr</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">Average Portfolio Risk Weight:</span>
                <span className="font-bold text-cyan-300">80.00%</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-white/5">
                <span className="text-slate-400">Attributable Capital Req @ 9%:</span>
                <span className="font-bold text-emerald-400">₹219.24 Cr</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-[11px] text-slate-300 font-sans">
                Rule: Capital Requirement (₹219.24 Cr) = Target RWA (₹2,436.0 Cr) × 9.00% Minimum CRAR.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
