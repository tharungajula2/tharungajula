"use client";

import { ProjectDataBadge, DerivedMetricBadge, TeachingIllustrationBadge } from "./Badges";

export default function ConfusionMatrixSection() {
  return (
    <section id="confusion-matrix" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-purple-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 05 — CONFUSION MATRICES & ERROR EVALUATION
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. CONFUSION MATRIX DEFINITION & BUSINESS IMPACT */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            09. Confusion Matrix Structure & Error Costs
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl">
            <span className="text-xs font-bold text-rose-400 block mb-1">FALSE NEGATIVE (FN) — MISSED CHURNER</span>
            <p className="text-ink-muted leading-relaxed">
              Model predicted stay (0), but customer actually churned (1). <strong>Cost:</strong> Missed retention opportunity and lost customer revenue.
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl">
            <span className="text-xs font-bold text-amber-400 block mb-1">FALSE POSITIVE (FP) — UNNECESSARY CONTACT</span>
            <p className="text-ink-muted leading-relaxed">
              Model predicted churn (1), but customer actually stayed (0). <strong>Cost:</strong> Outreach contact effort and potential unnecessary incentive cost.
            </p>
          </div>
        </div>

        <div className="bg-purple-500/20 border border-purple-500/40 p-3.5 rounded-xl text-xs font-mono text-purple-400 font-semibold">
          RULE: False Negative = missed churner. False Positive = unnecessary contact intervention.
        </div>
      </div>

      {/* 2. ACTUAL BASELINE MATRIX */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            10. Actual Baseline SGD Confusion Matrix
          </h2>
          <ProjectDataBadge label="BASELINE MODEL" />
        </div>

        {/* 2x2 Table */}
        <div className="bg-surface-sunken border border-hairline-faint rounded-xl overflow-hidden mb-6 font-mono text-xs">
          <div className="grid grid-cols-3 text-center border-b border-hairline-faint bg-surface-raised font-bold">
            <div className="p-3 border-r border-hairline-faint text-ink-faint">ACTUAL \ PREDICTED</div>
            <div className="p-3 border-r border-hairline-faint text-ink">PREDICT STAY (0)</div>
            <div className="p-3 text-purple-400">PREDICT CHURN (1)</div>
          </div>

          <div className="grid grid-cols-3 text-center border-b border-hairline-faint">
            <div className="p-4 border-r border-hairline-faint font-bold text-emerald-400 bg-surface-raised flex items-center justify-center">ACTUAL STAY (0)</div>
            <div className="p-4 border-r border-hairline-faint bg-surface-raised">
              <span className="text-sm font-bold text-ink block">TN = 1486</span>
              <span className="text-[10px] text-ink-muted">True Negative</span>
            </div>
            <div className="p-4 bg-amber-500/10">
              <span className="text-sm font-bold text-amber-400 block">FP = 50</span>
              <span className="text-[10px] text-amber-300">False Positive</span>
            </div>
          </div>

          <div className="grid grid-cols-3 text-center">
            <div className="p-4 border-r border-hairline-faint font-bold text-rose-400 bg-surface-raised flex items-center justify-center">ACTUAL CHURN (1)</div>
            <div className="p-4 border-r border-hairline-faint bg-rose-500/10">
              <span className="text-sm font-bold text-rose-400 block">FN = 204</span>
              <span className="text-[10px] text-rose-300">False Negative</span>
            </div>
            <div className="p-4 bg-surface-raised">
              <span className="text-sm font-bold text-purple-400 block">TP = 186</span>
              <span className="text-[10px] text-ink-muted">True Positive</span>
            </div>
          </div>
        </div>

        {/* Derived Calculations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint font-mono text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-purple-400 font-bold">BASELINE RECALL</span>
              <ProjectDataBadge label="REPORTED 0.48" />
            </div>
            <div className="text-base font-bold text-ink mb-1">186 / (186 + 204) = 186 / 390 = 0.4769</div>
            <p className="text-[11px] text-ink-muted">Caught 48% of actual churners in holdout test set.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint font-mono text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-purple-400 font-bold">BASELINE PRECISION</span>
              <DerivedMetricBadge />
            </div>
            <div className="text-base font-bold text-ink mb-1">186 / (186 + 50) = 186 / 236 = 0.7881</div>
            <p className="text-[11px] text-ink-muted">79% of flagged predictions were actual churners.</p>
          </div>
        </div>
      </div>

      {/* 3. ACTUAL SMOTE MATRIX */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            11. Actual SMOTE Model Confusion Matrix
          </h2>
          <ProjectDataBadge label="SMOTE MODEL" />
        </div>

        {/* 2x2 Table */}
        <div className="bg-surface-sunken border border-hairline-faint rounded-xl overflow-hidden mb-6 font-mono text-xs">
          <div className="grid grid-cols-3 text-center border-b border-hairline-faint bg-surface-raised font-bold">
            <div className="p-3 border-r border-hairline-faint text-ink-faint">ACTUAL \ PREDICTED</div>
            <div className="p-3 border-r border-hairline-faint text-ink">PREDICT STAY (0)</div>
            <div className="p-3 text-purple-400">PREDICT CHURN (1)</div>
          </div>

          <div className="grid grid-cols-3 text-center border-b border-hairline-faint">
            <div className="p-4 border-r border-hairline-faint font-bold text-emerald-400 bg-surface-raised flex items-center justify-center">ACTUAL STAY (0)</div>
            <div className="p-4 border-r border-hairline-faint bg-surface-raised">
              <span className="text-sm font-bold text-ink block">TN = 1253</span>
              <span className="text-[10px] text-ink-muted">True Negative</span>
            </div>
            <div className="p-4 bg-amber-500/10">
              <span className="text-sm font-bold text-amber-400 block">FP = 283</span>
              <span className="text-[10px] text-amber-300">False Positive</span>
            </div>
          </div>

          <div className="grid grid-cols-3 text-center">
            <div className="p-4 border-r border-hairline-faint font-bold text-rose-400 bg-surface-raised flex items-center justify-center">ACTUAL CHURN (1)</div>
            <div className="p-4 border-r border-hairline-faint bg-rose-500/10">
              <span className="text-sm font-bold text-rose-400 block">FN = 98</span>
              <span className="text-[10px] text-rose-300">False Negative</span>
            </div>
            <div className="p-4 bg-surface-raised">
              <span className="text-sm font-bold text-purple-400 block">TP = 292</span>
              <span className="text-[10px] text-ink-muted">True Positive</span>
            </div>
          </div>
        </div>

        {/* Derived Calculations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint font-mono text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-purple-400 font-bold">SMOTE RECALL</span>
              <ProjectDataBadge label="REPORTED 0.75" />
            </div>
            <div className="text-base font-bold text-ink mb-1">292 / (292 + 98) = 292 / 390 = 0.7487</div>
            <p className="text-[11px] text-ink-muted">Caught 75% of actual churners in holdout test set.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint font-mono text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-purple-400 font-bold">SMOTE PRECISION</span>
              <ProjectDataBadge label="REPORTED 0.51" />
            </div>
            <div className="text-base font-bold text-ink mb-1">292 / (292 + 283) = 292 / 575 = 0.5078</div>
            <p className="text-[11px] text-ink-muted">51% of flagged predictions were actual churners.</p>
          </div>
        </div>
      </div>

      {/* 4. SIDE-BY-SIDE TRADE-OFF VISUAL */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
          12. The Core Project Trade-Off (Baseline vs SMOTE)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken border border-hairline-faint p-5 rounded-xl">
            <span className="text-xs font-bold text-ink block mb-3">// BASELINE SGD MODEL</span>
            <ul className="space-y-2">
              <li className="flex justify-between"><span>Missed Churners (FN):</span><strong className="text-rose-400">204</strong></li>
              <li className="flex justify-between"><span>False Alarms (FP):</span><strong className="text-amber-400">50</strong></li>
              <li className="flex justify-between border-t border-hairline-faint pt-2"><span>Churn Recall:</span><strong className="text-purple-400">0.48 (48%)</strong></li>
            </ul>
          </div>

          <div className="bg-surface-sunken border border-purple-500/40 p-5 rounded-xl">
            <span className="text-xs font-bold text-purple-400 block mb-3">// SMOTE MODEL</span>
            <ul className="space-y-2">
              <li className="flex justify-between"><span>Missed Churners (FN):</span><strong className="text-emerald-400">98 (-106 missed)</strong></li>
              <li className="flex justify-between"><span>False Alarms (FP):</span><strong className="text-rose-400">283 (+233 contacts)</strong></li>
              <li className="flex justify-between border-t border-hairline-faint pt-2"><span>Churn Recall:</span><strong className="text-purple-400">0.75 (75%)</strong></li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-500/20 border border-purple-500/40 p-4 rounded-xl text-xs font-mono text-purple-400 font-semibold text-center">
          SMOTE does not create a free improvement — it explicitly exchanges 233 more false positive contacts for 106 fewer missed churners.
        </div>
      </div>
    </section>
  );
}
