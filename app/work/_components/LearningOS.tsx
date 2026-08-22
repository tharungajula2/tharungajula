"use client";

import { motion } from "framer-motion";
import ProfileSpine from "./ProfileSpine";
import OperatingModel from "./OperatingModel";
import ExperienceCompressed from "./ExperienceCompressed";
import CapabilityMap from "./CapabilityMap";
import ProjectFit from "./ProjectFit";
import MemoryStrip from "./MemoryStrip";

const domainProgression = [
  "Banking Domain",
  "Lending Systems",
  "Portfolio Analytics",
  "Quantitative Models",
  "Product Systems",
];

export default function LearningOS() {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-24 sm:py-32 px-4 sm:px-6 pb-44 sm:pb-40">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-accent-glow via-accent-glow/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* SECTION 01 — COMPACT INTRO */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-14"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
            LEARNING OS // PROFILE MAP
          </span>
          <div className="h-px flex-1 bg-hairline-faint" />
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight mb-4">
          One progression, not disconnected projects.
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl mb-6">
          Banking and finance formed the domain base. Lending-system work added policy, requirements and data translation; portfolio work added live risk monitoring; quantitative practice added modelling and validation; the current layer connects those pieces into complete analytical and product systems.
        </p>

        {/* COMPACT PROGRESSION FLOW */}
        <div className="inline-flex flex-wrap items-center gap-2 bg-surface-raised backdrop-blur-xl border border-hairline px-4 py-2.5 rounded-full shadow-sm text-xs sm:text-sm font-mono">
          {domainProgression.map((step, idx) => (
            <span key={step} className="flex items-center gap-2">
              <span className="text-ink font-medium">{step}</span>
              {idx < domainProgression.length - 1 && (
                <span className="text-accent font-bold">→</span>
              )}
            </span>
          ))}
        </div>
      </motion.div>

      {/* SECTION 02 — PROFILE SPINE */}
      <div className="relative z-10">
        <ProfileSpine />
      </div>

      {/* SECTION 03 — CONNECTED OPERATING MODEL */}
      <div className="relative z-10">
        <OperatingModel />
      </div>

      {/* SECTION 04 — EXPERIENCE, COMPRESSED */}
      <div className="relative z-10">
        <ExperienceCompressed />
      </div>

      {/* SECTION 05 — CAPABILITY MAP */}
      <div className="relative z-10">
        <CapabilityMap />
      </div>

      {/* SECTION 06 — HOW THE PROJECTS FIT */}
      <div className="relative z-10">
        <ProjectFit />
      </div>

      {/* SECTION 07 — COMPACT MEMORY STRIP */}
      <div className="relative z-10">
        <MemoryStrip />
      </div>
    </div>
  );
}
