"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { INDUS_APEX_BANK_ENTITY, getIndiaPortfolioTotals } from '../../_data/indiaSyntheticBank';

export default function BankView() {
  const { facilities, activeScenario, setActiveSection, setSelectedFacilityId } = useCreditRiskOS();
  const totals = getIndiaPortfolioTotals(facilities);

  const formatInrCr = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 1 }).format(val) + ' Cr';

  return (
    <div className="p-6 space-y-6 font-mono text-xs select-none text-slate-100">
      {/* EXECUTIVE HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] tracking-[0.25em] text-cyan-400 font-bold uppercase">// SUB-TOOL 01 • BANK COMMAND CENTRE</span>
            <span className="text-white/20">·</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">{INDUS_APEX_BANK_ENTITY.legalEntityCode}</span>
            <span className="text-white/20">·</span>
            <span className="text-[10px] text-cyan-400 uppercase font-bold">AS AT {INDUS_APEX_BANK_ENTITY.simulationDate}</span>
          </div>
          <h1 className="text-2xl font-black uppercase text-slate-100 tracking-tight">Executive Bank Command Centre</h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Balance sheet position, capital adequacy, carrying provisions, and risk governance for {INDUS_APEX_BANK_ENTITY.name}.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300">
            <span>SCENARIO: </span>
            <span className="text-cyan-400 font-bold uppercase">{activeScenario}</span>
          </div>
          <button
            onClick={() => setActiveSection('simulation-lab')}
            className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all cursor-pointer shadow-md"
          >
            Run Stress Test →
          </button>
        </div>
      </div>

      {/* TOP KPI METRIC STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        {/* TOTAL EXPOSURE EAD */}
        <div className="cros-glass-card p-4 rounded-xl border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">PORTFOLIO EAD EXPOSURE</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            {formatInrCr(totals.totalEadInrCr)}
          </div>
          <div className="text-[10px] text-slate-400">
            Outstanding: {formatInrCr(totals.totalOutstandingInrCr)}
          </div>
        </div>

        {/* CARRYING PROVISION */}
        <div className="cros-glass-card p-4 rounded-xl border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">IRACP REQUIRED PROVISION</span>
          <div className="text-xl sm:text-2xl font-bold text-cyan-400 tracking-tight">
            {formatInrCr(totals.totalIracpProvisionInrCr)}
          </div>
          <div className="text-[10px] text-slate-400">
            Coverage: {((totals.totalIracpProvisionInrCr / (totals.totalOutstandingInrCr || 1)) * 100).toFixed(2)}% of Balance
          </div>
        </div>

        {/* PORTFOLIO CREDIT RWA */}
        <div className="cros-glass-card p-4 rounded-xl border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">PORTFOLIO CREDIT RWA</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            {formatInrCr(totals.totalRwaInrCr)}
          </div>
          <div className="text-[10px] text-slate-400">
            Attributable Capital: {formatInrCr(totals.attributableCapitalReqInrCr)}
          </div>
        </div>

        {/* WHOLE-BANK CET1 CAPITAL RATIO */}
        <div className="cros-glass-card p-4 rounded-xl border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">WHOLE-BANK CET1 RATIO</span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-400 tracking-tight">
            {INDUS_APEX_BANK_ENTITY.wholeBankCet1RatioPercent.toFixed(2)}%
          </div>
          <div className="text-[10px] text-emerald-400 font-bold">
            ● RBI Reference 8.00% (+{(INDUS_APEX_BANK_ENTITY.wholeBankCet1RatioPercent - 8.0).toFixed(2)}% Buffer)
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <span>* NOTE: Credit portfolio RWA ({formatInrCr(totals.totalRwaInrCr)}) is one component of total bank RWA ({formatInrCr(INDUS_APEX_BANK_ENTITY.wholeBankTotalRwaInrCr)}).</span>
        <span className="text-cyan-400 font-bold">CET1 CAPITAL: {formatInrCr(INDUS_APEX_BANK_ENTITY.wholeBankCet1CapitalInrCr)}</span>
      </div>

      {/* STAGING BREAKDOWN & WATCHLIST ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* STAGE BREAKDOWN CARD */}
        <div className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold uppercase text-slate-100 tracking-wider">// ASSET QUALITY SUMMARY</span>
            <span className="text-[10px] text-slate-400">{totals.facilityCount} FACILITIES</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* Standard */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold text-slate-100">STANDARD</span>
                <span className="text-[10px] text-slate-400">(Performing)</span>
              </div>
              <span className="font-bold text-slate-100">{totals.standardCount} facilities</span>
            </div>

            {/* SMA 1/2 */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="font-bold text-slate-100">SMA-1 / SMA-2</span>
                <span className="text-[10px] text-slate-400">(Special Mention)</span>
              </div>
              <span className="font-bold text-cyan-400">{totals.sma1Count + totals.sma2Count} facilities</span>
            </div>

            {/* NPA */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="font-bold text-slate-100">SUBSTANDARD NPA</span>
                <span className="text-[10px] text-slate-400">(Defaulted &gt;90 DPD)</span>
              </div>
              <span className="font-bold text-rose-400">{totals.npaCount} facilities</span>
            </div>
          </div>

          <button
            onClick={() => setActiveSection('iracp')}
            className="w-full py-2 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-500/50 text-cyan-300 font-mono text-xs uppercase font-bold transition-all cursor-pointer"
          >
            Inspect RBI IRACP Engine →
          </button>
        </div>

        {/* WATCHLIST & DEFAULT ALERTS CARD */}
        <div className="lg:col-span-2 cros-glass-card p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold uppercase text-slate-100 tracking-wider">// WATCHLIST & DELINQUENCY EXCEPTIONS</span>
            <span className="text-[10px] text-rose-400 font-semibold">{totals.watchlistCount} EXCEPTIONS ACTIVE</span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-60 no-scrollbar">
            {facilities
              .filter((f) => f.daysPastDue > 0 || f.isNPA)
              .map((facility) => (
                <div
                  key={facility.id}
                  onClick={() => {
                    setSelectedFacilityId(facility.id);
                    setActiveSection('customers');
                  }}
                  className="p-3 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      <span>{facility.facilityNumber}</span>
                      <span className="text-slate-500">·</span>
                      <span>{facility.obligorName}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Status: {facility.assetQualityStatus} | {facility.daysPastDue} DPD
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                      facility.isNPA ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {facility.assetQualityStatus}
                    </span>
                    <span className="text-slate-100 font-semibold">{formatInrCr(facility.outstandingInrCr || 0)}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
