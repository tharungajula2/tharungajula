"use client";

import { ProjectDataBadge, TeachingIllustrationBadge } from "./Badges";

export default function StationaritySection() {
  return (
    <section id="stationarity" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-rose-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 02 — STATIONARITY, ADF TESTING & DIFFERENCING
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. STATIONARITY & ADF TEST */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            04. Stationarity & Augmented Dickey–Fuller (ADF) Test
          </h2>
          <TeachingIllustrationBadge label="TESTING FRAMEWORK" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          ARIMA-style models require the underlying time series statistical structure (mean, variance, autocorrelation) to be sufficiently stable through time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-1">ADF NULL HYPOTHESIS (H₀)</span>
            <p className="text-ink-muted leading-relaxed">
              A unit root exists; the series is non-stationary and exhibits stochastic drift or trend.
            </p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-1">LOW P-VALUE INTERPRETATION</span>
            <p className="text-ink-muted leading-relaxed">
              A p-value below 0.05 supports rejecting H₀, providing evidence that the series is stationary.
            </p>
          </div>
        </div>

        <div className="bg-rose-500/20 border border-rose-500/40 p-3.5 rounded-xl text-xs font-mono text-rose-400 font-semibold">
          RULE: Stationarity is about stable statistical behaviour, not a perfectly flat line.
        </div>
      </div>

      {/* 2. PROJECT ADF PROGRESSION */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            05. Project ADF Transformation Progression
          </h2>
          <ProjectDataBadge label="PROJECT ADF RESULTS" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-rose-500/30">
            <span className="text-ink-muted text-[10px] block mb-1">1. RAW SERIES</span>
            <div className="text-xl font-bold text-rose-400 mb-1">p = 1.0</div>
            <p className="text-ink-muted text-[11px]">Strong evidence series is non-stationary.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-amber-500/30">
            <span className="text-ink-muted text-[10px] block mb-1">2. REGULAR DIFFERENCE (d=1)</span>
            <div className="text-xl font-bold text-amber-400 mb-1">p = 0.1167</div>
            <p className="text-ink-muted text-[11px]">Improved, but still cannot reject unit root at 5%.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-emerald-500/30">
            <span className="text-ink-muted text-[10px] block mb-1">3. SEASONAL DIFFERENCE (D=1, m=12)</span>
            <div className="text-xl font-bold text-emerald-400 mb-1">p = 0.0</div>
            <p className="text-ink-muted text-[11px]">Strong evidence against unit root (stationary).</p>
          </div>
        </div>

        {/* Visual Progression */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
          <span className="text-rose-400 font-bold">RAW (p=1.0)</span>
          <span className="text-ink-faint">→</span>
          <span className="text-amber-400 font-bold">REGULAR DIFFERENCE d=1 (p=0.1167)</span>
          <span className="text-ink-faint">→</span>
          <span className="text-emerald-400 font-bold">SEASONAL DIFFERENCE D=1, m=12 (p=0.0)</span>
        </div>
      </div>

      {/* 3. DIFFERENCING FORMULAS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            06. Regular vs Seasonal Differencing
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-2">// REGULAR DIFFERENCING (d = 1)</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2">
              Δyₜ = yₜ − yₜ₋₁
            </div>
            <p className="text-ink-muted leading-relaxed mb-2">
              Subtracts immediately preceding month's value (e.g. March 120 − Feb 110 = +10). Shifts focus from absolute level to month-on-month change.
            </p>
            <div className="text-[10px] text-rose-400 font-bold">d = order of ordinary differencing.</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-2">// SEASONAL DIFFERENCING (D = 1, m = 12)</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2">
              Δ₁₂yₜ = yₜ − yₜ₋₁₂
            </div>
            <p className="text-ink-muted leading-relaxed mb-2">
              Subtracts same month from previous year (e.g. Jan 2025 140 − Jan 2024 120 = +20). Removes repeating annual level structure.
            </p>
            <div className="text-[10px] text-rose-400 font-bold">D = order of seasonal differencing at lag m.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
