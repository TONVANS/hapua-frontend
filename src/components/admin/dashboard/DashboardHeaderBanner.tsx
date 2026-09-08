import React from 'react';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderBannerProps {
  refreshing: boolean;
  onRefresh: () => void;
}

export function DashboardHeaderBanner({ refreshing, onRefresh }: DashboardHeaderBannerProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#002660] to-[#1a3c7d] text-white p-6 sm:p-8 rounded-2xl shadow-lg shadow-[#002660]/15 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-80 h-full bg-white/5 skew-x-12 pointer-events-none" />
      <div className="space-y-1 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-[#ffe088] font-medium mb-1 backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>42nd HAPUA Council Meeting Executive Portal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Executive Dashboard</h2>
        <p className="text-sm text-white/80 max-w-xl">
          Real-time event logistics, registration metrics, and summit session status in Luang Prabang.
        </p>
      </div>
      <div className="flex items-center gap-3 relative z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={refreshing}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs rounded-xl cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Link href="/admin/delegations">
          <Button
            size="sm"
            className="bg-[#d4af37] hover:bg-[#cca730] text-[#001945] font-semibold text-xs rounded-xl shadow-md cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
            New Delegate
          </Button>
        </Link>
      </div>
    </div>
  );
}
