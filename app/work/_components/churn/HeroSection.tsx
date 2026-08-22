"use client";

import { motion } from "framer-motion";
import { ProjectDataBadge } from "./Badges";

const tags = [
  "10,000 Customers",
  "Keras / TensorFlow",
  "Feed-Forward NN",
  "SMOTE Over-sampling",
  "Binary Cross-Entropy",
  "Recall Optimisation",
];

const headlineMetrics = [
  { label: "Raw Customers", value: "10,000" },
  { label: "Churn Rate", value: "20.37%" },
  { label: "Baseline Recall", value: "0.48" },
  { label: "SMOTE Recall", value: "0.75" },
  { label: "SMOTE Precision", value: "0.51" },
  { label: "Headline ROC-AUC", value: "0.8515" },
];

const topFlowSteps = [
  "TARGET",
  "PREPARE DATA",
  "BUILD NETWORK",
  "TRAIN",
  "COMPARE VARIANTS",
  "HANDLE IMBALANCE",
  "EVALUATE ERRORS",
  "CHOOSE BUSINESS TRADE-OFF",
];

export default function HeroSection() {
  return (
    <div className="mb-16">
      {/* KICKER & TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-purple-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
            CLASSIFICATION // NEURAL NETWORKS
          </span>
          <div className="h-px flex-1 bg-hairline-faint" />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-4">
          Bank Customer Churn
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl mb-6">
          Identify customers likely to exit within six months so retention effort can focus on the highest-risk group.
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-full bg-surface-raised border border-hairline text-ink font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* HEADLINE METRICS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {headlineMetrics.map((m) => (
            <div
              key={m.label}
              className="bg-surface-raised border border-hairline p-3.5 rounded-xl flex flex-col justify-between"
            >
              <div className="mb-1">
                <ProjectDataBadge />
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-purple-400">
                {m.value}
              </div>
              <div className="text-[11px] font-mono text-ink-muted mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* MASTER FLOW */}
      <div className="bg-surface-raised border border-purple-500/30 p-5 sm:p-6 rounded-2xl mb-8 backdrop-blur-xl">
        <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3 font-bold">
          // MASTER DEVELOPMENT FLOW
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
          {topFlowSteps.map((step, idx) => (
            <span key={step} className="flex items-center gap-2">
              <span className="text-purple-400 font-bold">{step}</span>
              {idx < topFlowSteps.length - 1 && (
                <span className="text-ink-faint">→</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
