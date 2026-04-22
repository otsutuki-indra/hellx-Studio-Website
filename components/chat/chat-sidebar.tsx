"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import useSWR, { mutate } from "swr";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface StatsData {
  queriesRemaining: number | "unlimited";
  queryLimit: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { data: stats } = useSWR<StatsData>("/api/user/stats", fetcher);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (response.status === 429) {
        const errorData = await response.json();
        setError(errorData.message);
        setIsLoading(false);
        return;
      }

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantMessage.content += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, content: assistantMessage.content }
              : m
          )
        );
      }

      // Refresh stats after successful query
      mutate("/api/user/stats");
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const remainingQueries =
    stats?.queriesRemaining === "unlimited"
      ? "Unlimited"
      : stats?.queriesRemaining ?? "...";

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue to-neon-purple shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6 text-background" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare className="h-6 w-6 text-background" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-background/95 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue to-neon-purple">
                <Bot className="h-5 w-5 text-background" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">HELLX AI</h3>
                <p className="text-xs text-muted-foreground">
                  Queries: {remainingQueries} remaining
                </p>
              </div>
              <div className="flex h-2 w-2 items-center">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
              </div>
            </div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-b border-red-500/20 bg-red-500/10 px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <p>{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
                    <Bot className="h-8 w-8 text-neon-blue" />
                  </div>
                  <h4 className="mb-2 font-semibold text-foreground">
                    Welcome to HELLX AI
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your intelligent assistant for all things digital. Ask me
                    anything!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={cn(
                        "flex gap-3",
                        message.role === "user" ? "flex-row-reverse" : ""
                      )}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          message.role === "user"
                            ? "bg-neon-purple/20"
                            : "bg-neon-blue/20"
                        )}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-neon-purple" />
                        ) : (
                          <Bot className="h-4 w-4 text-neon-blue" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                          message.role === "user"
                            ? "bg-neon-purple/20 text-foreground"
                            : "bg-white/5 text-foreground"
                        )}
                      >
                        {message.role === "assistant" ? (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            className="prose prose-invert prose-sm max-w-none"
                            components={{
                              p: ({ children }) => (
                                <p className="mb-2 last:mb-0">{children}</p>
                              ),
                              code: ({ children, className }) => {
                                const isInline = !className;
                                return isInline ? (
                                  <code className="rounded bg-white/10 px-1 py-0.5 text-neon-blue">
                                    {children}
                                  </code>
                                ) : (
                                  <code className="block overflow-x-auto rounded bg-black/50 p-2 text-xs">
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          message.content
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <motion.div
                      className="flex gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon-blue/20">
                        <Loader2 className="h-4 w-4 animate-spin text-neon-blue" />
                      </div>
                      <div className="rounded-2xl bg-white/5 px-4 py-2">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 p-4"
            >
              <div className="flex items-end gap-2 rounded-xl bg-white/5 p-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask HELLX AI..."
                  className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple transition-opacity disabled:opacity-50"
                >
                  <Send className="h-4 w-4 text-background" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
