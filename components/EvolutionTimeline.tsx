"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const milestones = [
  {
    id: "04",
    era: "Independent Practice",
    timeline: "2022 — Present",
    title: "Retail Credit Risk & Product Systems",
    description: "Built an end-to-end retail credit risk framework on a 466,285-loan book, covering PD, LGD, EAD, IFRS 9 ECL staging, Basel III IRB capital, validation and portfolio monitoring. Completed a Post Graduate Level Programme in Deep Learning at IISc Bengaluru at 92%, and built four full-stack product systems end to end.",
    metrics: ["Retail Credit Risk", "IISc Deep Learning", "Four Product Systems"]
  },
  {
    id: "03",
    era: "Institutional Lending",
    timeline: "2021 — 2022",
    title: "Bank & Lending Technology",
    description: "At Lentra AI, mapped end-to-end workflows for a B2B loan origination platform used by 12+ banking clients and translated lending policy into functional specifications. At Jana Small Finance Bank, owned automated portfolio reporting for the retail lending book and cut reporting turnaround by 30%.",
    metrics: ["Portfolio Reporting", "Credit Policy Translation", "Loan Origination"]
  },
  {
    id: "02",
    era: "Banking & Finance",
    timeline: "2019 — 2021",
    title: "PGDM at NIBM Pune",
    description: "PGDM in Banking and Finance at the National Institute of Bank Management, an RBI-promoted institution, alongside a research analyst internship covering fundamental analysis and financial modelling on Indian public equities.",
    metrics: ["RBI Institution", "Banking & Finance", "Equity Research"]
  },
  {
    id: "01",
    era: "The Foundation",
    timeline: "2013 — 2017",
    title: "Engineering Foundation",
    description: "B.Tech in Mechanical Engineering at GRIET, Hyderabad. Systems thinking, before the finance.",
    metrics: ["Mechanical Engineering", "Systems Thinking"]
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
          One thread runs through this: take dense, rule-heavy problems in regulated domains and turn them into systems that hold up. Banking and finance first, then lending technology, then retail credit risk modelling and deep learning, and the product systems built alongside them.
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
