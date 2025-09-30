import apiClient from './apiClient';

// The generic post method for file uploads
const upload = async <T>(endpointKey: string, formData: FormData): Promise<T> => {
  const url = apiClient.getUrl(endpointKey);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: formData, // multipart/form-data automatically set
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An API error occurred.');
  }
  return response.json();
};

const uploadDocument = async (formData: FormData): Promise<any> => {
  return upload('documents.upload', formData);
};

const uploadDocumentBatch = async (formData: FormData): Promise<any> => {
  return upload('documents.batch-upload', formData);
};

export const docService = {
  uploadDocument,
  uploadDocumentBatch
};