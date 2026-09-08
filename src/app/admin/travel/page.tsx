'use client';

import React from 'react';
import {
  TravelHeaderBar,
  TravelTable,
  TravelDialogsWrapper,
  useAdminTravelLogic,
} from '@/components/admin/travel';

export default function AdminTravelPage() {
  const {
    travels,
    loading,
    total,
    page,
    setPage,
    search,
    setSearch,
    selectedDayFilter,
    setSelectedDayFilter,
    createOpen,
    setCreateOpen,
    editOpen,
    setEditOpen,
    deleteOpen,
    setDeleteOpen,
    previewOpen,
    setPreviewOpen,
    previewImageIndex,
    setPreviewImageIndex,
    selectedTravel,
    setSelectedTravel,
    submitting,
    coverImageFile,
    coverImagePreview,
    imageFiles,
    imagePreviews,
    deletedImageIds,
    setDeletedImageIds,
    replaceImages,
    setReplaceImages,
    selectedOpenDays,
    handleCoverChange,
    removeCoverImage,
    handleGalleryChange,
    removeStagedGalleryFile,
    clearGallery,
    toggleOpenDay,
    createForm,
    editForm,
    fetchData,
    openCreateModal,
    handleCreateSubmit,
    openEditModal,
    handleEditSubmit,
    handleDelete,
  } = useAdminTravelLogic();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <TravelHeaderBar
        search={search}
        setSearch={(v) => { setSearch(v); setPage(1); }}
        selectedDayFilter={selectedDayFilter}
        setSelectedDayFilter={setSelectedDayFilter}
        loading={loading}
        onRefresh={fetchData}
        onOpenCreate={openCreateModal}
      />

      <TravelTable
        travels={travels}
        loading={loading}
        total={total}
        page={page}
        limit={10}
        onPageChange={setPage}
        onPreview={(t) => { setSelectedTravel(t); setPreviewImageIndex(0); setPreviewOpen(true); }}
        onEdit={openEditModal}
        onDelete={(t) => { setSelectedTravel(t); setDeleteOpen(true); }}
      />

      <TravelDialogsWrapper
        createOpen={createOpen}
        setCreateOpen={setCreateOpen}
        createForm={createForm}
        onCreateSubmit={handleCreateSubmit}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        editForm={editForm}
        onEditSubmit={handleEditSubmit}
        previewOpen={previewOpen}
        setPreviewOpen={setPreviewOpen}
        previewImageIndex={previewImageIndex}
        setPreviewImageIndex={setPreviewImageIndex}
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedTravel={selectedTravel}
        onDeleteSubmit={handleDelete}
        selectedOpenDays={selectedOpenDays}
        onToggleOpenDay={toggleOpenDay}
        coverImageFile={coverImageFile}
        coverImagePreview={coverImagePreview}
        imageFiles={imageFiles}
        imagePreviews={imagePreviews}
        deletedImageIds={deletedImageIds}
        setDeletedImageIds={setDeletedImageIds}
        replaceImages={replaceImages}
        setReplaceImages={setReplaceImages}
        onCoverChange={handleCoverChange}
        onRemoveCover={removeCoverImage}
        onGalleryChange={handleGalleryChange}
        onRemoveGalleryFile={removeStagedGalleryFile}
        onClearGallery={clearGallery}
        submitting={submitting}
      />
    </div>
  );
}
