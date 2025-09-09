'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { configService } from '../app/services/configService';
import { AppConfig } from '../app/types/config';
import apiClient from '../app/services/apiClient';

interface ConfigContextType {
    config: AppConfig | null;
    isLoading: boolean;
    error: any
}
const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [config, setConfig] = useState<AppConfig | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAndInitialize = async () => {
            try {
                const configData = await configService.getConfig();
                setConfig(configData);
                apiClient.init(configData);
            } catch (error) {
                console.error('Configuration Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndInitialize();
    }, []);

    return (
        <ConfigContext.Provider value={{ config, isLoading, error: null }}>
            {children}
        </ConfigContext.Provider>
    );
};


export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};