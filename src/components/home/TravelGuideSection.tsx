'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Compass, MapPin, Plane, CheckCircle2, ChevronRight, Sparkles, Shield, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TravelRecommend } from '@/types';
import { ParallaxImage } from './ParallaxImage';

interface TravelGuideSectionProps {
  travelSpots: TravelRecommend[];
  loading: boolean;
}

export function TravelGuideSection({ travelSpots, loading }: TravelGuideSectionProps) {
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

  const spot1Y = useTransform(smoothProgress, [0, 1], [-20, 20]);
  const spot2Y = useTransform(smoothProgress, [0, 1], [0, 0]);
  const vipCardY = useTransform(smoothProgress, [0, 1], [25, -25]);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative z-20 overflow-hidden"
      id="travel"
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
              <Sparkles className="w-3.5 h-3.5 text-[#cca730]" />
              <span>UNESCO World Heritage Destination</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-[#002660] tracking-tight"
            >
              Luang Prabang Travel & Culture Guide
            </motion.h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#002660] to-[#cca730] rounded-full" />
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-[#444650] max-w-xl leading-relaxed"
            >
              Experience iconic ancient Buddhist monasteries, sacred Pak Ou Caves, cascading Kuang Si waterfalls, and royal Lao culinary traditions.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/travel">
              <Button
                variant="outline"
                className="glass-panel text-[#002660] border-[#002660]/30 hover:bg-[#002660] hover:text-white rounded-2xl font-bold text-xs h-12 px-6 transition-all group shadow-sm cursor-pointer"
              >
                <span>View Full Travel Guide</span>
                <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Content Grid */}
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
            {travelSpots.map((spot, idx) => (
              <motion.div
                key={spot.id}
                style={{ y: idx === 0 ? spot1Y : spot2Y }}
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
                        spot.coverImage ||
                        'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={spot.placeName}
                      speed={14}
                      className="w-full h-full"
                    />
                    <div className="absolute top-3 left-3 bg-[#001945]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black text-white shadow-md flex items-center gap-1.5 border border-white/30 z-10">
                      <Compass className="w-3.5 h-3.5 text-[#ffe088]" />
                      <span>Heritage Landmark</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-3">
                    <h3 className="text-xl font-extrabold text-[#002660] leading-snug group-hover:text-[#1a3c7d] transition-colors">
                      {spot.placeName}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#444650] line-clamp-2 leading-relaxed">
                      {spot.description || spot.location}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-medium text-[#4f616f] pt-2 border-t border-slate-100">
                      <MapPin className="w-3.5 h-3.5 text-[#cca730] shrink-0" />
                      <span className="truncate">{spot.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-0">
                  <Link href="/travel" className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full text-xs font-extrabold border-[#002660]/25 text-[#002660] hover:bg-[#002660] hover:text-white rounded-xl h-11 transition-all cursor-pointer shadow-xs"
                    >
                      <span>Explore Destination Details</span>
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* VIP Travel & Visa Protocol Card with Parallax Elevation */}
            <motion.div
              style={{ y: vipCardY }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-3xl border border-white/80 glass-panel p-6 sm:p-8 flex flex-col justify-between hover-lift shadow-2xl relative overflow-hidden will-change-transform"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#002660] to-[#1a3c7d] text-white flex items-center justify-center shadow-lg shadow-[#002660]/30">
                    <Plane className="w-6 h-6 text-[#ffe088]" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#d2e5f6] text-[#002660] text-[11px] font-bold uppercase tracking-wider">
                    VIP Protocol
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-[#002660] tracking-tight">
                  VIP Travel & Diplomatic Support
                </h3>

                <ul className="space-y-3.5 text-xs sm:text-sm text-[#444650] pt-1">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#cca730] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#002660]">Airport VIP Fast-Track:</strong> Dedicated summit reception desk & private luxury shuttle at LPQ International.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-[#cca730] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#002660]">Diplomatic Visa Support:</strong> Expedited clearance for accredited delegates and ministerial delegations.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Wifi className="w-4 h-4 text-[#cca730] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#002660]">5G Unlimited Connectivity:</strong> Complimentary summit eSIM package provided upon check-in.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <Link href="/travel">
                  <Button className="w-full text-xs font-extrabold bg-[#002660] hover:bg-[#1a3c7d] text-white rounded-xl h-11 transition-all cursor-pointer shadow-md">
                    <span>View Visa & Arrival Guide</span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
