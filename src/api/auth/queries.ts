import { Login, AuthResponse, Registration, HrRegistrationin } from '@/api/post/types';
import { apiClient } from '@/lib/api';

// Function to handle user login
export const loginUser = async (credentials: Login): Promise<AuthResponse> => {
    try {
        const response = await apiClient.request<AuthResponse>('user/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: credentials,
        });

        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
};
export const loginHr = async (credentials: Login): Promise<AuthResponse> => {
    try {
        const response = await apiClient.request<AuthResponse>('companies/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: credentials,
        });

        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
};

// Function to handle user registration
export const registerUser = async (credentials: Registration) => {
    try {
        const response = await apiClient.request('user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: credentials,
        });

        return await response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Registration failed');
    }
};
// Function to handle user registration
export const registerHr = async (credentials: HrRegistrationin) => {
    try {
        const response = await apiClient.request('companies/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: credentials,
        });

        return await response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Registration failed');
    }
};

// Function to refresh authentication tokens
export const refreshToken = async (refresh: string): Promise<AuthResponse> => {
    try {
        const response = await apiClient.request<AuthResponse>('user/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: refresh,
        });

        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Token refresh failed');
    }
};
