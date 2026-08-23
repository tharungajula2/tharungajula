"use client";

import { TeachingIllustrationBadge } from "./Badges";

export default function FoundationsSection() {
  return (
    <section id="foundations" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-teal-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 01 — PORTFOLIO CONCEPTS & LOG RETURNS
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. WHAT IS A PORTFOLIO */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            01. What is a Portfolio?
          </h2>
          <TeachingIllustrationBadge label="CORE CONCEPT" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          A portfolio is a collection of financial assets whose combined expected return and total risk depend on the individual assets and the capital weight assigned to each.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">ASSET</span>
            <span className="text-ink-muted">Individual stock or security in the universe.</span>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">WEIGHT (wᵢ)</span>
            <span className="text-ink-muted">Fraction of total capital allocated to asset i.</span>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">PORTFOLIO</span>
            <span className="text-ink-muted">Weighted combination of all selected assets (Σ wᵢ = 1).</span>
          </div>
        </div>

        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-4 font-mono text-xs">
          <div className="text-teal-400 font-bold mb-2">// CAPITAL ALLOCATION EXAMPLE (₹100 TOTAL CAPITAL)</div>
          <div className="flex flex-wrap gap-3 text-ink-muted">
            <div className="bg-surface-raised p-2.5 rounded border border-hairline">Stock A: 40% (₹40)</div>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline">Stock B: 35% (₹35)</div>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline">Stock C: 25% (₹25)</div>
            <div className="text-teal-400 font-bold p-2.5">Sum = 1.00 (100%)</div>
          </div>
        </div>

        <div className="bg-teal-500/20 border border-teal-500/40 p-3.5 rounded-xl text-xs font-mono text-teal-400 font-semibold">
          RULE: Weights describe where capital goes.
        </div>
      </div>

      {/* 2. WHY NOT PICK BEST STOCK */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            02. Why Not Just Pick the Best Stock?
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">SINGLE-ASSET QUESTION</span>
            <p className="text-ink-muted leading-relaxed">
              "Which individual stock has the highest standalone expected return?" Ignores volatility and joint movements.
            </p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">PORTFOLIO QUESTION</span>
            <p className="text-ink-muted leading-relaxed">
              "Which asset combination offers an attractive expected return for the risk created by all assets moving together?"
            </p>
          </div>
        </div>

        <div className="bg-teal-500/20 border border-teal-500/40 p-3.5 rounded-xl text-xs font-mono text-teal-400 font-semibold">
          RULE: Portfolio construction is about combinations, not individual winners.
        </div>
      </div>

      {/* 3. PRICE VS RETURN & LOG RETURNS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            03. Price Levels vs Daily Log Returns
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Raw share prices cannot be compared directly as performance measures because different stocks trade at different nominal price levels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-2">// LOG RETURN FORMULA</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2">
              rₜ = ln( Pₜ / Pₜ₋₁ )
            </div>
            <p className="text-ink-muted">Pₜ = current adjusted close, Pₜ₋₁ = previous adjusted close, ln = natural logarithm.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-2">// WORKED LOG RETURN EXAMPLE</span>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline space-y-1 text-ink-muted">
              <div>Previous Price (Pₜ₋₁) = ₹100</div>
              <div>Current Price (Pₜ) = ₹105</div>
              <div className="text-teal-400 font-bold border-t border-hairline-faint pt-1">
                rₜ = ln(105 / 100) = ln(1.05) ≈ 0.0488 (4.88%)
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <strong className="text-teal-400 block mb-1">Simple Return:</strong> (Pₜ − Pₜ₋₁) / Pₜ₋₁
            </div>
            <div>
              <strong className="text-teal-400 block mb-1">Log Return:</strong> ln(Pₜ / Pₜ₋₁) [Used in Project]
            </div>
          </div>
        </div>

        <div className="bg-teal-500/20 border border-teal-500/40 p-3.5 rounded-xl text-xs font-mono text-teal-400 font-semibold">
          RULE: Prices tell level. Returns tell relative movement.
        </div>
      </div>
    </section>
  );
}
