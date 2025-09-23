import { AppConfig } from '../types/config';

// A private, module-level variable to hold the loaded configuration.
let _config: AppConfig | null = null;

/**
 * Initializes the API client with the application's runtime configuration.
 * This MUST be called once, typically in the ConfigProvider after fetching the config.
 * @param config The application configuration object.
 */
const init = (config: AppConfig) => {
    if (_config) {
        console.warn('API Client has already been initialized.');
        return;
    }
    _config = config;
    console.log('API Client Initialized Successfully');
};

/**
 * Constructs the full URL for an API endpoint using the loaded configuration.
 * @param endpointKey A key like 'auth.login' or 'documents.getAll'
 */
const getUrl = (endpointKey: string): string => {
    if (!_config) {
        throw new Error('API Client has not been initialized. Call apiClient.init(config) first.');
    }

    const [serviceName, ...pathParts] = endpointKey.split('.');
    const path = pathParts.join('/');

    if (!serviceName) {
        throw new Error(`Invalid endpoint key provided: ${endpointKey}`);
    }

    const services = _config.endpoints.services as Record<string, string>;
    const serviceUrl = services[serviceName];

    // Use the specific service URL if it exists, otherwise fall back to the default.
    const baseUrl = serviceUrl || _config.endpoints.defaultApiBaseUrl;

    return `${baseUrl}/${path}`;
};

// The generic post method, now using getUrl
const post = async <T>(endpointKey: string, body: any): Promise<T> => {
    const url = getUrl(endpointKey);
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Sends cookies
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An API error occurred.');
    }
    return response.json();
};

// The generic get method, now using getUrl
const get = async <T>(endpointKey: string): Promise<T> => {
    const url = getUrl(endpointKey);
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Sends cookies
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

const apiClient = {
    init,
    getUrl,
    get,
    post
};

export default apiClient;