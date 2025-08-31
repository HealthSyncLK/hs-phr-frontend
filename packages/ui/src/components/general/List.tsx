import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

// List Component (the container)
export const List = React.forwardRef<
    HTMLUListElement,
    React.HTMLAttributes<HTMLUListElement>
>(({ className, children, ...props }, ref) => {
    return (
        <ul ref={ref} className={twMerge('flex flex-col', className)} {...props}>
            {children}
        </ul>
    );
});
List.displayName = 'List';


// ListItem Component (each row)
export const ListItem = React.forwardRef<
    HTMLLIElement,
    React.HTMLAttributes<HTMLLIElement>
>(({ className, children, ...props }, ref) => {
    return (
        <li
            ref={ref}
            className={twMerge(
                'flex items-center gap-4 py-3 border-b border-neutral-100 last:border-b-0',
                className
            )}
            {...props}
        >
            {children}
        </li>
    );
});
ListItem.displayName = 'ListItem';