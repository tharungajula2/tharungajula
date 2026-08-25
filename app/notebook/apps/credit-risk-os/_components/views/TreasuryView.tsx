"use client";

import { useState } from 'react';
import { calculateLCR, calculateNSFR, calculateFTPRate } from '../../_engine/treasury';
import { LineChart, Landmark, ShieldCheck, Layers, Percent } from 'lucide-react';

export default function TreasuryView() {
  const [baseRate, setBaseRate] = useState(6.50); // Repo / Base rate 6.50%
  const [liquidityPremium, setLiquidityPremium] = useState(0.80);
  const [creditSpread, setCreditSpread] = useState(1.20);
  const [businessMargin, setBusinessMargin] = useState(0.50);

  // HQLA ₹4,500 Cr / Net Outflows ₹3,800 Cr = 118.42% LCR
  const lcrResult = calculateLCR({ hqlaInrCr: 4500, totalNetOutflows30DaysInrCr: 3800 });
  // ASF ₹28,500 Cr / RSF ₹26,200 Cr = 108.78% NSFR
  const nsfrResult = calculateNSFR({ availableStableFundingInrCr: 28500, requiredStableFundingInrCr: 26200 });

  const ftpResult = calculateFTPRate({
    baseRatePercent: baseRate,
    liquidityPremiumPercent: liquidityPremium,
    creditRiskPremiumPercent: creditSpread,
  });

  const totalAllInLendingRate = ftpResult.totalAllInRatePercent + businessMargin;

  const formatInrCr = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val) + ' Cr';

  return (
    <div className="w-full min-h-full p-4 sm:p-6 lg:p-8 space-y-6 select-none text-slate-100 font-sans">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
            <LineChart className="w-4 h-4" />
            <span>SUB-TOOL 05 • TREASURY, ALM & INTERNAL FUNDS TRANSFER PRICING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            TREASURY & LIQUIDITY MANAGEMENT
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Liquidity Coverage Ratio (LCR), Net Stable Funding Ratio (NSFR), High-Quality Liquid Assets (HQLA), and ALCO Funds Transfer Pricing (FTP).
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-xs font-bold uppercase">
          CURRENT RBI & ALCO FRAMEWORK
        </div>
      </div>

      {/* LIQUIDITY METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
        {/* LCR CARD */}
        <div className="cros-glass-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase">
            <span>LIQUIDITY COVERAGE RATIO (LCR)</span>
            <span className="text-emerald-400 text-[10px] font-bold">RBI MIN: 100%</span>
          </div>
          <div className="text-3xl font-black text-emerald-400 cros-num">
            {lcrResult.ratioPercent.toFixed(2)}%
          </div>
          <p className="text-[10px] text-slate-400 font-sans">
            HQLA Buffer: {formatInrCr(4500)} | 30D Outflows: {formatInrCr(3800)}
          </p>
        </div>

        {/* NSFR CARD */}
        <div className="cros-glass-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase">
            <span>NET STABLE FUNDING RATIO (NSFR)</span>
            <span className="text-emerald-400 text-[10px] font-bold">RBI MIN: 100%</span>
          </div>
          <div className="text-3xl font-black text-emerald-300 cros-num">
            {nsfrResult.ratioPercent.toFixed(2)}%
          </div>
          <p className="text-[10px] text-slate-400 font-sans">
            Available ASF: {formatInrCr(28500)} | Required RSF: {formatInrCr(26200)}
          </p>
        </div>

        {/* ALL-IN LENDING RATE */}
        <div className="cros-glass-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase">
            <span>ALCO ALL-IN LENDING RATE</span>
            <span className="text-cyan-400 text-[10px] font-bold">INTERNAL POLICY</span>
          </div>
          <div className="text-3xl font-black text-cyan-300 cros-num">
            {totalAllInLendingRate.toFixed(2)}%
          </div>
          <p className="text-[10px] text-slate-400 font-sans">
            Base {baseRate.toFixed(2)}% + Liquidity {liquidityPremium.toFixed(2)}% + Credit {creditSpread.toFixed(2)}% + Margin {businessMargin.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* INTERNAL FTP DECOMPOSITION SIMULATOR */}
      <div className="cros-glass-card p-6 rounded-2xl space-y-6 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block font-mono">
              // BANK POLICY SIMULATION • ALCO FUNDS TRANSFER PRICING (FTP) STACK
            </span>
            <h2 className="text-lg font-bold text-slate-100 uppercase">INTERNAL LOAN PRICING DECOMPOSITION</h2>
          </div>
          <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-white/10 text-[10px] uppercase font-bold">
            NOT AN RBI PRESCRIBED FORMULA
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          {/* SLIDERS / CONTROLS */}
          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>1. BASE CURVE / REPO RATE:</span>
                <strong className="text-cyan-400">{baseRate.toFixed(2)}%</strong>
              </div>
              <input
                type="range"
                min="4.00"
                max="9.00"
                step="0.25"
                value={baseRate}
                onChange={(e) => setBaseRate(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>2. LIQUIDITY TERM PREMIUM:</span>
                <strong className="text-cyan-400">{liquidityPremium.toFixed(2)}%</strong>
              </div>
              <input
                type="range"
                min="0.00"
                max="2.50"
                step="0.10"
                value={liquidityPremium}
                onChange={(e) => setLiquidityPremium(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>3. CREDIT RISK SPREAD:</span>
                <strong className="text-cyan-400">{creditSpread.toFixed(2)}%</strong>
              </div>
              <input
                type="range"
                min="0.20"
                max="4.00"
                step="0.10"
                value={creditSpread}
                onChange={(e) => setCreditSpread(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>4. BUSINESS UNIT MARGIN:</span>
                <strong className="text-cyan-400">{businessMargin.toFixed(2)}%</strong>
              </div>
              <input
                type="range"
                min="0.10"
                max="2.00"
                step="0.10"
                value={businessMargin}
                onChange={(e) => setBusinessMargin(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          {/* WATERFALL BREAKDOWN */}
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-3 font-mono">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">// ALL-IN LENDING RATE BREAKDOWN</span>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-white/5">
                <span className="text-slate-400">Base Cost of Funds:</span>
                <span className="font-bold text-slate-100">{baseRate.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-white/5">
                <span className="text-slate-400">Liquidity Charge:</span>
                <span className="font-bold text-slate-100">+{liquidityPremium.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-white/5">
                <span className="text-slate-400">Credit Risk Premium:</span>
                <span className="font-bold text-slate-100">+{creditSpread.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-white/5">
                <span className="text-slate-400">Commercial Margin:</span>
                <span className="font-bold text-slate-100">+{businessMargin.toFixed(2)}%</span>
              </div>

              <div className="flex justify-between p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold text-sm">
                <span>TOTAL SANCTIONED RATE:</span>
                <span>{totalAllInLendingRate.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
