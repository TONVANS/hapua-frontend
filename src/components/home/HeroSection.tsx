'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import {
  Sparkles,
  Users,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Globe2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  stats: {
    memberStates: number;
    accreditedDelegates: number;
    powerUtilities: number;
    eventDays: number;
  };
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function HeroSection({ stats }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Multi-tier scroll parallax tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Ultra-responsive spring physics with low inertia lag for silky smooth 60/120fps motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.12,
    restDelta: 0.0001,
  });

  // Harmonious multi-depth parallax transformations
  const bgY = useTransform(smoothProgress, [0, 1], ['0%', '16%']);
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.08]);
  const leftContentY = useTransform(smoothProgress, [0, 1], [0, -35]);
  const rightCardY = useTransform(smoothProgress, [0, 1], [0, -22]);
  const rightCardRotateX = useTransform(smoothProgress, [0, 1], [0, 4.5]);
  const rightCardRotateY = useTransform(smoothProgress, [0, 1], [0, -2.5]);
  const floatingBadgeY = useTransform(smoothProgress, [0, 1], [0, -55]);
  const statsY = useTransform(smoothProgress, [0, 1], [0, -15]);
  const opacityFade = useTransform(smoothProgress, [0, 0.7, 1], [1, 0.85, 0]);

  // Real-time Countdown to September 21, 2026 08:30:00 (Lao PDR UTC+7)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-09-21T08:30:00+07:00').getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[94vh] pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden flex flex-col justify-between"
    >
      {/* 1. Deep Parallax Background Layer (Images & Light) */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-30 pointer-events-none overflow-hidden will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f9fb]/75 via-[#f7f9fb]/40 to-[#f7f9fb] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001945]/35 via-transparent to-[#002660]/25 z-10" />
        <img
          src="/images/background1.webp"
          alt="Luang Prabang Heritage Valley"
          className="w-full h-full object-cover object-center blur-[1px] opacity-80"
        />
      </motion.div>

      {/* 2. Atmospheric Luminous Flares */}
      <div className="absolute top-20 left-1/4 w-[420px] h-[420px] bg-gradient-to-br from-[#ffe088]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-20 animate-pulse duration-1000" />
      <div className="absolute top-44 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-[#8ca9f1]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-20" />

      {/* 3. Main Hero Container with Multi-Plane Depth */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Official Branding & Summit Details (Translates Up on Scroll) */}
          <motion.div
            style={{ y: leftContentY }}
            className="flex-1 text-center lg:text-left space-y-7 will-change-transform"
          >
            {/* Host Ribbon & Official Summit Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#002660] text-xs font-extrabold uppercase tracking-widest border border-[#d4af37]/50 shadow-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cca730] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
                </span>
                <span>HAPUA MEETING 2026</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#002660]/90 text-[#ffe088] text-[11px] font-bold tracking-wide border border-[#cca730]/40 shadow-xs">
                <Building2 className="w-3 h-3 text-[#ffe088]" />
                <span>Host: Electricité du Laos (EDL)</span>
              </div>
            </motion.div>

            {/* Official Summit Logo + Grand Title */}
            <div className="space-y-4 sm:space-y-5">
              {/* Clean Official Summit Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center lg:items-start gap-3"
              >
                <div className="relative group cursor-pointer inline-block">
                  <img
                    src="/images/hapua_logo.webp"
                    alt="HAPUA - Heads of ASEAN Power Utilities / Authorities"
                    className="h-11 sm:h-13 md:h-14 lg:h-16 w-auto object-contain drop-shadow-[0_3px_10px_rgba(0,38,96,0.10)] transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Distinct High-Contrast Underline Divider */}
                <div className="flex items-center justify-center lg:justify-start gap-2 w-full max-w-[260px] sm:max-w-[320px] pt-1">
                  <div className="h-1 sm:h-[4.5px] w-20 sm:w-28 rounded-full bg-gradient-to-r from-[#cca730] via-[#e5c158] to-[#d4af37] shadow-sm shadow-[#cca730]/40" />
                  <div className="h-1 sm:h-[3.5px] w-6 sm:w-8 rounded-full bg-[#002660]" />
                  <div className="h-[2.5px] sm:h-[3px] flex-1 rounded-full bg-gradient-to-r from-[#002660]/70 via-[#002660]/30 to-transparent" />
                  <span className="w-2 h-2 rounded-full bg-[#cca730] ring-2 ring-white shadow-xs shrink-0" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002660] tracking-tight leading-[1.08]"
              >
                THE 42<sup className="text-xl sm:text-xl text-[#cca730]">ND</sup> HAPUA <br />
                <span className="bg-gradient-to-r from-[#002660] via-[#1a3c7d] to-[#cca730] bg-clip-text text-transparent">
                  COUNCIL & RELATED MEETINGS
                </span>
              </motion.h1>
            </div>

            {/* Destination & Mission Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#002660] backdrop-blur-md px-4 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
                <MapPin className="w-4 h-4 text-[#cca730]" />
                <span>LUANG PRABANG, LAO PDR</span>
                <span className="text-slate-300">•</span>
                <Calendar className="w-4 h-4 text-[#cca730]" />
                <span>21<sup>ST</sup> - 25<sup>TH</sup> SEP 2026</span>
              </div>

            </motion.div>

            {/* Live Countdown Counter Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="bg-white/85 backdrop-blur-xl p-4 rounded-2xl border border-[#cca730]/40 shadow-lg shadow-[#002660]/5 max-w-md mx-auto lg:mx-0"
            >
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100 text-xs text-[#4f616f]">
                <span className="flex items-center gap-1.5 font-bold text-[#002660] uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-[#cca730]" />
                  Opening Ceremony Countdown
                </span>
                <span className="text-[11px] font-semibold text-[#cca730]">
                  Sep 21, 2026 • 08:30 AM
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#f7f9fb] p-2 rounded-xl border border-slate-200">
                  <div className="text-xl sm:text-2xl font-black text-[#002660]">
                    {timeLeft.days}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#4f616f]">Days</div>
                </div>
                <div className="bg-[#f7f9fb] p-2 rounded-xl border border-slate-200">
                  <div className="text-xl sm:text-2xl font-black text-[#002660]">
                    {timeLeft.hours}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#4f616f]">Hours</div>
                </div>
                <div className="bg-[#f7f9fb] p-2 rounded-xl border border-slate-200">
                  <div className="text-xl sm:text-2xl font-black text-[#002660]">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#4f616f]">Mins</div>
                </div>
                <div className="bg-[#f7f9fb] p-2 rounded-xl border border-slate-200">
                  <div className="text-xl sm:text-2xl font-black text-[#cca730]">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#4f616f]">Secs</div>
                </div>
              </div>
            </motion.div>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-1"
            >
              <Link href="/activities#register">
                <Button
                  size="lg"
                  className="h-12 sm:h-13 px-8 bg-gradient-to-r from-[#002660] to-[#1a3c7d] hover:from-[#001945] hover:to-[#002660] text-white rounded-2xl font-extrabold shadow-xl shadow-[#002660]/30 hover:shadow-2xl hover:shadow-[#002660]/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm cursor-pointer border border-[#d4af37]/40 flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-[#ffe088]" />
                  <span>Accredited Delegate Check-In</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/agenda">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 sm:h-13 px-7 bg-white/80 hover:bg-white text-[#002660] border-slate-300 hover:border-[#002660] rounded-2xl font-bold transition-all duration-300 text-sm cursor-pointer shadow-sm flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#002660]" />
                  <span>Explore Council Agenda</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Parallax Visual Card */}
          <motion.div
            style={{
              y: rightCardY,
              rotateX: rightCardRotateX,
              rotateY: rightCardRotateY,
              transformPerspective: 1200,
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 relative w-full max-w-lg lg:max-w-none will-change-transform transform-gpu"
          >
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 group transition-transform duration-500 hover:scale-[1.01]">
              <img
                src="/images/welcome.webp"
                alt="Luang Prabang Summit Venue"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-linear-to-t from-[#001945]/95 via-[#002660]/40 to-transparent flex flex-col justify-between p-6 sm:p-8">
                {/* Top Badge */}
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#002660] text-xs font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5 border border-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#cca730]" />
                    <span>Official Venue</span>
                  </span>

                  <span className="px-3 py-1 rounded-full bg-[#cca730]/90 backdrop-blur-md text-[#001945] text-xs font-black uppercase tracking-wider shadow-md">
                    Lao PDR 2026
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="text-white space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#ffe088] uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Luang Prabang Convention Hall</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-6">
                    Advancing Regional Connectivity for Energy Sustainability and Security.
                  </h3>
                </div>
              </div>
            </div>

            {/* Floating Info Pill Over Card (Layered Parallax + Micro-Float) */}
            <motion.div
              style={{ y: floatingBadgeY }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-[#cca730]/40 shadow-2xl flex items-center gap-3 will-change-transform transform-gpu"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#cca730] to-[#947118] text-white flex items-center justify-center font-bold shadow-md shrink-0 animate-pulse">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#cca730] block">
                  Regional Initiative
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#002660]">
                  ASEAN Power Grid (APG)
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* 4. Dynamic Key Summit Stats Banner with Smooth Elevation */}
      <motion.div
        style={{ y: statsY }}
        className="mt-16 lg:mt-20 py-8 relative z-20 will-change-transform transform-gpu"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-panel p-6 rounded-3xl border border-white/80 shadow-lg text-center hover-lift relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#cca730] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-3xl sm:text-4xl font-black text-[#002660]">
                {stats.memberStates}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#4f616f] mt-1">
                ASEAN Member States
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-panel p-6 rounded-3xl border border-white/80 shadow-lg text-center hover-lift relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#cca730] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-3xl sm:text-4xl font-black text-[#002660]">
                {stats.accreditedDelegates}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#4f616f] mt-1">
                Accredited Delegates
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-panel p-6 rounded-3xl border border-white/80 shadow-lg text-center hover-lift relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#cca730] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-3xl sm:text-4xl font-black text-[#002660]">
                {stats.powerUtilities}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#4f616f] mt-1">
                Power Utilities & Observers
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-panel p-6 rounded-3xl border border-white/80 shadow-lg text-center hover-lift relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#cca730] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-3xl sm:text-4xl font-black text-[#002660]">
                {stats.eventDays} Days
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#4f616f] mt-1">
                Plenary & Cultural Visits
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
