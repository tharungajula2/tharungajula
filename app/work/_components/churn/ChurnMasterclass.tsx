"use client";

import MasterclassShell from "@/components/masterclass/MasterclassShell";
import HeroSection from "./HeroSection";
import WhatIsChurnSection from "./WhatIsChurnSection";
import DataPrepSection from "./DataPrepSection";
import NeuralNetworkSection from "./NeuralNetworkSection";
import ModelVariantsSmoteSection from "./ModelVariantsSmoteSection";
import ConfusionMatrixSection from "./ConfusionMatrixSection";
import ThresholdDecisionSection from "./ThresholdDecisionSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

const navAnchors = [
  { id: "hero", label: "OVERVIEW" },
  { id: "what-is-churn", label: "OVERVIEW DEEP" },
  { id: "data-prep", label: "DATA PREP" },
  { id: "neural-network", label: "NEURAL NET" },
  { id: "variants-smote", label: "VARIANTS & SMOTE" },
  { id: "confusion-matrix", label: "ERRORS" },
  { id: "threshold-decision", label: "THRESHOLDS" },
  { id: "pipeline-truth", label: "PIPELINE & TRUTH" },
];

export default function ChurnMasterclass() {
  return (
    <MasterclassShell
      category="APPLIED ANALYTICS"
      title="Bank Customer Churn"
      subtitle="How does a neural network identify likely churners when missing the positive class can be costly?"
      navAnchors={navAnchors}
    >
      <div id="hero">
        <HeroSection />
      </div>
      <WhatIsChurnSection />
      <DataPrepSection />
      <NeuralNetworkSection />
      <ModelVariantsSmoteSection />
      <ConfusionMatrixSection />
      <ThresholdDecisionSection />
      <PipelineCheatsheetTruthSection />
    </MasterclassShell>
  );
}
