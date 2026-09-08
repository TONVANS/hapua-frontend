import React, { useState, useEffect } from 'react';
import { Delegation } from '@/types';
import { publicService } from '@/services';

const STORAGE_DELEGATE_CODE = 'hapua_delegate_code';
const STORAGE_VERIFIED_DELEGATE = 'hapua_verified_delegate';
const STORAGE_REGISTERED_ACTIVITIES = 'hapua_registered_activities';

export function useDelegateVerification() {
  const [delegationCode, setDelegationCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifiedDelegate, setVerifiedDelegate] = useState<Delegation | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [registeredActivityId, setRegisteredActivityId] = useState<string | null>(null);
  const [registeredActivityIds, setRegisteredActivityIds] = useState<string[]>([]);
  const [registering, setRegistering] = useState(false);
  const [registrationMsg, setRegistrationMsg] = useState<string | null>(null);

  // Load saved credentials & registrations from localStorage
  useEffect(() => {
    try {
      const savedCode = localStorage.getItem(STORAGE_DELEGATE_CODE);
      const savedDelegateStr = localStorage.getItem(STORAGE_VERIFIED_DELEGATE);
      const savedRegsStr = localStorage.getItem(STORAGE_REGISTERED_ACTIVITIES);

      if (savedCode) setDelegationCode(savedCode);
      if (savedDelegateStr) {
        const parsed = JSON.parse(savedDelegateStr);
        if (parsed && parsed.id) setVerifiedDelegate(parsed);
      }
      if (savedRegsStr) {
        const parsedRegs: string[] = JSON.parse(savedRegsStr);
        if (Array.isArray(parsedRegs)) {
          setRegisteredActivityIds(parsedRegs);
          if (parsedRegs.length > 0) {
            setRegisteredActivityId(parsedRegs[parsedRegs.length - 1]);
          }
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleVerifyCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCode = delegationCode.trim().toUpperCase();
    if (!cleanCode) return;

    setVerifying(true);
    setVerifyError(null);
    setRegistrationMsg(null);
    try {
      const res = await publicService.checkDelegation(cleanCode);
      if (res && res.id) {
        setVerifiedDelegate(res);
        try {
          localStorage.setItem(STORAGE_DELEGATE_CODE, cleanCode);
          localStorage.setItem(STORAGE_VERIFIED_DELEGATE, JSON.stringify(res));
        } catch {
          // Ignore storage errors
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

  const markActivityRegistered = (activityId: string, delegate?: Delegation) => {
    if (delegate) {
      setVerifiedDelegate(delegate);
      if (delegate.delegationCode) {
        setDelegationCode(delegate.delegationCode);
      }
    }
    setRegisteredActivityId(activityId);
    setRegisteredActivityIds((prev) => {
      const next = Array.from(new Set([...prev, activityId]));
      try {
        localStorage.setItem(STORAGE_REGISTERED_ACTIVITIES, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const handleRegisterActivity = async (activityId: string) => {
    const cleanCode = (verifiedDelegate?.delegationCode || delegationCode).trim().toUpperCase();
    if (!cleanCode) return;

    setRegistering(true);
    setRegistrationMsg(null);
    setVerifyError(null);

    try {
      await publicService.registerForActivity({
        delegationCode: cleanCode,
        activityId,
      });
      markActivityRegistered(activityId, verifiedDelegate || undefined);
      setRegistrationMsg('Successfully registered for this council session!');
      setTimeout(() => setRegistrationMsg(null), 5000);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      const msg = axiosErr.response?.data?.message || 'Registration failed or session limit reached.';

      if (msg.toLowerCase().includes('already registered')) {
        markActivityRegistered(activityId, verifiedDelegate || undefined);
      } else {
        setVerifyError(msg);
      }
    } finally {
      setRegistering(false);
    }
  };

  const isActivityRegistered = (activityId: string) => {
    return registeredActivityId === activityId || registeredActivityIds.includes(activityId);
  };

  return {
    delegationCode,
    setDelegationCode,
    verifying,
    verifiedDelegate,
    setVerifiedDelegate,
    verifyError,
    registeredActivityId,
    registeredActivityIds,
    isActivityRegistered,
    markActivityRegistered,
    registering,
    registrationMsg,
    handleVerifyCode,
    handleRegisterActivity,
  };
}

