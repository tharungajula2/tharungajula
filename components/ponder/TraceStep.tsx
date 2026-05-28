"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  Search, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle 
} from "lucide-react";
import { PonderTraceStep } from "@/types/ponder";

interface TraceStepProps {
  step: PonderTraceStep;
}

export default function TraceStep({ step }: TraceStepProps) {
  const [isOpen, setIsOpen] = useState(step.status === "active");

  const getStatusConfig = (type: PonderTraceStep["type"]) => {
    switch (type) {
      case "planning":
        return {
          colorClass: "text-amber-400 border-amber-500/30 bg-amber-950/20",
          dotColor: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
          icon: Compass,
        };
      case "searching":
        return {
          colorClass: "text-cyan-400 border-cyan-500/30 bg-cyan-950/20",
          dotColor: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]",
          icon: Search,
        };
      case "analyzing":
        return {
          colorClass: "text-purple-400 border-purple-500/30 bg-purple-950/20",
          dotColor: "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]",
          icon: Cpu,
        };
      case "evaluating":
        return {
          colorClass: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20",
          dotColor: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
          icon: ShieldCheck,
        };
      case "complete":
        return {
          colorClass: "text-green-400 border-green-500/30 bg-green-950/20",
          dotColor: "bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.5)]",
          icon: CheckCircle2,
        };
      default:
        return {
          colorClass: "text-red-400 border-red-500/30 bg-red-950/20",
          dotColor: "bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.5)]",
          icon: AlertTriangle,
        };
    }
  };

  const config = getStatusConfig(step.type);
  const IconComponent = config.icon;

  return (
    <div className={`border border-white/5 rounded-xl overflow-hidden bg-zinc-950/40 hover:bg-zinc-900/30 transition-all select-none`}>
      {/* Header clickable wrapper */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-3.5 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {/* Animated pulsing dot for current status */}
          <div className="relative flex items-center justify-center shrink-0">
            <span className={`w-2.5 h-2.5 rounded-full ${config.dotColor} ${step.status === "active" ? "animate-pulse" : ""}`} />
            {step.status === "active" && (
              <span className={`absolute inline-flex h-full w-full rounded-full ${config.dotColor} opacity-75 animate-ping`} />
            )}
          </div>

          <div className="flex items-center gap-2">
            <IconComponent className={`w-4 h-4 ${config.colorClass.split(" ")[0]} shrink-0`} strokeWidth={1.5} />
            <h4 className="text-xs font-mono tracking-wide font-bold uppercase text-white/80">
              {step.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-white/30 bg-white/5 px-2 py-0.5 rounded border border-white/5">
            {step.duration}
          </span>
          <div className="text-white/40">
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </div>
      </div>

      {/* Expandable Details Area */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <div className="px-4 pb-4 pt-1 border-t border-white/5 bg-black/40 text-xs leading-relaxed text-white/60 space-y-2">
              <p className="font-sans">{step.detail}</p>
              
              {/* Dummy system logs for enhanced HUD hacker visual feel */}
              <div className="p-2 bg-zinc-950/90 rounded border border-white/5 font-mono text-[9px] text-cyan-400/70 overflow-x-auto space-y-1">
                <div><span className="text-white/30">LOG //</span> STATUS: {step.status.toUpperCase()}</div>
                <div><span className="text-white/30">CMD //</span> EXEC_TIME={step.duration}</div>
                {step.type === "evaluating" && (
                  <div><span className="text-emerald-400/80">EVAL //</span> METRIC_STALL=FALSE ENGINE=OPTIMAL</div>
                )}
                {step.type === "searching" && (
                  <div><span className="text-cyan-400/80">RAG //</span> COSINE_THOLD=0.72 CHUNKS_FOUND=8</div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
