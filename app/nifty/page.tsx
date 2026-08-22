import React from "react";
import { MasterclassHero, MasterFlow, TruthBoundary } from "@/components/masterclass";

export const metadata = {
  title: "NIFTY Portfolio Masterclass | Portfolio Learning OS",
  description: "Covariance estimation, long-only portfolio simulation, and efficient frontier construction on NIFTY equities.",
};

export default function NiftyPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-8 text-ink font-sans space-y-10 pb-28 sm:pb-32">
      <MasterclassHero
        kicker="PORTFOLIO MASTERCLASS · QUANTITATIVE FINANCE"
        title="NIFTY Portfolio Construction"
        titleItalic="& Efficient Frontier"
        objective="How do multiple equity assets combine into a better risk/return trade-off through return covariance estimation?"
        tags={["NIFTY 100 Universe", "82 Usable Stocks", "609 x 82 Return Matrix", "10,000 Portfolio Simulations"]}
        numbers={[
          { value: "100", label: "STARTING UNIVERSE" },
          { value: "82", label: "USABLE STOCKS" },
          { value: "609 × 82", label: "RETURN MATRIX" },
          { value: "10,000", label: "SIMULATED WEIGHTS" },
          { value: "9.60%", label: "EQUAL-WEIGHT RET" },
          { value: "15.27%", label: "BEST SIMULATED RET" },
          { value: "19.81%", label: "VOLATILITY" },
          { value: "0.7707", label: "RET / VOL RATIO" },
        ]}
      />

      <MasterFlow
        title="NIFTY PORTFOLIO MASTERFLOW"
        nodes={[
          { step: "01", title: "Price Data", description: "Daily historical prices for NIFTY 100 stocks filtered to 82 usable equities" },
          { step: "02", title: "Returns", description: "Log returns calculation forming a 609 × 82 return matrix" },
          { step: "03", title: "Covariance", description: "Sample covariance matrix calculation capturing asset co-movements" },
          { step: "04", title: "Simulation", description: "Monte Carlo simulation of 10,000 long-only portfolio weight vectors" },
          { step: "05", title: "Frontier", description: "Mapping risk (volatility) vs return curve to identify efficient portfolios" },
          { step: "06", title: "Allocation", description: "Optimal weight selection balancing expected return against portfolio variance" },
        ]}
      />

      <TruthBoundary
        implemented={[
          "82 usable NIFTY 100 stocks across 609 daily price observations.",
          "Sample covariance matrix & annualised return estimation.",
          "10,000 long-only random portfolio simulations.",
          "Equal-weight baseline (9.6% return) vs optimal simulated portfolio (15.27% return, 19.81% volatility).",
        ]}
        illustrative={[
          "The return/volatility ratio (0.7707) is a simplified score, not a full risk-free adjusted Sharpe ratio.",
          "Random search is an educational approximation, not mathematical quadratic programming proof.",
        ]}
      />

      <div className="p-6 rounded-2xl bg-surface-raised border border-hairline font-mono text-xs text-ink-muted space-y-2 text-center">
        <span className="text-accent font-bold uppercase tracking-wider block">// MASTERCLASS UNDER DEVELOPMENT</span>
        <p className="font-sans text-sm">
          Interactive Efficient Frontier scatter plot visualizer will be added in upcoming packs.
        </p>
      </div>
    </div>
  );
}
