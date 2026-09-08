import React, { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Loader2, Globe, Building2, User, Mail, Phone, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Combobox } from '@/components/ui/combobox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Country, Delegation, Organization } from '@/types';
import { CreateDelegationFormData, UpdateDelegationFormData } from '@/lib/validations';

const TITLE_OPTIONS = [
  { value: 'Mr.', label: 'Mr.' },
  { value: 'Ms.', label: 'Ms.' },
  { value: 'Mrs.', label: 'Mrs.' },
  { value: 'Dr.', label: 'Dr.' },
  { value: 'H.E.', label: 'H.E. (His/Her Excellency)' },
  { value: 'Prof.', label: 'Prof. (Professor)' },
  { value: 'Engr.', label: 'Engr. (Engineer)' },
];

interface DelegationDialogsProps {
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
  createForm: UseFormReturn<CreateDelegationFormData>;
  onCreateSubmit: (data: CreateDelegationFormData) => Promise<void>;

  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  editForm: UseFormReturn<UpdateDelegationFormData>;
  onEditSubmit: (data: UpdateDelegationFormData) => Promise<void>;

  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  selectedDelegation: Delegation | null;
  onDeleteSubmit: () => Promise<void>;

  countries: Country[];
  organizations: Organization[];
  submitting: boolean;
}

export function DelegationDialogs({
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
  selectedDelegation,
  onDeleteSubmit,
  countries,
  organizations,
  submitting,
}: DelegationDialogsProps) {
  const countryOptions = useMemo(() => [
    { value: '', label: 'Select Country' },
    ...countries.map((c) => ({
      value: c.id,
      label: `${c.name}${c.code ? ` (${c.code})` : ''}`,
      keywords: [c.name, c.code || ''],
    })),
  ], [countries]);

  const orgOptions = useMemo(() => [
    { value: '', label: 'Select Organization' },
    ...organizations.map((o) => ({
      value: o.id,
      label: o.shortName ? `${o.shortName} - ${o.name}` : o.name,
      keywords: [o.shortName || '', o.name],
    })),
  ], [organizations]);

  return (
    <>
      {/* Create Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[620px] bg-white rounded-3xl p-0 overflow-hidden border border-white/80 shadow-2xl">
          <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-[#002660] to-[#1a3c7d] text-white">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
                <User className="w-5 h-5 text-[#ffe088]" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-white">Register New Delegate</DialogTitle>
                <DialogDescription className="text-xs text-white/80 mt-0.5">
                  Enter delegate details. Unique delegation code will be auto-generated.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="p-6 space-y-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-36 space-y-1.5 shrink-0">
                <Label className="text-xs font-semibold text-[#002660]">Title</Label>
                <Combobox
                  value={createForm.watch('title') || 'Mr.'}
                  onChange={(val) => createForm.setValue('title', val, { shouldDirty: true })}
                  options={TITLE_OPTIONS}
                  placeholder="Select title..."
                  searchPlaceholder="Search title..."
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">
                  First Name <span className="text-[#ba1a1a]">*</span>
                </Label>
                <Input
                  placeholder="First name"
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 transition-all"
                  {...createForm.register('firstName')}
                />
                {createForm.formState.errors.firstName && (
                  <p className="text-[11px] text-[#ba1a1a] font-medium">
                    {createForm.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex-1 space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">
                  Last Name <span className="text-[#ba1a1a]">*</span>
                </Label>
                <Input
                  placeholder="Last name"
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 transition-all"
                  {...createForm.register('lastName')}
                />
                {createForm.formState.errors.lastName && (
                  <p className="text-[11px] text-[#ba1a1a] font-medium">
                    {createForm.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#002660]" />
                  Email Address <span className="text-[#ba1a1a]">*</span>
                </Label>
                <Input
                  type="email"
                  placeholder="delegate@domain.com"
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 transition-all"
                  {...createForm.register('email')}
                />
                {createForm.formState.errors.email && (
                  <p className="text-[11px] text-[#ba1a1a] font-medium">
                    {createForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#002660]" />
                  Phone Number
                </Label>
                <Input
                  placeholder="+856 20 ..."
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 transition-all"
                  {...createForm.register('phoneNumber')}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#002660]" />
                Designation / Position
              </Label>
              <Input
                placeholder="e.g. Managing Director / Deputy Director General"
                className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 transition-all"
                {...createForm.register('position')}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#002660]" />
                  Country
                </Label>
                <Combobox
                  value={createForm.watch('countryId') || ''}
                  onChange={(val) => createForm.setValue('countryId', val, { shouldDirty: true })}
                  options={countryOptions}
                  placeholder="Select country..."
                  searchPlaceholder="Search country name or code..."
                  icon={Globe}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#002660]" />
                  Organization
                </Label>
                <Combobox
                  value={createForm.watch('organizationId') || ''}
                  onChange={(val) => createForm.setValue('organizationId', val, { shouldDirty: true })}
                  options={orgOptions}
                  placeholder="Select organization..."
                  searchPlaceholder="Search organization acronym or name..."
                  icon={Building2}
                />
              </div>
            </div>

            <DialogFooter className="pt-4 mt-2 border-t border-[#e2e8f0] bg-white">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
                className="text-xs rounded-xl h-11 px-5 font-semibold hover:bg-[#f2f4f6] transition-colors cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-[#002660] hover:bg-[#1a3c7d] text-white text-xs rounded-xl h-11 px-6 font-semibold shadow-md shadow-[#002660]/20 transition-all cursor-pointer"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
                Save Delegate
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[620px] bg-white rounded-3xl p-0 overflow-hidden border border-white/80 shadow-2xl">
          <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-[#002660] to-[#1a3c7d] text-white">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
                <User className="w-5 h-5 text-[#ffe088]" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-white">Edit Delegate Details</DialogTitle>
                <DialogDescription className="text-xs text-white/80 mt-0.5">
                  Update registration details for {selectedDelegation?.firstName} {selectedDelegation?.lastName}.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="p-6 space-y-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-36 space-y-1.5 shrink-0">
                <Label className="text-xs font-semibold text-[#002660]">Title</Label>
                <Combobox
                  value={editForm.watch('title') || 'Mr.'}
                  onChange={(val) => editForm.setValue('title', val, { shouldDirty: true })}
                  options={TITLE_OPTIONS}
                  placeholder="Select title..."
                  searchPlaceholder="Search title..."
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">
                  First Name <span className="text-[#ba1a1a]">*</span>
                </Label>
                <Input
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 transition-all"
                  {...editForm.register('firstName')}
                />
                {editForm.formState.errors.firstName && (
                  <p className="text-[11px] text-[#ba1a1a] font-medium">
                    {editForm.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex-1 space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">
                  Last Name <span className="text-[#ba1a1a]">*</span>
                </Label>
                <Input
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 transition-all"
                  {...editForm.register('lastName')}
                />
                {editForm.formState.errors.lastName && (
                  <p className="text-[11px] text-[#ba1a1a] font-medium">
                    {editForm.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#002660]" />
                  Email Address <span className="text-[#ba1a1a]">*</span>
                </Label>
                <Input
                  type="email"
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 transition-all"
                  {...editForm.register('email')}
                />
                {editForm.formState.errors.email && (
                  <p className="text-[11px] text-[#ba1a1a] font-medium">
                    {editForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#002660]" />
                  Phone Number
                </Label>
                <Input
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 transition-all"
                  {...editForm.register('phoneNumber')}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#002660]" />
                Designation / Position
              </Label>
              <Input
                className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 transition-all"
                {...editForm.register('position')}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#002660]" />
                  Country
                </Label>
                <Combobox
                  value={editForm.watch('countryId') || ''}
                  onChange={(val) => editForm.setValue('countryId', val, { shouldDirty: true })}
                  options={countryOptions}
                  placeholder="Select country..."
                  searchPlaceholder="Search country name or code..."
                  icon={Globe}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#002660]" />
                  Organization
                </Label>
                <Combobox
                  value={editForm.watch('organizationId') || ''}
                  onChange={(val) => editForm.setValue('organizationId', val, { shouldDirty: true })}
                  options={orgOptions}
                  placeholder="Select organization..."
                  searchPlaceholder="Search organization acronym or name..."
                  icon={Building2}
                />
              </div>
            </div>

            <DialogFooter className="pt-4 mt-2 border-t border-[#e2e8f0] bg-white">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOpen(false)}
                className="text-xs rounded-xl h-11 px-5 font-semibold hover:bg-[#f2f4f6] transition-colors cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-[#002660] hover:bg-[#1a3c7d] text-white text-xs rounded-xl h-11 px-6 font-semibold shadow-md shadow-[#002660]/20 transition-all cursor-pointer"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
                Update Delegate
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#ba1a1a]">Remove Delegate</DialogTitle>
            <DialogDescription className="text-xs text-[#4f616f]">
              Are you sure you want to remove{' '}
              <strong className="text-[#191c1e]">
                {selectedDelegation?.firstName} {selectedDelegation?.lastName}
              </strong>{' '}
              from the 42nd HAPUA Council delegation records? This action cannot be undone.
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
