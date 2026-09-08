'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Star, Bed, Wifi, ChevronRight, Bus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hotel } from '@/types';
import { ParallaxImage } from './ParallaxImage';

interface FeaturedHotelsSectionProps {
  hotels: Hotel[];
  loading: boolean;
}

export function FeaturedHotelsSection({ hotels, loading }: FeaturedHotelsSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.12,
    restDelta: 0.0001,
  });

  const card1Y = useTransform(smoothProgress, [0, 1], [-20, 20]);
  const card2Y = useTransform(smoothProgress, [0, 1], [0, 0]);
  const card3Y = useTransform(smoothProgress, [0, 1], [20, -20]);

  const cardYTransforms = [card1Y, card2Y, card3Y];

  return (
    <section
      ref={sectionRef}
      className="py-24 relative z-20 overflow-hidden"
      id="hotels"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d2e5f6] text-[#002660] text-xs font-bold uppercase tracking-widest border border-[#b0c6ff]/40"
            >
              <span>Official Hospitality Protocol</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-[#002660] tracking-tight"
            >
              Recommended Accommodations
            </motion.h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#002660] to-[#cca730] rounded-full" />
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-[#444650] max-w-xl leading-relaxed"
            >
              Partner luxury resorts and boutique heritage hotels offering complimentary summit shuttle transfers to the main convention center.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/hotels">
              <Button
                variant="outline"
                className="glass-panel text-[#002660] border-[#002660]/30 hover:bg-[#002660] hover:text-white rounded-2xl font-bold text-xs h-12 px-6 transition-all group shadow-sm cursor-pointer"
              >
                <span>View All Accommodations</span>
                <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-slate-200 bg-white/80 p-5 space-y-4 animate-pulse shadow-sm"
              >
                <div className="aspect-4/3 bg-slate-200 rounded-2xl" />
                <div className="h-6 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
                <div className="h-10 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hotels.map((hotel, idx) => (
              <motion.div
                key={hotel.id}
                style={{ y: cardYTransforms[idx % 3] }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-3xl border border-white/80 bg-white/90 backdrop-blur-xl overflow-hidden shadow-2xl hover-lift flex flex-col justify-between will-change-transform"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    <ParallaxImage
                      src={
                        hotel.coverImage ||
                        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={hotel.name}
                      speed={14}
                      className="w-full h-full"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black text-[#002660] shadow-md flex items-center gap-1.5 border border-white z-10">
                      <Star className="w-3.5 h-3.5 fill-[#cca730] text-[#cca730]" />
                      <span>{hotel.starRating || 5}-Star Luxury</span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-[#001945]/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-xs flex items-center gap-1.5 z-10">
                      <Bus className="w-3.5 h-3.5 text-[#ffe088]" />
                      <span>Summit Shuttle Included</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-3">
                    <h3 className="text-xl font-extrabold text-[#002660] leading-snug group-hover:text-[#1a3c7d] transition-colors">
                      {hotel.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#444650] line-clamp-2 leading-relaxed">
                      {hotel.description || hotel.address}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-[#4f616f] pt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#cca730] shrink-0" />
                      <span className="truncate">{hotel.address}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold text-[#002660] pt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-[#cca730]" /> Partner Suite
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Wifi className="w-4 h-4 text-[#cca730]" /> High-Speed WiFi
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-0">
                  <Link href="/hotels" className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full text-xs font-extrabold border-[#002660]/25 text-[#002660] hover:bg-[#002660] hover:text-white rounded-xl h-11 transition-all cursor-pointer shadow-xs"
                    >
                      <span>Explore Hotel & Booking Details</span>
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
