'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AlertCircle, Loader2, Share2, Check, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { ActivityDetailContent, useActivityDetailData } from '@/components/agenda';
import { Button } from '@/components/ui/button';

export default function ActivityDetailPage() {
  const params = useParams();
  const activityId = params?.id as string;

  const {
    activity,
    gallery,
    loading,
    error,
    lightboxOpen,
    setLightboxOpen,
    lightboxIndex,
    setLightboxIndex,
    copiedLink,
    copiedCode,
    delegationCode,
    setDelegationCode,
    verifying,
    verifiedDelegate,
    verifyError,
    registering,
    isRegistered,
    registerSuccess,
    relatedActivities,
    handleVerifyAndRegister,
    calculateDuration,
    copySessionLink,
    copyQrCode,
  } = useActivityDetailData(activityId);

  return (
    <main className="pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 relative z-10">
      {/* Navigation Breadcrumb Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex items-center justify-between gap-4"
      >
        <Link
          href="/agenda"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#002660] hover:text-[#1a3c7d] bg-white/90 hover:bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 transition-all shadow-xs group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4 text-[#cca730] group-hover:-translate-x-1 transition-transform" />
          <span>Return to 5-Day Agenda</span>
        </Link>

        <Button
          variant="outline"
          size="sm"
          onClick={copySessionLink}
          className="rounded-2xl border-slate-200/80 bg-white/90 hover:bg-white text-[#002660] text-xs h-10 px-4 cursor-pointer shadow-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {copiedLink ? (
            <Check className="w-4 h-4 mr-2 text-emerald-600" />
          ) : (
            <Share2 className="w-4 h-4 mr-2 text-[#cca730]" />
          )}
          <span>{copiedLink ? 'Link Copied!' : 'Share Session'}</span>
        </Button>
      </motion.div>

      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center text-xs text-[#4f616f] glass-panel rounded-3xl p-12 max-w-xl mx-auto shadow-xl border border-white/80">
          <div className="w-14 h-14 rounded-2xl bg-[#002660]/5 flex items-center justify-center mb-4">
            <Loader2 className="w-8 h-8 animate-spin text-[#002660]" />
          </div>
          <span className="font-extrabold text-sm text-[#002660]">Loading Session Agenda & Media...</span>
          <span className="text-xs text-[#747781] mt-1">Fetching ministerial briefs and documentation</span>
        </div>
      ) : error || !activity ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-24 text-center glass-panel rounded-3xl p-10 max-w-lg mx-auto space-y-4 shadow-xl border border-white/80"
        >
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-inner">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-[#002660]">Session Not Found</h2>
          <p className="text-xs text-[#4f616f] leading-relaxed">
            The requested session may have been rescheduled or removed from the official timetable.
          </p>
          <Link href="/agenda" className="inline-block pt-2">
            <Button className="bg-[#002660] hover:bg-[#1a3c7d] text-white text-xs font-bold rounded-xl h-11 px-6 shadow-md cursor-pointer">
              Return to Agenda Directory
            </Button>
          </Link>
        </motion.div>
      ) : (
        <ActivityDetailContent
          activity={activity}
          gallery={gallery}
          duration={calculateDuration(activity.startTime, activity.endTime)}
          copiedCode={copiedCode}
          onCopyQrCode={copyQrCode}
          lightboxOpen={lightboxOpen}
          setLightboxOpen={setLightboxOpen}
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
          delegationCode={delegationCode}
          setDelegationCode={setDelegationCode}
          verifying={verifying}
          registering={registering}
          verifiedDelegate={verifiedDelegate}
          isRegistered={isRegistered}
          verifyError={verifyError}
          registerSuccess={registerSuccess}
          onVerifyAndRegister={handleVerifyAndRegister}
          relatedActivities={relatedActivities}
        />
      )}
    </main>
  );
}
