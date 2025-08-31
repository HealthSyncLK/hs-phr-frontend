import React from 'react';
import { Typography } from '../general/Typography';

/**
 * The main Timeline container.
 */
export const Timeline = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={`flex flex-col ${className}`}>{children}</div>;
};

/**
 * A wrapper for a single timeline entry.
 */
export const TimelineItem = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={`flex flex-row items-stretch gap-[9px] ${className}`}>
            {children}
        </div>
    );
};

/**
 * The left-hand side date component.
 */
export const TimelineDate = ({ date }: { date: string }) => {
    return (
        <div className="flex items-center w-[100px] flex-shrink-0 text-right pt-1">
            <Typography variant="body1" className="text-text-header">
                {date}
            </Typography>
        </div>
    );
};

/**
 * The central axis with the dot centered in the vertical line.
 */
export const TimelineConnector = ({ isLast = false }: { isLast?: boolean }) => {
    return (
        <div className="w-[20px] flex-shrink-0 flex flex-col items-center">
            {/* Top half of the line */}
            <div className={`w-[5px] flex-grow rounded-full ${isLast ? 'bg-primary-50' : 'bg-primary-50'}`} />

            {/* The Dot */}
            <div className="w-[12px] h-[12px] flex-shrink-0 rounded-full bg-primary" />

            {/* Bottom half of the line */}
            <div className={`w-[5px] flex-grow rounded-full ${isLast ? 'bg-primary-50' : 'bg-primary-50'}`} />
        </div>
    );
};

/**
 * The main content area on the right.
 */
export const TimelineContent = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={`flex-grow pb-6 pt-1 ${className}`}>{children}</div>;
};

/**
 * A heading for the year, placed inside the TimelineContent.
 */
export const TimelineYear = ({ year }: { year: string }) => {
    return (
        <Typography variant="h3" className="font-semibold text-text-header mb-2.5">
            {year}
        </Typography>
    );
};