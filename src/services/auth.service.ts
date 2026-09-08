import apiClient from './api';
import { LoginDto, LoginResponse } from '@/types';

export const authService = {
  /**
   * Admin Login: POST /auth/login
   */
  async login(credentials: LoginDto): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
};
