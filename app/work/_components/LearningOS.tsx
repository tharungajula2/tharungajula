"use client";

import { motion } from "framer-motion";
import ProfileSpine from "./ProfileSpine";
import OperatingModel from "./OperatingModel";
import ExperienceCompressed from "./ExperienceCompressed";
import CapabilityMap from "./CapabilityMap";

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
            PROFILE MAP
          </span>
          <div className="h-px flex-1 bg-hairline-faint" />
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight mb-4">
          One progression, not disconnected projects.
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl mb-6">
          I build decision systems end to end — the model, the guardrails, and the product around them. Banking and finance gave me the domain. Lending technology taught me to turn policy into system behaviour. Portfolio work put me next to live risk. The quantitative layer added modelling and validation. What I do now is assemble those into complete systems and ship them.
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
    </div>
  );
}
