import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { adminService } from '@/services';
import { Country, Delegation, Organization } from '@/types';
import {
  createDelegationSchema,
  CreateDelegationFormData,
  updateDelegationSchema,
  UpdateDelegationFormData,
} from '@/lib/validations';

export function useAdminDelegationsLogic() {
  const [delegations, setDelegations] = useState<Delegation[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedDelegation, setSelectedDelegation] = useState<Delegation | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const createForm = useForm<CreateDelegationFormData>({
    resolver: zodResolver(createDelegationSchema),
    defaultValues: {
      title: 'Mr.',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      position: '',
      countryId: '',
      organizationId: '',
    },
  });

  const editForm = useForm<UpdateDelegationFormData>({
    resolver: zodResolver(updateDelegationSchema),
    defaultValues: {
      title: 'Mr.',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      position: '',
      countryId: '',
      organizationId: '',
    },
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [delRes, countriesRes, orgsRes] = await Promise.all([
        adminService.getDelegations({
          page,
          limit: 10,
          search: search.trim() || undefined,
          countryId: selectedCountry || undefined,
          organizationId: selectedOrg || undefined,
        }),
        adminService.getCountries({ limit: 100 }),
        adminService.getOrganizations({ limit: 100 }),
      ]);
      setDelegations(delRes.data || []);
      setTotal(delRes.meta?.total || delRes.data?.length || 0);
      setCountries(countriesRes.data || []);
      setOrganizations(orgsRes.data || []);
    } catch {
      toast.error('Failed to load delegations. Check backend connectivity.');
    } finally {
      setLoading(false);
    }
  }, [page, search, selectedCountry, selectedOrg]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateSubmit = async (data: CreateDelegationFormData) => {
    setSubmitting(true);
    try {
      await adminService.createDelegation({
        ...data,
        countryId: data.countryId || undefined,
        organizationId: data.organizationId || undefined,
      });
      setCreateOpen(false);
      createForm.reset();
      toast.success('Delegation registered successfully!', { description: `${data.firstName} ${data.lastName}` });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to create delegation');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (delegation: Delegation) => {
    setSelectedDelegation(delegation);
    editForm.reset({
      title: delegation.title || '',
      firstName: delegation.firstName,
      lastName: delegation.lastName,
      email: delegation.email,
      phoneNumber: delegation.phoneNumber || '',
      position: delegation.position || '',
      countryId: delegation.countryId || '',
      organizationId: delegation.organizationId || '',
    });
    setEditOpen(true);
  };

  const handleEditSubmit = async (data: UpdateDelegationFormData) => {
    if (!selectedDelegation) return;
    setSubmitting(true);
    try {
      await adminService.updateDelegation(selectedDelegation.id, {
        ...data,
        countryId: data.countryId || undefined,
        organizationId: data.organizationId || undefined,
      });
      setEditOpen(false);
      toast.success('Delegation updated successfully!', { description: `${data.firstName} ${data.lastName}` });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to update delegation');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDelegation) return;
    setSubmitting(true);
    try {
      await adminService.deleteDelegation(selectedDelegation.id);
      setDeleteOpen(false);
      toast.success('Delegation record removed.', { description: `${selectedDelegation.firstName} ${selectedDelegation.lastName}` });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to delete delegation');
    } finally {
      setSubmitting(false);
    }
  };

  return {
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
    createForm,
    editForm,
    fetchData,
    handleCreateSubmit,
    openEditModal,
    handleEditSubmit,
    handleDelete,
  };
}
