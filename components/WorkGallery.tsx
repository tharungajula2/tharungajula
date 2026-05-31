"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Project {
  name: string;
  description: string;
  link: string;
  tag: string;
  gradient: string;
  image?: string;
  hidden?: boolean;
}

interface WorkGalleryProps {
  type: "product_lab" | "analytics_quant";
}

const productLabProjects: Project[] = [
  {
    name: "Parents Health OS",
    description: "Family-first health tracking system for elderly care. Organizes routines, vitals, reports, and doctor-ready summaries in one local-first dashboard.",
    link: "https://parents-health-os.vercel.app",
    tag: "// GERIATRIC CARE",
    gradient: "from-emerald-500/20 via-slate-900 to-emerald-950/40",
    image: "/images/previews/parents-heatlh-os.webp.png"
  },
  {
    name: "Quant OS",
    description: "Spatial research map for analytics and quantitative finance. Turns models, notes, and projects into a navigable knowledge graph.",
    link: "https://quant-os.vercel.app",
    tag: "// ANALYTICS SYSTEMS",
    gradient: "from-cyan-500/20 via-slate-900 to-indigo-950/40",
    image: "/images/previews/quant-os.webp.png"
  },
  {
    name: "Curiosity OS",
    description: "Learning design workspace for teachers and students. Maps classroom ideas, activities, and learning flows into a structured exploration interface.",
    link: "https://curiosity-os.vercel.app",
    tag: "// LEARNING SYSTEMS",
    gradient: "from-orange-500/20 via-slate-900 to-amber-950/40",
    image: "/images/previews/curiosity-os.webp.png"
  },
  {
    name: "Therapy Matching OS",
    description: "Clinical matching engine for therapy services. Implements 58-point clinical matching and PCOMS preference alignment on a functional interface.",
    link: "https://therapy-matching-os.vercel.app",
    tag: "// CLINICAL MATCHING",
    gradient: "from-teal-500/20 via-slate-900 to-purple-950/40",
    image: "/images/previews/theraphy-matching-os.webp.png",
    hidden: true
  },
  {
    name: "Relational Matching OS (Mila)",
    description: "Psychology-backed relationship matching engine implementing MECE profiling and algorithmic logic.",
    link: "https://relational-matching-os.vercel.app",
    tag: "// RELATION SYSTEMS",
    gradient: "from-rose-500/20 via-slate-900 to-red-950/40",
    image: "/images/previews/relational-matching-os.webp.png",
    hidden: true
  },
  {
    name: "FMCG Whitespace OS",
    description: "Product strategy case study for a functional food concept. Covers positioning, unit economics, margins, and visual storytelling from scratch.",
    link: "https://fmcg-whitespace-os.vercel.app",
    tag: "// COMMERCIAL PRODUCT CASE STUDY",
    gradient: "from-yellow-500/20 via-slate-900 to-neutral-900/40",
    image: "/images/previews/fmcg-whitespace-os.webp.png"
  }
];

const analyticsQuantProjects: Project[] = [
  {
    name: "Lending Club Classifier",
    description: "Credit risk model built on Lending Club loan data. Covers feature engineering, default prediction, and model validation for probability-of-default thinking.",
    link: "https://github.com/tharungajula2/Portfolio",
    tag: "// CREDIT RISK MODEL",
    gradient: "from-blue-600/10 via-slate-900 to-slate-950"
  },
  {
    name: "Bank Churn Neural Network",
    description: "Neural network model for bank customer churn. Uses customer-level signals to estimate attrition risk and compare model performance.",
    link: "https://github.com/tharungajula2/Portfolio",
    tag: "// CUSTOMER CHURN",
    gradient: "from-purple-600/10 via-slate-900 to-slate-950"
  },
  {
    name: "Employee Retention Risk Classifier",
    description: "Predicting which employees leave using logistic regression, decision trees, and random forests. Human capital as a measurable signal.",
    link: "https://github.com/tharungajula2/Portfolio",
    tag: "// RETENTION CLASSIFIER",
    gradient: "from-emerald-600/10 via-slate-900 to-slate-950",
    hidden: true
  },
  {
    name: "Socio-Economic Engine",
    description: "Household classification from noisy survey data. Heavy preprocessing, PCA, SMOTE, and XGBoost.",
    link: "https://github.com/tharungajula2/Portfolio",
    tag: "// CENSUS ENSEMBLE",
    gradient: "from-amber-600/10 via-slate-900 to-slate-950",
    hidden: true
  },
  {
    name: "Twitter Sentiment Pipeline",
    description: "Text classification pipeline for tweet sentiment. Covers preprocessing, vectorization, model training, and evaluation.",
    link: "https://github.com/tharungajula2/Portfolio",
    tag: "// NLP PIPELINE",
    gradient: "from-sky-600/10 via-slate-900 to-slate-950"
  },
  {
    name: "CartPole RL Comparison",
    description: "Reinforcement learning comparison study using CartPole. Built to understand policy learning, reward feedback, and core RL behavior.",
    link: "https://github.com/tharungajula2/Portfolio",
    tag: "// REINFORCEMENT LEARNING",
    gradient: "from-indigo-600/10 via-slate-900 to-slate-950"
  },
  {
    name: "Antidiabetic Forecast",
    description: "Medicine demand forecasting model using pharmaceutical time-series data. Applies SARIMA-style forecasting and rolling validation.",
    link: "https://github.com/tharungajula2/Portfolio",
    tag: "// TIME-SERIES FORECASTING",
    gradient: "from-rose-600/10 via-slate-900 to-slate-950"
  },
  {
    name: "NIFTY 100 Portfolio Optimizer",
    description: "Portfolio optimization study on NIFTY 100 stocks. Covers efficient frontier, Sharpe ratio, and risk-return tradeoffs.",
    link: "https://github.com/tharungajula2/Portfolio",
    tag: "// PORTFOLIO OPTIMIZATION",
    gradient: "from-teal-600/10 via-slate-900 to-slate-950"
  }
];

export default function WorkGallery({ type }: WorkGalleryProps) {
  const projects = type === "product_lab" 
    ? productLabProjects.filter(p => !p.hidden) 
    : analyticsQuantProjects.filter(p => !p.hidden);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-32 px-6 pb-40">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-cyan-500/5 via-emerald-500/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            {type === "product_lab" ? "// PRODUCT_LAB_SYSTEMS" : "// ANALYTICS_QUANT_SYSTEMS"}
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
          {type === "product_lab" ? "Product Lab" : "Analytics & Quant"}
        </h2>
      </motion.div>

      {/* RESPONSIVE CSS GRID */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 * (i + 1) }}
            className="bg-black/50 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col group justify-between"
          >
            <div>
              {/* Premium Mini-Browser Mockup Visual Header */}
              <div className="relative w-full h-40 mb-5 bg-neutral-950/80 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center group-hover:border-white/10 transition-all duration-500">
                {/* Background Ambient Glow */}
                <div className={cn(
                  "absolute inset-0 opacity-15 group-hover:opacity-30 transition-opacity duration-500 blur-xl bg-gradient-to-tr",
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
                    <span className="text-[8px] font-mono tracking-[0.3em] text-white/30 block mb-1 uppercase">
                      SYSTEM RUNTIME
                    </span>
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest block font-sans">
                      {project.name.includes(" (") ? project.name.split(" (")[0] : project.name}
                    </span>
                  </div>
                )}
                
                {/* Browser Controls Dots */}
                <div className="absolute top-3 left-4 flex gap-1.5 z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 backdrop-blur-md shadow-sm border border-white/10" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 backdrop-blur-md shadow-sm border border-white/10" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 backdrop-blur-md shadow-sm border border-white/10" />
                </div>
                
                {/* Upper Right Tiny Category Label */}
                <div className="absolute top-2.5 right-4 text-[7px] font-mono text-white/40 bg-black/40 backdrop-blur-md border border-white/5 px-2 py-0.5 rounded uppercase tracking-[0.2em] z-10 select-none">
                  {project.tag.replace('// ', '')}
                </div>
                
                {/* Visual Grid Layer inside screen */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
              </div>

              {/* Title & Tag Info below Graphic */}
              <div className="flex justify-between items-start mb-2">
                <span className="text-[9px] font-mono tracking-[0.3em] text-cyan-400/60 uppercase">
                  {project.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-wide uppercase mb-2 group-hover:text-cyan-400 transition-colors">
                {project.name}
              </h3>

              <p className="text-xs text-white/50 leading-relaxed font-light mb-6">
                {project.description}
              </p>
            </div>

            {/* Action Action Trigger */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all text-[9px] font-mono py-2.5 rounded-xl tracking-[0.2em] uppercase cursor-pointer"
              >
                {project.link.includes("github") ? "[ View on GitHub → ]" : "[ Open Prototype → ]"}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
