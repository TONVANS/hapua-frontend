import React from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Hotel } from '@/types';

interface HotelDeleteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedHotel: Hotel | null;
  submitting: boolean;
  onDelete: () => Promise<void>;
}

export function HotelDeleteModal({
  open,
  setOpen,
  selectedHotel,
  submitting,
  onDelete,
}: HotelDeleteModalProps) {
  return (
    <Dialog open={deleteOpen(open)} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white rounded-3xl p-6 border border-white/80 shadow-2xl">
        <DialogHeader className="space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-1">
            <Trash2 className="w-6 h-6" />
          </div>
          <DialogTitle className="text-lg font-bold text-[#ba1a1a]">Remove Hotel Accommodation</DialogTitle>
          <DialogDescription className="text-xs text-[#4f616f] leading-relaxed">
            Are you sure you want to remove <strong className="text-[#191c1e]">{selectedHotel?.name}</strong>?
            Delegates will no longer see this property in their accommodation guide.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="text-xs rounded-xl h-10 px-4 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            disabled={submitting}
            className="bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs rounded-xl h-10 px-5 font-semibold cursor-pointer shadow-sm"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function deleteOpen(open: boolean) {
  return open;
}
