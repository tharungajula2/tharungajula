"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const dynamic = 'force-dynamic';

const domainProgression = [
  "Banking Domain",
  "Lending Systems",
  "Portfolio Analytics",
  "Quantitative Models",
  "Product Systems",
];

const storyMilestones = [
  {
    period: "2013 — 2017",
    role: "Mechanical Engineering / SAE BAJA",
    org: "GRIET, JNTUH, Hyderabad",
    summary: "B.Tech in Mechanical Engineering, building core systems thinking and engineering discipline before finance.",
  },
  {
    period: "2019 — 2021",
    role: "Banking & Finance / Equity Research",
    org: "NIBM Pune & Yadnya Academy",
    summary: "PGDM at an RBI-promoted banking institute alongside research analyst work on fundamental equity analysis.",
  },
  {
    period: "2021 — 2022",
    role: "Lending Technology & Portfolio Analytics",
    org: "Lentra AI & Jana Small Finance Bank",
    summary: "Mapped underwriting rule layers for 12+ bank clients at Lentra and owned automated portfolio reporting at Jana SFB, cutting turnaround by 30%.",
  },
  {
    period: "2022 — Present",
    role: "Independent Practice & Deep Learning",
    org: "IISc Bengaluru & Independent Practice",
    summary: "Built an end-to-end retail credit risk system on 466,285 loans, completed IISc deep learning at 92%, and shipped concept product systems.",
  },
];

const featuredWork = [
  {
    name: "Retail Credit Risk Modelling System",
    tag: "// CREDIT RISK SYSTEM",
    badge: "FLAGSHIP SYSTEM",
    gradient: "from-blue-500/20 via-blue-500/10 to-transparent dark:via-slate-900 dark:to-indigo-950/40",
    description: "An end-to-end retail credit risk system built on 466,285 public LendingClub loans (origination vintages 2007–2014). Features a PD scorecard using Weight of Evidence binning and logistic regression, a two-stage LGD hurdle recovery model across 50,968 defaults, EAD, and Expected Loss. Extended into IFRS 9 and Ind AS 109 style ECL staging with SICR criteria and 60-month term structures. Holds a validated out-of-time Gini of 0.385 against 0.368 on the development sample.",
    link: "https://github.com/tharungajula2/retail-credit-risk",
    linkText: "[ View on GitHub → ]",
    isFlagship: true,
  },
  {
    name: "LOC-IQ",
    tag: "// LOCATION INTELLIGENCE",
    gradient: "from-cyan-500/20 via-cyan-500/10 to-transparent dark:via-slate-900 dark:to-sky-950/40",
    description: "A concept console for location intelligence in retail credit and fraud review. Resolves a catalogue of 6 applicant identifiers, 42 data fields, and 46 external API sources into a six-layer weighted graph that ranks candidate pincodes and flags proxy-IP inconsistency. Runs entirely on synthetic demo scenarios with no live API fetching.",
    link: "https://loc-iq.vercel.app",
    linkText: "[ Open Prototype → ]",
    isFlagship: false,
  },
  {
    name: "Parents Health OS",
    tag: "// GERIATRIC CARE",
    gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent dark:via-slate-900 dark:to-emerald-950/40",
    description: "Remote eldercare coordination console for Indian families. Coordinators run medication schedules, vitals, and doctor briefs while parents check in via WhatsApp templates. Gemini parses uploaded lab reports into structured biomarkers, while a deterministic rules engine—not the LLM—determines triage status against personal baselines. Offline-first with on-device records. The WhatsApp integration runs in a dry-run simulator.",
    link: "https://parents-health-os.vercel.app",
    linkText: "[ Open Prototype → ]",
    isFlagship: false,
  },
];

const selectedAnalytics = [
  {
    name: "Bank Customer Churn Neural Network",
    tag: "// CUSTOMER CHURN",
    description: "Customer attrition model on a 10,000-customer retail banking dataset using Keras across five variants. SMOTE class-imbalance handling improved churn recall from 0.48 to 0.75 at 0.85 ROC-AUC, trading precision down deliberately because missing a churner costs significantly more than contacting a non-churner.",
  },
  {
    name: "SARIMA Demand Forecasting",
    tag: "// TIME-SERIES FORECASTING",
    description: "Time-series demand forecasting on a 204-month prescription series. Includes STL decomposition, ADF stationarity testing, and model selection across 625 candidate SARIMA structures with rolling 12-month forecasts. Achieved a MAPE of 7.90% against a naive seasonal baseline of 12.69%.",
  },
  {
    name: "Client Equity Strategy Implementation",
    tag: "// QUANTITATIVE EQUITY",
    description: "Python implementation of a client's cross-sectional equity strategies using client-supplied US CRSP 500 data over a 10-year backtest. Implemented across 4 core scripts covering cross-sectional ranking, sector-neutral filtering, cvxpy turnover control, and benchmark tracking error analysis. Note: strategies and data were supplied by the client; Python execution was Tharun's.",
  },
];

const experiences = [
  {
    period: "Apr 2022 — Present",
    title: "Independent Practice",
    subtitle: "Retail credit risk, applied ML, & product systems",
    location: "Remote, India",
  },
  {
    period: "Nov 2021 — Mar 2022",
    title: "Jana Small Finance Bank",
    subtitle: "Manager, Loan Product & Portfolio Analytics",
    location: "Bengaluru, India",
  },
  {
    period: "Apr 2021 — Oct 2021",
    title: "Lentra AI",
    subtitle: "Business Analyst (Product Management)",
    location: "Pune, India",
  },
];

const educationList = [
  {
    period: "2023 — 2025",
    institution: "IISc Bengaluru",
    degree: "Post Graduate Level Programme in Deep Learning",
    result: "Grade: 92%",
  },
  {
    period: "2019 — 2021",
    institution: "NIBM Pune",
    degree: "PGDM, Banking and Finance (RBI-Promoted Inst.)",
    result: "Grade: 74.13%",
  },
  {
    period: "2013 — 2017",
    institution: "GRIET, JNTUH, Hyderabad",
    degree: "B.Tech, Mechanical Engineering",
    result: "Grade: 85.62%",
  },
];

export default function ProfilePage() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-4 sm:py-10 px-1 sm:px-4 pb-4 sm:pb-8">
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-full h-[60%] bg-gradient-to-tr from-accent-glow via-accent-glow/5 to-transparent blur-[120px] pointer-events-none z-0 overflow-hidden" />

      {/* ─── SECTION 1: POSITIONING ─── */}
      <section className="relative z-10 mb-10 sm:mb-16">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="text-accent text-[10px] sm:text-xs tracking-wider sm:tracking-[0.3em] font-mono uppercase font-semibold shrink-0">
            // POSITIONING
          </span>
          <div className="h-px flex-1 bg-hairline-faint min-w-[20px]" />
        </div>

        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight mb-3 sm:mb-4 leading-tight">
          I build decision systems end to end — the model, the guardrails, and the product around them.
        </h1>

        <p className="text-xs sm:text-base text-ink-muted leading-relaxed max-w-3xl mb-5 sm:mb-6 font-normal dark:font-light">
          Banking and finance gave me the domain, lending technology taught me to translate policy into software, and quantitative practice added model validation. I assemble those disciplines to build and ship complete decision systems.
        </p>

        {/* PROGRESSION FLOW */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-surface-raised backdrop-blur-xl border border-hairline px-3 py-2 sm:px-4 rounded-xl sm:rounded-full shadow-sm text-[11px] sm:text-sm font-mono max-w-full">
          {domainProgression.map((step, idx) => (
            <span key={step} className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-ink font-medium">{step}</span>
              {idx < domainProgression.length - 1 && (
                <span className="text-accent font-bold">→</span>
              )}
            </span>
          ))}
        </div>
      </section>

      {/* ─── SECTION 2: STORY ─── */}
      <section className="relative z-10 mb-10 sm:mb-16">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <span className="text-accent text-[10px] sm:text-xs tracking-wider sm:tracking-[0.3em] font-mono uppercase font-semibold shrink-0">
            // EVOLUTION & STORY
          </span>
          <div className="h-px flex-1 bg-hairline-faint min-w-[20px]" />
        </div>

        <div className="border-l border-hairline pl-5 sm:pl-6 space-y-6 sm:space-y-8">
          {storyMilestones.map((m) => (
            <div key={m.period} className="relative group">
              <div className="absolute -left-[25px] sm:-left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-surface shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3 mb-1">
                <span className="text-[11px] sm:text-xs font-mono font-semibold text-accent tracking-wider uppercase shrink-0">
                  [{m.period}]
                </span>
                <h3 className="text-sm sm:text-lg font-bold text-ink uppercase tracking-wide leading-snug">
                  {m.role}
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-mono text-ink-faint block mb-1">
                {m.org}
              </span>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal dark:font-light">
                {m.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 3: SELECTED WORK ─── */}
      <section className="relative z-10 mb-10 sm:mb-16">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="text-accent text-[10px] sm:text-xs tracking-wider sm:tracking-[0.3em] font-mono uppercase font-semibold shrink-0">
            // FEATURED SYSTEMS
          </span>
          <div className="h-px flex-1 bg-hairline-faint min-w-[20px]" />
        </div>

        <h2 className="text-lg sm:text-2xl font-bold text-ink tracking-tight uppercase mb-4 sm:mb-6">
          Selected Product & Risk Work
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {featuredWork.map((project) => (
            <div
              key={project.name}
              className={cn(
                "bg-surface-raised backdrop-blur-2xl border p-4 sm:p-6 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col justify-between group",
                project.isFlagship ? "border-accent/40 hover:border-accent" : "border-hairline hover:border-hairline-faint"
              )}
            >
              <div>
                <div className="flex flex-wrap justify-between items-center mb-2 gap-1.5">
                  <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider sm:tracking-[0.3em] text-accent uppercase">
                    {project.tag}
                  </span>
                  {project.badge && (
                    <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider bg-accent-glow text-accent border border-accent-dim px-2 py-0.5 rounded uppercase shrink-0">
                      {project.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-xl font-bold text-ink tracking-wide uppercase mb-2 sm:mb-3 group-hover:text-accent transition-colors">
                  {project.name}
                </h3>

                <p className="text-xs sm:text-base text-ink-muted leading-relaxed font-normal dark:font-light mb-4 sm:mb-6">
                  {project.description}
                </p>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto self-start bg-surface-sunken border border-hairline hover:bg-ink hover:text-surface transition-all text-[10px] sm:text-xs font-mono font-semibold px-4 py-2.5 rounded-xl tracking-wider sm:tracking-[0.2em] uppercase cursor-pointer"
                >
                  {project.linkText}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 4: SELECTED ANALYTICS ─── */}
      <section className="relative z-10 mb-10 sm:mb-16">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="text-accent text-[10px] sm:text-xs tracking-wider sm:tracking-[0.3em] font-mono uppercase font-semibold shrink-0">
            // APPLIED ANALYTICS & QUANT
          </span>
          <div className="h-px flex-1 bg-hairline-faint min-w-[20px]" />
        </div>

        <h2 className="text-lg sm:text-2xl font-bold text-ink tracking-tight uppercase mb-4 sm:mb-6">
          Selected Analytics Work
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {selectedAnalytics.map((item) => (
            <div
              key={item.name}
              className="bg-surface-raised backdrop-blur-2xl border border-hairline p-4 sm:p-5 rounded-xl hover:border-hairline-faint transition-all duration-300 shadow-sm"
            >
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider sm:tracking-[0.3em] text-accent uppercase">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-ink tracking-wide uppercase mb-1.5 sm:mb-2">
                {item.name}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal dark:font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 5: EXPERIENCE + EDUCATION ─── */}
      <section className="relative z-10 mb-10 sm:mb-16">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <span className="text-accent text-[10px] sm:text-xs tracking-wider sm:tracking-[0.3em] font-mono uppercase font-semibold shrink-0">
            // CREDENTIALS
          </span>
          <div className="h-px flex-1 bg-hairline-faint min-w-[20px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* EXPERIENCE */}
          <div className="bg-surface-raised backdrop-blur-2xl border border-hairline p-4 sm:p-6 rounded-2xl">
            <h3 className="text-xs font-mono font-bold text-accent tracking-[0.2em] uppercase mb-3 sm:mb-4 pb-2 border-b border-hairline-faint">
              EXPERIENCE
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {experiences.map((exp) => (
                <div key={exp.title}>
                  <span className="text-[10px] font-mono text-ink-faint uppercase tracking-wider block mb-0.5">
                    {exp.period} · {exp.location}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-ink uppercase tracking-wide">
                    {exp.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-ink-muted font-mono mt-0.5">
                    {exp.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION */}
          <div className="bg-surface-raised backdrop-blur-2xl border border-hairline p-4 sm:p-6 rounded-2xl">
            <h3 className="text-xs font-mono font-bold text-accent tracking-[0.2em] uppercase mb-3 sm:mb-4 pb-2 border-b border-hairline-faint">
              EDUCATION
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {educationList.map((edu) => (
                <div key={edu.institution}>
                  <span className="text-[10px] font-mono text-ink-faint uppercase tracking-wider block mb-0.5">
                    {edu.period} · {edu.result}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-ink uppercase tracking-wide">
                    {edu.institution}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-ink-muted font-mono mt-0.5">
                    {edu.degree}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: CLOSING ─── */}
      <section className="relative z-10 pt-4 sm:pt-6 border-t border-hairline flex flex-col items-center text-center">
        <p className="text-xs sm:text-sm text-ink-muted max-w-xl mb-4 sm:mb-6 font-normal dark:font-light leading-relaxed">
          This page covers selected work only. The broader set of projects, analytical code, and technical repositories is available on GitHub.
        </p>

        <a
          href="https://github.com/tharungajula2"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full sm:w-auto bg-surface-raised border border-hairline hover:border-accent text-ink hover:text-accent transition-all text-[10px] sm:text-xs font-mono font-semibold px-5 py-3 rounded-xl tracking-wider sm:tracking-[0.2em] uppercase shadow-sm"
        >
          [ View All Repositories on GitHub → ]
        </a>
      </section>
    </div>
  );
}
