"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NOTEBOOK_MASTERCLASSES } from "@/lib/notebook-masterclasses";

export interface PortfolioMasterclassesAppShellProps {
  activeSlug: string;
  children: React.ReactNode;
}

export default function PortfolioMasterclassesAppShell({
  activeSlug,
  children,
}: PortfolioMasterclassesAppShellProps) {
  const router = useRouter();

  return (
    <div className="w-full relative bg-surface text-ink font-sans text-left min-h-screen">
      {/* APP HEADER BAR */}
      <div className="sticky top-0 z-50 bg-surface-raised/95 backdrop-blur-xl border-b border-hairline px-4 sm:px-8 py-2.5">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3 font-mono text-xs">
          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 text-ink-muted shrink-0">
            <Link
              href="/notebook"
              className="hover:text-accent transition-colors uppercase tracking-wider text-[11px]"
            >
              ← Notebook
            </Link>
            <span className="text-ink-faint">/</span>
            <span className="text-accent font-semibold uppercase text-[11px] hidden sm:inline">
              Portfolio Masterclasses
            </span>
          </div>

          {/* MASTERCLASS SELECTOR DROPDOWN */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-ink-faint uppercase tracking-wider hidden sm:inline">
              Masterclass:
            </span>
            <select
              value={activeSlug}
              onChange={(e) => router.push(`/notebook/apps/portfolio-masterclasses/${e.target.value}`)}
              className="bg-surface-sunken border border-hairline text-ink font-mono text-xs px-3 py-1.5 rounded-lg outline-none cursor-pointer hover:border-accent/40 focus:border-accent transition-all max-w-[210px] sm:max-w-xs truncate"
            >
              {NOTEBOOK_MASTERCLASSES.map((item, idx) => (
                <option key={item.id} value={item.id} className="bg-surface-raised text-ink">
                  {String(idx + 1).padStart(2, "0")} · {item.title}
                </option>
              ))}
            </select>
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
