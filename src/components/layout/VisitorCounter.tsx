'use client';

import React, { useEffect, useState } from 'react';
import { Eye, TrendingUp } from 'lucide-react';
import { publicService } from '@/services/public.service';
import type { SiteVisitStats } from '@/types';

export function VisitorCounter() {
  const [stats, setStats] = useState<SiteVisitStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const SESSION_KEY = 'hapua_has_visited';

    const handleVisit = async () => {
      try {
        const hasVisited = typeof window !== 'undefined' ? sessionStorage.getItem(SESSION_KEY) : null;

        if (!hasVisited) {
          // First visit in this browser session -> record and fetch stats
          const path = typeof window !== 'undefined' ? window.location.pathname : '/';
          const data = await publicService.recordVisit(path);
          if (isMounted) {
            setStats(data);
            try {
              sessionStorage.setItem(SESSION_KEY, 'true');
            } catch {
              // Ignore sessionStorage errors (e.g. private browsing storage limits)
            }
          }
        } else {
          // Already visited in this session -> get stats without incrementing
          const data = await publicService.getVisitStats();
          if (isMounted) {
            setStats(data);
          }
        }
      } catch {
        // Silently handle error so footer doesn't break
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    handleVisit();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 backdrop-blur-xs border border-[#e0e3e5] shadow-2xs hover:border-[#cca730]/60 transition-colors">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cca730] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cca730]" />
        </span>
        <div className="flex items-center gap-1.5 text-[#4f616f]">
          <Eye className="w-3.5 h-3.5 text-[#002660]" />
          <span className="font-medium text-[#444650]">Total Visits:</span>
        </div>
        {isLoading ? (
          <span className="inline-block w-10 h-3.5 bg-gray-200 animate-pulse rounded-xs" />
        ) : (
          <span className="font-semibold text-[#002660] tabular-nums">
            {stats ? stats.totalVisits.toLocaleString() : '—'}
          </span>
        )}
      </div>

      <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#ffe088]/20 border border-[#ffe088]/50 text-[#735c00]">
        <TrendingUp className="w-3.5 h-3.5 text-[#735c00]" />
        <span className="font-medium">Today:</span>
        {isLoading ? (
          <span className="inline-block w-6 h-3.5 bg-[#ffe088]/40 animate-pulse rounded-xs" />
        ) : (
          <span className="font-bold tabular-nums">
            {stats ? stats.todayVisits.toLocaleString() : '—'}
          </span>
        )}
      </div>
    </div>
  );
}
