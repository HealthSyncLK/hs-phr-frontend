'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { HealthRecord } from '../../app/types/record';
import { Table, TableBody, TableCell, TableRow } from '@repo/ui/components/data/Table';

interface RecordListViewProps {
    records: HealthRecord[];
    onSelectRecord: (record: HealthRecord) => void;
    selectedRecordId?: string;
}

export const RecordListView = ({
    records,
    onSelectRecord,
    selectedRecordId,
}: RecordListViewProps) => {
    return (
        <Table>
            <TableBody>
                {records.map((record) => (
                    <TableRow
                        key={record.id}
                        onClick={() => onSelectRecord(record)}
                        className={twMerge(
                            'cursor-pointer',
                            selectedRecordId === record.id && 'bg-primary-50 hover:bg-primary-50'
                        )}
                    >
                        <TableCell>{record.title}</TableCell>
                        <TableCell>{record.doctor}</TableCell>
                        <TableCell className="text-right">{record.date}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
