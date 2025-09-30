'use client';

import React, { useRef } from 'react';
import { useTimeFieldState } from 'react-stately';
import { useTimeField, useLocale, useDateSegment, TimeValue } from 'react-aria';
import { Time } from '@internationalized/date';
import { twMerge } from 'tailwind-merge';
import { CustomIcon } from '../general/CustomIcon';

// A small component for an individual segment (hour, minute, etc.)
function TimeSegment({ segment, state }: { segment: any; state: any }) {
    const ref = useRef(null);
    const { segmentProps } = useDateSegment(
        { ...segment, "aria-label": segment.type },
        state,
        ref
    );

    return (
        <div
            {...segmentProps}
            ref={ref}
            className={twMerge(
                'px-0.5 box-content text-right tabular-nums rounded-sm focus:bg-primary focus:text-white focus:outline-none',
                !segment.isPlaceholder && 'text-text-header',
                segment.isPlaceholder && 'text-text-light'
            )}
        >
            {segment.text}
        </div>
    );
}

export interface TimePickerProps {
    value?: { hour: number; minute: number } | null;
    onChange?: (value: { hour: number; minute: number } | null) => void;
    className?: string;
    'aria-label'?: string;
}

export const TimePicker = (props: TimePickerProps) => {
    const { locale } = useLocale();

    const timeValue: TimeValue | null = props.value
        ? new Time(props.value.hour, props.value.minute)
        : null;

    const state = useTimeFieldState({
        value: timeValue,
        onChange: (time) => {
            if (time) {
                props.onChange?.({ hour: time.hour, minute: time.minute });
            }
        },
        locale,
    });

    const ref = useRef(null);
    const { fieldProps } = useTimeField(
        { 'aria-label': props['aria-label'] },
        state,
        ref
    );

    return (
        <div
            {...fieldProps}
            ref={ref}
            className={twMerge(
                'inline-flex h-12 w-full items-center rounded-lg border border-neutral-gray-100 bg-white px-4 py-3 text-base focus-within:ring-2 focus-within:ring-primary',
                props.className
            )}
        >
            {state.segments.map((segment, i) => (
                <React.Fragment key={i}>
                    {segment.type === 'literal' ? (
                        <span className="text-text-light">{segment.text}</span>
                    ) : (
                        <TimeSegment segment={segment} state={state} />
                    )}
                </React.Fragment>
            ))}
            <CustomIcon name="clock" className="ml-auto h-5 w-5 text-text-light" />
        </div>
    );
};