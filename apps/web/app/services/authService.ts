import apiClient from './apiClient';
import { User } from '../types/user';
import { SignupRequest } from '../types/signupRequest';

const login = async (data: { username: string; password: string, rememberMe: boolean }): Promise<{ session_id: string }> => {
  return apiClient.post('auth.login', data);
};

const verifyContact = async (data: { contact: string; type: 'email' | 'sms' }): Promise<{ session_id: string }> => {
  return apiClient.post('auth.verify-contact', data);
};

const verifyLoginOtp = async (data: { otp: string; session_id: string }): Promise<{ user: User }> => {
  return apiClient.post('auth.verify-login-otp', data);
};

const verifySignupOtp = async (data: { otp: string; session_id: string }): Promise<{ user: User }> => {
  return apiClient.post('auth.verify-otp', data);
};

const signup = async (data: SignupRequest): Promise<{ user: User }> => {
  return apiClient.post('auth.complete-signup', data);
};

const getCurrentUser = async (): Promise<User> => {
  return apiClient.get<User>('auth.me');
};

export const authService = {
  login,
  verifyContact,
  verifyLoginOtp,
  getCurrentUser,
  signup,
  verifySignupOtp
};