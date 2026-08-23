"use client";

import CrossSectionalFoundationsSection from "./CrossSectionalFoundationsSection";
import UniverseSignalsSection from "./UniverseSignalsSection";
import SectorRankingSection from "./SectorRankingSection";
import TurnoverOptimisationSection from "./TurnoverOptimisationSection";
import BenchmarkRiskSection from "./BenchmarkRiskSection";
import RobustnessSection from "./RobustnessSection";
import ConfusionsSection from "./ConfusionsSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

export default function ClientEquityMasterclass() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 text-ink font-sans">
      <CrossSectionalFoundationsSection />
      <UniverseSignalsSection />
      <SectorRankingSection />
      <TurnoverOptimisationSection />
      <BenchmarkRiskSection />
      <RobustnessSection />
      <ConfusionsSection />
      <PipelineCheatsheetTruthSection />
    </div>
  );
}
