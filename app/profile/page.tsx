import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export const metadata = {
    title: "Profile | Tharun Learning Lab"
};

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-transparent flex flex-col">
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
                                // THARUN_LEARNING_LAB {'>'} USER_PROFILE [ACTIVE]
                            </span>
                        </div>
                    </div>

                    {/* PROFILE CONTENT */}
                    <div className="flex flex-col gap-8 text-slate-300 font-body text-sm leading-relaxed pb-12">
                        {/* Header Area */}
                        <div className="flex flex-col gap-2 border-b border-white/10 pb-8">
                            <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 mb-2">
                                Tharun Gajula // Learning Systems Builder
                            </h1>
                            <div className="font-mono text-cyan-400 text-xs md:text-sm flex flex-wrap gap-2 md:gap-4 mt-2">
                                <span>Bengaluru, India</span>
                                <span className="hidden md:inline">||</span>
                                <span>+91-9110572145</span>
                                <span className="hidden md:inline">||</span>
                                <a href="mailto:tharun.gajula.2@gmail.com" className="hover:text-white transition-colors">tharun.gajula.2@gmail.com</a>
                            </div>

                            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                                <h3 className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-3">
                                    THE MANIFESTO
                                </h3>
                                <p className="text-slate-300 leading-relaxed">
                                    I build learning systems for the AI era — where understanding matters more than memorization, and tools amplify thought instead of replacing it. Tharun Learning Lab is my public workspace for experiments in curriculum, cognition, AI workflows, and modern self-education.
                                </p>
                            </div>
                        </div>

                        {/* CORE CAPABILITIES */}
                        <div className="flex flex-col gap-6">
                            <h3 className="font-mono text-cyan-400 text-xs tracking-widest uppercase border-b border-white/10 pb-2">
                                CORE CAPABILITIES
                            </h3>

                            <div className="flex flex-col gap-4 text-slate-300">
                                <div>
                                    <span className="text-white font-semibold">Learning System Design:</span>
                                    <p className="mt-1">Curriculum architecture, concept sequencing, deep-learning frameworks.</p>
                                </div>
                                <div>
                                    <span className="text-white font-semibold">AI-Native Workflows:</span>
                                    <p className="mt-1">Prompting, tool use, knowledge pipelines, human-AI collaboration.</p>
                                </div>
                                <div>
                                    <span className="text-white font-semibold">Thinking Tools:</span>
                                    <p className="mt-1">First principles, systems thinking, estimation, clarity frameworks.</p>
                                </div>
                                <div>
                                    <span className="text-white font-semibold">Public Build Practice:</span>
                                    <p className="mt-1">Rapid prototyping, documentation, iteration, and content-led experimentation.</p>
                                </div>
                            </div>
                        </div>

                        {/* CURRENT FOCUS */}
                        <div className="flex flex-col gap-6 mt-4">
                            <h3 className="font-mono text-cyan-400 text-xs tracking-widest uppercase border-b border-white/10 pb-2">
                                CURRENT FOCUS
                            </h3>
                            <p className="text-slate-300 leading-relaxed italic">
                                "Designing and documenting next-generation learning experiences through Tharun Learning Lab."
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
