"use client";

import { useState } from 'react';
import { Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FacilityFtpBreakdown {
  facilityNumber: string;
  obligorName: string;
  productName: string;
  interestType: 'FIXED' | 'FLOATING';
  outstandingInrCr: number;
  tenorMonths: number;
  tenorTypeLabel: string;
  baseCurveRatePercent: number;
  liquidityPremiumPercent: number;
  optionalityAdjPercent: number;
  finalFtpRatePercent: number;
  customerLendingRatePercent: number;
  commercialMarginPercent: number;
  annualFtpChargeInrCr: number;
}

const SAMPLE_FACILITIES: FacilityFtpBreakdown[] = [
  {
    facilityNumber: 'MUM-CRE-8801',
    obligorName: 'Sahyadri Commercial Logistics Group Ltd',
    productName: 'Commercial Real Estate Loan (PROD-CRE-01)',
    interestType: 'FIXED',
    outstandingInrCr: 450.0,
    tenorMonths: 36,
    tenorTypeLabel: '36-Month Matched Maturity Tenor',
    baseCurveRatePercent: 7.80,
    liquidityPremiumPercent: 1.00,
    optionalityAdjPercent: 0.00,
    finalFtpRatePercent: 8.80,
    customerLendingRatePercent: 10.50,
    commercialMarginPercent: 1.70,
    annualFtpChargeInrCr: 39.60,
  },
  {
    facilityNumber: 'PUN-MFG-4403',
    obligorName: 'Western Precision Auto Components Ltd',
    productName: 'Manufacturing Term Loan (PROD-MFG-03)',
    interestType: 'FLOATING',
    outstandingInrCr: 200.0,
    tenorMonths: 3,
    tenorTypeLabel: '3-Month Next Repricing Tenor',
    baseCurveRatePercent: 6.90,
    liquidityPremiumPercent: 0.80,
    optionalityAdjPercent: 0.00,
    finalFtpRatePercent: 7.70,
    customerLendingRatePercent: 9.85,
    commercialMarginPercent: 2.15,
    annualFtpChargeInrCr: 15.40,
  },
  {
    facilityNumber: 'HYD-INF-9902',
    obligorName: 'Deccan Power & Infrastructure Ltd',
    productName: 'Infrastructure Financing (PROD-INF-02)',
    interestType: 'FIXED',
    outstandingInrCr: 700.0,
    tenorMonths: 60,
    tenorTypeLabel: '60-Month Matched Maturity Tenor',
    baseCurveRatePercent: 8.10,
    liquidityPremiumPercent: 0.50,
    optionalityAdjPercent: 0.20,
    finalFtpRatePercent: 8.80,
    customerLendingRatePercent: 11.20,
    commercialMarginPercent: 2.40,
    annualFtpChargeInrCr: 61.60,
  },
  {
    facilityNumber: 'GUJ-REN-3305',
    obligorName: 'Sabarmati Clean Energy Ltd',
    productName: 'Renewable Power Project (PROD-REN-05)',
    interestType: 'FLOATING',
    outstandingInrCr: 345.0,
    tenorMonths: 6,
    tenorTypeLabel: '6-Month Next Repricing Tenor',
    baseCurveRatePercent: 7.10,
    liquidityPremiumPercent: 0.85,
    optionalityAdjPercent: 0.00,
    finalFtpRatePercent: 7.95,
    customerLendingRatePercent: 10.20,
    commercialMarginPercent: 2.25,
    annualFtpChargeInrCr: 27.43,
  },
];

export default function FtpRateInspector() {
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>(SAMPLE_FACILITIES[0].facilityNumber);

  const activeFac = SAMPLE_FACILITIES.find((f) => f.facilityNumber === selectedFacilityId) || SAMPLE_FACILITIES[0];

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // INTERNAL TRANSFER PRICING VS CUSTOMER LENDING RATE INSPECTOR
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            FTP RATE COMPONENT BREAKDOWN & COMMERCIAL MARGIN SEPARATION
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          BANK POLICY SIMULATION METHODOLOGY
        </span>
      </div>

      {/* FACILITY SELECTION SELECTOR */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
        {SAMPLE_FACILITIES.map((fac) => {
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
              <div className="text-[10px] text-slate-400">₹{fac.outstandingInrCr.toFixed(1)} Cr • {fac.interestType}</div>
            </button>
          );
        })}
      </div>

      {/* INSPECTOR PANEL */}
      <div className="cros-glass-card p-6 rounded-2xl space-y-6 font-mono text-xs">
        {/* FACILITY TITLE & METADATA */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold">
                {activeFac.facilityNumber}
              </span>
              <h3 className="text-lg font-black text-slate-100 uppercase">{activeFac.obligorName}</h3>
            </div>
            <span className="text-xs text-slate-400 font-sans block mt-1">{activeFac.productName} • {activeFac.tenorTypeLabel}</span>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">OUTSTANDING BAL:</span>
              <span className="text-base font-bold text-slate-100">₹{activeFac.outstandingInrCr.toFixed(1)} Cr</span>
            </div>
            <div>
              <span className="text-[10px] text-cyan-400 uppercase block">ANNUAL FTP CHARGE:</span>
              <span className="text-base font-bold text-cyan-300">₹{activeFac.annualFtpChargeInrCr.toFixed(2)} Cr</span>
            </div>
          </div>
        </div>

        {/* COMPARISON CARDS: TREASURY INTERNAL FTP vs CUSTOMER PRICING */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TREASURY INTERNAL FTP CARD */}
          <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-cyan-400 uppercase text-xs flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>TREASURY INTERNAL TRANSFER PRICE (FTP)</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] font-bold">
                INTERNAL COST OF FUNDS
              </span>
            </div>

            {/* STACKED RATE COMPONENTS */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-white/5">
                <span className="text-slate-400">1. Base Funding Curve Rate ({activeFac.tenorMonths}M):</span>
                <span className="font-bold text-slate-200">{activeFac.baseCurveRatePercent.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-white/5">
                <span className="text-slate-400">2. Liquidity / Tenor Premium Add-On:</span>
                <span className="font-bold text-slate-200">+{activeFac.liquidityPremiumPercent.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-white/5">
                <span className="text-slate-400">3. Optionality / Product Adjustment:</span>
                <span className="font-bold text-slate-200">+{activeFac.optionalityAdjPercent.toFixed(2)}%</span>
              </div>

              <div className="flex justify-between p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold text-sm">
                <span>TOTAL INTERNAL FTP RATE:</span>
                <span>{activeFac.finalFtpRatePercent.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* COMMERCIAL CUSTOMER LENDING CARD */}
          <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-emerald-400 uppercase text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>COMMERCIAL CUSTOMER LENDING RATE</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-bold">
                COMMERCIAL YIELD
              </span>
            </div>

            {/* MARGIN DERIVATION */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-white/5">
                <span className="text-slate-400">Total Customer Lending Rate (Yield):</span>
                <span className="font-bold text-emerald-400">{activeFac.customerLendingRatePercent.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-white/5">
                <span className="text-slate-400">Less Internal FTP Rate (Treasury Charge):</span>
                <span className="font-bold text-rose-400">-{activeFac.finalFtpRatePercent.toFixed(2)}%</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-white/5 text-[11px] text-slate-400 font-sans">
                Notice: Customer Rate is charged to borrower. FTP Rate is credited to Treasury. The difference is the Commercial Margin owned by the Business Unit.
              </div>

              <div className="flex justify-between p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold text-sm">
                <span>BUSINESS UNIT COMMERCIAL MARGIN:</span>
                <span>+{activeFac.commercialMarginPercent.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
