"use client";

import { Activity, RefreshCw, Layers } from "lucide-react";
import { usePonderStore } from "@/stores/ponderStore";
import { PonderTraceStep } from "@/types/ponder";
import TraceStep from "./TraceStep";

export default function TracePanel() {
  const { 
    documents, 
    chunks, 
    sessionId, 
    searchResults, 
    isEmbedding, 
    vectorStats,
    currentTraceSteps,
    isAgentThinking
  } = usePonderStore();

  const hasDocuments = documents.length > 0;
  const totalChunks = chunks.length;
  const hasEmbeddedDocs = documents.some((d) => d.status === "embedded");
  const isCurrentlyEmbedding = documents.some((d) => d.status === "embedding") || isEmbedding;

  const totalSentencesCount = chunks.reduce(
    (acc, c) => acc + (c.sentenceEnd - c.sentenceStart + 1),
    0
  );

  const shortSessionId = sessionId ? `${sessionId.slice(0, 8)}...` : "IDLE";
  const embeddedChunksCount = vectorStats?.embeddedChunkCount || documents.filter(d => d.status === 'embedded').reduce((acc, d) => acc + d.chunkCount, 0);

  // 1. CHOOSE TRACE STEPS TO DISPLAY
  let traceSteps: PonderTraceStep[] = [];

  // If there are real agentic dialogue traces in progress or completed, show them!
  if (currentTraceSteps.length > 0) {
    traceSteps = currentTraceSteps;
  } else if (isCurrentlyEmbedding) {
    // ACTIVE EMBEDDING LOGS
    traceSteps = [
      {
        id: "step-embed-1",
        type: "planning",
        title: "Document context received",
        detail: `Validating and preparing ${documents.length} context nodes for server ingestion.`,
        duration: "0.1s",
        status: "complete"
      },
      {
        id: "step-embed-2",
        type: "searching",
        title: "Sentence windows generated",
        detail: `Extracted sentence sequences for sliding chunk window index mapping.`,
        duration: "0.2s",
        status: "complete"
      },
      {
        id: "step-embed-3",
        type: "evaluating",
        title: "Generating Gemini embeddings",
        detail: "Calling Vercel AI SDK to compile batch embeddings using text-embedding-004 model...",
        duration: "WAITING",
        status: "active"
      },
      {
        id: "step-embed-4",
        type: "system",
        title: "Vector memory pending",
        detail: "Awaiting embeddings response to update global in-memory singleton database.",
        duration: "--",
        status: "pending"
      },
      {
        id: "step-embed-5",
        type: "complete",
        title: "Retrieval loop locked",
        detail: "Semantic similarity searches are temporarily locked during indexing.",
        duration: "--",
        status: "pending"
      }
    ];
  } else if (hasEmbeddedDocs) {
    // VECTOR INDEX COMPLETED SUCCESS LOGS
    traceSteps = [
      {
        id: "step-ready-1",
        type: "planning",
        title: "Document context received",
        detail: `Processed and validated ${documents.length} active documents under current visitor session.`,
        duration: "0.1s",
        status: "complete"
      },
      {
        id: "step-ready-2",
        type: "searching",
        title: "Sentence windows generated",
        detail: `Parsed and isolated ${totalSentencesCount} sentence segments.`,
        duration: "0.15s",
        status: "complete"
      },
      {
        id: "step-ready-3",
        type: "evaluating",
        title: "Gemini embeddings generated",
        detail: `Vercel AI SDK returned text-embedding-004 vectors for all processed chunks.`,
        duration: "0.55s",
        status: "complete"
      },
      {
        id: "step-ready-4",
        type: "analyzing",
        title: "Vector memory updated",
        detail: `Registered ${embeddedChunksCount} chunks in the serverless global vector store singleton.`,
        duration: "0.05s",
        status: "complete"
      },
      {
        id: "step-ready-5",
        type: "complete",
        title: "Semantic retrieval ready",
        detail: `Cosine similarity vector space is live. Run query tests in the Dialogue cockpit.`,
        duration: "ACTIVE",
        status: "complete"
      }
    ];
  } else {
    // STATIC OR LOCAL CHUNKING STANDBY LOGS (Phase 3 fallback)
    traceSteps = [
      {
        id: "step-local-1",
        type: "planning",
        title: "Context received",
        detail: hasDocuments 
          ? `Ingested ${documents.length} documents. Total size: ${documents.reduce((acc, d) => acc + d.charCount, 0).toLocaleString()} characters.`
          : "Awaiting source document uploads.",
        duration: hasDocuments ? "0.1s" : "--",
        status: hasDocuments ? "complete" : "pending"
      },
      {
        id: "step-local-2",
        type: "searching",
        title: "Sentence windows generated",
        detail: hasDocuments 
          ? `Parsed sentence structures. Isolated ${totalSentencesCount} segments.`
          : "Awaiting context mapping.",
        duration: hasDocuments ? "0.2s" : "--",
        status: hasDocuments ? "complete" : "pending"
      },
      {
        id: "step-local-3",
        type: "analyzing",
        title: "Local chunks prepared",
        detail: hasDocuments 
          ? `Formed sliding windows (4 sentences, 1 overlap). Generated ${totalChunks} chunks.`
          : "Awaiting chunk generation.",
        duration: hasDocuments ? "0.3s" : "--",
        status: hasDocuments ? "complete" : "pending"
      },
      {
        id: "step-local-4",
        type: "evaluating",
        title: "Embedding engine pending",
        detail: "Embeddings connect on embedding request via Vercel AI SDK text-embedding-004 API.",
        duration: "--",
        status: hasDocuments ? "active" : "pending"
      },
      {
        id: "step-local-5",
        type: "complete",
        title: "Agent loop pending",
        detail: "Ready to mount embeddings and connect RAG search pipelines.",
        duration: "--",
        status: "pending"
      }
    ];
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950/40 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden p-5 space-y-4 select-none">
      
      {/* Header and Telemetry */}
      <div className="flex justify-between items-center pb-3 border-b border-white/5 shrink-0">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold block">
            {isAgentThinking ? "// COGNITIVE_REASONING_PULSE" : "// REASONING_TRACE"}
          </span>
          <p className="text-[11px] text-white/50 leading-relaxed font-sans">
            {isAgentThinking ? "Agent actively retrieving, analyzing, and self-evaluating..." : "Transparent agent steps will stream here in real time."}
          </p>
        </div>
        <div className={`flex items-center gap-1.5 font-mono text-[9px] px-2 py-0.5 rounded border transition-all ${
          isAgentThinking
            ? "text-cyan-400 bg-cyan-950/30 border-cyan-400/40 animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.3)]"
            : hasEmbeddedDocs
            ? "text-cyan-400/80 bg-cyan-950/20 border-cyan-400/20 shadow-[0_0_8px_rgba(6,182,212,0.15)]"
            : "text-white/20 bg-zinc-900/10 border-white/5"
        }`}>
          <Activity className={`w-3 h-3 ${isAgentThinking ? "text-cyan-400 animate-spin" : hasDocuments ? "text-cyan-400 animate-pulse" : "text-white/20"}`} />
          <span>{isAgentThinking ? "AGENT_THINKING" : hasEmbeddedDocs ? "OBS_ENG_VECTOR" : hasDocuments ? "OBS_ENG_LOCAL" : "OBS_ENG_SLEEP"}</span>
        </div>
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar pr-1 py-1">
        {!hasDocuments ? (
          /* Locked Visual State */
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
            <Layers className="w-8 h-8 text-white/5" strokeWidth={1.2} />
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest block">
                Awaiting document context
              </span>
              <p className="text-[11px] text-white/35 font-sans leading-relaxed max-w-[240px] mx-auto">
                No active reasoning loops. Ingest context files to trigger initial processing logs.
              </p>
            </div>
          </div>
        ) : (
          /* Dynamic pre-RAG/Vector or dialogue trace steps */
          traceSteps.map((step) => (
            <TraceStep key={step.id} step={step} />
          ))
        )}
      </div>

      {/* Observability Stats HUD block */}
      <div className="border border-white/5 bg-zinc-900/30 rounded-xl p-3 space-y-2 shrink-0">
        <div className="flex justify-between items-center text-[9px] font-mono text-white/30 uppercase">
          <span>VISITOR_SESSION_ID</span>
          <span className="text-cyan-400 font-bold">{shortSessionId}</span>
        </div>
        <div className="flex justify-between items-center text-[9px] font-mono text-white/30 uppercase">
          <span>COGNITIVE_OVERHEAD</span>
          <span>{isAgentThinking ? "AGENT_ACTIVE" : isCurrentlyEmbedding ? "EMBEDDING..." : hasEmbeddedDocs ? "0.9s LATENCY" : "0.6s LOCAL"}</span>
        </div>
        <div className="flex justify-between items-center text-[9px] font-mono text-white/30 uppercase">
          <span>CHUNKS_INDEX_VECTORS</span>
          <span className={hasEmbeddedDocs ? "text-cyan-400 font-bold" : ""}>
            {hasEmbeddedDocs ? `${embeddedChunksCount} EMBEDDED` : `${totalChunks} LOCAL`}
          </span>
        </div>
        
        {/* Dynamic engine status tracking line */}
        <div className="flex justify-between items-center text-[9px] font-mono text-cyan-400/60 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <RefreshCw className={`w-2.5 h-2.5 ${hasDocuments ? "animate-spin" : "opacity-30"}`} />
            ENGINE_STREAM: {isAgentThinking ? "AGENT_REASONING_PIPELINE" : isCurrentlyEmbedding ? "EMBEDDING_API" : hasEmbeddedDocs ? "VECTOR_SEARCH_ACTIVE" : "LOCAL_PARSER"}
          </span>
          <span>{searchResults.length > 0 ? `Q_MATCH_${searchResults.length}` : "V2.5_FL"}</span>
        </div>
      </div>

    </div>
  );
}
