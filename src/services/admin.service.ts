import apiClient from './api';
import {
  Activity,
  ActivityRegistrationStat,
  ActivityStatus,
  Country,
  CreateActivityDto,
  CreateCountryDto,
  CreateDelegationDto,
  CreateGalleryDto,
  CreateHotelDto,
  CreateOrganizationDto,
  CreateRoomDto,
  CreateTravelDto,
  DashboardStats,
  Delegation,
  Gallery,
  Hotel,
  Organization,
  PaginatedResponse,
  PaginationQuery,
  Room,
  TravelRecommend,
  UpdateActivityDto,
  UpdateCountryDto,
  UpdateDelegationDto,
  UpdateGalleryDto,
  UpdateHotelDto,
  UpdateOrganizationDto,
  UpdateRoomDto,
  UpdateTravelDto,
  Visibility,
} from '@/types';

export const adminService = {
  // ----------------------------------------------------
  // Reports & Stats
  // ----------------------------------------------------
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>('/admin/reports/dashboard');
    return response.data;
  },

  async getActivityRegistrations(): Promise<ActivityRegistrationStat[]> {
    const response = await apiClient.get<ActivityRegistrationStat[]>(
      '/admin/reports/activity-registrations'
    );
    return response.data;
  },

  // ----------------------------------------------------
  // Delegations
  // ----------------------------------------------------
  async getDelegations(
    params?: PaginationQuery & { countryId?: string; organizationId?: string }
  ): Promise<PaginatedResponse<Delegation>> {
    const response = await apiClient.get<PaginatedResponse<Delegation>>('/admin/delegations', {
      params,
    });
    return response.data;
  },

  async getDelegation(id: string): Promise<Delegation> {
    const response = await apiClient.get<Delegation>(`/admin/delegations/${id}`);
    return response.data;
  },

  async createDelegation(payload: CreateDelegationDto): Promise<Delegation> {
    const response = await apiClient.post<Delegation>('/admin/delegations', payload);
    return response.data;
  },

  async updateDelegation(id: string, payload: UpdateDelegationDto): Promise<Delegation> {
    const response = await apiClient.patch<Delegation>(`/admin/delegations/${id}`, payload);
    return response.data;
  },

  async deleteDelegation(id: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      `/admin/delegations/${id}`
    );
    return response.data;
  },

  async exportDelegations(
    params?: { search?: string; countryId?: string; organizationId?: string }
  ): Promise<Blob> {
    const response = await apiClient.get('/admin/delegations/export', {
      params,
      responseType: 'blob',
      timeout: 120000,
    });
    return response.data as Blob;
  },

  // ----------------------------------------------------
  // Activities
  // ----------------------------------------------------
  async getActivities(
    params?: PaginationQuery & { status?: ActivityStatus; roomId?: string }
  ): Promise<PaginatedResponse<Activity>> {
    const response = await apiClient.get<PaginatedResponse<Activity>>('/admin/activities', {
      params,
    });
    return response.data;
  },

  async getActivity(id: string): Promise<Activity> {
    const response = await apiClient.get<Activity>(`/admin/activities/${id}`);
    return response.data;
  },

  async createActivity(payload: CreateActivityDto): Promise<Activity> {
    const response = await apiClient.post<Activity>('/admin/activities', payload);
    return response.data;
  },

  async updateActivity(id: string, payload: UpdateActivityDto): Promise<Activity> {
    const response = await apiClient.patch<Activity>(`/admin/activities/${id}`, payload);
    return response.data;
  },

  async deleteActivity(id: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      `/admin/activities/${id}`
    );
    return response.data;
  },

  // ----------------------------------------------------
  // Rooms
  // ----------------------------------------------------
  async getRooms(params?: PaginationQuery): Promise<PaginatedResponse<Room>> {
    const response = await apiClient.get<PaginatedResponse<Room>>('/admin/rooms', { params });
    return response.data;
  },

  async getRoom(id: string): Promise<Room> {
    const response = await apiClient.get<Room>(`/admin/rooms/${id}`);
    return response.data;
  },

  async createRoom(payload: CreateRoomDto): Promise<Room> {
    const response = await apiClient.post<Room>('/admin/rooms', payload);
    return response.data;
  },

  async updateRoom(id: string, payload: UpdateRoomDto): Promise<Room> {
    const response = await apiClient.patch<Room>(`/admin/rooms/${id}`, payload);
    return response.data;
  },

  async deleteRoom(id: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      `/admin/rooms/${id}`
    );
    return response.data;
  },

  // ----------------------------------------------------
  // Hotels
  // ----------------------------------------------------
  async getHotels(params?: PaginationQuery): Promise<PaginatedResponse<Hotel>> {
    const response = await apiClient.get<PaginatedResponse<Hotel>>('/admin/hotels', { params });
    return response.data;
  },

  async getHotel(id: string): Promise<Hotel> {
    const response = await apiClient.get<Hotel>(`/admin/hotels/${id}`);
    return response.data;
  },

  async createHotel(payload: FormData): Promise<Hotel> {
    const response = await apiClient.post<Hotel>('/admin/hotels', payload);
    return response.data;
  },

  async updateHotel(id: string, payload: FormData): Promise<Hotel> {
    const response = await apiClient.patch<Hotel>(`/admin/hotels/${id}`, payload);
    return response.data;
  },

  async deleteHotel(id: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      `/admin/hotels/${id}`
    );
    return response.data;
  },

  // ----------------------------------------------------
  // Travel Recommendations
  // ----------------------------------------------------
  async getTravel(params?: PaginationQuery): Promise<PaginatedResponse<TravelRecommend>> {
    const response = await apiClient.get<PaginatedResponse<TravelRecommend>>('/admin/travel', {
      params,
    });
    return response.data;
  },

  async getTravelSpot(id: string): Promise<TravelRecommend> {
    const response = await apiClient.get<TravelRecommend>(`/admin/travel/${id}`);
    return response.data;
  },

  async createTravel(payload: FormData): Promise<TravelRecommend> {
    const response = await apiClient.post<TravelRecommend>('/admin/travel', payload);
    return response.data;
  },

  async updateTravel(id: string, payload: FormData): Promise<TravelRecommend> {
    const response = await apiClient.patch<TravelRecommend>(`/admin/travel/${id}`, payload);
    return response.data;
  },

  async deleteTravel(id: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      `/admin/travel/${id}`
    );
    return response.data;
  },

  // ----------------------------------------------------
  // Countries (Master Data)
  // ----------------------------------------------------
  async getCountries(params?: PaginationQuery): Promise<PaginatedResponse<Country>> {
    const response = await apiClient.get<PaginatedResponse<Country>>('/admin/countries', {
      params,
    });
    return response.data;
  },

  async getCountry(id: string): Promise<Country> {
    const response = await apiClient.get<Country>(`/admin/countries/${id}`);
    return response.data;
  },

  async createCountry(payload: CreateCountryDto): Promise<Country> {
    const response = await apiClient.post<Country>('/admin/countries', payload);
    return response.data;
  },

  async updateCountry(id: string, payload: UpdateCountryDto): Promise<Country> {
    const response = await apiClient.patch<Country>(`/admin/countries/${id}`, payload);
    return response.data;
  },

  async deleteCountry(id: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      `/admin/countries/${id}`
    );
    return response.data;
  },

  // ----------------------------------------------------
  // Organizations (Master Data)
  // ----------------------------------------------------
  async getOrganizations(params?: PaginationQuery): Promise<PaginatedResponse<Organization>> {
    const response = await apiClient.get<PaginatedResponse<Organization>>('/admin/organizations', {
      params,
    });
    return response.data;
  },

  async getOrganization(id: string): Promise<Organization> {
    const response = await apiClient.get<Organization>(`/admin/organizations/${id}`);
    return response.data;
  },

  async createOrganization(payload: CreateOrganizationDto): Promise<Organization> {
    const response = await apiClient.post<Organization>('/admin/organizations', payload);
    return response.data;
  },

  async updateOrganization(id: string, payload: UpdateOrganizationDto): Promise<Organization> {
    const response = await apiClient.patch<Organization>(`/admin/organizations/${id}`, payload);
    return response.data;
  },

  async deleteOrganization(id: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      `/admin/organizations/${id}`
    );
    return response.data;
  },

  // ----------------------------------------------------
  // Gallery
  // ----------------------------------------------------
  async getGalleryByActivity(
    activityId: string,
    visibility?: Visibility
  ): Promise<Gallery[]> {
    const response = await apiClient.get<Gallery[]>(`/admin/gallery/activity/${activityId}`, {
      params: { visibility },
    });
    return response.data;
  },

  async getGalleryItem(id: string): Promise<Gallery> {
    const response = await apiClient.get<Gallery>(`/admin/gallery/${id}`);
    return response.data;
  },

  async createGalleryItem(payload: FormData): Promise<Gallery> {
    const response = await apiClient.post<Gallery>('/admin/gallery/upload', payload);
    return response.data;
  },

  async bulkCreateGallery(activityId: string, payload: CreateGalleryDto[]): Promise<Gallery[]> {
    const response = await apiClient.post<Gallery[]>(`/admin/gallery/bulk/${activityId}`, payload);
    return response.data;
  },

  async updateGalleryItem(id: string, payload: UpdateGalleryDto): Promise<Gallery> {
    const response = await apiClient.patch<Gallery>(`/admin/gallery/${id}`, payload);
    return response.data;
  },

  async deleteGalleryItem(id: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      `/admin/gallery/${id}`
    );
    return response.data;
  },
};
