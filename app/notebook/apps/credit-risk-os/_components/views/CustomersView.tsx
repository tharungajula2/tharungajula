"use client";

import { useState } from 'react';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';

export default function CustomersView() {
  const { facilities, selectedFacilityId, setSelectedFacilityId } = useCreditRiskOS();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStage, setFilterStage] = useState<number | 'ALL'>('ALL');

  const selectedFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  const filteredFacilities = facilities.filter((f) => {
    const matchesSearch =
      f.facilityNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.obligorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = filterStage === 'ALL' || f.ifrs9Stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const formatInrCr = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 1 }).format(val) + ' Cr';

  return (
    <div className="p-6 space-y-6 font-mono text-xs select-none text-slate-100">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-cyan-400 font-bold uppercase">// SUB-TOOL 02 • OBLIGOR & FACILITY 360 INSPECTOR</span>
          <h1 className="text-2xl font-black uppercase text-slate-100 tracking-tight">Customer & Facility 360 Inspector</h1>
          <p className="text-xs text-slate-400 font-sans mt-1">Searchable obligor portfolio, facility limits, drawn commitments, internal ratings, and asset quality staging.</p>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search facility, obligor, product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />

          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">ALL STAGES</option>
            <option value="1">STAGE 1</option>
            <option value="2">STAGE 2</option>
            <option value="3">STAGE 3</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        {/* FACILITY TABLE (7 COLS) */}
        <div className="lg:col-span-7 cros-glass-card p-4 rounded-2xl border border-white/10 overflow-x-auto">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
            <span>FACILITY PORTFOLIO REGISTER</span>
            <span>{filteredFacilities.length} RECORDS</span>
          </div>

          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 text-cyan-400 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-2">Facility / Obligor</th>
                <th className="py-2.5 px-2">Rating</th>
                <th className="py-2.5 px-2">Limit</th>
                <th className="py-2.5 px-2">EAD</th>
                <th className="py-2.5 px-2">Stage</th>
                <th className="py-2.5 px-2">Provision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredFacilities.map((f) => {
                const isSelected = f.id === selectedFacility?.id;
                return (
                  <tr
                    key={f.id}
                    onClick={() => setSelectedFacilityId(f.id)}
                    className={`hover:bg-white/5 cursor-pointer transition-colors ${
                      isSelected ? 'bg-cyan-500/15 border-l-2 border-l-cyan-400' : ''
                    }`}
                  >
                    <td className="py-3 px-2">
                      <div className="font-bold text-slate-100">{f.facilityNumber}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[160px]">{f.obligorName}</div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10 font-bold text-slate-200">
                        {f.internalRating || 'A'}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-slate-200">{formatInrCr(f.sanctionedLimitInrCr || 0)}</td>
                    <td className="py-3 px-2 text-slate-100 font-semibold">{formatInrCr(f.eadInrCr || 0)}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        f.ifrs9Stage === 3 ? 'bg-rose-500/20 text-rose-400' : f.ifrs9Stage === 2 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        S{f.ifrs9Stage}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-cyan-300 font-semibold">{formatInrCr(f.iracpProvisionRequiredInrCr || f.iracpProvisionInrCr || 0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* FACILITY 360 INSPECTOR PANEL (5 COLS) */}
        {selectedFacility && (
          <div className="lg:col-span-5 cros-glass-card p-5 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-cyan-400 uppercase font-bold">// FACILITY 360 INSPECTOR</span>
                <h2 className="text-lg font-bold text-slate-100">{selectedFacility.facilityNumber}</h2>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 font-bold text-cyan-300 text-[11px]">
                {selectedFacility.product}
              </span>
            </div>

            {/* OBLIGOR HIGHLIGHTS */}
            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-2">
              <div className="text-[10px] text-slate-400 uppercase font-bold">// OBLIGOR SUMMARY</div>
              <div className="font-bold text-slate-100 text-sm">{selectedFacility.obligorName}</div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div>Sector: <span className="text-slate-100 font-semibold">{selectedFacility.sector}</span></div>
                <div>Rating: <span className="text-cyan-400 font-bold">{selectedFacility.internalRating}</span></div>
                <div>DPD: <span className="text-amber-400 font-bold">{selectedFacility.daysPastDue ?? selectedFacility.dpd} Days</span></div>
                <div>Status: <span className="text-emerald-400 font-bold">{selectedFacility.assetQualityStatus}</span></div>
              </div>
            </div>

            {/* FACILITY MECHANICS & EAD */}
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 uppercase font-bold">// FACILITY MECHANICS & EAD</div>
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950 border border-white/10 text-[11px]">
                <div>Limit: <span className="text-slate-100">{formatInrCr(selectedFacility.sanctionedLimitInrCr || 0)}</span></div>
                <div>Outstanding: <span className="text-slate-100">{formatInrCr(selectedFacility.outstandingInrCr || 0)}</span></div>
                <div>Undrawn: <span className="text-slate-100">{formatInrCr(selectedFacility.undrawnInrCr || 0)}</span></div>
                <div>CCF Factor: <span className="text-cyan-400">{((selectedFacility.ccf || 0.20) * 100).toFixed(0)}%</span></div>
                <div className="col-span-2 border-t border-white/10 pt-1 flex justify-between font-bold text-xs">
                  <span>EAD Exposure:</span>
                  <span className="text-cyan-300">{formatInrCr(selectedFacility.eadInrCr || 0)}</span>
                </div>
              </div>
            </div>

            {/* RISK & ASSET QUALITY */}
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 uppercase font-bold">// CREDIT RISK & ASSET QUALITY</div>
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950 border border-white/10 text-[11px]">
                <div>PD (1-Yr): <span className="text-slate-100">{(selectedFacility.pd * 100).toFixed(2)}%</span></div>
                <div>LGD: <span className="text-slate-100">{(selectedFacility.lgd * 100).toFixed(1)}%</span></div>
                <div>Days Past Due: <span className={selectedFacility.daysPastDue > 0 ? 'text-rose-400 font-bold' : 'text-slate-100'}>{selectedFacility.daysPastDue} DPD</span></div>
                <div>IRACP Provision: <span className="text-cyan-400 font-bold">{formatInrCr(selectedFacility.iracpProvisionRequiredInrCr || selectedFacility.iracpProvisionInrCr || 0)}</span></div>
              </div>
            </div>

            {/* CAPITAL & REVENUE */}
            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between text-[11px]">
              <div>
                <span className="text-slate-400 uppercase">Risk Weight: </span>
                <span className="text-slate-100 font-bold">{((selectedFacility.riskWeight || 0.75) * 100).toFixed(0)}%</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase">Credit RWA: </span>
                <span className="text-cyan-400 font-bold">{formatInrCr(selectedFacility.rwaInrCr || 0)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
