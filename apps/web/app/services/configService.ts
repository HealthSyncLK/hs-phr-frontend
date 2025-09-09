const CONFIG_API_URL = `${process.env.NEXT_PUBLIC_CONFIG_API_BASE_URL}/api/config`;

const getConfig = async () => {
    const response = await fetch(CONFIG_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch application configuration.');
    }
    return await response.json();
};

export const configService = {
    getConfig,
};