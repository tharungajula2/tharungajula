"use client";

import Link from "next/link";
import { NOTEBOOK_MASTERCLASSES } from "@/lib/notebook-masterclasses";

export default function PortfolioMasterclasses() {
  return (
    <div className="space-y-4">
      {/* SECTION HEADER */}
      <div className="border-b border-hairline pb-3">
        <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent mb-1 flex items-center gap-2">
          // 01 · PORTFOLIO MASTERCLASSES
        </div>
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink mb-1">
          Project Masterclasses
        </h2>
        <p className="text-xs sm:text-sm text-ink-muted font-sans max-w-2xl">
          Deep interactive breakdowns covering theory, calculations, domain context, validation, and engineering boundaries.
        </p>
      </div>

      {/* COMPACT MASTERCLASS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {NOTEBOOK_MASTERCLASSES.map((mc) => (
          <article
            key={mc.id}
            className="group relative flex flex-col justify-between p-5 rounded-xl bg-surface-raised backdrop-blur-xl border border-hairline hover:border-accent/50 shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent group-hover:via-accent transition-all" />

            <div>
              {/* CATEGORY & TITLE */}
              <div className="flex items-center justify-between gap-2 mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent font-semibold">
                <span>{mc.category}</span>
                {mc.id === "loc-iq" && (
                  <span className="text-[9px] text-accent font-mono lowercase border border-accent/30 px-1.5 py-0.2 rounded">
                    scenarios
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-ink mb-2 group-hover:text-accent transition-colors">
                {mc.title}
              </h3>

              {/* PRIMARY QUESTION / DESCRIPTION */}
              <p className="text-ink-muted text-xs leading-relaxed mb-3 font-sans line-clamp-2">
                {mc.question}
              </p>
            </div>

            <div>
              {/* QUIET METADATA ITEMS */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {mc.facts.slice(0, 3).map((fact) => (
                  <span
                    key={fact}
                    className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wide uppercase bg-surface-sunken text-ink-muted border border-hairline-faint"
                  >
                    {fact}
                  </span>
                ))}
              </div>

              {/* FOOTER & CTA */}
              <div className="flex items-center justify-between pt-3 border-t border-hairline-faint font-mono text-xs">
                <span className="text-ink-faint text-[10px] uppercase tracking-wider">
                  MASTERCLASS
                </span>
                <Link
                  href={mc.href}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-accent/10 text-accent border border-accent/30 font-bold uppercase tracking-wider text-[11px] hover:bg-accent hover:text-surface transition-all whitespace-nowrap"
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
