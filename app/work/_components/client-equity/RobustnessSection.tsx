"use client";

import { ProjectFrameworkBadge, TeachingIllustrationBadge } from "./Badges";

const coreScripts = [
  { name: "SCRIPT 01 · DATA / UNIVERSE PREPARATION", desc: "Data loading, point-in-time universe alignment & debt/quality filtering." },
  { name: "SCRIPT 02 · SIGNAL / RANKING LOGIC", desc: "Cross-sectional score computation, ranking & sector-neutral transformation." },
  { name: "SCRIPT 03 · PORTFOLIO IMPLEMENTATION", desc: "Target portfolio construction, rank buffers & L1/L2 cvxpy optimization." },
  { name: "SCRIPT 04 · ROBUSTNESS / EVALUATION", desc: "Tracking error, CAPM alpha/beta, drawdown & rolling performance suite." },
];

export default function RobustnessSection() {
  return (
    <section id="robustness" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-indigo-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 06 — ROBUSTNESS TESTING & 4-SCRIPT ARCHITECTURE
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. ROLLING METRICS & CAPM ALPHA/BETA */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            10. Rolling Metrics & CAPM Alpha/Beta Regression
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          {/* Rolling Metrics */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-2">// ROLLING METRICS SUITE</span>
            <p className="text-ink-muted leading-relaxed mb-2">
              Evaluates rolling 12-month Sharpe, Tracking Error, and Alpha windows to verify performance stability through time.
            </p>
            <div className="text-[10px] text-indigo-400 font-bold">Full-period metrics answer "overall". Rolling metrics answer "when".</div>
          </div>

          {/* CAPM Regression */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-2">// CAPM REGRESSION MODEL</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2 rounded border border-hairline mb-2 text-center">
              Rₚ − R_f = α + β( R_m − R_f ) + ε
            </div>
            <ul className="text-ink-muted text-[11px] space-y-1">
              <li>• Beta (β): Sensitivity to systematic market movements.</li>
              <li>• Alpha (α): Regression intercept after controlling for market beta.</li>
            </ul>
          </div>
        </div>

        <div className="bg-indigo-500/20 border border-indigo-500/40 p-3.5 rounded-xl text-xs font-mono text-indigo-400 font-semibold">
          RULE: Beta = systematic market sensitivity. Alpha = residual intercept after the model explains systematic risk.
        </div>
      </div>

      {/* 2. 4 CORE PYTHON SCRIPTS ARCHITECTURE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            11. 4 Core Python Scripts Architecture
          </h2>
          <ProjectFrameworkBadge label="4 CORE SCRIPTS" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          The implementation is organized into four modular Python scripts separating data alignment, signal ranking, portfolio optimization, and robustness evaluation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs mb-4">
          {coreScripts.map((s) => (
            <div key={s.name} className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl">
              <span className="text-indigo-400 font-bold block mb-1">{s.name}</span>
              <span className="text-ink-muted leading-relaxed">{s.desc}</span>
            </div>
          ))}
        </div>

        <div className="bg-surface-sunken p-3 rounded-xl border border-hairline-faint text-[11px] font-mono text-ink-muted">
          Note: Four core Python scripts form the implementation architecture; exact source filenames are not claimed here.
        </div>
      </div>
    </section>
  );
}
