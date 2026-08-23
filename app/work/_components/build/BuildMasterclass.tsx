"use client";

import MasterclassShell from "@/components/masterclass/MasterclassShell";
import HeroMethodSection from "./HeroMethodSection";
import FrameMapGroundSection from "./FrameMapGroundSection";
import MethodSliceEvidenceSection from "./MethodSliceEvidenceSection";
import InterfaceIterateSection from "./InterfaceIterateSection";
import AiSystemsSection from "./AiSystemsSection";
import ProjectMapSection from "./ProjectMapSection";

const navAnchors = [
  { id: "hero", label: "OVERVIEW" },
  { id: "frame-map-ground", label: "FRAME, MAP & GROUND" },
  { id: "method-slice-evidence", label: "METHOD & EVIDENCE" },
  { id: "interface-iterate", label: "INTERFACE & ITERATE" },
  { id: "ai-systems", label: "AI SYSTEMS" },
  { id: "project-map", label: "PROJECT MAP" },
];

export default function BuildMasterclass() {
  return (
    <MasterclassShell
      category="PRODUCT + SYSTEMS"
      title="How I Build"
      subtitle="How does a vague problem become a testable analytical or product system?"
      navAnchors={navAnchors}
    >
      <div id="hero">
        <HeroMethodSection />
      </div>
      <FrameMapGroundSection />
      <MethodSliceEvidenceSection />
      <InterfaceIterateSection />
      <AiSystemsSection />
      <ProjectMapSection />
    </MasterclassShell>
  );
}
