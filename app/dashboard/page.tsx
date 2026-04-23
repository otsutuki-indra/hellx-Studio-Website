'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { RankXPBar } from '@/components/rank-xp-bar';
import { ModelSwitcher } from '@/components/model-switcher';

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

interface DashboardStats {
  ai_queries: number;
  conversations: number;
  avg_response: string;
  success_rate: string;
}

export default function DashboardPage() {
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
  const [stats, setStats] = useState<DashboardStats>({
    ai_queries: 1284,
    conversations: 48,
    avg_response: '1.2s',
    success_rate: '99.8%',
  });

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
      
      // Update stats based on user data
      setStats({
        ai_queries: data.user.credits_used || 1284,
        conversations: data.conversations.length,
        avg_response: '1.2s',
        success_rate: '99.8%',
      });
    } catch (error) {
      console.error('[v0] Failed to fetch dashboard:', error);
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
      console.error('[v0] Failed to fetch messages:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    setSending(true);
    setIsStreaming(true);
    const token = localStorage.getItem('auth_token');
    const userMessage = input;
    setInput('');

    try {
      // Add user message immediately
      const newUserMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: userMessage,
        created_at: Date.now(),
      };
      setMessages((prev) => [...prev, newUserMessage]);

      const response = await fetch('/api/chat/send', {
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

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to send message');
        setIsStreaming(false);
        return;
      }

      // Add assistant message with streaming animation
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        created_at: Date.now(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setActiveConversation(data.conversationId);
      setUser((prev) => prev ? { ...prev, credits: data.creditsRemaining, credits_used: (prev.credits_used || 0) + 1 } : null);

      // Update conversations list if new conversation
      if (!activeConversation) {
        const newConv: Conversation = {
          id: data.conversationId,
          title: userMessage.substring(0, 50),
          topic: 'general',
          created_at: Date.now(),
        };
        setConversations((prev) => [newConv, ...prev]);
      }
    } catch (error) {
      console.error('[v0] Failed to send message:', error);
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
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 0 }}
        transition={{ duration: 0.3 }}
        className="border-r border-border bg-card/30 flex flex-col overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white text-sm">
              HX
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              HELLX
            </h2>
          </div>
          {user && (
            <p className="text-xs text-muted-foreground truncate">
              {user.username}
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Model Switcher */}
          <div className="px-2">
            <ModelSwitcher
              currentModel={model}
              onModelChange={(newModel) => setModel(newModel)}
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* New Chat Button */}
          <Button
            variant="outline"
            className="w-full"
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

          {/* Conversations */}
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
                        ? 'bg-primary/20 border border-primary text-primary'
                        : 'hover:bg-card text-muted-foreground hover:text-foreground'
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

        {/* User Profile Card */}
        <div className="p-4 border-t border-border space-y-4">
          {user && (
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-4">
              <RankXPBar creditsUsed={user.credits_used || 0} />
            </div>
          )}

          {user && (
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Credits</span>
                <span className="font-semibold text-primary">{user.credits}</span>
              </div>
              <div className="h-1 bg-card rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((user.credits / 100) * 100, 100)}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
            </div>
          )}

          <Button
            variant="outline"
            className="w-full text-xs"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card/30 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-card rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back to HELLX STUDIO</p>
            </div>
          </div>

          {/* Stats Display */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">AI Queries</p>
              <p className="text-lg font-bold text-primary">{stats.ai_queries}</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Avg Response</p>
              <p className="text-lg font-bold text-accent">{stats.avg_response}</p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
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
                  Begin a conversation with your AI assistant. Choose from HellV1 for speed or Research for advanced reasoning.
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
                          ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-foreground'
                          : 'bg-card border border-border text-foreground'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Streaming Indicator */}
              {isStreaming && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 items-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary"
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
        <div className="border-t border-border bg-card/30 p-6">
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message with ${model === 'groq' ? 'HellV1' : 'Research'}...`}
              disabled={sending || !user || user.credits < 1}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={sending || !user || user.credits < 1}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
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
    </div>
  );
}
