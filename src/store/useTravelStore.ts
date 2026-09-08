import { create } from 'zustand';
import { TravelRecommend, PaginationQuery } from '@/types';
import { publicService } from '@/services';

interface TravelState {
  travelList: TravelRecommend[];
  selectedTravel: TravelRecommend | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  searchQuery: string;
  dayFilter: string | null;

  // Setters
  setTravelList: (travelList: TravelRecommend[]) => void;
  setSelectedTravel: (travel: TravelRecommend | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setDayFilter: (day: string | null) => void;

  // Public Operations
  fetchPublicTravel: (params?: PaginationQuery) => Promise<void>;
  fetchTravelDetail: (id: string) => Promise<TravelRecommend | null>;
}

export const useTravelStore = create<TravelState>((set, get) => ({
  travelList: [],
  selectedTravel: null,
  isLoading: false,
  error: null,
  total: 0,
  searchQuery: '',
  dayFilter: null,

  setTravelList: (travelList) => set({ travelList }),
  setSelectedTravel: (selectedTravel) => set({ selectedTravel }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setDayFilter: (dayFilter) => set({ dayFilter }),

  fetchPublicTravel: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await publicService.getTravel(params);
      set({
        travelList: response.data || [],
        total: response.meta?.total || response.data?.length || 0,
        isLoading: false,
      });
    } catch (err: any) {
      console.error('Error fetching travel recommendations from backend:', err);
      set({
        error: err.response?.data?.message || err.message || 'Failed to load travel recommendations from backend',
        isLoading: false,
      });
    }
  },

  fetchTravelDetail: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const travel = await publicService.getTravelSpot(id);
      set({ selectedTravel: travel, isLoading: false });
      return travel;
    } catch (err: any) {
      console.error('Error fetching travel spot detail from backend:', err);
      set({
        error: err.response?.data?.message || err.message || 'Failed to load travel spot details',
        isLoading: false,
      });
      return null;
    }
  },
}));
