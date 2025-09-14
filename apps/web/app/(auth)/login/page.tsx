'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../providers/AuthProvider';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { authService } from '../../services/authService';
import { OtpScreen } from '../../../components/auth/OtpScreen';
import { useConfig } from '../../../providers/ConfigProvider';
import { createLoginSchema } from '../../../lib/schemas';

// Define the different steps in the login flow
type LoginStep = 'details' | 'otp' | 'success';

// Define the validation schema for the OTP step
const otpSchema = z.object({
    otp: z.string().min(6, 'Please enter the 6-digit code.'),
});

type OtpFormValues = z.infer<typeof otpSchema>;


export default function LoginPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading: isAuthLoading, mutate } = useAuth();
    const { config, isLoading: isConfigLoading } = useConfig();


    // State to manage which step of the login flow is active
    const [step, setStep] = useState<LoginStep>('details');
    // State to manage the active login tab (email or mobile)
    const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
    // State to store the session ID and contact info for the OTP step
    const [loginDetails, setLoginDetails] = useState({ contact: '', session_id: '' });

    const loginSchema = useMemo(() => {
        if (config?.validation) {
            return createLoginSchema(config.validation);
        }
        return null;
    }, [config]);

    // Define form values for the details step
    type DetailsFormValues = z.infer<typeof loginSchema & object>;


    // Create separate form instances for each step
    const detailsMethods = useForm<DetailsFormValues>({
        resolver: loginSchema ? zodResolver(loginSchema) : undefined,
        mode: 'onChange',
        defaultValues: {
            loginMethod: 'mobile',
            phone: '',
            email: '',
            password: ''
        },
    });

    const otpMethods = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        mode: 'onChange',
    });

    useEffect(() => {
        const currentPassword = detailsMethods.getValues('password') || '';
        if (loginMethod === 'mobile') {
            detailsMethods.reset({ loginMethod: 'mobile', phone: '', password: currentPassword });
        } else {
            detailsMethods.reset({ loginMethod: 'email', email: '', password: currentPassword });
        }
    }, [loginMethod, detailsMethods]);

    // This useEffect handles redirecting users who are already logged in
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);


    // Handler for the first step (submitting email/phone)
    const handleDetailsSubmit = async (data: { username: string; password: string, rememberMe: boolean }) => {
        try {
            const response = await authService.login(data);
            // On success, save the contact info and session_id, then move to the OTP step
            setLoginDetails({ contact: data.username, session_id: response.session_id });
            setStep('otp');
        } catch (error: any) {
            detailsMethods.setError('root.serverError', { type: 'manual', message: error.message });
        }
    };

    // Wrapper function to pass the correct contact info based on the selected tab
    const onDetailsSubmit = (data: DetailsFormValues) => {
        const contact = loginMethod === 'email' ? data.email : data.phone;
        // Add this check
        if (!contact) {
            console.error("Validation passed but contact field is missing.");
            return;
        }

        handleDetailsSubmit({ username: contact, password: data.password, rememberMe: false });
    };


    // Handler for the second step (submitting OTP)
    const handleOtpSubmit = async (data: OtpFormValues) => {
        try {
            await authService.verifyLoginOtp({ ...data, session_id: loginDetails.session_id });
            // On successful OTP verification, trigger a re-fetch of the user's session.
            // The auth hook's useEffect will then handle the redirect to the dashboard.
            await mutate();
            router.push('/dashboard');
        } catch (error: any) {
            otpMethods.setError('root.serverError', { type: 'manual', message: error.message });
        }
    };

    if (isAuthLoading) {
        return <div>Loading...</div>; // Or a proper loading skeleton
    }

    // Conditionally render the correct component based on the current step
    return (
        <>
            {step === 'details' && (
                <FormProvider {...detailsMethods}>
                    {/* Use the new wrapper for submission */}
                    <form onSubmit={detailsMethods.handleSubmit(onDetailsSubmit)} noValidate>
                        {detailsMethods.formState.errors.root?.serverError && (
                            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                                {detailsMethods.formState.errors.root.serverError.message as string}
                            </div>
                        )}
                        {/* Pass tab state management props to the LoginScreen component */}
                        <LoginScreen loginMethod={loginMethod} setLoginMethod={setLoginMethod} />
                    </form>
                </FormProvider>
            )}

            {step === 'otp' && (
                <FormProvider {...otpMethods}>
                    <form onSubmit={otpMethods.handleSubmit(handleOtpSubmit)} noValidate>
                        {otpMethods.formState.errors.root?.serverError && (
                            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                                {otpMethods.formState.errors.root.serverError.message as string}
                            </div>
                        )}
                        <OtpScreen contact={loginDetails.contact} />
                    </form>
                </FormProvider>
            )}
        </>
    );
}