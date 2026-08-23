"use client";

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
    <div className="relative w-full max-w-5xl mx-auto py-24 sm:py-32 px-4 sm:px-6 pb-44 sm:pb-40">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-cyan-600/20 via-cyan-500/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* STICKY LOCAL SECTION NAVIGATOR */}
      <div className="sticky top-20 z-40 mb-10 bg-surface-raised/90 backdrop-blur-xl border border-hairline p-2 rounded-full shadow-lg overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 min-w-max px-2">
          {navAnchors.map((anchor) => (
            <a
              key={anchor.id}
              href={`#${anchor.id}`}
              className="text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full text-ink-muted hover:text-cyan-400 hover:bg-surface-sunken transition-all uppercase whitespace-nowrap"
            >
              {anchor.label}
            </a>
          ))}
        </div>
      </div>

      {/* HERO & DEMO SECTION */}
      <div className="relative z-10">
        <HeroTruthSection />
      </div>

      {/* PHASE 01 — THE PRODUCT PROBLEM & SYSTEM ENTITIES */}
      <div className="relative z-10">
        <ArchitectureFoundationsSection />
      </div>

      {/* PHASE 02 — SIX-LAYER EVIDENCE GRAPH ARCHITECTURE */}
      <div className="relative z-10">
        <EvidenceGraphSection />
      </div>

      {/* PHASE 03 — COMPOSITE EDGE WEIGHTING & PROXY-IP */}
      <div className="relative z-10">
        <WeightingSection />
      </div>

      {/* PHASE 04 — CANDIDATE PINCODES, CONFIDENCE & TRUTH FLAGS */}
      <div className="relative z-10">
        <CandidateDecisionSection />
      </div>

      {/* PHASE 05 — PRODUCT STACK, STATIC SCENARIOS & FRONT END */}
      <div className="relative z-10">
        <ProductEngineeringSection />
      </div>

      {/* PHASE 06 — RULE ENGINE VS ML MODEL */}
      <div className="relative z-10">
        <StaticVsLiveSection />
      </div>

      {/* PHASE 07 — PRODUCTION EXTENSIONS & HUMAN-IN-THE-LOOP */}
      <div className="relative z-10">
        <ProductionExtensionsSection />
      </div>

      {/* PHASE 08 — TWELVE COMMON CONFUSIONS */}
      <div className="relative z-10">
        <ConfusionsSection />
      </div>

      {/* PHASE 09 — PIPELINE MAP, CHEATSHEET & TRUTH BOUNDARY */}
      <div className="relative z-10">
        <PipelineCheatsheetTruthSection />
      </div>
    </div>
  );
}
