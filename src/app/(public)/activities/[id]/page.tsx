'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import {
  Loader2,
  MapPin,
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ActivityCheckInInfoCard,
  ActivityCheckInForm,
  ActivitySuccessModal,
  useActivityCheckIn,
} from '@/components/activities';
import { formatEventDate } from '@/components/admin/activities/utils';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

export default function ActivityCheckInPage() {
  const params = useParams();
  const activityId = params.id as string;

  const {
    activity,
    loading,
    error,
    delegationCode,
    setDelegationCode,
    verifying,
    verifiedDelegate,
    verifyError,
    registering,
    isAlreadyRegistered,
    showSuccessModal,
    setShowSuccessModal,
    handleVerifyCode,
    handleConfirmRegistration,
    handleResetDelegate,
    handleNavigateToAgenda,
    handleBackToActivities,
  } = useActivityCheckIn(activityId);

  return (
    <>
      <main className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-start">
        {/* Navigation & Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <Button
            variant="ghost"
            onClick={handleBackToActivities}
            className="text-[#4f616f] hover:text-[#002660] hover:bg-white/70 backdrop-blur-md rounded-2xl transition-all -ml-2 text-xs font-bold h-9 px-3 cursor-pointer shadow-2xs border border-transparent hover:border-slate-200/60"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Activities
          </Button>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#747781] font-medium">
            <Link href="/" className="hover:text-[#002660] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/activities" className="hover:text-[#002660] transition-colors">Activities</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#002660] font-bold truncate max-w-[220px]">
              {activity ? activity.name : 'Check-In'}
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            /* Loading State */
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center p-12 sm:p-16 bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/70 shadow-xl max-w-md mx-auto w-full my-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#002660]/5 flex items-center justify-center mb-4 shadow-inner">
                <Loader2 className="w-8 h-8 animate-spin text-[#002660]" />
              </div>
              <p className="text-[#002660] font-black text-base">Connecting to Activity Records...</p>
              <p className="text-xs text-[#747781] mt-1 text-center">
                Fetching session accreditation and venue information
              </p>
            </motion.div>
          ) : error || !activity ? (
            /* Not Found State */
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/85 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/70 shadow-xl text-center max-w-md mx-auto w-full my-8"
            >
              <div className="w-16 h-16 bg-[#ffdad6] text-[#ba1a1a] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                <MapPin className="w-8 h-8" />
              </div>
              <h1 className="text-xl font-black text-[#002660] mb-2">Session Not Found</h1>
              <p className="text-xs text-[#747781] mb-6 leading-relaxed">
                {error || 'This activity could not be found or has concluded. Please return to the directory.'}
              </p>
              <Button
                onClick={handleBackToActivities}
                className="bg-[#002660] hover:bg-[#1a3c7d] text-white rounded-2xl text-xs font-bold px-6 h-12 shadow-lg shadow-[#002660]/20 cursor-pointer"
              >
                Browse All Activities
              </Button>
            </motion.div>
          ) : (
            /* Active Activity Layout */
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col"
            >
              {/* Mobile-Only Quick Session Identity Banner */}
              {/* Shows essential context in minimal height so CheckInForm is visible above the fold */}
              <div className="block lg:hidden mb-4 bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white/80 shadow-sm">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#cca730] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Session Check-in Portal</span>
                </div>
                <h1 className="text-base sm:text-lg font-black text-[#002660] leading-snug line-clamp-2">
                  {activity.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-slate-200/60 text-xs text-[#4f616f]">
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-[#002660]" />
                    <span className="truncate max-w-[150px]">{activity.room?.name || 'Main Hall'}</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#002660]" />
                    <span>
                      {new Date(activity.startTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </span>
                </div>
              </div>

              {/* Main Responsive Grid */}
              {/* Mobile: Form (order-1) appears FIRST, followed by Full Details (order-2) */}
              {/* Desktop (lg): Left column has Details (col-span-7), Right column has Sticky Form (col-span-5) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* 1. Delegate Verification & Check-in Form */}
                {/* On mobile: order-1 (HERO priority above fold) */}
                {/* On desktop: order-2 (col-span-5, sticky top-32) */}
                <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-32 w-full">
                  <ActivityCheckInForm
                    activity={activity}
                    delegationCode={delegationCode}
                    setDelegationCode={setDelegationCode}
                    verifying={verifying}
                    verifiedDelegate={verifiedDelegate}
                    verifyError={verifyError}
                    registering={registering}
                    isAlreadyRegistered={isAlreadyRegistered}
                    onVerifyCode={handleVerifyCode}
                    onConfirmRegistration={handleConfirmRegistration}
                    onResetDelegate={handleResetDelegate}
                  />
                </div>

                {/* 2. Comprehensive Activity Info & Materials Card */}
                {/* On mobile: order-2 (Placed below the check-in form for reading details/documents) */}
                {/* On desktop: order-1 (col-span-7, full institutional briefing card) */}
                <div className="order-2 lg:order-1 lg:col-span-7 w-full">
                  <ActivityCheckInInfoCard activity={activity} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Success Confirmation Modal */}
      <ActivitySuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        activity={activity}
        verifiedDelegate={verifiedDelegate}
        onNavigateToAgenda={handleNavigateToAgenda}
        onBackToActivities={handleBackToActivities}
      />
    </>
  );
}
