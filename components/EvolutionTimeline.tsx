"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const milestones = [
  {
    id: "03",
    era: "The 90-Day Sprint",
    timeline: "Feb 2026 — Present",
    title: "AI-Native Operating Systems",
    description: "Fused institutional rigor with modern full-stack development. Taught myself Next.js, React, and AI SDKs in 90 days to build functional, context-aware prototypes like Yukti OS and Curiosity OS. Currently completing the Deep Learning Executive Program at IISc Bangalore.",
    metrics: ["Next.js 16", "Gemini SDK", "RAG Architecture"]
  },
  {
    id: "02",
    era: "The Wilderness Years",
    timeline: "April 2022 — Jan 2026",
    title: "Independent Systems Architecture",
    description: "Operated as an independent consultant. Intentionally stepped outside traditional corporate boundaries to acquire 'Zero-to-One' skills spanning spatial 3D reasoning, automated workflows, and Go-To-Market execution.",
    metrics: ["Python Automation", "Spatial Rendering", "GTM Frameworks"]
  },
  {
    id: "01",
    era: "Institutional Foundation",
    timeline: "2019 — 2022",
    title: "Credit Risk & Core Banking",
    description: "Built the quantitative and operational bedrock. Engineered credit-risk analytics frameworks at Jana Small Finance Bank and orchestrated B2B lending systems at Lentra AI. Mastered the translation of dense regulatory logic into actionable workflows.",
    metrics: ["Basel/BCBS 239", "Expected Loss Math", "Agile SDLC"]
  }
];

export default function EvolutionTimeline() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-32 px-6">
      {/* GLOWING VERTICAL LINE */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full blur-md opacity-20" />
      </div>

      <div className="space-y-24 relative z-10">
        {milestones.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "flex flex-col md:flex-row items-start md:items-center w-full",
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            )}
          >
            {/* CONNECTOR DOT */}
            <div className="absolute left-[-4px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full border-4 border-black z-20 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />

            {/* CONTENT CARD */}
            <div className={cn(
              "w-full md:w-[45%] mt-4 md:mt-0",
              index % 2 === 0 ? "md:pl-12" : "md:pr-12"
            )}>
              <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                {/* LARGE BACKGROUND ID */}
                <span className="text-8xl font-black text-white/5 absolute -right-4 -bottom-4 select-none group-hover:text-white/10 transition-colors">
                  {item.id}
                </span>

                <div className="relative z-10">
                  <span className="text-cyan-400 text-[10px] tracking-[0.3em] font-mono mb-2 block uppercase">
                    // {item.era}
                  </span>
                  
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 tracking-widest whitespace-nowrap mb-1">
                      {item.timeline}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light mb-6">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.metrics.map(metric => (
                      <span key={metric} className="text-[10px] font-mono tracking-widest text-cyan-200 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
