import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { publicService } from '@/services';
import { Activity, Delegation } from '@/types';
import { isActivityDateReached } from '@/components/admin/activities/utils';

const STORAGE_DELEGATE_CODE = 'hapua_delegate_code';
const STORAGE_VERIFIED_DELEGATE = 'hapua_verified_delegate';
const STORAGE_REGISTERED_ACTIVITIES = 'hapua_registered_activities';

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
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch Activity Data
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

  // Read saved delegate & registration state from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCode = localStorage.getItem(STORAGE_DELEGATE_CODE);
      const savedDelegateStr = localStorage.getItem(STORAGE_VERIFIED_DELEGATE);
      if (savedCode) {
        setDelegationCode(savedCode);
      }
      if (savedDelegateStr) {
        const parsed = JSON.parse(savedDelegateStr);
        if (parsed && parsed.id) {
          setVerifiedDelegate(parsed);
        }
      }

      const savedRegsStr = localStorage.getItem(STORAGE_REGISTERED_ACTIVITIES);
      if (savedRegsStr) {
        const regs: string[] = JSON.parse(savedRegsStr);
        if (Array.isArray(regs) && (regs.includes(activityId) || (activity?.id && regs.includes(activity.id)))) {
          setIsAlreadyRegistered(true);
        }
      }
    } catch {
      // Ignore storage read errors in SSR/privacy mode
    }
  }, [activityId, activity?.id]);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = delegationCode.trim().toUpperCase();
    if (!cleanCode) return;

    if (activity && !isActivityDateReached(activity)) {
      setVerifyError('Registration is not yet open. It will open on the activity start date.');
      return;
    }

    setVerifying(true);
    setVerifyError(null);

    try {
      const res = await publicService.checkDelegation(cleanCode);
      if (res && res.id) {
        setVerifiedDelegate(res);
        try {
          localStorage.setItem(STORAGE_DELEGATE_CODE, cleanCode);
          localStorage.setItem(STORAGE_VERIFIED_DELEGATE, JSON.stringify(res));
        } catch {
          // Ignore storage write errors
        }
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

    const markRegisteredLocally = (actId: string) => {
      setIsAlreadyRegistered(true);
      try {
        const savedRegsStr = localStorage.getItem(STORAGE_REGISTERED_ACTIVITIES);
        const regs: string[] = savedRegsStr ? JSON.parse(savedRegsStr) : [];
        if (!regs.includes(actId)) {
          regs.push(actId);
          localStorage.setItem(STORAGE_REGISTERED_ACTIVITIES, JSON.stringify(regs));
        }
      } catch {
        // Ignore storage errors
      }
    };

    try {
      const targetId = activity.id || activityId;
      await publicService.registerForActivity({
        delegationCode: delegationCode.trim().toUpperCase(),
        activityId: targetId,
      });
      markRegisteredLocally(targetId);
      setShowSuccessModal(true);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      const msg = axiosErr.response?.data?.message || 'Registration failed or session limit reached.';

      // If already registered, still celebrate and mark registered
      if (msg.toLowerCase().includes('already registered')) {
        const targetId = activity.id || activityId;
        markRegisteredLocally(targetId);
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
    try {
      localStorage.removeItem(STORAGE_VERIFIED_DELEGATE);
      localStorage.removeItem(STORAGE_DELEGATE_CODE);
    } catch {
      // Ignore storage errors
    }
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
    isAlreadyRegistered,
    showSuccessModal,
    setShowSuccessModal,
    handleVerifyCode,
    handleConfirmRegistration,
    handleResetDelegate,
    handleNavigateToAgenda,
    handleBackToActivities,
  };
}
