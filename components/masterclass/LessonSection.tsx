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
    <section id={id} className={`my-10 ${className}`}>
      {/* SECTION HEADER (H2) */}
      <div className="border-b border-hairline pb-3 mb-6">
        {stepNumber && (
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent mb-1">
            // {stepNumber}
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
      <div className="space-y-6 text-sm sm:text-base text-ink-muted font-sans leading-relaxed">
        {children}
      </div>
    </section>
  );
}
