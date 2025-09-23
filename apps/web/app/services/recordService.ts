import apiClient from './apiClient';
import { HealthRecord } from '../types/record';

const getHealthRecords = async (): Promise<HealthRecord[]> => {
    return apiClient.get<HealthRecord[]>('document.records/health');
};

export const recordsService = {
    getHealthRecords,
};