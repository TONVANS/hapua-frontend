import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useActivityStore } from '@/store';
import { Activity, ActivityStatus } from '@/types';
import {
  createActivitySchema,
  CreateActivityFormData,
  updateActivitySchema,
  UpdateActivityFormData,
} from '@/lib/validations';
import {
  toDateInputValue,
  toTimeInputValue,
  toISOStringFromDateTime,
} from './utils';

export function useAdminActivitiesLogic() {
  const {
    activities,
    rooms,
    isLoading,
    total,
    fetchAdminActivities,
    fetchRooms,
    createActivity,
    updateActivity,
    deleteActivity,
  } = useActivityStore();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copiedQr, setCopiedQr] = useState(false);

  const createForm = useForm<CreateActivityFormData>({
    resolver: zodResolver(createActivitySchema),
    defaultValues: { name: '', description: '', date: '', startTime: '09:00', endTime: '11:00', roomId: '' },
  });

  const editForm = useForm<UpdateActivityFormData>({
    resolver: zodResolver(updateActivitySchema),
    defaultValues: { name: '', description: '', date: '', startTime: '09:00', endTime: '11:00', roomId: '' },
  });

  const fetchData = useCallback(async () => {
    try {
      await Promise.all([
        fetchAdminActivities({
          page,
          limit: 10,
          search: search.trim() || undefined,
          status: (selectedStatus as ActivityStatus) || undefined,
          roomId: selectedRoom || undefined,
        }),
        fetchRooms({ limit: 100 }),
      ]);
    } catch {
      toast.error('Failed to load activities', { description: 'Please check backend service connection.' });
    }
  }, [page, search, selectedStatus, selectedRoom, fetchAdminActivities, fetchRooms]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openCreateModal = () => {
    createForm.reset({
      name: '',
      description: '',
      date: toDateInputValue(new Date()),
      startTime: '09:00',
      endTime: '11:00',
      roomId: '',
    });
    setCreateOpen(true);
  };

  const handleCreateSubmit = async (data: CreateActivityFormData) => {
    setSubmitting(true);
    try {
      await createActivity({
        name: data.name.trim(),
        description: data.description?.trim() || undefined,
        date: data.date,
        startTime: toISOStringFromDateTime(data.date, data.startTime),
        endTime: toISOStringFromDateTime(data.date, data.endTime),
        roomId: data.roomId && data.roomId.trim() ? data.roomId : undefined,
      });
      setCreateOpen(false);
      createForm.reset();
      toast.success('Activity created successfully', { description: data.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to create activity');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (activity: Activity) => {
    setSelectedActivity(activity);
    editForm.reset({
      name: activity.name || '',
      description: activity.description || '',
      date: toDateInputValue(activity.date) || '',
      startTime: toTimeInputValue(activity.startTime, '09:00'),
      endTime: toTimeInputValue(activity.endTime, '11:00'),
      roomId: activity.roomId || '',
    });
    setEditOpen(true);
  };

  const handleEditSubmit = async (data: UpdateActivityFormData) => {
    if (!selectedActivity) return;
    setSubmitting(true);
    try {
      const eventDate = data.date || toDateInputValue(selectedActivity.date);
      await updateActivity(selectedActivity.id, {
        name: data.name?.trim(),
        description: data.description !== undefined ? data.description.trim() : undefined,
        date: eventDate ? eventDate.split('T')[0] : undefined,
        startTime: data.startTime ? toISOStringFromDateTime(eventDate, data.startTime) : undefined,
        endTime: data.endTime ? toISOStringFromDateTime(eventDate, data.endTime) : undefined,
        roomId: data.roomId && data.roomId.trim() ? data.roomId : undefined,
      });
      setEditOpen(false);
      toast.success('Activity updated successfully', { description: data.name || selectedActivity.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to update activity');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedActivity) return;
    setSubmitting(true);
    try {
      await deleteActivity(selectedActivity.id);
      setDeleteOpen(false);
      setViewOpen(false);
      toast.success('Activity deleted', { description: `${selectedActivity.name} has been removed.` });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to delete activity');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyQr = (code?: string | null) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedQr(true);
    toast.success('QR Code copied to clipboard', { description: code });
    setTimeout(() => setCopiedQr(false), 2000);
  };

  return {
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
  };
}
