import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../navigation/DropdownMenu';
import { Avatar } from '../general/Avatar';
import { Typography } from '../general/Typography';
import { Icon } from '../general/Icon';

export interface UserProfileProps {
    userName: string;
    userImageSrc?: string;
    userFallback: string;
    children: React.ReactNode; // This will be the DropdownMenuContent
    className?: string;
}

export const UserProfile = ({
    userName,
    userImageSrc,
    userFallback,
    children,
    className,
}: UserProfileProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                className={`focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg ${className}`}
            >
                <button className="flex items-center gap-2">
                    <Avatar src={userImageSrc} fallback={userFallback} className="w-11 h-11" />
                    <div className="text-left">
                        <Typography variant="body1" className="font-medium text-text-header">
                            {userName}
                        </Typography>
                    </div>
                    <Icon name="chevron-down" className="w-5 h-5 text-text-light" />
                </button>
            </DropdownMenuTrigger>
            {/* The children prop is used here to render the menu content */}
            {children}
        </DropdownMenu>
    );
};