import React from 'react';
import {
  Image as ImageIcon,
  Video,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  Maximize2,
  Calendar,
  Upload,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Gallery } from '@/types';

interface GalleryGridViewProps {
  gallery: Gallery[];
  loading: boolean;
  onOpenLightbox: (index: number) => void;
  onEdit: (item: Gallery) => void;
  onDelete: (item: Gallery) => void;
  onOpenCreate: () => void;
}

export function GalleryGridView({
  gallery,
  loading,
  onOpenLightbox,
  onEdit,
  onDelete,
  onOpenCreate,
}: GalleryGridViewProps) {
  if (loading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-white rounded-2xl border border-[#e2e8f0]">
        <Loader2 className="w-8 h-8 animate-spin text-[#002660] mb-2" />
        <p className="text-xs text-[#747781]">Loading media gallery items...</p>
      </div>
    );
  }

  if (gallery.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-white rounded-2xl border border-[#e2e8f0] p-6 text-center">
        <ImageIcon className="w-12 h-12 text-[#c4c6d2] mb-3" />
        <p className="font-semibold text-slate-800 text-sm">No media records found</p>
        <p className="text-xs text-[#747781] mt-1 max-w-sm">
          No photos or videos match your filter settings.
        </p>
        <Button
          onClick={onOpenCreate}
          size="sm"
          className="mt-4 bg-[#002660] hover:bg-[#1a3c7d] text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 mr-1.5" />
          Upload New Media
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {gallery.map((item, idx) => (
        <Card
          key={item.id}
          className="group overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white hover-lift transition-all flex flex-col justify-between"
        >
          {/* Media Preview Stage */}
          <div
            className="relative aspect-16/10 bg-slate-950 overflow-hidden cursor-pointer"
            onClick={() => onOpenLightbox(idx)}
          >
            {item.mediaType === 'VIDEO' ? (
              <div className="w-full h-full flex items-center justify-center relative bg-slate-900">
                <video
                  src={item.mediaUrl}
                  className="w-full h-full object-cover opacity-80"
                  muted
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                    <Video className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={item.mediaUrl}
                alt={item.title || ''}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            )}

            {/* Top Badges Overlay */}
            <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
              <Badge
                className={`text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                  item.visibility === 'PUBLIC'
                    ? 'bg-emerald-600/90 text-white hover:bg-emerald-600'
                    : 'bg-slate-800/90 text-white hover:bg-slate-800'
                }`}
              >
                {item.visibility === 'PUBLIC' ? (
                  <>
                    <Eye className="w-3 h-3 mr-1" />
                    Public
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3 mr-1" />
                    Internal
                  </>
                )}
              </Badge>

              <span className="w-7 h-7 rounded-lg bg-black/40 backdrop-blur-md text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card Body */}
          <CardContent className="p-4 space-y-2 flex-1 flex flex-col justify-between">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-[#002660] line-clamp-1 group-hover:text-blue-700 transition-colors">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-xs text-[#747781] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-[#f2f4f6] flex items-center justify-between">
              <div className="flex items-center gap-1 text-[11px] text-[#4f616f]">
                <Calendar className="w-3 h-3 text-[#747781]" />
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(item)}
                  className="h-7 w-7 p-0 text-[#002660] hover:bg-[#d2e5f6]/50 rounded-lg cursor-pointer"
                  title="Edit info"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(item)}
                  className="h-7 w-7 p-0 text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg cursor-pointer"
                  title="Delete media"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
