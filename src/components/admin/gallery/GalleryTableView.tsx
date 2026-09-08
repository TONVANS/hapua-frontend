import React from 'react';
import {
  Image as ImageIcon,
  Video,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  Calendar,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Gallery } from '@/types';

interface GalleryTableViewProps {
  gallery: Gallery[];
  loading: boolean;
  onOpenLightbox: (index: number) => void;
  onEdit: (item: Gallery) => void;
  onDelete: (item: Gallery) => void;
}

export function GalleryTableView({
  gallery,
  loading,
  onOpenLightbox,
  onEdit,
  onDelete,
}: GalleryTableViewProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-[#f7f9fb] border-b border-[#e2e8f0]">
          <TableRow>
            <TableHead className="text-xs font-bold text-[#002660]">Media</TableHead>
            <TableHead className="text-xs font-bold text-[#002660]">Title & Description</TableHead>
            <TableHead className="text-xs font-bold text-[#002660]">Type</TableHead>
            <TableHead className="text-xs font-bold text-[#002660]">Visibility</TableHead>
            <TableHead className="text-xs font-bold text-[#002660]">Date</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-xs text-[#747781]">
                <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-[#002660]" />
                Loading media items...
              </TableCell>
            </TableRow>
          ) : gallery.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-xs text-[#747781]">
                <ImageIcon className="w-8 h-8 mx-auto text-[#c4c6d2] mb-2" />
                No media items found.
              </TableCell>
            </TableRow>
          ) : (
            gallery.map((item, idx) => (
              <TableRow
                key={item.id}
                className="hover:bg-[#d2e5f6]/25 transition-colors border-b border-[#f2f4f6]"
              >
                <TableCell className="py-3">
                  <div
                    className="w-14 h-10 rounded-lg overflow-hidden bg-slate-950 relative cursor-pointer group"
                    onClick={() => onOpenLightbox(idx)}
                  >
                    {item.mediaType === 'VIDEO' ? (
                      <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white">
                        <Video className="w-4 h-4" />
                      </div>
                    ) : (
                      <img
                        src={item.mediaUrl}
                        alt={item.title || ''}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    )}
                  </div>
                </TableCell>

                <TableCell className="py-3 max-w-xs">
                  <p className="font-semibold text-xs text-[#002660] line-clamp-1" title={item.title || undefined}>{item.title}</p>
                  {item.description && (
                    <p className="text-[11px] text-[#747781] line-clamp-1" title={item.description}>{item.description}</p>
                  )}
                </TableCell>

                <TableCell className="py-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4f616f]">
                    {item.mediaType === 'VIDEO' ? (
                      <>
                        <Video className="w-3.5 h-3.5 text-blue-600" />
                        <span>Video</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Photo</span>
                      </>
                    )}
                  </span>
                </TableCell>

                <TableCell className="py-3">
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-bold ${
                      item.visibility === 'PUBLIC'
                        ? 'border-emerald-300 text-emerald-700 bg-emerald-50'
                        : 'border-slate-300 text-slate-700 bg-slate-50'
                    }`}
                  >
                    {item.visibility}
                  </Badge>
                </TableCell>

                <TableCell className="py-3 text-xs text-[#747781]">
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <a
                      href={item.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-[#002660] hover:bg-[#d2e5f6]/50 rounded-lg cursor-pointer"
                      title="Open full URL"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(item)}
                      className="h-8 w-8 p-0 text-[#002660] hover:bg-[#d2e5f6]/50 rounded-lg cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(item)}
                      className="h-8 w-8 p-0 text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
