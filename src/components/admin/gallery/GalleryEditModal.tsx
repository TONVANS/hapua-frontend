import React, { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Edit2, Loader2, Globe, Lock, Image as ImageIcon, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Combobox } from '@/components/ui/combobox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UpdateGalleryFormData } from '@/lib/validations';

interface GalleryEditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<UpdateGalleryFormData>;
  submitting: boolean;
  onSubmit: (data: UpdateGalleryFormData) => Promise<void>;
}

export function GalleryEditModal({
  open,
  setOpen,
  form,
  submitting,
  onSubmit,
}: GalleryEditModalProps) {
  const mediaTypeOptions = useMemo(() => [
    { value: 'IMAGE', label: 'Photography (Images)', keywords: ['image', 'photo', 'picture'] },
    { value: 'VIDEO', label: 'Plenary Recording (Video)', keywords: ['video', 'recording', 'clip'] },
  ], []);

  const visibilityOptions = useMemo(() => [
    { value: 'PUBLIC', label: 'Public (All Attendees)', description: 'Visible to all portal visitors' },
    { value: 'PRIVATE', label: 'Private (Delegates Only)', description: 'Restricted to accredited delegates' },
  ], []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[550px] bg-white rounded-3xl p-0 overflow-hidden border border-white/80 shadow-2xl">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-[#002660] to-[#1a3c7d] text-white">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <Edit2 className="w-5 h-5 text-[#ffe088]" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-white">Edit Media Details</DialogTitle>
              <DialogDescription className="text-xs text-white/80 mt-0.5">
                Update title, visibility, or description for this media item.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-[#002660]">Media Title</Label>
            <Input
              className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20"
              {...form.register('title')}
            />
          </div>

          {/* Type & Visibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#002660]" />
                Media Type
              </Label>
              <Combobox
                value={form.watch('mediaType')}
                onChange={(val) => form.setValue('mediaType', val as 'IMAGE' | 'VIDEO', { shouldDirty: true })}
                options={mediaTypeOptions}
                placeholder="Select media type..."
                searchPlaceholder="Search media type..."
                icon={form.watch('mediaType') === 'VIDEO' ? Film : ImageIcon}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                {form.watch('visibility') === 'PRIVATE' ? (
                  <Lock className="w-3.5 h-3.5 text-[#002660]" />
                ) : (
                  <Globe className="w-3.5 h-3.5 text-[#002660]" />
                )}
                Visibility
              </Label>
              <Combobox
                value={form.watch('visibility')}
                onChange={(val) => form.setValue('visibility', val as 'PUBLIC' | 'PRIVATE', { shouldDirty: true })}
                options={visibilityOptions}
                placeholder="Select visibility..."
                searchPlaceholder="Search visibility..."
                icon={form.watch('visibility') === 'PRIVATE' ? Lock : Globe}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-[#002660]">Description</Label>
            <Textarea
              className="text-xs min-h-[90px] bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 leading-relaxed"
              {...form.register('description')}
            />
          </div>

          <DialogFooter className="pt-4 border-t border-[#e2e8f0] bg-white">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="text-xs rounded-xl h-11 px-5 font-semibold hover:bg-[#f2f4f6] cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-[#002660] hover:bg-[#1a3c7d] text-white text-xs rounded-xl h-11 px-6 font-semibold shadow-md shadow-[#002660]/20 cursor-pointer"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
              Update Details
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
