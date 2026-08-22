"use client";

import { useState } from 'react';
import { calculateLCR, calculateNSFR, calculateFTPRate } from '../../_engine/treasury';

export default function TreasuryView() {
  const [baseRate, setBaseRate] = useState(4.50);
  const [liquidityPremium, setLiquidityPremium] = useState(0.80);
  const [creditSpread, setCreditSpread] = useState(1.20);

  const lcrResult = calculateLCR({ hqlaGBP: 450_000_000, totalNetOutflows30DaysGBP: 320_000_000 });
  const nsfrResult = calculateNSFR({ availableStableFundingGBP: 2_800_000_000, requiredStableFundingGBP: 2_400_000_000 });

  const ftpResult = calculateFTPRate({
    baseRatePercent: baseRate,
    liquidityPremiumPercent: liquidityPremium,
    creditRiskPremiumPercent: creditSpread,
  });

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-accent font-semibold uppercase">// SECTION TRS-06</span>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">Treasury & Liquidity Management</h1>
          <p className="text-xs text-ink-muted font-mono mt-1">
            Liquidity Coverage Ratio (LCR), Net Stable Funding Ratio (NSFR), HQLA buffers, and Funds Transfer Pricing (FTP).
          </p>
        </div>
      </div>

      {/* METRIC STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        {/* LCR CARD */}
        <div className="p-4 rounded-xl bg-surface-raised border border-signal/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-ink-faint uppercase">LIQUIDITY COVERAGE RATIO (LCR)</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-signal/10 text-signal font-bold">PRA TARGET 100%</span>
          </div>
          <div className="text-2xl font-bold text-signal">{lcrResult.ratioPercent.toFixed(1)}%</div>
          <div className="text-[10px] text-ink-muted">HQLA: {formatGBP(450_000_000)} • 30D Outflows: {formatGBP(320_000_000)}</div>
        </div>

        {/* NSFR CARD */}
        <div className="p-4 rounded-xl bg-surface-raised border border-signal/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-ink-faint uppercase">NET STABLE FUNDING RATIO (NSFR)</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-signal/10 text-signal font-bold">PRA TARGET 100%</span>
          </div>
          <div className="text-2xl font-bold text-signal">{nsfrResult.ratioPercent.toFixed(1)}%</div>
          <div className="text-[10px] text-ink-muted">ASF: {formatGBP(2_800_000_000)} • RSF: {formatGBP(2_400_000_000)}</div>
        </div>

        {/* FTP ALL-IN RATE CARD */}
        <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-ink-faint uppercase">FTP ALL-IN LOAN RATE</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent font-bold">COST OF FUNDS</span>
          </div>
          <div className="text-2xl font-bold text-accent">{ftpResult.totalAllInRatePercent.toFixed(2)}%</div>
          <div className="text-[10px] text-ink-muted">Base Rate + Liquidity + Credit Risk</div>
        </div>
      </div>

      {/* FTP DECOMPOSITION CALCULATOR & FUNDING STRUCTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
        {/* INTERACTIVE FTP DECOMPOSITION */}
        <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4">
          <div className="border-b border-hairline-faint pb-3 flex items-center justify-between">
            <span className="font-bold text-ink uppercase">// FUNDS TRANSFER PRICING (FTP) DECOMPOSITION</span>
            <span className="text-[10px] text-accent font-bold uppercase">INTERACTIVE CALCULATOR</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-ink-faint uppercase block mb-1">Bank of England Base Rate (%):</label>
              <input
                type="number"
                step="0.1"
                value={baseRate}
                onChange={(e) => setBaseRate(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-surface-sunken border border-hairline text-xs font-mono text-ink focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-[10px] text-ink-faint uppercase block mb-1">Liquidity Term Premium (%):</label>
              <input
                type="number"
                step="0.05"
                value={liquidityPremium}
                onChange={(e) => setLiquidityPremium(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-surface-sunken border border-hairline text-xs font-mono text-ink focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-[10px] text-ink-faint uppercase block mb-1">Borrower Credit Risk Spread (%):</label>
              <input
                type="number"
                step="0.05"
                value={creditSpread}
                onChange={(e) => setCreditSpread(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-surface-sunken border border-hairline text-xs font-mono text-ink focus:outline-none focus:border-accent"
              />
            </div>

            <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-ink-faint">Base Rate:</span>
                <span className="text-ink font-bold">{baseRate.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-faint">Liquidity Premium:</span>
                <span className="text-ink font-bold">+{liquidityPremium.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-faint">Credit Risk Spread:</span>
                <span className="text-ink font-bold">+{creditSpread.toFixed(2)}%</span>
              </div>
              <div className="border-t border-hairline-faint pt-1.5 flex justify-between text-sm font-bold">
                <span className="text-ink">All-in Client Lending Rate:</span>
                <span className="text-accent">{ftpResult.totalAllInRatePercent.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* BALANCE SHEET FUNDING STRUCTURE */}
        <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4">
          <div className="border-b border-hairline-faint pb-3 flex items-center justify-between">
            <span className="font-bold text-ink uppercase">// BALANCE SHEET FUNDING STRUCTURE</span>
            <span className="text-[10px] text-ink-faint">RENFORGE BANK PLC</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint flex justify-between items-center">
              <div>
                <div className="font-bold text-ink">Retail & SME Deposits</div>
                <div className="text-[10px] text-ink-muted">Sticky core deposit funding (85% ASF)</div>
              </div>
              <span className="font-bold text-signal">{formatGBP(2_200_000_000)}</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint flex justify-between items-center">
              <div>
                <div className="font-bold text-ink">Wholesale Term Debt</div>
                <div className="text-[10px] text-ink-muted">Senior debt & covered bonds (50% ASF)</div>
              </div>
              <span className="font-bold text-accent">{formatGBP(850_000_000)}</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint flex justify-between items-center">
              <div>
                <div className="font-bold text-ink">Equity & Regulatory Capital</div>
                <div className="text-[10px] text-ink-muted">CET1 & Tier 1 capital (100% ASF)</div>
              </div>
              <span className="font-bold text-ink">{formatGBP(480_000_000)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
