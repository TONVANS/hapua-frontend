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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity, Delegation } from '@/types';
import { formatEventDate, isActivityDateReached } from '@/components/admin/activities/utils';
import { motion } from 'motion/react';

interface ActivityCheckInFormProps {
  activity: Activity;
  delegationCode: string;
  setDelegationCode: (code: string) => void;
  verifying: boolean;
  verifiedDelegate: Delegation | null;
  verifyError: string | null;
  registering: boolean;
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
  onVerifyCode,
  onConfirmRegistration,
  onResetDelegate,
}: ActivityCheckInFormProps) {
  const hasReachedStartDate = isActivityDateReached(activity);
  const isCompleted = activity?.status === 'COMPLETED';
  const isCanceled = activity?.status === 'CANCELED';
  const isRegistrationDisabled = !hasReachedStartDate || isCompleted || isCanceled;
  return (
    <div className="bg-white/90 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border border-white/60 shadow-[0_12px_36px_rgba(0,38,96,0.06)]">
      {!verifiedDelegate ? (
        <form onSubmit={onVerifyCode} className="flex flex-col gap-4">
          <div className="text-center mb-1">
            <div className="w-12 h-12 rounded-2xl bg-[#002660]/5 text-[#002660] flex items-center justify-center mx-auto mb-2.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-[#002660]">Delegate Accreditation</h2>
            <p className="text-xs text-[#747781] mt-0.5">
              Enter your unique delegation code to verify and register.
            </p>
          </div>

          {!hasReachedStartDate ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3 shadow-xs">
              <Clock className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
              <div className="space-y-0.5 text-left">
                <p className="font-bold text-sm">Registration Not Open Yet</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Session check-in & accreditation opens on {formatEventDate(activity.date)}. Please return on the activity start date to register.
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

          <div>
            <Input
              placeholder="e.g. HAP-LA1 or HAPUA-DEL-001"
              value={delegationCode}
              disabled={isRegistrationDisabled}
              onChange={(e) => setDelegationCode(e.target.value.toUpperCase())}
              className={`h-13 text-center text-base tracking-widest font-mono font-bold uppercase bg-[#f7f9fb] border-[#e2e8f0] rounded-2xl shadow-inner focus-visible:ring-[#002660] focus-visible:border-[#002660] ${
                isRegistrationDisabled ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''
              }`}
              autoFocus={!isRegistrationDisabled}
            />
            {verifyError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] text-[#ba1a1a] mt-2 text-center bg-[#ffdad6]/40 py-2 px-3 rounded-xl font-medium border border-[#ffdad6]"
              >
                {verifyError}
              </motion.p>
            )}
          </div>

          <Button
            type="submit"
            disabled={verifying || !delegationCode.trim() || isRegistrationDisabled}
            className={`h-13 rounded-2xl font-bold text-sm shadow-md transition-all ${
              isRegistrationDisabled
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
                : 'bg-[#002660] hover:bg-[#1a3c7d] text-white hover:shadow-lg active:scale-[0.98] cursor-pointer'
            }`}
          >
            {!hasReachedStartDate ? (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Registration Opens on Activity Date</span>
              </div>
            ) : isCompleted ? (
              <span>Session Concluded</span>
            ) : isCanceled ? (
              <span>Session Canceled</span>
            ) : verifying ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Accreditation...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Verify Delegate Code</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col gap-5 text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
            <UserCheck className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#002660]">Verified Delegate</h2>
            <p className="text-xs text-[#747781] mt-0.5">
              Please confirm your participation in this activity.
            </p>
          </div>

          {/* Delegate Summary Badge */}
          <div className="bg-[#f7f9fb] p-4 rounded-2xl border border-[#e2e8f0] text-left space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-[#e2e8f0]">
              <span className="text-[11px] text-[#747781]">Code</span>
              <span className="font-mono text-xs font-bold text-[#002660] bg-white px-2 py-0.5 rounded border border-[#e2e8f0]">
                {verifiedDelegate.delegationCode}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-[#747781]">Name</span>
              <span className="font-bold text-slate-800">
                {verifiedDelegate.title ? `${verifiedDelegate.title} ` : ''}
                {verifiedDelegate.firstName} {verifiedDelegate.lastName}
              </span>
            </div>

            {verifiedDelegate.position && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#747781]">Position</span>
                <span className="font-medium text-slate-700 max-w-[200px] truncate text-right">
                  {verifiedDelegate.position}
                </span>
              </div>
            )}

            {verifiedDelegate.country?.name && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#747781] flex items-center gap-1">
                  <Globe2 className="w-3 h-3" /> Country
                </span>
                <span className="font-medium text-slate-700">
                  {verifiedDelegate.country.name}
                </span>
              </div>
            )}

            {verifiedDelegate.organization?.name && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#747781] flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> Utility
                </span>
                <span className="font-medium text-slate-700 max-w-[200px] truncate text-right">
                  {verifiedDelegate.organization.shortName || verifiedDelegate.organization.name}
                </span>
              </div>
            )}
          </div>

          {verifyError && (
            <p className="text-[11px] text-[#ba1a1a] bg-[#ffdad6]/40 py-2 px-3 rounded-xl font-medium border border-[#ffdad6]">
              {verifyError}
            </p>
          )}

          <div className="flex flex-col gap-2 pt-1">
            <Button
              onClick={onConfirmRegistration}
              disabled={registering || isRegistrationDisabled}
              className={`h-13 rounded-2xl font-bold text-sm shadow-md transition-all ${
                isRegistrationDisabled
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
                  : 'bg-[#002660] hover:bg-[#1a3c7d] text-white hover:shadow-lg active:scale-[0.98] cursor-pointer'
              }`}
            >
              {!hasReachedStartDate ? (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Registration Opens on Activity Date</span>
                </div>
              ) : isCompleted ? (
                <span>Session Concluded</span>
              ) : isCanceled ? (
                <span>Session Canceled</span>
              ) : registering ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Confirming Check-in...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
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
              Use a different delegation code
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
