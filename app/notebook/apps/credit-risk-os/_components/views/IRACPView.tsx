"use client";

import { useState } from 'react';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { ShieldAlert, AlertTriangle, CheckCircle2, FileText, ArrowRight, Layers, Lock, ShieldCheck } from 'lucide-react';
import { calculateIRACPProvision, classifyIRACPAsset } from '../../_engine/iracp';
import { getIndiaPortfolioTotals } from '../../_data/indiaSyntheticBank';

export default function IRACPView() {
  const { facilities, selectedFacilityId, setSelectedFacilityId } = useCreditRiskOS();
  const totals = getIndiaPortfolioTotals(facilities);

  const activeFacility =
    facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  const iracpResult = calculateIRACPProvision({
    outstandingInrCr: activeFacility.outstandingInrCr,
    realisableSecurityInrCr: activeFacility.realisableSecurityInrCr || (activeFacility.collateral?.valuationInrCr * (1 - activeFacility.collateral?.haircut)) || 0,
    assetQualityStatus: activeFacility.assetQualityStatus || 'Standard',
    exposureCategory: activeFacility.exposureCategory || 'Other-Commercial',
    isSecured: activeFacility.securedFlag ?? true,
  });

  const internalExpectedLossInrCr = (activeFacility.pd * activeFacility.lgd * activeFacility.eadInrCr);

  const formatInrCr = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(val) + ' Cr';

  return (
    <div className="w-full min-h-full p-4 sm:p-6 lg:p-8 space-y-6 select-none text-slate-100 font-sans">
      {/* ─── 01 · HEADER ─── */}
      <div className="border-b border-white/10 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>SUB-TOOL 03 • ASSET QUALITY & RBI IRACP PROVISIONING ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            RBI IRACP ASSET CLASSIFICATION & PROVISIONS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Reserve Bank of India (RBI) Income Recognition, Asset Classification and Provisioning framework for Scheduled Commercial Banks.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase">
            CURRENT RBI SUPERVISORY ENGINE
          </span>
        </div>
      </div>

      {/* ─── 02 · PORTFOLIO ASSET QUALITY KPI ROW ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 text-xs uppercase block">GROSS PORTFOLIO ADVANCES</span>
          <div className="text-2xl font-black text-slate-100 cros-num">
            {formatInrCr(totals.totalOutstandingInrCr)}
          </div>
          <span className="text-[10px] text-slate-400 font-sans">Total Sanctioned Limit: {formatInrCr(totals.totalLimitInrCr)}</span>
        </div>

        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 text-xs uppercase block">GROSS NPA RATIO</span>
          <div className="text-2xl font-black text-amber-400 cros-num">
            {totals.grossNpaRatioPercent.toFixed(2)}%
          </div>
          <span className="text-[10px] text-slate-400 font-sans">Gross NPA Advances: {formatInrCr(totals.grossNpaInrCr)}</span>
        </div>

        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 text-xs uppercase block">IRACP REQUIRED PROVISIONS</span>
          <div className="text-2xl font-black text-cyan-400 cros-num">
            {formatInrCr(totals.totalIracpProvisionInrCr)}
          </div>
          <span className="text-[10px] text-slate-400 font-sans">Mandatory Balance Sheet Reserve</span>
        </div>

        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 text-xs uppercase block">SPECIAL MENTION ACCOUNTS (SMA)</span>
          <div className="text-2xl font-black text-rose-400 cros-num">
            {totals.sma1Count + totals.sma2Count} <span className="text-xs font-normal text-slate-400">Facilities</span>
          </div>
          <span className="text-[10px] text-slate-400 font-sans">SMA-1: {totals.sma1Count} | SMA-2: {totals.sma2Count}</span>
        </div>
      </div>

      {/* ─── 03 · CRITICAL DOMAIN PRINCIPLE CALLOUT ─── */}
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-3 font-mono text-xs text-cyan-300">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold uppercase text-slate-100 block">
            MANDATORY ARCHITECTURAL PRINCIPLE: IRACP PROVISION vs INTERNAL RISK ANALYTICS
          </span>
          <p className="text-slate-300 font-sans leading-relaxed text-xs">
            In Indian Scheduled Commercial Banking, regulatory asset classification and required provisions are determined by <strong>RBI IRACP DPD backstops and realisable security valuation</strong>, NOT by internal Expected Loss formulas (<code className="text-cyan-300">PD × LGD × EAD</code>). Internal risk analytics remain active for underwriting and stress testing, but do not replace supervisory IRACP accounting reserves.
          </p>
        </div>
      </div>

      {/* ─── 04 · FACILITY SELECTION TABLE & DETAILED IRACP INSPECTOR ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FACILITY LIST (LEFT 5 COLS) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider">
            // SELECT LOAN FACILITY TO AUDIT ({facilities.length})
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 no-scrollbar font-mono text-xs">
            {facilities.map((fac) => {
              const isSelected = fac.id === activeFacility.id;
              const isNpa = fac.isNPA || fac.isDefaulted;

              return (
                <button
                  key={fac.id}
                  onClick={() => setSelectedFacilityId(fac.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all cursor-pointer border flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500/50 text-slate-100 shadow-md'
                      : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-cyan-400">{fac.facilityNumber}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        isNpa
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : fac.smaStatus !== 'Standard'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {fac.assetQualityStatus || fac.smaStatus}
                    </span>
                  </div>

                  <div className="font-bold text-slate-200 text-xs truncate">{fac.obligorName}</div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Outstanding: <strong className="text-slate-200">{formatInrCr(fac.outstandingInrCr)}</strong></span>
                    <span>DPD: <strong className="text-cyan-300">{fac.daysPastDue ?? fac.dpd} Days</strong></span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DETAILED IRACP PROVISION INSPECTOR (RIGHT 7 COLS) */}
        <div className="lg:col-span-7 cros-glass-card p-6 rounded-2xl space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">IRACP AUDIT BREAKDOWN</span>
              <h2 className="text-lg font-bold text-slate-100 uppercase">{activeFacility.facilityNumber} • {activeFacility.obligorName}</h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase">
              {iracpResult.assetQualityStatus}
            </span>
          </div>

          {/* CALCULATION MATRIX GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">OUTSTANDING BALANCE</span>
              <div className="text-sm font-bold text-slate-100 cros-num">{formatInrCr(iracpResult.outstandingInrCr)}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">REALISABLE SECURITY</span>
              <div className="text-sm font-bold text-slate-100 cros-num">{formatInrCr(iracpResult.realisableSecurityInrCr)}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">SECURED PORTION</span>
              <div className="text-sm font-bold text-emerald-400 cros-num">{formatInrCr(iracpResult.securedPortionInrCr)}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">UNSECURED PORTION</span>
              <div className="text-sm font-bold text-rose-400 cros-num">{formatInrCr(iracpResult.unsecuredPortionInrCr)}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">APPLICABLE IRACP RATE</span>
              <div className="text-sm font-bold text-cyan-400 cros-num">{iracpResult.effectiveProvisionRatePercent.toFixed(2)}%</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">REQUIRED PROVISION</span>
              <div className="text-sm font-bold text-cyan-300 cros-num">{formatInrCr(iracpResult.totalRequiredProvisionInrCr)}</div>
            </div>
          </div>

          {/* DUAL COMPARISON PANEL: REGULATORY vs INTERNAL RISK */}
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-3 font-sans text-xs">
            <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
              // REGULATORY PROVISION vs INTERNAL EXPECTED LOSS (EL) COMPARISON
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-slate-900 border border-cyan-500/30 space-y-1">
                <span className="font-mono text-[10px] text-slate-400 uppercase block">1. RBI IRACP REGULATORY PROVISION</span>
                <div className="text-base font-bold text-cyan-300 font-mono">{formatInrCr(iracpResult.totalRequiredProvisionInrCr)}</div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Mandatory supervisory provision based on DPD asset classification and collateral security haircut rules.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-white/10 space-y-1">
                <span className="font-mono text-[10px] text-slate-400 uppercase block">2. INTERNAL EXPECTED LOSS (PD × LGD × EAD)</span>
                <div className="text-base font-bold text-slate-300 font-mono">{formatInrCr(internalExpectedLossInrCr)}</div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Internal statistical expected credit loss analytics ({ (activeFacility.pd * 100).toFixed(1) }% PD × { (activeFacility.lgd * 100).toFixed(0) }% LGD × {formatInrCr(activeFacility.eadInrCr || activeFacility.ead)} EAD).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
