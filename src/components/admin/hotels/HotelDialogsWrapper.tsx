import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Hotel } from '@/types';
import { CreateHotelFormData, UpdateHotelFormData } from '@/lib/validations';
import { HotelCreateModal } from './HotelCreateModal';
import { HotelEditModal } from './HotelEditModal';
import { HotelPreviewModal } from './HotelPreviewModal';
import { HotelDeleteModal } from './HotelDeleteModal';

interface HotelDialogsWrapperProps {
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
  createForm: UseFormReturn<CreateHotelFormData>;
  onCreateSubmit: (data: CreateHotelFormData) => Promise<void>;

  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  editForm: UseFormReturn<UpdateHotelFormData>;
  onEditSubmit: (data: UpdateHotelFormData) => Promise<void>;

  previewOpen: boolean;
  setPreviewOpen: (open: boolean) => void;
  previewImageIndex: number;
  setPreviewImageIndex: (index: number | ((prev: number) => number)) => void;

  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  selectedHotel: Hotel | null;
  onDeleteSubmit: () => Promise<void>;

  selectedStarRating: number;
  setSelectedStarRating: (rating: number) => void;
  starHoverRating: number;
  setStarHoverRating: (rating: number) => void;

  coverImageFile: File | null;
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
}

export function HotelDialogsWrapper({
  createOpen,
  setCreateOpen,
  createForm,
  onCreateSubmit,
  editOpen,
  setEditOpen,
  editForm,
  onEditSubmit,
  previewOpen,
  setPreviewOpen,
  previewImageIndex,
  setPreviewImageIndex,
  deleteOpen,
  setDeleteOpen,
  selectedHotel,
  onDeleteSubmit,
  selectedStarRating,
  setSelectedStarRating,
  starHoverRating,
  setStarHoverRating,
  coverImageFile,
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
}: HotelDialogsWrapperProps) {
  return (
    <>
      <HotelCreateModal
        open={createOpen}
        setOpen={setCreateOpen}
        form={createForm}
        selectedStarRating={selectedStarRating}
        setSelectedStarRating={setSelectedStarRating}
        starHoverRating={starHoverRating}
        setStarHoverRating={setStarHoverRating}
        coverImageFile={coverImageFile}
        coverImagePreview={coverImagePreview}
        imageFiles={imageFiles}
        imagePreviews={imagePreviews}
        onCoverChange={onCoverChange}
        onRemoveCover={onRemoveCover}
        onGalleryChange={onGalleryChange}
        onRemoveGalleryFile={onRemoveGalleryFile}
        onClearGallery={onClearGallery}
        submitting={submitting}
        onSubmit={onCreateSubmit}
      />

      <HotelEditModal
        open={editOpen}
        setOpen={setEditOpen}
        form={editForm}
        selectedHotel={selectedHotel}
        selectedStarRating={selectedStarRating}
        setSelectedStarRating={setSelectedStarRating}
        starHoverRating={starHoverRating}
        setStarHoverRating={setStarHoverRating}
        coverImagePreview={coverImagePreview}
        imageFiles={imageFiles}
        imagePreviews={imagePreviews}
        deletedImageIds={deletedImageIds}
        setDeletedImageIds={setDeletedImageIds}
        replaceImages={replaceImages}
        setReplaceImages={setReplaceImages}
        onCoverChange={onCoverChange}
        onRemoveCover={onRemoveCover}
        onGalleryChange={onGalleryChange}
        onRemoveGalleryFile={onRemoveGalleryFile}
        onClearGallery={onClearGallery}
        submitting={submitting}
        onSubmit={onEditSubmit}
      />

      <HotelPreviewModal
        open={previewOpen}
        setOpen={setPreviewOpen}
        hotel={selectedHotel}
        previewImageIndex={previewImageIndex}
        setPreviewImageIndex={setPreviewImageIndex}
      />

      <HotelDeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        selectedHotel={selectedHotel}
        submitting={submitting}
        onDelete={onDeleteSubmit}
      />
    </>
  );
}
