import React, { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  Hotel as HotelIcon,
  Star,
  Globe,
  Camera,
  Building,
  Upload,
  ImagePlus,
  X,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CreateHotelFormData } from '@/lib/validations';
import { STAR_RATING_LABELS } from './utils';

interface HotelCreateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<CreateHotelFormData>;
  selectedStarRating: number;
  setSelectedStarRating: (rating: number) => void;
  starHoverRating: number;
  setStarHoverRating: (rating: number) => void;
  coverImageFile: File | null;
  coverImagePreview: string | null;
  imageFiles: File[];
  imagePreviews: string[];
  onCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveCover: () => void;
  onGalleryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveGalleryFile: (index: number) => void;
  onClearGallery: () => void;
  submitting: boolean;
  onSubmit: (data: CreateHotelFormData) => Promise<void>;
}

export function HotelCreateModal({
  open,
  setOpen,
  form,
  selectedStarRating,
  setSelectedStarRating,
  starHoverRating,
  setStarHoverRating,
  coverImageFile,
  coverImagePreview,
  imageFiles,
  imagePreviews,
  onCoverChange,
  onRemoveCover,
  onGalleryChange,
  onRemoveGalleryFile,
  onClearGallery,
  submitting,
  onSubmit,
}: HotelCreateModalProps) {
  const createCoverInputRef = useRef<HTMLInputElement | null>(null);
  const createGalleryInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] bg-white rounded-3xl p-0 overflow-hidden border border-white/80 shadow-2xl">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-[#002660] to-[#1a3c7d] text-white">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <HotelIcon className="w-5 h-5 text-[#ffe088]" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-white">Register Partner Hotel</DialogTitle>
              <DialogDescription className="text-xs text-white/80 mt-0.5">
                Provide accommodation details and luxury amenities for delegate reservations.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Property Overview */}
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
                  placeholder="e.g. Amantaka Luang Prabang"
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20"
                  {...form.register('name')}
                />
                {form.formState.errors.name && (
                  <p className="text-[11px] text-[#ba1a1a] font-medium">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">
                  Full Address <span className="text-[#ba1a1a]">*</span>
                </Label>
                <Input
                  placeholder="e.g. 55/3 Kingkitsarath Road, Luang Prabang"
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20"
                  {...form.register('address')}
                />
                {form.formState.errors.address && (
                  <p className="text-[11px] text-[#ba1a1a] font-medium">
                    {form.formState.errors.address.message}
                  </p>
                )}
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

          {/* Section 2: Contact & Online Presence */}
          <div className="space-y-4 pt-2 border-t border-[#f2f4f6]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002660] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#cca730]" /> 2. Contact & Online Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">Contact Info</Label>
                <Input
                  placeholder="+856 71 860 333"
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20"
                  {...form.register('contactInfo')}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">Website / Booking URL</Label>
                <Input
                  placeholder="https://aman.com/resorts/amantaka"
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 font-mono text-[11px]"
                  {...form.register('websiteUrl')}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#002660]">Google Maps Link</Label>
                <Input
                  placeholder="https://maps.google.com/..."
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 font-mono text-[11px]"
                  {...form.register('mapUrl')}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Media & Photos */}
          <div className="space-y-4 pt-2 border-t border-[#f2f4f6]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002660] flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#cca730]" /> 3. Media & Hotel Gallery
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cover Image */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-[#002660]">Cover Image</Label>
                  {coverImageFile && (
                    <Badge className="bg-[#d2e5f6] text-[#002660] text-[10px] font-medium">
                      1 Selected
                    </Badge>
                  )}
                </div>
                <input
                  type="file"
                  ref={createCoverInputRef}
                  accept="image/*"
                  onChange={onCoverChange}
                  className="hidden"
                />
                {coverImagePreview ? (
                  <div className="relative w-full h-32 rounded-2xl border border-[#e2e8f0] overflow-hidden group bg-slate-100 shadow-xs">
                    <img src={coverImagePreview} alt="Cover preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => createCoverInputRef.current?.click()}
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
                ) : (
                  <button
                    type="button"
                    onClick={() => createCoverInputRef.current?.click()}
                    className="w-full h-32 rounded-2xl border-2 border-dashed border-[#e2e8f0] hover:border-[#002660] bg-[#f7f9fb] hover:bg-[#f2f4f6] flex flex-col items-center justify-center gap-1.5 transition-all text-slate-500 hover:text-[#002660] cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="text-xs font-semibold">Click to select Cover Image</span>
                    <span className="text-[10px] text-slate-400">JPG, PNG, WebP up to 10MB</span>
                  </button>
                )}
              </div>

              {/* Gallery Photos */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-[#002660]">Gallery Photos (Multiple)</Label>
                  <Badge className="bg-[#f2f4f6] text-[#002660] text-[10px] font-semibold">
                    {imageFiles.length} photo(s) selected
                  </Badge>
                </div>
                <input
                  type="file"
                  ref={createGalleryInputRef}
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
                      onClick={() => createGalleryInputRef.current?.click()}
                      className="h-8 text-xs rounded-xl border-[#e2e8f0] text-[#002660] hover:bg-white cursor-pointer font-semibold shadow-xs"
                    >
                      <ImagePlus className="w-3.5 h-3.5 mr-1.5" />
                      {imageFiles.length > 0 ? '+ Add More Photos' : '+ Select Gallery Photos'}
                    </Button>
                    {imageFiles.length > 0 && (
                      <button
                        type="button"
                        onClick={onClearGallery}
                        className="text-[11px] text-[#ba1a1a] hover:underline cursor-pointer font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {imagePreviews.length > 0 ? (
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pt-1">
                      {imagePreviews.map((preview, idx) => (
                        <div
                          key={idx}
                          className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#e2e8f0] group shadow-xs bg-slate-900 shrink-0"
                        >
                          <img src={preview} alt={`preview ${idx}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => onRemoveGalleryFile(idx)}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="Remove photo"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 italic text-center py-4">
                      No gallery photos staged. Click button above to add photos.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Description */}
          <div className="space-y-2 pt-2 border-t border-[#f2f4f6]">
            <Label className="text-xs font-semibold text-[#002660]">Description & Delegate Amenities</Label>
            <Textarea
              placeholder="Hospitality highlights, executive lounge, shuttle transfer schedule, reservation promo codes..."
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
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Upload className="w-4 h-4 mr-1.5" />}
              Publish Hotel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
