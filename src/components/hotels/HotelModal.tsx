import React, { useState, useEffect } from 'react';
import { Star, MapPin, Info, Sparkles, Wifi, Car, Coffee, ShieldCheck, Check, Copy, Phone, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Hotel } from '@/types';
import { getHotelImages } from './utils';

interface HotelModalProps {
  hotel: Hotel | null;
  onClose: () => void;
}

export function HotelModal({ hotel, onClose }: HotelModalProps) {
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [copiedAddress, setCopiedAddress] = useState(false);

  useEffect(() => {
    if (hotel) {
      setModalImageIndex(0);
      setCopiedAddress(false);
    }
  }, [hotel]);

  if (!hotel) return null;

  const handleCopyAddress = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const images = getHotelImages(hotel);
  const currentImg =
    images[modalImageIndex] ||
    images[0] ||
    'https://placehold.co/1200x800/e2e8f0/475569?text=No+Image+Available';

  return (
    <Dialog open={!!hotel} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] sm:max-w-5xl md:max-w-5xl lg:max-w-5xl xl:max-w-5xl p-0 overflow-hidden rounded-3xl border border-white/90 bg-white/95 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col md:flex-row md:h-[75vh] max-h-[90vh]">
          {/* Left Column: Photo Showcase */}
          <div className="w-full md:w-[55%] flex flex-col bg-slate-900 relative">
            {/* Main Image */}
            <div className="relative flex-1 min-h-[300px] md:min-h-0 bg-black overflow-hidden">
              <img
                src={currentImg}
                alt={hotel.name}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

              {/* Header in Modal Top */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <Badge className="bg-white/20 backdrop-blur-md text-white font-bold text-xs px-3 py-1.5 rounded-full border border-white/30 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37] mr-1.5 inline" />
                  {hotel.starRating || 5}-Star Luxury
                </Badge>
              </div>

              {/* Title shifted to the bottom of the image */}
              <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-lg mb-1.5">
                  {hotel.name}
                </h2>
                <p className="text-sm text-white/90 flex items-center gap-1.5 drop-shadow-md">
                  <MapPin className="w-4 h-4 shrink-0 text-[#ffe088]" />
                  <span className="line-clamp-1">{hotel.address}</span>
                </p>
              </div>
            </div>

            {/* Thumbnail Switcher */}
            {images.length > 1 && (
              <div className="bg-slate-950 p-4 border-t border-white/10 shrink-0">
                <div className="flex gap-3 overflow-x-auto snap-x scrollbar-hide">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setModalImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 snap-center transition-all cursor-pointer ${
                        modalImageIndex === idx
                          ? 'border-[#3B82F6] scale-105 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                          : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div className="w-full md:w-[45%] flex flex-col bg-white">
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 scrollbar-thin scrollbar-thumb-gray-200">
              {/* Description */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#002660] flex items-center gap-2">
                  <Info className="w-4 h-4" /> About the Property
                </h4>
                <p className="text-sm text-[#444650] leading-relaxed">
                  {hotel.description ||
                    'Exclusive luxury accommodations reserved for 42nd HAPUA Council Meeting delegations, featuring state-of-the-art hospitality, peaceful Mekong scenery, and diplomatic security services.'}
                </p>
              </div>

              {/* Key Amenities - Bento Grid Style */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#002660] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Complimentary Inclusions
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-100 transition-colors hover:bg-slate-50 hover:border-slate-200">
                    <Wifi className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-xs font-semibold text-slate-700">High-Speed WiFi</span>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-100 transition-colors hover:bg-slate-50 hover:border-slate-200">
                    <Car className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-xs font-semibold text-slate-700">VIP Transfer</span>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-100 transition-colors hover:bg-slate-50 hover:border-slate-200">
                    <Coffee className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-xs font-semibold text-slate-700">Executive Breakfast</span>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-100 transition-colors hover:bg-slate-50 hover:border-slate-200">
                    <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-xs font-semibold text-slate-700">24/7 Security</span>
                  </div>
                </div>
              </div>

              {/* Contact & Address Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#002660] flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Location & Contact
                </h4>
                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-sm font-medium text-slate-800 leading-snug">{hotel.address}</p>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopyAddress(hotel.address)}
                        className="shrink-0 h-8 w-8 rounded-full border-slate-300 text-slate-600 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors cursor-pointer"
                        title="Copy Address"
                      >
                        {copiedAddress ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {hotel.contactInfo && (
                    <div className="pt-3 border-t border-slate-200 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-[#2563EB]" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{hotel.contactInfo}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky Modal Footer Actions */}
            <div className="p-5 sm:px-8 sm:py-6 bg-white border-t border-slate-100 shrink-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="rounded-xl text-sm font-semibold h-11 px-5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Close
                </Button>

                <div className="flex items-center gap-3">
                  {hotel.mapUrl && (
                    <a
                      href={hotel.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="rounded-xl text-sm font-semibold h-11 px-5 border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors cursor-pointer"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Map
                      </Button>
                    </a>
                  )}

                  {hotel.websiteUrl && (
                    <a
                      href={hotel.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-bold h-11 px-6 shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:-translate-y-0.5 cursor-pointer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
