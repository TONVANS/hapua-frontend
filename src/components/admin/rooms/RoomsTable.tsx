import React from 'react';
import { DoorOpen, MapPin, Users, Edit2, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Room } from '@/types';

interface RoomsTableProps {
  rooms: Room[];
  loading: boolean;
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
}

export function RoomsTable({
  rooms,
  loading,
  total,
  page,
  limit,
  onPageChange,
  onEdit,
  onDelete,
}: RoomsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-[#f7f9fb] border-b border-[#e2e8f0]">
          <TableRow>
            <TableHead className="text-xs font-bold text-[#002660]">Room Name</TableHead>
            <TableHead className="text-xs font-bold text-[#002660]">Location / Floor</TableHead>
            <TableHead className="text-xs font-bold text-[#002660]">Capacity</TableHead>
            <TableHead className="text-xs font-bold text-[#002660]">Description</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-xs text-[#747781]">
                <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-[#002660]" />
                Loading rooms...
              </TableCell>
            </TableRow>
          ) : rooms.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-xs text-[#747781]">
                <DoorOpen className="w-8 h-8 mx-auto text-[#c4c6d2] mb-2" />
                No rooms configured yet.
              </TableCell>
            </TableRow>
          ) : (
            rooms.map((room) => (
              <TableRow
                key={room.id}
                className="hover:bg-[#d2e5f6]/25 transition-colors border-b border-[#f2f4f6]"
              >
                <TableCell className="py-3 font-semibold text-sm text-[#002660]">
                  <div className="flex items-center gap-2 max-w-[220px]">
                    <div className="w-7 h-7 rounded-lg bg-[#d2e5f6] text-[#002660] flex items-center justify-center font-bold text-xs shrink-0">
                      <DoorOpen className="w-4 h-4" />
                    </div>
                    <span className="truncate" title={room.name}>{room.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-xs text-[#191c1e]">
                  <span className="flex items-center gap-1.5 max-w-[180px]" title={room.location || 'Convention Center Main'}>
                    <MapPin className="w-3.5 h-3.5 text-[#4f616f] shrink-0" />
                    <span className="truncate">{room.location || 'Convention Center Main'}</span>
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#f2f4f6] text-[#002660]">
                    <Users className="w-3 h-3" />
                    {room.capacity} seats
                  </span>
                </TableCell>
                <TableCell className="py-3 text-xs text-[#747781] max-w-xs" truncate title={room.description || undefined}>
                  {room.description || '—'}
                </TableCell>
                <TableCell className="py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(room)}
                      className="h-8 w-8 p-0 text-[#002660] hover:bg-[#d2e5f6]/50 rounded-lg cursor-pointer"
                      title="Edit room"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(room)}
                      className="h-8 w-8 p-0 text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg cursor-pointer"
                      title="Delete room"
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

      <div className="px-6 py-4 border-t border-[#e6e8ea] flex items-center justify-between text-xs text-[#747781]">
        <span>
          Showing {rooms.length} of {total} rooms
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="h-8 text-xs rounded-lg cursor-pointer"
          >
            Previous
          </Button>
          <span className="font-semibold text-[#002660]">Page {page}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={rooms.length < limit || page * limit >= total}
            onClick={() => onPageChange(page + 1)}
            className="h-8 text-xs rounded-lg cursor-pointer"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
