"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, ArrowRight, CornerDownLeft, Lock, Sparkles, FileSearch, Search, Database, RefreshCw, X, AlertTriangle } from "lucide-react";
import { usePonderStore } from "@/stores/ponderStore";
import ChatMessage from "./ChatMessage";

const STARTER_PROMPTS = [
  "Summarize key themes",
  "Find contradictions",
  "Compare documents",
  "What is missing?",
];

export default function ChatPanel() {
  const { 
    documents, 
    chunks,
    isSearching,
    searchResults,
    searchError,
    searchQuery,
    setSearchQuery,
    runSemanticSearch,
    clearSearchResults,
    clearSearchError,

    // Live agent store variables
    chatMessages,
    isAgentThinking,
    agentError,
    askPonder,
    resetConversation,
    clearAgentError
  } = usePonderStore();

  const [question, setQuestion] = useState("");
  const [showSearchTest, setShowSearchTest] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasDocuments = documents.length > 0;
  const totalChunksCount = chunks.length;
  const hasEmbeddedDocs = documents.some((d) => d.status === "embedded");

  // Keep dialog scrolled to latest interaction bubble
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isAgentThinking]);

  // Semantic query test trigger
  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !hasEmbeddedDocs || isSearching) return;
    runSemanticSearch(searchQuery);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!searchQuery.trim() || !hasEmbeddedDocs || isSearching) return;
      runSemanticSearch(searchQuery);
    }
  };

  // Live dialogue submit handlers
  const handleSend = async (textToSend: string) => {
    const val = textToSend.trim();
    if (!val || isAgentThinking || !hasEmbeddedDocs) return;
    
    setQuestion("");
    await askPonder(val);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(question);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/40 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden p-5 space-y-4 select-none">
      
      {/* Title block */}
      <div className="flex justify-between items-center shrink-0 pb-3 border-b border-white/5">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold block">
            // AGENT_DIALOGUE
          </span>
          <p className="text-[11px] text-white/50 font-sans">
            Cognitive execution workspace and agent reasoning console.
          </p>
        </div>
        
        {/* Connection status dot */}
        <div className="flex items-center gap-2">
          {chatMessages.length > 0 && (
            <button
              onClick={resetConversation}
              className="text-[9px] font-mono text-white/30 hover:text-cyan-400 border border-white/5 bg-zinc-900/10 px-2 py-0.5 rounded transition-all hover:border-cyan-400/20"
              title="Clear active dialogue feed"
            >
              RESET_FEED
            </button>
          )}
          <div className={`w-2.5 h-2.5 rounded-full transition-colors ${
            isAgentThinking
              ? "bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              : hasEmbeddedDocs 
              ? "bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
              : "bg-white/10"
          }`} />
        </div>
      </div>

      {/* Lock status or ready telemetry */}
      {!hasDocuments ? (
        <div className="border border-white/5 bg-zinc-900/10 rounded-xl p-3 flex gap-3 shrink-0 items-start">
          <Lock className="w-4 h-4 text-white/20 mt-0.5 shrink-0" strokeWidth={1.5} />
          <div className="space-y-0.5">
            <h4 className="text-xs font-mono font-bold text-white/40 uppercase tracking-wide">
              Dialogue Interface Locked
            </h4>
            <p className="text-[10px] text-white/30 leading-relaxed font-mono uppercase">
              Add document context first to unlock the agent dialogue.
            </p>
          </div>
        </div>
      ) : !hasEmbeddedDocs ? (
        <div className="border border-amber-500/15 bg-amber-950/5 rounded-xl p-3 flex gap-3 shrink-0 items-start">
          <AlertTriangle className="w-4 h-4 text-amber-450 animate-pulse mt-0.5 shrink-0" strokeWidth={1.5} />
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold text-white/80 uppercase tracking-wide">
              Embeddings Missing
            </h4>
            <p className="text-[10px] text-white/50 leading-relaxed font-mono uppercase">
              Local context parsed ({documents.length} files). Please click &quot;EMBED_ALL_CONTEXT&quot; in the documents panel to unlock the live agent.
            </p>
          </div>
        </div>
      ) : (
        <div className="border border-cyan-400/10 bg-cyan-950/5 rounded-xl p-3 flex gap-3 shrink-0 items-start justify-between">
          <div className="flex gap-3 items-start">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse mt-0.5 shrink-0" strokeWidth={1.5} />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-mono font-bold text-white/80 uppercase tracking-wide">
                  Cognitive Memory Active
                </h4>
                <span className="text-[8px] font-mono text-cyan-400/60 bg-cyan-950/40 border border-cyan-400/10 px-1.5 py-0.2 rounded uppercase">
                  READY
                </span>
              </div>
              <p className="text-[10px] text-white/50 leading-relaxed font-mono uppercase">
                Ask a question about the uploaded document content below.
              </p>
            </div>
          </div>
          
          {/* Collapsible Semantic Test Cockpit Link */}
          <button 
            onClick={() => setShowSearchTest(!showSearchTest)}
            className="text-[9px] font-mono text-cyan-400/60 hover:text-cyan-400 border border-cyan-400/20 bg-cyan-950/30 px-2.5 py-1 rounded-lg uppercase tracking-wide hover:shadow-[0_0_8px_rgba(6,182,212,0.1)] transition-all shrink-0"
          >
            {showSearchTest ? "HIDE_VECTOR_TEST" : "TEST_VECTORS"}
          </button>
        </div>
      )}

      {/* Expandable Semantic Search Test Cockpit */}
      {hasEmbeddedDocs && showSearchTest && (
        <div className="border border-cyan-500/15 bg-cyan-950/5 rounded-xl p-3.5 space-y-3 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.02)] animate-slideDown">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-mono tracking-widest text-cyan-400 font-bold flex items-center gap-1.5 uppercase">
              <Database className="w-3.5 h-3.5" />
              // SEMANTIC_RETRIEVAL_TEST
            </span>
            {searchResults.length > 0 && (
              <button 
                onClick={clearSearchResults}
                className="text-[9px] font-mono text-white/40 hover:text-white/70 flex items-center gap-1"
              >
                <X className="w-2.5 h-2.5" />
                <span>CLEAR_TEST</span>
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-white/20" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  placeholder="Type query to test cosine similarity search..."
                  className="w-full bg-black/60 border border-white/5 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-white/20 outline-none focus:border-cyan-400/30 transition-all font-sans"
                />
              </div>
              <button
                onClick={handleSearchClick}
                disabled={isSearching || !searchQuery.trim()}
                className={`px-3.5 rounded-lg font-mono text-[9px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 border shrink-0 ${
                  searchQuery.trim() && !isSearching
                    ? "bg-cyan-950 border-cyan-400/30 text-cyan-400 hover:bg-cyan-900/30"
                    : "bg-white/5 border-transparent text-white/20 cursor-not-allowed"
                }`}
              >
                {isSearching ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
                <span>SEARCH_MEMORY</span>
              </button>
            </div>

            {searchError && (
              <div className="text-[10px] font-mono text-red-400/80 bg-red-950/20 border border-red-500/20 rounded p-2">
                Search error: {searchError}
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-[140px] overflow-y-auto no-scrollbar pt-1">
                {searchResults.map((result, idx) => (
                  <div 
                    key={idx}
                    className="bg-black/40 border border-white/5 rounded-lg p-2.5 space-y-1.5 relative overflow-hidden"
                  >
                    <div className="flex justify-between items-center text-[9px] font-mono">
                      <span className="text-cyan-400 font-bold">
                        {(result.score * 100).toFixed(1)}% MATCH
                      </span>
                      <span className="text-white/40 truncate max-w-[180px]">
                        {result.documentTitle} · Chunk #{result.chunkIndex}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/60 leading-relaxed font-mono uppercase bg-zinc-950/40 p-1.5 rounded border border-white/5 overflow-hidden text-ellipsis whitespace-normal break-words line-clamp-2">
                      {result.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-5 no-scrollbar pr-1 py-1">
        {!hasDocuments ? (
          /* Locked visual state */
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6 max-w-md mx-auto my-auto select-none">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-zinc-950/40 relative shadow-[0_0_15px_rgba(255,255,255,0.02)]">
              <Lock className="w-5 h-5 text-white/30" strokeWidth={1.5} />
            </div>
            
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-cyan-400 font-bold bg-cyan-950/40 border border-cyan-400/20 px-2 py-0.5 rounded uppercase tracking-[0.2em] inline-block animate-pulse">
                RESEARCH WORKSPACE LOCKED
              </span>
              <p className="text-[11px] text-white/50 font-sans leading-relaxed">
                Add a <code className="text-cyan-350 bg-cyan-950/30 px-1 py-0.5 rounded font-mono">.txt</code> or <code className="text-cyan-350 bg-cyan-950/30 px-1 py-0.5 rounded font-mono">.md</code> document on the left. Once embedded, Ponder will search your context, reason over retrieved evidence, cite source chunks, and score its own answer.
              </p>
            </div>

            {/* Feature preview checklist */}
            <div className="w-full bg-zinc-950/30 border border-white/5 rounded-xl p-4 text-left space-y-2.5">
              <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase block border-b border-white/5 pb-1.5">
                // SYSTEM_HUD_PIPELINE_PREVIEW
              </span>
              <ul className="space-y-2 text-[10px] font-mono text-white/60">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 shrink-0" />
                  <span>Retrieval trace</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 shrink-0" />
                  <span>Citation drawers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 shrink-0" />
                  <span>Faithfulness / relevance / completeness scores</span>
                </li>
              </ul>
            </div>
          </div>
        ) : chatMessages.length === 0 ? (
          /* Welcome screen when documents are loaded but no chat has started */
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
            <MessageSquare className="w-8 h-8 text-cyan-400/20 animate-pulse" strokeWidth={1.2} />
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-cyan-400/40 uppercase tracking-widest block">
                Ponder Agent Initialized
              </span>
              <p className="text-[11px] text-white/35 font-sans leading-relaxed max-w-[240px] mx-auto uppercase">
                {hasEmbeddedDocs 
                  ? "Vector database connected. Send a question or choose a starter prompt below." 
                  : "Awaiting local embedding compiler locks to launch reasoning queries."}
              </p>
            </div>
          </div>
        ) : (
          /* Live dialog bubbles */
          <div className="space-y-5">
            {chatMessages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* Premium flashing carets terminal loader when Thinking */}
            {isAgentThinking && (
              <div className="space-y-2 animate-pulse">
                <div className="flex justify-start">
                  <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                    // PONDER_AGENT_COGNITION_LOOP
                  </span>
                </div>
                <div className="flex justify-start">
                  <div className="bg-zinc-950/70 border border-white/5 text-cyan-400/80 rounded-2xl rounded-tl-sm p-4 max-w-[80%] flex items-center gap-3">
                    <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                    <div className="font-mono text-xs tracking-wide">
                      REASONING_PIPELINE_ACTIVE<span className="animate-blink">_</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area & Starter chips */}
      <div className="shrink-0 space-y-3">
        
        {/* Dynamic Error Dialog banner */}
        {hasDocuments && agentError && (
          <div className="border border-red-500/20 bg-red-950/20 rounded-xl p-3 flex gap-3 items-center justify-between">
            <span className="text-[10px] font-mono text-red-400/80 uppercase">
              Error: {agentError}
            </span>
            <button 
              onClick={clearAgentError}
              className="text-[9px] font-mono text-white/40 hover:text-white/70"
            >
              DISMISS
            </button>
          </div>
        )}

        {/* Starter prompts */}
        {hasDocuments && (
          <div className="flex flex-wrap gap-2">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={isAgentThinking || !hasEmbeddedDocs}
                className={`text-[10px] font-mono px-3 py-1.5 rounded-lg border uppercase tracking-wider transition-all select-none ${
                  isAgentThinking || !hasEmbeddedDocs
                    ? "text-white/10 border-white/5 bg-zinc-950/10 cursor-not-allowed"
                    : "text-white/40 border-white/5 bg-zinc-950/20 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-950/10 cursor-pointer active:scale-95"
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Textarea container */}
        <div className={`relative border rounded-xl p-2.5 flex items-end transition-all ${
          hasEmbeddedDocs && !isAgentThinking
            ? "border-white/10 bg-zinc-950/60 focus-within:border-cyan-400/30" 
            : "border-white/5 bg-zinc-950/20 opacity-50 cursor-not-allowed"
        }`}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleInputKeyPress}
            disabled={!hasEmbeddedDocs || isAgentThinking}
            rows={1}
            placeholder={
              isAgentThinking
                ? "Agent is compiling self-evaluation audits..."
                : hasEmbeddedDocs 
                ? "Ask across your embedded documents..." 
                : !hasDocuments
                ? "Onboarding standby (locked)..."
                : "Embed context to unlock dialog inputs..."
            }
            className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder:text-white/20 outline-none resize-none no-scrollbar py-1.5 px-2 font-sans"
          />
          <button
            onClick={() => handleSend(question)}
            disabled={!hasEmbeddedDocs || isAgentThinking || !question.trim()}
            className={`rounded-lg p-2.5 transition-all shrink-0 flex items-center justify-center gap-1 font-mono text-[9px] font-bold tracking-wider border uppercase select-none ${
              question.trim() && !isAgentThinking && hasEmbeddedDocs
                ? "bg-cyan-950 border-cyan-400/40 text-cyan-400 hover:bg-cyan-900/30 shadow-[0_0_10px_rgba(6,182,212,0.15)] active:scale-95 cursor-pointer"
                : "bg-white/5 border-transparent text-white/20 cursor-not-allowed"
            }`}
          >
            ASK_PONDER <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        
        {/* Cmd+Enter caption indicator */}
        {hasDocuments && (
          <div className="flex items-center justify-end text-[9px] font-mono text-white/10">
            <span className="flex items-center gap-1 uppercase">
              CMD + ENTER <CornerDownLeft className="w-2.5 h-2.5" />
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
