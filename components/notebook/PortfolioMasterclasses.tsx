"use client";

import Link from "next/link";
import { NOTEBOOK_MASTERCLASSES } from "@/lib/notebook-masterclasses";

export default function PortfolioMasterclasses() {
  return (
    <div className="space-y-6">
      {/* SECTION HEADER */}
      <div className="border-b border-hairline pb-4">
        <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent mb-1 flex items-center gap-2">
          // 01 · PORTFOLIO MASTERCLASSES
        </div>
        <h2 className="text-xl sm:text-3xl font-bold uppercase tracking-tight text-ink mb-2">
          Learn the projects end to end.
        </h2>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans max-w-2xl">
          Start with the system flow, then open the project to learn the theory, calculations, validation and boundaries in context.
        </p>
      </div>

      {/* MASTERCLASS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {NOTEBOOK_MASTERCLASSES.map((mc) => (
          <article
            key={mc.id}
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-surface-raised backdrop-blur-2xl border border-hairline hover:border-accent/50 shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent group-hover:via-accent transition-all" />

            <div>
              {/* CATEGORY & TITLE */}
              <div className="flex items-center justify-between gap-3 mb-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-accent font-semibold">
                <span>{mc.category}</span>
                {mc.id === "loc-iq" && (
                  <span className="text-[9px] text-cyan-400 font-mono lowercase border border-cyan-500/30 px-1.5 py-0.5 rounded">
                    static scenarios
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink mb-3 group-hover:text-accent transition-colors">
                {mc.title}
              </h3>

              {/* PRIMARY QUESTION */}
              <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-4 font-sans italic border-l-2 border-accent/40 pl-3">
                "{mc.question}"
              </p>

              {/* MASTER FLOW */}
              <div className="mb-5 bg-surface-sunken p-3 rounded-xl border border-hairline-faint font-mono text-[11px]">
                <div className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1.5">
                  // MASTER FLOW
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-ink-muted">
                  {mc.flow.map((step, idx) => (
                    <span key={step} className="flex items-center gap-1.5">
                      <span className="text-ink font-medium">{step}</span>
                      {idx < mc.flow.length - 1 && (
                        <span className="text-accent/60 font-bold">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {/* KEY FACTS */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {mc.facts.map((fact) => (
                  <span
                    key={fact}
                    className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-surface-sunken text-ink-muted border border-hairline-faint"
                  >
                    {fact}
                  </span>
                ))}
              </div>

              {/* FOOTER & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-hairline-faint font-mono text-xs">
                <span className="text-ink-faint text-[10px] uppercase tracking-widest">
                  FULL MASTERCLASS
                </span>
                <Link
                  href={mc.href}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 text-accent border border-accent/30 font-bold uppercase tracking-wider text-xs hover:bg-accent hover:text-surface transition-all whitespace-nowrap"
                >
                  Open Masterclass →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
