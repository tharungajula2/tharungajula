"use client";

import { ProductionExtensionBadge, TeachingIllustrationBadge } from "./Badges";

const commonConfusions = [
  { term: "PRICE VS RETURN", desc: "Price is nominal asset level; return is relative percentage change. Portfolios require returns." },
  { term: "SIMPLE VS LOG RETURN", desc: "Simple return is (Pₜ − Pₜ₋₁)/Pₜ₋₁; log return is ln(Pₜ/Pₜ₋₁). Project uses daily log returns." },
  { term: "VARIANCE VS VOLATILITY", desc: "Variance is squared dispersion (σ²); volatility (σ) is its square root, returning risk to return units." },
  { term: "COVARIANCE VS CORRELATION", desc: "Covariance is scale-dependent joint movement; correlation is standardized between -1 and +1." },
  { term: "ASSET RISK VS PORTFOLIO RISK", desc: "Portfolio risk depends on both standalone asset variances AND cross-asset covariance interactions." },
  { term: "EXPECTED VS REALISED RETURN", desc: "Expected return is an historical statistical estimate, NOT guaranteed future performance." },
  { term: "SCORE VS SHARPE RATIO", desc: "Project score E[Rₚ]/σₚ excludes explicit risk-free rate subtraction; it is Sharpe-style, not full Sharpe." },
  { term: "RANDOM SEARCH VS OPTIMISATION", desc: "10,000 random portfolios explore allocation space; they do not mathematically prove global optimum." },
];

export default function ExtensionsConfusionsSection() {
  return (
    <section id="extensions-confusions" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-teal-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 06 — INSTITUTIONAL EXTENSIONS & 8 COMMON CONFUSIONS
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. INSTITUTIONAL EXTENSIONS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-12">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            12. Real-World Portfolio Extensions & Fragility
          </h2>
          <ProductionExtensionBadge />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs mb-4">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">HISTORICAL INPUT FRAGILITY</span>
            <p className="text-ink-muted leading-relaxed">
              Historical mean returns can be noisy and sensitive to estimation windows.
            </p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">CONCENTRATION CONSTRAINTS</span>
            <p className="text-ink-muted leading-relaxed">
              Institutional implementations add maximum stock weights (e.g. 10% cap) & sector limits.
            </p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-teal-400 font-bold block mb-1">TRANSACTION COSTS</span>
            <p className="text-ink-muted leading-relaxed">
              Rebalancing involves turnover, bid-ask spreads, and taxes omitted in basic unconstrained simulation.
            </p>
          </div>
        </div>
      </div>

      {/* 2. EIGHT COMMON CONFUSIONS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            13. Eight Common Portfolio Confusions Clarified
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {commonConfusions.map((c) => (
            <div key={c.term} className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl">
              <span className="text-xs font-bold text-teal-400 block mb-1 uppercase">// {c.term}</span>
              <p className="text-ink-muted leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
