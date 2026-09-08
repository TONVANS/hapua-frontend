'use client';

import React from 'react';
import { motion } from 'motion/react';
import { FileText, Sparkles } from 'lucide-react';

interface ActivityOverviewCardProps {
  description?: string | null;
}

export function ActivityOverviewCard({ description }: ActivityOverviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl space-y-4"
    >
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/80">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#002660] to-[#1a3c7d] text-white flex items-center justify-center shadow-md">
          <FileText className="w-5 h-5 text-[#ffe088]" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-[#002660]">Session Details & Deliberation Scope</h2>
          <p className="text-xs text-[#747781]">Official executive brief and agenda items</p>
        </div>
      </div>

      <div className="text-sm sm:text-base text-[#444650] leading-relaxed space-y-3 pt-2 font-normal">
        {description ? (
          <p className="whitespace-pre-line leading-relaxed">{description}</p>
        ) : (
          <p className="text-slate-400 italic">
            Official ministerial proceedings and strategic energy governance resolutions for the 42nd HAPUA Council Meeting in Luang Prabang, Lao PDR.
          </p>
        )}
      </div>
    </motion.div>
  );
}
