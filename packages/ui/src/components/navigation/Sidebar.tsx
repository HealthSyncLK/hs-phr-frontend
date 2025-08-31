import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon, IconName } from '../general/Icon';

// --- Sidebar Container ---
export const Sidebar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
    ({ className, children, ...props }, ref) => (
        <aside
            ref={ref}
            className={twMerge('font-[Poppins] flex flex-col h-screen bg-white', className)}
            {...props}
        >
            {children}
        </aside>
    )
);
Sidebar.displayName = 'Sidebar';

// --- Sidebar Header (for the Logo) ---
export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => (
        <div ref={ref} className={twMerge('px-6 py-5 flex items-center justify-center h-[89px]', className)} {...props}>
            {children}
        </div>
    )
);
SidebarHeader.displayName = 'SidebarHeader';

// --- Sidebar Navigation List ---
export const SidebarNav = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
    ({ className, children, ...props }, ref) => (
        <ul ref={ref} className={twMerge('flex flex-col gap-1 px-3', className)} {...props}>
            {children}
        </ul>
    )
);
SidebarNav.displayName = 'SidebarNav';


// --- Standard Sidebar Item (Updated) ---
export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    icon: IconName;
    isActive?: boolean;
}

export const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(
    ({ className, icon, children, isActive, ...props }, ref) => (
        // The `li` is the positioning parent for the indicator
        <li className="relative">
            {isActive && <div className="left-[-12px] top-1/2 -translate-y-1/2 h-[56px] w-[7px] rounded-l-xl bg-primary" />}
            <a
                ref={ref}
                className={twMerge(
                    'flex w-full items-center gap-2 rounded-xl py-3 text-sm font-medium transition-colors',
                    isActive ? 'bg-primary-50 px-4' : 'hover:bg-neutral-50 px-4',
                    className
                )}
                {...props}
            >
                <Icon name={icon} className="h-5 w-5 flex-shrink-0 text-gray-700" />
                <span className="flex-grow text-text-header font-normal text-[14px]">{children}</span>
            </a>
        </li>
    )
);
SidebarItem.displayName = 'SidebarItem';


// --- Collapsible Sidebar Item (Updated) ---
interface SidebarCollapseProps {
    icon: IconName;
    title: string;
    children: React.ReactElement<SidebarSubItemProps>[];
    isActive?: boolean;
}

export const SidebarCollapse = ({ icon, title, children, isActive }: SidebarCollapseProps) => {
    const [isOpen, setIsOpen] = useState(isActive);
    const totalChildren = React.Children.count(children);

    return (
        <li>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={twMerge(
                    'relative flex w-full items-center gap-2 rounded-xl py-3 text-sm font-medium transition-colors',
                    isActive ? 'bg-primary-50 pt-0 pb-0 pl-0 pr-2' : 'hover:bg-neutral-50 px-4'
                )}
            >
                {isActive && <div className="left-1 h-[40px] w-[6px] rounded-l-xl bg-primary" />}
                <Icon name={icon} className="h-5 w-5 flex-shrink-0 text-gray-700" />
                <span className="font- flex-grow text-left text-text-header font-normal text-[14px]">{title}</span>
                <Icon name="chevron-down" className={`h-4 w-4 text-text-header transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {/* STYLE CHANGE: Removed padding from the UL. Padding is now handled by each sub-item. */}
            {isOpen && (
                <ul className="mt-2 flex flex-col">
                    {React.Children.map(children, (child, index) =>
                        React.cloneElement(child, {
                            isFirst: index === 0,
                            isLast: index === totalChildren - 1,
                        })
                    )}
                </ul>
            )}
        </li>
    );
};


// --- Sub-Item for Collapsible Section (Updated) ---
interface SidebarSubItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    isActive?: boolean;
    isFirst?: boolean;
    isLast?: boolean;
}

export const SidebarSubItem = React.forwardRef<HTMLAnchorElement, SidebarSubItemProps>(
    ({ className, children, isActive, isFirst, isLast, ...props }, ref) => (
        <li className="relative">
            {/* The connector line, now positioned correctly */}
            <div
                className={twMerge(
                    'absolute left-[26px] w-px bg-neutral-200', // Aligns with the center of the icon above
                    isFirst ? 'top-1/2 h-1/2' : '',
                    isLast ? 'h-1/2' : '',
                    !isFirst && !isLast ? 'h-full' : ''
                )}
            />
            <a
                ref={ref}
                className={twMerge(
                    'relative flex w-full items-center py-2.5',
                    isActive ? 'text-primary' : 'text-text-header hover:text-primary',
                    className
                )}
                {...props}
            >
                {/* The dot, now positioned correctly */}
                <div className="absolute left-[20px] top-1/2 -translate-y-1/2 h-3.5 w-3.5 flex items-center justify-center bg-white">
                    <div
                        className={twMerge(
                            'h-2 w-2 rounded-full',
                            isActive ? 'bg-primary ring-2 ring-primary' : 'bg-neutral-200'
                        )}
                    />
                </div>
                {/* The text, now with its own padding to create the gap */}
                <span className="pl-12 text-sm font-normal">{children}</span>
            </a>
        </li>
    )
);
SidebarSubItem.displayName = 'SidebarSubItem';