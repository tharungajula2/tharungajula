"use client";

import MasterclassShell from "@/components/masterclass/MasterclassShell";
import HeroSection from "./HeroSection";
import FoundationPdSection from "./FoundationPdSection";
import ValidationSection from "./ValidationSection";
import LgdEadSection from "./LgdEadSection";
import Ifrs9Section from "./Ifrs9Section";
import BaselCapitalSection from "./BaselCapitalSection";
import MonitoringGovernanceSection from "./MonitoringGovernanceSection";
import PipelineMapCheatsheet from "./PipelineMapCheatsheet";

const navAnchors = [
  { id: "hero", label: "OVERVIEW" },
  { id: "foundation", label: "FOUNDATION" },
  { id: "validation", label: "VALIDATION" },
  { id: "lgd-ead", label: "LGD / EAD" },
  { id: "ifrs9", label: "IFRS 9" },
  { id: "capital", label: "CAPITAL" },
  { id: "governance", label: "GOVERNANCE" },
  { id: "cheatsheet", label: "CHEATSHEET" },
];

export default function CreditRiskMasterclass() {
  return (
    <MasterclassShell
      category="DOMAIN + MODELLING"
      title="Retail Credit Risk"
      subtitle="How does historical borrower behaviour become PD, expected loss, provisioning, regulatory capital and portfolio monitoring?"
      navAnchors={navAnchors}
    >
      <div id="hero">
        <HeroSection />
      </div>
      <FoundationPdSection />
      <ValidationSection />
      <LgdEadSection />
      <Ifrs9Section />
      <BaselCapitalSection />
      <MonitoringGovernanceSection />
      <PipelineMapCheatsheet />
    </MasterclassShell>
  );
}
