"use client";

import FrameMapGroundSection from "./FrameMapGroundSection";
import MethodSliceEvidenceSection from "./MethodSliceEvidenceSection";
import InterfaceIterateSection from "./InterfaceIterateSection";
import AiSystemsSection from "./AiSystemsSection";
import ProjectMapSection from "./ProjectMapSection";

export default function BuildMasterclass() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 text-ink font-sans">
      <FrameMapGroundSection />
      <MethodSliceEvidenceSection />
      <InterfaceIterateSection />
      <AiSystemsSection />
      <ProjectMapSection />
    </div>
  );
}
