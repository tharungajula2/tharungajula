import React from "react";
import { MasterclassHero, MasterFlow, TruthBoundary } from "@/components/masterclass";

export const metadata = {
  title: "Time Series Forecasting Masterclass | Portfolio Learning OS",
  description: "SARIMA modelling and chronological validation for monthly seasonal forecasting without lookahead leak.",
};

export default function TimeSeriesPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-8 text-ink font-sans space-y-10 pb-28 sm:pb-32">
      <MasterclassHero
        kicker="PORTFOLIO MASTERCLASS · FORECASTING"
        title="Time Series Forecasting"
        titleItalic="& SARIMA Models"
        objective="How do we forecast a monthly seasonal series without leaking future information across train and test splits?"
        tags={["204 Monthly Observations", "168 Train / 36 Test Split", "SARIMA Grid Search", "Chronological Validation"]}
        numbers={[
          { value: "204", label: "MONTHLY OBS" },
          { value: "168 / 36", label: "TRAIN / TEST SPLIT" },
          { value: "625", label: "SARIMA CANDIDATES" },
          { value: "(2,1,3)(1,1,3)₁₂", label: "SELECTED MODEL" },
          { value: "12.69%", label: "NAIVE MAPE" },
          { value: "7.90%", label: "SARIMA MAPE" },
        ]}
      />

      <MasterFlow
        title="TIME SERIES FORECASTING MASTERFLOW"
        nodes={[
          { step: "01", title: "Monthly Series", description: "204 monthly observations split strictly chronologically (168 train / 36 holdout test)" },
          { step: "02", title: "Stationarity", description: "ADF unit root tests & seasonal differencing (d=1, D=1) for trend & annual seasonality" },
          { step: "03", title: "ACF / PACF", description: "Autocorrelation & Partial Autocorrelation plots identifying AR and MA orders" },
          { step: "04", title: "Grid Search", description: "Systematic grid search evaluation across 625 candidate SARIMA parameter combinations" },
          { step: "05", title: "Model Selection", description: "Selection of (2,1,3)(1,1,3)₁₂ minimizing AIC / BIC & Ljung-Box residual white noise" },
          { step: "06", title: "Holdout Test", description: "Out-of-sample forecast evaluation: SARIMA 7.90% MAPE vs Seasonal-Naive 12.69% MAPE" },
        ]}
      />

      <TruthBoundary
        implemented={[
          "204 monthly observations with strict chronological train (168) / test (36) split.",
          "Grid search across 625 SARIMA candidate specifications.",
          "Selection of (2,1,3)(1,1,3)₁₂ based on AIC/BIC and residual independence.",
          "Out-of-sample MAPE improvement from 12.69% (seasonal-naive) to 7.90% (SARIMA).",
        ]}
        illustrative={[
          "Live real-time automated retraining pipeline is an architectural recommendation.",
        ]}
      />

      <div className="p-6 rounded-2xl bg-surface-raised border border-hairline font-mono text-xs text-ink-muted space-y-2 text-center">
        <span className="text-accent font-bold uppercase tracking-wider block">// MASTERCLASS UNDER DEVELOPMENT</span>
        <p className="font-sans text-sm">
          Interactive ACF/PACF visualizer and residual diagnostics chart will be built in upcoming packs.
        </p>
      </div>
    </div>
  );
}
