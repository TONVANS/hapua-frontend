import React from 'react';
import {
  Calendar,
  DoorOpen,
  Users,
  AlertTriangle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Activity } from '@/types';
import { formatEventDate } from './utils';

interface ActivityDeleteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activity: Activity | null;
  submitting: boolean;
  onDelete: () => Promise<void>;
}

export function ActivityDeleteModal({
  open,
  setOpen,
  activity,
  submitting,
  onDelete,
}: ActivityDeleteModalProps) {
  if (!activity) return null;

  const delegationsCount = activity._count?.delegations ?? activity.delegations?.length ?? 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[480px] p-0 bg-white rounded-2xl overflow-hidden border border-rose-200 shadow-xl">
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-base font-bold text-slate-900">
                Delete Activity Session?
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                This action is permanent and cannot be undone.
              </DialogDescription>
            </div>
          </div>

          {/* Target Activity Summary Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <p className="font-bold text-slate-900 text-sm">{activity.name}</p>
            <div className="flex flex-wrap items-center gap-3 text-slate-600 text-[11px]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                {formatEventDate(activity.date, {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              {activity.room?.name && (
                <span className="flex items-center gap-1">
                  <DoorOpen className="w-3 h-3 text-slate-400" />
                  {activity.room.name}
                </span>
              )}
              <span className="flex items-center gap-1 font-mono">
                <Users className="w-3 h-3 text-slate-400" />
                {delegationsCount} delegates
              </span>
            </div>
          </div>

          {/* Danger Notice if delegations exist */}
          {delegationsCount > 0 && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>
                Warning: <strong>{delegationsCount}</strong> delegations are registered for this
                activity. Deleting will decouple their attendance records.
              </span>
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="text-xs rounded-xl h-10 font-medium hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onDelete}
            disabled={submitting}
            className="bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs rounded-xl h-10 font-semibold shadow-sm transition-all cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                Deleting...
              </>
            ) : (
              'Confirm Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
