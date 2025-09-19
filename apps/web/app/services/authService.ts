import apiClient from './apiClient';
import { User } from '../types/user';
import { SignupRequest } from '../types/signupRequest';

const login = async (data: { username: string; password: string, rememberMe: boolean }): Promise<{ session_id: string }> => {
  return apiClient.post('auth.login', data);
};

const verifyContact = async (data: { contact: string; type: 'email' | 'mobile' }): Promise<{ session_id: string }> => {
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

// TODO - refactor after API verification NIC upload 
interface NicUploadData {
  patientId: string;
  frontImage: File;
  backImage: File;
  metadata?: {
    uploadSource?: string;
    timestamp?: string;
    [key: string]: any;
  };
}

interface NicUploadResponse {
  success: boolean;
  data: {
    front: {
      documentId: string;
      blobPath: string;
      fileName: string;
      fileSize: number;
      documentType: string;
      uploadedAt: string;
    };
    back: {
      documentId: string;
      blobPath: string;
      fileName: string;
      fileSize: number;
      documentType: string;
      uploadedAt: string;
    };
  };
}

const uploadNicDocument = async (uploadData: NicUploadData): Promise<NicUploadResponse> => {
      console.log(uploadData, 'UPLOADING....');

  try {
    // Upload front image
    const frontFormData = new FormData();
    frontFormData.append('file', uploadData.frontImage);
    frontFormData.append('patientId', uploadData.patientId);
    frontFormData.append('documentType', 'identification');
    
    if (uploadData.metadata) {
      frontFormData.append('metadata', JSON.stringify({
        ...uploadData.metadata,
        side: 'front'
      }));
    } else {
      frontFormData.append('metadata', JSON.stringify({ side: 'front' }));
    }

    // Upload back image
    const backFormData = new FormData();
    backFormData.append('file', uploadData.backImage);
    backFormData.append('patientId', uploadData.patientId);
    backFormData.append('documentType', 'identification');
    
    if (uploadData.metadata) {
      backFormData.append('metadata', JSON.stringify({
        ...uploadData.metadata,
        side: 'back'
      }));
    } else {
      backFormData.append('metadata', JSON.stringify({ side: 'back' }));
    }

    console.log(frontFormData,backFormData);

    // Upload both images concurrently
    const [frontResponse, backResponse] = await Promise.all([
      apiClient.postFormData('documents.upload', frontFormData),
      apiClient.postFormData('documents.upload', backFormData)
    ]);

    // Type assertion for responses
    const frontRes = frontResponse as { data: NicUploadResponse['data']['front'] };
    const backRes = backResponse as { data: NicUploadResponse['data']['back'] };

    return {
      success: true,
      data: {
        front: frontRes.data,
        back: backRes.data
      }
    };

  } catch (error: any) {
    console.error('NIC document upload failed:', error);
    throw new Error(error.message || 'Failed to upload NIC documents');
  }
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
  verifySignupOtp,
  uploadNicDocument,
};