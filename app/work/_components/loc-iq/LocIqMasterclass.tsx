"use client";

import MasterclassReader from "@/components/masterclass/MasterclassReader";
import ArchitectureFoundationsSection from "./ArchitectureFoundationsSection";
import EvidenceGraphSection from "./EvidenceGraphSection";
import WeightingSection from "./WeightingSection";
import CandidateDecisionSection from "./CandidateDecisionSection";
import ProductEngineeringSection from "./ProductEngineeringSection";
import StaticVsLiveSection from "./StaticVsLiveSection";
import ProductionExtensionsSection from "./ProductionExtensionsSection";
import ConfusionsSection from "./ConfusionsSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

const snapshot = [
  { label: "Digital Identifiers", value: "6 Mapped Types" },
  { label: "API Source Types", value: "46 Sources" },
  { label: "Defined Fields", value: "42 Mapped Fields" },
  { label: "Graph Structure", value: "6 Weighted Layers" },
  { label: "Execution Layer", value: "Rule Engine" },
  { label: "Primary Use Case", value: "Fraud & Underwriting" },
];

export default function LocIqMasterclass() {
  return (
    <MasterclassReader
      slug="loc-iq"
      title="LOC-IQ"
      subtitle="How multiple digital location signals become an explainable evidence graph for underwriting or fraud review."
      metadataLine="Architecture: 6-Layer Evidence Graph · Mapped Fields: 42 · API Sources: 46 · Stack: TypeScript, Next.js"
      snapshotItems={snapshot}
    >
      <ArchitectureFoundationsSection />
      <EvidenceGraphSection />
      <WeightingSection />
      <CandidateDecisionSection />
      <ProductEngineeringSection />
      <StaticVsLiveSection />
      <ProductionExtensionsSection />
      <ConfusionsSection />
      <PipelineCheatsheetTruthSection />
    </MasterclassReader>
  );
}
