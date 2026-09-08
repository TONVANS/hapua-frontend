import React, { useState } from 'react';
import {
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
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
import { TravelRecommend } from '@/types';
import { ALL_WEEKDAYS, getTravelAllImages, formatTravelTime } from './utils';

interface TravelPreviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  travel: TravelRecommend | null;
  previewImageIndex: number;
  setPreviewImageIndex: (index: number | ((prev: number) => number)) => void;
}

export function TravelPreviewModal({
  open,
  setOpen,
  travel,
  previewImageIndex,
  setPreviewImageIndex,
}: TravelPreviewModalProps) {
  const [copiedLocation, setCopiedLocation] = useState(false);

  if (!travel) return null;

  const imgs = getTravelAllImages(travel);
  const currentImg =
    imgs[previewImageIndex] ||
    'https://placehold.co/1200x800/e2e8f0/475569?text=No+Image+Available';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden rounded-3xl border border-white/80 bg-white/95 backdrop-blur-2xl shadow-2xl">
        <div>
          {/* Photo Stage */}
          <div className="relative w-full bg-slate-950">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img src={currentImg} alt={travel.placeName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Top Badges */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                <Badge className="bg-black/40 backdrop-blur-md text-white border border-white/20 text-xs px-3 py-1 font-bold">
                  Council Delegate Cultural Recommendation
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
                  <span>{travel.location}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">{travel.placeName}</h2>
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
            {/* Visiting Time Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d2e5f6] text-[#002660] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-[#747781] font-semibold uppercase tracking-wider">Visiting Hours</p>
                  <p className="text-xs font-bold text-slate-900">
                    {(() => {
                      const open = formatTravelTime(travel.openTime);
                      const close = formatTravelTime(travel.closeTime);
                      if (open && close) return `${open} – ${close}`;
                      if (open) return `From ${open}`;
                      if (close) return `Until ${close}`;
                      return 'Open 24/7 or Flexible Hours';
                    })()}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d2e5f6] text-[#002660] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-[#747781] font-semibold uppercase tracking-wider">Operating Days</p>
                  {travel.openDays && travel.openDays.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {travel.openDays.map((d) => (
                        <span key={d} className="px-1.5 py-0.5 rounded bg-[#d2e5f6] text-[#002660] text-[10px] font-bold">
                          {ALL_WEEKDAYS.find((w) => w.key === d)?.short || d}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs font-bold text-slate-900">Everyday Open</p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {travel.description && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#002660]">Historical Context & Travel Tips</span>
                <p className="text-xs text-slate-600 leading-relaxed bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
                  {travel.description}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 px-6 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(travel.location);
                setCopiedLocation(true);
                setTimeout(() => setCopiedLocation(false), 2000);
              }}
              className="rounded-xl text-xs border-[#e2e8f0] text-[#002660] cursor-pointer"
            >
              {copiedLocation ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
              {copiedLocation ? 'Copied Location' : 'Copy Location'}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="rounded-xl text-xs h-9 px-4 cursor-pointer"
              >
                Close
              </Button>
              {travel.mapUrl && (
                <a href={travel.mapUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#002660] hover:bg-[#1a3c7d] text-white rounded-xl text-xs h-9 px-4 font-bold shadow-sm cursor-pointer">
                    <Globe className="w-3.5 h-3.5 mr-1.5" />
                    Open Location in Maps
                    <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
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
