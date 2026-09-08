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
import { Organization } from '@/types';
import { CreateOrganizationFormData, UpdateOrganizationFormData } from '@/lib/validations';

interface OrganizationDialogsProps {
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
  createForm: UseFormReturn<CreateOrganizationFormData>;
  onCreateSubmit: (data: CreateOrganizationFormData) => Promise<void>;

  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  editForm: UseFormReturn<UpdateOrganizationFormData>;
  onEditSubmit: (data: UpdateOrganizationFormData) => Promise<void>;

  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  selectedOrg: Organization | null;
  onDeleteSubmit: () => Promise<void>;

  submitting: boolean;
}

export function OrganizationDialogs({
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
  selectedOrg,
  onDeleteSubmit,
  submitting,
}: OrganizationDialogsProps) {
  return (
    <>
      {/* Create Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#002660]">Add Organization</DialogTitle>
            <DialogDescription className="text-xs text-[#4f616f]">
              Add utility or governmental body for delegate accreditation.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4 py-2">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-[#002660]">Full Organization Name *</Label>
              <Input
                placeholder="e.g. Electricité du Laos"
                className="h-10 text-xs"
                {...createForm.register('name')}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-[#002660]">Acronym / Short Name</Label>
              <Input
                placeholder="e.g. EDL"
                className="h-10 text-xs"
                {...createForm.register('shortName')}
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
                Save Organization
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#002660]">Edit Organization</DialogTitle>
            <DialogDescription className="text-xs text-[#4f616f]">
              Update {selectedOrg?.name} details.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 py-2">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-[#002660]">Full Organization Name *</Label>
              <Input className="h-10 text-xs" {...editForm.register('name')} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-[#002660]">Acronym</Label>
              <Input className="h-10 text-xs" {...editForm.register('shortName')} />
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
                Update Organization
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#ba1a1a]">Remove Organization</DialogTitle>
            <DialogDescription className="text-xs text-[#4f616f]">
              Are you sure you want to remove <strong className="text-[#191c1e]">{selectedOrg?.name}</strong>?
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
