'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Landmark, ArrowRight, Sparkles, Award, Zap, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParallaxImage } from './ParallaxImage';

export function ActivitiesBento() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll tracking for bento column parallax
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

  const col1Y = useTransform(smoothProgress, [0, 1], [-25, 25]);
  const col2Y = useTransform(smoothProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative z-20 overflow-hidden"
      id="activities"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-120 h-120 bg-[#d2e5f6]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-120 h-120 bg-[#ffe088]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d2e5f6] text-[#002660] text-xs font-bold uppercase tracking-widest border border-[#b0c6ff]/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#cca730]" />
            <span>Summit Program Architecture</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-[#002660] tracking-tight"
          >
            Activities & Key Highlights
          </motion.h2>
          <div className="h-1 w-20 bg-linear-to-r from-[#002660] to-[#cca730] mx-auto rounded-full" />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#444650] max-w-2xl mx-auto leading-relaxed"
          >
           Advancing Regional Connectivity for Energy Sustainability and Security.
          </motion.p>
        </div>

        {/* Bento Grid with Column Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Bento Card 1: Plenary Assembly & Ministerial Address (Col Span 8) */}
          <motion.div
            style={{ y: col1Y }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 group relative overflow-hidden rounded-3xl glass-panel min-h-90 sm:min-h-105 shadow-2xl hover-lift border border-white/80 will-change-transform"
          >
            <ParallaxImage
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
              alt="42nd HAPUA Council Plenary Session"
              speed={16}
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#001945]/95 via-[#002660]/45 to-transparent z-10" />

            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white z-20">
              <div className="flex justify-between items-start">
                <span className="px-3.5 py-1.5 rounded-full bg-[#cca730] text-[#001945] text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Plenary Assembly</span>
                </span>
              </div>

              <div className="space-y-3 max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  42nd HAPUA Council & Related Meetings
                </h3>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  Setting binding strategic directions for ASEAN multilateral power trading, the LTMS expansion framework, and the 2026–2030 regional clean energy transition roadmap.
                </p>
                <div className="pt-2">
                  <Link href="/agenda">
                    <Button
                      size="sm"
                      className="bg-white/90 hover:bg-white text-[#002660] font-bold rounded-xl text-xs h-9 px-4 shadow-md transition-all group/btn cursor-pointer"
                    >
                      <span>View Plenary Schedule</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Cultural Visits (Col Span 4) */}
          <motion.div
            style={{ y: col2Y }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover-lift shadow-2xl border border-white/80 group will-change-transform"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#002660] to-[#1a3c7d] text-white flex items-center justify-center shadow-lg shadow-[#002660]/30">
                  <Landmark className="w-6 h-6 text-[#ffe088]" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#d2e5f6] text-[#002660] text-[11px] font-bold uppercase tracking-wider">
                  Cultural Visits
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#002660] tracking-tight">
                  Wat Xieng Thong Heritage Tour
                </h3>
                <p className="text-xs text-[#444650] leading-relaxed mt-2">
                  Exclusive cultural excursion to Luang Prabang&apos;s most iconic temple, admiring classic Lao architecture, sweeping tiered roofs, and the revered Tree of Life mosaic.
                </p>
              </div>
            </div>

            <div className="mt-6 aspect-video rounded-2xl overflow-hidden relative shadow-md">
              <ParallaxImage
                src="/images/Wat_Xieng_Thong.webp"
                alt="Wat Xieng Thong Temple"
                speed={12}
                className="w-full h-full"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-[#001945]/85 backdrop-blur-md text-[10px] font-bold text-[#ffe088] z-10">
                Wat Xieng Thong • Luang Prabang
              </div>
            </div>
          </motion.div>

          {/* Bento Card 3: HWG 1 - Generation and Renewable Energy (Col Span 4) */}
          <motion.div
            style={{ y: col1Y }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="md:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover-lift shadow-2xl border border-white/80 group will-change-transform"
          >
            <div>
              <div className="aspect-4/3 rounded-2xl overflow-hidden mb-4 relative shadow-md">
                <ParallaxImage
                  src="/images/WG1.webp"
                  alt="HWG 1: Generation and Renewable Energy"
                  speed={12}
                  className="w-full h-full"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#002660]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 z-10">
                  <Zap className="w-3 h-3 text-[#ffe088]" />
                  <span>HAPUA WG 1</span>
                </div>
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-[#001945]/85 backdrop-blur-md text-[10px] font-bold text-[#ffe088] z-10">
                  Chair: Indonesia • Vice-Chair: Lao PDR
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#d2e5f6] text-[#002660] text-[10px] font-bold uppercase tracking-wider">
                    Generation & RE
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-[#002660]">
                  HWG 1: Generation & Renewable Energy
                </h3>
                <p className="text-xs text-[#444650] leading-relaxed">
                  Exploring energy potential to ensure fuel security, supporting the APGCC study, and establishing an ASEAN-wide community of renewable generation experts.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-200/80">
              <Link
                href="/activities"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#002660] hover:text-[#cca730] transition-colors"
              >
                <span>Explore Working Group Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Bento Card 4: HWG 2 - Transmission / ASEAN Power Grid (Col Span 8) */}
          <motion.div
            style={{ y: col2Y }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="md:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 hover-lift shadow-2xl border border-white/80 group will-change-transform"
          >
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#d2e5f6] text-[#002660] text-[11px] font-extrabold uppercase tracking-wider">
                  HAPUA WG 2
                </span>
                <span className="text-xs font-semibold text-[#cca730] flex items-center gap-1">
                  <Network className="w-3.5 h-3.5" /> Grid Interconnection
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#002660] tracking-tight">
                HWG 2: Transmission / ASEAN Power Grid (APG)
              </h3>

              <p className="text-xs sm:text-sm text-[#444650] leading-relaxed">
                Accelerating the multilateral ASEAN Power Grid by harmonizing technical standards, updating the AIMS interconnection plan, and sharing advanced strategies for power system stability and performance benchmarking.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#002660] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs" title="Chair: Thailand">
                    TH
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1a3c7d] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs" title="Vice-Chair: Vietnam">
                    VN
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#3e5c9f] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs" title="Lao PDR">
                    LA
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#cca730] text-[#001945] text-[10px] font-black flex items-center justify-center border-2 border-white shadow-xs" title="All ASEAN Members">
                    +7
                  </div>
                </div>
                <div className="text-xs text-[#4f616f]">
                  <span className="font-bold text-[#002660]">Leadership:</span> Chair (Thailand) • Vice-Chair (Vietnam)
                </div>
              </div>
            </div>

            <div className="w-full sm:w-2/5 aspect-4/3 rounded-2xl overflow-hidden shadow-md shrink-0 relative">
              <ParallaxImage
                src="/images/WG2.webp"
                alt="HWG 2: Transmission and ASEAN Power Grid"
                speed={12}
                className="w-full h-full"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-[#001945]/85 backdrop-blur-md text-[10px] font-bold text-[#ffe088] z-10">
                APG Interconnection • AIMS
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
