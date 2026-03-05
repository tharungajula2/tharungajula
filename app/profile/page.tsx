import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export const metadata = {
    title: "Profile | Tharun Learning Lab"
};

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-slate-950 flex flex-col">
            <Navbar />

            <section className="flex-1 flex flex-col w-full px-6 pt-32 pb-12 md:px-12 relative z-10">
                <div className="container mx-auto max-w-4xl w-full flex flex-col">

                    {/* NAV & HEADER */}
                    <div className="mb-12 shrink-0">
                        <Link href="/" className="inline-flex items-center gap-2 font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500 transition-colors hover:text-cyan-400 mb-6">
                            <ArrowLeft className="h-4 w-4" /> RETURN_TO_DESKTOP
                        </Link>

                        <div className="space-y-2">
                            <span className="flex items-center gap-3 font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
                                // SYSTEM_OS {'>'} USER_PROFILE [ACTIVE]
                            </span>
                        </div>
                    </div>

                    {/* PROFILE CONTENT */}
                    <div className="flex flex-col gap-8 text-slate-300 font-body text-sm leading-relaxed pb-12">
                        {/* Header Area */}
                        <div className="flex flex-col gap-2 border-b border-white/10 pb-8">
                            <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 mb-2">
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
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Linkedin</a>
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
                                <span className="text-cyan-400 font-medium italic">Manager — Credit Risk Analytics</span>
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
                                <span className="text-cyan-400 font-medium italic">Business Analyst — B2B Client</span>
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
                                    <span>Post Graduate Level Programme in Deep Learning — 2023 - 2025, <span className="text-cyan-400">Grade: 92%</span></span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-white font-bold">National Institute of Bank Management(NIBM), Pune</span>
                                    <span>PGDM, Banking and Finance — 2019 - 2021, <span className="text-cyan-400">Grade: 74.13%</span></span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-white font-bold">GRIET, JNTUH, Hyderabad</span>
                                    <span>Bachelor of Technology, Mechanical Engineering — 2013 - 2017, <span className="text-cyan-400">Grade: 85.62%</span></span>
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
                                <li><span className="text-white">Professional Certification of Advanced Data Analytics</span> — Google - June 2023</li>
                                <li><span className="text-white">Foundations of Agile Development and Scrum</span> — IBM - June 2024</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
