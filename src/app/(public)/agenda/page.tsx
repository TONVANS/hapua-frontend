'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Clock, Loader2, Search, Sparkles, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { DaySwitcher, AgendaTimelineItem } from '@/components/agenda';
import { publicService } from '@/services';
import { AgendaItem } from '@/types';
import { Input } from '@/components/ui/input';

export default function AgendaPage() {
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [summitDays, setSummitDays] = useState<{ date: string; label: string; subtitle: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    async function loadAgenda() {
      try {
        const raw = await publicService.getAgenda();
        let items: AgendaItem[] = [];
        if (Array.isArray(raw)) {
          items = raw;
        } else if (raw && typeof raw === 'object') {
          items = Object.values(raw).flat() as AgendaItem[];
        }
        if (items.length > 0) {
          setAgenda(items);

          const uniqueDates = Array.from(
            new Set(
              items
                .map((item) => {
                  if (!item.date) return null;
                  try {
                    return new Date(item.date).toISOString().split('T')[0];
                  } catch {
                    return String(item.date).split('T')[0];
                  }
                })
                .filter(Boolean)
            )
          ) as string[];
          uniqueDates.sort();

          const days = uniqueDates.map((dateStr, index) => {
            const parts = dateStr.split('-');
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = parts[1] ? monthNames[parseInt(parts[1], 10) - 1] : '';
            const day = parts[2] || '';
            return {
              date: dateStr,
              label: `Day ${index + 1}`,
              subtitle: month && day ? `${month} ${day}` : dateStr,
            };
          });

          setSummitDays(days);
          if (days.length > 0) {
            setSelectedDay(days[0].date);
          }
        } else {
          setAgenda([]);
        }
      } catch (err) {
        console.error('Failed to load agenda schedule:', err);
        setAgenda([]);
      } finally {
        setLoading(false);
      }
    }
    loadAgenda();
  }, []);

  const calculateDuration = (start: string, end: string) => {
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffMs = endDate.getTime() - startDate.getTime();
      if (isNaN(diffMs) || diffMs <= 0) return null;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
      if (hours > 0) return `${hours}h`;
      return `${minutes}m`;
    } catch {
      return null;
    }
  };

  const filteredItems = useMemo(() => {
    return agenda.filter((item) => {
      if (!item.date) return false;
      const itemDate = new Date(item.date).toISOString().split('T')[0];
      const matchesDay = selectedDay ? itemDate === selectedDay : true;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.room && item.room.name.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
      return matchesDay && matchesSearch && matchesStatus;
    });
  }, [agenda, selectedDay, searchQuery, statusFilter]);

  return (
    <main className="pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 relative z-10">
      {/* Parallax Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12 space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#002660] text-xs font-extrabold uppercase tracking-widest border border-[#d4af37]/50 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#cca730]" />
          <span>Official Council Timetable</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002660] tracking-tight leading-[1.15]">
          5-Day Council Schedule & Plenary Agenda
        </h1>

        <div className="h-1 w-20 bg-gradient-to-r from-[#002660] to-[#cca730] mx-auto rounded-full" />

        <p className="text-sm sm:text-base text-[#444650] max-w-2xl mx-auto font-medium leading-relaxed">
          Sequence of ministerial assemblies, multilateral power grid roundtables, technical hydropower study tours, and cultural gala receptions in Luang Prabang, Lao PDR.
        </p>
      </motion.div>

      {/* Day Switcher Timeline Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mb-8"
      >
        <DaySwitcher days={summitDays} selectedDay={selectedDay} onSelectDay={setSelectedDay} />
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-panel p-4 rounded-2xl border border-white/80 shadow-md mb-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#747781] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search session title, speaker, or room..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 text-xs bg-white/90 border-slate-200 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-[#4f616f] uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#cca730]" /> Status:
          </span>
          {['ALL', 'UPCOMING', 'ONGOING', 'COMPLETED'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#002660] text-white shadow-md'
                  : 'bg-white/80 hover:bg-white text-[#444650] border border-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Timeline Items */}
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-xs text-[#4f616f] glass-panel rounded-3xl p-12 max-w-xl mx-auto shadow-lg">
          <Loader2 className="w-8 h-8 animate-spin mb-3 text-[#002660]" />
          <span className="font-bold text-sm text-[#002660]">Loading Official Council Agenda...</span>
          <span className="text-xs text-[#747781] mt-1">Retrieving scheduled sessions & rooms</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-16 text-center glass-panel rounded-3xl p-10 max-w-md mx-auto shadow-lg border border-white/80"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#002660]/5 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-7 h-7 text-[#cca730]" />
          </div>
          <h3 className="font-black text-lg text-[#002660]">No sessions found</h3>
          <p className="text-xs text-[#4f616f] mt-1.5 leading-relaxed">
            No sessions match your search or filter on this date. Try selecting another day or clearing filters.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <AgendaTimelineItem
                item={item}
                duration={calculateDuration(item.startTime, item.endTime)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}
