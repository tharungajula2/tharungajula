"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Youtube, Mail, Cpu, Database, Brain, ChevronsRight, Terminal, Layers, Activity, GitBranch, BarChart3, LineChart, Briefcase, GraduationCap, Award, Globe, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/tharungajula2" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/tharungajula" },
    { name: "YouTube", icon: Youtube, href: "#" },
    { name: "Email", icon: Mail, href: "mailto:tharun.gajula.2@gmail.com" },
];

const experience = [
    { title: "Ind. Consultant (AI & Digital Solutions)", date: "2022 - Present", status: "Current", desc: "Experiments & Learning @ Tharun Health Lab" },
    { title: "Manager - Credit Risk", date: "2021 - 2022", company: "Jana Small Finance Bank" },
    { title: "Business Solution Analyst", date: "2021", company: "Lentra AI" },
];

const education = [
    { title: "PG Level - AI-ML", date: "2023 - 2025", inst: "IISc Bangalore" },
    { title: "MBA - Banking & Finance", date: "2019 - 2021", inst: "NIBM Pune" },
    { title: "B.Tech - Mechanical", date: "2013 - 2017", inst: "GRIET Hyderabad" },
];

const certs = [
    { title: "Digital Marketing Analyst", date: "May 2024", inst: "Unilever" },
    { title: "Advanced Data Analytics", date: "June 2023", inst: "Google" },
];

const skillMatrix = [
    { category: "Product & Strategy", items: ["Product Strategy", "Requirement Gathering (BRD/PRD)", "Agile / Scrum", "UAT", "Systems Thinking"] },
    { category: "AI & Engineering", items: ["Machine Learning (Models)", "Next.js (App Router)", "LLM, RAG applications", "Workflow Automation"] },
    { category: "Data & Analytics", items: ["Python", "SQL", "PowerBI", "EDA", "Statistical Modeling"] },
    { category: "Tools & Ops", items: ["VS Code / Antigravity", "GitHub", "Vercel", "JIRA", "Notion & Canva"] },
];

const projectArchive = [
    { title: "Family OS", desc: "Context-Aware Health OS & Digital Twin. (Next.js/Gemini).", icon: Activity },
    { title: "Quant Equity Engine", desc: "Convex Optimization for turnover control. (Python/CVXPY).", icon: BarChart3 },
    { title: "ALM Treasury Engine", desc: "Banking Regulatory Reporting & Stress Testing. (Python).", icon: Layers },
    { title: "RL Agent Opt.", desc: "CartPole PPO/SAC optimization (80% efficiency).", icon: Brain },
    { title: "Credit Risk Scorecard", desc: "PD Modeling for lending decisions.", icon: LineChart },
    { title: "Pharma Forecasting", desc: "SARIMA Time-series (5.7% MAPE).", icon: Activity },
    { title: "Twitter NLP", desc: "Sentiment Analysis (77% Accuracy).", icon: Terminal },
    { title: "Diabetes Prediction", desc: "Health Risk ML (0.82 ROC-AUC).", icon: Database },
];

export function AboutSection() {
    return (
        <section id="about" className="relative w-full py-24 px-6 md:px-12">
            <div className="container mx-auto max-w-6xl">

                {/* header: IDENTITY */}
                <div className="mb-16 space-y-6 text-center md:text-left">
                    <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
                        // OPERATOR_DOSSIER
                    </span>
                    <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
                        THARUN KUMAR GAJULA
                    </h2>
                    <p className="font-body text-xl text-zinc-300">
                        Digital Solutions <span className="text-zinc-600">|</span> AI & Analytics <span className="text-zinc-600">|</span> Systems Thinking
                    </p>
                    <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4 text-zinc-500 font-mono text-sm justify-center md:justify-start">
                        <span className="flex items-center gap-2">
                            <Globe className="h-4 w-4" /> Bengaluru, India
                        </span>
                    </div>
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12">

                    {/* 1. MANIFESTO (Full Width) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-6 md:p-8 backdrop-blur-md md:col-span-12"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 transition-opacity group-hover:opacity-10 hidden md:block">
                            <Cpu className="h-32 w-32 text-primary" />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-zinc-500">
                                <ChevronsRight className="h-4 w-4 text-primary" />
                                [THE_MINDSET]
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-white">
                                The Researcher's Manifesto
                            </h3>
                            <p className="max-w-prose font-body text-lg leading-relaxed text-zinc-300 break-words">
                                I bridge the gap between Business Strategy and Technical Execution. My background is multidisciplinary - spanning Engineering, Finance, and AI-ML.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-white/5">
                                    <div className="mt-1 min-w-fit">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block font-mono text-xs font-bold text-emerald-500 uppercase tracking-wider">BACKGROUND:</span>
                                        <p className="font-body text-sm text-zinc-300 leading-relaxed">
                                            Bridging Business Strategy and Technical Execution. My roots are multidisciplinary - spanning Engineering, Finance, and AI-ML.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-white/5">
                                    <div className="mt-1 min-w-fit">
                                        <Sparkles className="h-5 w-5 text-emerald-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block font-mono text-xs font-bold text-emerald-500 uppercase tracking-wider">EXPLORING:</span>
                                        <p className="font-body text-sm text-zinc-300 leading-relaxed">
                                            Studying Protocol Family, Protocol Cognition, and Protocol N=1. Investigating the systems behind family health, cognitive architecture, and biological optimization.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. EXPERIENCE (Left - 6 Cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-6 md:p-8 backdrop-blur-md md:col-span-6"
                    >
                        <div className="mb-6 flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-zinc-500">
                            <Briefcase className="h-4 w-4 text-primary" />
                            [EXPERIENCE_LOG]
                        </div>
                        <ul className="space-y-6">
                            {experience.map((job, i) => (
                                <li key={i} className="relative pl-6 border-l border-zinc-800">
                                    <div className={cn("absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-900", job.status === "Current" ? "bg-primary" : "bg-zinc-600")} />
                                    <div className="flex flex-col">
                                        <span className="font-heading font-semibold text-white">{job.title}</span>
                                        <span className="font-body text-sm text-zinc-400">{job.company || job.desc}</span>
                                        <span className="font-mono text-xs text-zinc-500 mt-1">{job.date}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* 3. EDUCATION & CERTS (Right - 6 Cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-6 md:p-8 backdrop-blur-md md:col-span-6"
                    >
                        <div className="mb-6 flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-zinc-500">
                            <GraduationCap className="h-4 w-4 text-primary" />
                            [ACADEMIC_DATA]
                        </div>
                        <div className="space-y-8">
                            <ul className="space-y-4">
                                {education.map((edu, i) => (
                                    <li key={i} className="flex flex-col">
                                        <span className="font-heading font-semibold text-white">{edu.title}</span>
                                        <span className="font-body text-sm text-zinc-400">{edu.inst}</span>
                                        <span className="font-mono text-xs text-zinc-500">{edu.date}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4 border-t border-white/5">
                                <div className="mb-4 flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-zinc-500">
                                    <Award className="h-4 w-4 text-primary" />
                                    [CERTIFICATIONS]
                                </div>
                                <ul className="space-y-3">
                                    {certs.map((cert, i) => (
                                        <li key={i} className="flex justify-between items-start">
                                            <div className="flex flex-col">
                                                <span className="font-body text-sm text-zinc-300 font-medium">{cert.title}</span>
                                                <span className="font-mono text-xs text-zinc-500">{cert.inst}</span>
                                            </div>
                                            <span className="font-mono text-xs text-zinc-600">{cert.date}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. WHOLESOME SKILL MATRIX (Full Width) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-6 md:p-8 backdrop-blur-md md:col-span-12"
                    >
                        <div className="mb-6 flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-zinc-500">
                            <Layers className="h-4 w-4 text-primary" />
                            [CAPABILITY_MATRIX]
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {skillMatrix.map((skill, i) => (
                                <div key={i} className="space-y-3">
                                    <h4 className="font-heading text-sm font-bold text-white border-b border-primary/20 pb-2 mb-2 inline-block">
                                        {skill.category}
                                    </h4>
                                    <ul className="space-y-2">
                                        {skill.items.map((item, j) => (
                                            <li key={j} className="font-mono text-xs text-zinc-400 hover:text-primary transition-colors cursor-default">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 5. PROJECT ARCHIVE (Full Width Grid) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-6 md:p-8 backdrop-blur-md md:col-span-12"
                    >
                        <div className="mb-6 flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-zinc-500">
                            <GitBranch className="h-4 w-4 text-primary" />
                            [PROJECT_ARCHIVE]
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {projectArchive.map((proj, i) => (
                                <div key={i} className="group flex flex-col p-4 rounded-xl border border-white/5 bg-black/20 hover:bg-white/5 hover:border-primary/30 transition-all duration-300">
                                    <div className="flex items-center gap-2 mb-2">
                                        <proj.icon className="h-4 w-4 text-zinc-500 group-hover:text-primary transition-colors" />
                                        <h4 className="font-heading text-sm font-bold text-zinc-200 group-hover:text-white">{proj.title}</h4>
                                    </div>
                                    <p className="font-body text-xs text-zinc-500 leading-snug group-hover:text-zinc-400">
                                        {proj.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 6. SOCIAL LINKS (Row) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-md md:col-span-12"
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
                                >
                                    <link.icon className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-primary" />
                                    <span className="font-mono text-xs font-bold text-zinc-400 group-hover:text-white">
                                        {link.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
