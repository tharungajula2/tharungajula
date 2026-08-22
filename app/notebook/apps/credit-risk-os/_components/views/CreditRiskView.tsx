"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { getRatingDistribution, getSectorConcentration } from '../../_data/syntheticBank';
import { InternalRating } from '../../_types';

export default function CreditRiskView() {
  const { facilities } = useCreditRiskOS();

  const ratingDist = getRatingDistribution(facilities);
  const sectorDist = getSectorConcentration(facilities);

  const totalEad = facilities.reduce((sum, f) => sum + f.ead, 0);
  const weightedPD = totalEad > 0 ? facilities.reduce((sum, f) => sum + f.pd * f.ead, 0) / totalEad : 0;
  const weightedLGD = totalEad > 0 ? facilities.reduce((sum, f) => sum + f.lgd * f.ead, 0) / totalEad : 0;

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);

  const ratingsOrder: InternalRating[] = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'D'];

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-accent font-semibold uppercase">// SECTION RSK-03</span>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">Credit Risk & Rating Distribution</h1>
          <p className="text-xs text-ink-muted font-mono mt-1">
            PD scorecards, LGD hurdle parameters, EAD exposure profiles, collateral haircuts, and rating migrations.
          </p>
        </div>
      </div>

      {/* PARAMETER SUMMARY STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1">
          <span className="text-[10px] text-ink-faint uppercase">WEIGHTED AVERAGE PD</span>
          <div className="text-2xl font-bold text-accent">{(weightedPD * 100).toFixed(2)}%</div>
          <span className="text-[10px] text-ink-muted">Portfolio Probability of Default</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1">
          <span className="text-[10px] text-ink-faint uppercase">WEIGHTED AVERAGE LGD</span>
          <div className="text-2xl font-bold text-ink">{(weightedLGD * 100).toFixed(1)}%</div>
          <span className="text-[10px] text-ink-muted">Loss Given Default Proxy</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1">
          <span className="text-[10px] text-ink-faint uppercase">TOTAL EAD EXPOSURE</span>
          <div className="text-2xl font-bold text-ink">{formatGBP(totalEad)}</div>
          <span className="text-[10px] text-ink-muted">{facilities.length} Active Credit Facilities</span>
        </div>
      </div>

      {/* RATING DISTRIBUTION & SECTOR CONCENTRATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RATING DISTRIBUTION */}
        <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
            <span className="font-bold uppercase text-ink tracking-wider">// INTERNAL RATING DISTRIBUTION</span>
            <span className="text-[10px] text-ink-faint">BASEL IRB PROFILE</span>
          </div>

          <div className="space-y-2.5">
            {ratingsOrder.map((rating) => {
              const count = ratingDist[rating] || 0;
              const maxCount = Math.max(...Object.values(ratingDist), 1);
              const percentWidth = (count / maxCount) * 100;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="w-10 font-bold text-accent">{rating}</span>
                  <div className="flex-1 bg-surface-sunken h-4 rounded-full overflow-hidden border border-hairline-faint relative">
                    <div
                      className="h-full bg-accent/40 rounded-full transition-all"
                      style={{ width: `${percentWidth}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-ink font-semibold">{count} fac</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTOR CONCENTRATION */}
        <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
            <span className="font-bold uppercase text-ink tracking-wider">// UK SECTOR CONCENTRATION</span>
            <span className="text-[10px] text-ink-faint">EAD EXPOSURE</span>
          </div>

          <div className="space-y-3">
            {Object.entries(sectorDist).map(([sector, ead]) => {
              const share = totalEad > 0 ? (ead / totalEad) * 100 : 0;
              return (
                <div key={sector} className="p-2.5 rounded-xl bg-surface-sunken border border-hairline-faint flex items-center justify-between">
                  <div>
                    <div className="font-bold text-ink">{sector}</div>
                    <div className="text-[10px] text-ink-muted">{share.toFixed(1)}% of total balance sheet</div>
                  </div>
                  <span className="font-bold text-accent">{formatGBP(ead)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FORMULA & MODEL LAB (EXPANDABLE WORKED MATHEMATICAL LABS) */}
      <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
          <span className="font-bold uppercase text-ink tracking-wider">// CREDIT RISK FORMULA & MODEL LAB</span>
          <span className="text-[10px] text-accent font-bold uppercase">DETERMINISTIC SIMULATION ENGINE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* EXPECTED LOSS FORMULA LAB */}
          <div className="p-4 rounded-xl bg-surface-sunken border border-hairline-faint space-y-2">
            <span className="text-accent font-bold text-xs uppercase block">// 1-YEAR EXPECTED LOSS (EL) FORMULA</span>
            <div className="p-2 rounded bg-surface-raised border border-hairline text-center text-accent font-bold">
              EL = PD × LGD × EAD
            </div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              Demonstrates 12-month baseline credit loss estimation. Separate from multi-year lifetime ECL calculations under IFRS 9.
            </p>
          </div>

          {/* EAD & CCF FORMULA LAB */}
          <div className="p-4 rounded-xl bg-surface-sunken border border-hairline-faint space-y-2">
            <span className="text-accent font-bold text-xs uppercase block">// EXPOSURE AT DEFAULT (EAD) & CCF FORMULA</span>
            <div className="p-2 rounded bg-surface-raised border border-hairline text-center text-accent font-bold">
              EAD = Drawn + (CCF × Undrawn)
            </div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              Credit Conversion Factors (CCF) quantify expected utilization of off-balance sheet limits prior to default.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
