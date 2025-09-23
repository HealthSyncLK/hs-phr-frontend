// This interface defines the exact shape of the configuration
// object that we expect from our API.
export interface AppConfig {
    endpoints: {
        defaultApiBaseUrl: string;
        services: any;
    };
    ui: {
        signupForm: any;
        loginForm: any;
        recordDetailForm: any
    };
    validation: any;
}