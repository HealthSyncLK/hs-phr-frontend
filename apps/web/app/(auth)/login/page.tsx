'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { createLoginSchema } from '../../../lib/schemas';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { useConfig } from '../../../providers/ConfigProvider';
import { useAuth } from '../../../providers/AuthProvider';
import { authService } from '../../services/authService';

export default function LoginPage() {
    const router = useRouter();
    const { config, isLoading: isConfigLoading } = useConfig();
    const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

    // NEW: This useEffect handles redirecting already-authenticated users.
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    const loginSchema = useMemo(() => {
        if (config?.validation) {
            return createLoginSchema(config.validation);
        }
        return null;
    }, [config]);

    type LoginFormValues = z.infer<typeof loginSchema & object>;

    const methods = useForm<LoginFormValues>({
        resolver: loginSchema ? zodResolver(loginSchema) : undefined,
        mode: 'onChange',
        defaultValues: {
            loginMethod: 'mobile',
            phone: '',
            email: '',
            password: '',
        },
    });

    useEffect(() => {
        const currentPassword = methods.getValues('password') || '';
        if (loginMethod === 'mobile') {
            methods.reset({ loginMethod: 'mobile', phone: '', password: currentPassword });
        } else {
            methods.reset({ loginMethod: 'email', email: '', password: currentPassword });
        }
    }, [loginMethod, methods]);

    const onSubmit = async (data: any) => {
        try {
            await authService.login(data);
            router.push('/dashboard');
        } catch (error: any) {
            methods.setError('root.serverError', { type: 'manual', message: error.message });
        }
    };

    // Show a loading state while checking auth or fetching config.
    if (isAuthLoading || isConfigLoading || !config || !loginSchema) {
        return <div>Loading...</div>; // Or a proper loading skeleton component
    }

    // If the user is definitely not authenticated, render the form.
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                {methods.formState.errors.root?.serverError && (
                    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                        {methods.formState.errors.root.serverError.message}
                    </div>
                )}
                <LoginScreen loginMethod={loginMethod} setLoginMethod={setLoginMethod} />
            </form>
        </FormProvider>
    );
}

