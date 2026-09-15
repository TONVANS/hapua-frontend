import React, { useMemo } from 'react';
import { Plus, Search, RefreshCw, Globe, Building2, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { Country, Organization } from '@/types';

interface DelegationsHeaderBarProps {
  search: string;
  setSearch: (search: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedOrg: string;
  setSelectedOrg: (org: string) => void;
  countries: Country[];
  organizations: Organization[];
  loading: boolean;
  onRefresh: () => void;
  onOpenCreate: () => void;
  onExport: () => void;
  exporting?: boolean;
}

export function DelegationsHeaderBar({
  search,
  setSearch,
  selectedCountry,
  setSelectedCountry,
  selectedOrg,
  setSelectedOrg,
  countries,
  organizations,
  loading,
  onRefresh,
  onOpenCreate,
  onExport,
  exporting = false,
}: DelegationsHeaderBarProps) {
  const countryOptions = useMemo(() => [
    { value: '', label: 'All Countries' },
    ...countries.map((c) => ({
      value: c.id,
      label: `${c.name}${c.code ? ` (${c.code})` : ''}`,
      keywords: [c.name, c.code || ''],
    })),
  ], [countries]);

  const orgOptions = useMemo(() => [
    { value: '', label: 'All Organizations' },
    ...organizations.map((org) => ({
      value: org.id,
      label: org.shortName ? `${org.shortName} - ${org.name}` : org.name,
      keywords: [org.shortName || '', org.name],
    })),
  ], [organizations]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#002660] tracking-tight">Delegations</h2>
          <p className="text-xs text-[#4f616f]">
            Manage summit delegates, accreditation, and institutional affiliations
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
            variant="outline"
            size="sm"
            onClick={onExport}
            disabled={exporting || loading}
            className="rounded-xl border-[#002660]/20 text-[#002660] hover:bg-[#002660]/5 cursor-pointer font-medium"
          >
            <Download className={`w-3.5 h-3.5 mr-1.5 ${exporting ? 'animate-bounce' : ''}`} />
            {exporting ? 'Exporting...' : 'Export'}
          </Button>
          <Button
            onClick={onOpenCreate}
            className="bg-[#002660] hover:bg-[#1a3c7d] text-white rounded-xl shadow-md shadow-[#002660]/20 text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Delegate
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#747781] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by name or email..."
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

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1 justify-end">
          {/* Country Filter */}
          <div className="w-full sm:w-52">
            <Combobox
              value={selectedCountry}
              onChange={setSelectedCountry}
              options={countryOptions}
              placeholder="All Countries"
              searchPlaceholder="Search country..."
              icon={Globe}
            />
          </div>

          {/* Org Filter */}
          <div className="w-full sm:w-56">
            <Combobox
              value={selectedOrg}
              onChange={setSelectedOrg}
              options={orgOptions}
              placeholder="All Organizations"
              searchPlaceholder="Search organization..."
              icon={Building2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
