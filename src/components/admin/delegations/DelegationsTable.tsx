import React from 'react';
import {
  Users,
  Edit2,
  Trash2,
  QrCode,
  Building,
  Globe,
  Loader2,
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
import { Delegation } from '@/types';

interface DelegationsTableProps {
  delegations: Delegation[];
  loading: boolean;
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onEdit: (delegation: Delegation) => void;
  onDelete: (delegation: Delegation) => void;
}

export function DelegationsTable({
  delegations,
  loading,
  total,
  page,
  limit,
  onPageChange,
  onEdit,
  onDelete,
}: DelegationsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-[#f7f9fb] border-b border-[#e2e8f0]">
          <TableRow>
            <TableHead className="text-xs font-bold text-[#002660]">Delegate</TableHead>
            <TableHead className="text-xs font-bold text-[#002660]">Delegation Code</TableHead>
            <TableHead className="text-xs font-bold text-[#002660]">Country</TableHead>
            <TableHead className="text-xs font-bold text-[#002660]">Organization</TableHead>
            <TableHead className="text-xs font-bold text-[#002660]">Role</TableHead>
            <TableHead className="text-xs font-bold text-[#002660] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-xs text-[#747781]">
                <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-[#002660]" />
                Loading delegation directory...
              </TableCell>
            </TableRow>
          ) : delegations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-xs text-[#747781]">
                <Users className="w-8 h-8 mx-auto text-[#c4c6d2] mb-2" />
                No delegates found matching the criteria.
              </TableCell>
            </TableRow>
          ) : (
            delegations.map((del) => (
              <TableRow
                key={del.id}
                className="hover:bg-[#d2e5f6]/25 transition-colors border-b border-[#f2f4f6]"
              >
                <TableCell className="py-3">
                  <div className="flex flex-col max-w-[220px]">
                    <span
                      className="font-semibold text-sm text-[#002660] truncate"
                      title={`${del.title ? `${del.title} ` : ''}${del.firstName} ${del.lastName}`}
                    >
                      {del.title ? `${del.title} ` : ''}
                      {del.firstName} {del.lastName}
                    </span>
                    <span className="text-xs text-[#747781] truncate" title={del.email}>
                      {del.email}
                    </span>
                    {del.position && (
                      <span className="text-[11px] text-[#4f616f] italic truncate" title={del.position}>
                        {del.position}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="py-3">
                  {del.delegationCode ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#f2f4f6] text-[#002660] border border-[#e0e3e5]">
                      <QrCode className="w-3.5 h-3.5 text-[#002660] shrink-0" />
                      {del.delegationCode}
                    </span>
                  ) : (
                    <span className="text-xs text-[#a0a3ad]">Not generated</span>
                  )}
                </TableCell>

                <TableCell className="py-3">
                  {del.country?.name ? (
                    <div
                      className="flex items-center gap-1.5 text-xs text-[#191c1e] font-medium max-w-[160px]"
                      title={del.country.name}
                    >
                      <Globe className="w-3.5 h-3.5 text-[#4f616f] shrink-0" />
                      <span className="truncate">{del.country.name}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#a0a3ad]">—</span>
                  )}
                </TableCell>

                <TableCell className="py-3">
                  {del.organization?.name ? (
                    <div
                      className="flex items-center gap-1.5 text-xs text-[#191c1e] max-w-[180px]"
                      title={del.organization.name}
                    >
                      <Building className="w-3.5 h-3.5 text-[#4f616f] shrink-0" />
                      <span className="truncate">{del.organization.shortName || del.organization.name}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#a0a3ad]">—</span>
                  )}
                </TableCell>

                <TableCell className="py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      del.role === 'ADMIN'
                        ? 'bg-[#002660] text-white'
                        : 'bg-[#d2e5f6] text-[#002660]'
                    }`}
                  >
                    {del.role}
                  </span>
                </TableCell>

                <TableCell className="py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(del)}
                      className="h-8 w-8 p-0 text-[#002660] hover:bg-[#d2e5f6]/50 rounded-lg cursor-pointer"
                      title="Edit delegate"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(del)}
                      className="h-8 w-8 p-0 text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg cursor-pointer"
                      title="Delete delegate"
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
      <div className="px-6 py-4 border-t border-[#e6e8ea] flex items-center justify-between text-xs text-[#747781]">
        <span>
          Showing {delegations.length} of {total} registered delegates
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
            disabled={delegations.length < limit || page * limit >= total}
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
