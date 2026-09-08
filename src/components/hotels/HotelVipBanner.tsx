import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HotelVipBanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
      <div className="glass-modal p-8 sm:p-12 rounded-3xl border border-white/80 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe088]/30 text-[#735c00] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> VIP Protocol Note
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002660] tracking-tight">
            Complimentary Delegation Transfers
          </h2>
          <p className="text-xs sm:text-sm text-[#444650] leading-relaxed">
            All accredited delegates staying at official partner hotels receive scheduled VIP shuttle transport between their accommodation and the Luang Prabang International Convention Center.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Link href="/activities#register">
            <Button className="h-11 px-6 bg-[#002660] hover:bg-[#1a3c7d] text-white rounded-xl font-bold text-xs shadow-lg shadow-[#002660]/20 cursor-pointer">
              Verify Delegate Code
            </Button>
          </Link>
          <Link href="/agenda">
            <Button variant="outline" className="h-11 px-6 glass-panel text-[#002660] border-[#002660]/30 rounded-xl font-bold text-xs cursor-pointer">
              Summit Schedule
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
