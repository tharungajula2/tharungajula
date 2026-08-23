"use client";

import { ProjectDesignBadge, TeachingIllustrationBadge } from "./Badges";

export default function RollingForecastSection() {
  return (
    <section id="rolling-forecast" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-rose-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 05 — ROLLING FORECASTS, BASELINE & MAPE
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. ROLLING FORECASTING FLOW */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            13. Rolling 12-Month Forecast Evaluation
          </h2>
          <ProjectDesignBadge label="36-MONTH HOLDOUT WINDOW" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Instead of predicting a single static 36-month horizon, the model produces rolling 12-month forecasts, updating available historical context as time moves forward.
        </p>

        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6 font-mono text-xs">
          <div className="text-rose-400 font-bold mb-3">// ROLLING EVALUATION PROCESS</div>
          <div className="flex flex-wrap items-center gap-2 text-center">
            <div className="p-2 bg-surface-raised rounded border border-hairline flex-1">
              <span className="text-rose-400 font-bold block">168M History</span>
              <span className="text-[10px] text-ink-muted">Forecast M1–M12</span>
            </div>
            <span className="text-rose-400">→</span>
            <div className="p-2 bg-surface-raised rounded border border-hairline flex-1">
              <span className="text-rose-400 font-bold block">+ Add M1–M12 History</span>
              <span className="text-[10px] text-ink-muted">Forecast M13–M24</span>
            </div>
            <span className="text-rose-400">→</span>
            <div className="p-2 bg-surface-raised rounded border border-hairline flex-1">
              <span className="text-rose-400 font-bold block">+ Add M13–M24 History</span>
              <span className="text-[10px] text-ink-muted">Forecast M25–M36</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEASONAL-NAIVE BASELINE & MAPE FORMULA */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            14. Seasonal-Naive Baseline & MAPE Metric
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          {/* Seasonal Naive */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-2">// SEASONAL-NAIVE BASELINE RULE</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2">
              Forecast_t = Actual_(t−12)
            </div>
            <p className="text-ink-muted leading-relaxed">
              Predicts current month using exact prescription volume from same month one year prior. Benchmark rule for complex models.
            </p>
          </div>

          {/* MAPE */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-2">// MEAN ABSOLUTE PERCENTAGE ERROR (MAPE)</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2">
              MAPE = mean( |(y − ŷ) / y| ) × 100
            </div>
            <p className="text-ink-muted leading-relaxed">
              Measures average percentage forecast miss across all evaluation months. Example: Actual y=100, Forecast ŷ=92 → Error = 8%.
            </p>
          </div>
        </div>

        <div className="bg-rose-500/20 border border-rose-500/40 p-3.5 rounded-xl text-xs font-mono text-rose-400 font-semibold">
          RULE: A forecast is only impressive relative to a sensible baseline. MAPE measures average percentage forecast miss.
        </div>
      </div>
    </section>
  );
}
