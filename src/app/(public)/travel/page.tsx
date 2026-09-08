'use client';

import { useEffect, useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useTravelStore } from '@/store';
import { TravelRecommend, Weekday } from '@/types';
import {
  TravelModal,
  TravelFilters,
  TravelHeritageEtiquette,
  TravelGridState,
} from '@/components/travel';

export default function PublicTravelPage() {
  const { travelList, isLoading, error, fetchPublicTravel } = useTravelStore();
  const [search, setSearch] = useState('');
  const [dayFilter, setDayFilter] = useState<string | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<TravelRecommend | null>(null);

  useEffect(() => {
    fetchPublicTravel();
  }, [fetchPublicTravel]);

  const filteredTravel = useMemo(() => {
    return travelList.filter((spot) => {
      const matchesSearch =
        search.trim() === '' ||
        spot.placeName.toLowerCase().includes(search.toLowerCase()) ||
        spot.location.toLowerCase().includes(search.toLowerCase()) ||
        (spot.description && spot.description.toLowerCase().includes(search.toLowerCase()));

      let matchesDay = true;
      if (dayFilter) {
        matchesDay = !spot.openDays || spot.openDays.length === 0 || spot.openDays.includes(dayFilter as Weekday);
      }

      return matchesSearch && matchesDay;
    });
  }, [travelList, search, dayFilter]);

  return (
    <>
      <main className="flex-1 pt-36 pb-24 lg:pt-40 lg:pb-32 relative z-10">
        {/* Parallax Hero Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#002660] text-xs font-extrabold uppercase tracking-widest border border-[#d4af37]/50 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#cca730]" />
              <span>UNESCO World Heritage Destination</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002660] tracking-tight leading-[1.15]">
              Luang Prabang Regional Travel Guide
            </h1>

            <div className="h-1 w-20 bg-gradient-to-r from-[#002660] to-[#cca730] mx-auto rounded-full" />

            <p className="text-sm sm:text-base text-[#444650] max-w-2xl mx-auto font-medium leading-relaxed">
              Explore royal Buddhist monasteries, sacred Mekong river vistas, turquoise travertine cascades, and clean energy technical tours curated for 42nd HAPUA delegates.
            </p>
          </motion.div>

          {/* Travel Filters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <TravelFilters
              search={search}
              setSearch={setSearch}
              dayFilter={dayFilter}
              setDayFilter={setDayFilter}
              totalCount={filteredTravel.length}
            />
          </motion.div>
        </div>

        {/* Travel Grid Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TravelGridState
            travelList={travelList}
            filteredTravel={filteredTravel}
            isLoading={isLoading}
            error={error}
            search={search}
            onRetry={() => fetchPublicTravel()}
            onResetFilters={() => { setSearch(''); setDayFilter(null); }}
            onSelectSpot={setSelectedSpot}
          />
        </div>

        {/* Heritage Etiquette Guidelines */}
        <div className="mt-16">
          <TravelHeritageEtiquette />
        </div>
      </main>

      <TravelModal spot={selectedSpot} onClose={() => setSelectedSpot(null)} />
    </>
  );
}
