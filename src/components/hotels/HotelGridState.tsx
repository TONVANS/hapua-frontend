import React from 'react';
import { Building, Info, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hotel } from '@/types';
import { HotelCard } from './HotelCard';

interface HotelGridStateProps {
  hotels: Hotel[];
  filteredHotels: Hotel[];
  isLoading: boolean;
  error: string | null;
  search: string;
  onRetry: () => void;
  onResetFilters: () => void;
  onSelectHotel: (hotel: Hotel) => void;
}

export function HotelGridState({
  hotels,
  filteredHotels,
  isLoading,
  error,
  search,
  onRetry,
  onResetFilters,
  onSelectHotel,
}: HotelGridStateProps) {
  if (isLoading && hotels.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-[#e2e8f0] bg-white/80 overflow-hidden shadow-sm animate-pulse space-y-4 p-4"
          >
            <div className="aspect-16/10 bg-slate-200 rounded-2xl" />
            <div className="space-y-2 pt-2">
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-16 bg-slate-200 rounded w-full mt-3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!isLoading && error && hotels.length === 0) {
    return (
      <div className="text-center py-16 glass-panel rounded-3xl p-8 max-w-lg mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <Info className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#002660]">Unable to Load Accommodations</h3>
        <p className="text-xs text-[#444650]">{error}</p>
        <Button
          onClick={onRetry}
          className="bg-[#002660] hover:bg-[#1a3c7d] text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          Retry
        </Button>
      </div>
    );
  }

  if (!isLoading && filteredHotels.length === 0) {
    return (
      <div className="text-center py-16 glass-panel rounded-3xl p-8 max-w-lg mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#d2e5f6] text-[#002660] flex items-center justify-center mx-auto">
          <Building className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#002660]">No Matching Accommodations</h3>
        <p className="text-xs text-[#444650]">
          We could not find any partner hotels matching your query &quot;{search}&quot;. Try adjusting your search keywords or rating filter.
        </p>
        <Button
          onClick={onResetFilters}
          variant="outline"
          className="rounded-xl text-xs font-semibold border-[#002660]/30 text-[#002660] cursor-pointer"
        >
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredHotels.map((hotel, index) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          index={index}
          onSelect={onSelectHotel}
        />
      ))}
    </div>
  );
}
