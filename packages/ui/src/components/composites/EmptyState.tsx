import React from 'react';
import { Typography } from '../general/Typography';

export interface EmptyStateProps {
    illustrationSrc: string; // Changed to accept a string for the image source
    title: string;
    description: string;
    action: React.ReactNode;
    className?: string;
}

export const EmptyState = ({
    illustrationSrc,
    title,
    description,
    action,
    className,
}: EmptyStateProps) => {
    return (
        <div
            className={`flex flex-col items-center justify-center text-center p-8 gap-4 ${className}`}
        >
            <div className="opacity-60">
                <img src={illustrationSrc} alt="No records illustration" className="max-w-[170px] h-auto" />
            </div>
            <div className="flex flex-col gap-3">
                <Typography variant="h3" className="font-semibold text-text-header">
                    {title}
                </Typography>
                <Typography variant="body2" className="max-w-xs mx-auto text-text-light leading-[18px]">
                    {description}
                </Typography>
            </div>
            <div className="mt-2">{action}</div>
        </div>
    );
};