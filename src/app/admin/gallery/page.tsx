'use client';

import React from 'react';
import {
  GalleryHeaderBar,
  GalleryGridView,
  GalleryTableView,
  GalleryDialogsWrapper,
  useAdminGalleryLogic,
} from '@/components/admin/gallery';

export default function AdminGalleryPage() {
  const {
    gallery,
    activities,
    selectedActivityId,
    setSelectedActivityId,
    selectedVisibility,
    setSelectedVisibility,
    selectedMediaType,
    setSelectedMediaType,
    search,
    setSearch,
    viewMode,
    setViewMode,
    loading,
    createOpen,
    setCreateOpen,
    editOpen,
    setEditOpen,
    deleteOpen,
    setDeleteOpen,
    lightboxOpen,
    setLightboxOpen,
    lightboxIndex,
    setLightboxIndex,
    selectedItem,
    setSelectedItem,
    submitting,
    mediaFiles,
    filePreviews,
    handleMediaFilesChange,
    removeStagedFile,
    clearStagedFiles,
    createForm,
    editForm,
    fetchGallery,
    handleCreateSubmit,
    handleEditSubmit,
    handleDelete,
    openCreateModal,
    openEditModal,
  } = useAdminGalleryLogic();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <GalleryHeaderBar
        search={search}
        setSearch={setSearch}
        selectedActivityId={selectedActivityId}
        setSelectedActivityId={setSelectedActivityId}
        selectedVisibility={selectedVisibility}
        setSelectedVisibility={setSelectedVisibility}
        selectedMediaType={selectedMediaType}
        setSelectedMediaType={setSelectedMediaType}
        viewMode={viewMode}
        setViewMode={setViewMode}
        activities={activities}
        loading={loading}
        onRefresh={fetchGallery}
        onOpenCreate={openCreateModal}
      />

      {viewMode === 'grid' ? (
        <GalleryGridView
          gallery={gallery}
          loading={loading}
          onOpenLightbox={(idx) => { setLightboxIndex(idx); setLightboxOpen(true); }}
          onEdit={openEditModal}
          onDelete={(item) => { setSelectedItem(item); setDeleteOpen(true); }}
          onOpenCreate={openCreateModal}
        />
      ) : (
        <GalleryTableView
          gallery={gallery}
          loading={loading}
          onOpenLightbox={(idx) => { setLightboxIndex(idx); setLightboxOpen(true); }}
          onEdit={openEditModal}
          onDelete={(item) => { setSelectedItem(item); setDeleteOpen(true); }}
        />
      )}

      <GalleryDialogsWrapper
        createOpen={createOpen}
        setCreateOpen={setCreateOpen}
        createForm={createForm}
        onCreateSubmit={handleCreateSubmit}
        mediaFiles={mediaFiles}
        filePreviews={filePreviews}
        onFilesChange={handleMediaFilesChange}
        onRemoveFile={removeStagedFile}
        onClearFiles={clearStagedFiles}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        editForm={editForm}
        onEditSubmit={handleEditSubmit}
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedItem={selectedItem}
        onDeleteSubmit={handleDelete}
        lightboxOpen={lightboxOpen}
        setLightboxOpen={setLightboxOpen}
        gallery={gallery}
        lightboxIndex={lightboxIndex}
        setLightboxIndex={setLightboxIndex}
        activities={activities}
        submitting={submitting}
      />
    </div>
  );
}
