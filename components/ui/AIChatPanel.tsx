"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTIONS = [
  "What functional prototypes has he built?",
  "Tell me about his Product Owner background",
  "What kind of role is he looking for?",
  "What's his systems tech stack?",
];

export default function AIChatPanel({ isOpen, onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset state when panel reopens
  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      setInput("");
      setUserMessageCount(0);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);
    setUserMessageCount((c) => c + 1);

    // Add empty assistant message for streaming
    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages([...updatedMessages, assistantMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader");

      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        // Update the assistant message with accumulated text
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: accumulated,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          />

          {/* PANEL */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 h-[85svh] sm:h-[80svh] bg-black/95 backdrop-blur-2xl border-t border-white/10 rounded-t-3xl z-[90] flex flex-col overflow-hidden"
          >
            {/* TOP BAR */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/70 uppercase">
                  // ASK_AI
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-white/30 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full w-8 h-8 flex items-center justify-center text-xs transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* MESSAGES AREA */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-6 space-y-4 no-scrollbar"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-8">
                  {/* Welcome */}
                  <div className="text-center space-y-3">
                    <span className="text-[9px] font-mono tracking-[0.4em] text-white/20 uppercase block">
                      // PORTFOLIO_INTELLIGENCE
                    </span>
                    <h3 className="text-lg font-bold text-white/80 tracking-wide">
                      Ask me anything about Tharun
                    </h3>
                    <p className="text-xs text-white/40 max-w-[280px] leading-relaxed">
                      I know about his projects, skills, experience, and what
                      he&apos;s looking for.
                    </p>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap justify-center gap-2 max-w-sm">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => sendMessage(suggestion)}
                        className="text-[10px] sm:text-xs font-mono text-white/50 border border-white/10 px-3 py-2 rounded-lg hover:border-cyan-400/30 hover:text-cyan-400 transition-all cursor-pointer"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-white/10 text-white rounded-br-sm"
                          : "bg-white/[0.03] text-white/80 border-l-2 border-cyan-400/30 rounded-bl-sm"
                      }`}
                    >
                      {msg.content || (
                        <span className="flex items-center gap-1.5 text-white/30">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                          <span
                            className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <span
                            className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* INPUT BAR or LIMIT CTA */}
            {userMessageCount >= 2 && !isStreaming ? (
              <div className="shrink-0 px-4 py-4 border-t border-white/5 flex items-center justify-center">
                <p className="text-xs sm:text-sm text-white/50 text-center">
                  Enjoyed the conversation?{" "}
                  <a
                    href="mailto:tharun.gajula.2@gmail.com"
                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                  >
                    Let&apos;s continue over email →
                  </a>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="shrink-0 px-4 py-4 border-t border-white/5 flex items-center gap-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Tharun's work..."
                  disabled={isStreaming}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/30 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isStreaming || !input.trim()}
                  className="bg-cyan-400 text-black px-4 py-3 rounded-xl text-xs font-bold tracking-wide uppercase shrink-0 hover:bg-cyan-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  SEND
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
