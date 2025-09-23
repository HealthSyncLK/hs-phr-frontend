'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { HealthRecord } from '../../../types/record';
import { recordsService } from '../../../services/recordService';
import { Typography } from '@repo/ui/components/general/Typography';
import { SegmentedControl, SegmentedControlItem } from '@repo/ui/components/navigation/SegmentedControl';
import { RecordTimelineView } from '../../../../components/records/RecordTimelineView';
import { RecordListView } from '../../../../components/records/RecordListView';
import { RecordDetailView } from '../../../../components/records/RecordDetailView';
import { RecordsToolbar } from '../../../../components/records/RecordsToolbar';
import { Card } from '@repo/ui/components/app/Card';
import { Button } from '@repo/ui/components/general/Button';
import { Icon } from '@repo/ui/components/general/Icon';

type ViewMode = 'timeline' | 'list';

export default function HealthRecordsPage() {
    const [view, setView] = useState<ViewMode>('timeline');
    const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);

    const { data: records, error, isLoading } = useSWR(
        'health-records', // A unique, descriptive key for SWR
        recordsService.getHealthRecords
    );

    // --- THIS IS THE CORRECTED PART ---
    // This useEffect now safely sets the default selected record.
    useEffect(() => {
        // Only run this if no record is selected yet and the data has loaded.
        if (!selectedRecord && records && records.length > 0) {
            const firstRecord = records[0];
            if (firstRecord) { // Explicitly check that the record exists
                setSelectedRecord(firstRecord);
            }
        }
    }, [records, selectedRecord]);

    if (isLoading) return <div>Loading records...</div>;
    if (error) return <div>Failed to load records.</div>;
    if (!records) return <div>No records found.</div>; // Handle case where records might be null/undefined

    return (
        <div className="h-full flex flex-col">
            <div className='flex justify-end mb-5'>
                <Button variant="primary" className="w-full sm:w-auto">
                    <Icon name="plus" className="w-5 h-5 mr-2" />
                    Add Document
                </Button>
            </div>
            <RecordsToolbar />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow  mt-6">
                <Card variant='plain'>
                    <div className="flex justify-between items-center pb-3 mb-6 border-b border-neutral-200">
                        <Typography variant="h4">Health Records</Typography>
                        <SegmentedControl value={view} onValueChange={(v) => setView(v as ViewMode)}>
                            <SegmentedControlItem value="timeline">Timeline View</SegmentedControlItem>
                            <SegmentedControlItem value="list">List View</SegmentedControlItem>
                        </SegmentedControl>
                    </div>
                    <div className="overflow-y-auto">
                        {view === 'timeline' ? (
                            <RecordTimelineView records={records} onSelectRecord={setSelectedRecord} selectedRecordId={selectedRecord?.id} />
                        ) : (
                            <RecordListView records={records} onSelectRecord={setSelectedRecord} selectedRecordId={selectedRecord?.id} />
                        )}
                    </div>
                </Card>
                <Card variant='plain'>
                    <RecordDetailView record={selectedRecord} />
                </Card>
            </div>


        </div>
    );
}