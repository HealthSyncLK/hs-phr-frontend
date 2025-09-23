import React from 'react';
import { twMerge } from 'tailwind-merge';

import { BellIcon } from '../../icons/BellIcon';
import { PlusIcon } from '../../icons/PlusIcon';
import { LoaderIcon } from '../../icons/LoaderIcon';
import { EyeIcon } from '../../icons/EyeIcon';
import { EyeOffIcon } from '../../icons/EyeOffIcon';
import { SearchIcon } from '../../icons/SearchIcon';
import { CheckIcon } from '../../icons/CheckIcon';
import { XIcon } from '../../icons/XIcon';
import { MoreVerticalIcon } from '../../icons/MoreVerticalIcon';
import { ChevronDownIcon } from '../../icons/ChevronDownIcon';
import { FilterIcon } from '../../icons/FilterIcon';
import { EmailIcon } from '../../icons/EmailIcon';
import { PrintIcon } from '../../icons/PrintIcon';
import { ChevronLeftIcon } from '../../icons/ChevronLeftIcon';
import { ChevronRightIcon } from '../../icons/ChevronRightIcon';
import { HeartRateIcon } from '../../icons/HeartRateIcon';
import { PillIcon } from '../../icons/PillIcon';
import { HomeIcon } from '../../icons/HomeIcon';
import { DocumentIcon } from '../../icons/DocumentIcon';
import { UserIcon } from '../../icons/UserIcon';
import { HeartIcon } from '../../icons/HeartIcon';
import { UploadIcon } from '../../icons/UploadIcon';
import { UploadCloudIcon } from '../../icons/UploadCloudIcon';
import { TrashIcon } from '../../icons/TrashIcon';
import { EditIcon } from '../../icons/EditIcon';
import { ClockIcon } from '../../icons/ClockIcon';
import { LocationIcon } from '../../icons/LocationIcon';
import { SettingsIcon } from '../../icons/SettingsIcon';
import { LogOutIcon } from '../../icons/LogoutIcon';
import { UsersIcon } from '../../icons/UsersIcon';
import { MessageCircleIcon } from '../../icons/MessageCircleIcon';
import { ShoppingCartIcon } from '../../icons/ShoppingCartIcon';
import { DownloadIcon } from '../../icons/DownloadIcon';
import { QrCodeIcon } from '../../icons/QrCodeIcon';
import { LinkIcon } from '../../icons/LinkIcon';
import { ExpandIcon } from '../../icons/ExpandIcon';
import { CalendarIcon } from '../../icons/CalendarIcon';


// Create a map of icon names to their components
export const iconMap = {
    bell: BellIcon,
    plus: PlusIcon,
    loaderIcon: LoaderIcon,
    eye: EyeIcon,
    'eye-off': EyeOffIcon,
    search: SearchIcon,
    check: CheckIcon,
    x: XIcon,
    'more-vertical': MoreVerticalIcon,
    'chevron-down': ChevronDownIcon,
    filter: FilterIcon,
    email: EmailIcon,
    print: PrintIcon,
    'chevron-left': ChevronLeftIcon,
    'chevron-right': ChevronRightIcon,
    'heart-rate': HeartRateIcon,
    pill: PillIcon,
    home: HomeIcon,
    document: DocumentIcon,
    user: UserIcon,
    heart: HeartIcon,
    upload: UploadIcon,
    'upload-cloud': UploadCloudIcon,
    trash: TrashIcon,
    edit: EditIcon,
    clock: ClockIcon,
    location: LocationIcon,
    settings: SettingsIcon,
    'log-out': LogOutIcon,
    users: UsersIcon,
    'message-circle': MessageCircleIcon,
    'shopping-cart': ShoppingCartIcon,
    download: DownloadIcon,
    'qr-code': QrCodeIcon,
    link: LinkIcon,
    expand: ExpandIcon,
    calendar: CalendarIcon,

    // Add other icons to this map
};

// Create a type for the icon names for type safety
export type IconName = keyof typeof iconMap;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ name, className, ...props }, ref) => {
        const IconComponent = iconMap[name];

        if (!IconComponent) {
            // Return null or a default fallback icon if the name is invalid
            return null;
        }

        // Default size can be handled by a base class if needed,
        // but Tailwind's w-6 h-6 is a common default.
        // twMerge intelligently combines the default size with any size you provide.
        const mergedClassName = twMerge('w-6 h-6', className);

        return (
            <IconComponent
                className={`${mergedClassName} ${className || ''}`}
                ref={ref}
                {...props}
            />
        );
    }
);

Icon.displayName = 'Icon';