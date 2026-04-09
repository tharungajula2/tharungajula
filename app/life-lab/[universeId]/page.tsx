import React from "react";
import { Metadata } from "next";
import { getUniverseMetadata, getUniverseModules, getUniverseStats } from "@/lib/life-lab/content";
import { ModuleItem } from "@/components/life-lab/ModuleItem";
import { ChevronLeft, FlaskConical, Target, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ universeId: string }>;
}

export async function generateStaticParams() {
  const { getAllUniverseIds } = await import("@/lib/life-lab/content");
  const ids = await getAllUniverseIds();
  return ids.map((universeId) => ({ universeId }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { universeId } = await params;
  const universe = await getUniverseMetadata(universeId);
  
  if (!universe) return { title: "Universe Not Found | Life Lab" };
  
  const title = `${universe.title} | Life Lab`;
  const description = universe.description.substring(0, 160);
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://tharungajula.com/life-lab/${universeId}`,
    }
  };
}

export default async function UniverseOverviewPage({ params }: PageProps) {
  const { universeId } = await params;
  const universe = await getUniverseMetadata(universeId);
  const modules = await getUniverseModules(universeId);
  const stats = await getUniverseStats(universeId);

  if (!universe) notFound();

  const isLive = universe.status === "live";
  const isLocked = universe.status === "locked";
  const isPlanned = universe.status === "planned";

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-2 duration-1000 pb-32">
      
      {/* RETURN LINK */}
      <Link href="/life-lab" className="inline-flex items-center gap-2 group text-slate-500 hover:text-cyan-400 transition-colors">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest font-black text-slate-600 group-hover:text-cyan-400">Return to Library</span>
      </Link>

      {/* UNIVERSE HEADER & CHARTER */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-6">
        <div className="lg:col-span-2 space-y-8">
           <div className="flex items-center gap-3">
              <span className={cn(
                "px-2.5 py-0.5 rounded-md font-mono text-[9px] uppercase font-black tracking-widest leading-none border",
                isLive && "bg-cyan-500/10 border-cyan-400/20 text-cyan-400",
                isLocked && "bg-amber-500/10 border-amber-400/20 text-amber-400",
                isPlanned && "bg-slate-500/10 border-slate-400/20 text-slate-500"
              )}>
                Universe {String(universe.order).padStart(2, '0')} // {universe.status}
              </span>
           </div>
           
           <h1 className={cn(
             "font-heading text-4xl md:text-7xl font-extrabold tracking-tight leading-tight",
             isLive ? "text-white" : "text-slate-200"
           )}>
             {universe.title}
           </h1>
           
           <p className="font-body text-base md:text-xl text-slate-400 leading-relaxed font-light tracking-wide max-w-3xl italic">
             {universe.description}
           </p>

           {/* CHARTER BLOCK */}
           <div className="p-8 bg-slate-900/40 border border-white/5 rounded-3xl space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Target className="w-24 h-24 text-white" />
               </div>
               <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-500/60 font-black">Universe Charter</h3>
               <div className="space-y-4 text-slate-300 font-light leading-loose text-sm md:text-base max-w-2xl">
                 <div className="flex flex-wrap gap-4 mb-4">
                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] uppercase tracking-widest text-slate-500">
                       Mode: {universe.learningMode}
                    </div>
                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] uppercase tracking-widest text-slate-500">
                       Style: {universe.contentStyle.replace('_', ' ')}
                    </div>
                 </div>
                 
                 <p className="text-white font-medium italic opacity-90 border-l-2 border-cyan-400/30 pl-4 py-1">
                    {universe.charterSummary}
                 </p>

                 <p>
                    {isLive 
                      ? universe.moduleCount > 0 
                        ? "This curriculum is currently live and evolving. Each module represents a synthesis of clinical literature and systemic reasoning."
                        : "This universe is currently open and growing. I am currently synthesizing the first foundational modules for this archive."
                      : universe.futureIntent}
                 </p>

                 {!isLive && universe.teaserTopics.length > 0 && (
                   <div className="pt-4 space-y-3">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-slate-600 font-bold">Planned Curriculum Teasers:</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                         {universe.teaserTopics.map((topic, i) => (
                           <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/20" />
                              {topic}
                           </li>
                         ))}
                      </ul>
                   </div>
                 )}
               </div>
           </div>
        </div>

        {/* SIDEBAR: STATS & ACTION */}
        <div className="space-y-8">
           <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-8 space-y-8 backdrop-blur-md">
              <div className="space-y-6">
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
                         {isLive ? (
                            universe.id === "wellness" ? "Active Buildout" :
                            universe.id === "cognition" ? "Foundation Buildout" :
                            universe.id === "reasoning" ? "Practice Buildout" :
                            universe.id === "human-ecosystem" ? "Foundational Entries" :
                            universe.id === "sandbox" ? "Open Buffer" : 
                            "Growing Archive"
                          ) : "Scheduled"} / {universe.moduleCount || "XX"} Total
                       </p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-cyan-400 opacity-60" />
                    <div>
                       <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest font-bold mb-0.5">Universe Status</p>
                       <p className="text-xs font-mono text-white font-black uppercase text-[11px] font-black">
                          {universe.id === "wellness" && "flagship core"}
                          {universe.id === "cognition" && "parallel backbone"}
                          {universe.id === "reasoning" && "practice wing"}
                          {universe.id === "human-ecosystem" && "architecture wing"}
                          {universe.id === "sandbox" && "mystery box"}
                       </p>
                    </div>
                 </div>
              </div>

              {!isLive && (
                <div className="pt-8 border-t border-white/5">
                   <div className={cn(
                     "p-4 rounded-xl text-center space-y-2",
                     isLocked ? "bg-amber-500/5 border border-amber-500/10" : "bg-white/5 border border-white/10"
                   )}>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500 font-black">Current Status</p>
                      <p className={cn(
                         "font-heading text-lg font-black uppercase tracking-tighter",
                         isLocked ? "text-amber-500" : "text-slate-400"
                       )}>
                        {isLocked ? "Access Locked" : "Planned Core"}
                      </p>
                   </div>
                </div>
              )}
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

         {isLive ? (
           <div className="grid grid-cols-1 gap-6">
              {modules.length > 0 ? (
                modules.map((module) => (
                  <Link key={module.id} href={`/life-lab/${universeId}/${module.slug}`}>
                    <ModuleItem module={module} />
                  </Link>
                ))
              ) : (
                <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-20 text-center space-y-8">
                   <div className="max-w-xl mx-auto space-y-4">
                      <h4 className="text-white font-heading text-2xl font-black italic tracking-tight">
                        {universe.id === "wellness" && "Active Buildout"}
                        {universe.id === "cognition" && "Backbone Buildout"}
                        {universe.id === "reasoning" && "Practice Buildout"}
                        {universe.id === "human-ecosystem" && "Architecture Buildout"}
                        {universe.id === "sandbox" && "Buffer Box"}
                      </h4>
                      <p className="text-slate-500 font-body text-base leading-relaxed">
                        {universe.id === "wellness" && "The Wellness universe is the first major buildout of Life Lab. Core modules are being assembled into a long-term archive for everyday health understanding."}
                        {universe.id === "cognition" && "Cognition is being built as the inner operating manual of Life Lab: how to learn, judge, explain, and update more clearly."}
                        {universe.id === "reasoning" && "Reasoning turns clear thinking into repeated reps. The goal here is not textbook coverage, but sharper judgment through structured practice."}
                        {universe.id === "human-ecosystem" && "Human Ecosystem is being shaped as the social-systems layer of Life Lab, with a focus on usable judgment."}
                        {universe.id === "sandbox" && "Sandbox is not a prepared archive. It is the magic-box layer of Life Lab: a place for off-script curiosity, low-pressure experiments, and creative recovery."}
                      </p>
                   </div>
                   <div className="inline-block px-6 py-2 bg-cyan-400/5 border border-cyan-400/10 rounded-full">
                      <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-cyan-400/60 font-black">
                        {universe.id === "sandbox" ? "Open Mystery Box" : "Synthesis in Progress"}
                      </span>
                   </div>
                </div>
              )}
           </div>
         ) : (
           <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-20 text-center space-y-8">
              <div className="max-w-md mx-auto space-y-4">
                 <h4 className="text-white font-heading text-2xl font-black italic tracking-tight">Access restricted for this sector.</h4>
                 <p className="text-slate-500 font-body text-sm leading-relaxed">
                    The {universe.title} universe is part of the long-term Life Lab roadmap. 
                    Full clinical ingestion and sequence validation are currently underway.
                 </p>
              </div>
              <div className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full">
                 <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-slate-400 font-black">Deployment Phase: {isLocked ? "Synthesis" : "Conceptual"}</span>
              </div>
           </div>
         )}
      </section>

    </div>
  );
}
