import apiClient from './apiClient';
import { User } from '../types/user';

const login = async (data: { username: string; password: string, rememberMe: boolean }): Promise<{ session_id: string }> => {
  return apiClient.post('auth.login', data);
};

const verifyContact = async (data: { contact: string; type: 'email' | 'mobile' }): Promise<{ session_id: string }> => {
  return apiClient.post('auth.verify-contact', data);
};

const verifyLoginOtp = async (data: { otp: string; session_id: string }): Promise<{ user: User }> => {
  return apiClient.post('auth.verify-login-otp', data);
};

const getCurrentUser = async (): Promise<User> => {
  return apiClient.get<User>('auth.me');
};

export const authService = {
  login,
  verifyContact,
  verifyLoginOtp,
  getCurrentUser,
};