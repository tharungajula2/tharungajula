"use client";

import { LimitationBadge } from "./Badges";

const pipelineSteps = [
  "NIFTY 100 UNIVERSE",
  "ADJUSTED CLOSE PRICES",
  "82 ALIGNED STOCKS",
  "609 × 82 RETURN MATRIX",
  "EXPECTED RETURNS μ",
  "COVARIANCE MATRIX Σ",
  "EQUAL-WEIGHT BASELINE",
  "10,000 WEIGHT VECTORS",
  "NORMALIZE Σwᵢ = 1",
  "E[Rₚ] = wᵀ μ",
  "σₚ = √(wᵀ Σ w)",
  "SCORE = E[Rₚ] / σₚ",
  "RISK / RETURN CLOUD",
  "EFFICIENT FRONTIER INTUITION",
  "BEST SCORE = 0.7707",
];

const cheatsheetBlocks = [
  {
    category: "DATA & RETURNS",
    items: [
      "82 usable aligned stocks",
      "609 × 82 return matrix",
      "rₜ = ln(Pₜ / Pₜ₋₁) daily log returns",
      "E[Rₚ] = wᵀ μ weighted average return",
    ],
  },
  {
    category: "RISK & COVARIANCE",
    items: [
      "Var(Rₚ) = wᵀ Σ w portfolio variance",
      "σₚ = √(wᵀ Σ w) portfolio volatility",
      "Σ = 82×82 covariance matrix",
      "diversification depends on covariance",
    ],
  },
  {
    category: "WEIGHTS & SEARCH",
    items: [
      "Σ wᵢ = 1 fully invested",
      "wᵢ ≥ 0 long-only",
      "10,000 random Monte Carlo portfolios",
      "normalize positive random weights",
    ],
  },
  {
    category: "RESULTS & OBJECTIVE",
    items: [
      "equal-weight return ≈ 9.6%",
      "best return = 15.27%",
      "best volatility = 19.81%",
      "best score = 0.7707 (not full Sharpe)",
    ],
  },
];

export default function PipelineCheatsheetTruthSection() {
  return (
    <section id="pipeline-truth" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-teal-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 07 — PIPELINE MAP, RECALL CHEATSHEET & TRUTH BOUNDARY
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. 15-STEP PIPELINE MAP */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4">
          14. 15-Step Complete System Pipeline Map
        </h2>
        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Reconstruct the entire NIFTY 100 portfolio construction process from raw universe definition to best simulated allocation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step}
              className="bg-surface-sunken border border-hairline-faint hover:border-teal-500/40 p-3.5 rounded-xl flex items-center gap-3 transition-colors"
            >
              <span className="text-teal-400 font-bold text-xs shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-ink font-medium uppercase">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. COMPACT RECALL CHEATSHEET */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
          15. Compact Memory & Recall Cheatsheet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {cheatsheetBlocks.map((block) => (
            <div key={block.category} className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-teal-400 tracking-widest block mb-2 uppercase">
                  // {block.category}
                </span>
                <ul className="space-y-1.5 text-ink-muted">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-teal-400 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. TRUTH BOUNDARY */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <LimitationBadge label="TRUTH BOUNDARY" />
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            16. Project Truth & Claim Boundaries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block mb-2">// IMPLEMENTED & SUPPORTED</span>
            <ul className="space-y-1 text-ink-muted">
              <li>✓ NIFTY 100 starting universe mapping</li>
              <li>✓ Yahoo Finance symbol collection</li>
              <li>✓ 82 usable aligned stocks</li>
              <li>✓ 609 × 82 daily log return matrix</li>
              <li>✓ Annualised expected returns & covariance matrix Σ</li>
              <li>✓ Equal-weight baseline (≈ 9.6% expected return)</li>
              <li>✓ 10,000 long-only random Monte Carlo portfolios</li>
              <li>✓ Weight normalization (Σ wᵢ = 1, wᵢ ≥ 0)</li>
              <li>✓ Portfolio expected return E[Rₚ] = wᵀ μ</li>
              <li>✓ Portfolio volatility σₚ = √(wᵀ Σ w)</li>
              <li>✓ Simplified return/volatility score E[Rₚ] / σₚ</li>
              <li>✓ Best sampled expected return = 15.27%</li>
              <li>✓ Best sampled volatility = 19.81%</li>
              <li>✓ Best simplified score = 0.7707</li>
              <li>✓ Risk/return scatter cloud & frontier intuition</li>
            </ul>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-amber-500/30">
            <span className="text-amber-300 font-bold block mb-2">// LIMITATIONS & NOT CLAIMED</span>
            <ul className="space-y-1 text-ink-muted">
              <li>✗ 0.7707 is NOT labelled a full Sharpe ratio (no R<sub>f</sub> subtraction)</li>
              <li>✗ Random sampling is NOT described as exact mathematical optimization</li>
              <li>✗ No unsupported individual stock weights invented</li>
              <li>✗ No unsupported future performance or alpha claimed</li>
              <li>✗ No transaction costs or rebalancing frequency assumed</li>
              <li>✗ No invented equal-weight volatility value</li>
              <li>✗ No claim of live production asset management deployment</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
