import React from 'react';
import Link from 'next/link';
import { Users, CalendarDays, TrendingUp, Hotel, ArrowUpRight } from 'lucide-react';

export function OperationalShortcuts() {
  return (
    <div className="lg:col-span-4 space-y-4">
      <div>
        <h3 className="font-bold text-lg text-[#002660]">Operational Tools</h3>
        <p className="text-xs text-[#4f616f]">Quick shortcuts for secretariat staff</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Link href="/admin/delegations">
          <div className="p-4 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#002660]/30 hover:bg-[#f7f9fb] transition-all flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#002660] text-white flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#191c1e] group-hover:text-[#002660]">
                  Manage Delegations
                </p>
                <p className="text-[11px] text-[#747781]">Add, edit, and issue badges</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#747781] group-hover:text-[#002660]" />
          </div>
        </Link>

        <Link href="/admin/activities">
          <div className="p-4 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#002660]/30 hover:bg-[#f7f9fb] transition-all flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#cca730] text-[#001945] flex items-center justify-center">
                <CalendarDays className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#191c1e] group-hover:text-[#002660]">
                  Schedule Sessions
                </p>
                <p className="text-[11px] text-[#747781]">Configure agendas & rooms</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#747781] group-hover:text-[#002660]" />
          </div>
        </Link>

        <Link href="/admin/gallery">
          <div className="p-4 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#002660]/30 hover:bg-[#f7f9fb] transition-all flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#4f616f] text-white flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#191c1e] group-hover:text-[#002660]">
                  Media & Press
                </p>
                <p className="text-[11px] text-[#747781]">Upload gallery photos & videos</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#747781] group-hover:text-[#002660]" />
          </div>
        </Link>

        <Link href="/admin/hotels">
          <div className="p-4 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#002660]/30 hover:bg-[#f7f9fb] transition-all flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1a3c7d] text-white flex items-center justify-center">
                <Hotel className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#191c1e] group-hover:text-[#002660]">
                  Hospitality Guide
                </p>
                <p className="text-[11px] text-[#747781]">Manage hotel partnerships</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#747781] group-hover:text-[#002660]" />
          </div>
        </Link>
      </div>
    </div>
  );
}
