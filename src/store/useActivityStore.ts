import { create } from "zustand";
import { Activity, AgendaItem, CreateActivityDto, UpdateActivityDto, Room } from "@/types";
import { adminService, publicService } from "@/services";

interface ActivityState {
  activities: Activity[];
  agendas: AgendaItem[];
  isLoading: boolean;
  error: string | null;
  total: number;
  rooms: Room[];
  
  // Basic Setters
  setActivities: (activities: Activity[]) => void;
  setAgendas: (agendas: AgendaItem[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setRooms: (rooms: Room[]) => void;

  // CRUD Operations (Admin)
  fetchAdminActivities: (params?: any) => Promise<void>;
  createActivity: (data: CreateActivityDto) => Promise<void>;
  updateActivity: (id: string, data: UpdateActivityDto) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;

  // Public Operations
  fetchPublicActivities: (params?: any) => Promise<void>;

  // Room Operations
  fetchRooms: (params?: any) => Promise<void>;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  activities: [],
  agendas: [],
  isLoading: false,
  error: null,
  total: 0,
  rooms: [],

  setActivities: (activities) => set({ activities }),
  setAgendas: (agendas) => set({ agendas }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setRooms: (rooms) => set({ rooms }),

  // Fetch activities for Admin
  fetchAdminActivities: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await adminService.getActivities(params);
      set({ 
        activities: response.data || [],
        total: response.meta?.total || response.data?.length || 0,
        isLoading: false 
      });
    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || 'Failed to load activities', 
        isLoading: false 
      });
      throw err;
    }
  },

  // Create activity (Admin)
  createActivity: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await adminService.createActivity(data);
      // Optional: Refresh list after create if params were saved, 
      // or just let the component call fetch again.
      set({ isLoading: false });
    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || 'Failed to create activity', 
        isLoading: false 
      });
      throw err;
    }
  },

  // Update activity (Admin)
  updateActivity: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      await adminService.updateActivity(id, data);
      set({ isLoading: false });
    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || 'Failed to update activity', 
        isLoading: false 
      });
      throw err;
    }
  },

  // Delete activity (Admin)
  deleteActivity: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await adminService.deleteActivity(id);
      set({ isLoading: false });
    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || 'Failed to delete activity', 
        isLoading: false 
      });
      throw err;
    }
  },

  // Fetch activities for Public
  fetchPublicActivities: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await publicService.getActivities(params);
      set({ 
        activities: response.data || [],
        total: response.meta?.total || response.data?.length || 0,
        isLoading: false 
      });
    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || 'Failed to load public activities', 
        isLoading: false 
      });
      throw err;
    }
  },

  // Fetch rooms
  fetchRooms: async (params) => {
    try {
      const response = await adminService.getRooms(params);
      set({ rooms: response.data || [] });
    } catch (err: any) {
      console.error('Failed to load rooms:', err);
    }
  }
}));
