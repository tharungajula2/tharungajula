"use client";

import FoundationPdSection from "./FoundationPdSection";
import ValidationSection from "./ValidationSection";
import LgdEadSection from "./LgdEadSection";
import Ifrs9Section from "./Ifrs9Section";
import BaselCapitalSection from "./BaselCapitalSection";
import MonitoringGovernanceSection from "./MonitoringGovernanceSection";
import PipelineMapCheatsheet from "./PipelineMapCheatsheet";

export default function CreditRiskMasterclass() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 text-ink font-sans">
      <FoundationPdSection />
      <ValidationSection />
      <LgdEadSection />
      <Ifrs9Section />
      <BaselCapitalSection />
      <MonitoringGovernanceSection />
      <PipelineMapCheatsheet />
    </div>
  );
}
