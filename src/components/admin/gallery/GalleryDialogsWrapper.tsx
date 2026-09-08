import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Activity, Gallery } from '@/types';
import { CreateGalleryFormData, UpdateGalleryFormData } from '@/lib/validations';
import { GalleryCreateModal } from './GalleryCreateModal';
import { GalleryEditModal } from './GalleryEditModal';
import { GalleryDeleteModal } from './GalleryDeleteModal';
import { GalleryLightboxModal } from './GalleryLightboxModal';

interface GalleryDialogsWrapperProps {
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
  createForm: UseFormReturn<CreateGalleryFormData>;
  onCreateSubmit: (data: CreateGalleryFormData) => Promise<void>;
  mediaFiles: File[];
  filePreviews: { name: string; size: string; url: string; type: string }[];
  onFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  onClearFiles: () => void;

  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  editForm: UseFormReturn<UpdateGalleryFormData>;
  onEditSubmit: (data: UpdateGalleryFormData) => Promise<void>;

  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  selectedItem: Gallery | null;
  onDeleteSubmit: () => Promise<void>;

  lightboxOpen: boolean;
  setLightboxOpen: (open: boolean) => void;
  gallery: Gallery[];
  lightboxIndex: number;
  setLightboxIndex: (index: number | ((prev: number) => number)) => void;

  activities: Activity[];
  submitting: boolean;
}

export function GalleryDialogsWrapper({
  createOpen,
  setCreateOpen,
  createForm,
  onCreateSubmit,
  mediaFiles,
  filePreviews,
  onFilesChange,
  onRemoveFile,
  onClearFiles,
  editOpen,
  setEditOpen,
  editForm,
  onEditSubmit,
  deleteOpen,
  setDeleteOpen,
  selectedItem,
  onDeleteSubmit,
  lightboxOpen,
  setLightboxOpen,
  gallery,
  lightboxIndex,
  setLightboxIndex,
  activities,
  submitting,
}: GalleryDialogsWrapperProps) {
  return (
    <>
      <GalleryCreateModal
        open={createOpen}
        setOpen={setCreateOpen}
        form={createForm}
        activities={activities}
        mediaFiles={mediaFiles}
        filePreviews={filePreviews}
        onFilesChange={onFilesChange}
        onRemoveFile={onRemoveFile}
        onClearFiles={onClearFiles}
        submitting={submitting}
        onSubmit={onCreateSubmit}
      />

      <GalleryEditModal
        open={editOpen}
        setOpen={setEditOpen}
        form={editForm}
        submitting={submitting}
        onSubmit={onEditSubmit}
      />

      <GalleryDeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        selectedItem={selectedItem}
        submitting={submitting}
        onDelete={onDeleteSubmit}
      />

      <GalleryLightboxModal
        open={lightboxOpen}
        setOpen={setLightboxOpen}
        gallery={gallery}
        lightboxIndex={lightboxIndex}
        setLightboxIndex={setLightboxIndex}
        activities={activities}
      />
    </>
  );
}
