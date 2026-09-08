"use client";

import React, { useState } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { cn } from '@/lib/utils';

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  keywords?: string[];
}

interface ComboboxProps {
  value?: string | null;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  icon?: React.ElementType;
  className?: string;
  popoverClassName?: string;
  disabled?: boolean;
  error?: boolean;
  allowClear?: boolean;
}

export function Combobox({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  searchPlaceholder = 'Type to search...',
  emptyText = 'No options found.',
  icon: Icon,
  className,
  popoverClassName,
  disabled = false,
  error = false,
  allowClear = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center justify-between gap-2 rounded-xl border bg-[#f7f9fb] px-3 py-2 text-xs transition-all outline-none cursor-pointer select-none text-left',
          error
            ? 'border-rose-400 bg-rose-50/20 focus-visible:ring-2 focus-visible:ring-rose-500/20'
            : 'border-[#e2e8f0] focus-visible:border-[#002660] focus-visible:ring-2 focus-visible:ring-[#002660]/20',
          !selectedOption && 'text-slate-400',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && (
            <Icon
              className={cn(
                'w-3.5 h-3.5 shrink-0',
                selectedOption ? 'text-[#002660]' : 'text-slate-400'
              )}
            />
          )}
          {selectedOption ? (
            <span className="font-semibold text-slate-800 tracking-tight truncate">
              {selectedOption.label}
            </span>
          ) : (
            <span className="truncate">{placeholder}</span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {allowClear && value && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 cursor-pointer transition-colors"
              title="Clear selection"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 opacity-70" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn(
          'w-[var(--anchor-width)] min-w-[240px] p-0 rounded-2xl shadow-xl border border-slate-200 bg-white overflow-hidden',
          popoverClassName
        )}
      >
        <Command
          filter={(itemValue, search) => {
            const opt = options.find((o) => o.value === itemValue);
            if (!opt) return 0;
            const searchLower = search.toLowerCase().trim();
            const textToSearch = [
              opt.label,
              opt.value,
              opt.description || '',
              ...(opt.keywords || []),
            ]
              .join(' ')
              .toLowerCase();
            return textToSearch.includes(searchLower) ? 1 : 0;
          }}
        >
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList className="max-h-56 p-1">
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between py-2 px-2.5"
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <span
                        className={cn(
                          'text-xs tracking-tight truncate',
                          isSelected ? 'font-bold text-[#002660]' : 'text-slate-700'
                        )}
                      >
                        {opt.label}
                      </span>
                      {opt.description && (
                        <span className="text-[10px] text-slate-400 truncate">
                          {opt.description}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#002660] shrink-0" />
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
