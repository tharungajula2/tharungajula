"use client";

import FoundationsSection from "./FoundationsSection";
import DataAlignmentSection from "./DataAlignmentSection";
import RiskCovarianceSection from "./RiskCovarianceSection";
import SamplingSimulationSection from "./SamplingSimulationSection";
import ResultsCloudSection from "./ResultsCloudSection";
import ExtensionsConfusionsSection from "./ExtensionsConfusionsSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

export default function NiftyMasterclass() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 text-ink font-sans">
      <FoundationsSection />
      <DataAlignmentSection />
      <RiskCovarianceSection />
      <SamplingSimulationSection />
      <ResultsCloudSection />
      <ExtensionsConfusionsSection />
      <PipelineCheatsheetTruthSection />
    </div>
  );
}
