import React from 'react';
import { Compass, Plus, Search, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ALL_WEEKDAYS } from './utils';

interface TravelHeaderBarProps {
  search: string;
  setSearch: (val: string) => void;
  selectedDayFilter: string;
  setSelectedDayFilter: (val: string) => void;
  loading: boolean;
  onRefresh: () => void;
  onOpenCreate: () => void;
}

export function TravelHeaderBar({
  search,
  setSearch,
  selectedDayFilter,
  setSelectedDayFilter,
  loading,
  onRefresh,
  onOpenCreate,
}: TravelHeaderBarProps) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#d2e5f6] text-[#002660]">
              <Compass className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold text-[#002660] tracking-tight">Travel & Heritage Guide</h2>
          </div>
          <p className="text-xs text-[#4f616f] mt-1 ml-10">
            Curated cultural attractions, historic temples, and scenic excursions for summit delegates
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="rounded-xl border-[#e2e8f0] text-[#002660] hover:bg-[#f2f4f6] h-10 px-4 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={onOpenCreate}
            className="bg-[#002660] hover:bg-[#1a3c7d] text-white rounded-xl shadow-md shadow-[#002660]/20 text-xs font-semibold h-10 px-4 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Destination
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#747781] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search destination, temple, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-8 h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <Label className="text-xs font-semibold text-[#4f616f] whitespace-nowrap">Open Day:</Label>
            <select
              value={selectedDayFilter}
              onChange={(e) => setSelectedDayFilter(e.target.value)}
              aria-label="Filter by open day"
              className="h-10 text-xs px-3 bg-[#f7f9fb] border border-[#e2e8f0] rounded-xl text-[#191c1e] focus:outline-[#002660] cursor-pointer"
            >
              <option value="">All Days</option>
              {ALL_WEEKDAYS.map((d) => (
                <option key={d.key} value={d.key}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
