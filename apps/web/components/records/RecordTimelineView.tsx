'use client';

import React from 'react';
import {
    Timeline,
    TimelineItem,
    TimelineDate,
    TimelineConnector,
    TimelineContent,
    TimelineYear,
} from '@repo/ui/components/data/Timeline';
import { twMerge } from 'tailwind-merge';
import { HealthRecord } from '../../app/types/record';
import { Icon, IconName } from '@repo/ui/components/general/Icon';
import { Typography } from '@repo/ui/components/general/Typography';

// --- Helper component for the card UI ---
const ReportCard = ({
    report,
    isSelected,
    onClick,
}: {
    report: HealthRecord;
    isSelected: boolean;
    onClick: () => void;
}) => (
    <div
        onClick={onClick}
        className={twMerge(
            'rounded-xl border shadow-sm cursor-pointer transition-all mt-4',
            isSelected
                ? 'border-primary ring-2 ring-primary-50'
                : 'border-neutral-100 hover:border-neutral-200 hover:shadow-md'
        )}
    >
        {/* Card Header */}
        <div className="flex items-center gap-4 p-4 border-b border-neutral-100">
            <div
                className={twMerge(
                    'flex items-center justify-center w-11 h-11 rounded-lg',
                    report.iconBgClass
                )}
            >
                <Icon name={report.iconName as IconName} className={twMerge('w-6 h-6', report.iconColorClass)} />
            </div>
            <div className="flex-grow">
                <Typography variant="body1" className="font-medium text-text-header">
                    {report.title}
                </Typography>
                <Typography variant="caption" className="text-text-light">
                    {report.fileType}
                </Typography>
            </div>
            <button>
                <Icon name="heart" className="w-6 h-6 text-text-light" />
            </button>
        </div>
        {/* Card Footer */}
        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-b-xl">
            <div className="flex items-center gap-2">
                <Icon name="user" className="w-5 h-5 text-text-light" />
                <Typography variant="body2" className="text-text-header">
                    {report.doctor}
                </Typography>
            </div>
            <a href="#" className="inline-flex items-center text-sm font-medium text-primary">
                View Report
                <Icon name="chevron-right" className="w-4 h-4" />
            </a>
        </div>
    </div>
);

// --- Main Timeline View Component ---
interface RecordTimelineViewProps {
    records: HealthRecord[];
    onSelectRecord: (record: HealthRecord) => void;
    selectedRecordId?: string;
}

export const RecordTimelineView = ({
    records,
    onSelectRecord,
    selectedRecordId,
}: RecordTimelineViewProps) => {
    // Sort records by date descending to show the most recent first
    const sortedRecords = [...records].sort((a, b) => b.date.localeCompare(a.date));
    let lastRenderedYear: string | null = null;

    return (
        <Timeline>
            {sortedRecords.map((record, index) => {
                // Check if the year has changed from the last record
                const showYear = record.year !== lastRenderedYear;
                if (showYear) {
                    lastRenderedYear = record.year;
                }

                return (
                    <TimelineItem key={record.id}>
                        <TimelineDate date={record.date} />
                        <TimelineConnector isLast={index === sortedRecords.length - 1} />
                        <TimelineContent>
                            {/* Conditionally render the TimelineYear component */}
                            {showYear && <TimelineYear year={record.year} />}
                            <ReportCard
                                report={record}
                                isSelected={selectedRecordId === record.id}
                                onClick={() => onSelectRecord(record)}
                            />
                        </TimelineContent>
                    </TimelineItem>
                );
            })}
        </Timeline>
    );
};

