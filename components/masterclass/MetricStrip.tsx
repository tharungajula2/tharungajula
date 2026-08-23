"use client";

import React from "react";

export interface MetricItem {
  label: string;
  value: string;
  subtext?: string;
}

export interface MetricStripProps {
  metrics: MetricItem[];
  className?: string;
}

export default function MetricStrip({ metrics, className = "" }: MetricStripProps) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-raised/80 backdrop-blur-md p-4 rounded-xl border border-hairline ${className}`}
    >
      {metrics.map((item, i) => (
        <div key={i} className="flex flex-col justify-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink-muted mb-0.5">
            {item.label}
          </div>
          <div className="text-base sm:text-lg font-mono font-bold text-accent">
            {item.value}
          </div>
          {item.subtext && (
            <div className="text-[10px] text-ink-faint font-sans mt-0.5">
              {item.subtext}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
