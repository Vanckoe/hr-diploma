import { useMutation } from '@tanstack/react-query';
import { vacancy, Vacancy } from './types';
import { createVacancy } from './queries';

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: Vacancy) => createVacancy(data),
    });
};