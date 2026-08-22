"use client";

import React from "react";

export interface RememberCardProps {
  rule: string;
  context?: string;
}

export default function RememberCard({ rule, context }: RememberCardProps) {
  return (
    <div className="w-full my-4 p-4 rounded-xl bg-accent/10 border-l-4 border-l-accent border border-hairline font-mono text-xs text-accent space-y-1">
      <div className="font-bold text-[10px] uppercase tracking-wider block">
        ★ KEY MEMORY RULE (RAPID RECALL):
      </div>
      <p className="text-ink font-sans font-semibold text-xs sm:text-sm leading-relaxed">
        {rule}
      </p>
      {context && (
        <span className="text-[10px] text-ink-faint font-sans block pt-1 border-t border-accent/20">
          Context: {context}
        </span>
      )}
    </div>
  );
}
