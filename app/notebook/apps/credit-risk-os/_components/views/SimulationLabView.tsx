"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { PREBUILT_SCENARIOS, ScenarioType } from '../../_engine/scenarios';
import EventSimulatorDrawer from '../ui/EventSimulatorDrawer';
import { INSTITUTION_TRUTH_MODEL } from '../../_domain/india/truthModel';
import { getIndiaPortfolioTotals } from '../../_data/indiaSyntheticBank';

export default function SimulationLabView() {
  const { facilities, activeScenario, setScenario, resetPortfolio } = useCreditRiskOS();
  const totals = getIndiaPortfolioTotals(facilities);

  const formatInrCr = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 1 }).format(val) + ' Cr';

  return (
    <div className="p-6 space-y-6 font-mono text-xs select-none text-slate-100">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-cyan-400 font-bold uppercase">// WORKSPACE 03 • SIMULATION & STRESS LAB</span>
          <h1 className="text-2xl font-black uppercase text-slate-100 tracking-tight">Macroeconomic Simulation & Stress Testing Lab</h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Run deterministic stress test scenarios (GDP shocks, property crashes, rating migrations) and observe real-time balance sheet impacts.
          </p>
        </div>

        <button
          onClick={resetPortfolio}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-cyan-400 font-bold uppercase transition-all cursor-pointer text-[11px]"
        >
          Reset Baseline
        </button>
      </div>

      {/* SCENARIO SELECTOR CARDS */}
      <div className="space-y-3 font-mono">
        <div className="text-slate-400 uppercase font-bold text-[10px]">// SELECT MACROECONOMIC SCENARIO:</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs">
          {(Object.keys(PREBUILT_SCENARIOS) as ScenarioType[]).map((key) => {
            const sc = PREBUILT_SCENARIOS[key];
            const isActive = activeScenario === key;
            return (
              <button
                key={key}
                onClick={() => setScenario(key)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer space-y-1 font-mono text-xs ${
                  isActive
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold shadow-md'
                    : 'bg-slate-950 border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase text-slate-100">{sc.name}</span>
                  {isActive && <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-extrabold uppercase">ACTIVE</span>}
                </div>
                <p className="text-slate-400 font-sans text-[11px] line-clamp-2">{sc.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* REAL-TIME SIMULATED BALANCE SHEET IMPACT */}
      <div className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-bold text-slate-100 uppercase">// STRESS TEST PORTFOLIO IMPACT SUMMARY</span>
          <span className="text-[10px] text-cyan-400 font-bold uppercase">SCENARIO: {activeScenario.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Total Outstanding Balance</span>
            <span className="text-lg font-bold text-slate-100">{formatInrCr(totals.totalOutstandingInrCr)}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Total IRACP Provisions</span>
            <span className="text-lg font-bold text-cyan-400">{formatInrCr(totals.totalIracpProvisionInrCr)}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Total Risk-Weighted Assets</span>
            <span className="text-lg font-bold text-slate-100">{formatInrCr(INSTITUTION_TRUTH_MODEL.headlineTotalRwaInrCr)}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Attributable CET1 Capital</span>
            <span className="text-lg font-bold text-emerald-400">{formatInrCr(INSTITUTION_TRUTH_MODEL.headlineCet1CapitalInrCr)}</span>
          </div>
        </div>
      </div>

      {/* OPERATIONAL EVENT SIMULATOR FEED */}
      <EventSimulatorDrawer />
    </div>
  );
}
