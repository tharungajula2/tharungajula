"use client";

import HeroSection from "./HeroSection";
import WhatIsChurnSection from "./WhatIsChurnSection";
import DataPrepSection from "./DataPrepSection";
import NeuralNetworkSection from "./NeuralNetworkSection";
import ModelVariantsSmoteSection from "./ModelVariantsSmoteSection";
import ConfusionMatrixSection from "./ConfusionMatrixSection";
import ThresholdDecisionSection from "./ThresholdDecisionSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

const navAnchors = [
  { id: "what-is-churn", label: "OVERVIEW" },
  { id: "data-prep", label: "DATA PREP" },
  { id: "neural-network", label: "NEURAL NET" },
  { id: "variants-smote", label: "VARIANTS & SMOTE" },
  { id: "confusion-matrix", label: "ERRORS" },
  { id: "threshold-decision", label: "THRESHOLDS" },
  { id: "pipeline-truth", label: "PIPELINE & TRUTH" },
];

export default function ChurnMasterclass() {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-24 sm:py-32 px-4 sm:px-6 pb-44 sm:pb-40">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-purple-600/20 via-purple-500/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* STICKY LOCAL SECTION NAVIGATOR */}
      <div className="sticky top-20 z-40 mb-10 bg-surface-raised/90 backdrop-blur-xl border border-hairline p-2 rounded-full shadow-lg overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 min-w-max px-2">
          {navAnchors.map((anchor) => (
            <a
              key={anchor.id}
              href={`#${anchor.id}`}
              className="text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full text-ink-muted hover:text-purple-400 hover:bg-surface-sunken transition-all uppercase whitespace-nowrap"
            >
              {anchor.label}
            </a>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="relative z-10">
        <HeroSection />
      </div>

      {/* PHASE 01 — WHAT IS CHURN & IMBALANCE */}
      <div className="relative z-10">
        <WhatIsChurnSection />
      </div>

      {/* PHASE 02 — DATA PREP & LEAKAGE */}
      <div className="relative z-10">
        <DataPrepSection />
      </div>

      {/* PHASE 03 — NEURAL NET & TRAINING */}
      <div className="relative z-10">
        <NeuralNetworkSection />
      </div>

      {/* PHASE 04 — VARIANTS & SMOTE */}
      <div className="relative z-10">
        <ModelVariantsSmoteSection />
      </div>

      {/* PHASE 05 — CONFUSION MATRICES & ERROR EVALUATION */}
      <div className="relative z-10">
        <ConfusionMatrixSection />
      </div>

      {/* PHASE 06 — THRESHOLDS & DECISION ECONOMICS */}
      <div className="relative z-10">
        <ThresholdDecisionSection />
      </div>

      {/* PHASE 07 — PIPELINE MAP, RECALL CHEATSHEET & TRUTH BOUNDARY */}
      <div className="relative z-10">
        <PipelineCheatsheetTruthSection />
      </div>
    </div>
  );
}
