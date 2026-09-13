'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Camera, Video, Maximize2, Sparkles, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Gallery } from '@/types';

interface ActivityMediaGalleryProps {
  gallery: Gallery[];
  allImageURL?: string | null;
  onOpenLightbox: (index: number) => void;
}

export function ActivityMediaGallery({
  gallery,
  allImageURL,
  onOpenLightbox,
}: ActivityMediaGalleryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#002660] to-[#1a3c7d] text-white flex items-center justify-center shadow-md">
            <Camera className="w-5 h-5 text-[#ffe088]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#002660]">Session Photography & Media Gallery</h2>
            <p className="text-xs text-[#747781]">
              High-resolution highlights, speaker photography, and plenary documentation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {allImageURL && (
            <a
              href={allImageURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#002660] to-[#1a3c7d] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-[#ffe088]" />
              <span>Full Photo Album</span>
              <ExternalLink className="w-3 h-3 text-white/80" />
            </a>
          )}
          <Badge className="bg-[#d2e5f6] text-[#002660] text-xs font-bold px-3 py-1 rounded-full border border-[#b0c6ff]/40">
            {gallery.length} Media Asset{gallery.length === 1 ? '' : 's'}
          </Badge>
        </div>
      </div>

      {gallery.length === 0 ? (
        <div className="p-10 text-center rounded-2xl bg-white/70 border border-dashed border-slate-300 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#002660]/5 flex items-center justify-center mx-auto mb-2">
            <Camera className="w-6 h-6 text-[#cca730]" />
          </div>
          <p className="text-xs font-extrabold text-[#002660]">Official Media Highlights</p>
          <p className="text-xs text-[#747781] max-w-md mx-auto leading-relaxed">
            {allImageURL
              ? 'Session photography is archived in the official cloud gallery. Click below to browse and download high-resolution photos.'
              : 'High-definition photographs and recorded plenary highlights will be uploaded here by the conference secretariat immediately following the conclusion of this session.'}
          </p>
          {allImageURL && (
            <div className="pt-2">
              <a
                href={allImageURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002660] hover:bg-[#1a3c7d] text-white text-xs font-bold shadow-md shadow-[#002660]/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#ffe088]" />
                <span>Open Full Cloud Photo Album</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {gallery.map((media, idx) => (
              <motion.div
                key={media.id || idx}
                whileHover={{ scale: 1.03, y: -2 }}
                transition={{ duration: 0.25 }}
                onClick={() => onOpenLightbox(idx)}
                className="group relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-white/80 cursor-pointer shadow-md"
              >
                {media.mediaType === 'IMAGE' ? (
                  <img
                    src={media.mediaUrl}
                    alt={media.title || 'Session photo'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video src={media.mediaUrl} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#002660] shadow-md">
                        <Video className="w-4 h-4 fill-[#002660]" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                  <span className="self-end p-1.5 rounded-full bg-black/50 text-white backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                  {media.title && (
                    <p className="text-[11px] font-bold text-white truncate">{media.title}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {allImageURL && (
            <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-3 text-xs bg-[#f7f9fb] p-3 rounded-2xl border border-slate-150">
              <div className="flex items-center gap-2 text-slate-600">
                <Camera className="w-4 h-4 text-[#cca730]" />
                <span className="font-medium text-[11px]">
                  Looking for the full uncompressed photo archive?
                </span>
              </div>
              <a
                href={allImageURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#002660] hover:text-[#1a3c7d] text-[11px] hover:underline cursor-pointer shrink-0"
              >
                <span>View Cloud Album</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
