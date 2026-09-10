'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ParallaxFloatingOrbs() {
  const { scrollYProgress } = useScroll();

  // Multi-tier scroll depth translation
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 450]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -380]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const orb4Y = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const gridRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const particleY = useTransform(scrollYProgress, [0, 1], [0, -650]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-30 overflow-hidden">
      {/* Mobile-optimized lightweight static ambient backdrop */}
      <div className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] -right-20 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-2xl" />
        <div className="absolute top-[45%] -left-20 w-72 h-72 bg-[#002660]/10 rounded-full blur-2xl" />
        <div className="absolute top-[75%] -right-20 w-72 h-72 bg-[#cca730]/8 rounded-full blur-2xl" />
      </div>

      {/* Desktop Multi-tier dynamic parallax constellation */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">
        {/* 1. Floating Luminous Gold Sphere 1 (Top-Right -> Bottom) */}
        <motion.div
          style={{ y: orb1Y }}
          className="absolute top-[12%] -right-32 w-[600px] h-[600px] bg-gradient-to-br from-[#d4af37]/15 via-[#ffe088]/8 to-transparent rounded-full blur-3xl opacity-80 will-change-transform transform-gpu"
        />

        {/* 2. Floating Royal Sapphire Sphere 2 (Mid-Left -> Up) */}
        <motion.div
          style={{ y: orb2Y }}
          className="absolute top-[45%] -left-36 w-[650px] h-[650px] bg-gradient-to-tr from-[#002660]/15 via-[#1a3c7d]/8 to-transparent rounded-full blur-3xl opacity-80 will-change-transform transform-gpu"
        />

        {/* 3. Deep Gold Accent Sphere 3 (Lower-Right -> Down) */}
        <motion.div
          style={{ y: orb3Y }}
          className="absolute top-[65%] -right-28 w-[550px] h-[550px] bg-gradient-to-bl from-[#cca730]/12 via-[#ffe088]/5 to-transparent rounded-full blur-3xl opacity-70 will-change-transform transform-gpu"
        />

        {/* 4. Deep Navy Aura Sphere 4 (Bottom-Left -> Up) */}
        <motion.div
          style={{ y: orb4Y }}
          className="absolute top-[85%] -left-28 w-[600px] h-[600px] bg-gradient-to-tr from-[#001945]/15 to-transparent rounded-full blur-3xl opacity-75 will-change-transform transform-gpu"
        />

        {/* 5. Geometric Energy Grid Constellation Layer */}
        <motion.div
          style={{ y: gridY, rotate: gridRotate }}
          className="absolute top-[25%] right-[5%] w-[450px] h-[450px] opacity-[0.06] border border-[#002660] rounded-full [background-image:radial-gradient(#cca730_1.5px,transparent_1.5px)] [background-size:28px_28px] will-change-transform transform-gpu"
        />

        <motion.div
          style={{ y: particleY }}
          className="absolute top-[70%] left-[8%] w-[380px] h-[380px] opacity-[0.05] border border-[#cca730] rounded-full [background-image:radial-gradient(#002660_1.5px,transparent_1.5px)] [background-size:24px_24px] will-change-transform transform-gpu"
        />

        {/* 6. Subtle Floating Diamond Crystal Nodes */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -320]) }}
          className="absolute top-[35%] right-[18%] w-3 h-3 bg-[#d4af37]/40 rotate-45 rounded-xs shadow-sm blur-[0.5px] will-change-transform transform-gpu"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 480]) }}
          className="absolute top-[55%] left-[15%] w-4 h-4 bg-[#002660]/30 rotate-45 rounded-xs shadow-sm blur-[0.5px] will-change-transform transform-gpu"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -420]) }}
          className="absolute top-[78%] right-[12%] w-3.5 h-3.5 bg-[#cca730]/35 rotate-45 rounded-xs shadow-sm blur-[0.5px] will-change-transform transform-gpu"
        />
      </div>
    </div>
  );
}
