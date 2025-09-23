import React from 'react';

export interface FormControlProps {
    label?: string;
    error?: string;
    children: React.ReactNode;
    className?: string;
}

export const FormControl = ({ label, error, children, className }: FormControlProps) => {
    return (
        <div className={`font-[Poppins] flex flex-col gap-2 ${className}`}>
            {label && (
                <label className="text-base font-normal font-[Poppins] text-text-header">
                    {label}
                </label>
            )}
            {children}
            {error && <p className="text-sm text-danger-text">{error}</p>}
        </div>
    );
};