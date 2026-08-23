"use client";

import { ProjectDataBadge, ProjectMechanismBadge, TeachingIllustrationBadge } from "./Badges";

export default function SamplingSimulationSection() {
  return (
    <section id="sampling-simulation" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-teal-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 04 — BASELINE, CONSTRAINTS & MONTE CARLO SAMPLING
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. EQUAL-WEIGHT BASELINE & CONSTRAINTS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            08. Equal-Weight Baseline & Long-Only Constraints
          </h2>
          <ProjectDataBadge label="BASELINE 9.6%" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <div className="flex items-center justify-between mb-1">
              <span className="text-teal-400 font-bold">EQUAL-WEIGHT BASELINE</span>
              <ProjectDataBadge label="E[Rₚ] ≈ 9.6%" />
            </div>
            <p className="text-ink-muted leading-relaxed">
              Assigns identical weight wᵢ = 1 / 82 to every usable stock. Serves as transparent benchmark.
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">SIMULATION CONSTRAINTS</span>
            <div className="space-y-1 text-ink-muted">
              <div className="bg-surface-raised p-2 rounded border border-hairline font-bold">Fully Invested: Σ wᵢ = 1</div>
              <div className="bg-surface-raised p-2 rounded border border-hairline font-bold">Long Only: wᵢ ≥ 0</div>
            </div>
          </div>
        </div>

        <div className="bg-teal-500/20 border border-teal-500/40 p-3.5 rounded-xl text-xs font-mono text-teal-400 font-semibold">
          RULE: Weights sum to 1; no short selling in this simulation.
        </div>
      </div>

      {/* 2. 10,000 MONTE CARLO SAMPLING & SCORE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            09. 10,000 Random Allocation Sampling & Score Formula
          </h2>
          <ProjectMechanismBadge label="MONTE CARLO SEARCH" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Random positive numbers are generated for all 82 stocks and normalized by their sum to create valid long-only portfolio weight vectors.
        </p>

        {/* Normalization Example */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6 font-mono text-xs">
          <div className="text-teal-400 font-bold mb-2">// WEIGHT NORMALIZATION MECHANISM</div>
          <div className="bg-surface-raised p-3 rounded border border-hairline space-y-1 text-ink-muted">
            <div>Raw random positive values: [ 2.0, 3.0, 5.0 ] (Sum = 10.0)</div>
            <div className="text-teal-400 font-bold border-t border-hairline-faint pt-1">
              Normalized weights: [ 0.20, 0.30, 0.50 ] (Sum = 1.00)
            </div>
          </div>
        </div>

        {/* Score Formula & Hard Boundary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-2">// SIMPLIFIED SCORE FORMULA</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline text-center mb-2">
              score = E[Rₚ] / σₚ
            </div>
            <p className="text-ink-muted">Measures expected return per unit of portfolio volatility.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-amber-500/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-amber-300 font-bold">// HARD SHARPE BOUNDARY</span>
              <TeachingIllustrationBadge label="CRITICAL BOUNDARY" />
            </div>
            <p className="text-ink-muted leading-relaxed">
              The project score <strong>E[Rₚ] / σₚ</strong> does not subtract an explicit risk-free rate (R<sub>f</sub>). It is a Sharpe-style simplified return/volatility ratio, NOT a full Sharpe ratio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
