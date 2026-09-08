import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Activity, Gallery } from '@/types';

interface GalleryLightboxModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  gallery: Gallery[];
  lightboxIndex: number;
  setLightboxIndex: (index: number | ((prev: number) => number)) => void;
  activities: Activity[];
}

export function GalleryLightboxModal({
  open,
  setOpen,
  gallery,
  lightboxIndex,
  setLightboxIndex,
  activities,
}: GalleryLightboxModalProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const item = gallery[lightboxIndex];

  if (!item) return null;

  const currentActivity = activities.find((a) => a.id === item.activityId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden rounded-3xl border border-white/80 bg-black/95 text-white backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col">
          {/* Top Floating Control Bar */}
          <div className="p-4 px-6 flex items-center justify-between border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  item.visibility === 'PUBLIC' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {item.visibility === 'PUBLIC' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                {item.visibility}
              </span>
              <span className="text-xs text-white/60">
                {lightboxIndex + 1} of {gallery.length}
              </span>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Media Display Stage */}
          <div className="relative h-[400px] sm:h-[500px] flex items-center justify-center bg-black/80 group">
            {item.mediaType === 'IMAGE' ? (
              <img
                src={item.mediaUrl}
                alt={item.title || 'lightbox'}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <video src={item.mediaUrl} controls autoPlay className="max-h-full max-w-full" />
            )}

            {/* Navigation Arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setLightboxIndex((prev) => (prev + 1) % gallery.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Media Metadata Footer */}
          <div className="p-5 px-6 bg-slate-950 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm text-white">{item.title || 'Untitled Session Media'}</h3>
              {item.description && (
                <p className="text-xs text-white/70 mt-0.5 leading-relaxed">{item.description}</p>
              )}
              <p className="text-[10px] text-white/40 mt-1">
                Session: {currentActivity?.name || 'Council Activity'} • Added on{' '}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(item.mediaUrl);
                  setCopiedUrl(true);
                  setTimeout(() => setCopiedUrl(false), 2000);
                }}
                className="rounded-xl text-xs border-white/20 text-white hover:bg-white/10 cursor-pointer"
              >
                {copiedUrl ? (
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 mr-1" />
                )}
                {copiedUrl ? 'Copied URL' : 'Copy Direct Link'}
              </Button>
              <a href={item.mediaUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs h-9 px-4 cursor-pointer font-semibold">
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  Open Original
                </Button>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
