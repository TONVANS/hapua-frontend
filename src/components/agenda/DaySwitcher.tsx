import React from 'react';

interface DayOption {
  date: string;
  label: string;
  subtitle: string;
}

interface DaySwitcherProps {
  days: DayOption[];
  selectedDay: string;
  onSelectDay: (date: string) => void;
}

export function DaySwitcher({ days, selectedDay, onSelectDay }: DaySwitcherProps) {
  return (
    <div className="sticky top-20 z-20 py-4 mb-8 bg-[#f7f9fb]/90 backdrop-blur-xl border-y border-[#e2e8f0]">
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {days.map((day) => {
          const isSelected = selectedDay === day.date;
          return (
            <button
              key={day.date}
              onClick={() => onSelectDay(day.date)}
              className={`px-4 sm:px-6 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex flex-col items-center gap-0.5 cursor-pointer ${
                isSelected
                  ? 'bg-[#002660] text-white shadow-lg shadow-[#002660]/20 scale-105'
                  : 'bg-white border border-[#e2e8f0] text-[#4f616f] hover:bg-[#d2e5f6]/40 hover:text-[#002660]'
              }`}
            >
              <span className="text-xs uppercase tracking-wider">{day.label}</span>
              <span className={`text-[10px] font-normal ${isSelected ? 'text-[#ffe088]' : 'text-[#747781]'}`}>
                {day.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
