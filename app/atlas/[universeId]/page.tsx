import React from "react";
import { Metadata } from "next";
import { getUniverseMetadata, getUniverseModules, getUniverseStats } from "@/lib/atlas/content";
import { ModuleItem } from "@/components/atlas/ModuleItem";
import { ChevronLeft, FlaskConical, Target, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ universeId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { universeId } = await params;
  const universe = await getUniverseMetadata(universeId);
  
  if (!universe) return { title: "Universe Not Found | Atlas" };
  
  const title = `${universe.title} | Atlas Universe`;
  const description = universe.description.substring(0, 160);
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://tharungajula.com/atlas/${universeId}`,
    }
  };
}

export default async function UniverseOverviewPage({ params }: PageProps) {
  const { universeId } = await params;
  const universe = await getUniverseMetadata(universeId);
  const modules = await getUniverseModules(universeId);
  const stats = await getUniverseStats(universeId);

  if (!universe) notFound();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-1000">
      
      {/* RETURN LINK */}
      <Link href="/atlas" className="inline-flex items-center gap-2 group text-slate-500 hover:text-cyan-400 transition-colors">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest font-black text-slate-600 group-hover:text-cyan-400">Return to Library</span>
      </Link>

      {/* UNIVERSE HEADER */}
      <header className="space-y-6 pt-6">
         <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-400/20 rounded-md font-mono text-[9px] text-cyan-400 uppercase font-black tracking-widest leading-none">
              Foundation: {universeId === "foundations-of-human-health" ? "01" : "xx"}
            </span>
         </div>
         <h1 className="font-heading text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
           {universe.title}
         </h1>
         <p className="font-body text-base md:text-xl text-slate-400 leading-relaxed font-light tracking-wide max-w-3xl">
           {universe.description}
         </p>
      </header>

      {/* METADATA STRIP (Diagnostic Rationale) */}
      <section className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-wrap items-center gap-8 md:gap-12 backdrop-blur-md">
         <div className="flex items-center gap-4">
            <FlaskConical className="w-5 h-5 text-cyan-400 opacity-60" />
            <div>
               <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest font-bold mb-0.5">Classification</p>
               <p className="text-xs font-mono text-white font-black uppercase text-[11px] font-black">{universe.contentType}</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <Target className="w-5 h-5 text-cyan-400 opacity-60" />
            <div>
               <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest font-bold mb-0.5">Modules</p>
               <p className="text-xs font-mono text-white font-black uppercase text-[11px] font-black">
                 {stats.availableCount} Available / {universe.moduleCount} Total
               </p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <Clock className="w-5 h-5 text-cyan-400 opacity-60" />
            <div>
               <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest font-bold mb-0.5">Focus Time</p>
               <p className="text-xs font-mono text-white font-black uppercase text-[11px] font-black">~{stats.totalMinutes} Minutes</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <MessageCircle className="w-5 h-5 text-cyan-400 opacity-60" />
            <div>
               <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest font-bold mb-0.5">Delivery</p>
               <p className="text-xs font-mono text-white font-black uppercase text-[11px] font-black">Deep Study</p>
            </div>
         </div>
      </section>

      {/* MODULE LIST */}
      <section className="space-y-12">
         <div className="flex items-center gap-6">
            <div className="h-px w-24 bg-white/5" />
            <h3 className="font-mono text-[10px] md:text-[11px] text-slate-600 uppercase tracking-[0.4em] font-black">
              Knowledge Sequence
            </h3>
            <div className="h-px flex-1 bg-white/5" />
         </div>

         <div className="grid grid-cols-1 gap-6">
            {modules.length > 0 ? (
              modules.map((module) => (
                <Link key={module.id} href={`/atlas/${universeId}/${module.slug}`}>
                  <ModuleItem module={module} />
                </Link>
              ))
            ) : (
              <div className="bg-slate-900/20 border border-dashed border-white/10 rounded-2xl p-16 text-center">
                 <p className="text-xs font-mono text-slate-600 uppercase tracking-widest leading-relaxed max-w-xs mx-auto">Masterclass modules currently being synthesized. <br/>Check back shortly.</p>
              </div>
            )}
         </div>
      </section>

    </div>
  );
}
