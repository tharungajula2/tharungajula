"use client";

import ArchitectureFoundationsSection from "./ArchitectureFoundationsSection";
import EvidenceGraphSection from "./EvidenceGraphSection";
import WeightingSection from "./WeightingSection";
import CandidateDecisionSection from "./CandidateDecisionSection";
import ProductEngineeringSection from "./ProductEngineeringSection";
import StaticVsLiveSection from "./StaticVsLiveSection";
import ProductionExtensionsSection from "./ProductionExtensionsSection";
import ConfusionsSection from "./ConfusionsSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

export default function LocIqMasterclass() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 text-ink font-sans">
      <ArchitectureFoundationsSection />
      <EvidenceGraphSection />
      <WeightingSection />
      <CandidateDecisionSection />
      <ProductEngineeringSection />
      <StaticVsLiveSection />
      <ProductionExtensionsSection />
      <ConfusionsSection />
      <PipelineCheatsheetTruthSection />
    </div>
  );
}
