/* eslint-disable @typescript-eslint/no-unused-vars */
import { Vacancy, GetVacancy, vacancy } from '@/api/hr/types';
import { apiClient } from '@/lib/api';
import { getHrTokens } from '@/lib/auth/tokens';

// Function to handle HR vacancy creation
export const createVacancy = async (credentials: Vacancy): Promise<Vacancy> => {
    try {
        const response = await apiClient.request<Vacancy>('companies/vacancies/', {
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

// Function to update HR vacancy by ID
export const updateVacancy = async (
    id: number,
    updates: Partial<GetVacancy>,
): Promise<GetVacancy> => {
    try {
        const response = await apiClient.request<GetVacancy>(`companies/vacancies/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getHrTokens().access}`,
            },
            body: updates,
        });

        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to update vacancy');
    }
};

// Function to get HR vacancies
export const getVacancies = async (): Promise<GetVacancy[]> => {
    try {
        const response = await apiClient.request<GetVacancy[]>('companies/vacancies/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getHrTokens().access}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to get vacancies');
    }
};

export const getVacanciesById = async (id: number): Promise<GetVacancy> => {
    try {
        const response = await apiClient.request<GetVacancy>(`companies/vacancies/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to get vacancy');
    }
};
