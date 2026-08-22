"use client";

import { ProjectDataBadge, ProjectImplementationBadge, TeachingIllustrationBadge } from "./Badges";

const variants = [
  { name: "1. BASELINE SGD", desc: "Initial feed-forward network trained with Stochastic Gradient Descent." },
  { name: "2. ADAM OPTIMISER", desc: "Adaptive moment estimation optimizer for faster, smoother convergence." },
  { name: "3. DROPOUT VARIANT", desc: "Regularised architecture disabling random hidden nodes during training." },
  { name: "4. TUNED MODEL", desc: "Hyperparameter-tuned network with highest overall discrimination." },
  { name: "5. SMOTE MODEL", desc: "Trained on SMOTE over-sampled data to maximize minority churn recall." },
];

export default function ModelVariantsSmoteSection() {
  return (
    <section id="variants-smote" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-purple-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 04 — MODEL VARIANTS & SMOTE OVER-SAMPLING
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. MODEL VARIANTS SEQUENCE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            07. Five Model Progression Variants
          </h2>
          <ProjectImplementationBadge />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6 font-mono text-xs">
          {variants.map((v) => (
            <div key={v.name} className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint flex flex-col justify-between">
              <div>
                <span className="text-purple-400 font-bold block mb-1">{v.name}</span>
                <span className="text-ink-muted text-[11px] leading-relaxed">{v.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-sunken border border-purple-500/30 p-4 rounded-xl text-xs font-mono text-ink-muted">
          <strong className="text-purple-400">Model Selection Note:</strong> The tuned model exhibits slightly stronger overall discrimination (ROC-AUC), while the SMOTE model is selected specifically for the high churn-recall operating objective.
        </div>
      </div>

      {/* 2. WHAT IS SMOTE? */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            08. Synthetic Minority Over-sampling Technique (SMOTE)
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          SMOTE synthesises new minority-class (churn) examples by interpolating between nearest neighbours in feature space rather than simply duplicating rows.
        </p>

        {/* SMOTE Teaching Visual */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6 font-mono text-xs">
          <div className="text-purple-400 font-bold mb-3">// SYNTHETIC FEATURE-SPACE INTERPOLATION</div>
          <div className="flex items-center justify-center gap-4 py-4 bg-surface-raised rounded-lg border border-hairline">
            <span className="text-rose-400 font-bold">Churner A (Real) ●</span>
            <span className="text-purple-400 font-bold">─── Synthetic Point ● ───</span>
            <span className="text-rose-400 font-bold">● Churner B (Real)</span>
          </div>
        </div>

        {/* Training Data Only Rule */}
        <div className="bg-purple-500/20 border border-purple-500/40 p-4 rounded-xl mb-4">
          <div className="flex items-center gap-2 mb-1">
            <ProjectDataBadge label="TRAINING DATA ONLY" />
            <span className="text-xs font-mono font-bold text-purple-400">STRICT EVALUATION BOUNDARY</span>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            SMOTE must be applied <strong>ONLY to the training dataset</strong>. The holdout test set must remain completely untouched to preserve the realistic 20.37% population churn rate during evaluation.
          </p>
        </div>
      </div>
    </section>
  );
}
