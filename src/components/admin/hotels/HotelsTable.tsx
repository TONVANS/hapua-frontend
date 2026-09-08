import React from 'react';
import {
  Hotel as HotelIcon,
  MapPin,
  Star,
  Loader2,
  Eye,
  Edit2,
  Trash2,
  Globe,
  ExternalLink,
  Phone,
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
import { Hotel } from '@/types';

interface HotelsTableProps {
  hotels: Hotel[];
  loading: boolean;
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onPreview: (hotel: Hotel) => void;
  onEdit: (hotel: Hotel) => void;
  onDelete: (hotel: Hotel) => void;
}

export function HotelsTable({
  hotels,
  loading,
  total,
  page,
  limit,
  onPageChange,
  onPreview,
  onEdit,
  onDelete,
}: HotelsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-[#f7f9fb] border-b border-[#e2e8f0]">
          <TableRow>
            <TableHead className="text-xs font-bold text-[#002660] py-3.5">Hotel Property</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] py-3.5">Address & Map</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] py-3.5">Classification</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] py-3.5">Contact & Links</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] py-3.5">Description</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] py-3.5 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="h-44 text-center text-xs text-[#747781]">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#002660]" />
                Loading hotel accommodations...
              </TableCell>
            </TableRow>
          ) : hotels.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-44 text-center text-xs text-[#747781]">
                <HotelIcon className="w-10 h-10 mx-auto text-[#c4c6d2] mb-2 stroke-[1.5]" />
                <p className="font-semibold text-sm text-[#191c1e]">No partner hotels found</p>
                <p className="text-xs text-[#747781] mt-1">Register a partner hotel or modify your filter settings.</p>
              </TableCell>
            </TableRow>
          ) : (
            hotels.map((hotel) => {
              const rating = hotel.starRating || 5;
              return (
                <TableRow
                  key={hotel.id}
                  className="hover:bg-[#d2e5f6]/20 transition-colors border-b border-[#f2f4f6] group"
                >
                  {/* Hotel Name & Cover */}
                  <TableCell className="py-3.5 font-semibold text-sm text-[#002660]">
                    <div className="flex items-center gap-3">
                      {hotel.coverImage ? (
                        <div className="relative w-12 h-12 rounded-xl border border-[#e2e8f0] overflow-hidden shrink-0 shadow-xs bg-slate-100 group-hover:shadow-sm transition-shadow">
                          <img
                            src={hotel.coverImage}
                            alt={hotel.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-[#d2e5f6] text-[#002660] flex items-center justify-center font-bold text-xs shrink-0">
                          <HotelIcon className="w-6 h-6" />
                        </div>
                      )}
                      <div className="flex flex-col max-w-[240px]">
                        <span
                          className="line-clamp-1 font-bold text-slate-900 group-hover:text-[#002660] transition-colors"
                          title={hotel.name}
                        >
                          {hotel.name}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {hotel.images && hotel.images.length > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f2f4f6] text-[10px] text-[#002660] font-semibold">
                              <Camera className="w-3 h-3 text-[#002660]" />
                              +{hotel.images.length + 1} photos
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#747781] font-normal">Single photo</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Address & Map */}
                  <TableCell className="py-3.5 text-xs text-[#191c1e]">
                    <div className="flex flex-col gap-1 max-w-[200px]">
                      <div className="flex items-start gap-1.5 font-medium text-slate-800" title={hotel.address}>
                        <MapPin className="w-3.5 h-3.5 text-[#002660] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hotel.address}</span>
                      </div>
                      {hotel.mapUrl && (
                        <a
                          href={hotel.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#002660] hover:underline font-semibold w-fit"
                        >
                          <Globe className="w-3 h-3" />
                          <span>Location Map</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      )}
                    </div>
                  </TableCell>

                  {/* Star Rating */}
                  <TableCell className="py-3.5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rating
                                ? 'fill-[#d4af37] text-[#d4af37]'
                                : 'fill-slate-200 text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-slate-700">
                        {rating}-Star Rated
                      </span>
                    </div>
                  </TableCell>

                  {/* Contact & Website */}
                  <TableCell className="py-3.5 text-xs text-[#191c1e]">
                    <div className="flex flex-col gap-1">
                      {hotel.contactInfo ? (
                        <span className="inline-flex items-center gap-1 text-[#4f616f]">
                          <Phone className="w-3 h-3 text-[#002660]" />
                          {hotel.contactInfo}
                        </span>
                      ) : (
                        <span className="text-[#747781] italic">—</span>
                      )}

                      {hotel.websiteUrl && (
                        <a
                          href={hotel.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#002660] hover:underline font-medium w-fit"
                        >
                          <ExternalLink className="w-3 h-3" /> Official Site
                        </a>
                      )}
                    </div>
                  </TableCell>

                  {/* Description */}
                  <TableCell className="py-3.5 text-xs text-[#4f616f] max-w-xs" clamp={2} title={hotel.description || undefined}>
                    <p className="line-clamp-2 leading-relaxed">{hotel.description || '—'}</p>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPreview(hotel)}
                        className="h-8 w-8 p-0 text-[#002660] hover:bg-[#d2e5f6]/50 rounded-lg cursor-pointer"
                        title="Preview details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(hotel)}
                        className="h-8 w-8 p-0 text-[#002660] hover:bg-[#d2e5f6]/50 rounded-lg cursor-pointer"
                        title="Edit hotel"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(hotel)}
                        className="h-8 w-8 p-0 text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg cursor-pointer"
                        title="Remove hotel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Pagination Bar */}
      <div className="px-6 py-4 border-t border-[#e6e8ea] flex items-center justify-between text-xs text-[#747781] bg-white">
        <span>
          Showing {hotels.length} of {total} hotels
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
            disabled={hotels.length < limit || page * limit >= total}
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
