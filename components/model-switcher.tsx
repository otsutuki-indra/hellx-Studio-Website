'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ModelSwitcherProps {
  onModelChange?: (model: 'groq' | 'gemini') => void;
  currentModel?: 'groq' | 'gemini';
}

export function ModelSwitcher({ onModelChange, currentModel = 'groq' }: ModelSwitcherProps) {
  const [model, setModel] = useState<'groq' | 'gemini'>(currentModel);

  const models = [
    {
      id: 'groq',
      name: 'HellV1',
      description: 'Groq (Fast)',
      icon: '⚡',
      badge: 'Recommended',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'gemini',
      name: 'Research',
      description: 'Gemini (Advanced)',
      icon: '🔬',
      badge: 'Beta',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  const handleModelChange = (newModel: 'groq' | 'gemini') => {
    setModel(newModel);
    onModelChange?.(newModel);
  };

  const activeModel = models.find((m) => m.id === model);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-foreground">AI Model</label>
        {activeModel && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary">
              {activeModel.badge}
            </span>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {models.map((m) => (
          <motion.button
            key={m.id}
            onClick={() => handleModelChange(m.id as 'groq' | 'gemini')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-4 rounded-lg border transition-all duration-200 text-left overflow-hidden group ${
              model === m.id
                ? `border-primary bg-gradient-to-br ${m.color} bg-opacity-10 shadow-lg shadow-primary/20`
                : 'border-border/50 bg-card hover:border-primary/50'
            }`}
          >
            {/* Animated Background */}
            {model === m.id && (
              <motion.div
                layoutId="model-bg"
                className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-5`}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{m.icon}</span>
                <h4 className="font-semibold text-sm">{m.name}</h4>
              </div>
              <p className="text-xs text-muted-foreground">{m.description}</p>

              {model === m.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 flex items-center gap-2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                  <span className="text-xs font-medium text-primary">Active</span>
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground pt-2">
        {model === 'groq'
          ? '⚡ Fastest responses (2-5s) - Perfect for real-time collaboration'
          : '🔬 More advanced reasoning - Better for complex tasks'}
      </p>
    </div>
  );
}
