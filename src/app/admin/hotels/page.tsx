'use client';

import React from 'react';
import {
  HotelsHeaderBar,
  HotelsTable,
  HotelDialogsWrapper,
  useAdminHotelsLogic,
} from '@/components/admin/hotels';

export default function AdminHotelsPage() {
  const {
    hotels,
    loading,
    total,
    page,
    setPage,
    search,
    setSearch,
    selectedStarFilter,
    setSelectedStarFilter,
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
    selectedHotel,
    setSelectedHotel,
    submitting,
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
    handleCoverChange,
    removeCoverImage,
    handleGalleryChange,
    removeStagedGalleryFile,
    clearGallery,
    createForm,
    editForm,
    fetchData,
    openCreateModal,
    handleCreateSubmit,
    openEditModal,
    handleEditSubmit,
    handleDelete,
  } = useAdminHotelsLogic();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <HotelsHeaderBar
        search={search}
        setSearch={(v) => { setSearch(v); setPage(1); }}
        selectedStarFilter={selectedStarFilter}
        setSelectedStarFilter={setSelectedStarFilter}
        loading={loading}
        onRefresh={fetchData}
        onOpenCreate={openCreateModal}
      />

      <HotelsTable
        hotels={hotels}
        loading={loading}
        total={total}
        page={page}
        limit={10}
        onPageChange={setPage}
        onPreview={(hotel) => { setSelectedHotel(hotel); setPreviewImageIndex(0); setPreviewOpen(true); }}
        onEdit={openEditModal}
        onDelete={(hotel) => { setSelectedHotel(hotel); setDeleteOpen(true); }}
      />

      <HotelDialogsWrapper
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
        selectedHotel={selectedHotel}
        onDeleteSubmit={handleDelete}
        selectedStarRating={selectedStarRating}
        setSelectedStarRating={setSelectedStarRating}
        starHoverRating={starHoverRating}
        setStarHoverRating={setStarHoverRating}
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
