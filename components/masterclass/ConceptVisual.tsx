"use client";

import React from "react";

export interface ConceptVisualProps {
  title?: string;
  type: "Project Data" | "Teaching Illustration";
  children: React.ReactNode;
  caption?: string;
}

export default function ConceptVisual({
  title = "CONCEPT VISUALIZATION",
  type,
  children,
  caption,
}: ConceptVisualProps) {
  const isProjectData = type === "Project Data";

  return (
    <div className="w-full my-4 p-4 rounded-2xl bg-surface-raised border border-hairline font-sans text-xs space-y-3">
      <div className="flex items-center justify-between border-b border-hairline pb-2 font-mono">
        <span className="text-xs font-bold text-ink uppercase">{title}</span>
        <span
          className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
            isProjectData
              ? "bg-signal/15 text-signal border border-signal/30"
              : "bg-accent/15 text-accent border border-accent/30"
          }`}
        >
          {type}
        </span>
      </div>

      <div className="p-3 rounded-xl bg-surface-sunken border border-hairline overflow-hidden flex items-center justify-center">
        {children}
      </div>

      {caption && (
        <p className="font-mono text-[10px] text-ink-faint leading-normal text-center">
          {caption}
        </p>
      )}
    </div>
  );
}
