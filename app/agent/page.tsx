"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, RefreshCw, User, Bot } from "lucide-react";

export const dynamic = 'force-dynamic';

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; url?: string; id: string }[];
}

const SUGGESTIONS = [
  "What is Tharun’s deepest body of work?",
  "What are the limitations of the credit-risk project?",
  "What is Parents Health OS?",
];

export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of message list
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

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
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl sm:max-w-[760px] mx-auto py-6 sm:py-12 px-2 sm:px-4 flex flex-col min-h-[calc(100dvh-6rem)]">
      {/* PAGE HEADER */}
      <div className="relative z-10 mb-6 sm:mb-8 shrink-0 flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight mb-2">
            Ask about Tharun’s work.
          </h1>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            Answers are grounded in verified public portfolio evidence.
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleReset}
            className="text-xs font-mono text-ink-faint hover:text-ink flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 mt-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        )}
      </div>

      {/* CANVAS CONTENT AREA */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        
        {/* MESSAGES LOG / STARTER PROMPTS */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-6 scroll-smooth text-sm font-sans select-text pb-4"
        >
          {messages.length === 0 ? (
            <div className="border-t border-b border-hairline py-1 my-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="w-full text-left py-3.5 px-1 text-xs sm:text-sm text-ink-muted hover:text-ink transition-colors cursor-pointer flex items-center justify-between border-b last:border-b-0 border-hairline group"
                >
                  <span>{suggestion}</span>
                  <span className="text-ink-faint group-hover:text-ink group-hover:translate-x-0.5 transition-transform ml-2 shrink-0">→</span>
                </button>
              ))}
            </div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-md bg-surface-sunken border border-hairline flex items-center justify-center shrink-0 mt-0.5 text-ink-muted">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[90%] sm:max-w-[85%] text-xs sm:text-sm ${
                    msg.role === 'user'
                      ? 'bg-surface-sunken border border-hairline text-ink rounded-lg px-3.5 py-2.5 font-medium'
                      : 'text-ink leading-relaxed font-normal py-1'
                  }`}
                >
                  {msg.content ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    <div className="flex items-center gap-2 py-0.5 text-xs text-ink-muted">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span>Thinking…</span>
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-md bg-surface-sunken border border-hairline flex items-center justify-center shrink-0 mt-0.5 text-ink-muted">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* COMPOSER BAR */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="sticky bottom-0 mt-4 bg-surface-raised border border-hairline focus-within:border-ink/40 focus-within:ring-1 focus-within:ring-ink/20 rounded-xl p-2 sm:p-2.5 flex items-center gap-2 shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about work, projects, experience, or education…"
            disabled={isStreaming}
            className="flex-1 bg-transparent border-none outline-none focus:outline-none px-2 py-1 text-xs sm:text-sm text-ink placeholder:text-ink-faint font-sans"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="bg-ink text-surface-raised hover:bg-ink/90 disabled:opacity-20 disabled:cursor-not-allowed font-sans text-xs font-medium px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span className="hidden sm:inline">Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
