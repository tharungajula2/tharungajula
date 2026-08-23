"use client";

import { ProjectDataBadge, DerivedMetricBadge, TeachingIllustrationBadge } from "./Badges";

export default function ResultsCloudSection() {
  return (
    <section id="results-cloud" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-teal-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 05 — SIMULATION RESULTS, CLOUD & EFFICIENT FRONTIER
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. BEST SIMULATED PORTFOLIO RESULTS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            10. Best Simulated Portfolio Results
          </h2>
          <ProjectDataBadge label="10,000 SAMPLES" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Among 10,000 randomly sampled long-only weight vectors, the allocation maximizing the simplified return/volatility score achieved the following metrics.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-teal-500/40">
            <span className="text-teal-400 font-bold block mb-1">BEST EXPECTED RETURN</span>
            <div className="text-2xl font-bold text-ink mb-1">15.27%</div>
            <p className="text-ink-muted text-[11px]">vs ~9.6% equal-weight baseline.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">BEST VOLATILITY</span>
            <div className="text-2xl font-bold text-ink mb-1">19.81%</div>
            <p className="text-ink-muted text-[11px]">Annualised portfolio risk σₚ.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">SIMPLIFIED SCORE</span>
            <div className="text-2xl font-bold text-teal-400 mb-1">0.7707</div>
            <p className="text-ink-muted text-[11px]">Max return / volatility ratio.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-emerald-500/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-emerald-400 font-bold">DERIVED SCORE CHECK</span>
              <DerivedMetricBadge />
            </div>
            <div className="text-xl font-bold text-emerald-400 mb-1">0.1527 / 0.1981</div>
            <p className="text-ink-muted text-[11px]">≈ 0.7708 (matches reported 0.7707).</p>
          </div>
        </div>
      </div>

      {/* 2. RISK/RETURN CLOUD & EFFICIENT FRONTIER */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            11. Risk/Return Cloud & Efficient Frontier Concept
          </h2>
          <TeachingIllustrationBadge label="SCATTER CLOUD CONCEPT" />
        </div>

        {/* Conceptual Scatter SVG */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl font-mono text-xs mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-teal-400 font-bold">// 10,000 PORTFOLIO SCATTER CLOUD (VOLATILITY vs RETURN)</span>
            <span className="text-[10px] text-ink-faint">Y: Return / X: Volatility</span>
          </div>

          <div className="w-full h-44 bg-surface-raised rounded-lg border border-hairline p-4 relative flex items-center justify-center">
            <svg className="w-full h-full text-teal-400" viewBox="0 0 300 120" fill="none">
              {/* Theoretical Efficient Frontier Curve */}
              <path d="M 50 100 Q 70 30, 260 15" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="4 2" opacity="0.6" />
              {/* Scatter Points Cloud */}
              <circle cx="70" cy="95" r="2" fill="#2dd4bf" opacity="0.3" />
              <circle cx="85" cy="85" r="2" fill="#2dd4bf" opacity="0.4" />
              <circle cx="100" cy="70" r="2" fill="#2dd4bf" opacity="0.4" />
              <circle cx="110" cy="75" r="2" fill="#2dd4bf" opacity="0.3" />
              <circle cx="130" cy="55" r="2" fill="#2dd4bf" opacity="0.5" />
              <circle cx="140" cy="65" r="2" fill="#2dd4bf" opacity="0.4" />
              <circle cx="160" cy="45" r="2" fill="#2dd4bf" opacity="0.5" />
              <circle cx="175" cy="50" r="2" fill="#2dd4bf" opacity="0.4" />
              <circle cx="190" cy="35" r="2" fill="#2dd4bf" opacity="0.6" />
              <circle cx="210" cy="25" r="3" fill="#2dd4bf" opacity="0.7" />
              {/* Best Score Highlight Point */}
              <circle cx="215" cy="22" r="5" fill="#2dd4bf" />
            </svg>

            <span className="absolute right-6 top-4 text-[10px] text-teal-400 bg-surface-sunken px-2.5 py-1 rounded border border-teal-500/40 font-bold">
              ★ Best Score: 15.27% Return / 19.81% Vol
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">EFFICIENT FRONTIER THEORY</span>
            <p className="text-ink-muted leading-relaxed">
              Continuous boundary of non-dominated portfolios offering maximum expected return for each risk level.
            </p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">RANDOM SAMPLING IMPLEMENTATION</span>
            <p className="text-ink-muted leading-relaxed">
              10,000 random long-only allocations explore the risk/return cloud without numerical solver proof of global optimum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
