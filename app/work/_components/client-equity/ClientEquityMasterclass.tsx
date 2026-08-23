"use client";

import MasterclassReader from "@/components/masterclass/MasterclassReader";
import CrossSectionalFoundationsSection from "./CrossSectionalFoundationsSection";
import UniverseSignalsSection from "./UniverseSignalsSection";
import SectorRankingSection from "./SectorRankingSection";
import TurnoverOptimisationSection from "./TurnoverOptimisationSection";
import BenchmarkRiskSection from "./BenchmarkRiskSection";
import RobustnessSection from "./RobustnessSection";
import ConfusionsSection from "./ConfusionsSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

const snapshot = [
  { label: "Universe", value: "CRSP 500 (US)" },
  { label: "Backtest Span", value: "10 Years" },
  { label: "Pipeline Scripts", value: "4 Modular Scripts" },
  { label: "Factor Model", value: "Cross-Sectional" },
  { label: "Control Layer", value: "Sector Neutral" },
  { label: "Risk Control", value: "Turnover Penalties" },
];

export default function ClientEquityMasterclass() {
  return (
    <MasterclassReader
      slug="client-equity"
      title="Client Equity Framework"
      subtitle="How cross-sectional signals become a controlled, sector-neutral, and testable portfolio implementation."
      metadataLine="Universe: CRSP 500 (US Large Cap) · Span: 10-Year Backtest · Stack: Python, Pandas, Statsmodels"
      snapshotItems={snapshot}
    >
      <CrossSectionalFoundationsSection />
      <UniverseSignalsSection />
      <SectorRankingSection />
      <TurnoverOptimisationSection />
      <BenchmarkRiskSection />
      <RobustnessSection />
      <ConfusionsSection />
      <PipelineCheatsheetTruthSection />
    </MasterclassReader>
  );
}
