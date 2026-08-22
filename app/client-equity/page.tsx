import React from "react";
import { MasterclassHero, MasterFlow, TruthBoundary } from "@/components/masterclass";

export const metadata = {
  title: "Client Equity Framework Masterclass | Portfolio Learning OS",
  description: "Cross-sectional factor ranking, turnover controls, and portfolio robustness testing framework.",
};

export default function ClientEquityPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-8 text-ink font-sans space-y-10 pb-28 sm:pb-32">
      <MasterclassHero
        kicker="PORTFOLIO MASTERCLASS · QUANTITATIVE EQUITY"
        title="Client Equity Framework"
        titleItalic="& Factor Testing Engine"
        objective="How do factor signals become a controlled, testable portfolio construction process across cross-sectional equity universes?"
        tags={["US CRSP Universe", "Cross-Sectional Factors", "Turnover Controls", "Robustness Engine"]}
        numbers={[
          { value: "US CRSP", label: "STOCK UNIVERSE" },
          { value: "MULTI-FACTOR", label: "SIGNAL LAYER" },
          { value: "SECTOR-NEUTRAL", label: "PORTFOLIO CONTROLS" },
          { value: "TURNOVER", label: "REBALANCING CAPS" },
          { value: "ROBUSTNESS", label: "EVALUATION ENGINE" },
        ]}
      />

      <MasterFlow
        title="CLIENT EQUITY FRAMEWORK MASTERFLOW"
        nodes={[
          { step: "01", title: "Universe", description: "US CRSP equity universe filtering for liquidity & data completeness" },
          { step: "02", title: "Factor Signals", description: "Value, momentum, quality & volatility factor signal extraction" },
          { step: "03", title: "Ranking", description: "Cross-sectional z-score standardization & sector-neutral ranking" },
          { step: "04", title: "Portfolio", description: "Long-only top-decile portfolio construction with position constraints" },
          { step: "05", title: "Turnover Controls", description: "Transaction cost modeling & rebalancing buffer constraints" },
          { step: "06", title: "Robustness", description: "Sharpe, Sortino, max drawdown, tracking error & CAPM alpha evaluation" },
        ]}
      />

      <TruthBoundary
        implemented={[
          "Python quantitative testing & backtesting evaluation framework.",
          "Cross-sectional factor z-scoring, sector neutralization & rank aggregation.",
          "Turnover control rebalancing buffers & position size caps.",
          "Robustness metrics calculation engine (Sortino, max drawdown, tracking error, CAPM multi-factor regression).",
        ]}
        illustrative={[
          "Strategy concepts and datasets were supplied by the client.",
          "No headline strategy return is displayed because the source does not support an explicit public benchmark claim.",
        ]}
      />

      <div className="p-6 rounded-2xl bg-surface-raised border border-hairline font-mono text-xs text-ink-muted space-y-2 text-center">
        <span className="text-accent font-bold uppercase tracking-wider block">// MASTERCLASS UNDER DEVELOPMENT</span>
        <p className="font-sans text-sm">
          Detailed factor breakdown and robust backtest metrics workbench will be added in upcoming packs.
        </p>
      </div>
    </div>
  );
}
