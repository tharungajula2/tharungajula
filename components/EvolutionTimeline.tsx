"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const milestones = [
  {
    id: "04",
    era: "Independent Practice",
    timeline: "2022 — Present",
    title: "Retail Credit Risk & Product Systems",
    description: "Built an end-to-end retail credit risk framework on a 466,285-loan book, covering PD, LGD, EAD, IFRS 9 ECL staging, Basel III IRB capital, validation and portfolio monitoring. Completed a Post Graduate Level Programme in Deep Learning at IISc Bengaluru at 92%, and built four product systems end to end.",
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
    <div className="relative w-full max-w-4xl mx-auto py-24 sm:py-32 px-4 sm:px-6 pb-44 sm:pb-40">
      {/* AMBIENT GLOW BACKGROUND */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-to-tr from-accent-glow via-accent-glow/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* INTRO BRIEF */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-16 sm:mb-20 max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-accent text-xs sm:text-[10px] font-semibold tracking-[0.4em] font-mono uppercase dark:opacity-70">
            // HOW IT CONNECTS
          </span>
          <div className="h-px flex-1 bg-hairline-faint" />
        </div>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-normal dark:font-light border-l-2 border-accent-dim pl-4 sm:pl-5">
          One thread runs through this: take dense, rule-heavy problems in regulated domains and turn them into systems that hold up. Banking and finance first, then lending technology, then retail credit risk modelling and deep learning, and the product systems built alongside them.
        </p>
      </motion.div>

      {/* GLOWING VERTICAL LINE */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-dim to-transparent z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full blur-md opacity-20" />
      </div>

      <div className="space-y-16 sm:space-y-24 relative z-10">
        {milestones.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "flex flex-col md:flex-row items-start md:items-center w-full relative",
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            )}
          >
            {/* CONNECTOR DOT */}
            <div className="absolute left-[-4px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-accent rounded-full border-4 border-surface z-20 shadow-[0_0_15px_rgba(34,211,238,0.3)]" />

            {/* CONTENT CARD */}
            <div className={cn(
              "w-full md:w-[45%] pl-6 md:pl-0 mt-2 md:mt-0",
              index % 2 === 0 ? "md:pl-12" : "md:pr-12"
            )}>
              <div className="bg-surface-raised backdrop-blur-2xl border border-hairline p-5 sm:p-10 rounded-3xl relative overflow-hidden group hover:border-hairline transition-all duration-500 shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* LARGE BACKGROUND ID — Framed cleanly inside card without edge truncation */}
                <span className="text-7xl sm:text-9xl font-black text-ink-faint/10 absolute right-2 sm:right-4 -bottom-2 sm:-bottom-4 select-none group-hover:text-ink-faint/20 transition-colors font-mono pointer-events-none">
                  {item.id}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-accent text-xs sm:text-[10px] font-semibold tracking-[0.4em] font-mono uppercase dark:opacity-70">
                      // {item.era}
                    </span>
                    <div className="h-px flex-1 bg-hairline-faint" />
                  </div>
                  
                  <div className="flex flex-col gap-1 mb-6">
                    <span className="text-xs sm:text-xs font-mono font-medium text-ink-faint tracking-[0.2em] uppercase">
                      [{item.timeline}]
                    </span>
                    <h3 className="text-xl sm:text-3xl font-bold text-ink tracking-tight leading-tight uppercase italic">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-normal dark:font-light mb-8 max-w-prose">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.metrics.map(metric => (
                      <span key={metric} className="text-xs sm:text-[10px] font-mono font-semibold tracking-widest text-accent bg-surface-sunken border border-hairline px-3 py-1.5 rounded-lg backdrop-blur-md uppercase">
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
