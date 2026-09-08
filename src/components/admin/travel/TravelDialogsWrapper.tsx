import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TravelRecommend, Weekday } from '@/types';
import { CreateTravelFormData, UpdateTravelFormData } from '@/lib/validations';
import { TravelCreateModal } from './TravelCreateModal';
import { TravelEditModal } from './TravelEditModal';
import { TravelPreviewModal } from './TravelPreviewModal';
import { TravelDeleteModal } from './TravelDeleteModal';

interface TravelDialogsWrapperProps {
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
  createForm: UseFormReturn<CreateTravelFormData>;
  onCreateSubmit: (data: CreateTravelFormData) => Promise<void>;

  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  editForm: UseFormReturn<UpdateTravelFormData>;
  onEditSubmit: (data: UpdateTravelFormData) => Promise<void>;

  previewOpen: boolean;
  setPreviewOpen: (open: boolean) => void;
  previewImageIndex: number;
  setPreviewImageIndex: (index: number | ((prev: number) => number)) => void;

  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  selectedTravel: TravelRecommend | null;
  onDeleteSubmit: () => Promise<void>;

  selectedOpenDays: Weekday[];
  onToggleOpenDay: (day: Weekday) => void;

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

export function TravelDialogsWrapper({
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
  selectedTravel,
  onDeleteSubmit,
  selectedOpenDays,
  onToggleOpenDay,
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
}: TravelDialogsWrapperProps) {
  return (
    <>
      <TravelCreateModal
        open={createOpen}
        setOpen={setCreateOpen}
        form={createForm}
        selectedOpenDays={selectedOpenDays}
        onToggleOpenDay={onToggleOpenDay}
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

      <TravelEditModal
        open={editOpen}
        setOpen={setEditOpen}
        form={editForm}
        selectedTravel={selectedTravel}
        selectedOpenDays={selectedOpenDays}
        onToggleOpenDay={onToggleOpenDay}
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

      <TravelPreviewModal
        open={previewOpen}
        setOpen={setPreviewOpen}
        travel={selectedTravel}
        previewImageIndex={previewImageIndex}
        setPreviewImageIndex={setPreviewImageIndex}
      />

      <TravelDeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        selectedTravel={selectedTravel}
        submitting={submitting}
        onDelete={onDeleteSubmit}
      />
    </>
  );
}
