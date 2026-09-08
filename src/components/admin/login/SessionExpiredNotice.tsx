'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export function SessionExpiredNotice({ onError }: { onError?: (msg: string) => void }) {
  const searchParams = useSearchParams();
  const notified = useRef(false);

  useEffect(() => {
    if (searchParams?.get('error') === 'session_expired' && !notified.current) {
      notified.current = true;
      const msg = 'Your administrative session has timed out. Please sign in again to continue.';
      if (onError) onError(msg);
      toast.warning('Session Expired', {
        description: msg,
        duration: 5000,
      });
    }
  }, [searchParams, onError]);

  return null;
}
