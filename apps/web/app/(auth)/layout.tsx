import React from 'react';
import { ConfigProvider } from '../../providers/ConfigProvider';

// This layout will wrap all pages inside the (auth) route group.
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex min-h-screen w-full">
            {/* Left Panel: Decorative Image */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-2/3 items-center justify-center p-8 bg-neutral-100">
                {/* You can place your decorative image or illustration here */}
                {/* For example: <img src="/auth-illustration.png" alt="Health illustration" /> */}
                <div className="max-w-md text-center">
                    <h1 className="text-4xl font-bold text-text-header">HealthSync</h1>
                    <p className="mt-4 text-text-light">Your personal health record, simplified and secured.</p>
                </div>
            </div>

            {/* Right Panel: Form Content */}
            <div className="w-full lg:w-1/2 xl:w-1/3 flex items-center justify-center p-8">
                <ConfigProvider>
                    {children}
                </ConfigProvider>
            </div>
        </main>
    );
}