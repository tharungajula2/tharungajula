import { ArrowLeft, Rocket } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export const metadata = {
    title: "Curiosity OS Portal | Tharun Learning Lab"
};

export default function MapPage() {
    return (
        <main className="min-h-screen bg-slate-950 flex flex-col">
            <Navbar />

            <section className="flex-1 flex flex-col w-full px-6 pt-32 pb-12 md:px-12 relative z-10">
                <div className="container mx-auto max-w-4xl w-full h-full flex flex-col items-center justify-center min-h-[60vh]">

                    {/* NAV & HEADER */}
                    <div className="mb-12 self-start shrink-0 w-full">
                        <Link href="/" className="inline-flex items-center gap-2 font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500 transition-colors hover:text-cyan-400 mb-6">
                            <ArrowLeft className="h-4 w-4" /> RETURN_TO_LAB
                        </Link>

                        <div className="space-y-2">
                            <span className="flex items-center gap-3 font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
                                // SYSTEM_OS {'>'} CURIOSITY_PORTAL [STANDBY]
                            </span>
                        </div>
                    </div>

                    {/* PORTAL PREVIEW CARD */}
                    <div className="flex flex-col gap-10 text-slate-300 font-body pb-12 w-full text-center">
                        <div className="flex flex-col gap-4">
                            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 mb-2 focus-in-expand">
                                ENTER CURIOSITY OS
                            </h1>
                            <p className="font-mono text-slate-400 text-sm md:text-base mt-2 leading-relaxed max-w-2xl mx-auto">
                                The interactive 3D universe mapping life's possibilities for students in India. This is the living, daily-updated cognitive engine.
                            </p>
                        </div>

                        {/* MASSIVE GLOWING WINDOW */}
                        <div className="mt-8 relative group w-full max-w-2xl mx-auto">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative flex flex-col items-center justify-center p-16 md:p-24 bg-slate-900/50 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden min-h-[300px]">
                                {/* Grid inside the window */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                                
                                <a href="https://curiosity-os.vercel.app/" target="_blank" rel="noopener noreferrer" className="relative z-10 flex items-center justify-center gap-3 px-8 py-4 bg-white border border-white/20 text-slate-950 font-mono font-bold uppercase tracking-widest text-xs md:text-sm rounded-full hover:scale-105 hover:bg-cyan-400 hover:border-cyan-300 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]">
                                    <Rocket className="h-4 w-4 md:h-5 md:w-5" />
                                    INITIALIZE ECOSYSTEM -{'>'}
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </main>
    );
}
