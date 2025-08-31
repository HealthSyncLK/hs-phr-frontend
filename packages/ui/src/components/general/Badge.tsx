import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
    // Base styles
    'inline-flex items-center justify-center rounded-full font-semibold',
    {
        variants: {
            variant: {
                dot: 'h-2.5 w-2.5 p-0',
                count: 'h-6 min-w-[24px] px-1.5 text-xs',
            },
        },
        defaultVariants: {
            variant: 'dot',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
    count?: number;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant, count, ...props }, ref) => {
        return (
            <span
                className={badgeVariants({
                    variant,
                    className: `bg-notification text-white ${className}`,
                })}
                ref={ref}
                {...props}
            >
                {variant === 'count' ? count : null}
            </span>
        );
    }
);

Badge.displayName = 'Badge';