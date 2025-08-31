import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
    'bg-white rounded-xl p-5', // Base styles: background, border-radius, and padding
    {
        variants: {
            variant: {
                default: 'shadow-md', // Default card with a medium shadow
                outlined: 'border border-neutral-gray-100', // Outlined card with a border
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
    as?: React.ElementType;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, as, children, ...props }, ref) => {
        const Component = as || 'div';
        return (
            <Component
                className={cardVariants({ variant, className })}
                ref={ref}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

Card.displayName = 'Card';