"use client";

import { useState } from 'react';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { getCustomerById } from '../../_data/syntheticBank';

export default function CustomersView() {
  const { facilities, selectedFacilityId, setSelectedFacilityId } = useCreditRiskOS();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStage, setFilterStage] = useState<number | 'ALL'>('ALL');

  const selectedFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];
  const selectedObligor = selectedFacility ? getCustomerById(selectedFacility.obligorId) : null;

  const filteredFacilities = facilities.filter((f) => {
    const matchesSearch =
      f.facilityNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.obligorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = filterStage === 'ALL' || f.ifrs9Stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-accent font-semibold uppercase">// SECTION CST-02</span>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">Customer & Facility 360 Inspector</h1>
          <p className="text-xs text-ink-muted font-mono mt-1">Searchable obligor portfolio, facility limits, drawn commitments, internal ratings, and staging.</p>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search facility, obligor, product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-surface-raised border border-hairline text-xs font-mono text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent"
          />

          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg bg-surface-raised border border-hairline text-xs font-mono text-ink focus:outline-none focus:border-accent"
          >
            <option value="ALL">ALL STAGES</option>
            <option value="1">STAGE 1</option>
            <option value="2">STAGE 2</option>
            <option value="3">STAGE 3</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FACILITY TABLE (7 COLS) */}
        <div className="lg:col-span-7 bg-surface-raised border border-hairline rounded-2xl p-4 overflow-x-auto">
          <div className="flex items-center justify-between mb-3 font-mono text-xs text-ink-muted">
            <span>FACILITY PORTFOLIO REGISTER</span>
            <span>{filteredFacilities.length} RECORDS</span>
          </div>

          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-hairline text-accent text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-2">Facility / Obligor</th>
                <th className="py-2.5 px-2">Rating</th>
                <th className="py-2.5 px-2">Limit</th>
                <th className="py-2.5 px-2">EAD</th>
                <th className="py-2.5 px-2">Stage</th>
                <th className="py-2.5 px-2">ECL</th>
              </tr>
            </thead>
            <tbody>
              {filteredFacilities.map((f) => {
                const isSelected = f.id === selectedFacility?.id;
                return (
                  <tr
                    key={f.id}
                    onClick={() => setSelectedFacilityId(f.id)}
                    className={`border-b border-hairline-faint hover:bg-surface-sunken cursor-pointer transition-colors ${
                      isSelected ? 'bg-accent/15 border-l-2 border-l-accent' : ''
                    }`}
                  >
                    <td className="py-3 px-2">
                      <div className="font-bold text-ink">{f.facilityNumber}</div>
                      <div className="text-[10px] text-ink-muted truncate max-w-[160px]">{f.obligorName}</div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded bg-surface-sunken border border-hairline-faint font-bold">
                        {selectedObligor?.internalRating || 'BBB'}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-ink">{formatGBP(f.limitGBP)}</td>
                    <td className="py-3 px-2 text-ink font-semibold">{formatGBP(f.ead)}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        f.ifrs9Stage === 3 ? 'bg-red-500/20 text-red-400' : f.ifrs9Stage === 2 ? 'bg-accent/20 text-accent' : 'bg-signal/20 text-signal'
                      }`}>
                        S{f.ifrs9Stage}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-accent font-semibold">{formatGBP(f.provisionGBP)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* FACILITY 360 INSPECTOR PANEL (5 COLS) */}
        {selectedFacility && (
          <div className="lg:col-span-5 bg-surface-raised border border-hairline rounded-2xl p-5 space-y-4 font-mono text-xs">
            <div className="border-b border-hairline-faint pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-accent uppercase font-bold">// FACILITY 360 INSPECTOR</span>
                <h2 className="text-lg font-bold text-ink">{selectedFacility.facilityNumber}</h2>
              </div>
              <span className="px-2.5 py-1 rounded bg-surface-sunken border border-hairline font-bold text-ink">
                {selectedFacility.product}
              </span>
            </div>

            {/* OBLIGOR HIGHLIGHTS */}
            <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint space-y-2">
              <div className="text-[10px] text-ink-faint uppercase font-bold">// OBLIGOR SUMMARY</div>
              <div className="font-bold text-ink text-sm">{selectedFacility.obligorName}</div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>Group: <span className="text-ink">{selectedObligor?.groupName}</span></div>
                <div>Sector: <span className="text-ink">{selectedObligor?.sector}</span></div>
                <div>Rating: <span className="text-accent font-bold">{selectedObligor?.internalRating}</span></div>
                <div>Geography: <span className="text-ink">{selectedObligor?.geography}</span></div>
              </div>
            </div>

            {/* FACILITY MECHANICS & EAD */}
            <div className="space-y-2">
              <div className="text-[10px] text-ink-faint uppercase font-bold">// FACILITY MECHANICS & EAD</div>
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-sunken border border-hairline-faint text-[11px]">
                <div>Limit: <span className="text-ink">{formatGBP(selectedFacility.limitGBP)}</span></div>
                <div>Drawn: <span className="text-ink">{formatGBP(selectedFacility.drawnGBP)}</span></div>
                <div>Undrawn: <span className="text-ink">{formatGBP(selectedFacility.undrawnGBP)}</span></div>
                <div>CCF Factor: <span className="text-accent">{(selectedFacility.ccf * 100).toFixed(0)}%</span></div>
                <div className="col-span-2 border-t border-hairline-faint pt-1 flex justify-between font-bold text-xs">
                  <span>EAD Exposure:</span>
                  <span className="text-accent">{formatGBP(selectedFacility.ead)}</span>
                </div>
              </div>
            </div>

            {/* RISK & IFRS 9 STAGING */}
            <div className="space-y-2">
              <div className="text-[10px] text-ink-faint uppercase font-bold">// CREDIT RISK & IFRS 9 STAGING</div>
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-sunken border border-hairline-faint text-[11px]">
                <div>PD (1-Yr): <span className="text-ink">{(selectedFacility.pd * 100).toFixed(2)}%</span></div>
                <div>LGD: <span className="text-ink">{(selectedFacility.lgd * 100).toFixed(1)}%</span></div>
                <div>Days Past Due: <span className={selectedFacility.dpd > 0 ? 'text-accent font-bold' : 'text-ink'}>{selectedFacility.dpd} DPD</span></div>
                <div>IFRS 9 Stage: <span className="text-accent font-bold">Stage {selectedFacility.ifrs9Stage}</span></div>
                <div className="col-span-2 border-t border-hairline-faint pt-1">
                  <div className="text-[10px] text-ink-faint uppercase">SICR Reason / Status:</div>
                  <div className="text-ink text-[11px] font-sans mt-0.5">{selectedFacility.sicrReason || 'No SICR triggers present.'}</div>
                </div>
              </div>
            </div>

            {/* CAPITAL & REVENUE */}
            <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint flex items-center justify-between text-[11px]">
              <div>
                <span className="text-ink-faint uppercase">Risk Weight: </span>
                <span className="text-ink font-bold">{(selectedFacility.riskWeight * 100).toFixed(0)}%</span>
              </div>
              <div>
                <span className="text-ink-faint uppercase">RWA: </span>
                <span className="text-ink font-bold">{formatGBP(selectedFacility.rwaGBP)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
