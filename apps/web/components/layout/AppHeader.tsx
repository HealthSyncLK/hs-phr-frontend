'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
    Breadcrumbs,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@repo/ui/components/navigation/Breadcrumbs';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@repo/ui/components/navigation/DropdownMenu';
import { useAuth } from '../../providers/AuthProvider';
import { UserProfile } from '@repo/ui/components/composites/UserProfile';
import { CustomIcon } from '@repo/ui/components/general/CustomIcon';

// A simple helper to generate breadcrumbs from the pathname
const generateBreadcrumbs = (pathname: string) => {
    const pathSegments = pathname.split('/').filter(Boolean);

    // You can create a more sophisticated mapping here if needed
    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        const isLast = index === pathSegments.length - 1;
        return { href, label, isLast };
    });

    return breadcrumbs;
};


export const AppHeader = () => {
    const pathname = usePathname();
    const breadcrumbs = generateBreadcrumbs(pathname);
    const { user } = useAuth();

    return (
        <header className="flex h-[80px] items-center justify-between bg-white px-6 border-b border-neutral-200">
            <div>
                <Breadcrumbs>
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={crumb.href}>
                            <BreadcrumbItem>
                                {crumb.isLast ? (
                                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!crumb.isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                </Breadcrumbs>
                {/* You can also show the page title here */}
            </div>
            <div>
                {user && (
                    <UserProfile
                        userName={user.name || 'User'}
                        userFallback={user.name?.charAt(0) || 'U'}
                    >
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem>
                                <CustomIcon name="user" className="w-4 h-4 mr-2" />
                                <span>My Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CustomIcon name="settings" className="w-4 h-4 mr-2" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-danger-text focus:text-white focus:bg-danger">
                                <CustomIcon name="log-out" className="w-4 h-4 mr-2" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </UserProfile>
                )}
            </div>
        </header>
    )
}
