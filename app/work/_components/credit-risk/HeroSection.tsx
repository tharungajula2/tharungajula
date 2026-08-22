"use client";

import { motion } from "framer-motion";
import { ProjectDataBadge } from "./Badges";

const tags = [
  "LendingClub",
  "2007–2014",
  "Python",
  "PD / LGD / EAD",
  "IFRS 9-style ECL",
  "Basel IRB",
];

const metrics = [
  { label: "Historical Loans", value: "466,285" },
  { label: "Ever-Default Loans", value: "50,968" },
  { label: "Out-of-Time Vintage", value: "2014" },
  { label: "Staged EAD", value: "$1.827B" },
  { label: "IFRS 9-Style ECL", value: "$278.48M" },
  { label: "IRB RWA", value: "$2.295B" },
];

const flowSteps = [
  "DEFINE",
  "PD",
  "VALIDATE",
  "LGD / EAD",
  "ECL",
  "CAPITAL",
  "MONITOR",
  "GOVERN",
];

export default function HeroSection() {
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
            FLAGSHIP // RETAIL CREDIT RISK
          </span>
          <div className="h-px flex-1 bg-hairline-faint" />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-4">
          Retail Credit Risk System
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl mb-6">
          A complete reconstruction of how historical borrower behaviour becomes probability of default, loss severity, expected loss, provisioning, regulatory capital and portfolio monitoring.
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-full bg-surface-raised border border-hairline text-ink font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* SUPPORTED METRICS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-surface-raised border border-hairline p-3.5 rounded-xl flex flex-col justify-between"
            >
              <div className="mb-1">
                <ProjectDataBadge />
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-accent">
                {m.value}
              </div>
              <div className="text-[11px] font-mono text-ink-muted mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ONE-LINE STORY ANCHOR */}
      <div className="bg-surface-raised border border-accent/30 p-5 sm:p-6 rounded-2xl mb-8 backdrop-blur-xl">
        <div className="text-xs font-mono text-accent uppercase tracking-widest mb-2 font-bold">
          // THE ONE-LINE STORY
        </div>
        <p className="text-sm sm:text-base text-ink leading-relaxed font-semibold mb-5">
          Use historical good/bad behaviour to build PD, validate it, estimate LGD and EAD, combine those into expected loss and regulatory-risk calculations, then monitor and govern the model and portfolio.
        </p>

        {/* MAJOR FLOW STRIP */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono bg-surface-sunken p-3 rounded-xl border border-hairline-faint">
          {flowSteps.map((step, idx) => (
            <span key={step} className="flex items-center gap-2">
              <span className="text-accent font-bold">{step}</span>
              {idx < flowSteps.length - 1 && (
                <span className="text-ink-faint">→</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
