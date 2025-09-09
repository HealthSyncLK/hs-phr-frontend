import apiClient from './apiClient';
import { User } from '../types/user';

const login = async (credentials: any): Promise<User> => {
  return apiClient.post<User>('/api/auth/login', credentials);
};

// --- ADD THIS FUNCTION ---
const getCurrentUser = async (): Promise<User> => {
  return apiClient.get<User>('/api/auth/me');
}

export const authService = {
  login,
  getCurrentUser, // Export the new function
};