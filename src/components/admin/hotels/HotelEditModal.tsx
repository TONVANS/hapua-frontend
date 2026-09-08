import React, { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  Star,
  Globe,
  Camera,
  Building,
  Upload,
  ImagePlus,
  X,
  Trash2,
  Edit2,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Hotel } from '@/types';
import { UpdateHotelFormData } from '@/lib/validations';
import { STAR_RATING_LABELS } from './utils';

interface HotelEditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<UpdateHotelFormData>;
  selectedHotel: Hotel | null;
  selectedStarRating: number;
  setSelectedStarRating: (rating: number) => void;
  starHoverRating: number;
  setStarHoverRating: (rating: number) => void;
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
  onSubmit: (data: UpdateHotelFormData) => Promise<void>;
}

export function HotelEditModal({
  open,
  setOpen,
  form,
  selectedHotel,
  selectedStarRating,
  setSelectedStarRating,
  starHoverRating,
  setStarHoverRating,
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
}: HotelEditModalProps) {
  const editCoverInputRef = useRef<HTMLInputElement | null>(null);
  const editGalleryInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] bg-white rounded-3xl p-0 overflow-hidden border border-white/80 shadow-2xl">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-[#002660] to-[#1a3c7d] text-white">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <Edit2 className="w-5 h-5 text-[#ffe088]" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-white">Edit Partner Hotel</DialogTitle>
              <DialogDescription className="text-xs text-white/80 mt-0.5">
                Update {selectedHotel?.name} accommodation details.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Overview */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002660] flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#cca730]" /> 1. Property Overview & Classification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">
                  Hotel Name <span className="text-[#ba1a1a]">*</span>
                </Label>
                <Input
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20"
                  {...form.register('name')}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">
                  Full Address <span className="text-[#ba1a1a]">*</span>
                </Label>
                <Input
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20"
                  {...form.register('address')}
                />
              </div>
            </div>

            {/* Star Rating Picker */}
            <div className="p-3.5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] space-y-2">
              <Label className="text-xs font-semibold text-[#002660]">Star Rating & Luxury Tier</Label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (starHoverRating || selectedStarRating) >= star;
                    return (
                      <button
                        type="button"
                        key={star}
                        onMouseEnter={() => setStarHoverRating(star)}
                        onMouseLeave={() => setStarHoverRating(0)}
                        onClick={() => setSelectedStarRating(star)}
                        className="p-1 text-[#d4af37] hover:scale-115 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            isFilled ? 'fill-[#d4af37] text-[#d4af37]' : 'fill-slate-200 text-slate-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-bold text-[#002660]">
                  {STAR_RATING_LABELS[starHoverRating || selectedStarRating]}
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Links */}
          <div className="space-y-4 pt-2 border-t border-[#f2f4f6]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002660] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#cca730]" /> 2. Contact & Online Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">Contact Info</Label>
                <Input
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20"
                  {...form.register('contactInfo')}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">Website / Booking URL</Label>
                <Input
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 font-mono text-[11px]"
                  {...form.register('websiteUrl')}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">Google Maps Link</Label>
                <Input
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 font-mono text-[11px]"
                  {...form.register('mapUrl')}
                />
              </div>
            </div>
          </div>

          {/* Media Uploads */}
          <div className="space-y-4 pt-2 border-t border-[#f2f4f6]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002660] flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#cca730]" /> 3. Media & Hotel Gallery
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
                ) : selectedHotel?.coverImage ? (
                  <div className="relative w-full h-32 rounded-2xl border border-[#e2e8f0] overflow-hidden group bg-slate-100 shadow-xs">
                    <img src={selectedHotel.coverImage} alt="Current cover" className="w-full h-full object-cover" />
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
            {!replaceImages && selectedHotel?.images && selectedHotel.images.length > 0 && (
              <div className="p-3 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#002660]">
                    Current Photos ({selectedHotel.images.length - deletedImageIds.length} active)
                  </span>
                  <span className="text-[10px] text-[#747781]">Click trash on photo to mark for deletion</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedHotel.images.map((img) => {
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
            <Label className="text-xs font-semibold text-[#002660]">Description & Delegate Amenities</Label>
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
              Update Hotel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
