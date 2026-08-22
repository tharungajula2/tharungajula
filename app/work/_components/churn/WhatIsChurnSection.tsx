"use client";

import { ProjectDataBadge, TeachingIllustrationBadge } from "./Badges";

export default function WhatIsChurnSection() {
  return (
    <section id="what-is-churn" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-purple-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 01 — BUSINESS PROBLEM & CLASS IMBALANCE
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. TARGET DEFINITION */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            01. Target Definition & Binary Classification
          </h2>
          <TeachingIllustrationBadge label="CORE CONCEPT" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          The goal is predicting whether a customer will close their account or exit the bank within six months.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl">
            <div className="text-xs font-mono font-bold text-rose-400 mb-1">EXITED = 1 (CHURN)</div>
            <p className="text-xs text-ink-muted">Customer closed account or transferred balances out within observation window.</p>
          </div>
          <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl">
            <div className="text-xs font-mono font-bold text-emerald-400 mb-1">EXITED = 0 (STAY)</div>
            <p className="text-xs text-ink-muted">Customer maintained active banking relationship and balances.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-surface-sunken rounded-lg border border-hairline-faint">
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block mb-1">FEATURE</span>
            <span className="text-xs text-ink">Customer attribute (age, balance, credit score, products).</span>
          </div>
          <div className="p-3 bg-surface-sunken rounded-lg border border-hairline-faint">
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block mb-1">TARGET</span>
            <span className="text-xs text-ink">Binary outcome (1 or 0) being predicted.</span>
          </div>
          <div className="p-3 bg-surface-sunken rounded-lg border border-hairline-faint">
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block mb-1">MODEL</span>
            <span className="text-xs text-ink">Learned mathematical mapping from features to target.</span>
          </div>
          <div className="p-3 bg-surface-sunken rounded-lg border border-hairline-faint">
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block mb-1">PREDICTION</span>
            <span className="text-xs text-ink">Estimated probability of churn P(Exited=1).</span>
          </div>
        </div>
      </div>

      {/* 2. WHY CLASS IMBALANCE MATTERS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            02. Class Imbalance & The Accuracy Trap
          </h2>
          <ProjectDataBadge label="10,000 CUSTOMERS" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          The dataset contains 10,000 retail banking customers with a strong minority class imbalance.
        </p>

        {/* Visual Class Bar */}
        <div className="bg-surface-sunken border border-hairline-faint p-5 rounded-xl mb-6">
          <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs font-bold">
            <span className="text-emerald-400">STAY (79.63%) — 7,963 CUSTOMERS</span>
            <span className="text-rose-400">CHURN (20.37%) — 2,037 CUSTOMERS</span>
          </div>
          <div className="w-full h-4 bg-surface-raised rounded-full overflow-hidden flex border border-hairline-faint mb-3">
            <div className="h-full bg-emerald-500/60" style={{ width: "79.63%" }} />
            <div className="h-full bg-rose-500/80" style={{ width: "20.37%" }} />
          </div>
        </div>

        {/* Accuracy Trap Explanation */}
        <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl mb-6">
          <span className="text-xs font-mono font-bold text-rose-400 block mb-1">// THE NAIVE ACCURACY TRAP</span>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            A naive model predicting <strong>"Stay" (0)</strong> for every single customer would achieve <strong>79.63% overall accuracy</strong> without detecting a single actual churner (0% recall). Therefore, accuracy alone is insufficient for evaluating churn detection models.
          </p>
        </div>

        <div className="bg-purple-500/20 border border-purple-500/40 p-3.5 rounded-xl text-xs font-mono text-purple-400 font-semibold">
          RULE: High overall accuracy can hide complete failure to detect the minority churn class.
        </div>
      </div>
    </section>
  );
}
