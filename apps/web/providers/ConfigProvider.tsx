'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the shape of your entire configuration
interface AppConfig {
    endpoints: {
        apiBaseUrl: string;
    };
    ui: {
        signupForm: any;
        loginForm: any;
    };
    validation: any; // Add the validation property
}

interface ConfigContextType {
    config: AppConfig | null;
    isLoading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [config, setConfig] = useState<AppConfig | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                // We now use the environment variable. A fallback is included for safety.
                const configApiUrl = `${process.env.NEXT_PUBLIC_CONFIG_API_BASE_URL}/config`;
                const response = await fetch(configApiUrl);
                if (!response.ok) throw new Error('Failed to fetch config');
                const data = await response.json();
                setConfig(data);
            } catch (error) {
                console.error('Configuration Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConfig();
    }, []);

    return (
        <ConfigContext.Provider value={{ config, isLoading }}>
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