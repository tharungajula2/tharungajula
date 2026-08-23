"use client";

import { ProjectFrameworkBadge, TeachingIllustrationBadge } from "./Badges";

export default function UniverseSignalsSection() {
  return (
    <section id="universe-signals" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-indigo-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 02 — DATA INPUTS, FACTORS, SIGNALS & RANKING
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. DATA INPUTS & FACTOR/SIGNAL/FILTER */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            03. Data Inputs, Factors, Signals & Filters
          </h2>
          <ProjectFrameworkBadge label="CRSP DATA PIPELINE" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">PRICE DATA</span>
            <span className="text-ink-muted text-[11px]">Security returns & NAV tracking.</span>
          </div>
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">SECTOR DATA</span>
            <span className="text-ink-muted text-[11px]">Industry classification groups.</span>
          </div>
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">FUNDAMENTALS</span>
            <span className="text-ink-muted text-[11px]">Debt, quality & balance sheet metrics.</span>
          </div>
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">PREDICTIONS</span>
            <span className="text-ink-muted text-[11px]">Optional model signal inputs.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">1. FACTOR</span>
            <p className="text-ink-muted leading-relaxed">Systematic stock characteristic (e.g. Quality, Value, Momentum).</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">2. SIGNAL</span>
            <p className="text-ink-muted leading-relaxed">Numerical score representation used for cross-sectional ranking.</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">3. FILTER</span>
            <p className="text-ink-muted leading-relaxed">Rule removing non-eligible securities failing risk/debt thresholds.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint text-center">
          <span className="text-ink font-bold">Fundamental Data</span>
          <span className="text-indigo-400">→</span>
          <span className="text-ink font-bold">Quality Factor</span>
          <span className="text-indigo-400">→</span>
          <span className="text-ink font-bold">Signal Score</span>
          <span className="text-indigo-400">→</span>
          <span className="text-indigo-400 font-bold bg-surface-raised px-2.5 py-1 rounded border border-indigo-500/30">Debt Filter / Rank</span>
        </div>
      </div>

      {/* 2. CROSS-SECTIONAL RANKING */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            04. Cross-Sectional Ranking & Multi-Factor Combination
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          {/* Ranking Table */}
          <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-indigo-400 font-bold">// WORKED CROSS-SECTIONAL RANK TABLE</span>
              <TeachingIllustrationBadge label="TEACHING EXAMPLE" />
            </div>
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="border-b border-hairline-faint text-indigo-400">
                  <th className="p-1.5">STOCK</th>
                  <th className="p-1.5">RAW SIGNAL</th>
                  <th className="p-1.5">RANK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline-faint text-ink-muted">
                <tr><td className="p-1.5 font-bold text-ink">Stock A</td><td className="p-1.5">0.82</td><td className="p-1.5 text-emerald-400 font-bold">1</td></tr>
                <tr><td className="p-1.5 font-bold text-ink">Stock B</td><td className="p-1.5">0.61</td><td className="p-1.5 text-emerald-400 font-bold">2</td></tr>
                <tr><td className="p-1.5 font-bold text-ink">Stock C</td><td className="p-1.5">0.40</td><td className="p-1.5">3</td></tr>
                <tr><td className="p-1.5 font-bold text-ink">Stock D</td><td className="p-1.5">0.12</td><td className="p-1.5">4</td></tr>
              </tbody>
            </table>
          </div>

          {/* Multi-Factor Combo */}
          <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl">
            <span className="text-indigo-400 font-bold block mb-2">// MULTI-FACTOR RANK COMBINATION</span>
            <div className="bg-surface-raised p-3 rounded border border-hairline space-y-1 text-ink-muted">
              <div>Quality Rank + Value Rank + Momentum Rank</div>
              <div className="text-indigo-400 font-bold border-t border-hairline-faint pt-1">
                = Composite Multi-Factor Rank
              </div>
            </div>
            <p className="text-ink-muted text-[11px] mt-2 leading-relaxed">
              Ranks relative position rather than raw units, making distinct factors comparable across the universe.
            </p>
          </div>
        </div>

        <div className="bg-indigo-500/20 border border-indigo-500/40 p-3.5 rounded-xl text-xs font-mono text-indigo-400 font-semibold">
          RULE: Cross-sectional rank = where a stock sits relative to peers at the same decision date.
        </div>
      </div>
    </section>
  );
}
