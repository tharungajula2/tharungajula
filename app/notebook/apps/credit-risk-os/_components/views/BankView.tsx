"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { RENFORGE_BANK_ENTITY, getPortfolioTotals } from '../../_data/syntheticBank';

export default function BankView() {
  const { facilities, activeScenario, setActiveSection, setSelectedFacilityId } = useCreditRiskOS();
  const totals = getPortfolioTotals(facilities);

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="p-6 space-y-6">
      {/* EXECUTIVE HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-[0.25em] text-accent font-semibold uppercase">// SECTION BNK-01</span>
            <span className="text-hairline-faint">·</span>
            <span className="text-[10px] font-mono text-ink-faint uppercase">{RENFORGE_BANK_ENTITY.legalEntityCode}</span>
          </div>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">Executive Bank Command Centre</h1>
          <p className="text-xs text-ink-muted font-mono mt-1">
            Balance sheet position, capital adequacy, carrying provisions, and risk governance for {RENFORGE_BANK_ENTITY.name}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-surface-raised border border-hairline font-mono text-xs text-ink-muted">
            <span>SCENARIO: </span>
            <span className="text-accent font-bold uppercase">{activeScenario}</span>
          </div>
          <button
            onClick={() => setActiveSection('simulation-lab')}
            className="px-3 py-1.5 rounded-lg bg-accent text-surface font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer"
          >
            Run Stress Test →
          </button>
        </div>
      </div>

      {/* TOP KPI METRIC STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* TOTAL EXPOSURE EAD */}
        <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1">
          <span className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">TOTAL EAD EXPOSURE</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-ink tracking-tight">
            {formatGBP(totals.totalEadGBP)}
          </div>
          <div className="text-[10px] font-mono text-ink-muted">
            Drawn: {formatGBP(totals.totalDrawnGBP)}
          </div>
        </div>

        {/* CARRYING PROVISION / ECL */}
        <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1">
          <span className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">TOTAL IFRS 9 ECL</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-accent tracking-tight">
            {formatGBP(totals.totalProvisionGBP)}
          </div>
          <div className="text-[10px] font-mono text-ink-muted">
            Coverage: {((totals.totalProvisionGBP / totals.totalEadGBP) * 100).toFixed(2)}% of EAD
          </div>
        </div>

        {/* TOTAL RWA */}
        <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1">
          <span className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">TOTAL RISK-WEIGHTED ASSETS</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-ink tracking-tight">
            {formatGBP(totals.totalRwaGBP)}
          </div>
          <div className="text-[10px] font-mono text-ink-muted">
            Basel 3.1 Floor Applied
          </div>
        </div>

        {/* CET1 CAPITAL RATIO */}
        <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1">
          <span className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">CET1 CAPITAL RATIO</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-signal tracking-tight">
            {totals.cet1RatioPercent.toFixed(2)}%
          </div>
          <div className="text-[10px] font-mono text-signal">
            ● PRA Target 10.5% (+{(totals.cet1RatioPercent - 10.5).toFixed(2)}% cushion)
          </div>
        </div>
      </div>

      {/* STAGING BREAKDOWN & WATCHLIST ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* STAGE BREAKDOWN CARD */}
        <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4">
          <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
            <span className="text-xs font-mono font-bold uppercase text-ink tracking-wider">// IFRS 9 STAGE COUNTS</span>
            <span className="text-[10px] font-mono text-ink-faint">{totals.facilityCount} FACILITIES</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* Stage 1 */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-sunken border border-hairline-faint">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-signal" />
                <span className="font-bold text-ink">STAGE 1</span>
                <span className="text-[10px] text-ink-muted">(Performing)</span>
              </div>
              <span className="font-bold text-ink">{totals.stage1Count} facilities</span>
            </div>

            {/* Stage 2 */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-sunken border border-hairline-faint">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-bold text-ink">STAGE 2</span>
                <span className="text-[10px] text-ink-muted">(Underperforming / SICR)</span>
              </div>
              <span className="font-bold text-accent">{totals.stage2Count} facilities</span>
            </div>

            {/* Stage 3 */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-sunken border border-hairline-faint">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="font-bold text-ink">STAGE 3</span>
                <span className="text-[10px] text-ink-muted">(Defaulted / Impaired)</span>
              </div>
              <span className="font-bold text-red-400">{totals.stage3Count} facilities</span>
            </div>
          </div>

          <button
            onClick={() => setActiveSection('ifrs9')}
            className="w-full py-2 rounded-lg bg-surface-sunken border border-hairline hover:border-accent text-accent font-mono text-xs uppercase font-bold transition-all cursor-pointer"
          >
            Inspect IFRS 9 Staging Engine →
          </button>
        </div>

        {/* WATCHLIST & DEFAULT ALERTS CARD */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4">
          <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
            <span className="text-xs font-mono font-bold uppercase text-ink tracking-wider">// WATCHLIST & DEFAULT EXCEPTIONS</span>
            <span className="text-[10px] font-mono text-red-400 font-semibold">{totals.watchlistCount} EXCEPTIONS ACTIVE</span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-60 no-scrollbar">
            {facilities
              .filter((f) => f.sicrTriggered || f.isDefaulted)
              .map((facility) => (
                <div
                  key={facility.id}
                  onClick={() => {
                    setSelectedFacilityId(facility.id);
                    setActiveSection('customers');
                  }}
                  className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint hover:border-accent/60 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink group-hover:text-accent transition-colors">
                      <span>{facility.facilityNumber}</span>
                      <span className="text-ink-faint">·</span>
                      <span>{facility.obligorName}</span>
                    </div>
                    <div className="text-[11px] text-ink-muted font-mono mt-0.5">
                      Reason: {facility.sicrReason || 'Watchlist triggers active.'}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                      facility.ifrs9Stage === 3 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-accent/20 text-accent border border-accent/30'
                    }`}>
                      STAGE {facility.ifrs9Stage}
                    </span>
                    <span className="text-ink font-semibold">{formatGBP(facility.ead)}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
