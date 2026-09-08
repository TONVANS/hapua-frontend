import React from 'react';
import { Globe2, Edit2, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Country } from '@/types';

interface CountriesTableProps {
  countries: Country[];
  loading: boolean;
  onEdit: (country: Country) => void;
  onDelete: (country: Country) => void;
}

export function CountriesTable({
  countries,
  loading,
  onEdit,
  onDelete,
}: CountriesTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-[#f7f9fb] border-b border-[#e2e8f0]">
          <TableRow>
            <TableHead className="text-xs font-bold text-[#002660]">Country Name</TableHead>
            <TableHead className="text-xs font-bold text-[#002660]">ISO Code</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} className="h-32 text-center text-xs text-[#747781]">
                <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-[#002660]" />
                Loading countries...
              </TableCell>
            </TableRow>
          ) : countries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-32 text-center text-xs text-[#747781]">
                <Globe2 className="w-8 h-8 mx-auto text-[#c4c6d2] mb-2" />
                No countries found.
              </TableCell>
            </TableRow>
          ) : (
            countries.map((c) => (
              <TableRow
                key={c.id}
                className="hover:bg-[#d2e5f6]/25 transition-colors border-b border-[#f2f4f6]"
              >
                <TableCell className="py-3 font-semibold text-sm text-[#002660]">
                  <div className="flex items-center gap-2 max-w-70">
                    <div className="w-7 h-7 rounded-lg bg-[#d2e5f6] text-[#002660] flex items-center justify-center font-bold text-xs shrink-0">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <span className="truncate" title={c.name}>{c.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 font-mono text-xs text-[#191c1e]">
                  {c.code ? (
                    <span className="px-2 py-0.5 rounded bg-[#f2f4f6] text-[#002660] font-bold">
                      {c.code}
                    </span>
                  ) : (
                    '—'
                  )}
                </TableCell>
                <TableCell className="py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(c)}
                      className="h-8 w-8 p-0 text-[#002660] hover:bg-[#d2e5f6]/50 rounded-lg cursor-pointer"
                      title="Edit country"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(c)}
                      className="h-8 w-8 p-0 text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg cursor-pointer"
                      title="Delete country"
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
