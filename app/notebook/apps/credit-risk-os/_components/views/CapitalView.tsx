"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { RENFORGE_BANK_ENTITY, getPortfolioTotals } from '../../_data/syntheticBank';
import { calculateCapitalWithFloor } from '../../_engine/capital';

export default function CapitalView() {
  const { facilities } = useCreditRiskOS();
  const totals = getPortfolioTotals(facilities);

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);

  // Compute total Standardised RWA vs IRB RWA vs Output Floor
  const capitalBreakdowns = facilities.map((f) =>
    calculateCapitalWithFloor({
      eadGBP: f.ead,
      riskWeight: f.riskWeight,
      pd: f.pd,
      lgd: f.lgd,
      isDefaulted: f.isDefaulted,
      provisionGBP: f.provisionGBP,
    })
  );

  const totalStandardisedRWA = capitalBreakdowns.reduce((sum, c) => sum + c.standardisedRwaGBP, 0);
  const totalIRBRWA = capitalBreakdowns.reduce((sum, c) => sum + c.irbRwaGBP, 0);
  const totalOutputFloorRWA = capitalBreakdowns.reduce((sum, c) => sum + c.outputFloorRwaGBP, 0);
  const totalFinalRWA = capitalBreakdowns.reduce((sum, c) => sum + c.finalRwaGBP, 0);

  const totalPillar1CapitalReq = totalFinalRWA * 0.08;
  const wholeBankCet1Ratio = RENFORGE_BANK_ENTITY.wholeBankCet1RatioPercent;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-accent font-semibold uppercase">// SECTION CAP-05</span>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">Regulatory Capital & Basel 3.1 Output Floor</h1>
          <p className="text-xs text-ink-muted font-mono mt-1">
            Standardised RWA vs Advanced IRB comparison, 72.5% Basel 3.1 output floor, and CET1 capital ratio.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30 text-accent font-mono text-xs font-bold uppercase">
          BASEL 3.1 FUTURE-STATE SIMULATION
        </div>
      </div>

      {/* TIMING BANNER */}
      <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint font-mono text-[11px] text-ink-muted flex flex-wrap items-center justify-between gap-2">
        <span>SIMULATION DATE: <strong className="text-ink">31 July 2026</strong></span>
        <span className="text-hairline-faint">|</span>
        <span>UK GO-LIVE: <strong className="text-accent">1 Jan 2027</strong></span>
        <span className="text-hairline-faint">|</span>
        <span>72.5% END-STATE FLOOR: <strong className="text-ink">1 Jan 2030</strong></span>
        <span className="text-hairline-faint">|</span>
        <span className="text-signal font-bold">WHOLE-BANK CET1 RATIO: 15.00%</span>
      </div>

      {/* METRIC CARDS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1">
          <span className="text-[10px] text-ink-faint uppercase">STANDARDISED RWA</span>
          <div className="text-xl font-bold text-ink">{formatGBP(totalStandardisedRWA)}</div>
          <span className="text-[10px] text-ink-muted">Basel Standardised Approach</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1">
          <span className="text-[10px] text-ink-faint uppercase">ADVANCED IRB RWA</span>
          <div className="text-xl font-bold text-accent">{formatGBP(totalIRBRWA)}</div>
          <span className="text-[10px] text-ink-muted">Internal Ratings-Based Model</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1">
          <span className="text-[10px] text-ink-faint uppercase">BASEL 3.1 OUTPUT FLOOR (72.5%)</span>
          <div className="text-xl font-bold text-ink">{formatGBP(totalOutputFloorRWA)}</div>
          <span className="text-[10px] text-ink-muted">72.5% Standardised Floor</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1">
          <span className="text-[10px] text-ink-faint uppercase">PILLAR 1 CAPITAL REQ (8%)</span>
          <div className="text-xl font-bold text-signal">{formatGBP(totalPillar1CapitalReq)}</div>
          <span className="text-[10px] text-signal">Whole-Bank CET1 Ratio: {wholeBankCet1Ratio.toFixed(2)}%</span>
        </div>
      </div>

      {/* OUTPUT FLOOR ANALYSIS & FACILITY TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        {/* BASEL 3.1 OUTPUT FLOOR VISUALIZER (5 COLS) */}
        <div className="lg:col-span-5 bg-surface-raised border border-hairline rounded-2xl p-5 space-y-4">
          <div className="border-b border-hairline-faint pb-3 flex items-center justify-between">
            <span className="font-bold text-ink uppercase">// BASEL 3.1 OUTPUT FLOOR MECHANICS</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-accent/20 text-accent font-bold uppercase">PRA COMPLIANT</span>
          </div>

          <p className="text-ink-muted text-xs leading-relaxed font-sans">
            Under Basel 3.1 regulations, banks using Advanced IRB models cannot report RWAs lower than 72.5% of the Standardised RWA calculation.
          </p>

          <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint space-y-2 text-[11px]">
            <div className="flex justify-between">
              <span className="text-ink-faint uppercase">Standardised RWA:</span>
              <span className="text-ink font-bold">{formatGBP(totalStandardisedRWA)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-faint uppercase">72.5% Output Floor Threshold:</span>
              <span className="text-ink font-bold">{formatGBP(totalOutputFloorRWA)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-faint uppercase">Unconstrained IRB RWA:</span>
              <span className="text-accent font-bold">{formatGBP(totalIRBRWA)}</span>
            </div>
            <div className="border-t border-hairline-faint pt-2 flex justify-between font-bold text-xs">
              <span className="text-ink">Final Reported RWA:</span>
              <span className="text-signal">{formatGBP(totalFinalRWA)}</span>
            </div>
          </div>
        </div>

        {/* FACILITY CAPITAL BREAKDOWN TABLE (7 COLS) */}
        <div className="lg:col-span-7 bg-surface-raised border border-hairline rounded-2xl p-5 space-y-3 overflow-x-auto">
          <div className="border-b border-hairline-faint pb-2 flex items-center justify-between">
            <span className="font-bold text-ink uppercase">// FACILITY RWA & CAPITAL BREAKDOWN</span>
            <span className="text-[10px] text-ink-faint">{facilities.length} FACILITIES</span>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-hairline text-accent text-[11px] uppercase">
                <th className="py-2 px-2">Facility</th>
                <th className="py-2 px-2">EAD</th>
                <th className="py-2 px-2">Risk Wt</th>
                <th className="py-2 px-2">Std RWA</th>
                <th className="py-2 px-2">IRB RWA</th>
                <th className="py-2 px-2 text-right">Capital (8%)</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((f, i) => {
                const c = capitalBreakdowns[i];
                return (
                  <tr key={f.id} className="border-b border-hairline-faint/50 hover:bg-surface-sunken">
                    <td className="py-2.5 px-2">
                      <div className="font-bold text-ink">{f.facilityNumber}</div>
                      <div className="text-[10px] text-ink-muted truncate max-w-[120px]">{f.obligorName}</div>
                    </td>
                    <td className="py-2.5 px-2 text-ink">{formatGBP(f.ead)}</td>
                    <td className="py-2.5 px-2 text-ink">{(f.riskWeight * 100).toFixed(0)}%</td>
                    <td className="py-2.5 px-2 text-ink-muted">{formatGBP(c.standardisedRwaGBP)}</td>
                    <td className="py-2.5 px-2 text-accent font-semibold">{formatGBP(c.irbRwaGBP)}</td>
                    <td className="py-2.5 px-2 text-right font-bold text-signal">{formatGBP(c.pillar1CapitalReqGBP)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
