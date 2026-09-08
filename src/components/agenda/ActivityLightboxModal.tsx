import React from 'react';
import { ChevronLeft, ChevronRight, X, Film, Camera } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Gallery } from '@/types';

interface ActivityLightboxModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gallery: Gallery[];
  lightboxIndex: number;
  setLightboxIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function ActivityLightboxModal({
  open,
  onOpenChange,
  gallery,
  lightboxIndex,
  setLightboxIndex,
}: ActivityLightboxModalProps) {
  const currentMedia = gallery[lightboxIndex];
  if (!currentMedia) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-black/95 border-none text-white overflow-hidden rounded-3xl">
        <div className="relative flex flex-col items-center justify-center min-h-[50vh] max-h-[85vh] p-4 sm:p-8">
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation left/right */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={() =>
                  setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setLightboxIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main Media Showcase */}
          <div className="w-full flex items-center justify-center max-h-[70vh]">
            {currentMedia.mediaType === 'IMAGE' ? (
              <img
                src={currentMedia.mediaUrl}
                alt={currentMedia.title || 'Gallery item'}
                className="max-h-[68vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
            ) : (
              <video
                src={currentMedia.mediaUrl}
                controls
                autoPlay
                className="max-h-[68vh] max-w-full rounded-xl shadow-2xl"
              />
            )}
          </div>

          {/* Media Info Footer */}
          <div className="w-full mt-4 flex items-center justify-between text-xs text-white/80 px-2">
            <div className="flex items-center gap-2">
              {currentMedia.mediaType === 'IMAGE' ? (
                <Camera className="w-4 h-4 text-[#ffe088]" />
              ) : (
                <Film className="w-4 h-4 text-[#ffe088]" />
              )}
              <span className="font-semibold">{currentMedia.title || 'Conference Highlight'}</span>
            </div>
            <span className="font-mono text-white/60">
              {lightboxIndex + 1} / {gallery.length}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
