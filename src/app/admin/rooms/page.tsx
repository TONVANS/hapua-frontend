'use client';

import React from 'react';
import {
  RoomsTable,
  RoomDialogs,
  RoomsHeaderBar,
  useAdminRoomsLogic,
} from '@/components/admin/rooms';

export default function AdminRoomsPage() {
  const {
    rooms,
    loading,
    search,
    setSearch,
    page,
    setPage,
    total,
    createOpen,
    setCreateOpen,
    editOpen,
    setEditOpen,
    deleteOpen,
    setDeleteOpen,
    selectedRoom,
    setSelectedRoom,
    submitting,
    createForm,
    editForm,
    fetchData,
    handleCreateSubmit,
    openEditModal,
    handleEditSubmit,
    handleDelete,
  } = useAdminRoomsLogic();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <RoomsHeaderBar
        search={search}
        setSearch={(val) => { setSearch(val); setPage(1); }}
        loading={loading}
        onRefresh={fetchData}
        onOpenCreate={() => { createForm.reset(); setCreateOpen(true); }}
      />

      <RoomsTable
        rooms={rooms}
        loading={loading}
        total={total}
        page={page}
        limit={10}
        onPageChange={setPage}
        onEdit={openEditModal}
        onDelete={(room) => { setSelectedRoom(room); setDeleteOpen(true); }}
      />

      <RoomDialogs
        createOpen={createOpen}
        setCreateOpen={setCreateOpen}
        createForm={createForm}
        onCreateSubmit={handleCreateSubmit}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        editForm={editForm}
        onEditSubmit={handleEditSubmit}
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedRoom={selectedRoom}
        onDeleteSubmit={handleDelete}
        submitting={submitting}
      />
    </div>
  );
}
