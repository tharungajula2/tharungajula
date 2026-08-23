"use client";

import MasterclassShell from "@/components/masterclass/MasterclassShell";
import HeroSection from "./HeroSection";
import FoundationsSection from "./FoundationsSection";
import DataAlignmentSection from "./DataAlignmentSection";
import RiskCovarianceSection from "./RiskCovarianceSection";
import SamplingSimulationSection from "./SamplingSimulationSection";
import ResultsCloudSection from "./ResultsCloudSection";
import ExtensionsConfusionsSection from "./ExtensionsConfusionsSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

const navAnchors = [
  { id: "hero", label: "OVERVIEW" },
  { id: "foundations", label: "FOUNDATIONS" },
  { id: "data-alignment", label: "DATA ALIGNMENT" },
  { id: "risk-covariance", label: "RISK & COVARIANCE" },
  { id: "sampling-simulation", label: "SAMPLING & SCORE" },
  { id: "results-cloud", label: "RESULTS & CLOUD" },
  { id: "extensions-confusions", label: "EXTENSIONS" },
  { id: "pipeline-truth", label: "PIPELINE & TRUTH" },
];

export default function NiftyMasterclass() {
  return (
    <MasterclassShell
      category="PORTFOLIO ANALYTICS"
      title="NIFTY Portfolio"
      subtitle="How do multiple assets combine into a portfolio-level return/risk trade-off?"
      navAnchors={navAnchors}
    >
      <div id="hero">
        <HeroSection />
      </div>
      <FoundationsSection />
      <DataAlignmentSection />
      <RiskCovarianceSection />
      <SamplingSimulationSection />
      <ResultsCloudSection />
      <ExtensionsConfusionsSection />
      <PipelineCheatsheetTruthSection />
    </MasterclassShell>
  );
}
