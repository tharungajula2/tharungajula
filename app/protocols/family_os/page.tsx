"use client";
// Force Rebuild for Metadata Sync

import { motion } from "framer-motion";
import {
    ArrowLeft,
    LayoutTemplate,
    Sparkles,
    Database,
    Truck,
    Activity,
    Armchair,
    Siren,
    Shield,
    ShieldCheck,
    Wind,
    Droplet,
    Sun,
    WifiOff,
    VolumeX,
    Layers
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export default function ProtocolFamilyOSPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-x-hidden relative">
            <Navbar />

            {/* AMBIENT BACKGROUND GLOW */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full blur-3xl opacity-20 pointer-events-none bg-orange-500" />

            <div className="relative z-10 container mx-auto max-w-5xl px-6 md:px-12 pt-32 pb-24">

                {/* NAV BACK */}
                <Link href="/#protocols" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white mb-12">
                    <ArrowLeft className="h-4 w-4" /> RETURN_TO_PROTOCOLS
                </Link>

                {/* HERO HEADER - FORTRESS ARCHITECTURE */}
                <div className="flex flex-col items-center text-center space-y-8 mb-24">
                    {/* GLASS ICON BOX */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 text-orange-500">
                        <Shield className="h-24 w-24 md:h-32 md:w-32" strokeWidth={1} />
                    </div>

                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center justify-center gap-3">
                            <span className="font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-current bg-black/50 backdrop-blur-md text-orange-500">
                                STATUS: CONCEPT_PHASE
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight">
                            Protocol <span className="text-orange-500">FAMILY</span>
                        </h1>

                        <h2 className="text-2xl md:text-3xl font-light text-zinc-200">
                            The Unified Fortress Architecture.
                        </h2>

                        <p className="font-body text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                            Integrating High-Reliability Operations (Logistics/Crisis) with Environmental Engineering (Air/Water) to create a sovereign sanctuary for the Indian Family.
                        </p>
                    </div>
                </div>

            </div>

            {/* SECTION 2: THE FORTRESS GRID (12 Vectors) */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 text-center">
                        <div className="h-px w-12 bg-orange-500/50 hidden md:block" />
                        <h2 className="font-mono text-xs tracking-[0.2em] text-orange-500 uppercase">
                            RESEARCH_AREAS // EXPLORATION_VECTORS
                        </h2>
                        <div className="h-px w-12 bg-orange-500/50 hidden md:block" />
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">

                        {/* --- ROW 1 & 2: OPERATIONS --- */}

                        {/* VECTOR 1: INTELLIGENCE */}
                        <Card
                            title="The Context Engine"
                            icon={<Database className="h-5 w-5" />}
                            layer="INTELLIGENCE"
                            description="Eliminating 'Context Blindness.' Centralizing medical history and prescriptions so no data is ever lost."
                            tags={["Single Source of Truth", "ABHA ID"]}
                            delay={0.1}
                        />

                        {/* VECTOR 2: LOGISTICS */}
                        <Card
                            title="Supply Chain Ops"
                            icon={<Truck className="h-5 w-5" />}
                            layer="LOGISTICS"
                            description="Treating the home like a forward base. Ensuring critical medicines are immune to city logistics failures."
                            tags={["Zero Stock-Outs", "Cold Chain"]}
                            delay={0.2}
                        />

                        {/* VECTOR 3: FOUNDATIONAL */}
                        <Card
                            title="Growth & Metabolic"
                            icon={<Activity className="h-5 w-5" />}
                            layer="FOUNDATIONAL"
                            description="Managing the building blocks. From pediatric immunity protocols to adult metabolic defense."
                            tags={["Pediatric Triage", "Metabolic Defense"]}
                            delay={0.3}
                        />

                        {/* VECTOR 4: GERIATRIC */}
                        <Card
                            title="Geriatric Resilience"
                            icon={<Armchair className="h-5 w-5" />}
                            layer="GERIATRIC"
                            description="A dedicated OS for aging. Managing multi-morbidity and mobility to allow 'aging in place' with dignity."
                            tags={["Frailty Index", "Fall Prevention"]}
                            delay={0.4}
                        />

                        {/* VECTOR 5: RESPONSE */}
                        <Card
                            title="Crisis Architecture"
                            icon={<Siren className="h-5 w-5" />}
                            layer="RESPONSE"
                            description="Removing panic. Pre-computed decision trees for strokes and trauma to ensure rapid action."
                            tags={["The Golden Hour", "Triage Matrix"]}
                            delay={0.5}
                        />

                        {/* VECTOR 6: FIDUCIARY */}
                        <Card
                            title="Risk & Governance"
                            icon={<ShieldCheck className="h-5 w-5" />}
                            layer="FIDUCIARY"
                            description="The fiduciary layer. Optimizing insurance claims and verifying doctor credentials."
                            tags={["Insurance Defense", "Credential Audit"]}
                            delay={0.6}
                        />


                        {/* --- ROW 3 & 4: ENVIRONMENTAL (FORTRESS) --- */}

                        {/* VECTOR 7: ATMOSPHERIC */}
                        <Card
                            title="Air Defense"
                            icon={<Wind className="h-5 w-5" />}
                            layer="ATMOSPHERIC"
                            description="The invisible shield. Pressurizing the home to reject city smog, allergens, and airborne toxins."
                            tags={["PM2.5 Filtration", "CO2 Management"]}
                            delay={0.7}
                        />

                        {/* VECTOR 8: HYDROLOGICAL */}
                        <Card
                            title="Water Security"
                            icon={<Droplet className="h-5 w-5" />}
                            layer="HYDROLOGICAL"
                            description="Restoring the source. Removing industrial contaminants (PFAS/Chlorine) while retaining essential minerals."
                            tags={["RO Remineralization", "Toxin Stripping"]}
                            delay={0.8}
                        />

                        {/* VECTOR 9: PHOTONIC */}
                        <Card
                            title="Circadian Rhythm"
                            icon={<Sun className="h-5 w-5" />}
                            layer="PHOTONIC"
                            description="Light as medicine. Managing the home's spectrum to support deep sleep cycles and morning alertness."
                            tags={["Sleep Hygiene", "Zero-Blue Night"]}
                            delay={0.9}
                        />

                        {/* VECTOR 10: ELECTROMAGNETIC */}
                        <Card
                            title="Digital Silence"
                            icon={<WifiOff className="h-5 w-5" />}
                            layer="ELECTROMAGNETIC"
                            description="The recovery zone. Reducing invisible wireless noise to allow the nervous system to truly rest."
                            tags={["Hardwired", "Reduced EMF"]}
                            delay={1.0}
                        />

                        {/* VECTOR 11: SONIC */}
                        <Card
                            title="Acoustic Shield"
                            icon={<VolumeX className="h-5 w-5" />}
                            layer="SONIC"
                            description="Blocking the city rumble. Using acoustic damping to protect sleep architecture from urban noise."
                            tags={["Noise Reduction", "Deep Sleep"]}
                            delay={1.1}
                        />

                        {/* VECTOR 12: MATERIAL */}
                        <Card
                            title="Chemical Safety"
                            icon={<Layers className="h-5 w-5" />}
                            layer="MATERIAL"
                            description="The third skin. Eliminating VOCs and harsh chemicals from the surfaces we touch and breathe."
                            tags={["Low-Tox", "Natural Materials"]}
                            delay={1.2}
                        />

                    </div>

                    {/* LAB NOTE DISCLAIMER */}
                    <div className="flex justify-center mt-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-500/20 bg-orange-500/5 backdrop-blur-sm max-w-2xl text-center">
                            <span className="font-mono text-[10px] md:text-xs font-medium text-zinc-400">
                                NOTE: These vectors represent the current scope of exploration. This architecture is not static; it evolves continuously as new data is assimilated.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: EVOLVING FOOTER */}
            <section className="py-32 px-6 text-center border-t border-white/5 bg-white/[0.02]">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="flex justify-center mb-6 text-orange-500">
                            <Sparkles className="h-6 w-6 animate-pulse" />
                        </div>
                        <p className="font-mono text-xs tracking-[0.3em] text-orange-500 uppercase">
                            // MISSION_OBJECTIVE
                        </p>
                        <h3 className="font-heading text-2xl md:text-4xl font-bold text-white leading-tight">
                            "To engineer the <span className="text-orange-500">Fortress Architecture</span> required to protect <br className="hidden md:block" />
                            <span className="text-emerald-500">Protocol N=1</span> and sustain <span className="text-sky-500">Protocol Learn</span>."
                        </h3>
                        <div className="pt-8">
                            <div className="h-16 w-px bg-gradient-to-b from-orange-500 to-transparent mx-auto" />
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

// Reusable Card Component to keep code clean
function Card({ title, icon, layer, description, tags, delay }: { title: string, icon: any, layer: string, description: string, tags: string[], delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay }}
            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-orange-500/40 md:hover:shadow-[0_0_20px_rgba(249,115,22,0.05)] active:scale-[0.98] active:border-orange-500/40 active:bg-orange-900/5 flex flex-col h-full"
        >
            <div className="flex justify-between items-start mb-6">
                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-orange-400 active:text-orange-400 transition-colors">
                    {title}
                </h3>
                <div className="text-orange-500/50 md:group-hover:text-orange-500 active:text-orange-500 transition-colors">
                    {icon}
                </div>
            </div>

            <div className="mb-6 flex items-center gap-2 text-orange-500">
                <div className="h-px w-8 bg-orange-500/50" />
                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-orange-500/70 active:text-orange-500/70 transition-colors">
                    {layer}_LAYER
                </h4>
            </div>

            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed flex-grow">
                {description}
            </p>

            <div className="space-y-3 pt-6 border-t border-white/5 mt-auto">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
