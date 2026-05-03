"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const milestones = [
  {
    id: "04",
    era: "The 90-Day Sprint",
    timeline: "Feb 2026 — Present",
    title: "AI-Native Building",
    description: "Took everything I'd learned — analytics, product, behavioral psychology — and built 5 working prototypes in 90 days using Next.js, React, and AI tooling. Each one solves a real problem: Mila reimagines dating through psychology-backed matching. Trellis does the same for therapy. Yukti OS handles geriatric care coordination. Curiosity OS is a 147-node learning system. Pause tackles FMCG growth. IISc Deep Learning programme completed with 92%.",
    metrics: ["5 Live Prototypes", "IISc Deep Learning (92%)", "Next.js + React"]
  },
  {
    id: "03",
    era: "The Wilderness Years",
    timeline: "2022 — Jan 2026",
    title: "Independent Consulting + Skill Acquisition",
    description: "Four years working independently — consulting on analytics, automation, and content for small businesses while systematically filling gaps in my skillset. Built 8 end-to-end analytics projects covering credit risk (PD/LGD/EAD), neural networks, reinforcement learning, NLP, time-series forecasting, and portfolio theory. Picked up Python automation, spatial reasoning, and go-to-market execution. This period looks like a gap on paper. It was the most intensive learning phase of my career.",
    metrics: ["8 Analytics Projects", "Google Data Analytics", "IISc Deep Learning"]
  },
  {
    id: "02",
    era: "Institutional Foundation",
    timeline: "2019 — 2022",
    title: "Credit Risk + Lending Tech",
    description: "Two roles that built my core. At Jana Small Finance Bank, I built credit risk analytics across Retail and SME portfolios — the models I shipped reduced turnaround time by 30%. At Lentra AI, I worked on B2B loan origination systems, translating between what banks needed and what the tech could do across 12+ integrations. This is where I learned how financial products actually work — not in theory, but in production.",
    metrics: ["Jana Small Finance Bank", "Lentra AI", "Basel/BCBS 239"]
  },
  {
    id: "01",
    era: "The Foundation",
    timeline: "2017 — 2021",
    title: "Engineering → Finance → Banking",
    description: "B.Tech Mechanical Engineering from GRIET Hyderabad, then a deliberate pivot to PGDM Banking & Finance at NIBM Pune (an RBI institution). The engineering gave me structured thinking. The finance programme gave me the domain. Each step was intentional — I was building toward working at the intersection of data, finance, and technology.",
    metrics: ["GRIET B.Tech", "NIBM PGDM Finance", "RBI Institution"]
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
          Most of my career doesn&apos;t look like a straight line — but it is one if you know what to look for. I started in engineering and finance, spent four years in banking and lending tech building scoring models and shipping products, then took a deliberate detour to teach myself deep learning, AI product building, and full-stack prototyping. The thread through all of it: I like understanding complex systems and building things that work inside them.
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
