import { api } from '../index';
import { LoginRequest, LoginResponse } from '../../types/api.types';
import { ENDPOINTS } from '../Endpoints';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(ENDPOINTS.LOGIN, data);
  return response.data;
};
