import React from 'react';

export const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24" // Standardized to 24x24 viewBox
        fill="none"
        stroke="currentColor"
        strokeWidth="4" // Reduced for a sharper look
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        {/* Points adjusted to fill more of the viewBox */}
        <polyline points="20 7 9 18 4 13"></polyline>
    </svg>
);