import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Country } from '@/types';
import { CreateCountryFormData, UpdateCountryFormData } from '@/lib/validations';

interface CountryDialogsProps {
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
  createForm: UseFormReturn<CreateCountryFormData>;
  onCreateSubmit: (data: CreateCountryFormData) => Promise<void>;

  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  editForm: UseFormReturn<UpdateCountryFormData>;
  onEditSubmit: (data: UpdateCountryFormData) => Promise<void>;

  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  selectedCountry: Country | null;
  onDeleteSubmit: () => Promise<void>;

  submitting: boolean;
}

export function CountryDialogs({
  createOpen,
  setCreateOpen,
  createForm,
  onCreateSubmit,
  editOpen,
  setEditOpen,
  editForm,
  onEditSubmit,
  deleteOpen,
  setDeleteOpen,
  selectedCountry,
  onDeleteSubmit,
  submitting,
}: CountryDialogsProps) {
  return (
    <>
      {/* Create Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#002660]">Add Country</DialogTitle>
            <DialogDescription className="text-xs text-[#4f616f]">
              Add country for delegate categorization.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4 py-2">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-[#002660]">Country Name *</Label>
              <Input
                placeholder="e.g. Lao PDR"
                className="h-10 text-xs"
                {...createForm.register('name')}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-[#002660]">Country Code (2-3 chars)</Label>
              <Input
                placeholder="e.g. LA or LAO"
                className="h-10 text-xs"
                {...createForm.register('code')}
              />
            </div>
            <DialogFooter className="pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
                className="text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-[#002660] hover:bg-[#1a3c7d] text-white text-xs rounded-xl cursor-pointer"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
                Save Country
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#002660]">Edit Country</DialogTitle>
            <DialogDescription className="text-xs text-[#4f616f]">
              Update {selectedCountry?.name} record.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 py-2">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-[#002660]">Country Name *</Label>
              <Input className="h-10 text-xs" {...editForm.register('name')} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-[#002660]">Country Code</Label>
              <Input className="h-10 text-xs" {...editForm.register('code')} />
            </div>
            <DialogFooter className="pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOpen(false)}
                className="text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-[#002660] hover:bg-[#1a3c7d] text-white text-xs rounded-xl cursor-pointer"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
                Update Country
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#ba1a1a]">Remove Country</DialogTitle>
            <DialogDescription className="text-xs text-[#4f616f]">
              Are you sure you want to remove <strong className="text-[#191c1e]">{selectedCountry?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              className="text-xs rounded-xl cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={onDeleteSubmit}
              disabled={submitting}
              className="bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs rounded-xl cursor-pointer"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
