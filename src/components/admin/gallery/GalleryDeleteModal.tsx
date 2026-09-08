import React from 'react';
import { Trash2, Video, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Gallery } from '@/types';

interface GalleryDeleteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedItem: Gallery | null;
  submitting: boolean;
  onDelete: () => Promise<void>;
}

export function GalleryDeleteModal({
  open,
  setOpen,
  selectedItem,
  submitting,
  onDelete,
}: GalleryDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white rounded-3xl p-6 border border-white/80 shadow-2xl">
        <DialogHeader className="space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-1">
            <Trash2 className="w-6 h-6" />
          </div>
          <DialogTitle className="text-lg font-bold text-[#ba1a1a]">Remove Media</DialogTitle>
          <DialogDescription className="text-xs text-[#4f616f] leading-relaxed">
            Are you sure you want to remove this media item? It will be deleted permanently from the conference album.
          </DialogDescription>
        </DialogHeader>

        {selectedItem && (
          <div className="p-3 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center gap-3 my-2">
            <div className="w-14 h-11 rounded-xl overflow-hidden bg-slate-900 shrink-0">
              {selectedItem.mediaType === 'IMAGE' ? (
                <img src={selectedItem.mediaUrl} alt="to delete" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <Video className="w-4 h-4" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{selectedItem.title || 'Untitled Item'}</p>
              <p className="text-[10px] text-slate-400 uppercase">{selectedItem.mediaType} • {selectedItem.visibility}</p>
            </div>
          </div>
        )}

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
