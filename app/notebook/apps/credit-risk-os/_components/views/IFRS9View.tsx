"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { calculateLifetimeTermStructureECL } from '../../_engine/ifrs9';

export default function IFRS9View() {
  const { facilities, selectedFacilityId, setSelectedFacilityId } = useCreditRiskOS();

  const selectedFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  const stage1Facilities = facilities.filter((f) => f.ifrs9Stage === 1);
  const stage2Facilities = facilities.filter((f) => f.ifrs9Stage === 2);
  const stage3Facilities = facilities.filter((f) => f.ifrs9Stage === 3);

  const stage1ECL = stage1Facilities.reduce((sum, f) => sum + (f.iracpProvisionRequiredInrCr || f.iracpProvisionInrCr || 0), 0);
  const stage2ECL = stage2Facilities.reduce((sum, f) => sum + (f.iracpProvisionRequiredInrCr || f.iracpProvisionInrCr || 0), 0);
  const stage3ECL = stage3Facilities.reduce((sum, f) => sum + (f.iracpProvisionRequiredInrCr || f.iracpProvisionInrCr || 0), 0);

  const formatInrCr = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(val) + ' Cr';

  // Term structure calculation for selected facility
  const termStructureResult = selectedFacility
    ? calculateLifetimeTermStructureECL({
        eadGBP: selectedFacility.outstandingInrCr,
        base1YrPD: selectedFacility.pd,
        lgd: selectedFacility.lgd,
        discountRate: 0.085, // 8.5% Effective Interest Rate
        lifetimeYears: 5,
      })
    : null;

  return (
    <div className="p-6 space-y-6 font-mono text-xs select-none text-slate-100">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-cyan-400 font-bold uppercase">// SUB-TOOL 04 • EXPECTED CREDIT LOSS (ECL) STAGING BENCHMARK</span>
          <h1 className="text-2xl font-black uppercase text-slate-100 tracking-tight">ECL Staging & Term Structure Discounting</h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Stage 1 (12M ECL), Stage 2 (SICR / Lifetime ECL), & Stage 3 (Default / Credit-Impaired) staging and 5-year term structure discounting benchmark.
          </p>
        </div>
      </div>

      {/* THREE STAGING CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        {/* STAGE 1 */}
        <div className="cros-glass-card p-4 rounded-xl border border-emerald-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase">STAGE 1 — PERFORMING</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">12M ECL</span>
          </div>
          <div className="text-2xl font-bold text-slate-100">{formatInrCr(stage1ECL)}</div>
          <div className="text-[10px] text-slate-400">{stage1Facilities.length} facilities • Normal credit risk</div>
        </div>

        {/* STAGE 2 */}
        <div className="cros-glass-card p-4 rounded-xl border border-cyan-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase">STAGE 2 — SICR TRIGGERED</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">LIFETIME ECL</span>
          </div>
          <div className="text-2xl font-bold text-cyan-400">{formatInrCr(stage2ECL)}</div>
          <div className="text-[10px] text-slate-400">{stage2Facilities.length} facilities • SICR (30 DPD is rebuttable backstop)</div>
        </div>

        {/* STAGE 3 */}
        <div className="cros-glass-card p-4 rounded-xl border border-rose-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 uppercase">STAGE 3 — CREDIT-IMPAIRED / DEFAULT</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">SPECIFIC PROVISION</span>
          </div>
          <div className="text-2xl font-bold text-rose-400">{formatInrCr(stage3ECL)}</div>
          <div className="text-[10px] text-slate-400">{stage3Facilities.length} facilities • Default (90 DPD is rebuttable backstop)</div>
        </div>
      </div>

      {/* FACILITY LIST & TERM STRUCTURE CALCULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
        {/* FACILITY STAGING REGISTER (6 COLS) */}
        <div className="lg:col-span-6 cros-glass-card p-4 rounded-2xl border border-white/10 text-xs overflow-x-auto space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold text-slate-100 uppercase">// STAGING REGISTER & SICR STATUS</span>
            <span className="text-[10px] text-slate-400">SELECT TO INSPECT TERM STRUCTURE</span>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-cyan-400 text-[11px] uppercase">
                <th className="py-2 px-2">Facility</th>
                <th className="py-2 px-2">PD (1-Yr)</th>
                <th className="py-2 px-2">Stage</th>
                <th className="py-2 px-2">Provision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {facilities.map((f) => {
                const isSelected = f.id === selectedFacility?.id;
                return (
                  <tr
                    key={f.id}
                    onClick={() => setSelectedFacilityId(f.id)}
                    className={`hover:bg-white/5 cursor-pointer transition-colors ${
                      isSelected ? 'bg-cyan-500/15 border-l-2 border-l-cyan-400' : ''
                    }`}
                  >
                    <td className="py-2.5 px-2">
                      <div className="font-bold text-slate-100">{f.facilityNumber}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{f.obligorName}</div>
                    </td>
                    <td className="py-2.5 px-2 text-slate-200">{(f.pd * 100).toFixed(2)}%</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        f.ifrs9Stage === 3 ? 'bg-rose-500/20 text-rose-400' : f.ifrs9Stage === 2 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        Stage {f.ifrs9Stage}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-cyan-300 font-semibold">{formatInrCr(f.iracpProvisionRequiredInrCr || f.iracpProvisionInrCr || 0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MULTI-YEAR TERM STRUCTURE CALCULATOR (6 COLS) */}
        {selectedFacility && termStructureResult && (
          <div className="lg:col-span-6 cros-glass-card p-5 rounded-2xl border border-white/10 space-y-4 text-xs">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-cyan-400 uppercase font-bold">// 5-YEAR TERM STRUCTURE ECL CALCULATOR</span>
                <h2 className="text-lg font-bold text-slate-100">{selectedFacility.facilityNumber}</h2>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-400 font-bold uppercase border border-cyan-500/30">
                Stage {selectedFacility.ifrs9Stage} Provision
              </span>
            </div>

            {/* SICR REASON BLOCK */}
            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-[11px]">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Staging Rule Assessment:</div>
              <div className="text-slate-200 mt-0.5 font-sans">{selectedFacility.sicrReason || 'No SICR triggers hit. Classified as Stage 1.'}</div>
            </div>

            {/* TERM STRUCTURE DISCOUNTING TABLE */}
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 uppercase font-bold">// YEARLY MARGINAL ECL CALCULATIONS</div>
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-white/10 text-cyan-400 uppercase">
                    <th className="py-1.5 px-1">Year</th>
                    <th className="py-1.5 px-1">Marginal PD</th>
                    <th className="py-1.5 px-1">S(t)</th>
                    <th className="py-1.5 px-1">Discount</th>
                    <th className="py-1.5 px-1 text-right">ECL (₹ Cr)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {termStructureResult.termStructure.map((row) => (
                    <tr key={row.year} className="hover:bg-white/5">
                      <td className="py-1.5 px-1 font-bold text-slate-100">Y{row.year}</td>
                      <td className="py-1.5 px-1 text-slate-200">{(row.marginalPD * 100).toFixed(2)}%</td>
                      <td className="py-1.5 px-1 text-slate-400">{(row.survivalProb * 100).toFixed(1)}%</td>
                      <td className="py-1.5 px-1 text-slate-400">{row.discountFactor.toFixed(3)}</td>
                      <td className="py-1.5 px-1 text-right font-bold text-cyan-300">{formatInrCr(row.discountedECLGBP)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* COMPARISON BAR */}
            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between text-xs font-bold">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">12-Month ECL:</span>
                <span className="text-slate-100">{formatInrCr(termStructureResult.ecl12mGBP)}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[10px] uppercase block">Lifetime ECL Summation:</span>
                <span className="text-cyan-400">{formatInrCr(termStructureResult.eclLifetimeGBP)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
