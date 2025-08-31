import React, { useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
    'w-[54px] h-12 text-center text-base font-normal bg-white border rounded-lg text-text-header placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
    {
        variants: {
            hasError: {
                true: 'border-danger-text focus:border-danger-text focus:ring-danger-text',
                false: 'border-neutral-gray-100 focus:border-primary focus:ring-primary',
            },
        },
        defaultVariants: {
            hasError: false,
        },
    }
);

export interface OtpInputProps extends VariantProps<typeof inputVariants> {
    value: string;
    onChange: (value: string) => void;
    numInputs?: number;
    className?: string;
}

export const OtpInput = ({
    value,
    onChange,
    numInputs = 6,
    hasError,
    className,
}: OtpInputProps) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const { value: inputValue } = e.target;
        if (!/^[0-9]$/.test(inputValue)) {
            return;
        }
        const newValue =
            value.substring(0, index) + inputValue + value.substring(index + 1);
        onChange(newValue);
        if (index < numInputs - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === 'Backspace') {
            if (!value[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
            const newValue = value.substring(0, index) + value.substring(index + 1);
            onChange(newValue);
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData
            .getData('text')
            .slice(0, numInputs)
            .replace(/[^0-9]/g, '');
        if (pastedData) {
            onChange(pastedData);
            const lastFocusIndex = Math.min(pastedData.length, numInputs - 1);
            inputRefs.current[lastFocusIndex]?.focus();
        }
    };

    return (
        <div className={`flex flex-row gap-6 ${className}`}>
            {[...Array(numInputs)].map((_, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    placeholder="-" // <-- THIS LINE WAS ADDED
                    value={value[index] || ''}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className={inputVariants({ hasError })}
                />
            ))}
        </div>
    );
};