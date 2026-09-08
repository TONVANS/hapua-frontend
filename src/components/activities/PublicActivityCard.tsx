'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarDays, Clock, MapPin, QrCode, CheckCircle2, Users, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Delegation } from '@/types';
import { formatEventDate, isActivityDateReached } from '@/components/admin/activities/utils';
import { ActivityRegisterModal } from './ActivityRegisterModal';

const STORAGE_REGISTERED_ACTIVITIES = 'hapua_registered_activities';

export interface PublicActivityCardProps {
  activity: Activity;
  isRegistered?: boolean;
  verifiedDelegate?: Delegation | null;
  delegationCode?: string;
  registering?: boolean;
  onRegister?: (activityId: string) => Promise<void> | void;
  onRegisterSuccess?: (activityId: string, delegate: Delegation) => void;
}

export function PublicActivityCard({
  activity,
  isRegistered = false,
  verifiedDelegate = null,
  delegationCode = '',
  registering = false,
  onRegister,
  onRegisterSuccess,
}: PublicActivityCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localRegistered, setLocalRegistered] = useState(false);

  // Check saved registrations in localStorage
  useEffect(() => {
    try {
      const savedRegsStr = localStorage.getItem(STORAGE_REGISTERED_ACTIVITIES);
      if (savedRegsStr) {
        const parsedRegs: string[] = JSON.parse(savedRegsStr);
        if (Array.isArray(parsedRegs) && activity?.id && parsedRegs.includes(activity.id)) {
          setLocalRegistered(true);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [activity?.id]);

  const effectiveIsRegistered = isRegistered || localRegistered;
  const hasReachedStartDate = isActivityDateReached(activity);
  const isCompleted = activity.status === 'COMPLETED';
  const isCanceled = activity.status === 'CANCELED';
  const isNotAvailable = !hasReachedStartDate || isCompleted || isCanceled;

  const handleButtonClick = () => {
    if (!effectiveIsRegistered && isNotAvailable) return;
    setIsModalOpen(true);
  };

  const handleRegisterSuccess = (activityId: string, delegate: Delegation) => {
    setLocalRegistered(true);
    if (onRegisterSuccess) {
      onRegisterSuccess(activityId, delegate);
    }
    if (onRegister) {
      onRegister(activityId);
    }
  };

  return (
    <>
      <Card className="glass-panel rounded-3xl border border-white/80 overflow-hidden hover-lift transition-all flex flex-col justify-between">
        <CardContent className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#d9e2ff] text-[#002660]">
              {activity.status || 'Session'}
            </span>
            {activity.qrCode && (
              <span className="font-mono text-[10px] text-[#4f616f] flex items-center gap-1 bg-[#f2f4f6] px-2 py-0.5 rounded-md">
                <QrCode className="w-3 h-3 text-[#002660]" /> {activity.qrCode}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-[#002660] leading-snug">{activity.name}</h3>

          <p className="text-xs text-[#444650] leading-relaxed line-clamp-3">
            {activity.description || 'Exclusive session organized for 42nd HAPUA Council delegates.'}
          </p>

          <div className="pt-2 border-t border-[#e2e8f0]/60 space-y-2 text-xs text-[#4f616f]">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5 text-[#002660]" />
              <span>
                {formatEventDate(activity.date)}
              </span>
            </div>
            {activity.startTime && activity.endTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#002660]" />
                <span>
                  {new Date(activity.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                  {new Date(activity.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )}
            {activity.room?.name && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#002660]" />
                <span>{activity.room.name}</span>
              </div>
            )}
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-between gap-2">
            <Link href={`/agenda/${activity.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-[#002660]/20 text-[#002660] hover:bg-[#d2e5f6]/50 text-xs font-semibold h-10 px-4 cursor-pointer"
              >
                View Details & Photos
              </Button>
            </Link>

            <Button
              onClick={handleButtonClick}
              disabled={registering || (!effectiveIsRegistered && isNotAvailable)}
              title={
                !effectiveIsRegistered && !hasReachedStartDate
                  ? `Registration opens on ${formatEventDate(activity.date)}`
                  : undefined
              }
              className={`text-xs font-semibold rounded-xl h-10 px-4 transition-all ${
                effectiveIsRegistered
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                  : isCanceled
                  ? 'bg-rose-50 text-rose-500 border border-rose-200 cursor-not-allowed shadow-none'
                  : isCompleted
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                  : !hasReachedStartDate
                  ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed shadow-none hover:bg-slate-100'
                  : 'bg-[#002660] hover:bg-[#1a3c7d] text-white shadow-md shadow-[#002660]/20 cursor-pointer'
              }`}
            >
              {effectiveIsRegistered ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Registered
                </>
              ) : isCanceled ? (
                <>
                  <AlertCircle className="w-3.5 h-3.5 mr-1.5 text-rose-500" /> Canceled
                </>
              ) : isCompleted ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> Concluded
                </>
              ) : !hasReachedStartDate ? (
                <>
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  <span>Registration Opens {formatEventDate(activity.date, { month: 'short', day: 'numeric' })}</span>
                </>
              ) : verifiedDelegate ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Sign Up for Session
                </>
              ) : (
                <>
                  <Users className="w-3.5 h-3.5 mr-1.5" /> Sign In with Code
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Registration Modal */}
      <ActivityRegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activity={activity}
        initialDelegate={verifiedDelegate}
        initialCode={delegationCode}
        isRegistered={effectiveIsRegistered}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </>
  );
}

