import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Plus,
  LogOut,
  Send,
  Sparkles,
  ChevronsRight,
  ChevronsLeft,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ParticleBackground } from "@/components/cyber/ParticleBackground";
import { DashboardStats } from "@/components/cyber/DashboardStats";
import { RankXPBar } from "@/components/cyber/RankXPBar";
import { PowerMeter } from "@/components/cyber/PowerMeter";
import { ActivityFeed } from "@/components/cyber/ActivityFeed";
import { ModelSwitcher } from "@/components/cyber/ModelSwitcher";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — HELLX STUDIO" },
      { name: "description", content: "Operator command deck for HELLX STUDIO. Monitor AI throughput, rank progression, and live mission activity." },
      { property: "og:title", content: "Dashboard — HELLX STUDIO" },
      { property: "og:description", content: "Operator command deck for HELLX STUDIO." },
    ],
  }),
  component: DashboardPage,
});

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
}

// PHASE 1 — UI port. Backend (Turso DB, Groq/Gemini streaming, JWT auth)
// is wired in subsequent phases. UI uses local demo state so the layout
// is fully interactive while the data layer is stubbed.
const DEMO_USER = {
  username: "operator_x",
  email: "operator@hellx.studio",
  credits: 742,
  creditsUsed: 1284,
  tier: "pro",
};

function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [model, setModel] = useState<"groq" | "gemini">("groq");
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "c1", title: "Refactor auth flow with JWT cookies" },
    { id: "c2", title: "Design tokens for cyberpunk dashboard" },
    { id: "c3", title: "Drizzle schema for chat history" },
  ]);
  const [activeConv, setActiveConv] = useState<string | null>("c1");
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", role: "user", content: "Summarize the rank progression rules." },
    { id: "m2", role: "assistant", content: "Operators advance through 8 tiers — Pioneer → Elite — based on cumulative credits spent. Each tier unlocks a +25% throughput boost on the active model." },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamText, setStreamText] = useState("");

  // Demo "stream" — simulates token-by-token reveal until backend is wired.
  async function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setSending(true);
    setStreaming(true);
    setStreamText("");

    const reply = `Standing by — backend uplink not yet wired in this phase. Once Turso + ${
      model === "groq" ? "Groq llama3-70b-8192" : "gemini-2.0-flash"
    } are connected, this stream will be real.`;
    let acc = "";
    for (const ch of reply) {
      await new Promise((r) => setTimeout(r, 12));
      acc += ch;
      setStreamText(acc);
    }
    setMessages((p) => [...p, { id: (Date.now() + 1).toString(), role: "assistant", content: acc }]);
    setStreamText("");
    setStreaming(false);
    setSending(false);
  }

  function newChat() {
    setActiveConv(null);
    setMessages([]);
    setInput("");
  }

  return (
    <div className="cyber relative flex h-screen overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 cyber-grid-bg pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <ParticleBackground />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(160,32,240,0.18),transparent_60%)]" />

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 296 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 border-r border-[#a020f0]/20 bg-[#08080f]/85 backdrop-blur-xl flex flex-col overflow-hidden"
      >
        <div className="p-5 border-b border-[#a020f0]/20">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#a020f0] to-[#ff006e] flex items-center justify-center font-black text-white text-sm shadow-[0_0_18px_-2px_rgba(160,32,240,0.7)]">
              HX
            </div>
            <div>
              <h2 className="text-base font-black tracking-wider bg-gradient-to-r from-[#a020f0] to-[#ff006e] bg-clip-text text-transparent">
                HELLX
              </h2>
              <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Studio · v0.1</p>
            </div>
          </Link>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground truncate font-mono">{DEMO_USER.username}</p>
            <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {DEMO_USER.tier}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <ModelSwitcher currentModel={model} onModelChange={setModel} />
          <div className="h-px bg-gradient-to-r from-transparent via-[#a020f0]/30 to-transparent" />

          <Button
            type="button"
            variant="outline"
            onClick={newChat}
            className="w-full border-[#a020f0]/40 hover:border-[#a020f0] hover:bg-[#a020f0]/10 text-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground px-1 mb-2">
              Conversations
            </p>
            <div className="space-y-1.5">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveConv(c.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition truncate border ${
                    activeConv === c.id
                      ? "bg-[#a020f0]/15 border-[#a020f0]/60 text-foreground"
                      : "border-transparent hover:bg-[#a020f0]/5 hover:border-[#a020f0]/20 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#a020f0]/20 space-y-3">
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground uppercase tracking-wider text-[10px]">Credits</span>
              <span className="font-bold font-mono text-[#c98bff]">{DEMO_USER.credits}</span>
            </div>
            <div className="h-1.5 bg-[#15151f] rounded-full overflow-hidden border border-[#a020f0]/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(DEMO_USER.credits / 1000) * 100}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-[#a020f0] to-[#ff006e]"
              />
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full text-xs border-[#a020f0]/30 hover:border-[#a020f0]/60 hover:bg-[#a020f0]/10"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Logout
          </Button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-[#a020f0]/20 bg-[#08080f]/60 backdrop-blur-xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen((v) => !v)}
              className="p-2 hover:bg-[#a020f0]/10 rounded-lg transition border border-transparent hover:border-[#a020f0]/30"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Command Deck</h1>
              <p className="text-[11px] text-muted-foreground font-mono">
                Welcome back, <span className="text-[#c98bff]">{DEMO_USER.username}</span> · uplink stable
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md border border-amber-500/30 bg-amber-500/8 text-amber-300">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono uppercase tracking-wider">Demo Mode · backend offline</span>
            </div>
            <button
              type="button"
              onClick={() => setRightOpen((v) => !v)}
              className="p-2 hover:bg-[#a020f0]/10 rounded-lg transition border border-transparent hover:border-[#a020f0]/30 hidden md:block"
              aria-label="Toggle right panel"
            >
              {rightOpen ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Body: chat + right panel */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Stats grid */}
            <div className="px-6 pt-5 pb-4 border-b border-[#a020f0]/15">
              <DashboardStats />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              {messages.length === 0 && !streaming ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex items-center justify-center text-center"
                >
                  <div className="max-w-md">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#a020f0]/30 to-[#ff006e]/30 border border-[#a020f0]/40 mb-5"
                    >
                      <Sparkles className="w-7 h-7 text-[#c98bff]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Initiate Transmission</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose <span className="text-[#c98bff] font-medium">HellV1</span> for raw speed or{" "}
                      <span className="text-[#7fe5ff] font-medium">Research</span> for deeper reasoning.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <>
                  <AnimatePresence initial={false}>
                    {messages.map((m, i) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.04, 0.2) }}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-2xl p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                            m.role === "user"
                              ? "bg-gradient-to-r from-[#a020f0]/20 to-[#ff006e]/20 border border-[#a020f0]/40 text-foreground"
                              : "bg-[#0a0a14] border border-[#a020f0]/20 text-foreground"
                          }`}
                        >
                          {m.content}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {streaming && streamText && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                      <div className="max-w-2xl p-4 rounded-xl bg-[#0a0a14] border border-[#a020f0]/30 text-foreground">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {streamText}
                          <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="inline-block w-1.5 h-4 ml-1 -mb-0.5 bg-[#a020f0] rounded-sm"
                          />
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {streaming && !streamText && (
                    <motion.div className="flex gap-3 items-center pl-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#a020f0] to-[#ff006e]"
                      />
                      <span className="text-xs text-muted-foreground font-mono">
                        {model === "groq" ? "HellV1" : "Research"} is computing…
                      </span>
                    </motion.div>
                  )}
                </>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-[#a020f0]/20 bg-[#08080f]/60 backdrop-blur-xl px-6 py-4">
              <form onSubmit={handleSend} className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Transmit to ${model === "groq" ? "HellV1" : "Research"}…`}
                  disabled={sending}
                  className="flex-1 bg-[#0a0a14] border-[#a020f0]/30 focus-visible:border-[#a020f0] focus-visible:ring-[#a020f0]/30 placeholder:text-muted-foreground/60 font-mono text-sm"
                />
                <Button
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="bg-gradient-to-r from-[#a020f0] to-[#ff006e] hover:opacity-90 text-white border-0 shadow-[0_0_18px_-4px_rgba(160,32,240,0.7)]"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </form>
              <p className="mt-2 text-[10px] text-muted-foreground font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#a020f0]" />
                Channel · {model === "groq" ? "llama3-70b-8192" : "gemini-2.0-flash"} · 1 credit per query
              </p>
            </div>
          </div>

          {/* Right panel */}
          <motion.aside
            initial={false}
            animate={{ width: rightOpen ? 340 : 0 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:flex border-l border-[#a020f0]/20 bg-[#08080f]/85 backdrop-blur-xl flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto p-5 space-y-7">
              <div className="rounded-xl border border-[#a020f0]/30 bg-gradient-to-br from-[#a020f0]/8 to-[#ff006e]/8 p-4">
                <RankXPBar creditsUsed={DEMO_USER.creditsUsed} />
              </div>

              <div className="rounded-xl border border-[#a020f0]/25 bg-[#0a0a14]/70 p-2">
                <PowerMeter isStreaming={streaming} model={model} power={87} />
              </div>

              <ActivityFeed maxItems={6} />
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}