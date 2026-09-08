import React from 'react';
import { CalendarDays } from 'lucide-react';

export function ActivitiesHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d2e5f6] text-[#002660] text-xs font-bold uppercase tracking-wider">
        <CalendarDays className="w-3.5 h-3.5" />
        <span>Council Programs</span>
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#002660] tracking-tight">
        Activities & Special Events
      </h1>
      <p className="text-sm sm:text-base text-[#444650] max-w-xl mx-auto leading-relaxed">
        Plenary debates, bilateral suites, engineering site tours, and cultural banquets during the 42nd HAPUA assembly.
      </p>
    </div>
  );
}
