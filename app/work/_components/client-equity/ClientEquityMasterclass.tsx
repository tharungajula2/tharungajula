"use client";

import HeroAttributionSection from "./HeroAttributionSection";
import CrossSectionalFoundationsSection from "./CrossSectionalFoundationsSection";
import UniverseSignalsSection from "./UniverseSignalsSection";
import SectorRankingSection from "./SectorRankingSection";
import TurnoverOptimisationSection from "./TurnoverOptimisationSection";
import BenchmarkRiskSection from "./BenchmarkRiskSection";
import RobustnessSection from "./RobustnessSection";
import ConfusionsSection from "./ConfusionsSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

const navAnchors = [
  { id: "foundations", label: "FOUNDATIONS" },
  { id: "universe-signals", label: "SIGNALS & RANK" },
  { id: "sector-ranking", label: "SECTOR NEUTRAL" },
  { id: "turnover-optimisation", label: "TURNOVER & OPT" },
  { id: "benchmark-risk", label: "BENCHMARK RISK" },
  { id: "robustness", label: "ROBUSTNESS" },
  { id: "confusions", label: "CONFUSIONS" },
  { id: "pipeline-truth", label: "PIPELINE & TRUTH" },
];

export default function ClientEquityMasterclass() {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-24 sm:py-32 px-4 sm:px-6 pb-44 sm:pb-40">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-indigo-600/20 via-indigo-500/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* STICKY LOCAL SECTION NAVIGATOR */}
      <div className="sticky top-20 z-40 mb-10 bg-surface-raised/90 backdrop-blur-xl border border-hairline p-2 rounded-full shadow-lg overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 min-w-max px-2">
          {navAnchors.map((anchor) => (
            <a
              key={anchor.id}
              href={`#${anchor.id}`}
              className="text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full text-ink-muted hover:text-indigo-400 hover:bg-surface-sunken transition-all uppercase whitespace-nowrap"
            >
              {anchor.label}
            </a>
          ))}
        </div>
      </div>

      {/* HERO & ATTRIBUTION SECTION */}
      <div className="relative z-10">
        <HeroAttributionSection />
      </div>

      {/* PHASE 01 — CROSS-SECTIONAL LOGIC & HISTORICAL UNIVERSE */}
      <div className="relative z-10">
        <CrossSectionalFoundationsSection />
      </div>

      {/* PHASE 02 — DATA INPUTS, FACTORS, SIGNALS & RANKING */}
      <div className="relative z-10">
        <UniverseSignalsSection />
      </div>

      {/* PHASE 03 — SECTOR NEUTRALISATION & RANKING */}
      <div className="relative z-10">
        <SectorRankingSection />
      </div>

      {/* PHASE 04 — TURNOVER CONTROL & L1/L2 OPTIMISATION */}
      <div className="relative z-10">
        <TurnoverOptimisationSection />
      </div>

      {/* PHASE 05 — BENCHMARK ACTIVE RISK */}
      <div className="relative z-10">
        <BenchmarkRiskSection />
      </div>

      {/* PHASE 06 — ROBUSTNESS & 4-SCRIPT ARCHITECTURE */}
      <div className="relative z-10">
        <RobustnessSection />
      </div>

      {/* PHASE 07 — ELEVEN COMMON CONFUSIONS */}
      <div className="relative z-10">
        <ConfusionsSection />
      </div>

      {/* PHASE 08 — PIPELINE MAP, CHEATSHEET & TRUTH BOUNDARY */}
      <div className="relative z-10">
        <PipelineCheatsheetTruthSection />
      </div>
    </div>
  );
}
