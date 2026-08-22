"use client";

import { LimitationBadge } from "./Badges";

const pipelineSteps = [
  "10,000 Customers",
  "Exited Target",
  "20.37% Churn",
  "Encode + Scale",
  "Stratified Split",
  "11 Inputs",
  "Hidden Layers + ReLU",
  "Sigmoid",
  "Churn Probability",
  "BCE Loss",
  "Backpropagation",
  "SGD / Adam",
  "Dropout / Tuning",
  "SMOTE on Training Data",
  "Probability Threshold",
  "Confusion Matrix",
  "Precision / Recall",
  "Retention Decision",
];

const cheatsheetBlocks = [
  {
    category: "NEURAL NETWORK",
    items: [
      "neuron = weighted inputs + bias (z = wᵀx + b)",
      "ReLU = hidden-layer non-linearity max(0, z)",
      "sigmoid = output probability 1 / (1 + e⁻ᶻ)",
      "BCE = binary cross-entropy probability loss",
      "forward pass = prediction",
      "backpropagation = learning signal via gradients",
      "optimizer = updates weights (SGD / Adam)",
      "epoch = one full pass through dataset",
      "dropout = regularisation to reduce overfitting",
    ],
  },
  {
    category: "CLASSIFICATION",
    items: [
      "TP = caught churner",
      "FN = missed churner (costly missed retention)",
      "FP = false alarm (unnecessary outreach)",
      "TN = correctly predicted stay",
      "recall = capture rate TP / (TP + FN)",
      "precision = purity rate TP / (TP + FP)",
      "accuracy = overall correctness",
      "ROC / AUC = ranking ability across thresholds",
    ],
  },
  {
    category: "IMBALANCE",
    items: [
      "churn rate = 20.37%",
      "naive stay-only accuracy = 79.63%",
      "SMOTE = synthetic minority training examples",
      "SMOTE only on training data (test set untouched)",
      "more recall can mean more false positives",
    ],
  },
  {
    category: "PROJECT RESULTS",
    items: [
      "baseline recall = 0.48",
      "SMOTE recall = 0.75",
      "SMOTE precision = 0.51",
      "headline ROC-AUC = 0.8515",
      "baseline FN = 204, FP = 50",
      "SMOTE FN = 98, FP = 283",
    ],
  },
];

export default function PipelineCheatsheetTruthSection() {
  return (
    <section id="pipeline-truth" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-purple-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 07 — PIPELINE MAP, RECALL CHEATSHEET & TRUTH BOUNDARY
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 16-STEP PIPELINE MAP */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4">
          16. Complete End-to-End System Pipeline
        </h2>
        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Reconstruct the entire bank customer churn neural network workflow from raw data to business decision in one continuous pipeline.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step}
              className="bg-surface-sunken border border-hairline-faint hover:border-purple-500/40 p-3.5 rounded-xl flex items-center gap-3 transition-colors"
            >
              <span className="text-purple-400 font-bold text-xs shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-ink font-medium uppercase">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RECALL CHEATSHEET */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
          17. Compact Memory & Recall Cheatsheet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs mb-6">
          {cheatsheetBlocks.map((block) => (
            <div
              key={block.category}
              className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-purple-400 tracking-widest block mb-2 uppercase">
                  // {block.category}
                </span>
                <ul className="space-y-1.5 text-ink-muted">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-purple-400 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-purple-500/20 border border-purple-500/40 p-4 rounded-xl text-xs font-mono text-purple-400 font-bold text-center">
          "The model does not decide retention economics. The threshold and intervention policy do."
        </div>
      </div>

      {/* TRUTH BOUNDARY */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <LimitationBadge label="TRUTH BOUNDARY" />
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            18. Project Truth & Claim Boundaries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block mb-2">// IMPLEMENTED & SUPPORTED</span>
            <ul className="space-y-1 text-ink-muted">
              <li>✓ 10,000 customer dataset</li>
              <li>✓ Binary Exited churn target (20.37%)</li>
              <li>✓ Categorical encoding & numeric scaling</li>
              <li>✓ Stratified train/test split</li>
              <li>✓ 11-input feed-forward neural network</li>
              <li>✓ ReLU hidden layers & sigmoid output</li>
              <li>✓ Binary Cross-Entropy loss</li>
              <li>✓ SGD & Adam optimisers</li>
              <li>✓ Dropout regularisation</li>
              <li>✓ SMOTE applied to training data only</li>
              <li>✓ Exact 8-count confusion matrices</li>
              <li>✓ Baseline recall 0.48 vs SMOTE recall 0.75</li>
              <li>✓ SMOTE precision 0.51, ROC-AUC 0.8515</li>
            </ul>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-rose-500/30">
            <span className="text-rose-400 font-bold block mb-2">// LIMITATIONS & NOT CLAIMED</span>
            <ul className="space-y-1 text-ink-muted">
              <li>✗ Outlier removal before split is a known leakage risk</li>
              <li>✗ SMOTE creates 233 more FPs while reducing 106 FNs</li>
              <li>✗ Tuned model has higher AUC; SMOTE selected for recall</li>
              <li>✗ Default 0.50 threshold not assumed production-optimal</li>
              <li>✗ No claim of live production deployment</li>
              <li>✗ No invented financial ROI or retention revenue numbers</li>
              <li>✗ No unsupported hidden layer or hyperparameter claims</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
