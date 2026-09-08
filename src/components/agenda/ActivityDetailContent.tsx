import React from 'react';
import {
  ActivityDetailHero,
  ActivityOverviewCard,
  ActivityVenueCard,
  ActivityMediaGallery,
  ActivityRegistrationSidebar,
  RelatedSessionsCard,
  ActivityLightboxModal,
} from '@/components/agenda';
import { Activity, Delegation, Gallery, AgendaItem } from '@/types';

interface ActivityDetailContentProps {
  activity: Activity;
  gallery: Gallery[];
  duration: string | null;
  copiedCode: boolean;
  onCopyQrCode: () => void;
  lightboxOpen: boolean;
  setLightboxOpen: (open: boolean) => void;
  lightboxIndex: number;
  setLightboxIndex: React.Dispatch<React.SetStateAction<number>>;
  delegationCode: string;
  setDelegationCode: (code: string) => void;
  verifying: boolean;
  registering: boolean;
  verifiedDelegate: Delegation | null;
  isRegistered: boolean;
  verifyError: string | null;
  registerSuccess: string | null;
  onVerifyAndRegister: (e: React.FormEvent) => Promise<void>;
  relatedActivities: AgendaItem[];
}

export function ActivityDetailContent({
  activity,
  gallery,
  duration,
  copiedCode,
  onCopyQrCode,
  lightboxOpen,
  setLightboxOpen,
  lightboxIndex,
  setLightboxIndex,
  delegationCode,
  setDelegationCode,
  verifying,
  registering,
  verifiedDelegate,
  isRegistered,
  verifyError,
  registerSuccess,
  onVerifyAndRegister,
  relatedActivities,
}: ActivityDetailContentProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Card */}
      <ActivityDetailHero
        activity={activity}
        duration={duration}
        copiedCode={copiedCode}
        onCopyQrCode={onCopyQrCode}
      />

      {/* Two-Column Grid: Details & Registration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Description, Room & Photos */}
        <div className="lg:col-span-2 space-y-8">
          <ActivityOverviewCard description={activity.description} />
          {activity.room && <ActivityVenueCard room={activity.room} />}
          <ActivityMediaGallery
            gallery={gallery}
            onOpenLightbox={(idx) => {
              setLightboxIndex(idx);
              setLightboxOpen(true);
            }}
          />
        </div>

        {/* Right Column (1 Col): Registration & Delegate Sign-Up */}
        <div className="space-y-6">
          <ActivityRegistrationSidebar
            activity={activity}
            delegationCode={delegationCode}
            setDelegationCode={setDelegationCode}
            verifying={verifying}
            registering={registering}
            verifiedDelegate={verifiedDelegate}
            isRegistered={isRegistered}
            verifyError={verifyError}
            registerSuccess={registerSuccess}
            onVerifyAndRegister={onVerifyAndRegister}
          />
          <RelatedSessionsCard relatedActivities={relatedActivities} />
        </div>
      </div>

      {/* Media Lightbox Modal */}
      <ActivityLightboxModal
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        gallery={gallery}
        lightboxIndex={lightboxIndex}
        setLightboxIndex={setLightboxIndex}
      />
    </div>
  );
}
