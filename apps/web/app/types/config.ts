// This interface defines the exact shape of the configuration
// object that we expect from our API.
export interface AppConfig {
    endpoints: {
        defaultApiBaseUrl: string;
        services: any;
    };
    ui: {
        loginForm: any;
        initialSignupForm: any;
        otpForm: any;
        signupForm: any;
        identificationForm: any;
        consentForm: any;
        recordDetailForm: any
        addDocumentForm: any
    };
    validation: any;
}