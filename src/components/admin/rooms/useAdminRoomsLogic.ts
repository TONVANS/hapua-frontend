import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { adminService } from '@/services';
import { Room } from '@/types';
import {
  createRoomSchema,
  CreateRoomFormData,
  updateRoomSchema,
  UpdateRoomFormData,
} from '@/lib/validations';

export function useAdminRoomsLogic() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const createForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: { name: '', location: '', capacity: 50, description: '', imageUrl: '' },
  });

  const editForm = useForm<UpdateRoomFormData>({
    resolver: zodResolver(updateRoomSchema),
    defaultValues: { name: '', location: '', capacity: 50, description: '', imageUrl: '' },
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminService.getRooms({
        page,
        limit: 10,
        search: search.trim() || undefined,
      });
      setRooms(res.data || []);
      setTotal(res.meta?.total || res.data?.length || 0);
    } catch {
      toast.error('Failed to load meeting rooms.');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateSubmit = async (data: CreateRoomFormData) => {
    setSubmitting(true);
    try {
      await adminService.createRoom(data);
      setCreateOpen(false);
      createForm.reset();
      toast.success('Meeting room registered!', { description: data.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to create room');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (room: Room) => {
    setSelectedRoom(room);
    editForm.reset({
      name: room.name,
      location: room.location || '',
      capacity: room.capacity,
      description: room.description || '',
      imageUrl: room.imageUrl || '',
    });
    setEditOpen(true);
  };

  const handleEditSubmit = async (data: UpdateRoomFormData) => {
    if (!selectedRoom) return;
    setSubmitting(true);
    try {
      await adminService.updateRoom(selectedRoom.id, data);
      setEditOpen(false);
      toast.success('Room details updated.', { description: data.name || selectedRoom.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to update room');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRoom) return;
    setSubmitting(true);
    try {
      await adminService.deleteRoom(selectedRoom.id);
      setDeleteOpen(false);
      toast.success('Room removed.', { description: selectedRoom.name });
      fetchData();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to delete room');
    } finally {
      setSubmitting(false);
    }
  };

  return {
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
  };
}
