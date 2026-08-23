"use client";

import MasterclassReader from "@/components/masterclass/MasterclassReader";
import FrameMapGroundSection from "./FrameMapGroundSection";
import MethodSliceEvidenceSection from "./MethodSliceEvidenceSection";
import InterfaceIterateSection from "./InterfaceIterateSection";
import AiSystemsSection from "./AiSystemsSection";
import ProjectMapSection from "./ProjectMapSection";

const snapshot = [
  { label: "Core Rule 01", value: "Decision First" },
  { label: "Core Rule 02", value: "Data Meaning > Method" },
  { label: "Core Rule 03", value: "Evidence Before Polish" },
  { label: "Slice Delivery", value: "Thin Slice Approach" },
  { label: "AI Execution", value: "Code-Level Guardrails" },
  { label: "Final Interface", value: "Problem-Driven UX" },
];

export default function BuildMasterclass() {
  return (
    <MasterclassReader
      slug="build"
      title="How I Build"
      subtitle="How a vague business or technical problem becomes a testable analytical or product system."
      metadataLine="Methodology: Problem-Driven Engineering · Principles: Decision First, Data Grounding, Evidence Validation"
      snapshotItems={snapshot}
    >
      <FrameMapGroundSection />
      <MethodSliceEvidenceSection />
      <InterfaceIterateSection />
      <AiSystemsSection />
      <ProjectMapSection />
    </MasterclassReader>
  );
}
