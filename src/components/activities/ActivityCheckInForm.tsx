'use client';

import React from 'react';
import {
  Loader2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Building2,
  Globe2,
  Clock,
  AlertCircle,
  X,
  Sparkles,
  QrCode,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity, Delegation } from '@/types';
import { formatEventDate, isActivityDateReached } from '@/components/admin/activities/utils';
import { motion, AnimatePresence } from 'motion/react';

interface ActivityCheckInFormProps {
  activity: Activity;
  delegationCode: string;
  setDelegationCode: (code: string) => void;
  verifying: boolean;
  verifiedDelegate: Delegation | null;
  verifyError: string | null;
  registering: boolean;
  isAlreadyRegistered?: boolean;
  onVerifyCode: (e: React.FormEvent) => void;
  onConfirmRegistration: () => void;
  onResetDelegate: () => void;
}

export function ActivityCheckInForm({
  activity,
  delegationCode,
  setDelegationCode,
  verifying,
  verifiedDelegate,
  verifyError,
  registering,
  isAlreadyRegistered = false,
  onVerifyCode,
  onConfirmRegistration,
  onResetDelegate,
}: ActivityCheckInFormProps) {
  const hasReachedStartDate = isActivityDateReached(activity);
  const isCompleted = activity?.status === 'COMPLETED';
  const isCanceled = activity?.status === 'CANCELED';
  const isRegistrationDisabled = !hasReachedStartDate || isCompleted || isCanceled;

  // Delegate initials for avatar badge
  const delegateInitials = verifiedDelegate
    ? `${verifiedDelegate.firstName?.[0] || ''}${verifiedDelegate.lastName?.[0] || ''}`.toUpperCase()
    : 'DE';

  return (
    <div className="bg-white/95 backdrop-blur-2xl p-5 sm:p-7 rounded-3xl border border-white/80 shadow-[0_16px_44px_rgba(0,38,96,0.08)] relative overflow-hidden ring-1 ring-[#002660]/10 hover:ring-[#002660]/20 transition-all">
      {/* Top HAPUA decorative accent strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#002660] via-[#cca730] to-[#002660]" />

      {/* Top Status Tag */}
      <div className="flex items-center justify-between gap-2 mb-4">
        {isAlreadyRegistered ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Check className="w-3 h-3 stroke-[3]" /> Attendance Confirmed
          </span>
        ) : isCompleted ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-3 h-3" /> Session Concluded
          </span>
        ) : isCanceled ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3 h-3" /> Session Canceled
          </span>
        ) : !hasReachedStartDate ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3" /> Check-in Opens {formatEventDate(activity?.date, { month: 'short', day: 'numeric' })}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Check-in Open
          </span>
        )}

        <span className="text-[10px] font-bold uppercase tracking-wider text-[#747781] flex items-center gap-1">
          <QrCode className="w-3 h-3 text-[#cca730]" /> Fast Accreditation
        </span>
      </div>

      <AnimatePresence mode="wait">
        {/* State 1: Delegate is already registered */}
        {isAlreadyRegistered ? (
          <motion.div
            key="registered"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex flex-col gap-4 text-center py-2"
          >
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h2 className="text-xl font-black text-[#002660] tracking-tight">
                Attendance Confirmed!
              </h2>
              <p className="text-xs text-[#4f616f] mt-1 max-w-sm mx-auto leading-relaxed">
                You are officially accredited for this HAPUA council session. Your attendance record has been synced with the secretariat.
              </p>
            </div>

            {verifiedDelegate && (
              <div className="bg-[#f7f9fb] p-4 rounded-2xl border border-[#e2e8f0] text-left text-xs space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-[#e2e8f0]">
                  <span className="text-[#747781] font-medium">Delegate Code</span>
                  <span className="font-mono font-bold text-[#002660] bg-white px-2.5 py-0.5 rounded-lg border border-[#e2e8f0]">
                    {verifiedDelegate.delegationCode}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#747781] font-medium">Name</span>
                  <span className="font-bold text-slate-800">
                    {verifiedDelegate.title ? `${verifiedDelegate.title} ` : ''}
                    {verifiedDelegate.firstName} {verifiedDelegate.lastName}
                  </span>
                </div>
                {verifiedDelegate.organization?.name && (
                  <div className="flex justify-between items-center">
                    <span className="text-[#747781] font-medium">Utility / Org</span>
                    <span className="font-medium text-slate-700 truncate max-w-[200px]">
                      {verifiedDelegate.organization.shortName || verifiedDelegate.organization.name}
                    </span>
                  </div>
                )}
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={onResetDelegate}
              className="text-xs text-[#747781] hover:text-[#002660] rounded-xl h-9 cursor-pointer mx-auto"
            >
              Check in with a different badge code
            </Button>
          </motion.div>
        ) : !verifiedDelegate ? (
          /* State 2: Unverified form - Enter Delegate ID code */
          <motion.form
            key="input-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={onVerifyCode}
            className="flex flex-col gap-4"
          >
            <div className="text-center mb-1">
              <div className="w-14 h-14 rounded-2xl bg-[#002660]/5 text-[#002660] flex items-center justify-center mx-auto mb-3 shadow-inner">
                <ShieldCheck className="w-7 h-7 text-[#002660]" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-[#002660] tracking-tight">
                Delegate Accreditation
              </h2>
              <p className="text-xs text-[#4f616f] mt-1 leading-relaxed">
                Scan or enter your Delegate ID badge number to verify accreditation and register your presence.
              </p>
            </div>

            {/* Status alerts */}
            {!hasReachedStartDate ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3 shadow-xs">
                <Clock className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                <div className="space-y-0.5 text-left">
                  <p className="font-bold text-sm">Check-in Not Open Yet</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Session check-in & accreditation opens on {formatEventDate(activity?.date)}. Please return on the activity date to register.
                  </p>
                </div>
              </div>
            ) : isCompleted ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-start gap-3 shadow-xs">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-slate-500 mt-0.5" />
                <div className="space-y-0.5 text-left">
                  <p className="font-bold text-sm">Session Concluded</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    This council session has completed. Delegate registration is closed.
                  </p>
                </div>
              </div>
            ) : isCanceled ? (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3 shadow-xs">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                <div className="space-y-0.5 text-left">
                  <p className="font-bold text-sm">Session Canceled</p>
                  <p className="text-xs text-rose-700 leading-relaxed">
                    This session has been canceled. Registration is not available.
                  </p>
                </div>
              </div>
            ) : null}

            {/* Input area */}
            <div className="space-y-1.5">
              <div className="relative flex items-center">
                <Input
                  id="delegate-code-input"
                  placeholder="Enter Badge ID (e.g. TH-01)"
                  value={delegationCode}
                  disabled={isRegistrationDisabled || verifying}
                  onChange={(e) => setDelegationCode(e.target.value.toUpperCase())}
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck={false}
                  autoComplete="off"
                  className={`h-14 px-4 text-center text-base sm:text-lg tracking-widest font-mono font-bold uppercase bg-[#f7f9fb] border-[#cbd5e1] rounded-2xl shadow-inner transition-all focus-visible:ring-2 focus-visible:ring-[#002660] focus-visible:border-[#002660] ${
                    isRegistrationDisabled ? 'opacity-60 cursor-not-allowed bg-slate-100' : 'hover:border-[#002660]/40'
                  } ${delegationCode ? 'pr-12' : ''}`}
                  autoFocus={!isRegistrationDisabled}
                />
                {delegationCode && !verifying && !isRegistrationDisabled && (
                  <button
                    type="button"
                    onClick={() => setDelegationCode('')}
                    className="absolute right-3.5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
                    aria-label="Clear code"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between px-1 text-[11px] text-[#747781]">
                <span>Usually 4-8 characters on your badge</span>
                <span className="font-mono text-[10px] text-[#002660] font-semibold">ALL CAPS</span>
              </div>

              {verifyError && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#ba1a1a] mt-2 text-center bg-[#ffdad6]/50 py-2.5 px-3.5 rounded-2xl font-medium border border-[#ffdad6] flex items-center justify-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#ba1a1a]" />
                  <span>{verifyError}</span>
                </motion.div>
              )}
            </div>

            {/* Action button */}
            <Button
              type="submit"
              disabled={verifying || !delegationCode.trim() || isRegistrationDisabled}
              className={`h-14 rounded-2xl font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer ${
                isRegistrationDisabled
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-[#002660] via-[#003680] to-[#002660] hover:from-[#1a3c7d] hover:to-[#1a3c7d] text-white shadow-lg shadow-[#002660]/20 hover:shadow-xl active:scale-[0.98]'
              }`}
            >
              {!hasReachedStartDate ? (
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Opens on Activity Date</span>
                </div>
              ) : isCompleted ? (
                <span>Session Concluded</span>
              ) : isCanceled ? (
                <span>Session Canceled</span>
              ) : verifying ? (
                <div className="flex items-center justify-center gap-2.5">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying Accreditation...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Verify Delegate ID</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </Button>
          </motion.form>
        ) : (
          /* State 3: Delegate verified - Official Summit Pass & Confirmation */
          <motion.div
            key="verified-pass"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex flex-col gap-4 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 py-1.5 px-3 rounded-full w-fit mx-auto border border-emerald-100">
              <UserCheck className="w-4 h-4" />
              <span className="text-xs font-bold tracking-wide">Accreditation Verified</span>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#002660] tracking-tight">
                Confirm Your Participation
              </h2>
              <p className="text-xs text-[#4f616f] mt-0.5">
                Verify your credentials below and tap confirm to complete check-in.
              </p>
            </div>

            {/* Official Summit Delegate Pass Card */}
            <div className="bg-gradient-to-b from-[#f7f9fb] to-[#edf2f7] p-4 sm:p-5 rounded-2xl border border-[#cbd5e1] text-left relative overflow-hidden shadow-sm">
              <div className="flex items-start gap-3.5 pb-3 border-b border-slate-200/80">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#002660] to-[#0052cc] text-white flex items-center justify-center font-black text-sm shadow-md shrink-0">
                  {delegateInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#cca730] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Summit Delegate
                    </span>
                    <span className="font-mono text-xs font-black text-[#002660] bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                      {verifiedDelegate.delegationCode}
                    </span>
                  </div>
                  <h3 className="font-black text-base text-slate-900 leading-tight truncate mt-0.5">
                    {verifiedDelegate.title ? `${verifiedDelegate.title} ` : ''}
                    {verifiedDelegate.firstName} {verifiedDelegate.lastName}
                  </h3>
                  {verifiedDelegate.position && (
                    <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                      {verifiedDelegate.position}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 text-xs">
                {verifiedDelegate.country?.name && (
                  <div className="flex items-center gap-2 text-slate-700 bg-white/70 p-2 rounded-xl border border-slate-200/60">
                    <Globe2 className="w-4 h-4 text-[#002660] shrink-0" />
                    <span className="truncate font-semibold">{verifiedDelegate.country.name}</span>
                  </div>
                )}
                {verifiedDelegate.organization?.name && (
                  <div className="flex items-center gap-2 text-slate-700 bg-white/70 p-2 rounded-xl border border-slate-200/60">
                    <Building2 className="w-4 h-4 text-[#cca730] shrink-0" />
                    <span className="truncate font-semibold">
                      {verifiedDelegate.organization.shortName || verifiedDelegate.organization.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {verifyError && (
              <p className="text-xs text-[#ba1a1a] bg-[#ffdad6]/50 py-2.5 px-3 rounded-xl font-medium border border-[#ffdad6]">
                {verifyError}
              </p>
            )}

            <div className="flex flex-col gap-2.5 pt-1">
              <Button
                onClick={onConfirmRegistration}
                disabled={registering || isRegistrationDisabled}
                className={`h-14 rounded-2xl font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer ${
                  isRegistrationDisabled
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/25 active:scale-[0.98]'
                }`}
              >
                {!hasReachedStartDate ? (
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Check-in Opens on Activity Date</span>
                  </div>
                ) : isCompleted ? (
                  <span>Session Concluded</span>
                ) : isCanceled ? (
                  <span>Session Canceled</span>
                ) : registering ? (
                  <div className="flex items-center justify-center gap-2.5">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Confirming Check-in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Confirm Check-in & Register</span>
                  </div>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onResetDelegate}
                className="text-xs text-[#747781] hover:text-[#002660] rounded-xl h-9 cursor-pointer"
              >
                Change badge code
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
