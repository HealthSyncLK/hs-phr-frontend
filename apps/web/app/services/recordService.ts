import apiClient from './apiClient';
import { HealthRecord } from '../types/record';

const getHealthRecords = async (): Promise<HealthRecord[]> => {
    return apiClient.get<HealthRecord[]>('document.records/health');
};

const addHealthRecord = async (data: Partial<HealthRecord>): Promise<HealthRecord> => {
    return apiClient.post<HealthRecord>('/api/records/health', data);
};

export const recordsService = {
    getHealthRecords,
    addHealthRecord,
};