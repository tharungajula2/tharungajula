"use client";

import MasterclassReader from "@/components/masterclass/MasterclassReader";
import FoundationPdSection from "./FoundationPdSection";
import ValidationSection from "./ValidationSection";
import LgdEadSection from "./LgdEadSection";
import Ifrs9Section from "./Ifrs9Section";
import BaselCapitalSection from "./BaselCapitalSection";
import MonitoringGovernanceSection from "./MonitoringGovernanceSection";
import PipelineMapCheatsheet from "./PipelineMapCheatsheet";

const snapshot = [
  { label: "Historical Loans", value: "466,285" },
  { label: "Ever-Default Loans", value: "50,968" },
  { label: "Out-of-Time Vintage", value: "2014" },
  { label: "Staged EAD", value: "$1.827B" },
  { label: "IFRS 9-Style ECL", value: "$278.48M" },
  { label: "IRB RWA", value: "$2.295B" },
];

export default function CreditRiskMasterclass() {
  return (
    <MasterclassReader
      slug="credit-risk"
      title="Retail Credit Risk"
      subtitle="How historical borrower behaviour becomes probability of default, loss severity, expected loss, provisioning, regulatory capital and portfolio monitoring."
      metadataLine="Dataset: LendingClub · Period: 2007–2014 · Stack: Python · Coverage: PD / LGD / EAD · IFRS 9 · Basel IRB"
      snapshotItems={snapshot}
    >
      <FoundationPdSection />
      <ValidationSection />
      <LgdEadSection />
      <Ifrs9Section />
      <BaselCapitalSection />
      <MonitoringGovernanceSection />
      <PipelineMapCheatsheet />
    </MasterclassReader>
  );
}
