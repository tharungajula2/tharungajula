"use client";

import { motion } from "framer-motion";

interface MemoryCard {
  label: string;
  copy: string;
}

const memoryCards: MemoryCard[] = [
  {
    label: "DOMAIN",
    copy: "Understand what decision the business is actually making.",
  },
  {
    label: "DATA",
    copy: "Know source, grain, date, transformation and owner.",
  },
  {
    label: "METHOD",
    copy: "Use the simplest method that properly represents the problem.",
  },
  {
    label: "EVIDENCE",
    copy: "Validate, reconcile and expose limitations.",
  },
  {
    label: "SYSTEM",
    copy: "Make the result usable through a workflow or interface.",
  },
];

export default function MemoryStrip() {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // SECTION 07 — COMPACT MEMORY STRIP
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {memoryCards.map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="bg-surface-raised backdrop-blur-xl border border-hairline p-4 rounded-xl flex flex-col justify-between hover:border-accent-dim transition-all"
          >
            <div>
              <span className="text-xs font-mono font-bold text-accent tracking-widest uppercase block mb-1">
                {card.label}
              </span>
              <p className="text-xs text-ink-muted leading-relaxed">
                {card.copy}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
