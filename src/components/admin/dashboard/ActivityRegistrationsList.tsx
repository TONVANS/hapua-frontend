import React from 'react';
import Link from 'next/link';
import { CalendarDays, Clock, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ActivityRegistrationStat } from '@/types';
import { formatEventDate } from '@/components/admin/activities/utils';

interface ActivityRegistrationsListProps {
  registrations: ActivityRegistrationStat[];
  loading: boolean;
}

export function ActivityRegistrationsList({
  registrations,
  loading,
}: ActivityRegistrationsListProps) {
  return (
    <div className="lg:col-span-8 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-[#002660]">Activity Registrations</h3>
          <p className="text-xs text-[#4f616f]">Real-time delegate signups across summit sessions</p>
        </div>
        <Link href="/admin/activities" className="text-xs text-[#002660] font-semibold hover:underline cursor-pointer">
          View All Activities →
        </Link>
      </div>

      <Card className="border border-[#e2e8f0] bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 flex justify-center items-center text-sm text-[#747781]">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading registrations...
            </div>
          ) : registrations.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#747781]">
              <CalendarDays className="w-8 h-8 mx-auto text-[#c4c6d2] mb-2" />
              <p>No activity registration data found.</p>
              <p className="text-xs text-[#a0a3ad] mt-1">Activities will display delegate counters once scheduled.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#e6e8ea]">
              {registrations.slice(0, 5).map((reg) => (
                <div
                  key={reg.activityId}
                  className="p-4 flex items-center justify-between hover:bg-[#f7f9fb] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#d2e5f6] text-[#002660] flex items-center justify-center font-bold text-xs">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#191c1e]">{reg.activityName}</p>
                      <p className="text-xs text-[#747781]">
                        {formatEventDate(reg.date, {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#002660] text-white">
                      {reg.registeredCount} Delegates
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
