"use client";

import { motion } from "framer-motion";
import { ProjectDataBadge } from "./Badges";

const tags = [
  "NIFTY 100 Universe",
  "82 Aligned Stocks",
  "609×82 Return Matrix",
  "Covariance Matrix Σ",
  "10,000 Monte Carlo Portfolios",
  "Long-Only Constraints",
];

const headlineMetrics = [
  { label: "Usable Stocks", value: "82" },
  { label: "Return Matrix", value: "609 × 82" },
  { label: "Sampled Portfolios", value: "10,000" },
  { label: "Equal-Weight Return", value: "≈ 9.6%" },
  { label: "Best Sampled Return", value: "15.27%" },
  { label: "Best Sampled Volatility", value: "19.81%" },
  { label: "Best Simplified Score", value: "0.7707" },
];

const topFlowSteps = [
  "DEFINE UNIVERSE",
  "COLLECT PRICES",
  "ALIGN DATA",
  "CONVERT TO RETURNS",
  "ESTIMATE RETURN + COVARIANCE",
  "BUILD BASELINE",
  "SAMPLE WEIGHTS",
  "CALCULATE PORTFOLIOS",
  "READ RISK / RETURN TRADE-OFF",
];

export default function HeroSection() {
  return (
    <div className="mb-16">
      {/* KICKER & TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-teal-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
            PORTFOLIO CONSTRUCTION // COVARIANCE · DIVERSIFICATION
          </span>
          <div className="h-px flex-1 bg-hairline-faint" />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-4">
          NIFTY 100 Portfolio Study
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl mb-6">
          Combine multiple assets into a portfolio with a better return/risk trade-off instead of trying to predict which single stock will outperform.
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-full bg-surface-raised border border-hairline text-ink font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* HEADLINE METRICS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {headlineMetrics.map((m) => (
            <div
              key={m.label}
              className="bg-surface-raised border border-hairline p-3.5 rounded-xl flex flex-col justify-between"
            >
              <div className="mb-1">
                <ProjectDataBadge />
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-teal-400">
                {m.value}
              </div>
              <div className="text-[11px] font-mono text-ink-muted mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* MASTER FLOW */}
      <div className="bg-surface-raised border border-teal-500/30 p-5 sm:p-6 rounded-2xl mb-8 backdrop-blur-xl">
        <div className="text-xs font-mono text-teal-400 uppercase tracking-widest mb-3 font-bold">
          // MASTER PORTFOLIO FLOW
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
          {topFlowSteps.map((step, idx) => (
            <span key={step} className="flex items-center gap-2">
              <span className="text-teal-400 font-bold">{step}</span>
              {idx < topFlowSteps.length - 1 && (
                <span className="text-ink-faint">→</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
