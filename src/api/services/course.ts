import { ApiResponse, Instructor, Product, ProductsResponse } from '../../types';
import { apiClient } from '../client';

export interface InstructorsResponse {
    data?: { users?: Instructor[] };
    users?: Instructor[];
}

export const courseService = {
    getCourses: async (page = 1, limit = 10) => {
        const response = await apiClient.get<ApiResponse<ProductsResponse>>(`/public/randomproducts?page=${page}&limit=${limit}`);
        return response.data;
    },

    getCourseDetails: async (id: number) => {
        const response = await apiClient.get<ApiResponse<{ data: Product } | Product>>(`/public/randomproducts/${id}`);
        return response.data;
    },

    getInstructors: async (page = 1, limit = 10) => {
        const response = await apiClient.get<ApiResponse<InstructorsResponse>>(`/public/randomusers?page=${page}&limit=${limit}`);
        return response.data;
    }
};
