
"use client";

import { motion } from "framer-motion";
import {
    Activity,
    ArrowLeft,
    Users,
    Stethoscope,
    TrafficCone,
    BrainCircuit,
    Database,
    Phone,
    ScanLine,
    Network
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export default function ProtocolYuktiPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-hidden relative">
            <Navbar />

            {/* AMBIENT BACKGROUND GLOW - STRICT N=1 CLONE */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-20 pointer-events-none bg-orange-500" />

            <div className="relative z-10 container mx-auto max-w-5xl px-6 md:px-12 pt-32 pb-24">

                {/* NAV BACK */}
                <Link href="/#protocols" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white mb-12">
                    <ArrowLeft className="h-4 w-4" /> RETURN_TO_PROTOCOLS
                </Link>

                {/* HERO HEADER - CENTERED YUKTI STYLE */}
                <div className="flex flex-col items-center text-center space-y-8 mb-24">
                    {/* GLASS ICON BOX */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 text-orange-500">
                        <Users className="h-24 w-24 md:h-32 md:w-32" strokeWidth={1} />
                    </div>

                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center justify-center gap-3">
                            <span className="font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-current bg-black/50 backdrop-blur-md text-orange-500">
                                STATUS: BUILDER_PHASE
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight">
                            Protocol <span className="text-orange-500">YUKTI</span>
                        </h1>

                        <h2 className="text-2xl md:text-3xl font-light text-zinc-200">
                            The Context-Aware Family Health OS.
                        </h2>

                        <p className="font-body text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                            Solving the 'Broken Loop' of Indian Healthcare. Moving from fragmented WhatsApp chats, plastic bags, and 'Context Blindness' to a structured, intelligent Family Health Engine.
                        </p>
                    </div>
                </div>

            </div>

            {/* SECTION 2: THE REALITY GRID (Cards) */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center justify-center gap-4 mb-16">
                        <div className="h-px w-12 bg-orange-500/50" />
                        <h2 className="font-mono text-xs tracking-[0.2em] text-orange-500 uppercase">
                            Family_OS // Core_Modules
                        </h2>
                        <div className="h-px w-12 bg-orange-500/50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">

                        {/* CARD 1: THE CHO */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.05)]"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                                    The 'Chief Health Officer'
                                </h3>
                                <Users className="h-5 w-5 text-orange-500/50 group-hover:text-orange-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-orange-500">
                                <div className="h-px w-8 bg-orange-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 group-hover:text-orange-500/70 transition-colors">
                                    UNIFIED_FAMILY_CONTEXT
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Empowering the Mother (The CHO) who holds the entire family's mental load. Solving the 'Plastic Bag' Syndrome with searchable, portable digital lockers.
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <ul className="grid gap-2">
                                    <li className="flex items-center gap-3 text-sm text-zinc-300 group/item">
                                        <span className="font-mono text-[10px] text-orange-500/60 bg-orange-500/5 px-1.5 py-0.5 rounded border border-orange-500/10 min-w-[20px] text-center">
                                            01
                                        </span>
                                        <span className="text-xs group-hover/item:text-orange-300/80 transition-colors">
                                            Manage Kids, Parents & Pets in one view
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-zinc-300 group/item">
                                        <span className="font-mono text-[10px] text-orange-500/60 bg-orange-500/5 px-1.5 py-0.5 rounded border border-orange-500/10 min-w-[20px] text-center">
                                            02
                                        </span>
                                        <span className="text-xs group-hover/item:text-orange-300/80 transition-colors">
                                            Vaccination & Deworming Trackers
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* CARD 2: CLINICAL SANITY */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.05)]"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                                    Clinical Sanity & Revenue
                                </h3>
                                <Stethoscope className="h-5 w-5 text-orange-500/50 group-hover:text-orange-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-orange-500">
                                <div className="h-px w-8 bg-orange-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 group-hover:text-orange-500/70 transition-colors">
                                    RECEPTION_FIRST_TRIAGE
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Aligning incentives for Doctors. Replacing the unpaid chaos of WhatsApp with structured workflows. Turning 'Just one quick question' into Billable Micro-Consults.
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <ul className="grid gap-2">
                                    <li className="flex items-center gap-3 text-sm text-zinc-300 group/item">
                                        <span className="font-mono text-[10px] text-orange-500/60 bg-orange-500/5 px-1.5 py-0.5 rounded border border-orange-500/10 min-w-[20px] text-center">
                                            01
                                        </span>
                                        <span className="text-xs group-hover/item:text-orange-300/80 transition-colors">
                                            Kill the '3-Minute Consult' noise
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-zinc-300 group/item">
                                        <span className="font-mono text-[10px] text-orange-500/60 bg-orange-500/5 px-1.5 py-0.5 rounded border border-orange-500/10 min-w-[20px] text-center">
                                            02
                                        </span>
                                        <span className="text-xs group-hover/item:text-orange-300/80 transition-colors">
                                            Liability Protection by Design
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* CARD 3: BANGALORE REALITY */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.05)]"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                                    The Bangalore Reality
                                </h3>
                                <TrafficCone className="h-5 w-5 text-orange-500/50 group-hover:text-orange-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-orange-500">
                                <div className="h-px w-8 bg-orange-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 group-hover:text-orange-500/70 transition-colors">
                                    HYPER_LOCAL_FRICTION
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Traffic is a health determinant. Optimizing for the '10-minute delivery' mindset. Video-First Default: Physical visits only when acuity demands it.
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <ul className="grid gap-2">
                                    <li className="flex items-center gap-3 text-sm text-zinc-300 group/item">
                                        <span className="font-mono text-[10px] text-orange-500/60 bg-orange-500/5 px-1.5 py-0.5 rounded border border-orange-500/10 min-w-[20px] text-center">
                                            01
                                        </span>
                                        <span className="text-xs group-hover/item:text-orange-300/80 transition-colors">
                                            Home Sample Aggregation
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-zinc-300 group/item">
                                        <span className="font-mono text-[10px] text-orange-500/60 bg-orange-500/5 px-1.5 py-0.5 rounded border border-orange-500/10 min-w-[20px] text-center">
                                            02
                                        </span>
                                        <span className="text-xs group-hover/item:text-orange-300/80 transition-colors">
                                            Prescription-linked Fulfillment
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* CARD 4: INTELLIGENCE LAYER */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.05)]"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                                    Ending 'Context Blindness'
                                </h3>
                                <BrainCircuit className="h-5 w-5 text-orange-500/50 group-hover:text-orange-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-orange-500">
                                <div className="h-px w-8 bg-orange-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 group-hover:text-orange-500/70 transition-colors">
                                    CONTEXT_AWARENESS
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                The system remembers so you don't have to repeat. Powered by Protocol N=1: Syncing clinical knowledge into family decisions.
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <ul className="grid gap-2">
                                    <li className="flex items-center gap-3 text-sm text-zinc-300 group/item">
                                        <span className="font-mono text-[10px] text-orange-500/60 bg-orange-500/5 px-1.5 py-0.5 rounded border border-orange-500/10 min-w-[20px] text-center">
                                            01
                                        </span>
                                        <span className="text-xs group-hover/item:text-orange-300/80 transition-colors">
                                            Longitudinal History
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-zinc-300 group/item">
                                        <span className="font-mono text-[10px] text-orange-500/60 bg-orange-500/5 px-1.5 py-0.5 rounded border border-orange-500/10 min-w-[20px] text-center">
                                            02
                                        </span>
                                        <span className="text-xs group-hover/item:text-orange-300/80 transition-colors">
                                            ABDM / UHI Ready
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* SECTION 3: THE TECH STACK (Infrastructure) */}
            <section className="py-20 px-6 border-t border-white/5 bg-white/[0.02]">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col items-center justify-center mb-12 text-center">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-12 bg-orange-500" />
                            <h2 className="font-mono text-sm tracking-widest text-orange-500 uppercase">
                                // ARCHITECTURE_CONCEPTS // FAMILY_LAB
                            </h2>
                            <div className="h-px w-12 bg-orange-500" />
                        </div>
                        <p className="font-body text-sm text-zinc-500 max-w-lg">
                            An illustrative example of the hardware and software stack that could be used. The actual architecture may vary based on specific requirements.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            { name: "Next.js (App)", icon: Network, category: "Frontend" },
                            { name: "ABDM / ABHA", icon: Database, category: "Govt Rails" },
                            { name: "WhatsApp API", icon: Phone, category: "Comms" },
                            { name: "OCR / Vision", icon: ScanLine, category: "Digitization" },
                            { name: "Vector DB", icon: BrainCircuit, category: "Memory" }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex flex-col items-center justify-center p-6 rounded-xl border border-white/5 bg-black hover:border-orange-500/30 hover:bg-orange-900/5 transition-all text-center group"
                            >
                                <div className="p-3 mb-4 rounded-full bg-orange-500/5 text-orange-500/70 group-hover:text-orange-400 group-hover:bg-orange-500/10 group-hover:scale-110 transition-all">
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <h4 className="font-heading text-sm font-bold text-zinc-300 mb-1">
                                    {item.name}
                                </h4>
                                <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider group-hover:text-orange-500/50 transition-colors">
                                    {item.category}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
