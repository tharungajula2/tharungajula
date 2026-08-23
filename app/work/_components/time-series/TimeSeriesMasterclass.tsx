"use client";

import FoundationsSection from "./FoundationsSection";
import StationaritySection from "./StationaritySection";
import SarimaSection from "./SarimaSection";
import DiagnosticsSection from "./DiagnosticsSection";
import RollingForecastSection from "./RollingForecastSection";
import PerformanceSection from "./PerformanceSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

export default function TimeSeriesMasterclass() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 text-ink font-sans">
      <FoundationsSection />
      <StationaritySection />
      <SarimaSection />
      <DiagnosticsSection />
      <RollingForecastSection />
      <PerformanceSection />
      <PipelineCheatsheetTruthSection />
    </div>
  );
}
