import React, { useState, useEffect } from 'react';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    fallback: string; // e.g., "JW"
    className?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ src, alt, fallback, className, ...props }, ref) => {
        const [imageError, setImageError] = useState(false);

        // Reset error state if the src changes
        useEffect(() => {
            setImageError(false);
        }, [src]);

        const handleImageError = () => {
            setImageError(true);
        };

        // The container handles the shape and size
        const containerClasses = `relative inline-flex items-center justify-center w-12 h-12 overflow-hidden rounded-full ${className}`;

        return (
            <div ref={ref} className={containerClasses}>
                {src && !imageError ? (
                    <img
                        src={src}
                        alt={alt}
                        onError={handleImageError}
                        className="object-cover w-full h-full"
                        {...props}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-avatar-fallback-bg">
                        <span className="font-medium text-text-header">{fallback}</span>
                    </div>
                )}
            </div>
        );
    }
);

Avatar.displayName = 'Avatar';