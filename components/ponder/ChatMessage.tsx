"use client";

import { useState } from "react";
import { MessageSquare, Check, Sparkles, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { PonderChatMessage, PonderCitation } from "@/types/ponder";
import ConfidenceBar from "./ConfidenceBar";

interface ChatMessageProps {
  message: PonderChatMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const { role, content, citations, confidence } = message;
  const isUser = role === "user";
  const [expandedCitation, setExpandedCitation] = useState<string | null>(null);

  // Parse [1], [2], etc. inside text and format them as interactive HUD badges
  const formatContentWithCitations = (text: string) => {
    const segments = text.split(/(\[\d+\])/g);
    return segments.map((seg, idx) => {
      const match = seg.match(/^\[(\d+)\]$/);
      if (match) {
        const markerId = seg;
        // Verify if this citation actually exists in the registered citations
        const exists = citations?.some((c) => c.marker === markerId);
        
        if (exists) {
          return (
            <button
              key={idx}
              onClick={() => {
                // Clicking an inline badge toggles the expandable block below the message!
                setExpandedCitation(expandedCitation === markerId ? null : markerId);
              }}
              className="inline-flex items-center justify-center text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-400/30 px-1.5 py-0.2 rounded hover:bg-cyan-900/60 transition-colors mx-0.5 shadow-[0_0_8px_rgba(6,182,212,0.1)] active:scale-95"
              title="Click to view retrieved chunk evidence"
            >
              {seg}
            </button>
          );
        }
      }
      return <span key={idx} className="font-sans leading-relaxed text-sm">{seg}</span>;
    });
  };

  return (
    <div className="space-y-3.5">
      
      {/* Sender Title Header */}
      <div className={`flex items-center gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
        <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
          {isUser ? "// SYSTEM_VISITOR" : "// PONDER_AGENT"}
        </span>
      </div>

      {/* Main Bubble card */}
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div 
          className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 leading-relaxed border relative overflow-hidden ${
            isUser
              ? "bg-cyan-950/20 border-cyan-400/20 text-cyan-100 rounded-tr-sm"
              : "bg-zinc-950/70 border-white/5 text-white/80 rounded-tl-sm shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          }`}
        >
          <div className="absolute left-0 top-0 w-32 h-32 rounded-full bg-cyan-400/5 blur-2xl pointer-events-none" />
          <div className="relative z-10 whitespace-pre-wrap select-text selection:bg-cyan-550/30">
            {formatContentWithCitations(content)}
          </div>

          {/* Expandable Citations Registry (underneath assistant bubbles) */}
          {!isUser && citations && citations.length > 0 && (
            <div className="mt-4 pt-3.5 border-t border-white/5 relative z-10 space-y-2">
              <div className="flex justify-between items-center text-[9px] font-mono text-white/30 uppercase tracking-wider">
                <span>CITED_EVIDENCE_CONTEXT</span>
                <span>(Click to inspect source chunks)</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {citations.map((cite) => {
                  const isSelected = expandedCitation === cite.marker;
                  return (
                    <button
                      key={cite.id}
                      onClick={() => setExpandedCitation(isSelected ? null : cite.marker)}
                      className={`inline-flex items-center gap-1.5 text-[9px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                        isSelected
                          ? "text-cyan-400 bg-cyan-950/40 border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                          : "text-white/40 bg-zinc-900/10 border-white/5 hover:text-white/60 hover:border-white/10"
                      }`}
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>{cite.marker} {cite.documentTitle.slice(0, 15)}...</span>
                      {isSelected ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                    </button>
                  );
                })}
              </div>

              {/* Collapsible details snippet drawer */}
              {citations.map((cite) => {
                if (expandedCitation !== cite.marker) return null;
                return (
                  <div 
                    key={`detail-${cite.id}`}
                    className="bg-black/60 border border-cyan-400/15 rounded-xl p-3 mt-2 space-y-2 animate-fadeIn relative overflow-hidden"
                  >
                    <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-cyan-400/5 blur-xl pointer-events-none" />
                    <div className="flex justify-between items-center text-[9px] font-mono text-cyan-400/60 font-bold uppercase">
                      <span>Source: {cite.documentTitle} · Chunk #{cite.chunkIndex}</span>
                      {cite.score && (
                        <span>{(cite.score * 100).toFixed(1)}% Cosine Match</span>
                      )}
                    </div>
                    <p className="text-[10px] sm:text-xs text-white/70 leading-relaxed font-mono whitespace-pre-wrap selection:bg-cyan-950">
                      {cite.content}
                    </p>
                  </div>
                );
              })}

            </div>
          )}

          {/* Citation validation warning overlay */}
          {!isUser && (!citations || citations.length === 0) && (
            <div className="mt-3.5 pt-3 border-t border-red-500/10 text-[9px] font-mono text-amber-400/60 uppercase">
              No citations returned. Treat this answer as unverified.
            </div>
          )}
        </div>
      </div>

      {/* Embed Confidence Bar Score below Assistant Bubble */}
      {!isUser && confidence && (
        <div className="mt-2 pl-2">
          <ConfidenceBar confidence={confidence} />
        </div>
      )}

    </div>
  );
}
