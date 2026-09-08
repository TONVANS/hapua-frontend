import { useState, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { adminService } from '@/services';
import { TravelRecommend, Weekday } from '@/types';
import {
  createTravelSchema,
  CreateTravelFormData,
  updateTravelSchema,
  UpdateTravelFormData,
} from '@/lib/validations';
import { useTravelMediaFiles } from './useTravelMediaFiles';
import { formatTravelTime } from './utils';

export function useAdminTravelLogic() {
  const [travels, setTravels] = useState<TravelRecommend[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);

  const [selectedTravel, setSelectedTravel] = useState<TravelRecommend | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    coverImageFile,
    coverImagePreview,
    imageFiles,
    imagePreviews,
    deletedImageIds,
    setDeletedImageIds,
    replaceImages,
    setReplaceImages,
    selectedOpenDays,
    setSelectedOpenDays,
    handleCoverChange,
    removeCoverImage,
    handleGalleryChange,
    removeStagedGalleryFile,
    clearGallery,
    toggleOpenDay,
    resetAllMedia,
  } = useTravelMediaFiles();

  const createForm = useForm<CreateTravelFormData>({
    resolver: zodResolver(createTravelSchema),
    defaultValues: { placeName: '', location: '', description: '', openTime: '', closeTime: '', mapUrl: '' },
  });

  const editForm = useForm<UpdateTravelFormData>({
    resolver: zodResolver(updateTravelSchema),
    defaultValues: { placeName: '', location: '', description: '', openTime: '', closeTime: '', mapUrl: '' },
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminService.getTravel({ page, limit: 10, search: search.trim() || undefined });
      setTravels(res.data || []);
      setTotal(res.meta?.total || res.data?.length || 0);
    } catch {
      toast.error('Failed to load travel recommendations. Check backend connection.');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredTravels = useMemo(() => {
    if (!selectedDayFilter) return travels;
    return travels.filter((t) => !t.openDays || t.openDays.length === 0 || t.openDays.includes(selectedDayFilter as Weekday));
  }, [travels, selectedDayFilter]);

  const openCreateModal = () => {
    resetAllMedia();
    createForm.reset({ placeName: '', location: '', description: '', openTime: '', closeTime: '', mapUrl: '' });
    setCreateOpen(true);
  };

  const handleCreateSubmit = async (data: CreateTravelFormData) => {
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('placeName', data.placeName);
      fd.append('location', data.location);
      if (data.description) fd.append('description', data.description);
      if (data.openTime) fd.append('openTime', data.openTime);
      if (data.closeTime) fd.append('closeTime', data.closeTime);
      if (data.mapUrl) fd.append('mapUrl', data.mapUrl);
      if (selectedOpenDays.length > 0) {
        selectedOpenDays.forEach((day) => fd.append('openDays', day));
      }
      if (coverImageFile) fd.append('coverImage', coverImageFile);
      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => fd.append('images', file));
      }

      await adminService.createTravel(fd);
      setCreateOpen(false);
      resetAllMedia();
      createForm.reset();
      toast.success('Travel destination added successfully!', { description: data.placeName });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to add destination');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (travel: TravelRecommend) => {
    setSelectedTravel(travel);
    resetAllMedia();
    setSelectedOpenDays(travel.openDays || []);
    editForm.reset({
      placeName: travel.placeName,
      location: travel.location,
      description: travel.description || '',
      openTime: formatTravelTime(travel.openTime),
      closeTime: formatTravelTime(travel.closeTime),
      mapUrl: travel.mapUrl || '',
    });
    setEditOpen(true);
  };

  const handleEditSubmit = async (data: UpdateTravelFormData) => {
    if (!selectedTravel) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      if (data.placeName) fd.append('placeName', data.placeName);
      if (data.location) fd.append('location', data.location);
      if (data.description !== undefined) fd.append('description', data.description);
      if (data.openTime !== undefined) fd.append('openTime', data.openTime);
      if (data.closeTime !== undefined) fd.append('closeTime', data.closeTime);
      if (data.mapUrl !== undefined) fd.append('mapUrl', data.mapUrl);
      if (selectedOpenDays.length > 0) {
        selectedOpenDays.forEach((day) => fd.append('openDays', day));
      }
      if (coverImageFile) fd.append('coverImage', coverImageFile);
      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => fd.append('images', file));
      }
      if (deletedImageIds.length > 0) {
        deletedImageIds.forEach((id) => fd.append('deletedImageIds', id));
      }
      if (replaceImages) {
        fd.append('replaceImages', 'true');
      }

      await adminService.updateTravel(selectedTravel.id, fd);
      setEditOpen(false);
      resetAllMedia();
      toast.success('Destination details updated successfully!', { description: data.placeName || selectedTravel.placeName });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to update destination details');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTravel) return;
    setSubmitting(true);
    try {
      await adminService.deleteTravel(selectedTravel.id);
      setDeleteOpen(false);
      toast.success('Destination removed.', { description: selectedTravel.placeName });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to delete destination');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    travels: filteredTravels,
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
  };
}
