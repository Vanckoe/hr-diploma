import { Vacancy, GetVacancy, vacancy } from '@/api/hr/types';
import { UserResume } from '@/api/client/types';
import { apiClient } from '@/lib/api';
import { getTokens } from '@/lib/auth/tokens';
import { getUser } from '@/lib/auth';

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
        if ((error as any).response?.status === 404) {
            return null;
        }
        throw new Error(error instanceof Error ? error.message : 'Failed to get resume');
    }
};

export const createResume = async (data: UserResume): Promise<any> => {
    try {
        const { id } = await getUser();
        const resumeData = { ...data, pk: Number(id) };

        const response = await apiClient.request<any>('user/resume/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getTokens().access}`,
            },
            body: resumeData,
        });

        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to create resume');
    }
};
