"use client";

import { CorePrincipleBadge, TeachingIllustrationBadge } from "./Badges";

export default function MethodSliceEvidenceSection() {
  return (
    <section id="method-slice-evidence" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASES 04–06 — METHOD, THIN SLICE & EVIDENCE
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. CHOOSE THE METHOD */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            04. Choose the Method: Match Problem Structure
          </h2>
          <CorePrincipleBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Choose the simplest method that properly represents the problem structure. Not every problem needs ML.
        </p>

        {/* 3 Columns Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">1. EXPLICIT RULE ENGINE</span>
            <p className="text-ink-muted text-[11px] leading-relaxed mb-2">
              Developer explicitly defines logic in code (e.g. LOC-IQ composite edge weight = base × recency × trust).
            </p>
            <div className="text-[10px] text-accent font-bold">Use when: Logic itself is the product.</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">2. STATISTICAL MODEL</span>
            <p className="text-ink-muted text-[11px] leading-relaxed mb-2">
              Parameters estimated under statistical assumptions (e.g. Logistic Regression scorecard, SARIMA time series).
            </p>
            <div className="text-[10px] text-accent font-bold">Use when: Interpretability & statistical rigor required.</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">3. MACHINE LEARNING</span>
            <p className="text-ink-muted text-[11px] leading-relaxed mb-2">
              Learns flexible non-linear representations from training data (e.g. Keras Neural Network for Churn).
            </p>
            <div className="text-[10px] text-accent font-bold">Use when: Learning from complex data required.</div>
          </div>
        </div>

        <div className="bg-accent/15 border border-accent/30 p-3.5 rounded-xl text-xs font-mono text-accent font-semibold">
          RULE: Use ML when learning from data is required. Use explicit rules when the logic itself is the product.
        </div>
      </div>

      {/* 2. BUILD THE THIN SLICE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            05. Build the Thin Slice: Smallest End-to-End Path
          </h2>
          <CorePrincipleBadge label="THIN SLICE" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Implement the smallest end-to-end slice proving the core system works before adding broad extensions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs mb-4">
          <div className="bg-surface-sunken p-4 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block mb-1">PROTOTYPE / DEMO SLICE</span>
            <p className="text-ink-muted text-[11px] leading-relaxed">
              Proves core concept, user interaction, flow, and technical feasibility (e.g. 1 scenario trace in LOC-IQ).
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-indigo-500/30">
            <span className="text-indigo-400 font-bold block mb-1">PRODUCTION SYSTEM</span>
            <p className="text-ink-muted text-[11px] leading-relaxed">
              Adds reliability, monitoring, auditability, data privacy governance, scale, and maintenance ownership.
            </p>
          </div>
        </div>

        <div className="bg-accent/15 border border-accent/30 p-3.5 rounded-xl text-xs font-mono text-accent font-semibold">
          RULE: End-to-end small beats partially built large. A working demo proves the idea; it does not automatically prove production readiness.
        </div>
      </div>

      {/* 3. CREATE EVIDENCE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            06. Create Evidence: Validation vs Testing
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl font-mono text-xs text-center mb-6">
          <div className="text-accent font-bold mb-2">// EVIDENCE FRAMEWORK</div>
          <div className="flex items-center justify-center gap-3 text-ink-muted text-[11px]">
            <span>EXPECTED</span>
            <span className="text-accent">→</span>
            <span>ACTUAL</span>
            <span className="text-accent">→</span>
            <span>DIFFERENCE</span>
            <span className="text-accent">→</span>
            <span>EXPLANATION</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">VALIDATION (MODEL)</span>
            <p className="text-ink-muted text-[11px] leading-relaxed">
              Does the method represent the problem well? (AUC, calibration, residual diagnostics, holdout performance).
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">TESTING (SYSTEM)</span>
            <p className="text-ink-muted text-[11px] leading-relaxed">
              Does the implemented code behave as intended? (UI flows, API responses, edge-case assertions).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
