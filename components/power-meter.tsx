'use client';

import { motion } from 'framer-motion';

interface PowerMeterProps {
  isStreaming?: boolean;
  model?: 'groq' | 'gemini';
}

export function PowerMeter({ isStreaming = false, model = 'groq' }: PowerMeterProps) {
  const segments = 12;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-32 h-32 mb-6">
        {/* Outer Ring */}
        <svg
          className="w-full h-full"
          viewBox="0 0 120 120"
          style={{ transform: 'rotateZ(-90deg)' }}
        >
          {/* Background Circle */}
          <circle cx="60" cy="60" r="50" fill="none" stroke="#1e293b" strokeWidth="2" />

          {/* Power Segments */}
          {Array.from({ length: segments }).map((_, i) => {
            const angle = (i / segments) * Math.PI * 2;
            const isActive = isStreaming || i < 8;

            return (
              <g key={i}>
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={
                    isActive
                      ? i < 6
                        ? '#10b981'
                        : i < 10
                        ? '#f59e0b'
                        : '#ef4444'
                      : '#334155'
                  }
                  strokeWidth="3"
                  strokeDasharray={`${(Math.PI * 2 * 50) / segments} ${
                    Math.PI * 2 * 50 - (Math.PI * 2 * 50) / segments
                  }`}
                  strokeDashoffset={
                    -(Math.PI * 2 * 50 * i) / segments
                  }
                  opacity={isActive ? 1 : 0.3}
                  style={{
                    transition: isStreaming ? 'all 0.3s ease' : 'none',
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isStreaming ? (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-center"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {model === 'groq' ? 'HV1' : 'RSH'}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {isStreaming ? 'Active' : 'Ready'}
              </div>
            </motion.div>
          ) : (
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                {Math.floor(Math.random() * 100)}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">Power</div>
            </div>
          )}
        </div>

        {/* Pulse Effect When Streaming */}
        {isStreaming && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-primary"
          />
        )}
      </div>

      {/* Status Text */}
      <motion.div
        animate={isStreaming ? { y: [0, -2, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-center"
      >
        <p className="text-sm font-medium text-foreground">
          {isStreaming
            ? model === 'groq'
              ? 'HellV1 Processing'
              : 'Research Mode'
            : 'Awaiting Input'}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {isStreaming ? 'Real-time generation' : 'Ready to assist'}
        </p>
      </motion.div>
    </div>
  );
}
