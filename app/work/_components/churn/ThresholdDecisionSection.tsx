"use client";

import { ProjectDataBadge, TeachingIllustrationBadge } from "./Badges";

export default function ThresholdDecisionSection() {
  return (
    <section id="threshold-decision" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-purple-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 06 — THRESHOLDS & BUSINESS DECISION ECONOMICS
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. PRECISION VS RECALL TRADE-OFF */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            13. Precision vs Recall Decision Economics
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-2">WHEN RECALL MATTERS MORE</span>
            <p className="text-xs text-ink-muted leading-relaxed">
              When missing a real churner is expensive (high customer lifetime value) relative to the cost of outreach. High recall ensures maximum churn capture.
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-2">WHEN PRECISION MATTERS MORE</span>
            <p className="text-xs text-ink-muted leading-relaxed">
              When acting on false alarms is expensive (costly retention discounts/gifts or limited call center capacity). High precision avoids wasted outreach.
            </p>
          </div>
        </div>

        <div className="bg-purple-500/20 border border-purple-500/40 p-3.5 rounded-xl text-xs font-mono text-purple-400 font-semibold">
          PROJECT CONTEXT: If customer lifetime value is high and contact effort is cheap, selecting the SMOTE model for higher recall (0.75 vs 0.48) is a rational business operating choice.
        </div>
      </div>

      {/* 2. ROC-AUC & THRESHOLD TUNING */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            14. ROC-AUC & Decision Thresholds
          </h2>
          <ProjectDataBadge label="ROC-AUC 0.8515" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-purple-400 font-bold block mb-1">HEADLINE ROC-AUC (0.8515)</span>
            <p className="text-ink-muted leading-relaxed mb-2">
              Measures the network's overall capability to rank churners above non-churners across all possible decision thresholds.
            </p>
            <div className="text-[10px] text-purple-400">ROC/AUC = all thresholds. Confusion matrix = one threshold.</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-purple-400 font-bold block mb-1">DECISION THRESHOLD TUNING</span>
            <p className="text-ink-muted leading-relaxed mb-2">
              The network outputs a probability (e.g. p = 0.67). Operating decisions require choosing a cutoff threshold.
            </p>
            <div className="text-[10px] text-purple-400">Default 0.50 is an arbitrary mathematical split, not a law.</div>
          </div>
        </div>

        {/* Threshold Shift Diagram */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-4 font-mono text-xs">
          <div className="text-purple-400 font-bold mb-3">// THRESHOLD DIRECTIONAL TENDENCY</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-surface-raised p-3 rounded border border-hairline">
              <span className="text-amber-400 font-bold block mb-1">HIGH THRESHOLD (e.g. 0.70)</span>
              <span className="text-ink-muted text-[11px]">Fewer customer flags → ↑ Precision tendency, ↓ Recall tendency.</span>
            </div>
            <div className="bg-surface-raised p-3 rounded border border-hairline">
              <span className="text-emerald-400 font-bold block mb-1">LOW THRESHOLD (e.g. 0.30)</span>
              <span className="text-ink-muted text-[11px]">More customer flags → ↑ Recall tendency, ↓ Precision tendency.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PRODUCTION EXTENSIONS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            15. Production Extensions & Next Steps
          </h2>
          <TeachingIllustrationBadge label="TEACHING EXTENSIONS" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-purple-400 font-bold block mb-1">PROBABILITY CALIBRATION</span>
            <span className="text-ink-muted text-[11px]">Recalibrating probabilities post-SMOTE to reflect real-world prevalence.</span>
          </div>
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-purple-400 font-bold block mb-1">DRIFT MONITORING</span>
            <span className="text-ink-muted text-[11px]">Tracking feature and target prevalence shift over live operational batches.</span>
          </div>
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-purple-400 font-bold block mb-1">SHAP EXPLAINABILITY</span>
            <span className="text-ink-muted text-[11px]">Extracting feature-level contribution drivers for individual customer alerts.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
