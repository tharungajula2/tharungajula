"use client";

import React from "react";

export interface LearningStepProps {
  stepNumber: number | string;
  title: string;
  purpose: string;
  children?: React.ReactNode;
  visual?: React.ReactNode;
  formula?: React.ReactNode;
  workedExample?: React.ReactNode;
}

export default function LearningStep({
  stepNumber,
  title,
  purpose,
  children,
  visual,
  formula,
  workedExample,
}: LearningStepProps) {
  return (
    <div className="w-full my-6 p-5 sm:p-6 rounded-2xl bg-surface-raised border border-hairline font-sans text-xs space-y-4">
      <div className="flex items-center justify-between border-b border-hairline pb-3 font-mono">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-accent/15 text-accent font-bold text-xs">
            STEP {String(stepNumber).padStart(2, '0')}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-ink uppercase tracking-tight font-serif">{title}</h3>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-surface-sunken border border-hairline space-y-1">
        <span className="font-mono text-[10px] text-accent font-bold uppercase block">// PURPOSE:</span>
        <p className="text-ink text-xs sm:text-sm font-medium leading-relaxed">{purpose}</p>
      </div>

      {children && <div className="text-ink-muted text-xs sm:text-sm leading-relaxed space-y-2">{children}</div>}

      {formula && <div className="pt-2">{formula}</div>}
      {workedExample && <div className="pt-2">{workedExample}</div>}
      {visual && <div className="pt-2">{visual}</div>}
    </div>
  );
}
