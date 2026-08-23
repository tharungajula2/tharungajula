"use client";

import MasterclassShell from "@/components/masterclass/MasterclassShell";
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
  { id: "hero", label: "OVERVIEW" },
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
    <MasterclassShell
      category="PORTFOLIO IMPLEMENTATION"
      title="Client Equity Framework"
      subtitle="How do cross-sectional signals become a controlled and testable portfolio implementation?"
      navAnchors={navAnchors}
    >
      <div id="hero">
        <HeroAttributionSection />
      </div>
      <CrossSectionalFoundationsSection />
      <UniverseSignalsSection />
      <SectorRankingSection />
      <TurnoverOptimisationSection />
      <BenchmarkRiskSection />
      <RobustnessSection />
      <ConfusionsSection />
      <PipelineCheatsheetTruthSection />
    </MasterclassShell>
  );
}
