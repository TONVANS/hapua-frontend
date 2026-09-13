'use client';

import React from 'react';
import { motion } from 'motion/react';
import { FileText, Sparkles, ExternalLink } from 'lucide-react';

interface ActivityOverviewCardProps {
  description?: string | null;
  docURL?: string | null;
}

export function ActivityOverviewCard({ description, docURL }: ActivityOverviewCardProps) {
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

      {docURL && (
        <div className="mt-4 pt-4 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-blue-50/40 border border-blue-200/70 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#002660] text-white flex items-center justify-center shadow-xs shrink-0">
                <FileText className="w-5 h-5 text-[#ffe088]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#002660]">Official Session Documentation</h3>
                <p className="text-[11px] text-[#4f616f]">
                  Ministerial brief, session presentation slides, or agenda documentation
                </p>
              </div>
            </div>
            <a
              href={docURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#002660] hover:bg-[#1a3c7d] text-white text-xs font-bold shadow-md shadow-[#002660]/15 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
            >
              <span>Open Document</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
}
