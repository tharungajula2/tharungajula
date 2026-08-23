"use client";

import { motion } from "framer-motion";
import { SystemMethodBadge, CorePrincipleBadge } from "./Badges";

const masterFlowSteps = [
  "FRAME THE PROBLEM",
  "MAP THE SYSTEM",
  "GROUND THE DATA",
  "CHOOSE THE METHOD",
  "BUILD THIN SLICE",
  "CREATE EVIDENCE",
  "INTERFACE & ITERATE",
];

export default function HeroMethodSection() {
  return (
    <div className="mb-16">
      {/* KICKER & TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
            SYSTEM BUILDING // METHOD
          </span>
          <div className="h-px flex-1 bg-hairline-faint" />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-4">
          How I Build
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl mb-6">
          Start from the decision, make the data and assumptions explicit, choose the appropriate method, validate what was built, and turn the result into a usable system with evidence.
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          <SystemMethodBadge />
          <CorePrincipleBadge label="DECISION FIRST · METHOD SECOND" />
        </div>
      </motion.div>

      {/* MASTER FLOW */}
      <div className="bg-surface-raised border border-accent/30 p-5 sm:p-6 rounded-2xl mb-8 backdrop-blur-xl">
        <div className="text-xs font-mono text-accent uppercase tracking-widest mb-3 font-bold">
          // REUSABLE 7-STEP SYSTEM BUILDING METHOD
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
          {masterFlowSteps.map((step, idx) => (
            <span key={step} className="flex items-center gap-2">
              <span className="text-accent font-bold">{step}</span>
              {idx < masterFlowSteps.length - 1 && (
                <span className="text-ink-faint">→</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
