"use client";

import { ProjectMechanismBadge, TeachingIllustrationBadge } from "./Badges";

export default function TurnoverOptimisationSection() {
  return (
    <section id="turnover-optimisation" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-indigo-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 04 — TURNOVER CONTROL, RANK BUFFERS & L1/L2 OPTIMISATION
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. TURNOVER & RANK BUFFERS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            06. Turnover Control & Rank Buffer Hysteresis
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          A strategy can generate strong signals but fail in practice if excessive rebalance turnover creates prohibitive transaction costs and market impact.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          {/* Turnover Formula */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-2">// CONCEPTUAL TURNOVER FORMULA</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2 text-center">
              Turnover ≈ ½ Σ | w_new − w_old |
            </div>
            <p className="text-ink-muted">Measures fraction of portfolio weight reallocated at rebalance date.</p>
          </div>

          {/* Rank Buffer */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <div className="flex items-center justify-between mb-2">
              <span className="text-indigo-400 font-bold">// RANK BUFFER HYSTERESIS</span>
              <TeachingIllustrationBadge label="TEACHING EXAMPLE" />
            </div>
            <p className="text-ink-muted text-[11px] leading-relaxed mb-2">
              If holding cutoff is Top 20 and a stock moves from <strong>Rank 19 → Rank 22</strong>, a rank buffer retains it to prevent unnecessary turnover.
            </p>
            <div className="text-[10px] text-indigo-400 font-bold">Prevents trading on minor rank fluctuations around cutoff.</div>
          </div>
        </div>

        <div className="bg-indigo-500/20 border border-indigo-500/40 p-3.5 rounded-xl text-xs font-mono text-indigo-400 font-semibold">
          RULE: Signal says what you want to own. Turnover says how much you must trade to get there.
        </div>
      </div>

      {/* 2. L1 VS L2 OPTIMISATION */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            07. L1 vs L2 Optimisation with cvxpy
          </h2>
          <ProjectMechanismBadge label="cvxpy ENGINE" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          The <code>cvxpy</code> convex optimization library optimizes portfolio weights by balancing signal target alignment against L1 or L2 weight change penalties.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          {/* L1 Penalty */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-2">// L1 PENALTY (ABSOLUTE CHANGE)</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2 text-center">
              L1 Penalty = Σ | w_new − w_old |
            </div>
            <p className="text-ink-muted text-[11px]">
              Penalizes total absolute weight movement directly. Example changes [+0.10, -0.10] → L1 Magnitude = <strong>0.20</strong>.
            </p>
          </div>

          {/* L2 Penalty */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-2">// L2 PENALTY (SQUARED CHANGE)</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2 text-center">
              L2 Penalty = Σ ( w_new − w_old )²
            </div>
            <p className="text-ink-muted text-[11px]">
              Penalizes large individual deviations increasingly strongly. Example changes [+0.10, -0.10] → L2 Magnitude = <strong>0.02</strong>.
            </p>
          </div>
        </div>

        <div className="bg-indigo-500/20 border border-indigo-500/40 p-3.5 rounded-xl text-xs font-mono text-indigo-400 font-semibold">
          RULE: L1 measures absolute movement. L2 squares movement and punishes large deviations more strongly. Portfolio implementation balances signal strength against trading stability.
        </div>
      </div>
    </section>
  );
}
