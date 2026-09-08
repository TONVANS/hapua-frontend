import React, { useState } from 'react';
import {
  Star,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Car,
  ShieldCheck,
  Coffee,
  Phone,
  Copy,
  Check,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Hotel } from '@/types';
import { getHotelAllImages } from './utils';

interface HotelPreviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  hotel: Hotel | null;
  previewImageIndex: number;
  setPreviewImageIndex: (index: number | ((prev: number) => number)) => void;
}

export function HotelPreviewModal({
  open,
  setOpen,
  hotel,
  previewImageIndex,
  setPreviewImageIndex,
}: HotelPreviewModalProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);

  if (!hotel) return null;

  const imgs = getHotelAllImages(hotel);
  const currentImg =
    imgs[previewImageIndex] ||
    'https://placehold.co/1200x800/e2e8f0/475569?text=No+Image+Available';
  const rating = hotel.starRating || 5;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden rounded-3xl border border-white/80 bg-white/95 backdrop-blur-2xl shadow-2xl">
        <div>
          {/* Photo Stage */}
          <div className="relative w-full bg-slate-950">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img src={currentImg} alt={hotel.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Top Badges */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                <Badge className="bg-black/40 backdrop-blur-md text-white border border-white/20 text-xs px-3 py-1 font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37] mr-1.5 inline" />
                  {rating}-Star Rated Luxury Partner
                </Badge>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Arrows */}
              {imgs.length > 1 && (
                <>
                  <button
                    onClick={() => setPreviewImageIndex((prev) => (prev - 1 + imgs.length) % imgs.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center cursor-pointer transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewImageIndex((prev) => (prev + 1) % imgs.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center cursor-pointer transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Overlay Title */}
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-1.5 text-xs text-[#ffe088] font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{hotel.address}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">{hotel.name}</h2>
              </div>
            </div>

            {/* Thumbnails */}
            {imgs.length > 1 && (
              <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 overflow-x-auto">
                {imgs.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPreviewImageIndex(idx)}
                    className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      previewImageIndex === idx ? 'border-[#3B82F6] scale-105' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Body */}
          <div className="p-6 space-y-5 max-h-72 overflow-y-auto">
            {/* Amenities Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#f8fafc] border border-slate-100 text-xs font-semibold text-slate-700">
                <Wifi className="w-4 h-4 text-[#002660]" />
                <span>Free High-Speed WiFi</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#f8fafc] border border-slate-100 text-xs font-semibold text-slate-700">
                <Car className="w-4 h-4 text-[#002660]" />
                <span>Airport Transfer</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#f8fafc] border border-slate-100 text-xs font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#002660]" />
                <span>24/7 Security</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#f8fafc] border border-slate-100 text-xs font-semibold text-slate-700">
                <Coffee className="w-4 h-4 text-[#002660]" />
                <span>Executive Breakfast</span>
              </div>
            </div>

            {/* Description */}
            {hotel.description && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#002660]">Property Details & Delegate Guide</span>
                <p className="text-xs text-slate-600 leading-relaxed bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
                  {hotel.description}
                </p>
              </div>
            )}

            {/* Contact Banner */}
            {hotel.contactInfo && (
              <div className="p-3 rounded-xl bg-[#f2f4f6] text-[#002660] text-xs font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Direct Inquiries: {hotel.contactInfo}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 px-6 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(hotel.address);
                setCopiedAddress(true);
                setTimeout(() => setCopiedAddress(false), 2000);
              }}
              className="rounded-xl text-xs border-[#e2e8f0] text-[#002660] cursor-pointer"
            >
              {copiedAddress ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
              {copiedAddress ? 'Copied Address' : 'Copy Address'}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="rounded-xl text-xs h-9 px-4 cursor-pointer"
              >
                Close
              </Button>
              {hotel.mapUrl && (
                <a href={hotel.mapUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-xl text-xs h-9 px-4 border-[#e2e8f0] text-[#002660] cursor-pointer">
                    <Globe className="w-3.5 h-3.5 mr-1.5" />
                    Map
                  </Button>
                </a>
              )}
              {hotel.websiteUrl && (
                <a href={hotel.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#002660] hover:bg-[#1a3c7d] text-white rounded-xl text-xs h-9 px-4 font-bold shadow-sm cursor-pointer">
                    <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                    Official Website / Booking
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
