
import { UserResume } from '@/api/client/types';
import { apiClient } from '@/lib/api';
import { getTokens } from '@/lib/auth/tokens';
// import { getUser } from '@/lib/auth';

export const getUserResume = async (): Promise<UserResume | null> => {
    try {
        const response = await apiClient.request<UserResume>('user/resume/', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getTokens().access}`,
            },
        });
        return response.data;
    } catch (error) {
        if ((error as { response?: { status: number } }).response?.status === 404) {
            return null;
        }
        throw new Error(error instanceof Error ? error.message : 'Failed to get resume');
    }
};

export const createResume = async (data: UserResume): Promise<UserResume> => {
    try {

        const response = await apiClient.request<UserResume>('user/resume/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getTokens().access}`,
            },
            body: data,
        });

        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to create resume');
    }
};


export const getResume = async (): Promise<UserResume | null> => {
    try {
        const response = await apiClient.request<UserResume>(`user/resume/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getTokens().access}`,
            },
        });
        return response.data;
    } catch (error) {
        if ((error as { response?: { status: number } }).response?.status === 404) {
            return null;
        }
        throw new Error(error instanceof Error ? error.message : 'Failed to get resume by id');
    }
};

export const getResumeById = async  (id: number): Promise<UserResume | null> => {
    try {
        const response = await apiClient.request<UserResume>(`user/resume/${id}/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getTokens().access}`,
            },
        });
        return response.data;
    } catch (error) {
        if ((error as { response?: { status: number } }).response?.status === 404) {
            return null;
        }
        throw new Error(error instanceof Error ? error.message : 'Failed to get resume by id');
    }
};

