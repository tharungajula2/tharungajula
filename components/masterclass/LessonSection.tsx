"use client";

import React from "react";

export interface LessonSectionProps {
  id: string;
  stepNumber?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function LessonSection({
  id,
  stepNumber,
  title,
  subtitle,
  children,
  className = "",
}: LessonSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border border-hairline bg-surface-raised/70 backdrop-blur-xl p-5 sm:p-8 rounded-2xl shadow-sm transition-all ${className}`}
    >
      {/* SECTION HEADER */}
      <div className="border-b border-hairline-faint pb-4 mb-6">
        {stepNumber && (
          <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent mb-1">
            // PHASE {stepNumber}
          </div>
        )}
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* SECTION BODY */}
      <div className="space-y-6 text-sm text-ink-muted font-sans leading-relaxed">
        {children}
      </div>
    </section>
  );
}
