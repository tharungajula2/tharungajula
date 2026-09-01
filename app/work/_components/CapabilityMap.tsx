"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Cluster {
  id: string;
  name: string;
  nodes: string[];
  detail: string;
}

const clusters: Cluster[] = [
  {
    id: "product-business-analysis",
    name: "PRODUCT & BUSINESS ANALYSIS",
    nodes: [
      "Requirements",
      "Business Rules",
      "Data Mapping",
      "UAT",
      "API Validation",
      "Defects",
      "Traceability",
    ],
    detail:
      "Translate business or policy intent into precise system behaviour and prove that implementation matches the intended result.",
  },
  {
    id: "analytics-machine-learning",
    name: "ANALYTICS & MACHINE LEARNING",
    nodes: [
      "Logistic Regression",
      "Neural Networks",
      "Classification",
      "Forecasting",
      "Validation",
      "Model Diagnostics",
    ],
    detail:
      "Choose methods based on the decision problem, then separate model performance from business usefulness.",
  },
  {
    id: "ai-systems-engineering",
    name: "AI SYSTEMS & ENGINEERING",
    nodes: [
      "Next.js",
      "TypeScript",
      "LLM Integration",
      "Structured Extraction",
      "Fallback Chains",
      "Deterministic Rule Engines",
      "Deployment",
    ],
    detail:
      "Turn models and reasoning into usable interfaces, with the model doing extraction and a deterministic engine making the decision.",
  },
  {
    id: "banking-credit-risk",
    name: "BANKING & CREDIT RISK",
    nodes: [
      "Lending",
      "Credit Policy",
      "PD / LGD / EAD",
      "Expected Loss",
      "IFRS 9-style ECL",
      "Basel / RWA",
      "Portfolio Monitoring",
    ],
    detail:
      "Understand how borrower behaviour becomes underwriting decisions, portfolio measures, expected loss and capital/risk outputs.",
  },
  {
    id: "portfolio-markets",
    name: "PORTFOLIO & MARKETS",
    nodes: [
      "Equities",
      "Returns",
      "Covariance",
      "Portfolio Risk",
      "Factors",
      "Tracking Error",
    ],
    detail:
      "Convert individual asset behaviour into portfolio-level risk, allocation and cross-sectional decision frameworks.",
  },
  {
    id: "data-validation",
    name: "DATA & VALIDATION",
    nodes: [
      "SQL",
      "Data Quality",
      "Reconciliation",
      "Train / Test / OOT",
      "Calibration",
      "Stability",
    ],
    detail:
      "Preserve definitions, time order, grain and evidence so an analytical result can actually be trusted.",
  },
];

export default function CapabilityMap() {
  const [selectedClusterId, setSelectedClusterId] = useState<string>(
    "banking-credit-risk"
  );

  const selectedCluster =
    clusters.find((c) => c.id === selectedClusterId) || clusters[0];

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // SECTION 05 — CAPABILITY MAP
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      <div className="bg-surface-raised backdrop-blur-xl border border-hairline p-5 sm:p-6 rounded-2xl">
        {/* CLUSTER SELECTION BUTTONS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          {clusters.map((cluster) => {
            const isSelected = cluster.id === selectedClusterId;
            return (
              <button
                key={cluster.id}
                onClick={() => setSelectedClusterId(cluster.id)}
                className={`text-[11px] sm:text-xs font-mono px-3 py-2 rounded-xl transition-all cursor-pointer text-left border ${
                  isSelected
                    ? "bg-accent-glow text-accent border-accent font-bold shadow-sm"
                    : "bg-surface-sunken text-ink-muted hover:text-ink border-hairline-faint hover:border-hairline"
                }`}
              >
                {cluster.name}
              </button>
            );
          })}
        </div>

        {/* DETAIL PANEL */}
        <motion.div
          key={selectedCluster.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-surface-sunken border border-hairline-faint p-4 sm:p-5 rounded-xl"
        >
          <div className="flex items-center justify-between gap-2 mb-3 border-b border-hairline-faint pb-3">
            <h3 className="text-xs sm:text-sm font-mono font-bold text-accent tracking-wider uppercase">
              // {selectedCluster.name}
            </h3>
            <span className="text-[10px] font-mono text-ink-faint">
              {selectedCluster.nodes.length} KNOWLEDGE NODES
            </span>
          </div>

          {/* NODES TAGS */}
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCluster.nodes.map((node) => (
              <span
                key={node}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-surface-raised border border-hairline-faint text-ink font-medium"
              >
                {node}
              </span>
            ))}
          </div>

          {/* SHORT DETAIL */}
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">
            {selectedCluster.detail}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
