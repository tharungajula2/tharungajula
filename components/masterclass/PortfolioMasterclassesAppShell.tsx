"use client";

import React from "react";
import Link from "next/link";
import { NOTEBOOK_MASTERCLASSES } from "@/lib/notebook-masterclasses";

export interface PortfolioMasterclassesAppShellProps {
  activeSlug: string;
  children: React.ReactNode;
}

export default function PortfolioMasterclassesAppShell({
  activeSlug,
  children,
}: PortfolioMasterclassesAppShellProps) {
  return (
    <div className="w-full relative bg-surface text-ink font-sans text-left min-h-screen">
      {/* APP HEADER BAR */}
      <div className="sticky top-0 z-50 bg-surface-raised/95 backdrop-blur-2xl border-b border-hairline px-4 sm:px-8 py-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* LEFT: BREADCRUMB & APP IDENTITY */}
          <div className="flex items-center gap-3">
            <Link
              href="/notebook"
              className="text-xs font-mono text-ink-muted hover:text-accent transition-colors shrink-0 uppercase tracking-wider"
            >
              ← Notebook
            </Link>
            <span className="text-ink-faint font-mono text-xs">/</span>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-accent font-bold uppercase tracking-widest">
                PORTFOLIO MASTERCLASSES
              </span>
              <span className="px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/30 text-[9px] font-semibold uppercase">
                APP
              </span>
            </div>
          </div>

          {/* RIGHT: PROJECT SELECTOR SCROLLABLE BAR */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {NOTEBOOK_MASTERCLASSES.map((item) => {
              const isActive = item.id === activeSlug;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-[10px] sm:text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-md transition-all uppercase whitespace-nowrap ${
                    isActive
                      ? "bg-accent text-surface font-bold shadow-xs"
                      : "bg-surface-sunken text-ink-muted hover:text-ink hover:bg-surface-raised border border-hairline-faint"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* APP CONTENT CONTAINER */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
