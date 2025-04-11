import { useMutation } from '@tanstack/react-query';
import { loginHr, loginUser, registerUser, registerHr } from '@/api/auth/queries';
import { Login, Registration, HrRegistrationin } from '@/api/post/types';

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: Login) => loginUser(data),
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: Registration) => registerUser(data),
    });
};

export const useHr = () => {
    return useMutation({
        mutationFn: (data: Login) => loginHr(data),
    });
};

export const useRegisterHr = () => {
    return useMutation({
        mutationFn: (data: HrRegistrationin) => registerHr(data),
    });
};
