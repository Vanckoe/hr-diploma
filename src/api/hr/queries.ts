import { Vacancy, vacancy } from '@/api/hr/types';
import { apiClient } from '@/lib/api';
import { getHrTokens } from '@/lib/auth/tokens';

// Function to handle HR vacancy creation
export const createVacancy = async (credentials: Vacancy): Promise<any> => {
    try {
        const response = await apiClient.request<any>('companies/vacancies/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getHrTokens().access}`,
            },
            body: credentials,
        });

        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to create vacancy');
    }
};
