import React, { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  Compass,
  Clock,
  Calendar,
  Camera,
  Upload,
  ImagePlus,
  X,
  Trash2,
  Edit2,
  Loader2,
  ChevronDown,
} from 'lucide-react';
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
import { TravelRecommend, Weekday } from '@/types';
import { UpdateTravelFormData } from '@/lib/validations';
import { ALL_WEEKDAYS, getTimeOptionsWithCustom } from './utils';

interface TravelEditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<UpdateTravelFormData>;
  selectedTravel: TravelRecommend | null;
  selectedOpenDays: Weekday[];
  onToggleOpenDay: (day: Weekday) => void;
  coverImagePreview: string | null;
  imageFiles: File[];
  imagePreviews: string[];
  deletedImageIds: string[];
  setDeletedImageIds: (ids: string[] | ((prev: string[]) => string[])) => void;
  replaceImages: boolean;
  setReplaceImages: (val: boolean) => void;
  onCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveCover: () => void;
  onGalleryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveGalleryFile: (index: number) => void;
  onClearGallery: () => void;
  submitting: boolean;
  onSubmit: (data: UpdateTravelFormData) => Promise<void>;
}

export function TravelEditModal({
  open,
  setOpen,
  form,
  selectedTravel,
  selectedOpenDays,
  onToggleOpenDay,
  coverImagePreview,
  imageFiles,
  imagePreviews,
  deletedImageIds,
  setDeletedImageIds,
  replaceImages,
  setReplaceImages,
  onCoverChange,
  onRemoveCover,
  onGalleryChange,
  onRemoveGalleryFile,
  onClearGallery,
  submitting,
  onSubmit,
}: TravelEditModalProps) {
  const editCoverInputRef = useRef<HTMLInputElement | null>(null);
  const editGalleryInputRef = useRef<HTMLInputElement | null>(null);

  const openTimeOptions = getTimeOptionsWithCustom(selectedTravel?.openTime);
  const closeTimeOptions = getTimeOptionsWithCustom(selectedTravel?.closeTime);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] bg-white rounded-3xl p-0 overflow-hidden border border-white/80 shadow-2xl">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-[#002660] to-[#1a3c7d] text-white">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <Edit2 className="w-5 h-5 text-[#ffe088]" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-white">Edit Destination</DialogTitle>
              <DialogDescription className="text-xs text-white/80 mt-0.5">
                Update {selectedTravel?.placeName} details and visiting schedules.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Overview */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002660] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#cca730]" /> 1. Destination Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">
                  Place / Landmark Name <span className="text-[#ba1a1a]">*</span>
                </Label>
                <Input
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20"
                  {...form.register('placeName')}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">
                  Location & Area <span className="text-[#ba1a1a]">*</span>
                </Label>
                <Input
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20"
                  {...form.register('location')}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#002660]">Google Maps Link</Label>
              <Input
                className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 font-mono text-[11px]"
                {...form.register('mapUrl')}
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4 pt-2 border-t border-[#f2f4f6]">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#002660] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#cca730]" /> 2. Visiting Hours & Schedule
              </h3>
              {(form.watch('openTime') || form.watch('closeTime')) && (
                <button
                  type="button"
                  onClick={() => {
                    form.setValue('openTime', '', { shouldDirty: true });
                    form.setValue('closeTime', '', { shouldDirty: true });
                  }}
                  className="text-[11px] text-[#ba1a1a] hover:underline font-semibold cursor-pointer"
                >
                  Clear Hours
                </button>
              )}
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#f8fafc] p-2.5 rounded-xl border border-[#e2e8f0]">
              <span className="text-[11px] text-[#4f616f] font-semibold mr-1">Quick Presets:</span>
              {[
                { label: '08:00 – 17:00', open: '08:00', close: '17:00' },
                { label: '08:30 – 17:30', open: '08:30', close: '17:30' },
                { label: '09:00 – 18:00', open: '09:00', close: '18:00' },
                { label: '09:00 – 21:00', open: '09:00', close: '21:00' },
              ].map((p) => {
                const isActive =
                  form.watch('openTime') === p.open && form.watch('closeTime') === p.close;
                return (
                  <button
                    type="button"
                    key={p.label}
                    onClick={() => {
                      form.setValue('openTime', p.open, { shouldDirty: true });
                      form.setValue('closeTime', p.close, { shouldDirty: true });
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#002660] text-white shadow-xs'
                        : 'bg-white text-[#002660] border border-[#e2e8f0] hover:border-[#002660]/40'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="edit-openTime" className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#002660]" />
                  Opening Time
                </Label>
                <Combobox
                  value={form.watch('openTime') || ''}
                  onChange={(val) => form.setValue('openTime', val, { shouldDirty: true })}
                  options={openTimeOptions}
                  placeholder="-- Flexible / Not specified --"
                  searchPlaceholder="Search opening time (e.g. 08, 8am)..."
                  allowClear
                  icon={Clock}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-closeTime" className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#002660]" />
                  Closing Time
                </Label>
                <Combobox
                  value={form.watch('closeTime') || ''}
                  onChange={(val) => form.setValue('closeTime', val, { shouldDirty: true })}
                  options={closeTimeOptions}
                  placeholder="-- Flexible / Not specified --"
                  searchPlaceholder="Search closing time (e.g. 17, 5pm)..."
                  allowClear
                  icon={Clock}
                />
              </div>
            </div>

            {/* Operating Days */}
            <div className="p-3.5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#002660]" />
                  <span>Open Days (Select all that apply)</span>
                </Label>
                <span className="text-[10px] text-[#747781]">
                  {selectedOpenDays.length === 0 ? 'Open Everyday' : `${selectedOpenDays.length} days selected`}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {ALL_WEEKDAYS.map((day) => {
                  const isSelected = selectedOpenDays.includes(day.key);
                  return (
                    <button
                      type="button"
                      key={day.key}
                      onClick={() => onToggleOpenDay(day.key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#002660] text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-[#e2e8f0] hover:border-[#002660]/30'
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Media Uploads */}
          <div className="space-y-4 pt-2 border-t border-[#f2f4f6]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002660] flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#cca730]" /> 3. Destination Photos & Media
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cover Image */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-[#002660]">Cover Image</Label>
                <input
                  type="file"
                  ref={editCoverInputRef}
                  accept="image/*"
                  onChange={onCoverChange}
                  className="hidden"
                />
                {coverImagePreview ? (
                  <div className="relative w-full h-32 rounded-2xl border border-[#e2e8f0] overflow-hidden group bg-slate-100 shadow-xs">
                    <img src={coverImagePreview} alt="New cover preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => editCoverInputRef.current?.click()}
                        className="h-8 text-xs rounded-xl"
                      >
                        Change
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={onRemoveCover}
                        className="h-8 text-xs rounded-xl"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : selectedTravel?.coverImage ? (
                  <div className="relative w-full h-32 rounded-2xl border border-[#e2e8f0] overflow-hidden group bg-slate-100 shadow-xs">
                    <img src={selectedTravel.coverImage} alt="Current cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => editCoverInputRef.current?.click()}
                        className="h-8 text-xs rounded-xl"
                      >
                        Replace Cover
                      </Button>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md">
                      Current Cover
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => editCoverInputRef.current?.click()}
                    className="w-full h-32 rounded-2xl border-2 border-dashed border-[#e2e8f0] hover:border-[#002660] bg-[#f7f9fb] hover:bg-[#f2f4f6] flex flex-col items-center justify-center gap-1.5 transition-all text-slate-500 hover:text-[#002660] cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="text-xs font-semibold">Click to select Cover Image</span>
                  </button>
                )}
              </div>

              {/* Additional Photos */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-[#002660]">Add New Gallery Photos</Label>
                  <label className="text-[10px] font-semibold text-[#ba1a1a] flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={replaceImages}
                      onChange={(e) => setReplaceImages(e.target.checked)}
                      className="rounded w-3 h-3 text-[#ba1a1a]"
                    />
                    Replace all existing
                  </label>
                </div>
                <input
                  type="file"
                  ref={editGalleryInputRef}
                  multiple
                  accept="image/*"
                  onChange={onGalleryChange}
                  className="hidden"
                />

                <div className="min-h-[128px] p-3 rounded-2xl border border-[#e2e8f0] bg-[#f7f9fb] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => editGalleryInputRef.current?.click()}
                      className="h-8 text-xs rounded-xl border-[#e2e8f0] text-[#002660] hover:bg-white cursor-pointer font-semibold shadow-xs"
                    >
                      <ImagePlus className="w-3.5 h-3.5 mr-1.5" />
                      {imageFiles.length > 0 ? '+ Add More Photos' : '+ Select Photos to Add'}
                    </Button>
                    {imageFiles.length > 0 && (
                      <button
                        type="button"
                        onClick={onClearGallery}
                        className="text-[11px] text-[#ba1a1a] hover:underline cursor-pointer font-medium"
                      >
                        Clear Staged ({imageFiles.length})
                      </button>
                    )}
                  </div>

                  {imagePreviews.length > 0 ? (
                    <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pt-1">
                      {imagePreviews.map((preview, idx) => (
                        <div key={idx} className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#e2e8f0] group shadow-xs">
                          <img src={preview} alt={`preview ${idx}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => onRemoveGalleryFile(idx)}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-400 italic text-center py-2">
                      No new photos staged to upload.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Current Gallery Photos Grid */}
            {!replaceImages && selectedTravel?.images && selectedTravel.images.length > 0 && (
              <div className="p-3 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#002660]">
                    Current Photos ({selectedTravel.images.length - deletedImageIds.length} active)
                  </span>
                  <span className="text-[10px] text-[#747781]">Click trash on photo to mark for deletion</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTravel.images.map((img) => {
                    const isMarkedDeleted = deletedImageIds.includes(img.id);
                    return (
                      <div
                        key={img.id}
                        className={`relative w-14 h-14 rounded-xl border overflow-hidden transition-all shadow-xs ${
                          isMarkedDeleted ? 'border-red-300 opacity-40 grayscale' : 'border-[#e2e8f0] group'
                        }`}
                      >
                        <img src={img.imageUrl} alt="gallery" className="w-full h-full object-cover" />
                        {isMarkedDeleted ? (
                          <button
                            type="button"
                            onClick={() => setDeletedImageIds(deletedImageIds.filter((id) => id !== img.id))}
                            className="absolute inset-0 bg-red-950/70 text-white flex items-center justify-center text-[10px] font-bold cursor-pointer"
                            title="Undo removal"
                          >
                            Undo
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeletedImageIds([...deletedImageIds, img.id])}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="Remove photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2 pt-2 border-t border-[#f2f4f6]">
            <Label className="text-xs font-semibold text-[#002660]">Historical Context & Travel Tips</Label>
            <Textarea
              className="text-xs min-h-[90px] bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 leading-relaxed"
              {...form.register('description')}
            />
          </div>

          <DialogFooter className="pt-4 border-t border-[#e2e8f0] bg-white sticky bottom-0">
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
              Update Destination
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
