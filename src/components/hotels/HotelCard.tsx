import React from 'react';
import { Star, MapPin, Wifi, Car, ShieldCheck, Building, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hotel } from '@/types';
import { getHotelImages } from './utils';

interface HotelCardProps {
  hotel: Hotel;
  index: number;
  onSelect: (hotel: Hotel) => void;
}

export function HotelCard({ hotel, index, onSelect }: HotelCardProps) {
  const images = getHotelImages(hotel);
  const cover = images[0] || 'https://placehold.co/1200x800/e2e8f0/475569?text=No+Image+Available';
  const starCount = hotel.starRating || 5;

  return (
    <div className="group rounded-3xl border border-[#e2e8f0] bg-white overflow-hidden shadow-sm hover-lift flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#002660]/30">
      <div>
        {/* Hotel Cover Image */}
        <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
          <img
            src={cover}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-[#002660] shadow-xs">
              <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
              <span>{starCount}-Star Rated</span>
            </div>

            {hotel.images && hotel.images.length > 0 && (
              <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                +{hotel.images.length + 1} Photos
              </span>
            )}
          </div>

          {/* Hotel Name in Overlay */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="text-lg font-bold leading-snug drop-shadow-sm">
              {hotel.name}
            </h3>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-6 space-y-4">
          {/* Address */}
          <div className="flex items-start gap-2 text-xs text-[#444650]">
            <MapPin className="w-4 h-4 text-[#002660] shrink-0 mt-0.5" />
            <span className="line-clamp-2 leading-relaxed">{hotel.address}</span>
          </div>

          {/* Description */}
          {hotel.description && (
            <p className="text-xs text-[#4f616f] line-clamp-3 leading-relaxed">
              {hotel.description}
            </p>
          )}

          {/* Amenities Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f2f4f6] text-[#002660] text-[11px] font-medium">
              <Wifi className="w-3 h-3 text-[#002660]" /> Free WiFi
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f2f4f6] text-[#002660] text-[11px] font-medium">
              <Car className="w-3 h-3 text-[#002660]" /> Airport Shuttle
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f2f4f6] text-[#002660] text-[11px] font-medium">
              <ShieldCheck className="w-3 h-3 text-[#002660]" /> VIP Security
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-6 pt-0 border-t border-[#f2f4f6] mt-4 flex items-center gap-2">
        <Button
          onClick={() => onSelect(hotel)}
          className="flex-1 bg-[#002660] hover:bg-[#1a3c7d] text-white rounded-xl text-xs font-bold h-10 shadow-md shadow-[#002660]/15 transition-all cursor-pointer"
        >
          <Building className="w-3.5 h-3.5 mr-1.5" />
          View Details & Gallery
        </Button>

        {hotel.mapUrl && (
          <a
            href={hotel.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-[#e2e8f0] text-[#002660] hover:bg-[#f2f4f6] transition-colors"
            title="Open in Google Maps"
          >
            <Globe className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
