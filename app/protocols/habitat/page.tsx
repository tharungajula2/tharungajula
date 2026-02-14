"use client";
// Force Rebuild for Metadata Sync

import { motion } from "framer-motion";
import {
    ArrowLeft,
    LayoutTemplate,
    Sparkles,
    Wind,
    Droplet,
    Sun,
    WifiOff,
    VolumeX,
    Layers
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export default function ProtocolHabitatPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden relative">
            <Navbar />

            {/* AMBIENT BACKGROUND GLOW */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full blur-3xl opacity-20 pointer-events-none bg-blue-500" />

            <div className="relative z-10 container mx-auto max-w-5xl px-6 md:px-12 pt-32 pb-24">

                {/* NAV BACK */}
                <Link href="/#protocols" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white mb-12">
                    <ArrowLeft className="h-4 w-4" /> RETURN_TO_PROTOCOLS
                </Link>

                {/* HERO HEADER - ENGINEERING FOCUSED */}
                <div className="flex flex-col items-center text-center space-y-8 mb-24">
                    {/* GLASS ICON BOX */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 text-blue-500">
                        <LayoutTemplate className="h-24 w-24 md:h-32 md:w-32" strokeWidth={1} />
                    </div>

                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center justify-center gap-3">
                            <span className="font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-current bg-black/50 backdrop-blur-md text-blue-500">
                                STATUS: ACTIVE_LEARNING
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight">
                            Protocol <span className="text-blue-500">HABITAT</span>
                        </h1>

                        <h2 className="text-2xl md:text-3xl font-light text-zinc-200">
                            The Environmental Architecture.
                        </h2>

                        <p className="font-body text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                            Engineering the home as an Exosomatic Immune System. A biological prosthesis to defend against the modern city.
                        </p>
                    </div>
                </div>

            </div>

            {/* SECTION 2: THE ENGINEERING LAYER GRID */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 text-center">
                        <div className="h-px w-12 bg-blue-500/50 hidden md:block" />
                        <h2 className="font-mono text-xs tracking-[0.2em] text-blue-500 uppercase">
                            ENGINEERING_LAYERS // EXPLORATION_VECTORS
                        </h2>
                        <div className="h-px w-12 bg-blue-500/50 hidden md:block" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">

                        {/* CARD 1: ATMOSPHERIC */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-blue-500/40 md:hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] active:scale-[0.98] active:border-blue-500/40 active:bg-blue-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-blue-400 active:text-blue-400 transition-colors">
                                    Air as Nutrient
                                </h3>
                                <Wind className="h-5 w-5 text-blue-500/50 md:group-hover:text-blue-500 active:text-blue-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-blue-500">
                                <div className="h-px w-8 bg-blue-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-blue-500/70 active:text-blue-500/70 transition-colors">
                                    ATMOSPHERIC_SYSTEM
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Treating air as food. Using positive pressure to turn the home into a 'Clean Room' that rejects city smog and pollen.
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["Positive Pressure", "PM2.5 Zero", "CO2"].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 2: HYDROLOGICAL */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-blue-500/40 md:hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] active:scale-[0.98] active:border-blue-500/40 active:bg-blue-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-blue-400 active:text-blue-400 transition-colors">
                                    Water as Information
                                </h3>
                                <Droplet className="h-5 w-5 text-blue-500/50 md:group-hover:text-blue-500 active:text-blue-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-blue-500">
                                <div className="h-px w-8 bg-blue-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-blue-500/70 active:text-blue-500/70 transition-colors">
                                    HYDROLOGICAL_SYSTEM
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Restoring the matrix. Stripping industrial contaminants (PFAS/Chlorine) while restoring the mineral balance essential for biology.
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["Remineralization", "No Fluoride", "Structure"].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 3: PHOTONIC */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-blue-500/40 md:hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] active:scale-[0.98] active:border-blue-500/40 active:bg-blue-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-blue-400 active:text-blue-400 transition-colors">
                                    Circadian Engineering
                                </h3>
                                <Sun className="h-5 w-5 text-blue-500/50 md:group-hover:text-blue-500 active:text-blue-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-blue-500">
                                <div className="h-px w-8 bg-blue-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-blue-500/70 active:text-blue-500/70 transition-colors">
                                    PHOTONIC_SYSTEM
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Light as a drug. Managing the spectrum to spike cortisol in the morning and protect melatonin at night.
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["Melanopic EDI", "Zero-Flicker", "NIR"].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 4: ELECTROMAGNETIC */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-blue-500/40 md:hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] active:scale-[0.98] active:border-blue-500/40 active:bg-blue-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-blue-400 active:text-blue-400 transition-colors">
                                    Silence in the Spectrum
                                </h3>
                                <WifiOff className="h-5 w-5 text-blue-500/50 md:group-hover:text-blue-500 active:text-blue-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-blue-500">
                                <div className="h-px w-8 bg-blue-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-blue-500/70 active:text-blue-500/70 transition-colors">
                                    ELECTROMAGNETIC_TERRAIN
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                The Faraday concept. Reducing non-native frequencies (Dirty Electricity, 5G) to allow the nervous system to discharge and recover.
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["RF Shielding", "Body Voltage", "Hardwired"].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 5: SONIC */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-blue-500/40 md:hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] active:scale-[0.98] active:border-blue-500/40 active:bg-blue-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-blue-400 active:text-blue-400 transition-colors">
                                    Acoustic Restoration
                                </h3>
                                <VolumeX className="h-5 w-5 text-blue-500/50 md:group-hover:text-blue-500 active:text-blue-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-blue-500">
                                <div className="h-px w-8 bg-blue-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-blue-500/70 active:text-blue-500/70 transition-colors">
                                    SONIC_SYSTEM
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Protecting the sleep architecture. Using mass and decoupling to block low-frequency urban rumble that triggers stress responses.
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["Deep Sleep", "Noise Criteria (NC-20)"].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 6: MATERIAL */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-blue-500/40 md:hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] active:scale-[0.98] active:border-blue-500/40 active:bg-blue-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-blue-400 active:text-blue-400 transition-colors">
                                    Chemical Envelope
                                </h3>
                                <Layers className="h-5 w-5 text-blue-500/50 md:group-hover:text-blue-500 active:text-blue-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-blue-500">
                                <div className="h-px w-8 bg-blue-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-blue-500/70 active:text-blue-500/70 transition-colors">
                                    MATERIAL_SYSTEM
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                The Third Skin. Eliminating VOCs and endocrine disruptors by using breathable, natural materials like clay, lime, and wood.
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["Low-Tox", "Red List Free", "Clay Plaster"].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 7: EVOLVING ROADMAP */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className="group relative p-8 rounded-2xl border border-dashed border-zinc-800 bg-black/20 backdrop-blur-sm flex flex-col justify-center items-center text-center md:hover:border-zinc-700 active:border-zinc-700 active:scale-[0.98] transition-all md:col-span-2 lg:col-span-3 mt-8"
                        >
                            <div className="p-4 rounded-full bg-zinc-900 text-zinc-600 mb-4 md:group-hover:text-blue-500 active:text-blue-500 transition-colors">
                                <Sparkles className="h-6 w-6 animate-pulse" />
                            </div>
                            <h3 className="font-heading text-lg font-bold text-zinc-500 mb-2">
                                META_PROTOCOL // EVOLVING_SYSTEM
                            </h3>
                            <p className="font-body text-sm text-zinc-600 max-w-lg">
                                The urban environment is an active stressor. We target 'No Anomaly' standards (SBM-2015) to create a fortress for healing. <strong className="text-zinc-500">This architecture is not static; our engineering evolves as we test new defenses.</strong>
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* SECTION 4: THE MISSION OBJECTIVE */}
            <section className="py-32 px-6 text-center border-t border-white/5 bg-white/[0.02]">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <p className="font-mono text-xs tracking-[0.3em] text-blue-500 uppercase">
                            // MISSION_OBJECTIVE
                        </p>
                        <h3 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
                            "To engineer a <span className="text-blue-500">Sanctuary</span> that acts as a passive <br className="hidden md:block" />
                            life-support system for <span className="text-emerald-500">Protocol N=1</span> and <span className="text-orange-500">Protocol Family</span>."
                        </h3>
                        <div className="pt-8">
                            <div className="h-16 w-px bg-gradient-to-b from-blue-500 to-transparent mx-auto" />
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
