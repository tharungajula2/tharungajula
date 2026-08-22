"use client";

import { ProjectImplementationBadge, LimitationBadge } from "./Badges";

export default function DataPrepSection() {
  return (
    <section id="data-prep" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-purple-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 02 — DATA PREPARATION & LEAKAGE RISK
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            03. Four Preprocessing Pipeline Steps
          </h2>
          <ProjectImplementationBadge />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-1">1. DROP IDENTIFIERS</span>
            <p className="text-xs text-ink-muted">Remove CustomerId and Surname columns which carry no generalisable predictive signal.</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-1">2. ENCODE CATEGORIES</span>
            <p className="text-xs text-ink-muted">Convert categorical columns (Geography: France/Germany/Spain, Gender) to numeric encodings.</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-1">3. SCALE NUMERIC INPUTS</span>
            <p className="text-xs text-ink-muted">Standardise features with wide numeric ranges (Age ~ 40 vs Balance ~ £100k) so gradients stay balanced.</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-1">4. STRATIFIED TRAIN/TEST SPLIT</span>
            <p className="text-xs text-ink-muted">Preserve exact 20.37% churn proportion in both train and holdout evaluation sets.</p>
          </div>
        </div>

        {/* Limitation Box */}
        <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <LimitationBadge label="PREPROCESSING LEAKAGE RISK" />
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Outlier removal and scaling transformations occurred before the train/test split. In a production pipeline, transformation parameters (scaler mean/variance, outlier thresholds) must be computed on training data only and applied unchanged to validation/test sets to prevent data leakage.
          </p>
        </div>
      </div>
    </section>
  );
}
