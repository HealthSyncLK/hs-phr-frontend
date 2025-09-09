import { AppConfig } from '../types/config';

let _config: AppConfig | null = null;

/**
 * Initializes the API client with the application's runtime configuration.
 * This must be called once when the application loads.
 * @param config The application configuration object.
 */
const init = (config: AppConfig) => {
    _config = config;
    console.log('API Client Initialized');
};

const getUrl = (endpointKey: string): string => {
    if (!_config) {
        throw new Error('ApiClient has not been initialized. Call apiClient.init(config) first.');
    }

    const [serviceName, ...pathParts] = endpointKey.split('.');
    const path = pathParts.join('/');

    // --- THIS IS THE FIX ---
    // We ensure serviceName is a valid string before using it as an index.
    if (!serviceName) {
        throw new Error(`Invalid endpoint key provided: ${endpointKey}`);
    }

    const serviceUrl = (_config.endpoints.services as Record<string, string>)[serviceName];
    const baseUrl = serviceUrl || _config.endpoints.defaultApiBaseUrl;

    return `${baseUrl}/${path}`;
};


const post = async <T>(endpointKey: string, body: any): Promise<T> => {
    const url = getUrl(endpointKey);
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An API error occurred.');
    }
    return response.json();
};

const get = async <T>(endpointKey: string): Promise<T> => {
    const url = getUrl(endpointKey);
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        try {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An API error occurred.');
        } catch (e) {
            throw new Error(`API error: ${response.statusText}`);
        }
    }
    return response.json();
};

// Export a single apiClient object with an init method
const apiClient = {
    init,
    get,
    post,
};

export default apiClient;