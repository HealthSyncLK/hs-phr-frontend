import React from 'react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '../navigation/DropdownMenu';
import { twMerge } from 'tailwind-merge';
import { Typography } from '../general/Typography';
import { Icon } from '../general/Icon';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    countryCode: string;
    onCountryCodeChange: (code: string) => void;
    error?: boolean;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ className, countryCode, onCountryCodeChange, error, ...props }, ref) => {
        return (
            <div
                className={twMerge(
                    // The main container styles from Figma
                    'relative flex items-center h-12 w-full rounded-lg border bg-white transition-colors',
                    error
                        ? 'border-danger-text ring-1 ring-danger-text'
                        : 'border-neutral-gray-100 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary',
                    className
                )}
            >
                {/* Country Code Selector */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-2 px-4 h-full flex-shrink-0 focus:outline-none"
                            aria-label="Select country code"
                        >
                            <Typography className="font-normal text-base text-gray-800">{countryCode}</Typography>
                            <Icon name="chevron-down" className="w-5 h-5 text-gray-800" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => onCountryCodeChange('+94')}>
                            +94 (Sri Lanka)
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onCountryCodeChange('+1')}>
                            +1 (USA)
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onCountryCodeChange('+44')}>
                            +44 (UK)
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Vertical Divider Line */}
                <div className="w-px h-full bg-neutral-gray-100" />

                {/* The actual input field */}
                <input
                    ref={ref}
                    type="tel"
                    // This input is transparent and has no border or focus ring of its own.
                    // Padding is added to align the text/placeholder correctly.
                    className="w-full h-full bg-transparent border-none focus:outline-none focus:ring-0 pl-4 text-base text-text-header placeholder:text-text-light"
                    {...props}
                />
            </div>
        );
    }
);
PhoneInput.displayName = 'PhoneInput';