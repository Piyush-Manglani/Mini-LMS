import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { clearTokens, getAccessToken } from '../utils/secureStore';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.freeapi.app/api/v1';

export const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        if (!error.response) {
            // Network error
        } else {
            const { status } = error.response;
            if (status === 401) {
                await clearTokens();
            }
        }
        return Promise.reject(error);
    }
);
