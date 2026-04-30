"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const milestones = [
  {
    id: "04",
    era: "The 90-Day Sprint",
    timeline: "Feb 2026 — Present",
    title: "AI-Native Operating Systems",
    description: "Fused institutional rigor with full-stack product execution. Self-taught Next.js 16, React 19, and AI SDKs to build 5 proprietary OS prototypes — Yukti OS (geriatric care), Quant OS (knowledge graph), Curiosity OS (147-node pedagogy system), Mila (psychology-backed dating), and Pause (FMCG growth). IISc Deep Learning programme completed with 92%.",
    metrics: ["5 Live Products", "Gemini SDK / RAG", "147-Node Graphs"]
  },
  {
    id: "03",
    era: "The Wilderness Years",
    timeline: "April 2022 — Jan 2026",
    title: "Independent Systems Architecture",
    description: "Operated as an independent consultant — a deliberate skill acquisition phase. Built 8 end-to-end quantitative architectures spanning credit risk (PD/LGD/EAD), neural networks, RL (7 algorithms), NLP, time-series forecasting, and Modern Portfolio Theory. Acquired spatial reasoning, Python automation, and Go-To-Market execution.",
    metrics: ["8 Analytics Architectures", "Google Data Analytics Cert", "IISc Deep Learning"]
  },
  {
    id: "02",
    era: "Institutional Foundation",
    timeline: "2021 — 2022",
    title: "Credit Risk & Core Banking",
    description: "Built the quantitative and operational bedrock. Engineered credit-risk analytics frameworks across Retail and SME portfolios at Jana Small Finance Bank (30% turnaround reduction). Orchestrated B2B Loan Origination Systems at Lentra AI, mastering business–technology translation and lending workflow architecture.",
    metrics: ["Basel/BCBS 239", "PD Scorecards", "Loan Origination Systems"]
  },
  {
    id: "01",
    era: "The Academic Forge",
    timeline: "2013 — 2021",
    title: "Engineering → Finance → AI",
    description: "The foundational evolution. B.Tech Mechanical Engineering from GRIET Hyderabad (85.62%), then a deliberate pivot to PGDM Banking & Finance at NIBM Pune (RBI institution). Each transition was not a pivot — it was an expansion, with the previous layer remaining as bedrock.",
    metrics: ["GRIET B.Tech (85.62%)", "NIBM PGDM Finance", "Research Internship"]
  }
];

export default function EvolutionTimeline() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-32 px-6">
      {/* AMBIENT GLOW BACKGROUND */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-to-tr from-cyan-500/5 via-purple-500/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* GLOWING VERTICAL LINE */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full blur-md opacity-20" />
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
            <div className="absolute left-[-4px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full border-4 border-black z-20 shadow-[0_0_15px_rgba(34,211,238,0.3)]" />

            {/* CONTENT CARD */}
            <div className={cn(
              "w-full md:w-[45%] mt-4 md:mt-0",
              index % 2 === 0 ? "md:pl-12" : "md:pr-12"
            )}>
              <div className="bg-black/50 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* LARGE BACKGROUND ID */}
                <span className="text-9xl font-black text-white/[0.03] absolute -right-6 -bottom-8 select-none group-hover:text-white/5 transition-colors font-mono">
                  {item.id}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
                      // {item.era}
                    </span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  
                  <div className="flex flex-col gap-1 mb-6">
                    <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">
                      [{item.timeline}]
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight uppercase italic">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light mb-8 max-w-prose">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.metrics.map(metric => (
                      <span key={metric} className="text-[9px] font-mono tracking-widest text-cyan-300/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md uppercase">
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
