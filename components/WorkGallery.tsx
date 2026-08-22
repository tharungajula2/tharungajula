"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Project {
  name: string;
  description: string;
  link?: string;
  tag: string;
  gradient: string;
  image?: string;
  hidden?: boolean;
  next?: string;
  badge?: string;
  wip?: boolean;
}

interface WorkGalleryProps {
  type: "product_lab" | "analytics_quant";
}

const productLabProjects: Project[] = [
  {
    name: "Retail Credit Risk Suite",
    description: "An end-to-end retail credit risk system built on 466,285 public LendingClub loans. PD scorecard using Weight of Evidence binning and logistic regression, a two-stage LGD recovery model across 50,968 defaults, EAD, and Expected Loss. Extended into IFRS 9 and Ind AS 109 style ECL with Stage 1, 2 and 3 classification, SICR criteria and lifetime PD term structures, plus Basel III Advanced IRB capital at $2.29B risk-weighted assets. The final model holds an out-of-time Gini of 0.385 against 0.368 on the development sample.",
    link: "/work/credit-risk",
    tag: "// CREDIT RISK SYSTEM",
    gradient: "from-blue-500/20 via-blue-500/10 to-transparent dark:via-slate-900 dark:to-indigo-950/40",
  },
  {
    name: "LOC-IQ",
    description: "An interactive console for location intelligence in retail credit and fraud review. It maps how six applicant identifiers unlock 42 data fields across 46 external API sources, assembling a six-layer weighted graph that ranks candidate pincodes and flags proxy-IP inconsistency. Edge weights carry recency and trust penalties. Three worked scenarios run on synthetic data.",
    link: "https://loc-iq.vercel.app/",
    tag: "// LOCATION INTELLIGENCE",
    gradient: "from-cyan-500/20 via-cyan-500/10 to-transparent dark:via-slate-900 dark:to-sky-950/40",
  },
  {
    name: "Parents Health OS",
    description: "Remote elder-care console for Indian families, built around one hard constraint: parents will not learn a new app. They check in through WhatsApp templates while coordinators run medications, vitals, rules-based triage, and doctor-ready briefs from one console. Gemini parses uploaded lab reports into structured biomarkers. Local-first by design, with an offline sync queue and consent-first onboarding. The WhatsApp layer is fully built and runs in sandbox mode pending Meta business verification.",
    link: "https://parents-health-os.vercel.app",
    tag: "// GERIATRIC CARE",
    gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent dark:via-slate-900 dark:to-emerald-950/40",
    image: "/images/previews/parents-heatlh-os.webp.png",
  },
  {
    name: "Curiosity OS",
    description: "A digital lab for training thinking skills. An interactive 3D concept map of 147 reasoning concepts and 381 connections, explored through Student, Mentor, and Builder lenses, alongside 36 written activity playbooks and 6 curated learning paths. Fully static and offline-friendly: no logins, no tracking, all state stays in the browser.",
    link: "https://curiosity-os.vercel.app",
    tag: "// LEARNING SYSTEMS",
    gradient: "from-orange-500/20 via-orange-500/10 to-transparent dark:via-slate-900 dark:to-amber-950/40",
    image: "/images/previews/curiosity-os.webp.png",
  },
  {
    name: "better4u",
    description: "A better-for-you food and beverage concept brand, designed end to end as a working web experience. Twenty-six SKUs across six sub-brands, each with its own identity, product renders, and packaging language, plus an interactive cart, a double-sided label viewer, and a plant-points calculator. The focus is product and brand design: making healthy look and feel premium enough that people actually reach for it.",
    link: "https://better4u.vercel.app/",
    tag: "// CONSUMER BRAND DESIGN",
    gradient: "from-amber-500/20 via-amber-500/10 to-transparent dark:via-slate-900 dark:to-yellow-950/40",
    image: "/images/previews/better4u.webp.png",
  },
];

const playgroundProjects: Project[] = [];

const analyticsQuantProjects: Project[] = [
  {
    name: "Bank Churn Neural Network",
    description: "Customer attrition on a 10,000-customer retail banking dataset. A Keras neural network across five variants, with SMOTE used to handle class imbalance. Churn recall improved from 0.48 to 0.75 at 0.85 ROC-AUC, with precision traded down deliberately because missing a churner costs more than contacting a non-churner.",
    link: "https://github.com/tharungajula2/Portfolio",
    tag: "// CUSTOMER CHURN",
    gradient: "from-purple-600/20 via-purple-500/10 to-transparent dark:via-slate-900 dark:to-slate-950",
  },
  {
    name: "SARIMA Demand Forecasting",
    description: "Time-series forecasting on a 204-month prescription series. STL decomposition, ADF stationarity testing, and model selection across 625 candidate SARIMA structures with rolling 12-month forecasts. MAPE of 7.90% against a naive seasonal baseline of 12.69%.",
    link: "https://github.com/tharungajula2/Portfolio",
    tag: "// TIME-SERIES FORECASTING",
    gradient: "from-rose-600/20 via-rose-500/10 to-transparent dark:via-slate-900 dark:to-slate-950",
  },
  {
    name: "NIFTY 100 Portfolio Optimiser",
    description: "Modern Portfolio Theory on the NIFTY 100. Log returns and a covariance matrix across 82 usable stocks, with 10,000 Monte Carlo weight vectors used to trace the efficient frontier and compare equal weight against a maximum Sharpe allocation.",
    link: "https://github.com/tharungajula2/Portfolio",
    tag: "// PORTFOLIO OPTIMISATION",
    gradient: "from-teal-600/20 via-teal-500/10 to-transparent dark:via-slate-900 dark:to-slate-950",
  },
  {
    name: "Analytics Reference Vault",
    description: "Written technical references built alongside the modelling work: regression analysis, machine learning, regulatory foundations, and a quantitative modelling workflow reference. The explanation layer underneath the projects.",
    link: "https://github.com/tharungajula2/Portfolio",
    tag: "// REFERENCE",
    gradient: "from-slate-600/20 via-slate-500/10 to-transparent dark:via-slate-900 dark:to-slate-950",
  },
];

export default function WorkGallery({ type }: WorkGalleryProps) {
  const projects = type === "product_lab" 
    ? productLabProjects.filter(p => !p.hidden) 
    : analyticsQuantProjects.filter(p => !p.hidden);

  const renderProjectCard = (project: Project, i: number, isPlayground: boolean = false) => (
    <motion.div
      key={project.name}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.05 * (i + 1) }}
      className="bg-surface-raised backdrop-blur-2xl border border-hairline p-5 sm:p-6 rounded-2xl hover:border-hairline transition-all duration-500 shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col group justify-between"
    >
      <div>
        {/* Premium Mini-Browser Mockup Visual Header */}
        {!isPlayground && (
        <div className="relative w-full h-36 sm:h-40 mb-5 bg-surface-sunken rounded-xl overflow-hidden border border-hairline-faint flex items-center justify-center group-hover:border-hairline transition-all duration-500">
          {/* Background Ambient Glow */}
          <div className={cn(
            "absolute inset-0 opacity-30 dark:opacity-20 group-hover:opacity-50 transition-opacity duration-500 blur-xl bg-gradient-to-tr",
            project.gradient
          )} />
          
          {/* Actual Project Screenshot Background */}
          {project.image ? (
            <div 
              style={{ backgroundImage: `url(${project.image})` }} 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            /* Centered Graphic Identity inside Mockup (Only if no image exists) */
            <div className="relative text-center px-4 z-10 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105">
              <span className="text-[8px] font-mono tracking-[0.3em] text-ink-faint block mb-1 uppercase font-medium">
                SYSTEM RUNTIME
              </span>
              <span className="text-xs font-bold text-ink uppercase tracking-widest block font-sans">
                {project.name.includes(" (") ? project.name.split(" (")[0] : project.name}
              </span>
            </div>
          )}
          
          {/* Browser Controls Dots */}
          <div className="absolute top-3 left-4 flex gap-1.5 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-ink-faint backdrop-blur-md shadow-sm border border-hairline" />
            <div className="w-1.5 h-1.5 rounded-full bg-ink-faint backdrop-blur-md shadow-sm border border-hairline" />
            <div className="w-1.5 h-1.5 rounded-full bg-ink-faint backdrop-blur-md shadow-sm border border-hairline" />
          </div>
          
          {/* Upper Right Tiny Category Label */}
          <div className="absolute top-2.5 right-4 text-[7px] font-mono font-semibold text-ink-muted bg-surface-raised/90 backdrop-blur-md border border-hairline-faint px-2 py-0.5 rounded uppercase tracking-[0.2em] z-10 select-none">
            {project.tag.replace('// ', '')}
          </div>
          
          {/* Visual Grid Layer inside screen */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
        </div>
        )}

        {/* Title & Tag Info below Graphic */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs sm:text-[10px] font-mono font-semibold tracking-[0.3em] text-accent dark:opacity-70 uppercase">
            {project.tag}
          </span>
          {project.badge && (
            <span className="text-xs sm:text-[9px] font-mono font-semibold tracking-widest bg-accent-glow text-accent px-2 py-0.5 rounded">
              {project.badge}
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-lg font-bold text-ink tracking-wide uppercase mb-2 group-hover:text-accent transition-colors">
          {project.name}
        </h3>

        <p className={cn("text-sm sm:text-base leading-relaxed font-normal dark:font-light", project.next ? "text-ink-muted mb-2" : "text-ink-muted mb-6")}>
          {project.description}
        </p>

        {project.next && (
          <p className="text-xs text-ink-faint italic mb-6">
            Next: {project.next}
          </p>
        )}
      </div>

      {/* Action Trigger */}
      {project.link && (
        project.link.startsWith("/") ? (
          <Link
            href={project.link}
            className="inline-flex items-center justify-center w-full bg-surface-sunken border border-hairline hover:bg-ink hover:text-surface transition-all text-xs sm:text-[10px] font-mono font-semibold py-2.5 rounded-xl tracking-[0.2em] uppercase cursor-pointer text-center"
          >
            [ Explore Masterclass → ]
          </Link>
        ) : (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-surface-sunken border border-hairline hover:bg-ink hover:text-surface transition-all text-xs sm:text-[10px] font-mono font-semibold py-2.5 rounded-xl tracking-[0.2em] uppercase cursor-pointer"
          >
            {project.link.includes("github") ? "[ View on GitHub → ]" : "[ Open Prototype → ]"}
          </a>
        )
      )}
    </motion.div>
  );

  return (
    <div className="relative w-full max-w-5xl mx-auto py-24 sm:py-32 px-4 sm:px-6 pb-44 sm:pb-40">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-accent-glow via-accent-glow/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-accent text-xs sm:text-[10px] font-semibold tracking-[0.4em] font-mono uppercase dark:opacity-70">
            {type === "product_lab" ? "// PRODUCT_LAB_SYSTEMS" : "// ANALYTICS_QUANT_SYSTEMS"}
          </span>
          <div className="h-px flex-1 bg-hairline-faint" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight uppercase">
          {type === "product_lab" ? "Product Lab" : "Analytics & Quant"}
        </h2>
      </motion.div>

      {type === "product_lab" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-base sm:text-lg text-ink-muted mb-12 font-normal dark:font-light"
        >
          Systems built end to end, from the credit risk models through to the interfaces.
        </motion.p>
      )}

      {/* RESPONSIVE CSS GRID */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, i) => renderProjectCard(project, i))}
      </div>

      {type === "product_lab" && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative z-10 mt-24 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent text-xs sm:text-[10px] font-semibold tracking-[0.4em] font-mono uppercase dark:opacity-70">
                // PLAYGROUND
              </span>
              <div className="h-px flex-1 bg-hairline-faint" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight uppercase">
              Playground
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative z-10 text-base sm:text-lg text-ink-muted mb-8 max-w-2xl font-normal dark:font-light"
          >
            Earlier experiments and rough builds. New systems land here before they graduate.
          </motion.p>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {playgroundProjects.length > 0 ? (
              playgroundProjects.map((project, i) => renderProjectCard(project, i, true))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-surface-raised backdrop-blur-md border border-hairline-faint border-dashed p-6 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] h-32"
              >
                <span className="text-sm font-mono text-ink-faint italic">Next system loading...</span>
              </motion.div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
