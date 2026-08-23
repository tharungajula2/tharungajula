"use client";

import { TeachingIllustrationBadge } from "./Badges";

export default function BenchmarkRiskSection() {
  return (
    <section id="benchmark-risk" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-indigo-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 05 — BENCHMARK ACTIVE RISK & ROBUSTNESS METRICS
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. BENCHMARK & TRACKING ERROR */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            08. Benchmark Active Return & Tracking Error
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-2">// ACTIVE RETURN FORMULA</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2 text-center">
              Active Return_t = Strategy Return_t − Benchmark Return_t
            </div>
            <p className="text-ink-muted">Measures benchmark-relative performance differences for each period t.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-2">// TRACKING ERROR FORMULA</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2 text-center">
              Tracking Error = StdDev( Active Return )
            </div>
            <p className="text-ink-muted">Measures volatility of benchmark-relative active return differentials.</p>
          </div>
        </div>

        <div className="bg-indigo-500/20 border border-indigo-500/40 p-3.5 rounded-xl text-xs font-mono text-indigo-400 font-semibold">
          RULE: Volatility = absolute portfolio risk. Tracking error = benchmark-relative active risk.
        </div>
      </div>

      {/* 2. INFORMATION RATIO, SHARPE VS SORTINO & DRAWDOWN */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            09. Information Ratio, Sharpe vs Sortino & Drawdown
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 font-mono text-xs">
          {/* Information Ratio */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-2">INFORMATION RATIO</span>
            <div className="text-xs font-bold text-ink bg-surface-raised p-2 rounded border border-hairline mb-2 text-center">
              IR = Mean Active Return / Tracking Error
            </div>
            <p className="text-ink-muted text-[11px]">Active return produced per unit of active risk.</p>
          </div>

          {/* Sharpe vs Sortino */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-2">SHARPE VS SORTINO</span>
            <p className="text-ink-muted text-[11px] leading-relaxed mb-2">
              Sharpe penalises total volatility; Sortino penalises only harmful downside volatility.
            </p>
          </div>

          {/* Drawdown */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <div className="flex items-center justify-between mb-2">
              <span className="text-indigo-400 font-bold">DRAWDOWN MATH</span>
              <TeachingIllustrationBadge label="TEACHING EXAMPLE" />
            </div>
            <div className="bg-surface-raised p-2 rounded border border-hairline space-y-1 text-ink-muted text-[10px]">
              <div>Peak = 120, Trough = 90</div>
              <div className="text-indigo-400 font-bold border-t border-hairline-faint pt-1">
                Drawdown = (90 / 120) − 1 = -25%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-500/20 border border-indigo-500/40 p-3.5 rounded-xl text-xs font-mono text-indigo-400 font-semibold">
          RULE: Sharpe uses total risk. Information ratio uses active return and active risk. Drawdown describes path pain that volatility alone may not make intuitive.
        </div>
      </div>
    </section>
  );
}
