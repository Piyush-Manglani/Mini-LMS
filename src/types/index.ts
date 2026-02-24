export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
    loginType: string;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    avatar?: {
        url: string;
        localPath: string;
        _id: string;
    };
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface Instructor {
    username?: string;
    name?: {
        first?: string;
        last?: string;
    };
    [key: string]: unknown;
}
