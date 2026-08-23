"use client";

import { TeachingIllustrationBadge } from "./Badges";

export default function RiskCovarianceSection() {
  return (
    <section id="risk-covariance" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-teal-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 03 — COVARIANCE, PORTFOLIO VARIANCE & DIVERSIFICATION
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. VARIANCE VS VOLATILITY & COVARIANCE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            06. Variance, Volatility & Cross-Asset Covariance
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">VARIANCE (σ²)</span>
            <p className="text-ink-muted leading-relaxed">Measures dispersion around expected return in squared percentage units.</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">VOLATILITY (σ = √Var)</span>
            <p className="text-ink-muted leading-relaxed">Square root of variance, returning risk measure back to annual return scale.</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">COVARIANCE (Cov)</span>
            <p className="text-ink-muted leading-relaxed">Measures joint directional movement between two distinct assets.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs mb-6 text-center">
          <div className="bg-surface-sunken p-3 rounded-lg border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-1">POSITIVE COVARIANCE</span>
            <span className="text-ink-muted text-[11px]">Assets tend to move in same direction.</span>
          </div>
          <div className="bg-surface-sunken p-3 rounded-lg border border-hairline-faint">
            <span className="text-amber-400 font-bold block mb-1">NEAR-ZERO COVARIANCE</span>
            <span className="text-ink-muted text-[11px]">Movements are largely independent.</span>
          </div>
          <div className="bg-surface-sunken p-3 rounded-lg border border-hairline-faint">
            <span className="text-emerald-400 font-bold block mb-1">NEGATIVE COVARIANCE</span>
            <span className="text-ink-muted text-[11px]">Assets tend to move in opposite directions.</span>
          </div>
        </div>

        <div className="bg-teal-500/20 border border-teal-500/40 p-3.5 rounded-xl text-xs font-mono text-teal-400 font-semibold">
          RULE: Covariance is the cross-asset ingredient in portfolio risk.
        </div>
      </div>

      {/* 2. PORTFOLIO VARIANCE & DIVERSIFICATION */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            07. Portfolio Variance Formula & Diversification
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-2">// PORTFOLIO VARIANCE & VOLATILITY</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2 text-center">
              Var(Rₚ) = wᵀ Σ w
            </div>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2 text-center">
              σₚ = √( wᵀ Σ w )
            </div>
            <p className="text-ink-muted">w = weights vector, Σ = 82×82 covariance matrix.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <div className="flex items-center justify-between mb-2">
              <span className="text-teal-400 font-bold">// TWO-ASSET RISK DECOMPOSITION</span>
              <TeachingIllustrationBadge />
            </div>
            <div className="text-xs font-mono text-ink bg-surface-raised p-2.5 rounded border border-hairline font-bold mb-2">
              Var(P) = w₁²σ₁² + w₂²σ₂² + 2·w₁·w₂·Cov(1,2)
            </div>
            <p className="text-ink-muted text-[11px]">
              The 2w₁w₂Cov(1,2) term explains why portfolio risk is NOT simply a weighted average of individual volatilities.
            </p>
          </div>
        </div>

        <div className="bg-teal-500/20 border border-teal-500/40 p-3.5 rounded-xl text-xs font-mono text-teal-400 font-semibold">
          RULE: Diversification works when asset movements are not perfectly correlated. Diversification is a covariance story.
        </div>
      </div>
    </section>
  );
}
