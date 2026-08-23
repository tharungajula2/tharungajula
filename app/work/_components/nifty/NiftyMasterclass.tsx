"use client";

import MasterclassReader from "@/components/masterclass/MasterclassReader";
import FoundationsSection from "./FoundationsSection";
import DataAlignmentSection from "./DataAlignmentSection";
import RiskCovarianceSection from "./RiskCovarianceSection";
import SamplingSimulationSection from "./SamplingSimulationSection";
import ResultsCloudSection from "./ResultsCloudSection";
import ExtensionsConfusionsSection from "./ExtensionsConfusionsSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

const snapshot = [
  { label: "Usable Stocks", value: "82" },
  { label: "Sampled Portfolios", value: "10,000" },
  { label: "Simplified Score", value: "0.7707" },
  { label: "Core Input", value: "Log Returns" },
  { label: "Risk Measure", value: "Covariance Matrix" },
  { label: "Methodology", value: "Markowitz Frontier" },
];

export default function NiftyMasterclass() {
  return (
    <MasterclassReader
      slug="nifty"
      title="NIFTY Portfolio"
      subtitle="How multiple assets combine into a portfolio-level return/risk trade-off across 10,000 simulated allocations."
      metadataLine="Universe: NIFTY 100 · Usable Assets: 82 stocks · Stack: Python, NumPy, Pandas, Matplotlib"
      snapshotItems={snapshot}
    >
      <FoundationsSection />
      <DataAlignmentSection />
      <RiskCovarianceSection />
      <SamplingSimulationSection />
      <ResultsCloudSection />
      <ExtensionsConfusionsSection />
      <PipelineCheatsheetTruthSection />
    </MasterclassReader>
  );
}
