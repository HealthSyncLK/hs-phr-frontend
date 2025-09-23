'use client';

import React from 'react';
import { ConfigProvider } from './ConfigProvider';
import { AuthProvider } from './AuthProvider';
import { AuthImageProvider } from './AuthImageProvider';

// This component will wrap all of our client-side context providers.
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ConfigProvider>
            <AuthProvider>
                <AuthImageProvider>
                    {children}
                </AuthImageProvider>
            </AuthProvider>
        </ConfigProvider>
    );
}
