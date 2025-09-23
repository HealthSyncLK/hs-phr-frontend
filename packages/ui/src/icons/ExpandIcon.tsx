import React from 'react';

export const ExpandIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M3.66602 1H1.00195V3.66406"
            stroke="currentColor"
            strokeWidth="1.2"
        />
        <path
            d="M7.33398 1H9.99805V3.66406"
            stroke="currentColor"
            strokeWidth="1.2"
        />
        <path
            d="M7.33398 10H9.99805V7.33594"
            stroke="currentColor"
            strokeWidth="1.2"
        />
        <path
            d="M3.66602 10H1.00195V7.33594"
            stroke="currentColor"
            strokeWidth="1.2"
        />
    </svg>
);