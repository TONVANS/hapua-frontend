'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useHotelStore } from '@/store';
import { Hotel } from '@/types';
import {
  HotelModal,
  HotelFilters,
  HotelGridState,
} from '@/components/hotels';

export default function PublicHotelsPage() {
  const { hotels, isLoading, error, fetchPublicHotels } = useHotelStore();
  const [search, setSearch] = useState('');
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    fetchPublicHotels();
  }, [fetchPublicHotels]);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchesSearch =
        search.trim() === '' ||
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        hotel.address.toLowerCase().includes(search.toLowerCase()) ||
        (hotel.description && hotel.description.toLowerCase().includes(search.toLowerCase()));
      const matchesStar = starFilter === null || (hotel.starRating || 0) >= starFilter;
      return matchesSearch && matchesStar;
    });
  }, [hotels, search, starFilter]);

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
              <span>Official Hospitality & Partner Lodging</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002660] tracking-tight leading-[1.15]">
              Recommended Accommodations
            </h1>

            <div className="h-1 w-20 bg-linear-to-r from-[#002660] to-[#cca730] mx-auto rounded-full" />

            <p className="text-sm sm:text-base text-[#444650] max-w-2xl mx-auto font-medium leading-relaxed">
              Curated luxury resorts, heritage boutique villas, and executive suites partnered with the 42nd HAPUA Council Meeting in Luang Prabang, complete with dedicated delegation shuttles.
            </p>
          </motion.div>

          {/* Hotel Filters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <HotelFilters
              search={search}
              setSearch={setSearch}
              starFilter={starFilter}
              setStarFilter={setStarFilter}
              totalCount={filteredHotels.length}
            />
          </motion.div>
        </div>

        {/* Hotel Grid Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HotelGridState
            hotels={hotels}
            filteredHotels={filteredHotels}
            isLoading={isLoading}
            error={error}
            search={search}
            onRetry={() => fetchPublicHotels()}
            onResetFilters={() => { setSearch(''); setStarFilter(null); }}
            onSelectHotel={setSelectedHotel}
          />
        </div>

        {/* VIP Hospitality Protocol Banner */}
        {/* <div className="mt-16">
          <HotelVipBanner />
        </div> */}
      </main>

      <HotelModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
    </>
  );
}
