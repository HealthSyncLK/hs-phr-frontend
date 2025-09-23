'use client';
import { DecorativeImage } from '@repo/ui/components/app/DecorativeImage';
import { Logo } from '@repo/ui/components/general/Logo';
import React from 'react';
import { useAuthImage } from '../../providers/AuthImageProvider';

// This layout will wrap all pages inside the (auth) route group.
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    
    const { currentImage, currentCornerImage } = useAuthImage();

    return (
        <main className="flex min-h-screen w-full">
            {/* Left Panel: Decorative Image */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-2/3 items-center justify-center p-8 bg-neutral-100 relative">
                {/* Decorative Image: Center in viewport even right panel scrollable*/}
                <div className="fixed top-0 left-0 lg:w-1/2 xl:w-2/3 h-screen flex items-center justify-center p-8 bg-neutral-100">
                    <div className="max-w-md xl:max-w-2xl text-center">
                        <div className="absolute inset-y-4 left-4 w-1/2 bg-dark-blue rounded-xl"></div>
                        <div className="w-full text-center relative z-20">
                            <DecorativeImage 
                                src={currentImage} 
                                cornerSrc={currentCornerImage} 
                                className="mx-auto"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Form Content */}
            <div className="w-full lg:w-1/2 xl:w-1/3 flex items-center justify-center p-8">
                <div className="absolute top-0 right-0 p-2 m-2">
                    <Logo src="/assets/logo.png"/>
                </div>
                {children}
            </div>
        </main>
    );
}
