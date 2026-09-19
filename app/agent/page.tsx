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
    <div className="relative w-full max-w-3xl mx-auto py-6 sm:py-10 px-4 flex flex-col h-[calc(100vh-140px)] min-h-[500px]">
      {/* PAGE HEADER */}
      <div className="relative z-10 mb-6 shrink-0 flex items-start justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mb-1">
            Ask about Tharun’s work.
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted">
            Answers are grounded in verified public portfolio evidence.
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleReset}
            className="text-xs font-mono text-ink-faint hover:text-accent flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        )}
      </div>

      {/* MAIN CHAT WINDOW */}
      <div className="relative z-10 flex-1 bg-surface-raised border border-hairline rounded-2xl p-4 sm:p-6 flex flex-col overflow-hidden shadow-sm">
        
        {/* MESSAGES LOG */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-4 pr-2 scroll-smooth text-sm font-sans"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center max-w-xl mx-auto space-y-3">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="text-left text-xs sm:text-sm p-3.5 rounded-xl border border-hairline bg-surface-sunken hover:border-accent hover:text-accent transition-all cursor-pointer text-ink-muted flex items-center justify-between group"
                >
                  <span>{suggestion}</span>
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">→</span>
                </button>
              ))}
            </div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent/10 border border-accent-dim text-ink rounded-tr-none font-medium'
                      : 'bg-surface-sunken border border-hairline text-ink-muted rounded-tl-none font-normal dark:font-light'
                  }`}
                >
                  {msg.content ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    <div className="flex items-center gap-2 py-1 text-xs text-accent">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span>Thinking…</span>
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-surface-sunken border border-hairline flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-ink-muted" />
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* INPUT FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="mt-3 pt-3 border-t border-hairline flex items-center gap-2 shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about work, projects, experience, or education…"
            disabled={isStreaming}
            className="flex-1 bg-surface-sunken border border-hairline rounded-xl px-4 py-2.5 text-xs sm:text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent font-sans transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="bg-accent/10 hover:bg-accent text-accent hover:text-surface border border-accent/20 hover:border-accent disabled:opacity-40 disabled:cursor-not-allowed font-sans text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span className="hidden sm:inline">Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
