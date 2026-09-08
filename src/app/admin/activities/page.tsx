'use client';

import React from 'react';
import {
  ActivitiesHeaderBar,
  ActivitiesTable,
  ActivityDialogsWrapper,
  useAdminActivitiesLogic,
} from '@/components/admin/activities';

export default function AdminActivitiesPage() {
  const {
    activities,
    rooms,
    isLoading,
    total,
    search,
    setSearch,
    selectedStatus,
    setSelectedStatus,
    selectedRoom,
    setSelectedRoom,
    page,
    setPage,
    createOpen,
    setCreateOpen,
    editOpen,
    setEditOpen,
    viewOpen,
    setViewOpen,
    deleteOpen,
    setDeleteOpen,
    selectedActivity,
    setSelectedActivity,
    submitting,
    copiedQr,
    createForm,
    editForm,
    fetchData,
    openCreateModal,
    handleCreateSubmit,
    openEditModal,
    handleEditSubmit,
    handleDelete,
    handleCopyQr,
  } = useAdminActivitiesLogic();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <ActivitiesHeaderBar
        total={total}
        search={search}
        setSearch={(val) => { setSearch(val); setPage(1); }}
        selectedStatus={selectedStatus}
        setSelectedStatus={(val) => { setSelectedStatus(val); setPage(1); }}
        selectedRoom={selectedRoom}
        setSelectedRoom={(val) => { setSelectedRoom(val); setPage(1); }}
        rooms={rooms}
        isLoading={isLoading}
        onRefresh={fetchData}
        onOpenCreate={openCreateModal}
      />

      <ActivitiesTable
        activities={activities}
        isLoading={isLoading}
        total={total}
        page={page}
        limit={10}
        onPageChange={setPage}
        onView={(act) => { setSelectedActivity(act); setViewOpen(true); }}
        onEdit={openEditModal}
        onDelete={(act) => { setSelectedActivity(act); setDeleteOpen(true); }}
        onOpenCreate={openCreateModal}
        hasFilters={Boolean(search || selectedStatus || selectedRoom)}
      />

      <ActivityDialogsWrapper
        createOpen={createOpen}
        setCreateOpen={setCreateOpen}
        createForm={createForm}
        onCreateSubmit={handleCreateSubmit}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        editForm={editForm}
        onEditSubmit={handleEditSubmit}
        viewOpen={viewOpen}
        setViewOpen={setViewOpen}
        selectedActivity={selectedActivity}
        copiedQr={copiedQr}
        onCopyQr={handleCopyQr}
        onOpenEdit={openEditModal}
        onOpenDelete={(act) => { setSelectedActivity(act); setDeleteOpen(true); }}
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        onDeleteSubmit={handleDelete}
        rooms={rooms}
        submitting={submitting}
      />
    </div>
  );
}
