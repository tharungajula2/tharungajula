"use client";

import { useState } from 'react';
import { ShieldCheck, Layers, Award, Activity, ArrowRight } from 'lucide-react';

interface FacilityCapitalBreakdown {
  facilityNumber: string;
  obligorName: string;
  exposureClass: string;
  onBalanceDrawnInrCr: number;
  offBalanceUndrawnInrCr: number;
  ccfPercent: number;
  creditEquivalentEadInrCr: number;
  eligibleCrmValueInrCr: number;
  netAdjustedEadInrCr: number;
  appliedRiskWeightPercent: number;
  creditRwaInrCr: number;
  capitalRequirementInrCr: number;
  ratingStatusLabel: string;
}

const SAMPLE_CAPITAL_FACILITIES: FacilityCapitalBreakdown[] = [
  {
    facilityNumber: 'MUM-CRE-8801',
    obligorName: 'Sahyadri Commercial Logistics Group Ltd',
    exposureClass: 'Corporate',
    onBalanceDrawnInrCr: 450.0,
    offBalanceUndrawnInrCr: 800.0,
    ccfPercent: 50.0,
    creditEquivalentEadInrCr: 850.0,
    eligibleCrmValueInrCr: 0.0,
    netAdjustedEadInrCr: 850.0,
    appliedRiskWeightPercent: 100.0,
    creditRwaInrCr: 850.0,
    capitalRequirementInrCr: 76.50,
    ratingStatusLabel: '100% Unrated Corporate RW',
  },
  {
    facilityNumber: 'HYD-INF-9902',
    obligorName: 'Deccan Power & Infrastructure Ltd',
    exposureClass: 'Corporate',
    onBalanceDrawnInrCr: 700.0,
    offBalanceUndrawnInrCr: 0.0,
    ccfPercent: 0.0,
    creditEquivalentEadInrCr: 700.0,
    eligibleCrmValueInrCr: 0.0,
    netAdjustedEadInrCr: 700.0,
    appliedRiskWeightPercent: 100.0,
    creditRwaInrCr: 700.0,
    capitalRequirementInrCr: 63.00,
    ratingStatusLabel: '100% Unrated Corporate RW (Stale Rating Fallback)',
  },
  {
    facilityNumber: 'PUN-MFG-4403',
    obligorName: 'Western Precision Auto Components Ltd',
    exposureClass: 'Corporate',
    onBalanceDrawnInrCr: 200.0,
    offBalanceUndrawnInrCr: 0.0,
    ccfPercent: 0.0,
    creditEquivalentEadInrCr: 200.0,
    eligibleCrmValueInrCr: 0.0,
    netAdjustedEadInrCr: 200.0,
    appliedRiskWeightPercent: 100.0,
    creditRwaInrCr: 200.0,
    capitalRequirementInrCr: 18.00,
    ratingStatusLabel: '100% Unrated Corporate RW',
  },
  {
    facilityNumber: 'GUJ-REN-3305',
    obligorName: 'Sabarmati Clean Energy Ltd',
    exposureClass: 'Corporate',
    onBalanceDrawnInrCr: 345.0,
    offBalanceUndrawnInrCr: 0.0,
    ccfPercent: 0.0,
    creditEquivalentEadInrCr: 345.0,
    eligibleCrmValueInrCr: 0.0,
    netAdjustedEadInrCr: 345.0,
    appliedRiskWeightPercent: 100.0,
    creditRwaInrCr: 345.0,
    capitalRequirementInrCr: 31.05,
    ratingStatusLabel: '100% Unrated Corporate RW',
  },
  {
    facilityNumber: 'DEL-MED-7706',
    obligorName: 'Aethel Healthcare & Hospitals Ltd',
    exposureClass: 'Past Due Asset (Substandard NPA)',
    onBalanceDrawnInrCr: 80.0,
    offBalanceUndrawnInrCr: 0.0,
    ccfPercent: 0.0,
    creditEquivalentEadInrCr: 80.0,
    eligibleCrmValueInrCr: 0.0,
    netAdjustedEadInrCr: 80.0,
    appliedRiskWeightPercent: 150.0,
    creditRwaInrCr: 120.0,
    capitalRequirementInrCr: 10.80,
    ratingStatusLabel: '150% Past Due Asset RW (91 DPD NPA)',
  },
];

export default function CapitalImpactInspector() {
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>(SAMPLE_CAPITAL_FACILITIES[0].facilityNumber);

  const activeFac = SAMPLE_CAPITAL_FACILITIES.find((f) => f.facilityNumber === selectedFacilityId) || SAMPLE_CAPITAL_FACILITIES[0];

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // CREDIT RISK RWA & CAPITAL REQUIREMENT INSPECTOR
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            FACILITY RWA BREAKDOWN & WHOLE-BANK CAPITAL RATIOS
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          CURRENT RBI BASEL III FRAMEWORK
        </span>
      </div>

      {/* WHOLE-BANK CAPITAL ADEQUACY RATIO PANEL */}
      <div className="cros-glass-card p-6 rounded-2xl border border-cyan-500/30 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-slate-100 text-sm uppercase">WHOLE-BANK CAPITAL ADEQUACY RATIOS (INDUS APEX BANK INDIA)</span>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
            SUPERVISORY ADEQUATE (ABOVE CCB REFERENCE)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Whole-Bank Total RWA:</span>
            <span className="text-base font-black text-slate-100">₹20,000.0 Cr</span>
            <span className="text-[10px] text-slate-400 block font-sans">Credit RWA: ₹18,500 Cr | Mkt/Ops: ₹1,500 Cr</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Whole-Bank CET1 Capital:</span>
            <span className="text-base font-black text-cyan-400">₹1,800.0 Cr</span>
            <span className="text-[10px] text-emerald-400 block font-sans">CET1 Ratio: 9.00% (min 8.00% with CCB)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Whole-Bank Total Capital:</span>
            <span className="text-base font-black text-emerald-400">₹2,400.0 Cr</span>
            <span className="text-[10px] text-emerald-400 block font-sans">CRAR: 12.00% (min 11.50% with CCB)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-[10px] text-cyan-400 uppercase block">Case Portfolio RWA:</span>
            <span className="text-base font-black text-cyan-300">₹2,436.0 Cr</span>
            <span className="text-[10px] text-slate-400 block font-sans">Component of Total Credit RWA (13.1%)</span>
          </div>
        </div>
      </div>

      {/* FACILITY SELECTION SELECTOR */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
        {SAMPLE_CAPITAL_FACILITIES.map((fac) => {
          const isSelected = fac.facilityNumber === activeFac.facilityNumber;
          return (
            <button
              key={fac.facilityNumber}
              onClick={() => setSelectedFacilityId(fac.facilityNumber)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                isSelected
                  ? 'bg-cyan-500/15 border-cyan-500/50 text-slate-100 shadow-md font-bold'
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span className="text-[10px] text-cyan-400 uppercase">{fac.facilityNumber}</span>
              <div className="text-xs truncate">{fac.obligorName}</div>
              <div className="text-[10px] text-slate-400">EAD: ₹{fac.netAdjustedEadInrCr.toFixed(1)} Cr • {fac.appliedRiskWeightPercent}% RW</div>
            </button>
          );
        })}
      </div>

      {/* FACILITY CAPITAL BREAKDOWN CARD */}
      <div className="cros-glass-card p-6 rounded-2xl space-y-6 font-mono text-xs">
        {/* FACILITY HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold">
                {activeFac.facilityNumber}
              </span>
              <h3 className="text-lg font-black text-slate-100 uppercase">{activeFac.obligorName}</h3>
            </div>
            <span className="text-xs text-slate-400 font-sans block mt-1">Class: {activeFac.exposureClass} • {activeFac.ratingStatusLabel}</span>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">CREDIT RWA:</span>
              <span className="text-base font-bold text-cyan-300">₹{activeFac.creditRwaInrCr.toFixed(1)} Cr</span>
            </div>
            <div>
              <span className="text-[10px] text-emerald-400 uppercase block">CAPITAL REQ (9.00%):</span>
              <span className="text-base font-bold text-emerald-400">₹{activeFac.capitalRequirementInrCr.toFixed(2)} Cr</span>
            </div>
          </div>
        </div>

        {/* CALCULATION STEPS FLOW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* STEP 1: EXPOSURE AT DEFAULT (EAD) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
            <span className="text-[10px] text-cyan-400 font-bold uppercase block">// STEP 1: DERIVE EAD (CCF CONVERSION)</span>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">On-Balance Drawn:</span>
                <span className="text-slate-200">₹{activeFac.onBalanceDrawnInrCr.toFixed(1)} Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Off-Balance Commitment:</span>
                <span className="text-slate-200">₹{activeFac.offBalanceUndrawnInrCr.toFixed(1)} Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">CCF Factor:</span>
                <span className="text-cyan-300 font-bold">{activeFac.ccfPercent}%</span>
              </div>
              <div className="pt-2 border-t border-white/5 flex justify-between font-bold text-slate-100">
                <span>Credit Equivalent EAD:</span>
                <span className="text-cyan-400">₹{activeFac.creditEquivalentEadInrCr.toFixed(1)} Cr</span>
              </div>
            </div>
          </div>

          {/* STEP 2: CRM COLLATERAL ADJUSTMENT */}
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
            <span className="text-[10px] text-cyan-400 font-bold uppercase block">// STEP 2: CRM HAIRCUT ADJUSTMENT</span>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Gross EAD:</span>
                <span className="text-slate-200">₹{activeFac.creditEquivalentEadInrCr.toFixed(1)} Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Eligible Collateral Deduction:</span>
                <span className="text-emerald-400">-₹{activeFac.eligibleCrmValueInrCr.toFixed(1)} Cr</span>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between font-bold text-slate-100">
                <span>Net Adjusted EAD:</span>
                <span className="text-slate-100">₹{activeFac.netAdjustedEadInrCr.toFixed(1)} Cr</span>
              </div>
            </div>
          </div>

          {/* STEP 3: RWA & CAPITAL REQUIREMENT */}
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
            <span className="text-[10px] text-cyan-400 font-bold uppercase block">// STEP 3: RISK WEIGHT & RWA</span>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Applicable Risk Weight:</span>
                <span className="text-cyan-300 font-bold">{activeFac.appliedRiskWeightPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Credit RWA Amount:</span>
                <span className="text-cyan-400 font-bold">₹{activeFac.creditRwaInrCr.toFixed(1)} Cr</span>
              </div>
              <div className="pt-2 border-t border-white/5 flex justify-between font-bold text-emerald-300 text-sm">
                <span>Minimum Capital (9.00%):</span>
                <span>₹{activeFac.capitalRequirementInrCr.toFixed(2)} Cr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
