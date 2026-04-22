import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      clearMessages: () => set({ messages: [] }),
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'chat-storage',
    }
  )
);
