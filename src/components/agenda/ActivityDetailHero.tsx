'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, QrCode, Check, Copy, Sparkles, Building2, ShieldCheck } from 'lucide-react';
import { Activity } from '@/types';
import { formatEventDate } from '@/components/admin/activities/utils';

interface ActivityDetailHeroProps {
  activity: Activity;
  duration: string | null;
  copiedCode: boolean;
  onCopyQrCode: () => void;
}

function getStatusBadge(status?: string) {
  switch (status) {
    case 'ONGOING':
      return (
        <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600 text-white shadow-md flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>Live Now</span>
        </span>
      );
    case 'COMPLETED':
      return (
        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-700 text-white shadow-xs">
          Completed
        </span>
      );
    case 'CANCELED':
      return (
        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white shadow-xs">
          Canceled
        </span>
      );
    case 'UPCOMING':
    default:
      return (
        <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#002660] to-[#1a3c7d] text-white border border-[#cca730]/40 shadow-md flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#ffe088]" />
          <span>Upcoming Session</span>
        </span>
      );
  }
}

export function ActivityDetailHero({
  activity,
  duration,
  copiedCode,
  onCopyQrCode,
}: ActivityDetailHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-modal rounded-3xl p-6 sm:p-10 border-2 border-white/90 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative Luminous Ambient Glows */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-bl from-[#ffe088]/20 via-[#d2e5f6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-[#002660]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Top Classification Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
          <div className="flex flex-wrap items-center gap-2.5">
            {getStatusBadge(activity.status)}

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#002660] text-xs font-bold uppercase tracking-wider border border-[#d4af37]/40 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#cca730]" />
              <span>42nd HAPUA Council Meeting</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f7f9fb] text-[#4f616f] text-xs font-semibold border border-slate-200">
            <Building2 className="w-3.5 h-3.5 text-[#cca730]" />
            <span>Host: Electricité du Laos (EDL)</span>
          </div>
        </div>

        {/* Activity Name */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002660] tracking-tight leading-snug">
          {activity.name}
        </h1>

        {/* Date, Time and Venue Information Bar */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 text-xs sm:text-sm text-[#4f616f]">
          {activity.date && (
            <div className="flex items-center gap-2 font-bold text-[#002660] bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/80 shadow-xs">
              <Calendar className="w-4 h-4 text-[#cca730]" />
              <span>
                {formatEventDate(activity.date, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 font-bold text-[#002660] bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/80 shadow-xs">
            <Clock className="w-4 h-4 text-[#cca730]" />
            <span>
              {new Date(activity.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{' '}
              {new Date(activity.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (UTC+7)
            </span>
            {duration && (
              <span className="text-xs font-medium text-[#4f616f] ml-1 bg-[#f2f4f6] px-2 py-0.5 rounded-lg">
                {duration}
              </span>
            )}
          </div>

          {activity.room?.name && (
            <div className="flex items-center gap-2 font-bold text-[#002660] bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/80 shadow-xs">
              <MapPin className="w-4 h-4 text-[#cca730]" />
              <span>{activity.room.name}</span>
            </div>
          )}

          {/* {activity.qrCode && (
            <button
              onClick={onCopyQrCode}
              className="flex items-center gap-2 font-mono text-xs font-extrabold text-[#002660] bg-gradient-to-r from-[#ffe088]/40 to-[#ffe088]/20 hover:from-[#ffe088]/60 hover:to-[#ffe088]/40 px-4 py-2 rounded-2xl border border-[#cca730]/50 transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              title="Copy Official Session Code"
            >
              <QrCode className="w-4 h-4 text-[#cca730]" />
              <span>PASS CODE: {activity.qrCode}</span>
              {copiedCode ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 ml-1" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400 ml-1" />
              )}
            </button>
          )} */}
        </div>
      </div>
    </motion.div>
  );
}
