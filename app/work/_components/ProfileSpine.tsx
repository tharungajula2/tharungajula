"use client";

import { motion } from "framer-motion";

interface SpineItem {
  number: string;
  source: string;
  headline: string;
  body: string;
}

const spineItems: SpineItem[] = [
  {
    number: "01",
    source: "Engineering Base",
    headline: "Structured problem solving",
    body: "Building complex things from first principles and breaking problems into systems.",
  },
  {
    number: "02",
    source: "NIBM",
    headline: "Banking & Finance",
    body: "Lending, risk, financial markets and balance-sheet thinking become the domain foundation.",
  },
  {
    number: "03",
    source: "Lentra",
    headline: "Policy → System",
    body: "Lending policy becomes requirements, field mappings, decision rules and testable expected behaviour.",
  },
  {
    number: "04",
    source: "Jana",
    headline: "Portfolio → Management View",
    body: "Loan performance becomes DPD / PAR / NPA analysis, reconciliation, SQL workflows and management MIS.",
  },
  {
    number: "05",
    source: "IISc + Independent Practice",
    headline: "Quantitative Depth",
    body: "Machine learning, neural networks, forecasting, credit-risk modelling and portfolio analytics.",
  },
  {
    number: "06",
    source: "Product Systems",
    headline: "Decision → Interface",
    body: "Models, data, workflows, interfaces, AI-assisted development and evidence combined into usable systems.",
  },
];

export default function ProfileSpine() {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // SECTION 02 — PROFILE SPINE
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {spineItems.map((item, idx) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="bg-surface-raised backdrop-blur-xl border border-hairline p-4 sm:p-5 rounded-xl hover:border-accent-dim transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-accent">
                  {item.number}
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-ink-faint uppercase tracking-wider">
                  {item.source}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-ink mb-1.5 leading-snug">
                {item.headline}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">
                {item.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
