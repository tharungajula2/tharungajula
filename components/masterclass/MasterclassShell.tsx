"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export interface NavAnchor {
  id: string;
  label: string;
}

export interface MasterclassShellProps {
  category: string;
  title: string;
  subtitle?: string;
  navAnchors: NavAnchor[];
  children: React.ReactNode;
}

export default function MasterclassShell({
  category,
  title,
  subtitle,
  navAnchors,
  children,
}: MasterclassShellProps) {
  const [activeId, setActiveId] = useState<string>(navAnchors[0]?.id || "");

  useEffect(() => {
    if (typeof window === "undefined" || !navAnchors.length) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = navAnchors.length - 1; i >= 0; i--) {
        const el = document.getElementById(navAnchors[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(navAnchors[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navAnchors]);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6 text-ink font-sans text-left pb-28 sm:pb-32 overflow-x-hidden">
      {/* RESTRAINED NEUTRAL AMBIENT GLOW */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[40%] bg-gradient-to-tr from-accent/10 via-accent/5 to-transparent blur-[100px] pointer-events-none z-0" />

      {/* TOP BREADCRUMB & BACK TO NOTEBOOK NAV */}
      <nav aria-label="Masterclass Breadcrumb" className="relative z-10 mb-6 flex items-center justify-between font-mono text-xs border-b border-hairline-faint pb-3">
        <div className="flex items-center gap-2 text-ink-muted">
          <Link href="/notebook" className="hover:text-accent transition-colors">
            NOTEBOOK
          </Link>
          <span className="text-ink-faint">/</span>
          <span className="text-accent font-semibold uppercase">{category}</span>
        </div>
        <Link
          href="/notebook"
          className="inline-flex items-center gap-1 text-[11px] text-ink-muted hover:text-accent transition-colors uppercase font-semibold"
        >
          ← All Masterclasses
        </Link>
      </nav>

      {/* HEADER SECTION */}
      <header className="relative z-10 mb-8 border-b border-hairline pb-6">
        <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent mb-1.5">
          // MASTERCLASS // {category}
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans max-w-3xl border-l-2 border-accent/40 pl-3 italic">
            "{subtitle}"
          </p>
        )}
      </header>

      {/* UNIFIED STICKY SECTION NAVIGATOR */}
      <div className="sticky top-16 sm:top-20 z-40 mb-10 bg-surface-raised/95 backdrop-blur-xl border border-hairline p-1.5 rounded-full shadow-md overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 min-w-max px-1">
          {navAnchors.map((anchor) => {
            const isActive = activeId === anchor.id;
            return (
              <a
                key={anchor.id}
                href={`#${anchor.id}`}
                className={`text-[10px] sm:text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full transition-all uppercase whitespace-nowrap ${
                  isActive
                    ? "bg-accent/15 text-accent font-bold border border-accent/40 shadow-xs"
                    : "text-ink-muted hover:text-accent hover:bg-surface-sunken"
                }`}
              >
                {anchor.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT LESSON PANE */}
      <main className="relative z-10 space-y-12">
        {children}
      </main>
    </div>
  );
}
