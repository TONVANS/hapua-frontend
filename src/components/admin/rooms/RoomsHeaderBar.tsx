import React from 'react';
import { Plus, Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface RoomsHeaderBarProps {
  search: string;
  setSearch: (search: string) => void;
  loading: boolean;
  onRefresh: () => void;
  onOpenCreate: () => void;
}

export function RoomsHeaderBar({
  search,
  setSearch,
  loading,
  onRefresh,
  onOpenCreate,
}: RoomsHeaderBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#002660] tracking-tight">Meeting Rooms</h2>
          <p className="text-xs text-[#4f616f]">
            Plenary halls, bilateral negotiation suites, and press briefing spaces
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="rounded-xl border-[#e2e8f0] text-[#002660] hover:bg-[#f2f4f6] cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={onOpenCreate}
            className="bg-[#002660] hover:bg-[#1a3c7d] text-white rounded-xl shadow-md text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Room
          </Button>
        </div>
      </div>

      <div className="p-4 bg-white rounded-2xl border border-[#e2e8f0] shadow-xs flex items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#747781] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search room name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
