'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { adminService } from '@/services';
import { Organization } from '@/types';
import {
  createOrganizationSchema,
  CreateOrganizationFormData,
  updateOrganizationSchema,
  UpdateOrganizationFormData,
} from '@/lib/validations';
import {
  OrganizationsTable,
  OrganizationDialogs,
  OrganizationsHeaderBar,
} from '@/components/admin/organizations';

export default function AdminOrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const createForm = useForm<CreateOrganizationFormData>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: { name: '', shortName: '' },
  });

  const editForm = useForm<UpdateOrganizationFormData>({
    resolver: zodResolver(updateOrganizationSchema),
    defaultValues: { name: '', shortName: '' },
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminService.getOrganizations({ limit: 100, search: search.trim() || undefined });
      setOrganizations(res.data || []);
    } catch {
      toast.error('Failed to load organizations.');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateSubmit = async (data: CreateOrganizationFormData) => {
    setSubmitting(true);
    try {
      await adminService.createOrganization(data);
      setCreateOpen(false);
      createForm.reset();
      toast.success('Organization added successfully!', { description: data.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to create organization');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (org: Organization) => {
    setSelectedOrg(org);
    editForm.reset({ name: org.name || '', shortName: org.shortName || '' });
    setEditOpen(true);
  };

  const handleEditSubmit = async (data: UpdateOrganizationFormData) => {
    if (!selectedOrg) return;
    setSubmitting(true);
    try {
      await adminService.updateOrganization(selectedOrg.id, data);
      setEditOpen(false);
      toast.success('Organization details updated.', { description: data.name || selectedOrg.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to update organization');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedOrg) return;
    setSubmitting(true);
    try {
      await adminService.deleteOrganization(selectedOrg.id);
      setDeleteOpen(false);
      toast.success('Organization removed.', { description: selectedOrg.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to delete organization');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <OrganizationsHeaderBar
        search={search}
        setSearch={setSearch}
        loading={loading}
        onRefresh={fetchData}
        onOpenCreate={() => { createForm.reset(); setCreateOpen(true); }}
      />

      <OrganizationsTable
        organizations={organizations}
        loading={loading}
        onEdit={openEditModal}
        onDelete={(org) => { setSelectedOrg(org); setDeleteOpen(true); }}
      />

      <OrganizationDialogs
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
        selectedOrg={selectedOrg}
        onDeleteSubmit={handleDelete}
        submitting={submitting}
      />
    </div>
  );
}
