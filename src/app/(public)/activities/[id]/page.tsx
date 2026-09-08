'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Loader2, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ActivityCheckInInfoCard,
  ActivityCheckInForm,
  ActivitySuccessModal,
  useActivityCheckIn,
} from '@/components/activities';
import { motion, AnimatePresence } from 'motion/react';

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
      <main className="pt-36 pb-24 max-w-lg mx-auto px-4 w-full flex-1 flex flex-col justify-center">
        <Button
          variant="ghost"
          onClick={handleBackToActivities}
          className="self-start mb-6 text-[#4f616f] hover:text-[#002660] hover:bg-white/50 rounded-xl transition-all -ml-2 text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Activities
        </Button>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center p-12 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#002660]/5 flex items-center justify-center mb-4">
                <Loader2 className="w-7 h-7 animate-spin text-[#002660]" />
              </div>
              <p className="text-[#002660] font-bold text-sm">Loading activity details...</p>
              <p className="text-xs text-[#747781] mt-1">Connecting to summit records</p>
            </motion.div>
          ) : error || !activity ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-2xl p-8 rounded-3xl border border-white/60 shadow-xl text-center"
            >
              <div className="w-16 h-16 bg-[#ffdad6] text-[#ba1a1a] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                <MapPin className="w-8 h-8" />
              </div>
              <h1 className="text-xl font-bold text-[#002660] mb-2">Session Not Found</h1>
              <p className="text-xs text-[#747781] mb-6 leading-relaxed">
                {error || 'This activity could not be found or has concluded.'}
              </p>
              <Button
                onClick={handleBackToActivities}
                className="bg-[#002660] hover:bg-[#1a3c7d] text-white rounded-xl text-xs font-semibold px-6 h-11 cursor-pointer"
              >
                Browse All Activities
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col gap-5"
            >
              {/* Activity Info Banner */}
              <ActivityCheckInInfoCard activity={activity} />

              {/* Delegate Verification & Check-in Form */}
              <ActivityCheckInForm
                activity={activity}
                delegationCode={delegationCode}
                setDelegationCode={setDelegationCode}
                verifying={verifying}
                verifiedDelegate={verifiedDelegate}
                verifyError={verifyError}
                registering={registering}
                onVerifyCode={handleVerifyCode}
                onConfirmRegistration={handleConfirmRegistration}
                onResetDelegate={handleResetDelegate}
              />
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
