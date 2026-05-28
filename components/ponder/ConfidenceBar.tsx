"use client";

import { motion } from "framer-motion";
import { PonderConfidence } from "@/types/ponder";

interface ConfidenceBarProps {
  confidence?: PonderConfidence;
}

export default function ConfidenceBar({ confidence }: ConfidenceBarProps) {
  // Default fallback scores matching Phase 1 spec
  const scores = confidence || {
    faithfulness: 94,
    relevance: 91,
    completeness: 87,
    overall: 91,
  };

  const getMetricColor = (val: number) => {
    if (val >= 90) return "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)]";
    if (val >= 75) return "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.3)]";
    return "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.3)]";
  };

  const getMetricTextClass = (val: number) => {
    if (val >= 90) return "text-cyan-400 font-mono";
    if (val >= 75) return "text-emerald-400 font-mono";
    return "text-amber-400 font-mono";
  };

  const metrics = [
    { label: "FAITHFULNESS", value: scores.faithfulness, desc: "Grounded strictly in source materials" },
    { label: "RELEVANCE", value: scores.relevance, desc: "Addresses user's prompt directly" },
    { label: "COMPLETENESS", value: scores.completeness, desc: "No critical structural gaps left unaddressed" },
  ];

  return (
    <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-4 select-none">
      {/* Overall Score Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono tracking-widest text-white/40">// SYSTEM_EVALUATION</span>
          <span className="text-xs font-bold text-white tracking-wide">Cognitive Validation Matrix</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-mono text-white/30 block">OVERALL_CONFIDENCE</span>
          <span className="text-lg font-bold text-cyan-400 font-mono tracking-tighter">
            {scores.overall}%
          </span>
        </div>
      </div>

      {/* Mini Progress bars */}
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-1">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-mono text-white/50 tracking-wider font-semibold">{metric.label}</span>
              <span className={getMetricTextClass(metric.value)}>{metric.value}%</span>
            </div>
            
            {/* Outer Bar */}
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className={`h-full rounded-full ${getMetricColor(metric.value)}`}
              />
            </div>
            <p className="text-[9px] text-white/30 font-mono italic leading-none">{metric.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
