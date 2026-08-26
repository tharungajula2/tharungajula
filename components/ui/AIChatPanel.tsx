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
  "Walk me through Parents Health OS",
  "How does LOC-IQ work?",
  "What analytics projects has he built?",
  "What kind of role is he looking for?",
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
            className="fixed inset-0 bg-surface-raised/80 backdrop-blur-sm z-[80]"
          />

          {/* PANEL */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 h-[85svh] sm:h-[80svh] bg-surface-raised backdrop-blur-2xl border-t border-hairline rounded-t-3xl z-[90] flex flex-col overflow-hidden"
          >
            {/* TOP BAR */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-hairline-faint shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-accent/70 uppercase">
                  // ASK_AI
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-ink-faint hover:text-ink bg-surface-sunken hover:bg-hairline border border-hairline rounded-full w-8 h-8 flex items-center justify-center text-xs transition-all cursor-pointer"
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
                    <span className="text-[9px] font-mono tracking-[0.4em] text-ink-faint uppercase block">
                      // PORTFOLIO_INTELLIGENCE
                    </span>
                    <h3 className="text-lg font-bold text-ink/80 tracking-wide">
                      Ask me anything about Tharun
                    </h3>
                    <p className="text-xs text-ink-faint max-w-[280px] leading-relaxed">
                      I know about his product systems, analytics work, credit risk, experience, and what he is looking for.
                    </p>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap justify-center gap-2 max-w-sm">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => sendMessage(suggestion)}
                        className="text-[10px] sm:text-xs font-mono text-ink-muted border border-hairline px-3 py-2 rounded-lg hover:border-accent-dim hover:text-accent transition-all cursor-pointer"
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
                          ? "bg-surface-sunken text-ink rounded-br-sm border border-hairline-faint"
                          : "bg-surface-sunken/50 text-ink-muted border-l-2 border-accent-dim rounded-bl-sm"
                      }`}
                    >
                      {msg.content || (
                        <span className="flex items-center gap-1.5 text-ink-faint">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                          <span
                            className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <span
                            className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"
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
              <div className="shrink-0 px-4 py-4 border-t border-hairline-faint flex items-center justify-center">
                <p className="text-xs sm:text-sm text-ink-faint text-center">
                  Enjoyed the conversation?{" "}
                  <a
                    href="mailto:tharun.gajula.2@gmail.com"
                    className="text-accent hover:underline underline-offset-2 transition-colors"
                  >
                    Let&apos;s continue over email →
                  </a>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="shrink-0 px-4 py-4 border-t border-hairline-faint flex items-center gap-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Tharun's work..."
                  disabled={isStreaming}
                  className="flex-1 bg-surface-sunken border border-hairline rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent-dim transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isStreaming || !input.trim()}
                  className="bg-accent text-surface px-4 py-3 rounded-xl text-xs font-bold tracking-wide uppercase shrink-0 hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
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
