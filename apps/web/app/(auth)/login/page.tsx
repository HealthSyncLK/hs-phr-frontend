'use client';

import React, { useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { createLoginSchema } from '../../../lib/schemas';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { useConfig } from '../../../providers/ConfigProvider';

export default function LoginPage() {
    const router = useRouter();
    const { config, isLoading } = useConfig();

    // Create the schema dynamically once the config is loaded
    const loginSchema = useMemo(() => {
        if (config?.validation) {
            return createLoginSchema(config.validation);
        }
        // Return a base schema or undefined while loading
        return z.object({});
    }, [config]);

    type LoginFormValues = z.infer<typeof loginSchema>;

    const methods = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Invalid credentials');
            }

            // On successful login, redirect to the dashboard
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Login failed:', error.message);
            methods.setError('root.serverError', {
                type: 'manual',
                message: error.message,
            });
        }
    };

    // Show a loading state until the configuration is fetched
    if (isLoading || !config) {
        return <div>Loading...</div>; // Or a proper loading skeleton
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                {/* ... (error display and LoginScreen remain the same) */}
                <LoginScreen />
            </form>
        </FormProvider>
    );
}