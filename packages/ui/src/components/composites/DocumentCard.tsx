import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Card } from '../app/Card';
import { CustomIcon, IconName } from '../general/CustomIcon';
import { Typography } from '../general/Typography';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from '../navigation/DropdownMenu';
import { Button } from '../general/Button';

export interface DocumentCardProps {
    icon: IconName;
    iconBgClass: string; // e.g., 'bg-blue-100'
    title: string;
    subtitle: string;
    menuContent: React.ReactNode;
    className?: string;
}

export const DocumentCard = ({
    icon,
    iconBgClass,
    title,
    subtitle,
    menuContent,
    className,
}: DocumentCardProps) => {
    return (
        <Card
            variant="outlined"
            className={twMerge('p-4 w-full', className)}
        >
            <div className="flex items-center gap-4">
                {/* CustomIcon Section */}
                <div
                    className={twMerge(
                        'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg',
                        iconBgClass
                    )}
                >
                    <CustomIcon name={icon} className="h-6 w-6 text-primary" />
                </div>

                {/* Text Section */}
                <div className="flex-grow">
                    <Typography variant="body1" className="font-medium text-text-header">
                        {title}
                    </Typography>
                    <Typography variant="body2" className="text-text-light">
                        {subtitle}
                    </Typography>
                </div>

                {/* Menu Section */}
                <div className="flex-shrink-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="tertiary" size="sm" className='text-text-header'>
                                <CustomIcon name="more-vertical" className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        {menuContent}
                    </DropdownMenu>
                </div>
            </div>
        </Card>
    );
};