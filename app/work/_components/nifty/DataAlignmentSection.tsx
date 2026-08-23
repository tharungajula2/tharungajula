"use client";

import { ProjectDataBadge, TeachingIllustrationBadge } from "./Badges";

export default function DataAlignmentSection() {
  return (
    <section id="data-alignment" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-teal-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 02 — DATA ALIGNMENT & EXPECTED RETURN MATH
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. DATA ALIGNMENT & RETURN MATRIX */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            04. Data Alignment & 609×82 Return Matrix
          </h2>
          <ProjectDataBadge label="609 × 82 MATRIX" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Calculating cross-asset covariance requires asset returns measured over the exact same trading dates.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">NIFTY 100 UNIVERSE</span>
            <span className="text-ink-muted">Mapped constituent tickers to Yahoo Finance historical symbols.</span>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">82 SURVIVING STOCKS</span>
            <span className="text-ink-muted">82 stocks with clean, aligned adjusted close price history.</span>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">609 TRADING DAYS</span>
            <span className="text-ink-muted">609 daily return observations per stock in aligned matrix.</span>
          </div>
        </div>

        {/* Matrix Alignment Visual */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl font-mono text-xs mb-4">
          <div className="text-teal-400 font-bold mb-2">// ALIGNED RETURN MATRIX STRUCTURE (609 ROWS × 82 COLUMNS)</div>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border-b border-hairline-faint text-teal-400">
                <th className="p-2">DATE (ROW)</th>
                <th className="p-2">STOCK A</th>
                <th className="p-2">STOCK B</th>
                <th className="p-2">...</th>
                <th className="p-2">STOCK 82</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-faint text-ink-muted">
              <tr><td className="p-2 font-bold text-ink">Day 1</td><td className="p-2">+0.012</td><td className="p-2">-0.005</td><td className="p-2">...</td><td className="p-2">+0.008</td></tr>
              <tr><td className="p-2 font-bold text-ink">Day 2</td><td className="p-2">-0.004</td><td className="p-2">+0.015</td><td className="p-2">...</td><td className="p-2">+0.002</td></tr>
              <tr><td className="p-2 font-bold text-ink">...</td><td className="p-2">...</td><td className="p-2">...</td><td className="p-2">...</td><td className="p-2">...</td></tr>
              <tr><td className="p-2 font-bold text-ink">Day 609</td><td className="p-2">+0.007</td><td className="p-2">+0.001</td><td className="p-2">...</td><td className="p-2">-0.011</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. EXPECTED RETURN FORMULA */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            05. Portfolio Expected Return Math & Annualisation
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint font-mono text-xs">
            <span className="text-teal-400 font-bold block mb-2">// EXPECTED RETURN FORMULA</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-3 rounded border border-hairline mb-2 text-center">
              E[Rₚ] = wᵀ μ = Σ (wᵢ · μᵢ)
            </div>
            <ul className="text-ink-muted space-y-1">
              <li>• w = vector of asset weights</li>
              <li>• μ = vector of annualised asset mean returns</li>
              <li>• E[Rₚ] = weighted average portfolio return</li>
            </ul>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint font-mono text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-teal-400 font-bold">// WORKED 3-ASSET EXAMPLE</span>
              <TeachingIllustrationBadge />
            </div>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline space-y-1 text-ink-muted">
              <div>Asset A: return 10%, weight 50%</div>
              <div>Asset B: return 8%, weight 30%</div>
              <div>Asset C: return 6%, weight 20%</div>
              <div className="text-teal-400 font-bold border-t border-hairline-faint pt-1">
                E[Rₚ] = (0.50×10%) + (0.30×8%) + (0.20×6%) = 8.6%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-teal-500/20 border border-teal-500/40 p-3.5 rounded-xl text-xs font-mono text-teal-400 font-semibold">
          RULE: Portfolio expected return is a weighted average of individual asset expected returns.
        </div>
      </div>
    </section>
  );
}
