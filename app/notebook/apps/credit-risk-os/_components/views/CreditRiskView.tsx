"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { getIndiaPortfolioTotals } from '../../_data/indiaSyntheticBank';
import { InternalRating } from '../../_types';

export default function CreditRiskView() {
  const { facilities } = useCreditRiskOS();
  const totals = getIndiaPortfolioTotals(facilities);

  const totalOutstanding = facilities.reduce((sum, f) => sum + (f.outstandingInrCr || 0), 0);
  const totalEad = facilities.reduce((sum, f) => sum + (f.eadInrCr || f.outstandingInrCr || 0), 0);
  const weightedPD = totalEad > 0 ? facilities.reduce((sum, f) => sum + f.pd * (f.eadInrCr || f.outstandingInrCr || 0), 0) / totalEad : 0;
  const weightedLGD = totalEad > 0 ? facilities.reduce((sum, f) => sum + f.lgd * (f.eadInrCr || f.outstandingInrCr || 0), 0) / totalEad : 0;

  const formatInrCr = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 1 }).format(val) + ' Cr';

  const ratingsOrder: InternalRating[] = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'D'];

  // Calculate rating distribution
  const ratingDist: Record<string, number> = {};
  facilities.forEach((f) => {
    const r = f.internalRating || 'A';
    ratingDist[r] = (ratingDist[r] || 0) + 1;
  });

  // Calculate sector concentration
  const sectorDist: Record<string, number> = {};
  facilities.forEach((f) => {
    const sec = f.sector || 'Corporate';
    sectorDist[sec] = (sectorDist[sec] || 0) + (f.outstandingInrCr || 0);
  });

  return (
    <div className="p-6 space-y-6 font-mono text-xs select-none text-slate-100">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-cyan-400 font-bold uppercase">// SUB-TOOL 03 • CREDIT RISK & RATING DISTRIBUTION</span>
          <h1 className="text-2xl font-black uppercase text-slate-100 tracking-tight">Credit Risk & Rating Distribution</h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            PD scorecards, LGD hurdle parameters, EAD exposure profiles, collateral haircuts, and rating migrations.
          </p>
        </div>
      </div>

      {/* PARAMETER SUMMARY STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="cros-glass-card p-4 rounded-xl border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">WEIGHTED AVERAGE PD</span>
          <div className="text-2xl font-bold text-cyan-400">{(weightedPD * 100).toFixed(2)}%</div>
          <span className="text-[10px] text-slate-400">Portfolio Probability of Default</span>
        </div>

        <div className="cros-glass-card p-4 rounded-xl border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">WEIGHTED AVERAGE LGD</span>
          <div className="text-2xl font-bold text-slate-100">{(weightedLGD * 100).toFixed(1)}%</div>
          <span className="text-[10px] text-slate-400">Loss Given Default Proxy</span>
        </div>

        <div className="cros-glass-card p-4 rounded-xl border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">TOTAL EAD EXPOSURE</span>
          <div className="text-2xl font-bold text-slate-100">{formatInrCr(totalEad)}</div>
          <span className="text-[10px] text-slate-400">{facilities.length} Active Credit Facilities</span>
        </div>
      </div>

      {/* RATING DISTRIBUTION & SECTOR CONCENTRATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RATING DISTRIBUTION */}
        <div className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold uppercase text-slate-100 tracking-wider">// INTERNAL RATING DISTRIBUTION</span>
            <span className="text-[10px] text-cyan-400">BASEL STANDARDISED PROFILE</span>
          </div>

          <div className="space-y-2.5">
            {ratingsOrder.map((rating) => {
              const count = ratingDist[rating] || 0;
              const maxCount = Math.max(...Object.values(ratingDist), 1);
              const percentWidth = (count / maxCount) * 100;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="w-10 font-bold text-cyan-400">{rating}</span>
                  <div className="flex-1 bg-slate-950 h-4 rounded-full overflow-hidden border border-white/10 relative">
                    <div
                      className="h-full bg-cyan-500/40 rounded-full transition-all"
                      style={{ width: `${percentWidth}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-slate-200 font-semibold">{count} fac</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTOR CONCENTRATION */}
        <div className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold uppercase text-slate-100 tracking-wider">// SECTOR CONCENTRATION</span>
            <span className="text-[10px] text-cyan-400">OUTSTANDING BALANCES</span>
          </div>

          <div className="space-y-3">
            {Object.entries(sectorDist).map(([sector, amt]) => {
              const share = totalOutstanding > 0 ? (amt / totalOutstanding) * 100 : 0;
              return (
                <div key={sector} className="p-2.5 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between font-mono text-xs">
                  <div>
                    <div className="font-bold text-slate-100">{sector}</div>
                    <div className="text-[10px] text-slate-400">{share.toFixed(1)}% of total balance sheet</div>
                  </div>
                  <span className="font-bold text-cyan-300">{formatInrCr(amt)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FORMULA & MODEL LAB */}
      <div className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-bold uppercase text-slate-100 tracking-wider">// CREDIT RISK FORMULA & MODEL LAB</span>
          <span className="text-[10px] text-cyan-400 font-bold uppercase">DETERMINISTIC SIMULATION ENGINE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* EXPECTED LOSS FORMULA LAB */}
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
            <span className="text-cyan-400 font-bold text-xs uppercase block">// 1-YEAR EXPECTED LOSS (EL) FORMULA</span>
            <div className="p-2 rounded bg-slate-900 border border-cyan-500/30 text-center text-cyan-300 font-bold">
              EL = PD × LGD × EAD
            </div>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Demonstrates 12-month baseline credit loss estimation. Separate from supervisory IRACP provisioning rates under RBI regulations.
            </p>
          </div>

          {/* EAD & CCF FORMULA LAB */}
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
            <span className="text-cyan-400 font-bold text-xs uppercase block">// EXPOSURE AT DEFAULT (EAD) & CCF FORMULA</span>
            <div className="p-2 rounded bg-slate-900 border border-cyan-500/30 text-center text-cyan-300 font-bold">
              EAD = Outstanding + (CCF × Undrawn)
            </div>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Credit Conversion Factors (CCF) quantify expected utilization of off-balance sheet limits prior to default.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
