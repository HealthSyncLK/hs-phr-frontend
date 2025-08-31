import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const textareaVariants = cva(
    'flex w-full rounded-lg border border-neutral-gray-100 bg-white px-4 py-3 text-base ring-offset-white placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]',
    {
        variants: {
            hasError: {
                true: 'border-danger-text focus:ring-danger-text',
                false: 'focus:ring-primary',
            },
        },
        defaultVariants: {
            hasError: false,
        },
    }
);

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> { }

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, hasError, ...props }, ref) => {
        return (
            <textarea
                className={textareaVariants({ hasError, className })}
                ref={ref}
                {...props}
            />
        );
    }
);

Textarea.displayName = 'Textarea';