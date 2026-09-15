'use client';

import React from 'react';
import {
  DelegationsHeaderBar,
  DelegationsTable,
  DelegationDialogs,
  useAdminDelegationsLogic,
} from '@/components/admin/delegations';

export default function AdminDelegationsPage() {
  const {
    delegations,
    countries,
    organizations,
    loading,
    search,
    setSearch,
    selectedCountry,
    setSelectedCountry,
    selectedOrg,
    setSelectedOrg,
    page,
    setPage,
    total,
    createOpen,
    setCreateOpen,
    editOpen,
    setEditOpen,
    deleteOpen,
    setDeleteOpen,
    selectedDelegation,
    setSelectedDelegation,
    submitting,
    exporting,
    createForm,
    editForm,
    fetchData,
    handleCreateSubmit,
    openEditModal,
    handleEditSubmit,
    handleDelete,
    handleExport,
  } = useAdminDelegationsLogic();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <DelegationsHeaderBar
        search={search}
        setSearch={(val) => { setSearch(val); setPage(1); }}
        selectedCountry={selectedCountry}
        setSelectedCountry={(val) => { setSelectedCountry(val); setPage(1); }}
        selectedOrg={selectedOrg}
        setSelectedOrg={(val) => { setSelectedOrg(val); setPage(1); }}
        countries={countries}
        organizations={organizations}
        loading={loading}
        onRefresh={fetchData}
        onOpenCreate={() => { createForm.reset(); setCreateOpen(true); }}
        onExport={handleExport}
        exporting={exporting}
      />

      <DelegationsTable
        delegations={delegations}
        loading={loading}
        total={total}
        page={page}
        limit={10}
        onPageChange={setPage}
        onEdit={openEditModal}
        onDelete={(del) => { setSelectedDelegation(del); setDeleteOpen(true); }}
      />

      <DelegationDialogs
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
        selectedDelegation={selectedDelegation}
        onDeleteSubmit={handleDelete}
        countries={countries}
        organizations={organizations}
        submitting={submitting}
      />
    </div>
  );
}
