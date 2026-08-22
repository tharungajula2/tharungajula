"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { calculateLifetimeTermStructureECL } from '../../_engine/ifrs9';
import { getCustomerById } from '../../_data/syntheticBank';

export default function IFRS9View() {
  const { facilities, selectedFacilityId, setSelectedFacilityId } = useCreditRiskOS();

  const selectedFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];
  const selectedObligor = selectedFacility ? getCustomerById(selectedFacility.obligorId) : null;

  const stage1Facilities = facilities.filter((f) => f.ifrs9Stage === 1);
  const stage2Facilities = facilities.filter((f) => f.ifrs9Stage === 2);
  const stage3Facilities = facilities.filter((f) => f.ifrs9Stage === 3);

  const stage1ECL = stage1Facilities.reduce((sum, f) => sum + f.provisionGBP, 0);
  const stage2ECL = stage2Facilities.reduce((sum, f) => sum + f.provisionGBP, 0);
  const stage3ECL = stage3Facilities.reduce((sum, f) => sum + f.provisionGBP, 0);

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);

  // Term structure calculation for selected facility
  const termStructureResult = selectedFacility
    ? calculateLifetimeTermStructureECL({
        eadGBP: selectedFacility.ead,
        base1YrPD: selectedFacility.pd,
        lgd: selectedFacility.lgd,
        discountRate: 0.05, // 5% Effective Interest Rate
        lifetimeYears: 5,
      })
    : null;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-accent font-semibold uppercase">// SECTION ECL-04</span>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">IFRS 9 & Ind AS 109 Staging & ECL Engine</h1>
          <p className="text-xs text-ink-muted font-mono mt-1">
            Stage 1, 2 & 3 classification, SICR rules, 12-month vs lifetime ECL, and term structure discounting.
          </p>
        </div>
      </div>

      {/* THREE STAGING CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        {/* STAGE 1 */}
        <div className="p-4 rounded-xl bg-surface-raised border border-signal/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-signal uppercase">STAGE 1 — PERFORMING</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-signal/10 text-signal border border-signal/30">12M ECL</span>
          </div>
          <div className="text-2xl font-bold text-ink">{formatGBP(stage1ECL)}</div>
          <div className="text-[10px] text-ink-muted">{stage1Facilities.length} facilities • Normal credit risk</div>
        </div>

        {/* STAGE 2 */}
        <div className="p-4 rounded-xl bg-surface-raised border border-accent/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-accent uppercase">STAGE 2 — SICR TRIGGERED</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/30">LIFETIME ECL</span>
          </div>
          <div className="text-2xl font-bold text-accent">{formatGBP(stage2ECL)}</div>
          <div className="text-[10px] text-ink-muted">{stage2Facilities.length} facilities • Significant credit deterioration</div>
        </div>

        {/* STAGE 3 */}
        <div className="p-4 rounded-xl bg-surface-raised border border-red-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-400 uppercase">STAGE 3 — CREDIT IMPAIRED</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30">SPECIFIC PROVISION</span>
          </div>
          <div className="text-2xl font-bold text-red-400">{formatGBP(stage3ECL)}</div>
          <div className="text-[10px] text-ink-muted">{stage3Facilities.length} facilities • Default / &gt;90 DPD</div>
        </div>
      </div>

      {/* FACILITY LIST & TERM STRUCTURE CALCULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FACILITY STAGING REGISTER (6 COLS) */}
        <div className="lg:col-span-6 bg-surface-raised border border-hairline rounded-2xl p-4 font-mono text-xs overflow-x-auto space-y-3">
          <div className="flex items-center justify-between border-b border-hairline-faint pb-2">
            <span className="font-bold text-ink uppercase">// STAGING REGISTER & SICR STATUS</span>
            <span className="text-[10px] text-ink-faint">SELECT TO INSPECT TERM STRUCTURE</span>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-accent text-[11px] uppercase">
                <th className="py-2 px-2">Facility</th>
                <th className="py-2 px-2">PD (1-Yr)</th>
                <th className="py-2 px-2">Stage</th>
                <th className="py-2 px-2">Provision</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((f) => {
                const isSelected = f.id === selectedFacility?.id;
                return (
                  <tr
                    key={f.id}
                    onClick={() => setSelectedFacilityId(f.id)}
                    className={`border-b border-hairline-faint hover:bg-surface-sunken cursor-pointer transition-colors ${
                      isSelected ? 'bg-accent/15 border-l-2 border-l-accent' : ''
                    }`}
                  >
                    <td className="py-2.5 px-2">
                      <div className="font-bold text-ink">{f.facilityNumber}</div>
                      <div className="text-[10px] text-ink-muted truncate max-w-[140px]">{f.obligorName}</div>
                    </td>
                    <td className="py-2.5 px-2 text-ink">{(f.pd * 100).toFixed(2)}%</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        f.ifrs9Stage === 3 ? 'bg-red-500/20 text-red-400' : f.ifrs9Stage === 2 ? 'bg-accent/20 text-accent' : 'bg-signal/20 text-signal'
                      }`}>
                        Stage {f.ifrs9Stage}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-accent font-semibold">{formatGBP(f.provisionGBP)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MULTI-YEAR TERM STRUCTURE CALCULATOR (6 COLS) */}
        {selectedFacility && termStructureResult && (
          <div className="lg:col-span-6 bg-surface-raised border border-hairline rounded-2xl p-5 space-y-4 font-mono text-xs">
            <div className="border-b border-hairline-faint pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-accent uppercase font-bold">// 5-YEAR TERM STRUCTURE ECL CALCULATOR</span>
                <h2 className="text-lg font-bold text-ink">{selectedFacility.facilityNumber}</h2>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded bg-accent/20 text-accent font-bold uppercase">
                Stage {selectedFacility.ifrs9Stage} Provision
              </span>
            </div>

            {/* SICR REASON BLOCK */}
            <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint text-[11px]">
              <div className="text-[10px] text-ink-faint uppercase font-bold">Staging Rule Assessment:</div>
              <div className="text-ink mt-0.5 font-sans">{selectedFacility.sicrReason || 'No SICR triggers hit. Classified as Stage 1.'}</div>
            </div>

            {/* TERM STRUCTURE DISCOUNTING TABLE */}
            <div className="space-y-2">
              <div className="text-[10px] text-ink-faint uppercase font-bold">// YEARLY MARGINAL ECL CALCULATIONS</div>
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-hairline-faint text-accent uppercase">
                    <th className="py-1.5 px-1">Year</th>
                    <th className="py-1.5 px-1">Marginal PD</th>
                    <th className="py-1.5 px-1">S(t)</th>
                    <th className="py-1.5 px-1">Discount</th>
                    <th className="py-1.5 px-1 text-right">ECL (GBP)</th>
                  </tr>
                </thead>
                <tbody>
                  {termStructureResult.termStructure.map((row) => (
                    <tr key={row.year} className="border-b border-hairline-faint/50">
                      <td className="py-1.5 px-1 font-bold text-ink">Y{row.year}</td>
                      <td className="py-1.5 px-1 text-ink">{(row.marginalPD * 100).toFixed(2)}%</td>
                      <td className="py-1.5 px-1 text-ink-muted">{(row.survivalProb * 100).toFixed(1)}%</td>
                      <td className="py-1.5 px-1 text-ink-muted">{row.discountFactor.toFixed(3)}</td>
                      <td className="py-1.5 px-1 text-right font-bold text-accent">{formatGBP(row.discountedECLGBP)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* COMPARISON BAR */}
            <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint flex items-center justify-between text-xs font-bold">
              <div>
                <span className="text-ink-faint text-[10px] uppercase block">12-Month ECL:</span>
                <span className="text-ink">{formatGBP(termStructureResult.ecl12mGBP)}</span>
              </div>
              <div className="text-right">
                <span className="text-ink-faint text-[10px] uppercase block">Lifetime ECL Summation:</span>
                <span className="text-accent">{formatGBP(termStructureResult.eclLifetimeGBP)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
