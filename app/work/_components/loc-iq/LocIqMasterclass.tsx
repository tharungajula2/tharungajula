"use client";

import MasterclassShell from "@/components/masterclass/MasterclassShell";
import HeroTruthSection from "./HeroTruthSection";
import ArchitectureFoundationsSection from "./ArchitectureFoundationsSection";
import EvidenceGraphSection from "./EvidenceGraphSection";
import WeightingSection from "./WeightingSection";
import CandidateDecisionSection from "./CandidateDecisionSection";
import ProductEngineeringSection from "./ProductEngineeringSection";
import StaticVsLiveSection from "./StaticVsLiveSection";
import ProductionExtensionsSection from "./ProductionExtensionsSection";
import ConfusionsSection from "./ConfusionsSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

const navAnchors = [
  { id: "hero", label: "OVERVIEW" },
  { id: "foundations", label: "FOUNDATIONS" },
  { id: "evidence-graph", label: "EVIDENCE GRAPH" },
  { id: "weighting", label: "WEIGHTING" },
  { id: "candidate-decision", label: "CANDIDATES" },
  { id: "product-engineering", label: "ENGINEERING" },
  { id: "static-vs-live", label: "RULE VS ML" },
  { id: "production-extensions", label: "EXTENSIONS" },
  { id: "confusions", label: "CONFUSIONS" },
  { id: "pipeline-truth", label: "PIPELINE & TRUTH" },
];

export default function LocIqMasterclass() {
  return (
    <MasterclassShell
      category="PRODUCT + SYSTEMS"
      title="LOC-IQ"
      subtitle="How do multiple digital location signals become an explainable evidence graph for underwriting or fraud review?"
      navAnchors={navAnchors}
    >
      <div id="hero">
        <HeroTruthSection />
      </div>
      <ArchitectureFoundationsSection />
      <EvidenceGraphSection />
      <WeightingSection />
      <CandidateDecisionSection />
      <ProductEngineeringSection />
      <StaticVsLiveSection />
      <ProductionExtensionsSection />
      <ConfusionsSection />
      <PipelineCheatsheetTruthSection />
    </MasterclassShell>
  );
}
