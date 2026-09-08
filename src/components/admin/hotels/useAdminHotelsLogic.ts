import { useState, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { adminService } from '@/services';
import { Hotel } from '@/types';
import {
  createHotelSchema,
  CreateHotelFormData,
  updateHotelSchema,
  UpdateHotelFormData,
} from '@/lib/validations';
import { useHotelMediaFiles } from './useHotelMediaFiles';

export function useAdminHotelsLogic() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStarFilter, setSelectedStarFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedStarRating, setSelectedStarRating] = useState<number>(5);
  const [starHoverRating, setStarHoverRating] = useState<number>(0);

  const {
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
    resetAllMedia,
  } = useHotelMediaFiles();

  const createForm = useForm<CreateHotelFormData>({
    resolver: zodResolver(createHotelSchema),
    defaultValues: { name: '', address: '', description: '', contactInfo: '', websiteUrl: '', mapUrl: '', starRating: 5 },
  });

  const editForm = useForm<UpdateHotelFormData>({
    resolver: zodResolver(updateHotelSchema),
    defaultValues: { name: '', address: '', description: '', contactInfo: '', websiteUrl: '', mapUrl: '', starRating: 5 },
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminService.getHotels({ page, limit: 10, search: search.trim() || undefined });
      setHotels(res.data || []);
      setTotal(res.meta?.total || res.data?.length || 0);
    } catch {
      toast.error('Failed to load hotel directory. Check backend service.');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredHotels = useMemo(() => {
    if (!selectedStarFilter) return hotels;
    return hotels.filter((h) => (h.starRating || 5) === parseInt(selectedStarFilter, 10));
  }, [hotels, selectedStarFilter]);

  const openCreateModal = () => {
    resetAllMedia();
    setSelectedStarRating(5);
    createForm.reset({ name: '', address: '', description: '', contactInfo: '', websiteUrl: '', mapUrl: '', starRating: 5 });
    setCreateOpen(true);
  };

  const handleCreateSubmit = async (data: CreateHotelFormData) => {
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', data.name);
      fd.append('address', data.address);
      if (data.description) fd.append('description', data.description);
      if (data.contactInfo) fd.append('contactInfo', data.contactInfo);
      if (data.websiteUrl) fd.append('websiteUrl', data.websiteUrl);
      if (data.mapUrl) fd.append('mapUrl', data.mapUrl);
      fd.append('starRating', String(selectedStarRating));
      if (coverImageFile) fd.append('coverImage', coverImageFile);
      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => fd.append('images', file));
      }

      await adminService.createHotel(fd);
      setCreateOpen(false);
      resetAllMedia();
      createForm.reset();
      toast.success('Partner hotel registered successfully!', { description: data.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to register partner hotel');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    resetAllMedia();
    setSelectedStarRating(hotel.starRating || 5);
    editForm.reset({
      name: hotel.name,
      address: hotel.address,
      description: hotel.description || '',
      contactInfo: hotel.contactInfo || '',
      websiteUrl: hotel.websiteUrl || '',
      mapUrl: hotel.mapUrl || '',
      starRating: hotel.starRating || 5,
    });
    setEditOpen(true);
  };

  const handleEditSubmit = async (data: UpdateHotelFormData) => {
    if (!selectedHotel) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      if (data.name) fd.append('name', data.name);
      if (data.address) fd.append('address', data.address);
      if (data.description !== undefined) fd.append('description', data.description);
      if (data.contactInfo !== undefined) fd.append('contactInfo', data.contactInfo);
      if (data.websiteUrl !== undefined) fd.append('websiteUrl', data.websiteUrl);
      if (data.mapUrl !== undefined) fd.append('mapUrl', data.mapUrl);
      fd.append('starRating', String(selectedStarRating));
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

      await adminService.updateHotel(selectedHotel.id, fd);
      setEditOpen(false);
      resetAllMedia();
      toast.success('Hotel details updated successfully!', { description: data.name || selectedHotel.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to update hotel details');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedHotel) return;
    setSubmitting(true);
    try {
      await adminService.deleteHotel(selectedHotel.id);
      setDeleteOpen(false);
      toast.success('Hotel accommodation removed.', { description: selectedHotel.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to delete hotel');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    hotels: filteredHotels,
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
  };
}
