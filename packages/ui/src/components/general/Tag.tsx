import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const tagVariants = cva(
    'inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full',
    {
        variants: {
            variant: {
                default: 'bg-tag-default-bg text-tag-default-text',
                success: 'bg-tag-success-bg text-tag-success-text',
                warning: 'bg-tag-warning-bg text-tag-warning-text',
                danger: 'bg-danger text-danger-text',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface TagProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> { }

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <span
                className={tagVariants({ variant, className })}
                ref={ref}
                {...props}
            />
        );
    }
);

Tag.displayName = 'Tag';