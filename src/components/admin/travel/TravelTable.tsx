import React from 'react';
import {
  Compass,
  MapPin,
  Clock,
  Calendar,
  Loader2,
  Eye,
  Edit2,
  Trash2,
  ExternalLink,
  Camera,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TravelRecommend } from '@/types';
import { ALL_WEEKDAYS, formatTravelTime } from './utils';

interface TravelTableProps {
  travels: TravelRecommend[];
  loading: boolean;
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onPreview: (travel: TravelRecommend) => void;
  onEdit: (travel: TravelRecommend) => void;
  onDelete: (travel: TravelRecommend) => void;
}

export function TravelTable({
  travels,
  loading,
  total,
  page,
  limit,
  onPageChange,
  onPreview,
  onEdit,
  onDelete,
}: TravelTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-[#f7f9fb] border-b border-[#e2e8f0]">
          <TableRow>
            <TableHead className="text-xs font-bold text-[#002660] py-3.5">Attraction & Place</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] py-3.5">Location & Map</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] py-3.5">Visiting Hours</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] py-3.5">Operating Days</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] py-3.5">Highlights & Details</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] py-3.5 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="h-44 text-center text-xs text-[#747781]">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#002660]" />
                Loading travel destinations...
              </TableCell>
            </TableRow>
          ) : travels.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-44 text-center text-xs text-[#747781]">
                <Compass className="w-10 h-10 mx-auto text-[#c4c6d2] mb-2 stroke-[1.5]" />
                <p className="font-semibold text-sm text-[#191c1e]">No travel recommendations found</p>
                <p className="text-xs text-[#747781] mt-1">Add a cultural spot or modify your search criteria.</p>
              </TableCell>
            </TableRow>
          ) : (
            travels.map((travel) => (
              <TableRow
                key={travel.id}
                className="hover:bg-[#d2e5f6]/20 transition-colors border-b border-[#f2f4f6] group"
              >
                {/* Place Name & Cover */}
                <TableCell className="py-3.5 font-semibold text-sm text-[#002660]">
                  <div className="flex items-center gap-3">
                    {travel.coverImage ? (
                      <div className="relative w-12 h-12 rounded-xl border border-[#e2e8f0] overflow-hidden shrink-0 shadow-xs bg-slate-100 group-hover:shadow-sm transition-shadow">
                        <img
                          src={travel.coverImage}
                          alt={travel.placeName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-[#d2e5f6] text-[#002660] flex items-center justify-center font-bold text-xs shrink-0">
                        <Compass className="w-6 h-6" />
                      </div>
                    )}
                    <div className="flex flex-col max-w-[240px]">
                      <span
                        className="line-clamp-1 font-bold text-slate-900 group-hover:text-[#002660] transition-colors"
                        title={travel.placeName}
                      >
                        {travel.placeName}
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {travel.images && travel.images.length > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f2f4f6] text-[10px] text-[#002660] font-semibold">
                            <Camera className="w-3 h-3 text-[#002660]" />
                            +{travel.images.length + 1} photos
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#747781] font-normal">Single photo</span>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* Location */}
                <TableCell className="py-3.5 text-xs text-[#191c1e]">
                  <div className="flex flex-col gap-1 max-w-[200px]">
                    <div className="flex items-start gap-1.5 font-medium text-slate-800" title={travel.location}>
                      <MapPin className="w-3.5 h-3.5 text-[#002660] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{travel.location}</span>
                    </div>
                    {travel.mapUrl && (
                      <a
                        href={travel.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#002660] hover:underline font-semibold w-fit"
                      >
                        <span>Open in Maps</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                    )}
                  </div>
                </TableCell>

                {/* Visiting Hours */}
                <TableCell className="py-3.5 text-xs text-[#191c1e]">
                  {(() => {
                    const open = formatTravelTime(travel.openTime);
                    const close = formatTravelTime(travel.closeTime);

                    if (open && close) {
                      return (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#f2f4f6] text-slate-700 font-medium whitespace-nowrap border border-slate-200/50">
                          <Clock className="w-3.5 h-3.5 text-[#002660] shrink-0" />
                          <span className="font-semibold text-[#002660]">{open}</span>
                          <span className="text-slate-400 font-normal">–</span>
                          <span className="font-semibold text-[#002660]">{close}</span>
                        </div>
                      );
                    }

                    if (open) {
                      return (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#f2f4f6] text-slate-700 font-medium whitespace-nowrap border border-slate-200/50">
                          <Clock className="w-3.5 h-3.5 text-[#002660] shrink-0" />
                          <span className="text-slate-500 text-[11px]">From</span>
                          <span className="font-semibold text-[#002660]">{open}</span>
                        </div>
                      );
                    }

                    if (close) {
                      return (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#f2f4f6] text-slate-700 font-medium whitespace-nowrap border border-slate-200/50">
                          <Clock className="w-3.5 h-3.5 text-[#002660] shrink-0" />
                          <span className="text-slate-500 text-[11px]">Until</span>
                          <span className="font-semibold text-[#002660]">{close}</span>
                        </div>
                      );
                    }

                    return (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#f8fafc] text-[#747781] text-xs italic whitespace-nowrap border border-slate-200/40">
                        <Clock className="w-3.5 h-3.5 text-[#a0a4ab] shrink-0" />
                        Flexible / All day
                      </span>
                    );
                  })()}
                </TableCell>

                {/* Open Days */}
                <TableCell className="py-3.5">
                  {travel.openDays && travel.openDays.length > 0 ? (
                    <div className="flex flex-wrap gap-1 max-w-[170px]">
                      {travel.openDays.map((d) => {
                        const dayMeta = ALL_WEEKDAYS.find((w) => w.key === d);
                        return (
                          <span
                            key={d}
                            className="px-1.5 py-0.5 rounded-md bg-[#d2e5f6] text-[#002660] text-[10px] font-bold"
                          >
                            {dayMeta?.short || d}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="text-xs text-[#747781] italic">Everyday open</span>
                  )}
                </TableCell>

                {/* Description */}
                <TableCell className="py-3.5 text-xs text-[#4f616f] max-w-xs" title={travel.description || undefined}>
                  <p className="line-clamp-2 leading-relaxed">{travel.description || '—'}</p>
                </TableCell>

                {/* Actions */}
                <TableCell className="py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onPreview(travel)}
                      className="h-8 w-8 p-0 text-[#002660] hover:bg-[#d2e5f6]/50 rounded-lg cursor-pointer"
                      title="Preview details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(travel)}
                      className="h-8 w-8 p-0 text-[#002660] hover:bg-[#d2e5f6]/50 rounded-lg cursor-pointer"
                      title="Edit destination"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(travel)}
                      className="h-8 w-8 p-0 text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg cursor-pointer"
                      title="Remove destination"
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

      {/* Pagination Bar */}
      <div className="px-6 py-4 border-t border-[#e6e8ea] flex items-center justify-between text-xs text-[#747781] bg-white">
        <span>
          Showing {travels.length} of {total} destinations
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="h-8 text-xs rounded-xl border-[#e2e8f0] cursor-pointer"
          >
            Previous
          </Button>
          <span className="font-semibold text-[#002660] px-2">Page {page}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={travels.length < limit || page * limit >= total}
            onClick={() => onPageChange(page + 1)}
            className="h-8 text-xs rounded-xl border-[#e2e8f0] cursor-pointer"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
