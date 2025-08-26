import { useMutation } from '@tanstack/react-query';
import { login } from '../api/services/auth.service';
import { LoginRequest, LoginResponse } from '../types/api.types';

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: data => login(data),
  });
};
