"use client";

import MasterclassReader from "@/components/masterclass/MasterclassReader";
import FoundationsSection from "./FoundationsSection";
import StationaritySection from "./StationaritySection";
import SarimaSection from "./SarimaSection";
import DiagnosticsSection from "./DiagnosticsSection";
import RollingForecastSection from "./RollingForecastSection";
import PerformanceSection from "./PerformanceSection";
import PipelineCheatsheetTruthSection from "./PipelineCheatsheetTruthSection";

const snapshot = [
  { label: "Monthly Observations", value: "204" },
  { label: "Candidate Models", value: "625 SARIMA" },
  { label: "Baseline MAPE", value: "12.69%" },
  { label: "SARIMA MAPE", value: "7.90%" },
  { label: "Validation Horizon", value: "Rolling Holdout" },
  { label: "Primary Technique", value: "Seasonal Differencing" },
];

export default function TimeSeriesMasterclass() {
  return (
    <MasterclassReader
      slug="time-series"
      title="Time Series Forecasting"
      subtitle="How to forecast a seasonal monthly time series without leaking future information across validation folds."
      metadataLine="Dataset: Seasonal Monthly Production · Scope: 204 observations · Stack: Statsmodels, Python, SARIMA"
      snapshotItems={snapshot}
    >
      <FoundationsSection />
      <StationaritySection />
      <SarimaSection />
      <DiagnosticsSection />
      <RollingForecastSection />
      <PerformanceSection />
      <PipelineCheatsheetTruthSection />
    </MasterclassReader>
  );
}
