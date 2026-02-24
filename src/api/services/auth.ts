import { ApiResponse, AuthResponse, User } from '../../types';
import { apiClient } from '../client';

export const authService = {
    login: async (data: Record<string, unknown>) => {
        const response = await apiClient.post<ApiResponse<AuthResponse>>('/users/login', data);
        return response.data;
    },

    register: async (data: Record<string, unknown>) => {
        const response = await apiClient.post<ApiResponse<AuthResponse>>('/users/register', data);
        return response.data;
    },

    logout: async () => {
        const response = await apiClient.post<ApiResponse<{}>>('/users/logout');
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await apiClient.get<ApiResponse<{ user: User }>>('/users/current-user');
        return response.data;
    }
};
