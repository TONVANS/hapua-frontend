'use client';

import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Activity, Delegation } from '@/types';

interface ActivitySuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity | null;
  verifiedDelegate: Delegation | null;
  onNavigateToAgenda: () => void;
  onBackToActivities: () => void;
}

export function ActivitySuccessModal({
  isOpen,
  onClose,
  activity,
  verifiedDelegate,
  onNavigateToAgenda,
  onBackToActivities,
}: ActivitySuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-2xl border-[#e2e8f0] p-6 sm:p-8 rounded-3xl shadow-2xl text-center overflow-hidden">
        <div className="relative">
          {/* Top decorative badge */}
          <div className="w-20 h-20 bg-linear-to-tr from-emerald-500 to-teal-400 text-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-black text-[#002660] tracking-tight">
              Check-in Confirmed!
            </DialogTitle>
            <DialogDescription className="text-xs text-[#4f616f] mt-1 leading-relaxed">
              Your attendance has been officially accredited for this HAPUA council activity.
            </DialogDescription>
          </DialogHeader>

          {/* Summary Details in Popup */}
          {activity && (
            <div className="bg-[#f7f9fb] p-4 rounded-2xl border border-[#e2e8f0] text-left space-y-2.5 mb-6 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#747781] tracking-wider block mb-0.5">
                  Activity
                </span>
                <p className="font-bold text-[#002660] leading-snug line-clamp-2">
                  {activity.name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#e2e8f0]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#747781] tracking-wider block mb-0.5">
                    Date & Time
                  </span>
                  <p className="font-medium text-slate-800">
                    {new Date(activity.startTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    -{' '}
                    {new Date(activity.endTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#747781] tracking-wider block mb-0.5">
                    Venue Room
                  </span>
                  <p className="font-medium text-slate-800 truncate">
                    {activity.room?.name || 'Main Hall'}
                  </p>
                </div>
              </div>

              {verifiedDelegate && (
                <div className="pt-2 border-t border-[#e2e8f0] flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-[#747781] tracking-wider">
                    Delegate
                  </span>
                  <span className="font-bold text-[#002660]">
                    {verifiedDelegate.firstName} {verifiedDelegate.lastName} (
                    {verifiedDelegate.delegationCode})
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Confirm & Go to Agenda Action */}
          <div className="flex flex-col gap-2.5">
            <Button
              onClick={onNavigateToAgenda}
              className="w-full h-13 rounded-2xl bg-linear-to-r from-[#002660] to-[#004098] hover:from-[#001d4a] hover:to-[#002660] text-white font-bold text-sm shadow-lg shadow-[#002660]/20 hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Confirm & View Agenda Details</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              variant="ghost"
              onClick={onBackToActivities}
              className="w-full text-xs text-[#747781] hover:text-[#002660] rounded-xl h-10 cursor-pointer"
            >
              Back to All Activities
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
