import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Activity, Room } from '@/types';
import { CreateActivityFormData, UpdateActivityFormData } from '@/lib/validations';
import { ActivityCreateModal } from './ActivityCreateModal';
import { ActivityEditModal } from './ActivityEditModal';
import { ActivityViewModal } from './ActivityViewModal';
import { ActivityDeleteModal } from './ActivityDeleteModal';

interface ActivityDialogsWrapperProps {
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
  createForm: UseFormReturn<CreateActivityFormData>;
  onCreateSubmit: (data: CreateActivityFormData) => Promise<void>;

  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  editForm: UseFormReturn<UpdateActivityFormData>;
  onEditSubmit: (data: UpdateActivityFormData) => Promise<void>;

  viewOpen: boolean;
  setViewOpen: (open: boolean) => void;
  selectedActivity: Activity | null;
  copiedQr: boolean;
  onCopyQr: (code?: string | null) => void;
  onOpenEdit: (activity: Activity) => void;
  onOpenDelete: (activity: Activity) => void;

  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  onDeleteSubmit: () => Promise<void>;

  rooms: Room[];
  submitting: boolean;
}

export function ActivityDialogsWrapper({
  createOpen,
  setCreateOpen,
  createForm,
  onCreateSubmit,
  editOpen,
  setEditOpen,
  editForm,
  onEditSubmit,
  viewOpen,
  setViewOpen,
  selectedActivity,
  copiedQr,
  onCopyQr,
  onOpenEdit,
  onOpenDelete,
  deleteOpen,
  setDeleteOpen,
  onDeleteSubmit,
  rooms,
  submitting,
}: ActivityDialogsWrapperProps) {
  return (
    <>
      <ActivityCreateModal
        open={createOpen}
        setOpen={setCreateOpen}
        form={createForm}
        rooms={rooms}
        submitting={submitting}
        onSubmit={onCreateSubmit}
      />

      <ActivityEditModal
        open={editOpen}
        setOpen={setEditOpen}
        form={editForm}
        rooms={rooms}
        submitting={submitting}
        onSubmit={onEditSubmit}
      />

      <ActivityViewModal
        open={viewOpen}
        setOpen={setViewOpen}
        activity={selectedActivity}
        copiedQr={copiedQr}
        onCopyQr={onCopyQr}
        onOpenEdit={onOpenEdit}
        onOpenDelete={onOpenDelete}
      />

      <ActivityDeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        activity={selectedActivity}
        submitting={submitting}
        onDelete={onDeleteSubmit}
      />
    </>
  );
}
