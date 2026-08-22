"use client";

import React from "react";

export interface FlowNode {
  step: string; // e.g. "01"
  title: string; // e.g. "Input"
  description: string; // e.g. "Raw customer data"
}

export interface MasterFlowProps {
  nodes?: FlowNode[];
  title?: string;
}

export const DEFAULT_MASTER_FLOW_NODES: FlowNode[] = [
  { step: "01", title: "Input", description: "Raw business, transactional & portfolio data" },
  { step: "02", title: "Transformation", description: "Feature engineering, WoE/IV binning & cleaning" },
  { step: "03", title: "Method", description: "Statistical, machine learning or structural scoring" },
  { step: "04", title: "Validation", description: "Discrimination, calibration & out-of-time stability" },
  { step: "05", title: "Result", description: "Quantified metric, ECL provision or portfolio RWA" },
  { step: "06", title: "Decision", description: "Underwriting policy, capital allocation or workflow trigger" },
];

export default function MasterFlow({
  nodes = DEFAULT_MASTER_FLOW_NODES,
  title = "MASTERFLOW SEQUENCE",
}: MasterFlowProps) {
  return (
    <div className="w-full my-6 p-4 sm:p-5 rounded-2xl bg-surface-raised border border-hairline font-mono text-xs select-none">
      <div className="text-[10px] text-accent tracking-[0.14em] uppercase font-bold mb-4">
        // {title}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {nodes.map((n, idx) => (
          <div
            key={n.step}
            className="relative p-3.5 rounded-xl bg-surface-sunken border border-hairline hover:border-accent/40 transition-all space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-accent font-bold">#{n.step}</span>
              {idx < nodes.length - 1 && (
                <span className="hidden lg:block text-accent text-xs font-bold font-sans">→</span>
              )}
            </div>

            <div className="font-bold text-ink text-xs uppercase font-mono">{n.title}</div>
            <p className="text-ink-muted font-sans text-[11px] leading-relaxed">{n.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
