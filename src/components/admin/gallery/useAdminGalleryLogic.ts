import { useState, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { adminService } from '@/services';
import { Activity, Gallery } from '@/types';
import {
  createGallerySchema,
  CreateGalleryFormData,
  updateGallerySchema,
  UpdateGalleryFormData,
} from '@/lib/validations';
import { useGalleryMediaFiles } from './useGalleryMediaFiles';

export function useAdminGalleryLogic() {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivityId, setSelectedActivityId] = useState<string>('');
  const [selectedVisibility, setSelectedVisibility] = useState<string>('');
  const [selectedMediaType, setSelectedMediaType] = useState<string>('');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Gallery | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { mediaFiles, filePreviews, handleMediaFilesChange, removeStagedFile, clearStagedFiles } = useGalleryMediaFiles();

  const createForm = useForm<CreateGalleryFormData>({
    resolver: zodResolver(createGallerySchema),
    defaultValues: { title: '', mediaType: 'IMAGE', visibility: 'PUBLIC', description: '', activityId: '' },
  });

  const editForm = useForm<UpdateGalleryFormData>({
    resolver: zodResolver(updateGallerySchema),
    defaultValues: { title: '', mediaType: 'IMAGE', visibility: 'PUBLIC', description: '' },
  });

  useEffect(() => {
    adminService.getActivities({ limit: 100 }).then((res) => {
      setActivities(res.data || []);
      if (res.data && res.data.length > 0 && !selectedActivityId) {
        setSelectedActivityId(res.data[0].id);
      }
    }).catch(() => {});
  }, [selectedActivityId]);

  const fetchGallery = useCallback(async () => {
    if (!selectedActivityId) {
      setGallery([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await adminService.getGalleryByActivity(selectedActivityId);
      setGallery(res || []);
    } catch {
      toast.error('Failed to load gallery items for this session.');
    } finally {
      setLoading(false);
    }
  }, [selectedActivityId]);

  useEffect(() => { fetchGallery(); }, [fetchGallery]);

  const filteredGallery = useMemo(() => {
    return gallery.filter((item) => {
      const matchesSearch = !search || item.title?.toLowerCase().includes(search.toLowerCase()) || item.description?.toLowerCase().includes(search.toLowerCase());
      const matchesVisibility = !selectedVisibility || item.visibility === selectedVisibility;
      const matchesType = !selectedMediaType || item.mediaType === selectedMediaType;
      return matchesSearch && matchesVisibility && matchesType;
    });
  }, [gallery, search, selectedVisibility, selectedMediaType]);

  const handleCreateSubmit = async (data: CreateGalleryFormData) => {
    if (mediaFiles.length === 0) {
      toast.error('Please attach at least one image or video file.');
      return;
    }
    setSubmitting(true);
    try {
      for (const file of mediaFiles) {
        const fd = new FormData();
        fd.append('activityId', data.activityId);
        fd.append('file', file);
        if (data.title) fd.append('title', data.title);
        if (data.description) fd.append('description', data.description);
        fd.append('mediaType', data.mediaType);
        fd.append('visibility', data.visibility);
        await adminService.createGalleryItem(fd);
      }
      setCreateOpen(false);
      clearStagedFiles();
      createForm.reset({ title: '', mediaType: 'IMAGE', visibility: 'PUBLIC', description: '', activityId: selectedActivityId });
      toast.success('Media items uploaded successfully!');
      fetchGallery();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to upload media files');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (data: UpdateGalleryFormData) => {
    if (!selectedItem) return;
    setSubmitting(true);
    try {
      await adminService.updateGalleryItem(selectedItem.id, data);
      setEditOpen(false);
      toast.success('Media metadata updated.');
      fetchGallery();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to update media details');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setSubmitting(true);
    try {
      await adminService.deleteGalleryItem(selectedItem.id);
      setDeleteOpen(false);
      toast.success('Media record removed.');
      fetchGallery();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to delete media');
    } finally {
      setSubmitting(false);
    }
  };

  const openCreateModal = () => {
    createForm.setValue('activityId', selectedActivityId || (activities[0]?.id || ''));
    setCreateOpen(true);
  };

  const openEditModal = (item: Gallery) => {
    setSelectedItem(item);
    editForm.reset({
      title: item.title || '',
      mediaType: item.mediaType,
      visibility: item.visibility,
      description: item.description || '',
    });
    setEditOpen(true);
  };

  return {
    gallery: filteredGallery,
    activities,
    selectedActivityId,
    setSelectedActivityId,
    selectedVisibility,
    setSelectedVisibility,
    selectedMediaType,
    setSelectedMediaType,
    search,
    setSearch,
    viewMode,
    setViewMode,
    loading,
    createOpen,
    setCreateOpen,
    editOpen,
    setEditOpen,
    deleteOpen,
    setDeleteOpen,
    lightboxOpen,
    setLightboxOpen,
    lightboxIndex,
    setLightboxIndex,
    selectedItem,
    setSelectedItem,
    submitting,
    mediaFiles,
    filePreviews,
    handleMediaFilesChange,
    removeStagedFile,
    clearStagedFiles,
    createForm,
    editForm,
    fetchGallery,
    handleCreateSubmit,
    handleEditSubmit,
    handleDelete,
    openCreateModal,
    openEditModal,
  };
}
