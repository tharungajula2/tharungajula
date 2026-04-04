"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { mockMember } from "../../data/simulation/mockMember";

// Section Components
import { CommandCenter } from "../../components/simulation/sections/CommandCenter";
import { TimelineIntake } from "../../components/simulation/sections/TimelineIntake";
import { BiomarkerIntelligence } from "../../components/simulation/sections/BiomarkerIntelligence";
import { InterventionPlan } from "../../components/simulation/sections/InterventionPlan";
import { CareExecution } from "../../components/simulation/sections/CareExecution";
import { AICopilot } from "../../components/simulation/sections/AICopilot";
import { SoftCTA } from "../../components/simulation/sections/SoftCTA";

export default function SimulationPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center font-mono text-xs text-white/20 uppercase tracking-widest">LOADING_SIM_ENGINE...</div>}>
      <SimulationContent />
    </Suspense>
  );
}

function SimulationContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "command";

  const renderSection = () => {
    switch (currentTab) {
      case "command":
        return <CommandCenter state={mockMember} />;
      case "timeline":
        return <TimelineIntake state={mockMember} />;
      case "biomarker":
        return <BiomarkerIntelligence state={mockMember} />;
      case "intervention":
        return <InterventionPlan state={mockMember} />;
      case "execution":
        return <CareExecution state={mockMember} />;
      case "copilot":
        return <AICopilot state={mockMember} />;
      default:
        return <CommandCenter state={mockMember} />;
    }
  };

  return (
    <div className="w-full h-full pb-20">
      <div key={currentTab} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {renderSection()}
        <SoftCTA />
      </div>
    </div>
  );
}
