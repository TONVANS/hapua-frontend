'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Users, Calendar, ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CallToActionSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.12,
    restDelta: 0.0001,
  });

  const cardScale = useTransform(smoothProgress, [0, 1], [0.93, 1]);
  const flareScale = useTransform(smoothProgress, [0, 1], [0.85, 1.4]);
  const cardY = useTransform(smoothProgress, [0, 1], [40, 0]);

  return (
    <section
      ref={containerRef}
      className="py-28 relative z-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          style={{ scale: cardScale, y: cardY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-modal p-8 sm:p-14 lg:p-16 rounded-3xl border-2 border-white/90 shadow-2xl relative overflow-hidden space-y-7 will-change-transform"
        >
          {/* Dynamic Parallax Ambient Flares */}
          <motion.div
            style={{ scale: flareScale }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-[#d4af37]/35 via-[#ffe088]/20 to-transparent rounded-full blur-3xl opacity-75 pointer-events-none will-change-transform"
          />
          <motion.div
            style={{ scale: flareScale }}
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-[#1a3c7d]/35 via-[#002660]/20 to-transparent rounded-full blur-3xl opacity-75 pointer-events-none will-change-transform"
          />

          {/* Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 text-[#002660] text-xs font-extrabold uppercase tracking-widest border border-[#d4af37]/50 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#cca730]" />
            <span>Accredited Ministerial & Utility Delegation Pass</span>
          </div>

          {/* Heading */}
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002660] tracking-tight leading-[1.15]">
              Confirm Your Delegation Presence at the <br />
              <span className="bg-gradient-to-r from-[#002660] via-[#1a3c7d] to-[#cca730] bg-clip-text text-transparent">
                42nd HAPUA Council Meeting
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#444650] max-w-2xl mx-auto font-medium leading-relaxed">
              Join Southeast Asia&apos;s utility leaders, energy ministers, and international observers in Luang Prabang to shape the ASEAN interconnected clean power grid.
            </p>
          </div>

          {/* Host utility note */}
          <div className="relative z-10 flex items-center justify-center gap-2 text-xs font-bold text-[#735c00] bg-[#ffe088]/30 px-4 py-2 rounded-xl w-fit mx-auto border border-[#cca730]/40">
            <Building2 className="w-4 h-4 text-[#735c00]" />
            <span>Hosted by Electricité du Laos (EDL) • 21 - 25 Sep, 2026</span>
          </div>

          {/* Action CTAs */}
          <div className="relative z-10 flex flex-wrap gap-4 justify-center pt-2">
            <Link href="/activities">
              <Button
                size="lg"
                className="h-13 px-8 bg-gradient-to-r from-[#002660] to-[#1a3c7d] hover:from-[#001945] hover:to-[#002660] text-white rounded-2xl font-extrabold shadow-xl shadow-[#002660]/30 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm cursor-pointer border border-[#d4af37]/40 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#ffe088]" />
                <span>Verify Delegation Code</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/agenda">
              <Button
                size="lg"
                variant="outline"
                className="h-13 px-8 glass-panel text-[#002660] border-slate-300 hover:border-[#002660] hover:bg-white rounded-2xl font-extrabold text-sm transition-all cursor-pointer shadow-sm flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#002660]" />
                <span>Explore Full 5-Day Agenda</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
