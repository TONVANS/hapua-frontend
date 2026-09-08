'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Zap, Cpu, Users, FileSpreadsheet, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface WorkingGroup {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  keyInitiatives: string[];
  leadUtility: string;
  focusArea: string;
}

const WORKING_GROUPS: WorkingGroup[] = [
  {
    id: 'wg1',
    number: 'WG 1',
    title: 'Generation & Renewable Energy Integration',
    shortDesc: 'Advancing regional decarbonization, hydropower optimization, and high-penetration solar/wind integration.',
    icon: Zap,
    keyInitiatives: [
      'ASEAN Renewable Energy Target roadmap alignment',
      'Hydropower reservoir dispatch and cross-border balancing',
      'Battery Energy Storage Systems (BESS) feasibility benchmarks',
    ],
    leadUtility: 'EDL / EGAT',
    focusArea: 'Clean Power Transition',
  },
  {
    id: 'wg2',
    number: 'WG 2',
    title: 'Transmission & ASEAN Power Grid (APG)',
    shortDesc: 'Establishing multilateral cross-border interconnectors and synchronized regional grid stability standards.',
    icon: Network,
    keyInitiatives: [
      'Lao PDR-Thailand-Malaysia-Singapore (LTMS-PIP) multilateral expansion',
      'Regional Grid Code standardization and HVDC interconnection',
      'Real-time frequency stability and automated dynamic line rating',
    ],
    leadUtility: 'TNB / SP Group',
    focusArea: 'Regional Grid Interconnection',
  },
  {
    id: 'wg3',
    number: 'WG 3',
    title: 'Distribution & Smart Grid Modernization',
    shortDesc: 'Deploying AI-driven automated dispatch, advanced metering infrastructure (AMI), and EV charging networks.',
    icon: Cpu,
    keyInitiatives: [
      'Digital twin distribution network modeling',
      'V2G (Vehicle-to-Grid) grid integration standards',
      'Microgrid resilience for isolated ASEAN archipelagos',
    ],
    leadUtility: 'PLN / Meralco',
    focusArea: 'Grid Digitalization',
  },
  {
    id: 'wg4',
    number: 'WG 4',
    title: 'Strategic Human Resource Development',
    shortDesc: 'Nurturing technical leadership, certified energy engineers, and cross-utility capacity exchange programs.',
    icon: Users,
    keyInitiatives: [
      'HAPUA Regional Training Institute accredited curriculums',
      'Cross-border engineer exchange and technical fellowships',
      'Next-Gen energy analytics & cybersecurity certifications',
    ],
    leadUtility: 'EVN / NPC',
    focusArea: 'Human Capital',
  },
  {
    id: 'wg5',
    number: 'WG 5',
    title: 'Power Trade, Policy & Regulatory Harmonization',
    shortDesc: 'Formulating legal frameworks, cross-border wheeling tariffs, and ASEAN multilateral market mechanisms.',
    icon: FileSpreadsheet,
    keyInitiatives: [
      'Multilateral power trading rules and dispute resolution',
      'Harmonized cross-border wheeling tariff structures',
      'Green energy certificate (REC) multilateral trading platform',
    ],
    leadUtility: 'ASEAN Secretariat / HAPUA',
    focusArea: 'Multilateral Trading',
  },
];

export function WorkingGroupsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const currentWG = WORKING_GROUPS[activeTab];
  const IconComponent = currentWG.icon;

  return (
    <section className="py-24 relative z-20 overflow-hidden" id="working-groups">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#002660]/5 via-[#cca730]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d2e5f6] text-[#002660] text-xs font-bold uppercase tracking-widest border border-[#b0c6ff]/40"
          >
            <span>HAPUA Governance & Strategic Pillars</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-[#002660] tracking-tight"
          >
            5 Strategic Working Groups
          </motion.h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#002660] to-[#cca730] mx-auto rounded-full" />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#444650] max-w-2xl mx-auto leading-relaxed"
          >
            Specialized council bodies drafting resolutions, multilateral grid treaties, and regional clean energy roadmaps during the 42nd Council Meeting.
          </motion.p>
        </div>

        {/* WG Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {WORKING_GROUPS.map((wg, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={wg.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#002660] text-white shadow-xl shadow-[#002660]/25 border border-[#cca730]/50'
                    : 'bg-white/80 hover:bg-white text-[#444650] hover:text-[#002660] border border-slate-200/80 shadow-xs'
                }`}
              >
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                    isSelected ? 'bg-[#d4af37] text-[#001945]' : 'bg-[#d2e5f6] text-[#002660]'
                  }`}
                >
                  {wg.number}
                </span>
                <span>{wg.focusArea}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Working Group Card with Animated Presence */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWG.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/80 shadow-2xl relative overflow-hidden"
            >
              {/* Corner decorative shimmer */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#ffe088]/20 via-[#d2e5f6]/10 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#002660] to-[#1a3c7d] flex items-center justify-center text-white shadow-lg shadow-[#002660]/30 shrink-0">
                    <IconComponent className="w-7 h-7 text-[#ffe088]" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#cca730]">
                      {currentWG.number} • Strategic Council Track
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#002660] tracking-tight">
                      {currentWG.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#f7f9fb] px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs text-[#4f616f]">
                  <span className="font-bold text-[#002660]">Lead Coordinators:</span>
                  <span>{currentWG.leadUtility}</span>
                </div>
              </div>

              <div className="pt-6 space-y-6">
                <p className="text-sm sm:text-base text-[#444650] leading-relaxed font-medium">
                  {currentWG.shortDesc}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#002660]">
                    Key 42nd Council Directives & Agenda Items
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentWG.keyInitiatives.map((item, i) => (
                      <div
                        key={i}
                        className="bg-white/90 p-4 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#cca730] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#191c1e] font-semibold leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/80">
                  <span className="text-xs text-[#4f616f]">
                    Deliberations scheduled during Plenary Sessions 1 & 2 (Sep 1–2, 2026).
                  </span>
                  <Link href="/agenda">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-[#002660]/30 text-[#002660] hover:bg-[#002660] hover:text-white font-bold text-xs h-9 px-4 transition-all group cursor-pointer"
                    >
                      <span>Review Working Group Schedule</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
