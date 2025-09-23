import React from "react";

export const ExpandArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Bottom-left arrow */}
    <polyline points="4 15 4 20 9 20" />
    <line x1="4" y1="20" x2="9" y2="15" />

    {/* Top-right arrow */}
    <polyline points="20 9 20 4 15 4" />
    <line x1="20" y1="4" x2="15" y2="9" />
  </svg>
);
