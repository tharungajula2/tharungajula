"use client";

import HeroSection from "./HeroSection";
import FoundationsSection from "./FoundationsSection";
import DataAlignmentSection from "./DataAlignmentSection";
import RiskCovarianceSection from "./RiskCovarianceSection";
import SamplingSimulationSection from "./SamplingSimulationSection";
import ResultsCloudSection from "./ResultsCloudSection";
import ExtensionsConfusionsSection from "./ExtensionsConfusionsSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

const navAnchors = [
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
    <div className="relative w-full max-w-5xl mx-auto py-24 sm:py-32 px-4 sm:px-6 pb-44 sm:pb-40">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-teal-600/20 via-teal-500/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* STICKY LOCAL SECTION NAVIGATOR */}
      <div className="sticky top-20 z-40 mb-10 bg-surface-raised/90 backdrop-blur-xl border border-hairline p-2 rounded-full shadow-lg overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 min-w-max px-2">
          {navAnchors.map((anchor) => (
            <a
              key={anchor.id}
              href={`#${anchor.id}`}
              className="text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full text-ink-muted hover:text-teal-400 hover:bg-surface-sunken transition-all uppercase whitespace-nowrap"
            >
              {anchor.label}
            </a>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="relative z-10">
        <HeroSection />
      </div>

      {/* PHASE 01 — FOUNDATIONS & LOG RETURNS */}
      <div className="relative z-10">
        <FoundationsSection />
      </div>

      {/* PHASE 02 — DATA ALIGNMENT & EXPECTED RETURN MATH */}
      <div className="relative z-10">
        <DataAlignmentSection />
      </div>

      {/* PHASE 03 — COVARIANCE, PORTFOLIO VARIANCE & DIVERSIFICATION */}
      <div className="relative z-10">
        <RiskCovarianceSection />
      </div>

      {/* PHASE 04 — BASELINE, CONSTRAINTS & SAMPLING */}
      <div className="relative z-10">
        <SamplingSimulationSection />
      </div>

      {/* PHASE 05 — SIMULATION RESULTS, CLOUD & EFFICIENT FRONTIER */}
      <div className="relative z-10">
        <ResultsCloudSection />
      </div>

      {/* PHASE 06 — INSTITUTIONAL EXTENSIONS & CONFUSIONS */}
      <div className="relative z-10">
        <ExtensionsConfusionsSection />
      </div>

      {/* PHASE 07 — PIPELINE MAP, RECALL CHEATSHEET & TRUTH BOUNDARY */}
      <div className="relative z-10">
        <PipelineCheatsheetTruthSection />
      </div>
    </div>
  );
}
