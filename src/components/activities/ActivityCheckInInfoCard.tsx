import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Activity } from '@/types';
import { formatEventDate } from '@/components/admin/activities/utils';

interface ActivityCheckInInfoCardProps {
  activity: Activity;
}

export function ActivityCheckInInfoCard({ activity }: ActivityCheckInInfoCardProps) {
  return (
    <div className="bg-white/85 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border border-white/60 shadow-[0_12px_36px_rgba(0,38,96,0.06)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#002660] via-[#0052cc] to-[#002660]" />

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#d2e5f6] text-[#002660] tracking-wide">
          HAPUA Council Session
        </span>
      </div>

      <h1 className="text-xl sm:text-2xl font-black text-[#002660] leading-snug mb-2 tracking-tight">
        {activity.name}
      </h1>

      {activity.description && (
        <p className="text-[#4f616f] text-xs leading-relaxed mb-5 line-clamp-3">
          {activity.description}
        </p>
      )}

      <div className="grid grid-cols-1 gap-2.5 bg-[#f7f9fb] p-4 rounded-2xl border border-[#e2e8f0]/80">
        <div className="flex items-center text-xs font-medium text-[#191c1e]">
          <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center mr-3 shadow-xs border border-slate-100 shrink-0">
            <Calendar className="w-3.5 h-3.5 text-[#002660]" />
          </div>
          <span>
            {formatEventDate(activity.date)}
          </span>
        </div>

        <div className="flex items-center text-xs font-medium text-[#191c1e]">
          <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center mr-3 shadow-xs border border-slate-100 shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#002660]" />
          </div>
          <span>
            {new Date(activity.startTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}{' '}
            -{' '}
            {new Date(activity.endTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        <div className="flex items-center text-xs font-medium text-[#191c1e]">
          <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center mr-3 shadow-xs border border-slate-100 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#002660]" />
          </div>
          <span className="truncate">{activity.room?.name || 'Off-site / Virtual Event'}</span>
        </div>
      </div>
    </div>
  );
}
