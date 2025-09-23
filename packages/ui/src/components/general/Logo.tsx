import React from 'react';

export interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    src: string;
}

export const Logo = React.forwardRef<HTMLAnchorElement, LogoProps>(
    ({ className, src, href = '/', ...props }, ref) => {
        return (
            <a href={href} ref={ref} className={className} {...props}>
                <img
                    src={src} // Assumes your logo is in the `public` folder
                    alt="Company Logo"
                    className="h-10 w-auto" // Adjust height as needed
                />
            </a>
        );
    }
);

Logo.displayName = 'Logo';