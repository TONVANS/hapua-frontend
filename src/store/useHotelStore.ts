import { create } from 'zustand';
import { Hotel, PaginationQuery } from '@/types';
import { publicService } from '@/services';

interface HotelState {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  searchQuery: string;
  starFilter: number | null;

  // Setters
  setHotels: (hotels: Hotel[]) => void;
  setSelectedHotel: (hotel: Hotel | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setStarFilter: (rating: number | null) => void;

  // Public Operations
  fetchPublicHotels: (params?: PaginationQuery) => Promise<void>;
  fetchHotelDetail: (id: string) => Promise<Hotel | null>;
}

export const useHotelStore = create<HotelState>((set, get) => ({
  hotels: [],
  selectedHotel: null,
  isLoading: false,
  error: null,
  total: 0,
  searchQuery: '',
  starFilter: null,

  setHotels: (hotels) => set({ hotels }),
  setSelectedHotel: (selectedHotel) => set({ selectedHotel }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStarFilter: (starFilter) => set({ starFilter }),

  fetchPublicHotels: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await publicService.getHotels(params);
      set({
        hotels: response.data || [],
        total: response.meta?.total || response.data?.length || 0,
        isLoading: false,
      });
    } catch (err: any) {
      console.error('Error fetching hotels from backend:', err);
      set({
        error: err.response?.data?.message || err.message || 'Failed to load recommended hotels from backend',
        isLoading: false,
      });
    }
  },

  fetchHotelDetail: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const hotel = await publicService.getHotel(id);
      set({ selectedHotel: hotel, isLoading: false });
      return hotel;
    } catch (err: any) {
      console.error('Error fetching hotel detail from backend:', err);
      set({
        error: err.response?.data?.message || err.message || 'Failed to load hotel details',
        isLoading: false,
      });
      return null;
    }
  },
}));
