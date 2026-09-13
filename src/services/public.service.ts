import apiClient from './api';
import {
  Activity,
  AgendaItem,
  Delegation,
  Gallery,
  Hotel,
  LandingOverview,
  PaginatedResponse,
  PaginationQuery,
  RegisterActivityDto,
  SiteVisitStats,
  TravelRecommend,
} from '@/types';

export const publicService = {
  /**
   * Get landing overview: GET /public/landing
   */
  async getLandingOverview(): Promise<LandingOverview> {
    const response = await apiClient.get<LandingOverview>('/public/landing');
    return response.data;
  },

  /**
   * Get agenda timeline: GET /public/activities/agenda
   */
  async getAgenda(): Promise<Record<string, AgendaItem[]> | AgendaItem[]> {
    const response = await apiClient.get<Record<string, AgendaItem[]> | AgendaItem[]>('/public/activities/agenda');
    return response.data;
  },

  /**
   * Get public activities list: GET /public/activities
   */
  async getActivities(params?: PaginationQuery): Promise<PaginatedResponse<Activity>> {
    const response = await apiClient.get<PaginatedResponse<Activity>>('/public/activities', {
      params,
    });
    return response.data;
  },

  /**
   * Get single activity detail: GET /public/activities/:id
   */
  async getActivity(id: string): Promise<Activity> {
    const response = await apiClient.get<Activity>(`/public/activities/${id}`);
    return response.data;
  },

  /**
   * Get public gallery for activity: GET /public/gallery/activity/:activityId
   */
  async getGallery(activityId: string): Promise<Gallery[]> {
    const response = await apiClient.get<Gallery[]>(`/public/gallery/activity/${activityId}`);
    return response.data;
  },

  /**
   * Get hotels list: GET /public/hotels
   */
  async getHotels(params?: PaginationQuery): Promise<PaginatedResponse<Hotel>> {
    const response = await apiClient.get<PaginatedResponse<Hotel>>('/public/hotels', {
      params,
    });
    return response.data;
  },

  /**
   * Get single hotel detail: GET /public/hotels/:id
   */
  async getHotel(id: string): Promise<Hotel> {
    const response = await apiClient.get<Hotel>(`/public/hotels/${id}`);
    return response.data;
  },

  /**
   * Get travel spots: GET /public/travel
   */
  async getTravel(params?: PaginationQuery): Promise<PaginatedResponse<TravelRecommend>> {
    const response = await apiClient.get<PaginatedResponse<TravelRecommend>>('/public/travel', {
      params,
    });
    return response.data;
  },

  /**
   * Get single travel spot: GET /public/travel/:id
   */
  async getTravelSpot(id: string): Promise<TravelRecommend> {
    const response = await apiClient.get<TravelRecommend>(`/public/travel/${id}`);
    return response.data;
  },

  /**
   * Check delegation code: GET /public/registration/delegation/:code
   */
  async checkDelegation(code: string): Promise<Delegation> {
    const response = await apiClient.get<Delegation>(`/public/registration/delegation/${code}`);
    return response.data;
  },

  /**
   * Register for activity: POST /public/registration/activity
   */
  async registerForActivity(payload: RegisterActivityDto): Promise<{ message: string; success: boolean }> {
    const response = await apiClient.post<{ message: string; success: boolean }>(
      '/public/registration/activity',
      payload
    );
    return response.data;
  },

  /**
   * Record site visit (with anti-spam deduplication): POST /public/visit
   */
  async recordVisit(path?: string): Promise<SiteVisitStats> {
    const response = await apiClient.post<SiteVisitStats>('/public/visit', { path });
    return response.data;
  },

  /**
   * Get current site visit stats without incrementing: GET /public/visit
   */
  async getVisitStats(): Promise<SiteVisitStats> {
    const response = await apiClient.get<SiteVisitStats>('/public/visit');
    return response.data;
  },
};

