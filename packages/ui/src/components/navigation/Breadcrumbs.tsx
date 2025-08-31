import React from 'react';
import { Typography } from '../general/Typography';

const Breadcrumbs = React.forwardRef<
    HTMLElement,
    React.ComponentPropsWithoutRef<'nav'>
>(({ className, ...props }, ref) => (
    // The main container uses a gap to match the figma spec
    <nav ref={ref} aria-label="breadcrumb" className={className} {...props}>
        <ol className="flex items-center gap-2">{props.children}</ol>
    </nav>
));
Breadcrumbs.displayName = 'Breadcrumbs';

const BreadcrumbItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
    <li ref={ref} className={`flex items-center ${className}`} {...props} />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, ...props }, ref) => (
    // Style Change: Padding, font size, and weight updated.
    <a
        ref={ref}
        className={`px-2 py-1 transition-colors text-base font-light text-black hover:text-primary ${className}`}
        {...props}
    />
));
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<
    HTMLSpanElement,
    React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
    // Style Change: Padding, font size, and weight updated.
    <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={`px-2 py-1 text-base font-light text-black ${className}`}
        {...props}
    />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = React.forwardRef<
    HTMLLIElement,
    React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={`flex items-center justify-center ${className}`}
        {...props}
    >
        {/* Style Change: Changed separator to a styled '/' */}
        <Typography variant="body2" className="text-black/20">
            /
        </Typography>
    </li>
));
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export {
    Breadcrumbs,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
};