"use client";

import { motion } from "framer-motion";

const steps = [
  "UNDERSTAND THE DECISION",
  "MAP THE DATA",
  "CHOOSE THE METHOD",
  "CHALLENGE THE RESULT",
  "SHIP IT WITH THE EVIDENCE",
];

export default function OperatingModel() {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // SECTION 03 — CONNECTED OPERATING MODEL
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      <div className="bg-surface-raised backdrop-blur-xl border border-hairline p-5 sm:p-7 rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* FLOW DIAGRAM */}
          <div className="lg:col-span-7 flex flex-col gap-2">
            {steps.map((step, idx) => (
              <div key={step} className="flex flex-col items-center sm:items-start">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="w-full bg-surface-sunken border border-hairline-faint hover:border-accent-dim px-4 py-2.5 rounded-lg flex items-center gap-3 transition-colors"
                >
                  <span className="text-xs font-mono text-accent font-bold shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-mono tracking-wider text-ink font-medium uppercase">
                    {step}
                  </span>
                </motion.div>
                {idx < steps.length - 1 && (
                  <div className="py-1 text-accent/60 text-xs font-mono select-none pl-4">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* EXPLANATION SIDEBAR */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:border-l border-hairline-faint lg:pl-6 pt-4 lg:pt-0 border-t lg:border-t-0">
            <h3 className="text-xs font-mono text-accent uppercase tracking-widest mb-3 font-semibold">
              // OPERATING PATTERN
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">
              The individual projects differ in domain and technique, but the working pattern is consistent: understand the decision, preserve the meaning of the data, choose the appropriate method, challenge the result, and make the output usable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
