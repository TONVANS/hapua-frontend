import React, { useMemo } from 'react';
import {
  Upload,
  RefreshCw,
  Search,
  LayoutGrid,
  LayoutList,
  X,
  CalendarDays,
  Globe,
  Lock,
  Image as ImageIcon,
  Film,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { Activity } from '@/types';

interface GalleryHeaderBarProps {
  search: string;
  setSearch: (search: string) => void;
  selectedActivityId: string;
  setSelectedActivityId: (id: string) => void;
  selectedVisibility: string;
  setSelectedVisibility: (vis: string) => void;
  selectedMediaType: string;
  setSelectedMediaType: (type: string) => void;
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
  activities: Activity[];
  loading: boolean;
  onRefresh: () => void;
  onOpenCreate: () => void;
}

export function GalleryHeaderBar({
  search,
  setSearch,
  selectedActivityId,
  setSelectedActivityId,
  selectedVisibility,
  setSelectedVisibility,
  selectedMediaType,
  setSelectedMediaType,
  viewMode,
  setViewMode,
  activities,
  loading,
  onRefresh,
  onOpenCreate,
}: GalleryHeaderBarProps) {
  const activityFilterOptions = useMemo(() => [
    { value: '', label: 'All Activities' },
    ...activities.map((act) => ({
      value: act.id,
      label: act.name,
      keywords: [act.name, act.date || ''],
    })),
  ], [activities]);

  const mediaTypeFilterOptions = useMemo(() => [
    { value: '', label: 'All Media Types' },
    { value: 'IMAGE', label: 'Photos Only', keywords: ['image', 'photo'] },
    { value: 'VIDEO', label: 'Videos Only', keywords: ['video', 'recording'] },
  ], []);

  const visibilityFilterOptions = useMemo(() => [
    { value: '', label: 'All Visibilities' },
    { value: 'PUBLIC', label: 'Public Access', keywords: ['public'] },
    { value: 'INTERNAL', label: 'Internal / Delegates', keywords: ['internal', 'private'] },
  ], []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#002660] tracking-tight">Media & Press Gallery</h2>
          <p className="text-xs text-[#4f616f]">
            Summit photography, keynote session videos, and press assets
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
            className="bg-[#002660] hover:bg-[#1a3c7d] text-white rounded-xl shadow-md shadow-[#002660]/20 text-xs font-semibold cursor-pointer"
          >
            <Upload className="w-4 h-4 mr-1.5" />
            Upload Media
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1">
          {/* Search Box */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-[#747781] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search title or caption..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Activity Selector */}
          <div className="w-full sm:w-56">
            <Combobox
              value={selectedActivityId}
              onChange={setSelectedActivityId}
              options={activityFilterOptions}
              placeholder="All Activities"
              searchPlaceholder="Filter activities..."
              icon={CalendarDays}
            />
          </div>

          {/* Media Type */}
          <div className="w-full sm:w-40">
            <Combobox
              value={selectedMediaType}
              onChange={setSelectedMediaType}
              options={mediaTypeFilterOptions}
              placeholder="All Media Types"
              searchPlaceholder="Filter type..."
              icon={selectedMediaType === 'VIDEO' ? Film : ImageIcon}
            />
          </div>

          {/* Visibility */}
          <div className="w-full sm:w-44">
            <Combobox
              value={selectedVisibility}
              onChange={setSelectedVisibility}
              options={visibilityFilterOptions}
              placeholder="All Visibilities"
              searchPlaceholder="Filter visibility..."
              icon={selectedVisibility === 'INTERNAL' ? Lock : Globe}
            />
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 border border-[#e2e8f0] p-1 rounded-xl bg-[#f7f9fb] self-end md:self-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('grid')}
            className={`h-8 px-2.5 rounded-lg text-xs font-semibold cursor-pointer ${
              viewMode === 'grid' ? 'bg-white shadow-xs text-[#002660]' : 'text-slate-500'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 mr-1" />
            Grid
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('table')}
            className={`h-8 px-2.5 rounded-lg text-xs font-semibold cursor-pointer ${
              viewMode === 'table' ? 'bg-white shadow-xs text-[#002660]' : 'text-slate-500'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5 mr-1" />
            Table
          </Button>
        </div>
      </div>
    </div>
  );
}
