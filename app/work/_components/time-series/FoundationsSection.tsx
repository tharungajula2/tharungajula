"use client";

import { ProjectDesignBadge, TeachingIllustrationBadge } from "./Badges";

export default function FoundationsSection() {
  return (
    <section id="foundations" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-rose-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 01 — TIME SERIES FOUNDATIONS & CHRONOLOGY
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. WHAT IS A TIME SERIES */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            01. What is a Time Series?
          </h2>
          <TeachingIllustrationBadge label="CORE CONCEPT" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          A time series is a sequence of quantitative measurements ordered continuously through time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-1">TABULAR CLASSIFICATION</span>
            <p className="text-ink-muted leading-relaxed">
              Rows are treated as independent, identically distributed observations. Shuffle-split is valid.
            </p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-1">TIME SERIES FORECASTING</span>
            <p className="text-ink-muted leading-relaxed">
              Position in time carries essential autocorrelation structure. Shuffling destroys temporal meaning.
            </p>
          </div>
        </div>

        <div className="bg-rose-500/20 border border-rose-500/40 p-3.5 rounded-xl text-xs font-mono text-rose-400 font-semibold">
          RULE: In forecasting, sequence is part of the data.
        </div>
      </div>

      {/* 2. CHRONOLOGICAL SPLIT & NO FUTURE LEAKAGE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            02. Chronological Split (No Future Leakage)
          </h2>
          <ProjectDesignBadge label="168 TRAIN / 36 TEST" />
        </div>

        {/* Visual Timeline */}
        <div className="bg-surface-sunken border border-hairline-faint p-5 rounded-xl mb-6 font-mono text-xs">
          <div className="text-ink-faint mb-2 text-[10px]">PAST ────────────────────────────────────────────────────────► FUTURE</div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 bg-blue-500/10 border border-blue-500/30 p-3.5 rounded-lg w-full text-center">
              <span className="text-blue-400 font-bold block">FIRST 168 MONTHS</span>
              <span className="text-ink-muted text-[11px]">TRAINING SET</span>
            </div>
            <span className="text-rose-400 font-bold">|</span>
            <div className="flex-1 bg-rose-500/10 border border-rose-500/30 p-3.5 rounded-lg w-full text-center">
              <span className="text-rose-400 font-bold block">LAST 36 MONTHS</span>
              <span className="text-ink-muted text-[11px]">FUTURE HOLDOUT EVALUATION</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs font-mono">
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-1">RANDOM SPLIT (INVALID)</span>
            <span className="text-ink-muted">Randomly samples rows across the timeline, leaking future information into past training.</span>
          </div>
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-1">CHRONOLOGICAL SPLIT (VALID)</span>
            <span className="text-ink-muted">Trains strictly on past history to forecast a contiguous future window.</span>
          </div>
        </div>

        <div className="bg-rose-500/20 border border-rose-500/40 p-3.5 rounded-xl text-xs font-mono text-rose-400 font-semibold">
          RULE: Do not let the future leak into the past.
        </div>
      </div>

      {/* 3. TREND, SEASONALITY & NOISE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            03. Trend, Seasonality & Irregular Noise
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint font-mono text-xs">
            <span className="text-rose-400 font-bold block mb-1">1. TREND</span>
            <p className="text-ink-muted leading-relaxed">Long-run upward or downward movement in the baseline series level over time.</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint font-mono text-xs">
            <span className="text-rose-400 font-bold block mb-1">2. SEASONALITY (m = 12)</span>
            <p className="text-ink-muted leading-relaxed">Repeating annual pattern occurring every 12 months in monthly prescription demand.</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint font-mono text-xs">
            <span className="text-rose-400 font-bold block mb-1">3. IRREGULAR NOISE</span>
            <p className="text-ink-muted leading-relaxed">Random short-term fluctuations not explained by systemic trend or seasonal cycle.</p>
          </div>
        </div>

        {/* Conceptual Visual SVG */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl font-mono text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-rose-400 font-bold">// CONCEPT VISUAL — NOT RAW PROJECT DATA</span>
            <TeachingIllustrationBadge />
          </div>
          <div className="w-full h-32 bg-surface-raised rounded-lg border border-hairline p-3 relative flex items-center justify-center">
            {/* Conceptual trend wave line SVG */}
            <svg className="w-full h-full text-rose-400" viewBox="0 0 300 80" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M 10 70 Q 30 50, 50 65 T 90 50 T 130 40 T 170 30 T 210 25 T 250 15 T 290 10" strokeDasharray="4 2" opacity="0.4" />
              <path d="M 10 75 L 30 55 L 45 65 L 60 45 L 80 60 L 100 40 L 120 50 L 140 30 L 160 40 L 180 25 L 200 35 L 220 15 L 240 25 L 265 10 L 290 15" />
              <line x1="220" y1="0" x2="220" y2="80" stroke="#f43f5e" strokeDasharray="3 3" strokeWidth="1.5" />
            </svg>
            <span className="absolute right-4 top-2 text-[10px] text-rose-400 bg-surface-raised px-2 py-0.5 rounded border border-rose-500/30">
              Future Holdout (36M)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
