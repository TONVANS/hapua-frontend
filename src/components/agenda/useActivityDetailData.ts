import { useEffect, useState } from 'react';
import { publicService } from '@/services';
import { Activity, Delegation, Gallery, AgendaItem } from '@/types';
import { isActivityDateReached } from '@/components/admin/activities/utils';

export function useActivityDetailData(activityId: string) {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lightbox modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Registration state
  const [delegationCode, setDelegationCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifiedDelegate, setVerifiedDelegate] = useState<Delegation | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);

  // Other activities on same day
  const [relatedActivities, setRelatedActivities] = useState<AgendaItem[]>([]);

  useEffect(() => {
    if (!activityId) return;

    let ignore = false;
    async function loadActivityData() {
      setLoading(true);
      setError(null);
      try {
        const actData = await publicService.getActivity(activityId);
        if (ignore) return;
        setActivity(actData);

        try {
          const galleryData = await publicService.getGallery(activityId);
          if (!ignore) {
            setGallery(galleryData || []);
          }
        } catch {
          if (!ignore && actData.galleries) {
            setGallery(actData.galleries);
          }
        }

        try {
          const rawAgenda = await publicService.getAgenda();
          let allAgenda: AgendaItem[] = [];
          if (Array.isArray(rawAgenda)) {
            allAgenda = rawAgenda;
          } else if (rawAgenda && typeof rawAgenda === 'object') {
            allAgenda = Object.values(rawAgenda).flat() as AgendaItem[];
          }

          if (!ignore && actData.date) {
            const currentDayStr = new Date(actData.date).toISOString().split('T')[0];
            const sameDaySessions = allAgenda.filter((item) => {
              if (item.id === actData.id) return false;
              if (!item.date) return false;
              const itemDayStr = new Date(item.date).toISOString().split('T')[0];
              return itemDayStr === currentDayStr;
            });
            setRelatedActivities(sameDaySessions.slice(0, 3));
          }
        } catch {
          // Non-blocking
        }
      } catch (err: unknown) {
        console.error('Failed to load activity details:', err);
        if (!ignore) {
          setError('Activity or session details could not be found.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadActivityData();
    return () => {
      ignore = true;
    };
  }, [activityId]);

  // Handle Delegate Verification & Instant Registration
  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegationCode.trim()) return;

    if (activity && !isActivityDateReached(activity)) {
      setVerifyError('Registration is not yet open. It will open on the activity start date.');
      return;
    }

    setVerifying(true);
    setVerifyError(null);
    setRegisterSuccess(null);

    try {
      const delegate = await publicService.checkDelegation(delegationCode.trim());
      if (delegate && delegate.id) {
        setVerifiedDelegate(delegate);
        setRegistering(true);
        try {
          await publicService.registerForActivity({
            delegationCode: delegationCode.trim(),
            activityId,
          });
          setIsRegistered(true);
          setRegisterSuccess(
            `Accreditation confirmed! ${delegate.firstName} ${delegate.lastName} is registered for this session.`
          );
        } catch (regErr: unknown) {
          const axiosErr = regErr as { response?: { data?: { message?: string } } };
          setVerifyError(
            axiosErr.response?.data?.message || 'Registration failed or capacity reached.'
          );
        } finally {
          setRegistering(false);
        }
      } else {
        setVerifyError('Delegation code not found in council records.');
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setVerifyError(
        axiosErr.response?.data?.message ||
          'Delegation code not recognized. Please check your badge confirmation email.'
      );
    } finally {
      setVerifying(false);
    }
  };

  const calculateDuration = (start: string, end: string) => {
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffMs = endDate.getTime() - startDate.getTime();
      if (isNaN(diffMs) || diffMs <= 0) return null;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
      return `${minutes} minutes`;
    } catch {
      return null;
    }
  };

  const copySessionLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const copyQrCode = () => {
    if (activity?.qrCode) {
      navigator.clipboard.writeText(activity.qrCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return {
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
  };
}
