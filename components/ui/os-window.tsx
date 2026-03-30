"use client";

import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function OsWindow() {
    const searchParams = useSearchParams();
    const app = searchParams.get("app");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {app && (
                <motion.div
                    key="os-window"
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed inset-4 md:inset-10 z-[60] bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
                >
                    {/* Header Bar - Terminal Breadcrumbs */}
                    <div className="flex flex-col gap-2 p-6 md:p-10 pb-0 shrink-0">
                        <Link href="/" className="text-slate-500 hover:text-cyan-400 flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors w-fit">
                            ← RETURN_TO_DESKTOP
                        </Link>
                        <div className="font-mono text-[10px] md:text-xs text-cyan-400 tracking-widest uppercase mt-4">
                            // SYSTEM_OS {'>'} {app === 'profile' ? 'USER_PROFILE' : app === 'contact' ? 'COMMS_RELAY' : 'MODULE'} [ACTIVE]
                        </div>
                    </div>

                    {/* Window Body -> Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-12">
                        {app === "profile" && <ProfileContent />}
                        {app === "contact" && <ContactContent />}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function ProfileContent() {
    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8 text-slate-300 font-body text-sm leading-relaxed pb-12">

            {/* Header Area */}
            <div className="flex flex-col gap-2 border-b border-white/10 pb-8">
                <h1 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-2">
                    Tharun Kumar Gajula
                </h1>
                <div className="font-mono text-cyan-400 text-xs md:text-sm flex flex-wrap gap-2 md:gap-4 mt-2">
                    <span>Contact: Bengaluru, India</span>
                    <span className="hidden md:inline">||</span>
                    <span>+91-9110572145</span>
                    <span className="hidden md:inline">||</span>
                    <a href="mailto:tharun.gajula.2@gmail.com" className="hover:text-white transition-colors">tharun.gajula.2@gmail.com</a>
                </div>
                <div className="font-mono text-slate-400 text-xs md:text-sm flex gap-4 mt-1">
                    <a href="#" className="hover:text-cyan-400 transition-colors">Portfolio</a>
                    <span>||</span>
                    <a href="#" className="hover:text-cyan-400 transition-colors">Linkedin</a>
                </div>

                <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                    <h3 className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-3">
                        PROFESSIONAL SUMMARY:
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                        Results-oriented Risk Analytics professional with a banking/finance background, specializing in Credit Risk Management with exposure to commercial banking portfolio workflows (annual reviews, financial spreading, covenant/trigger tracking).<br /><br />
                        I develop predictive models and analytical frameworks that turn complex data into actionable risk strategies and produce credit-memo–style summaries and status updates for bankers and management.<br /><br />
                        Proficient in Python/SQL for in-depth portfolio analysis and light automation of monitoring/reporting; experienced in business analysis and guiding solutions through the SDLC with strong documentation.
                    </p>
                </div>
            </div>

            {/* CORPORATE WORK EXPERIENCE */}
            <div className="flex flex-col gap-6">
                <h3 className="font-mono text-cyan-400 text-xs tracking-widest uppercase border-b border-white/10 pb-2">
                    CORPORATE WORK EXPERIENCE
                </h3>

                {/* Job 1 */}
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                        <span className="text-white font-bold text-base">Jana Small Finance Bank, Bengaluru, India</span>
                        <span className="font-mono text-xs text-slate-400">November 2021 - March 2022</span>
                    </div>
                    <span className="text-cyan-400 font-medium italic">Manager: Credit Risk Analytics</span>
                    <ul className="list-disc list-outside ml-5 space-y-2 mt-2 text-slate-300">
                        <li>Worked on credit risk analytics frameworks for diverse lending portfolios (Retail, SME), delivering data-driven insights to senior management to guide risk strategy and decision-making.</li>
                        <li>Designed and deployed an automated end-to-end reporting solution using SQL and KNIME, establishing clear data lineage from source to final report. This process, aligned with risk data aggregation principles (BCBS 239), involved robust data quality checks and reduced report delivery time by 30%.</li>
                        <li>Additionally, supported the ALM & Treasury function by contributing to data preparation and analysis for key regulatory reports submitted to the RBI, covering areas like liquidity gap analysis and interest rate risk.</li>
                    </ul>
                </div>

                {/* Job 2 */}
                <div className="flex flex-col gap-2 mt-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                        <span className="text-white font-bold text-base">Lentra AI, Pune, India</span>
                        <span className="font-mono text-xs text-slate-400">April 2021 - October 2021</span>
                    </div>
                    <span className="text-cyan-400 font-medium italic">Business Analyst - B2B Client</span>
                    <ul className="list-disc list-outside ml-5 space-y-2 mt-2 text-slate-300">
                        <li>Worked on the end-to-end Software Development Lifecycle (SDLC) for client-facing solution delivery (Loan Origination System) within a fast-paced Agile/Scrum environment.</li>
                        <li>Authored comprehensive Business and Functional Requirement Documents (BRD/FRD) by translating client needs into detailed technical specifications for development teams.</li>
                        <li>Designed and documented complete product workflows using Draw.io, creating a clear product illustration that improved understanding for stakeholders, team members, clients.</li>
                        <li>Accelerated the UAT and testing phases by automating test data generation and creating verification excel workbooks for complex loan calculations. Performed hands-on API testing using Postman to validate system integrations and ensure stability before go-live.</li>
                    </ul>
                </div>
            </div>

            {/* TECHNICAL SKILLS */}
            <div className="flex flex-col gap-6 mt-4">
                <h3 className="font-mono text-cyan-400 text-xs tracking-widest uppercase border-b border-white/10 pb-2">
                    TECHNICAL SKILLS
                </h3>

                <div className="flex flex-col gap-4">
                    <div>
                        <span className="text-white font-semibold">Credit Risk & Financial Analysis:</span>
                        <p className="mt-1">Credit Analysis, Portfolio Monitoring, Credit Scoring Models, Predictive Models Development (PD, LGD, EAD), Validation((KS/AUC/Gini), Monitoring(PSI/CSI), Backtesting, Regulatory Frameworks Familiarity (Basel, IFRS 9, Stress Testing, ICAAP), BCBS 239 lineage and clear model documentation.</p>
                    </div>
                    <div>
                        <span className="text-white font-semibold">Technical & Modeling Skills:</span>
                        <p className="mt-1">Python (Pandas, NumPy, Scikit-learn), SQL, Data Quality & Validation, Exploratory Data Analysis, Statistical Modeling (Regression), Machine Learning (Classification, Random Forest, XGBoost), Model Validation, Data Visualization, Workflow Automation, Documentation & Reporting.</p>
                    </div>
                    <div>
                        <span className="text-white font-semibold flex items-center gap-2 mb-2">Tools & Platforms:</span>
                        <div className="flex flex-wrap gap-2 mt-1 hidden-scrollbar">
                            {["VS Code", "Jupyter Notebooks", "GitHub", "MS Office Suite", "Postman", "JIRA"].map(tool => (
                                <span key={tool} className="font-mono text-[10px] px-2 py-1 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 whitespace-nowrap">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ACADEMICS */}
            <div className="flex flex-col gap-6 mt-4">
                <h3 className="font-mono text-cyan-400 text-xs tracking-widest uppercase border-b border-white/10 pb-2">
                    ACADEMICS
                </h3>
                <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-white font-bold">Indian Institute of Science(IISc), Bangalore</span>
                        <span>Post Graduate Level Programme in Deep Learning, 2023 - 2025, <span className="text-cyan-400">Grade: 92%</span></span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-white font-bold">National Institute of Bank Management(NIBM), Pune</span>
                        <span>PGDM, Banking and Finance, 2019 - 2021, <span className="text-cyan-400">Grade: 74.13%</span></span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-white font-bold">GRIET, JNTUH, Hyderabad</span>
                        <span>Bachelor of Technology, Mechanical Engineering, 2013 - 2017, <span className="text-cyan-400">Grade: 85.62%</span></span>
                    </div>
                </div>
            </div>

            {/* KEY PORTFOLIO PROJECTS */}
            <div className="flex flex-col gap-6 mt-4">
                <h3 className="font-mono text-cyan-400 text-xs tracking-widest uppercase border-b border-white/10 pb-2">
                    KEY PORTFOLIO PROJECTS
                </h3>
                <ul className="list-disc list-outside ml-5 space-y-3 text-slate-300">
                    <li>Developed a Python-based credit risk scorecard incorporating a PD, EAD, LGD models, validation and monitoring, significantly enhancing credit evaluation accuracy and fortifying portfolio risk management.</li>
                    <li>Engineered a Python-based ALM analytics engine to automate IRRBB and Liquidity Risk reporting. The framework generates key regulatory reports including Gap Analysis, NII Sensitivity, and the Liquidity Coverage Ratio (LCR), translating balance sheet data into actionable risk insights.</li>
                    <li>Engineered an automated equity portfolio analytics framework for streamlined sector attribution, performance tracking, and optimized turnover strategies, enhancing investment decisions.</li>
                    <li>Artificial Neural Network (ANN) classifier for bank customer churn, achieving 75% recall in proactively identifying at-risk individuals using deep learning techniques.</li>
                    <li>Built predictive models (Logistic Regression, Random Forest, XGBoost) for employee attrition, achieving 96% accuracy and delivering actionable insights for HR retention strategy optimization.</li>
                    <li>ML pipeline (XGBoost ensemble) classifying socio-economic status of households from national survey data (84% accuracy), deriving key feature importances for public policy insights.</li>
                    <li>NLP pipeline for Twitter sentiment analysis (Random Forest, TF-IDF), achieving 77% accuracy to generate actionable insights for digital marketing and customer engagement.</li>
                </ul>
            </div>

            {/* CERTIFICATIONS AND COURSES */}
            <div className="flex flex-col gap-6 mt-4">
                <h3 className="font-mono text-cyan-400 text-xs tracking-widest uppercase border-b border-white/10 pb-2">
                    CERTIFICATIONS AND COURSES
                </h3>
                <ul className="list-disc list-outside ml-5 space-y-2 text-slate-300">
                    <li><span className="text-white">Professional Certification of Advanced Data Analytics</span>, Google - June 2023</li>
                    <li><span className="text-white">Foundations of Agile Development and Scrum</span>, IBM - June 2024</li>
                </ul>
            </div>

        </div>
    );
}

function ContactContent() {
    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-10 text-slate-300 font-body pb-12">

            <div className="flex flex-col gap-4 border-b border-white/10 pb-8">
                <h1 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                    COMMUNICATIONS RELAY
                </h1>
                <p className="font-mono text-slate-400 text-xs md:text-sm mt-2 leading-relaxed max-w-2xl">
                    Secure channels available for direct correspondence regarding Data Science, Risk Analytics, and Product Architecture roles.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a href="mailto:tharun.gajula.2@gmail.com" className="bg-white/5 border border-white/10 p-8 rounded-xl hover:bg-white/10 hover:border-cyan-400/50 transition-all flex flex-col items-center justify-center gap-4 group">
                    <Mail size={32} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <span className="font-mono text-white tracking-widest text-sm text-center">tharun.gajula.2@gmail.com</span>
                </a>

                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 p-8 rounded-xl hover:bg-white/10 hover:border-cyan-400/50 transition-all flex flex-col items-center justify-center gap-4 group">
                    <Linkedin size={32} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <span className="font-mono text-white tracking-widest text-sm">LINKEDIN NETWORK</span>
                </a>
            </div>

        </div>
    );
}

function RiskOsContent() {
    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-8 text-slate-300 font-body pb-12">
            {/* Header Area */}
            <div className="flex flex-col gap-2 border-b border-white/10 pb-8">
                <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500">
                    PREDICTIVE RISK & ALM ENGINE
                </h1>
                <div className="font-mono text-slate-400 text-xs md:text-sm mt-2">
                    // STATUS: <span className="text-green-400">DEPLOYED</span> | RUNNING PROBABILITY & CAPITAL MODELS
                </div>
            </div>

            {/* The Modules Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Module 1 (ALM) */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4 backdrop-blur-md hover:bg-white/10 transition-colors">
                    <div className="flex flex-col gap-1 border-b border-white/10 pb-3">
                        <h3 className="font-mono text-cyan-400 text-sm tracking-widest uppercase font-bold">
                            [MODULE 01] ALM & Treasury Analytics Engine
                        </h3>
                        <div className="font-mono text-[10px] text-slate-400">
                            STACK: <span className="text-white">Python 3.11, Pandas</span>
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Automated engine generating BCBS 239 compliant reports. Calculates IRRBB Gap Analysis and Net Interest Income (NII) sensitivity under +100 bps shocks. Simulates 30-day stressed Basel III Liquidity Coverage Ratios (LCR).
                    </p>
                </div>

                {/* Module 2 (Credit Risk) */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4 backdrop-blur-md hover:bg-white/10 transition-colors">
                    <div className="flex flex-col gap-1 border-b border-white/10 pb-3">
                        <h3 className="font-mono text-cyan-400 text-sm tracking-widest uppercase font-bold">
                            [MODULE 02] PD Scorecard & Credit Models
                        </h3>
                        <div className="font-mono text-[10px] text-slate-400">
                            STACK: <span className="text-white">Python, Scikit-learn, SQL</span>
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed">
                        End-to-end predictive modeling framework for Probability of Default (PD), Exposure at Default (EAD), and Loss Given Default (LGD). Features robust validation (KS/AUC/Gini) and monitoring (PSI/CSI) for commercial and retail portfolios.
                    </p>
                </div>

                {/* Module 3 (Equity/Turnover) */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4 backdrop-blur-md hover:bg-white/10 transition-colors">
                    <div className="flex flex-col gap-1 border-b border-white/10 pb-3">
                        <h3 className="font-mono text-cyan-400 text-sm tracking-widest uppercase font-bold">
                            [MODULE 03] Quantitative Equity Framework
                        </h3>
                        <div className="font-mono text-[10px] text-slate-400">
                            STACK: <span className="text-white">Python, CVXPY Optimization</span>
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed">
                        4-part framework for backtesting, robustness analysis, and turnover control. Utilizes L1/L2 norm weight optimization to minimize trading costs while maintaining target alpha.
                    </p>
                </div>

            </div>
        </div>
    );
}
