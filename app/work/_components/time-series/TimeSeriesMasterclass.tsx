"use client";

import MasterclassShell from "@/components/masterclass/MasterclassShell";
import HeroSection from "./HeroSection";
import FoundationsSection from "./FoundationsSection";
import StationaritySection from "./StationaritySection";
import SarimaSection from "./SarimaSection";
import DiagnosticsSection from "./DiagnosticsSection";
import RollingForecastSection from "./RollingForecastSection";
import PerformanceSection from "./PerformanceSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

const navAnchors = [
  { id: "hero", label: "OVERVIEW" },
  { id: "foundations", label: "FOUNDATIONS" },
  { id: "stationarity", label: "STATIONARITY" },
  { id: "sarima", label: "SARIMA MODEL" },
  { id: "diagnostics", label: "DIAGNOSTICS" },
  { id: "rolling-forecast", label: "ROLLING FORECAST" },
  { id: "performance", label: "PERFORMANCE" },
  { id: "pipeline-truth", label: "PIPELINE & TRUTH" },
];

export default function TimeSeriesMasterclass() {
  return (
    <MasterclassShell
      category="APPLIED ANALYTICS"
      title="Time Series Forecasting"
      subtitle="How do we forecast a seasonal monthly series without leaking future information?"
      navAnchors={navAnchors}
    >
      <div id="hero">
        <HeroSection />
      </div>
      <FoundationsSection />
      <StationaritySection />
      <SarimaSection />
      <DiagnosticsSection />
      <RollingForecastSection />
      <PerformanceSection />
      <PipelineCheatsheetTruthSection />
    </MasterclassShell>
  );
}
