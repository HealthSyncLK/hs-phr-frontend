'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
    Sidebar,
    SidebarHeader,
    SidebarNav,
    SidebarItem,
    SidebarCollapse,
    SidebarSubItem,
} from '@repo/ui/components/navigation/Sidebar';
import { Logo } from '@repo/ui/components/general/Logo';
import { IconName } from '@repo/ui/components/general/Icon';

// --- 2. DEFINE THE TYPE FOR A NAVIGATION ITEM ---
interface NavItem {
    href?: string;
    icon: IconName;
    label: string;
    subItems?: {
        href: string;
        label: string;
    }[];
}

// Define the structure of your navigation items
const navItems: NavItem[] = [
    { href: '/dashboard', icon: 'home', label: 'Home' },
    {
        icon: 'document',
        label: 'Records',
        subItems: [
            { href: '/records/health', label: 'Health Records' },
            { href: '/records/appointments', label: 'Appointments' },
            { href: '/records/insurance', label: 'Insurance' },
        ],
    },
    { href: '/dashboard/medication', icon: 'heart-rate', label: 'Medication' },
    { href: '/dashboard/family', icon: 'users', label: 'Family' },
];

export const AppSidebar = () => {
    const pathname = usePathname();

    return (
        <Sidebar className="w-[268px]">
            <SidebarHeader>
                <Logo />
            </SidebarHeader>
            <SidebarNav>
                {navItems.map((item) => {
                    if (item.subItems) {
                        // Check if any sub-item is active to make the parent active
                        const isParentActive = item.subItems.some(sub => pathname.startsWith(sub.href));
                        return (
                            <SidebarCollapse
                                key={item.label}
                                icon={item.icon}
                                title={item.label}
                                isActive={isParentActive}
                            >
                                {item.subItems.map((subItem) => (
                                    <SidebarSubItem
                                        key={subItem.label}
                                        href={subItem.href}
                                        isActive={pathname === subItem.href}
                                    >
                                        {subItem.label}
                                    </SidebarSubItem>
                                ))}
                            </SidebarCollapse>
                        );
                    }
                    return (
                        <SidebarItem
                            key={item.label}
                            href={item.href}
                            icon={item.icon}
                            isActive={pathname === item.href} //stylings needs to correct with this
                        >
                            {item.label}
                        </SidebarItem>
                    );
                })}
            </SidebarNav>
        </Sidebar>
    );
};
