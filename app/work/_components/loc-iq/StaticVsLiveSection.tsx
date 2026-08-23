"use client";

import { LimitationBadge, ProductionExtensionBadge } from "./Badges";

export default function StaticVsLiveSection() {
  return (
    <section id="static-vs-live" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-cyan-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 06 — RULE ENGINE VS ML MODEL & PROBABILITY CALIBRATION
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. RULE LOGIC VS ML MODEL */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            11. Rule-Based Weighting vs Empirical Machine Learning
          </h2>
          <LimitationBadge label="NO ML MODEL CLAIMED" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          LOC-IQ implements explicit developer-defined weighting rules (base × recency × trust). It does NOT contain an empirically trained ML model.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">EXPLICIT RULE ENGINE (LOC-IQ)</span>
            <p className="text-ink-muted leading-relaxed">
              Calculates deterministic composite weights using explicit multipliers. Fully transparent, configurable, and inspectable.
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">MACHINE LEARNING MODEL (NOT BUILT)</span>
            <p className="text-ink-muted leading-relaxed">
              Learns model parameters statistically from large historical training datasets of labeled default/fraud outcomes.
            </p>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl text-xs font-mono text-amber-300 font-semibold">
          RULE: A numerical score is not automatically machine learning.
        </div>
      </div>

      {/* 2. WHAT AN EMPIRICAL MODEL WOULD REQUIRE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            12. Requirements for an Empirical Production ML Model
          </h2>
          <ProductionExtensionBadge label="PRODUCTION EXTENSION" />
        </div>

        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl font-mono text-xs mb-4">
          <div className="text-indigo-400 font-bold mb-2">// PRODUCTION ML PIPELINE REQUIREMENTS</div>
          <div className="flex flex-wrap items-center gap-2 text-ink-muted text-[11px]">
            <span>Labeled Historical Data</span>
            <span className="text-indigo-400">→</span>
            <span>Feature Extraction</span>
            <span className="text-indigo-400">→</span>
            <span>Train/Validation Split</span>
            <span className="text-indigo-400">→</span>
            <span>Model Training & Calibration</span>
            <span className="text-indigo-400">→</span>
            <span>Drift Monitoring</span>
          </div>
        </div>
      </div>
    </section>
  );
}
