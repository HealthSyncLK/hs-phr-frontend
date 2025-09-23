import React from 'react';
import { CheckIcon } from '../../icons/CheckIcon';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, ...props }, ref) => {
        return (
            <label
                className={`inline-flex items-center gap-[9px] cursor-pointer ${props.disabled ? 'cursor-not-allowed opacity-60' : ''
                    } ${className}`}
            >
                <input type="checkbox" className="sr-only peer" ref={ref} {...props} />

                {/* Custom Checkbox Box - Sized to your 21x21px spec */}
                <div
                    className="relative flex items-center justify-center w-[21px] h-[21px] bg-white border-2 rounded-[4px] border-neutral-gray-100 
                     transition-colors peer-checked:bg-primary peer-checked:border-primary"
                >
                    {/* Checkmark CustomIcon - Now uses hidden/block for visibility */}
                    <CheckIcon className="w-3 h-3 text-white peer-checked:block" />
                </div>

                {/* Label Text */}
                <span className="text-base font-normal select-none text-text-header">
                    {label}
                </span>
            </label>
        );
    }
);

Checkbox.displayName = 'Checkbox';