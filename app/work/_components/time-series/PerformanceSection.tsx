"use client";

import { ProjectDataBadge, DerivedMetricBadge } from "./Badges";

const storyStages = [
  { stage: "1. RAW SERIES", desc: "Upward trend + repeating annual seasonality." },
  { stage: "2. CHRONOLOGICAL SPLIT", desc: "168M train / 36M future holdout window." },
  { stage: "3. STATIONARITY TEST", desc: "ADF test confirms raw series unit root (p=1.0)." },
  { stage: "4. DIFFERENCING", desc: "Regular d=1 & seasonal D=1 at lag 12 (p=0.0)." },
  { stage: "5. 625 CANDIDATE GRID", desc: "Systematic search across SARIMA orders." },
  { stage: "6. AIC SELECTION", desc: "Selected SARIMA(2,1,3)(1,1,3)₁₂ model." },
  { stage: "7. LJUNG–BOX CHECK", desc: "Residual diagnostics verify no unmodelled structure." },
  { stage: "8. ROLLING FORECAST", desc: "Rolling 12M forecasts across 36M holdout." },
  { stage: "9. PERFORMANCE RESULT", desc: "7.90% SARIMA MAPE vs 12.69% Seasonal Naive." },
];

export default function PerformanceSection() {
  return (
    <section id="performance" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-rose-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 06 — PROJECT PERFORMANCE & CENTRAL FORECASTING STORY
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. ACCURACY RESULTS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            15. Forecast Accuracy Performance
          </h2>
          <ProjectDataBadge label="36-MONTH EVALUATION" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-ink-muted text-[10px] block mb-1">SEASONAL-NAIVE BASELINE</span>
            <div className="text-2xl font-bold text-rose-400 mb-1">12.69%</div>
            <p className="text-ink-muted text-[11px]">Benchmark 12-month seasonal lag rule.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-rose-500/40">
            <span className="text-rose-400 text-[10px] font-bold block mb-1">SELECTED SARIMA MODEL</span>
            <div className="text-2xl font-bold text-ink mb-1">7.90%</div>
            <p className="text-ink-muted text-[11px]">SARIMA(2,1,3)(1,1,3)₁₂ rolling MAPE.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-emerald-500/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-emerald-400 font-bold">RELATIVE REDUCTION</span>
              <DerivedMetricBadge />
            </div>
            <div className="text-2xl font-bold text-emerald-400 mb-1">~ 37.7%</div>
            <p className="text-ink-muted text-[11px]">Relative MAPE reduction over baseline.</p>
          </div>
        </div>
      </div>

      {/* 2. CENTRAL PROJECT STORY */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4">
          16. The Central Project Reconstruction Story
        </h2>
        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Reconstruct the end-to-end forecasting methodology from raw series observation to validated baseline comparison.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {storyStages.map((s) => (
            <div key={s.stage} className="bg-surface-sunken border border-hairline-faint p-3.5 rounded-xl">
              <span className="text-rose-400 font-bold block mb-1">{s.stage}</span>
              <span className="text-ink-muted text-[11px] leading-relaxed">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
