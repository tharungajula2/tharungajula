"use client";

import MasterclassReader from "@/components/masterclass/MasterclassReader";
import WhatIsChurnSection from "./WhatIsChurnSection";
import DataPrepSection from "./DataPrepSection";
import NeuralNetworkSection from "./NeuralNetworkSection";
import ModelVariantsSmoteSection from "./ModelVariantsSmoteSection";
import ConfusionMatrixSection from "./ConfusionMatrixSection";
import ThresholdDecisionSection from "./ThresholdDecisionSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

const snapshot = [
  { label: "Bank Customers", value: "10,000" },
  { label: "Baseline Recall", value: "0.48" },
  { label: "SMOTE Recall", value: "0.75" },
  { label: "SMOTE Precision", value: "0.51" },
  { label: "Model Architecture", value: "Neural Net (Keras)" },
  { label: "Primary Objective", value: "Cost-Sensitive Churn" },
];

export default function ChurnMasterclass() {
  return (
    <MasterclassReader
      slug="churn"
      title="Bank Customer Churn"
      subtitle="How a neural network identifies likely churners when missing the positive class carries significant business cost."
      metadataLine="Dataset: Bank Customer Churn · Sample: 10,000 customers · Stack: Python, Keras, SMOTE, Scikit-learn"
      snapshotItems={snapshot}
    >
      <WhatIsChurnSection />
      <DataPrepSection />
      <NeuralNetworkSection />
      <ModelVariantsSmoteSection />
      <ConfusionMatrixSection />
      <ThresholdDecisionSection />
      <PipelineCheatsheetTruthSection />
    </MasterclassReader>
  );
}
