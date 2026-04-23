'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { RankXPBar } from '@/components/rank-xp-bar';
import { ModelSwitcher } from '@/components/model-switcher';
import { DashboardStats } from '@/components/dashboard-stats';
import { PowerMeter } from '@/components/power-meter';
import { ActivityFeed } from '@/components/activity-feed';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at?: number;
}

interface Conversation {
  id: string;
  title: string;
  topic: string;
  created_at: number;
}

interface User {
  id: string;
  email: string;
  username: string;
  credits: number;
  tier: string;
  credits_used?: number;
}

export default function EnhancedDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [model, setModel] = useState<'groq' | 'gemini'>('groq');
  const [isStreaming, setIsStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [streamingText, setStreamingText] = useState('');
  const [showRightPanel, setShowRightPanel] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchDashboardData(token);
  }, []);

  const fetchDashboardData = async (token: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        router.push('/login');
        return;
      }

      const data = await response.json();
      setUser(data.user);
      setConversations(data.conversations);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    try {
      const response = await fetch(`/api/chat/messages?id=${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Message fetch error:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    setSending(true);
    setIsStreaming(true);
    setStreamingText('');
    const token = localStorage.getItem('auth_token');
    const userMessage = input;
    setInput('');

    try {
      // Add user message
      const newUserMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: userMessage,
        created_at: Date.now(),
      };
      setMessages((prev) => [...prev, newUserMessage]);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: userMessage,
          conversationId: activeConversation,
          topic: 'general',
          model: model,
        }),
      });

      if (!response.ok) {
        setIsStreaming(false);
        return;
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) return;

      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const data = JSON.parse(line.slice(5));
              if (data.type === 'text-delta') {
                fullText += data.delta;
                setStreamingText(fullText);
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fullText,
        created_at: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingText('');

      // Update user credits
      setUser((prev) =>
        prev
          ? {
              ...prev,
              credits: Math.max(0, prev.credits - 1),
              credits_used: (prev.credits_used || 0) + 1,
            }
          : null
      );

      // Update or create conversation
      if (!activeConversation) {
        const newConv: Conversation = {
          id: Date.now().toString(),
          title: userMessage.substring(0, 50),
          topic: 'general',
          created_at: Date.now(),
        };
        setConversations((prev) => [newConv, ...prev]);
        setActiveConversation(newConv.id);
      }
    } catch (error) {
      console.error('Send message error:', error);
    } finally {
      setSending(false);
      setIsStreaming(false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050505]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 300 : 0 }}
        transition={{ duration: 0.3 }}
        className="border-r border-[#A020F0]/20 bg-[#0a0a0a]/80 backdrop-blur-md flex flex-col overflow-hidden"
      >
        <div className="p-6 border-b border-[#A020F0]/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A020F0] to-[#FF006E] flex items-center justify-center font-bold text-white text-sm">
              HX
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-[#A020F0] to-[#FF006E] bg-clip-text text-transparent">
              HELLX
            </h2>
          </div>
          {user && (
            <p className="text-xs text-muted-foreground truncate">{user.username}</p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="px-2">
            <ModelSwitcher
              currentModel={model}
              onModelChange={(newModel) => setModel(newModel)}
            />
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#A020F0]/20 to-transparent" />

          <Button
            variant="outline"
            className="w-full border-[#A020F0]/30 hover:border-[#A020F0]"
            onClick={() => {
              setActiveConversation(null);
              setMessages([]);
              setInput('');
            }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </Button>

          <div>
            <p className="text-xs font-semibold text-muted-foreground px-2 mb-3">
              Conversations
            </p>
            <div className="space-y-2">
              <AnimatePresence>
                {conversations.map((conv) => (
                  <motion.button
                    key={conv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onClick={() => {
                      setActiveConversation(conv.id);
                      fetchMessages(conv.id);
                    }}
                    className={`w-full text-left p-3 rounded-lg text-sm transition truncate ${
                      activeConversation === conv.id
                        ? 'bg-[#A020F0]/20 border border-[#A020F0] text-[#A020F0]'
                        : 'hover:bg-[#A020F0]/5 text-muted-foreground hover:text-foreground border border-transparent'
                    }`}
                    title={conv.title}
                  >
                    {conv.title}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#A020F0]/20 space-y-4">
          {user && (
            <div className="bg-gradient-to-br from-[#A020F0]/10 to-[#FF006E]/10 border border-[#A020F0]/30 rounded-lg p-4">
              <RankXPBar creditsUsed={user.credits_used || 0} />
            </div>
          )}

          {user && (
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Credits</span>
                <span className="font-semibold text-[#A020F0]">{user.credits}</span>
              </div>
              <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((user.credits / 1000) * 100, 100)}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#A020F0] to-[#FF006E]"
                />
              </div>
            </div>
          )}

          <Button
            variant="outline"
            className="w-full text-xs border-[#A020F0]/30 hover:border-[#A020F0]/50"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-[#A020F0]/20 bg-[#0a0a0a]/40 backdrop-blur-md px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-[#A020F0]/10 rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome to HELLX STUDIO</p>
            </div>
          </div>

          <button
            onClick={() => setShowRightPanel(!showRightPanel)}
            className="p-2 hover:bg-[#A020F0]/10 rounded-lg transition hidden md:block"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Stats Cards */}
            <div className="p-6 border-b border-[#A020F0]/20 bg-[#050505]/50">
              <DashboardStats isLoading={loading} />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center h-full text-center"
                >
                  <div className="max-w-md">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      ✨
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-3">Start Creating</h3>
                    <p className="text-muted-foreground mb-8">
                      Begin a conversation with your AI assistant. Choose HellV1 for speed or Research for advanced reasoning.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <>
                  <AnimatePresence>
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-2xl p-4 rounded-xl ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-[#A020F0]/20 to-[#FF006E]/20 border border-[#A020F0]/30 text-foreground'
                              : 'bg-[#1a1a1a] border border-[#A020F0]/20 text-foreground'
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isStreaming && streamingText && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-2xl p-4 rounded-xl bg-[#1a1a1a] border border-[#A020F0]/20 text-foreground">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{streamingText}</p>
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block w-2 h-4 ml-1 bg-[#A020F0] rounded"
                        />
                      </div>
                    </motion.div>
                  )}

                  {isStreaming && !streamingText && (
                    <motion.div className="flex gap-3 items-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-[#A020F0] to-[#FF006E]"
                      />
                      <span className="text-sm text-muted-foreground">
                        {model === 'groq' ? 'HellV1' : 'Research'} is thinking...
                      </span>
                    </motion.div>
                  )}
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-[#A020F0]/20 bg-[#0a0a0a]/40 backdrop-blur-md p-6">
              <form onSubmit={handleSendMessage} className="flex gap-4">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Message with ${model === 'groq' ? 'HellV1' : 'Research'}...`}
                  disabled={sending || !user || user.credits < 1}
                  className="flex-1 bg-[#1a1a1a] border-[#A020F0]/30 focus:border-[#A020F0]"
                />
                <Button
                  type="submit"
                  disabled={sending || !user || user.credits < 1}
                  className="bg-gradient-to-r from-[#A020F0] to-[#FF006E] hover:opacity-90"
                >
                  {sending ? <Spinner className="w-4 h-4" /> : 'Send'}
                </Button>
              </form>
              {user && user.credits < 1 && (
                <p className="text-xs text-red-500 mt-2">
                  Insufficient credits. Please purchase more to continue.
                </p>
              )}
            </div>
          </div>

          {/* Right Panel - Stats & Activity */}
          <motion.div
            initial={false}
            animate={{ width: showRightPanel ? 320 : 0 }}
            transition={{ duration: 0.3 }}
            className="border-l border-[#A020F0]/20 bg-[#0a0a0a]/80 backdrop-blur-md flex flex-col overflow-hidden hidden lg:flex"
          >
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Power Meter */}
              <div>
                <PowerMeter
                  credits={user?.credits || 0}
                  maxCredits={1000}
                  tier={user?.tier || 'free'}
                  isLoading={loading}
                />
              </div>

              {/* Activity Feed */}
              <ActivityFeed maxItems={6} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
