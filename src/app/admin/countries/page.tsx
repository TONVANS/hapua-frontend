'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { adminService } from '@/services';
import { Country } from '@/types';
import {
  createCountrySchema,
  CreateCountryFormData,
  updateCountrySchema,
  UpdateCountryFormData,
} from '@/lib/validations';
import {
  CountriesTable,
  CountryDialogs,
  CountriesHeaderBar,
} from '@/components/admin/countries';

export default function AdminCountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const createForm = useForm<CreateCountryFormData>({
    resolver: zodResolver(createCountrySchema),
    defaultValues: { name: '', code: '' },
  });

  const editForm = useForm<UpdateCountryFormData>({
    resolver: zodResolver(updateCountrySchema),
    defaultValues: { name: '', code: '' },
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminService.getCountries({ limit: 100, search: search.trim() || undefined });
      setCountries(res.data || []);
    } catch {
      toast.error('Failed to load countries.');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateSubmit = async (data: CreateCountryFormData) => {
    setSubmitting(true);
    try {
      await adminService.createCountry(data);
      setCreateOpen(false);
      createForm.reset();
      toast.success('Country master record added!', { description: data.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to create country');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (country: Country) => {
    setSelectedCountry(country);
    editForm.reset({ name: country.name || '', code: country.code || '' });
    setEditOpen(true);
  };

  const handleEditSubmit = async (data: UpdateCountryFormData) => {
    if (!selectedCountry) return;
    setSubmitting(true);
    try {
      await adminService.updateCountry(selectedCountry.id, data);
      setEditOpen(false);
      toast.success('Country record updated.', { description: data.name || selectedCountry.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to update country');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCountry) return;
    setSubmitting(true);
    try {
      await adminService.deleteCountry(selectedCountry.id);
      setDeleteOpen(false);
      toast.success('Country removed.', { description: selectedCountry.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to delete country');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <CountriesHeaderBar
        search={search}
        setSearch={setSearch}
        loading={loading}
        onRefresh={fetchData}
        onOpenCreate={() => { createForm.reset(); setCreateOpen(true); }}
      />

      <CountriesTable
        countries={countries}
        loading={loading}
        onEdit={openEditModal}
        onDelete={(c) => { setSelectedCountry(c); setDeleteOpen(true); }}
      />

      <CountryDialogs
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
        selectedCountry={selectedCountry}
        onDeleteSubmit={handleDelete}
        submitting={submitting}
      />
    </div>
  );
}
