import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser } from '@/api/auth/queries';
import { Login, Registration } from '@/api/post/types';

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
