"use client";

import { motion } from "framer-motion";
import { ProductArchitectureBadge, StaticScenarioBadge, GenuinelyBuiltBadge } from "./Badges";

const tags = [
  "6 Primary Identifiers",
  "46 Mapped Source Types",
  "42 Defined Fields",
  "6-Layer Evidence Graph",
  "ReactFlow Visualisation",
  "Composite Edge Weighting",
  "Proxy-IP Down-Weighting",
  "Pre-Computed Static Traces",
];

const headlineFacts = [
  { label: "Primary Identifiers", value: "6" },
  { label: "Mapped Source Types", value: "46" },
  { label: "Defined Fields", value: "42" },
  { label: "Evidence Layers", value: "6" },
  { label: "Truth-Flag States", value: "3 (G/A/R)" },
  { label: "UI Graph Engine", value: "ReactFlow" },
  { label: "Stack", value: "Next.js / TS" },
];

const topFlowSteps = [
  "IDENTIFIERS",
  "SOURCES",
  "RETURNED FIELDS",
  "DERIVED SIGNALS",
  "WEIGHTED EVIDENCE",
  "CANDIDATE LOCATIONS",
  "TRUTH FLAG",
];

export default function HeroTruthSection() {
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
          <span className="text-cyan-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
            PRODUCT ARCHITECTURE // LOCATION INTELLIGENCE
          </span>
          <div className="h-px flex-1 bg-hairline-faint" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            LOC-IQ
          </h1>

          {/* PROMINENT DEMO ACCESS BUTTON */}
          <a
            href="https://loc-iq.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition-all shadow-lg hover:shadow-cyan-500/10 shrink-0 w-fit"
          >
            <span>Open LOC-IQ Product Demo</span>
            <span>↗</span>
          </a>
        </div>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl mb-6">
          A front-end reasoning console that maps applicant identifiers to external location evidence, converts that evidence into weighted signals and shows how multiple signals can converge on candidate locations.
        </p>

        {/* BADGES & TAGS */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <ProductArchitectureBadge />
          <StaticScenarioBadge />
          <GenuinelyBuiltBadge label="EXPLAINABLE EVIDENCE" />
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-full bg-surface-raised border border-hairline text-ink font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* HEADLINE NUMBERS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {headlineFacts.map((f) => (
            <div
              key={f.label}
              className="bg-surface-raised border border-hairline p-3.5 rounded-xl flex flex-col justify-between"
            >
              <div className="mb-1">
                <ProductArchitectureBadge label="PRODUCT FACT" />
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-cyan-400">
                {f.value}
              </div>
              <div className="text-[11px] font-mono text-ink-muted mt-0.5">
                {f.label}
              </div>
            </div>
          ))}
        </div>

        {/* STATIC SCENARIO TRUTH BANNER */}
        <div className="bg-cyan-500/10 border border-cyan-500/30 p-3.5 rounded-xl text-xs font-mono text-cyan-300 font-semibold mb-8 flex items-center justify-between">
          <span>STATIC SCENARIOS — FRONT-END REASONING CONSOLE DEMO</span>
          <span className="text-[10px] text-cyan-400/80 uppercase">No Live 46-Source APIs / No Empirical ML Model</span>
        </div>
      </motion.div>

      {/* MASTER FLOW */}
      <div className="bg-surface-raised border border-cyan-500/30 p-5 sm:p-6 rounded-2xl mb-8 backdrop-blur-xl">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 font-bold">
          // MASTER EVIDENCE REASONING FLOW
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
          {topFlowSteps.map((step, idx) => (
            <span key={step} className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">{step}</span>
              {idx < topFlowSteps.length - 1 && (
                <span className="text-ink-faint">→</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
