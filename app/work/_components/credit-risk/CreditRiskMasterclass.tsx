"use client";

import HeroSection from "./HeroSection";
import FoundationPdSection from "./FoundationPdSection";
import ValidationSection from "./ValidationSection";
import LgdEadSection from "./LgdEadSection";
import Ifrs9Section from "./Ifrs9Section";
import BaselCapitalSection from "./BaselCapitalSection";
import MonitoringGovernanceSection from "./MonitoringGovernanceSection";
import PipelineMapCheatsheet from "./PipelineMapCheatsheet";

const navAnchors = [
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
    <div className="relative w-full max-w-5xl mx-auto py-24 sm:py-32 px-4 sm:px-6 pb-44 sm:pb-40">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-accent-glow via-accent-glow/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* STICKY LOCAL SECTION NAVIGATOR */}
      <div className="sticky top-20 z-40 mb-10 bg-surface-raised/90 backdrop-blur-xl border border-hairline p-2 rounded-full shadow-lg overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 min-w-max px-2">
          {navAnchors.map((anchor) => (
            <a
              key={anchor.id}
              href={`#${anchor.id}`}
              className="text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full text-ink-muted hover:text-accent hover:bg-surface-sunken transition-all uppercase whitespace-nowrap"
            >
              {anchor.label}
            </a>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="relative z-10">
        <HeroSection />
      </div>

      {/* PHASE 01 — FOUNDATION & PD */}
      <div className="relative z-10">
        <FoundationPdSection />
      </div>

      {/* PHASE 02 — VALIDATION */}
      <div className="relative z-10">
        <ValidationSection />
      </div>

      {/* PHASE 03 — LGD / EAD */}
      <div className="relative z-10">
        <LgdEadSection />
      </div>

      {/* PHASE 04 — IFRS 9 */}
      <div className="relative z-10">
        <Ifrs9Section />
      </div>

      {/* PHASE 05 — BASEL CAPITAL */}
      <div className="relative z-10">
        <BaselCapitalSection />
      </div>

      {/* PHASE 06 — MONITORING & GOVERNANCE */}
      <div className="relative z-10">
        <MonitoringGovernanceSection />
      </div>

      {/* PHASE 07 — PIPELINE MAP & CHEATSHEET */}
      <div className="relative z-10">
        <PipelineMapCheatsheet />
      </div>
    </div>
  );
}
