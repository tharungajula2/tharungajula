"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const milestones = [
  {
    id: "05",
    era: "The Deep Build",
    timeline: "May 2026 — Present",
    title: "AI Systems, In the Open",
    description: "Going deeper on how AI systems actually work — foundations, RAG, evals, agents — and improving the three Product Lab systems as I learn. Documented publicly in Field Notes.",
    metrics: ["AI Systems", "Evals & RAG", "Public Field Notes"]
  },
  {
    id: "04",
    era: "The Prototyping Sprint",
    timeline: "Feb 2026 — May 2026",
    title: "Functional Prototyping & AI Orchestration",
    description: "An intensive sprint building functional AI systems end to end — elder care, quant research, learning design, and the JARVIZ Live portfolio cockpit.",
    metrics: ["Focused systems sprint", "AI product engineering", "Interface + workflow design"]
  },
  {
    id: "03",
    era: "Consulting & Skill Acquisition",
    timeline: "2022 — Jan 2026",
    title: "Analytics Consulting & Deep Learning",
    description: "Independent analytics consulting — data pipelines, Python automation, client dashboards — alongside an Executive Deep Learning programme at IISc Bangalore (Grade: 92%) and 8 quantitative projects, 6 shown here.",
    metrics: ["8 Analytics Projects", "IISc Deep Learning", "Quantitative Modeling"]
  },
  {
    id: "02",
    era: "Institutional Product & Workflows",
    timeline: "2021 — 2022",
    title: "Internal Product Owner & Workflow Architect",
    description: "At Lentra AI, mapped B2B loan origination workflows and PRDs across 12+ bank integrations. At Jana Small Finance Bank, built credit scoring models and automation that cut reporting turnaround by 30%.",
    metrics: ["Workflow Architecture", "UAT & API Testing", "Loan Product Workflows"]
  },
  {
    id: "01",
    era: "The Foundation",
    timeline: "2017 — 2021",
    title: "Engineering + PGDM Banking & Finance",
    description: "B.Tech in Mechanical Engineering (GRIET Hyderabad), then a PGDM in Banking & Finance at NIBM Pune (an RBI institution). Systems thinking plus the language of institutional finance.",
    metrics: ["Mechanical Systems", "Banking & Finance", "RBI Institution"]
  }
];

export default function EvolutionTimeline() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-32 px-6">
      {/* AMBIENT GLOW BACKGROUND */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-to-tr from-cyan-500/5 via-purple-500/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* INTRO BRIEF */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-20 max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // HOW IT CONNECTS
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <p className="text-base sm:text-lg text-white/60 leading-relaxed font-light border-l-2 border-cyan-400/20 pl-5">
          One pattern runs through my career: take dense, ambiguous logic and turn it into systems people can actually use. Engineering and finance first, then institutional fintech, then independent analytics and deep learning, and now full-stack AI product systems.
        </p>
      </motion.div>

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
