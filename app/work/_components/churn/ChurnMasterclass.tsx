"use client";

import WhatIsChurnSection from "./WhatIsChurnSection";
import DataPrepSection from "./DataPrepSection";
import NeuralNetworkSection from "./NeuralNetworkSection";
import ModelVariantsSmoteSection from "./ModelVariantsSmoteSection";
import ConfusionMatrixSection from "./ConfusionMatrixSection";
import ThresholdDecisionSection from "./ThresholdDecisionSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

export default function ChurnMasterclass() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 text-ink font-sans">
      <WhatIsChurnSection />
      <DataPrepSection />
      <NeuralNetworkSection />
      <ModelVariantsSmoteSection />
      <ConfusionMatrixSection />
      <ThresholdDecisionSection />
      <PipelineCheatsheetTruthSection />
    </div>
  );
}
