'use client';

import { motion } from 'framer-motion';

interface RankXPBarProps {
  creditsUsed: number;
}

export function RankXPBar({ creditsUsed }: RankXPBarProps) {
  // Define rank thresholds
  const ranks = [
    { name: 'Pioneer', minCredits: 0, maxCredits: 500, color: 'from-slate-400 to-blue-400' },
    { name: 'Explorer', minCredits: 500, maxCredits: 1500, color: 'from-blue-400 to-cyan-400' },
    { name: 'Innovator', minCredits: 1500, maxCredits: 3000, color: 'from-cyan-400 to-green-400' },
    { name: 'Architect', minCredits: 3000, maxCredits: 5000, color: 'from-green-400 to-lime-400' },
    { name: 'Visionary', minCredits: 5000, maxCredits: 8000, color: 'from-lime-400 to-yellow-400' },
    { name: 'Master', minCredits: 8000, maxCredits: 12000, color: 'from-yellow-400 to-orange-400' },
    { name: 'Legend', minCredits: 12000, maxCredits: 20000, color: 'from-orange-400 to-red-500' },
    { name: 'Elite', minCredits: 20000, maxCredits: Infinity, color: 'from-red-500 to-purple-500' },
  ];

  // Find current rank
  const currentRank = ranks.find(
    (rank) => creditsUsed >= rank.minCredits && creditsUsed < rank.maxCredits
  ) || ranks[0];

  const currentRankIndex = ranks.indexOf(currentRank);
  const nextRank = currentRankIndex < ranks.length - 1 ? ranks[currentRankIndex + 1] : currentRank;

  // Calculate progress within current rank
  const creditsSinceRankStart = creditsUsed - currentRank.minCredits;
  const creditsNeededForRank = currentRank.maxCredits - currentRank.minCredits;
  const progressPercentage = (creditsSinceRankStart / creditsNeededForRank) * 100;

  return (
    <div className="space-y-4">
      {/* Rank Display */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Rank</h3>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-2xl font-bold bg-gradient-to-r ${currentRank.color} bg-clip-text text-transparent`}
          >
            {currentRank.name}
          </motion.div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-1">Total Credits Used</p>
          <p className="text-xl font-bold text-primary">{creditsUsed.toLocaleString()}</p>
        </div>
      </div>

      {/* XP Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {creditsSinceRankStart.toLocaleString()} / {creditsNeededForRank.toLocaleString()}
          </span>
          <span className="text-muted-foreground">
            {Math.round(progressPercentage)}%
          </span>
        </div>

        {/* Progress Bar with Gradient */}
        <div className="w-full h-3 rounded-full bg-card border border-border/50 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${currentRank.color} rounded-full shadow-lg shadow-${currentRank.color.split(' ')[1]}/50`}
          />
        </div>

        {/* Next Rank Preview */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">Next: {nextRank.name}</span>
          <span className="text-xs font-medium text-primary">
            {(nextRank.maxCredits - creditsUsed).toLocaleString()} credits needed
          </span>
        </div>
      </div>

      {/* Rank Benefits */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <div className="p-2 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs text-muted-foreground">Tier</p>
          <p className="text-sm font-semibold text-primary">{currentRankIndex + 1}/{ranks.length}</p>
        </div>
        <div className="p-2 rounded-lg bg-accent/5 border border-accent/20">
          <p className="text-xs text-muted-foreground">Unlock Rate</p>
          <p className="text-sm font-semibold text-accent">+25% Speed</p>
        </div>
      </div>
    </div>
  );
}
