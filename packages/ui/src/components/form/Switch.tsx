import React from 'react';

export interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    label?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
    ({ className, checked, onCheckedChange, label, disabled, ...props }, ref) => {
        return (
            <label
                className={`inline-flex items-center gap-3 cursor-pointer ${disabled ? 'cursor-not-allowed opacity-60' : ''
                    } ${className}`}
            >
                {label && (
                    <span className="text-base font-normal select-none text-text-header">
                        {label}
                    </span>
                )}
                <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    disabled={disabled}
                    onClick={() => onCheckedChange(!checked)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${checked ? 'bg-primary' : 'bg-neutral-200'
                        }`}
                    ref={ref}
                    {...props}
                >
                    {/* Thumb */}
                    <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'
                            }`}
                    />
                </button>
            </label>
        );
    }
);

Switch.displayName = 'Switch';