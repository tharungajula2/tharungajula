"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RefreshCw, Sparkles, User, Bot, CheckCircle2, Search, Filter } from "lucide-react";

export const dynamic = 'force-dynamic';

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; url?: string; id: string }[];
}

const SUGGESTIONS = [
  "What is Tharun’s deepest body of work?",
  "How does LOC-IQ actually work?",
  "What are the limitations of the credit-risk project?",
  "What kind of role is his background strongest for?",
];

export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeStage, setActiveStage] = useState<"IDLE" | "INTENT" | "RETRIEVE" | "VERIFY">("IDLE");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of message list
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming, activeStage]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);
    setActiveStage("INTENT");

    // Stage progression visualization
    setTimeout(() => setActiveStage("RETRIEVE"), 300);
    setTimeout(() => setActiveStage("VERIFY"), 600);

    // Append empty assistant message for streaming
    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages([...updatedMessages, assistantMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader available");

      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: accumulated,
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Agent pipeline error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "I don't have verified public evidence for that.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
      setActiveStage("IDLE");
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
    setActiveStage("IDLE");
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-4 sm:py-10 px-2 sm:px-4 pb-4 sm:pb-8 flex flex-col h-[calc(100vh-140px)] min-h-[500px]">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-full h-[60%] bg-gradient-to-tr from-accent-glow via-accent-glow/5 to-transparent blur-[120px] pointer-events-none z-0 overflow-hidden" />

      {/* PAGE HEADER */}
      <div className="relative z-10 mb-3 sm:mb-4 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-accent text-[10px] sm:text-xs tracking-wider sm:tracking-[0.3em] font-mono uppercase font-semibold">
              // PORTFOLIO INTELLIGENCE
            </span>
            <div className="h-px w-12 sm:w-24 bg-hairline-faint" />
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleReset}
              className="text-[10px] sm:text-xs font-mono text-ink-faint hover:text-accent flex items-center gap-1.5 transition-colors cursor-pointer uppercase"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Chat</span>
            </button>
          )}
        </div>

        <h1 className="text-xl sm:text-3xl font-bold text-ink tracking-tight uppercase leading-tight mb-1">
          Ask me about Tharun's work.
        </h1>
        <p className="text-xs sm:text-sm text-ink-muted font-normal dark:font-light">
          Evidence-grounded portfolio agent. Answers are strictly retrieved and verified against public repository records.
        </p>
      </div>

      {/* MAIN CHAT WINDOW */}
      <div className="relative z-10 flex-1 bg-surface-raised backdrop-blur-2xl border border-hairline rounded-2xl p-3 sm:p-5 flex flex-col overflow-hidden shadow-sm">
        
        {/* MESSAGES LOG */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2 scroll-smooth text-sm font-sans"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <div className="w-10 h-10 rounded-full bg-accent-glow flex items-center justify-center border border-accent-dim mb-3">
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
              </div>
              <h2 className="text-sm font-mono font-semibold text-ink uppercase tracking-wider mb-2">
                Evidence Pipeline Active
              </h2>
              <p className="text-xs text-ink-muted max-w-md mb-6 font-normal">
                Query → Intent Classification → Local Evidence Retrieval → Grounded Generation → Claim Verification.
              </p>

              {/* REVIEWER SUGGESTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    className="text-left text-xs font-mono p-3 rounded-xl border border-hairline bg-surface-sunken hover:border-accent hover:text-accent transition-all cursor-pointer text-ink-muted flex items-center justify-between group"
                  >
                    <span>{suggestion}</span>
                    <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">→</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-accent-glow border border-accent-dim flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[78%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent/15 border border-accent-dim text-ink rounded-tr-none font-medium'
                      : 'bg-surface-sunken border border-hairline text-ink-muted rounded-tl-none font-normal dark:font-light'
                  }`}
                >
                  {msg.content ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    <div className="flex items-center gap-2 py-1 font-mono text-xs text-accent">
                      <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                      <span>Processing Pipeline...</span>
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-surface-sunken border border-hairline flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-ink-muted" />
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* PROCESS STAGE INDICATOR */}
        {isStreaming && (
          <div className="my-2 py-1 px-3 bg-surface-sunken border border-hairline rounded-lg flex items-center justify-center gap-2 text-[10px] font-mono text-ink-muted shrink-0">
            <span className={activeStage === "INTENT" ? "text-accent font-bold" : "opacity-60"}>INTENT</span>
            <span className="opacity-40">→</span>
            <span className={activeStage === "RETRIEVE" ? "text-accent font-bold" : "opacity-60"}>RETRIEVE</span>
            <span className="opacity-40">→</span>
            <span className={activeStage === "VERIFY" ? "text-accent font-bold" : "opacity-60"}>VERIFY</span>
          </div>
        )}

        {/* INPUT FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="mt-2 pt-3 border-t border-hairline flex items-center gap-2 shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about Tharun's projects, models, or evidence..."
            disabled={isStreaming}
            className="flex-1 bg-surface-sunken border border-hairline rounded-xl px-4 py-2.5 text-xs sm:text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent font-sans transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="bg-accent/20 hover:bg-accent text-accent hover:text-surface border border-accent-dim hover:border-accent disabled:opacity-40 disabled:cursor-not-allowed font-mono text-xs font-semibold px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span className="hidden sm:inline">Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
