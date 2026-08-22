"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { PREBUILT_SCENARIOS, ScenarioType } from '../../_engine/scenarios';
import EventSimulatorDrawer from '../ui/EventSimulatorDrawer';
import { RENFORGE_BANK_ENTITY, getPortfolioTotals } from '../../_data/syntheticBank';

export default function SimulationLabView() {
  const { facilities, activeScenario, setScenario, resetPortfolio } = useCreditRiskOS();
  const totals = getPortfolioTotals(facilities);

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="p-6 space-y-6 font-mono text-xs">
      {/* HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-accent font-semibold uppercase">// SECTION SIM-11</span>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">Macroeconomic Simulation & Stress Testing Lab</h1>
          <p className="text-xs text-ink-muted mt-1">
            Run deterministic stress test scenarios (GDP shocks, property crashes, rating migrations) and observe real-time balance sheet impacts.
          </p>
        </div>

        <button
          onClick={resetPortfolio}
          className="px-3 py-1.5 rounded-lg bg-surface-raised border border-hairline hover:border-accent text-accent font-bold uppercase transition-all cursor-pointer"
        >
          Reset Baseline
        </button>
      </div>

      {/* SCENARIO SELECTOR CARDS */}
      <div className="space-y-3">
        <div className="text-ink-faint uppercase font-bold text-[10px]">// SELECT MACROECONOMIC SCENARIO:</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(Object.keys(PREBUILT_SCENARIOS) as ScenarioType[]).map((key) => {
            const sc = PREBUILT_SCENARIOS[key];
            const isActive = activeScenario === key;
            return (
              <button
                key={key}
                onClick={() => setScenario(key)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                  isActive
                    ? 'bg-accent/15 border-accent text-accent font-bold shadow-md'
                    : 'bg-surface-raised border-hairline hover:border-accent/40 text-ink-muted hover:text-ink'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase text-ink">{sc.name}</span>
                  {isActive && <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent text-surface font-extrabold uppercase">ACTIVE</span>}
                </div>
                <p className="text-ink-muted font-sans text-[11px] line-clamp-2">{sc.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* REAL-TIME SIMULATED BALANCE SHEET IMPACT */}
      <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4">
        <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
          <span className="font-bold text-ink uppercase">// STRESS TEST PORTFOLIO IMPACT SUMMARY</span>
          <span className="text-[10px] text-accent font-bold uppercase">SCENARIO: {activeScenario.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1">
            <span className="text-[10px] text-ink-faint uppercase block">Total EAD Exposure</span>
            <span className="text-lg font-bold text-ink">{formatGBP(totals.totalEadGBP)}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1">
            <span className="text-[10px] text-ink-faint uppercase block">Total ECL / Provisions</span>
            <span className="text-lg font-bold text-accent">{formatGBP(totals.totalProvisionGBP)}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1">
            <span className="text-[10px] text-ink-faint uppercase block">Total Risk-Weighted Assets</span>
            <span className="text-lg font-bold text-ink">{formatGBP(totals.totalRwaGBP)}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1">
            <span className="text-[10px] text-ink-faint uppercase block">Attributable Pillar 1 Capital</span>
            <span className="text-lg font-bold text-signal">{formatGBP(totals.attributablePillar1CapitalGBP)}</span>
          </div>
        </div>
      </div>

      {/* OPERATIONAL EVENT SIMULATOR FEED */}
      <EventSimulatorDrawer />
    </div>
  );
}
