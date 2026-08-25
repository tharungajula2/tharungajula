"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { INDUS_APEX_BANK_ENTITY, getIndiaPortfolioTotals } from '../../_data/indiaSyntheticBank';
import { calculateRBIRWA, calculateBankCapitalRatios } from '../../_engine/rbiCapital';
import { RBI_BASEL_III_CAPITAL_RULES } from '../../_domain/india/truthModel';
import { Layers, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function CapitalView() {
  const { facilities } = useCreditRiskOS();
  const totals = getIndiaPortfolioTotals(facilities);

  const formatInrCr = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 1 }).format(val) + ' Cr';

  const capitalRatios = calculateBankCapitalRatios(
    INDUS_APEX_BANK_ENTITY.wholeBankCet1CapitalInrCr,
    INDUS_APEX_BANK_ENTITY.tier1CapitalInrCr,
    INDUS_APEX_BANK_ENTITY.wholeBankCet1CapitalInrCr + 600, // Total Capital ₹4,800 Cr Tier 1 + ₹600 Cr Tier 2
    INDUS_APEX_BANK_ENTITY.wholeBankTotalRwaInrCr
  );

  return (
    <div className="w-full min-h-full p-4 sm:p-6 lg:p-8 space-y-6 select-none text-slate-100 font-sans">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
            <Layers className="w-4 h-4" />
            <span>SUB-TOOL 04 • RBI BASEL III CAPITAL ADEQUACY & CRAR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            RBI BASEL III CAPITAL FRAMEWORK
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Prudential Capital Adequacy, Risk-Weighted Assets (RWA), CET1 Buffer, and Capital to Risk-Weighted Assets Ratio (CRAR) for Scheduled Commercial Banks in India.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-xs font-bold uppercase">
          CURRENT RBI BASEL III STANDARD
        </div>
      </div>

      {/* SUPERVISORY CAPITAL THRESHOLDS BANNER */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 font-mono text-xs text-slate-300 flex flex-wrap items-center justify-between gap-3">
        <div>MIN CET1: <strong className="text-cyan-400">5.50%</strong></div>
        <div className="text-slate-600">|</div>
        <div>CCB BUFFER: <strong className="text-cyan-400">2.50%</strong></div>
        <div className="text-slate-600">|</div>
        <div>CET1 + CCB: <strong className="text-cyan-300">8.00%</strong></div>
        <div className="text-slate-600">|</div>
        <div>MIN CRAR: <strong className="text-cyan-400">9.00%</strong></div>
        <div className="text-slate-600">|</div>
        <div>TOTAL CRAR + CCB: <strong className="text-cyan-300">11.50%</strong></div>
        <div className="text-slate-600">|</div>
        <div className="text-emerald-400 font-bold">WHOLE-BANK CRAR: {capitalRatios.crarPercent.toFixed(2)}%</div>
      </div>

      {/* BANK CAPITAL RATIO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 text-xs uppercase block">WHOLE-BANK CET1 CAPITAL</span>
          <div className="text-2xl font-black text-slate-100 cros-num">
            {formatInrCr(INDUS_APEX_BANK_ENTITY.wholeBankCet1CapitalInrCr)}
          </div>
          <span className="text-[10px] text-slate-400 font-sans">Common Equity Tier 1 Capital</span>
        </div>

        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 text-xs uppercase block">WHOLE-BANK TOTAL RWA</span>
          <div className="text-2xl font-black text-cyan-400 cros-num">
            {formatInrCr(INDUS_APEX_BANK_ENTITY.wholeBankTotalRwaInrCr)}
          </div>
          <span className="text-[10px] text-slate-400 font-sans">Credit, Market & Operational RWA</span>
        </div>

        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 text-xs uppercase block">CET1 CAPITAL RATIO</span>
          <div className="text-2xl font-black text-emerald-400 cros-num">
            {capitalRatios.cet1RatioPercent.toFixed(2)}%
          </div>
          <span className="text-[10px] text-slate-400 font-sans">+{capitalRatios.cet1BufferPercent.toFixed(2)} pp vs 8.00% CET1+CCB reference</span>
        </div>

        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 text-xs uppercase block">TOTAL CAPITAL / CRAR</span>
          <div className="text-2xl font-black text-emerald-300 cros-num">
            {capitalRatios.crarPercent.toFixed(2)}%
          </div>
          <span className="text-[10px] text-slate-400 font-sans">+{capitalRatios.crarBufferPercent.toFixed(2)} pp vs 11.50% CRAR+CCB reference</span>
        </div>
      </div>

      {/* PORTFOLIO CREDIT RISK RWA AUDIT */}
      <div className="cros-glass-card p-6 rounded-2xl space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">// RBI STANDARDISED CREDIT RISK RWA AUDIT</span>
            <h2 className="text-lg font-bold text-slate-100 uppercase">PORTFOLIO CREDIT RWA: {formatInrCr(totals.totalRwaInrCr)}</h2>
          </div>
          <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase">
            9.0% MINIMUM CRAR REQUIREMENT
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1 font-mono">
            <span className="text-[10px] text-slate-400 uppercase block">PORTFOLIO GROSS EAD</span>
            <div className="text-xl font-bold text-slate-100 cros-num">{formatInrCr(totals.totalEadInrCr)}</div>
            <p className="text-[11px] text-slate-400 font-sans">Sanctioned limit drawdown & CCF commitments.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1 font-mono">
            <span className="text-[10px] text-slate-400 uppercase block">PORTFOLIO CREDIT RWA</span>
            <div className="text-xl font-bold text-cyan-400 cros-num">{formatInrCr(totals.totalRwaInrCr)}</div>
            <p className="text-[11px] text-slate-400 font-sans">Weighted by RBI asset class risk weights.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1 font-mono">
            <span className="text-[10px] text-slate-400 uppercase block">ATTRIBUTABLE CAPITAL REQ (9%)</span>
            <div className="text-xl font-bold text-cyan-300 cros-num">{formatInrCr(totals.attributableCapitalReqInrCr)}</div>
            <p className="text-[11px] text-slate-400 font-sans">Minimum Pillar 1 capital required to back portfolio.</p>
          </div>
        </div>

        {/* REGULATORY STATUS NOTE */}
        <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1 text-slate-300 text-xs font-sans">
          <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">// BASEL FINAL REFORMS READINESS NOTE</span>
          <p className="leading-relaxed">
            Under current RBI framework, the bank operates under Standardised CRAR norms. Proposed international Basel finalisation reforms (such as the 72.5% Standardised output floor on AIRB models) are classified as <strong>FUTURE_PROPOSED_REGULATORY_CHANGE</strong> and do not contaminate live bank capital metrics.
          </p>
        </div>
      </div>
    </div>
  );
}
