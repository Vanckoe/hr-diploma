import { useMutation } from '@tanstack/react-query';

import { UserResume } from './types';
import { createResume } from './queries';

export const useResume = () => {
    return useMutation({
        mutationFn: (data: UserResume) => createResume(data),
    });
};