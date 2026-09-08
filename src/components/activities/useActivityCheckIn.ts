import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { publicService } from '@/services';
import { Activity, Delegation } from '@/types';
import { isActivityDateReached } from '@/components/admin/activities/utils';

export function useActivityCheckIn(activityId: string) {
  const router = useRouter();

  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verification & Registration State
  const [delegationCode, setDelegationCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifiedDelegate, setVerifiedDelegate] = useState<Delegation | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const data = await publicService.getActivity(activityId);
        setActivity(data);
      } catch (err: unknown) {
        setError('Activity not found or is no longer available.');
      } finally {
        setLoading(false);
      }
    }
    if (activityId) fetchActivity();
  }, [activityId]);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegationCode.trim()) return;

    if (activity && !isActivityDateReached(activity)) {
      setVerifyError('Registration is not yet open. It will open on the activity start date.');
      return;
    }

    setVerifying(true);
    setVerifyError(null);

    try {
      const res = await publicService.checkDelegation(delegationCode.trim());
      if (res && res.id) {
        setVerifiedDelegate(res);
      } else {
        setVerifyError('Delegation code not found in council records.');
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setVerifyError(
        axiosErr.response?.data?.message ||
          'Delegation code not recognized. Please verify your badge confirmation email.'
      );
    } finally {
      setVerifying(false);
    }
  };

  const handleConfirmRegistration = async () => {
    if (!verifiedDelegate || !delegationCode || !activity) return;

    if (!isActivityDateReached(activity)) {
      setVerifyError('Registration is not yet open. It will open on the activity start date.');
      return;
    }

    setRegistering(true);
    setVerifyError(null);

    try {
      await publicService.registerForActivity({
        delegationCode: delegationCode.trim(),
        activityId: activity.id || activityId,
      });
      setShowSuccessModal(true);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      const msg = axiosErr.response?.data?.message || 'Registration failed or session limit reached.';

      // If already registered, still celebrate and allow navigating to agenda
      if (msg.toLowerCase().includes('already registered')) {
        setShowSuccessModal(true);
      } else {
        setVerifyError(msg);
      }
    } finally {
      setRegistering(false);
    }
  };

  const handleResetDelegate = () => {
    setVerifiedDelegate(null);
    setDelegationCode('');
    setVerifyError(null);
  };

  const handleNavigateToAgenda = () => {
    setShowSuccessModal(false);
    const targetId = activity?.id || activityId;
    router.push(`/agenda/${targetId}`);
  };

  const handleBackToActivities = () => {
    router.push('/activities');
  };

  return {
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
  };
}
