'use client';

import React from 'react';
import { motion } from 'motion/react';
import { QrCode, AlertCircle, CheckCircle2, Loader2, ShieldCheck, CalendarPlus, Users, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity, Delegation } from '@/types';
import { formatEventDate, isActivityDateReached } from '@/components/admin/activities/utils';

interface ActivityRegistrationSidebarProps {
  activity: Activity;
  delegationCode: string;
  setDelegationCode: (code: string) => void;
  verifying: boolean;
  registering: boolean;
  verifiedDelegate: Delegation | null;
  isRegistered: boolean;
  verifyError: string | null;
  registerSuccess: string | null;
  onVerifyAndRegister: (e: React.FormEvent) => Promise<void>;
}

export function ActivityRegistrationSidebar({
  activity,
  delegationCode,
  setDelegationCode,
  verifying,
  registering,
  verifiedDelegate,
  isRegistered,
  verifyError,
  registerSuccess,
  onVerifyAndRegister,
}: ActivityRegistrationSidebarProps) {
  const hasReachedStartDate = isActivityDateReached(activity);
  const isCompleted = activity?.status === 'COMPLETED';
  const isCanceled = activity?.status === 'CANCELED';
  const isRegistrationDisabled = !hasReachedStartDate || isCompleted || isCanceled;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-modal rounded-3xl p-6 sm:p-7 border-2 border-white/90 shadow-2xl relative overflow-hidden space-y-5"
    >
      {/* Decorative Corner Glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#ffe088]/25 to-transparent rounded-bl-full pointer-events-none" />

      <div className="flex items-center gap-3 pb-2 border-b border-slate-200/80">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#002660] to-[#1a3c7d] text-white flex items-center justify-center shadow-md">
          <QrCode className="w-6 h-6 text-[#ffe088]" />
        </div>
        <div>
          <h3 className="font-extrabold text-base text-[#002660]">Delegate Sign-Up</h3>
          <p className="text-xs text-[#747781]">Instant session seat allocation</p>
        </div>
      </div>

      {/* Feedback alerts */}
      {verifyError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 shadow-xs"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
          <span className="font-medium">{verifyError}</span>
        </motion.div>
      )}

      {registerSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 shadow-xs"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
          <span className="font-medium">{registerSuccess}</span>
        </motion.div>
      )}

      {!isRegistered && !hasReachedStartDate && (
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5 shadow-xs">
          <Clock className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <div className="space-y-0.5 text-left">
            <p className="font-bold">Registration Opens on Activity Date</p>
            <p className="text-[11px] text-amber-700 leading-relaxed">
              Session check-in and delegate seat allocation will become active on {formatEventDate(activity.date)}.
            </p>
          </div>
        </div>
      )}

      {!isRegistered && isCompleted && (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5 shadow-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-slate-500 mt-0.5" />
          <div className="space-y-0.5 text-left">
            <p className="font-bold">Session Concluded</p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              This council session has completed. Delegate registration is closed.
            </p>
          </div>
        </div>
      )}

      {!isRegistered && isCanceled && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 shadow-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          <div className="space-y-0.5 text-left">
            <p className="font-bold">Session Canceled</p>
            <p className="text-[11px] text-rose-700 leading-relaxed">
              This session has been canceled. Registration is not available.
            </p>
          </div>
        </div>
      )}

      {isRegistered ? (
        <div className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-sm text-emerald-950">Seat Reserved & Confirmed</h4>
            <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
              You are officially registered for this session. Please present your digital or physical delegate badge at the entrance.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={onVerifyAndRegister} className="space-y-3.5">
          <p className="text-xs text-[#4f616f] leading-relaxed">
            Accredited delegates can verify credentials to secure priority seating for this plenary session.
          </p>

          <Input
            placeholder="DELEGATION ID (ID: XXXX)"
            value={delegationCode}
            disabled={isRegistrationDisabled}
            onChange={(e) => setDelegationCode(e.target.value.toUpperCase())}
            className={`h-11 text-xs font-mono font-extrabold uppercase bg-white border-slate-300 focus:border-[#002660] rounded-xl text-center tracking-widest shadow-xs ${
              isRegistrationDisabled ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''
            }`}
          />

          <Button
            type="submit"
            disabled={verifying || registering || !delegationCode.trim() || isRegistrationDisabled}
            className={`w-full h-11 text-xs font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
              isRegistrationDisabled
                ? 'bg-slate-200 text-slate-500 border border-slate-300/60 shadow-none cursor-not-allowed'
                : 'bg-gradient-to-r from-[#002660] to-[#1a3c7d] hover:from-[#001945] hover:to-[#002660] text-white shadow-[#002660]/25 hover:scale-[1.01] active:scale-[0.99] cursor-pointer border border-[#d4af37]/40'
            }`}
          >
            {!hasReachedStartDate ? (
              <>
                <Clock className="w-4 h-4 text-slate-500 mr-1" />
                <span>Registration Opens {formatEventDate(activity.date, { month: 'short', day: 'numeric' })}</span>
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-500 mr-1" />
                <span>Session Concluded</span>
              </>
            ) : isCanceled ? (
              <>
                <AlertCircle className="w-4 h-4 text-rose-500 mr-1" />
                <span>Session Canceled</span>
              </>
            ) : verifying || registering ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
                <span>Validating Accreditation...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-[#ffe088]" />
                <span>Register for Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </Button>
        </form>
      )}

      {/* Calendar Export Helper */}
      <div className="pt-3 border-t border-slate-200/80">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const startISO = new Date(activity.startTime).toISOString().replace(/-|:|\.\d\d\d/g, '');
            const endISO = new Date(activity.endTime).toISOString().replace(/-|:|\.\d\d\d/g, '');
            const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
              activity.name
            )}&dates=${startISO}/${endISO}&details=${encodeURIComponent(
              activity.description || ''
            )}&location=${encodeURIComponent(activity.room?.name || 'Luang Prabang International Convention Hall')}`;
            window.open(gCalUrl, '_blank');
          }}
          className="w-full text-xs font-bold rounded-xl border-[#002660]/25 text-[#002660] hover:bg-[#d2e5f6]/50 h-10 transition-all cursor-pointer shadow-2xs"
        >
          <CalendarPlus className="w-4 h-4 mr-2 text-[#cca730]" />
          <span>Add to Google Calendar</span>
        </Button>
      </div>
    </motion.div>
  );
}
