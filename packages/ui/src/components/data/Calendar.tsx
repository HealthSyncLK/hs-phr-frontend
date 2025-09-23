import React, { useState, useMemo } from 'react';
import {
    addMonths,
    subMonths,
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    getDate,
    isToday as isTodayDateFns,
} from 'date-fns';
import { Button } from '../general/Button';
import { CustomIcon } from '../general/CustomIcon';
import { Typography } from '../general/Typography';
import { SegmentedControl, SegmentedControlItem } from '../navigation/SegmentedControl';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../general/Tooltip';


// --- Logic Hook for generating the calendar grid ---
const useCalendarGrid = (currentMonth: Date) => {
    const grid = useMemo(() => {
        const firstDayOfMonth = startOfMonth(currentMonth);
        const lastDayOfMonth = endOfMonth(currentMonth);
        const gridStartDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }); // weekStartsOn: 1 for Monday
        const gridEndDate = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });

        return eachDayOfInterval({ start: gridStartDate, end: gridEndDate }).map((date) => ({
            date,
            dayNumber: getDate(date),
            isCurrentMonth: isSameMonth(date, currentMonth),
        }));
    }, [currentMonth]);
    return { days: grid };
};

// --- Child Components (Building Blocks) ---
const AppointmentCalendarHeader = ({
    currentMonth,
    onPrevious,
    onNext,
}: {
    currentMonth: Date;
    onPrevious: () => void;
    onNext: () => void;
}) => (
    <div className="flex justify-between items-center px-5 py-3 border-b border-neutral-200">
        <div className="flex items-center gap-4">
            {/* Style Update: Button styles now match Figma exactly */}
            <Button
                variant="secondary"
                className="flex items-center justify-center bg-neutral-50"
                size={'xs'}
                onClick={onPrevious}
                aria-label="Go to previous month"
            >
                <CustomIcon name="chevron-left" className="w-4 h-4" />
            </Button>

            {/* Style Update: Font size, weight, and line height matched */}
            <Typography variant="body1_default" className="font-medium text-xl leading-7 text-text-header">
                {format(currentMonth, 'MMMM yyyy')}
            </Typography>

            <Button
                variant="secondary"
                className="flex items-center justify-center bg-neutral-50"
                size={'xs'}
                onClick={onNext}
                aria-label="Go to next month"
            >
                <CustomIcon name="chevron-right" className="w-4 h-4 text-text-header" />
            </Button>
        </div>
        <SegmentedControl value="calendar" onValueChange={() => { }}>
            <SegmentedControlItem value="calendar">Calendar View</SegmentedControlItem>
            <SegmentedControlItem value="list">List View</SegmentedControlItem>
        </SegmentedControl>
    </div>
);

const CalendarGrid = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-7">{children}</div>
);

const CalendarWeekDay = ({ children }: { children: React.ReactNode }) => (
    <div className="p-3 text-center bg-[#F6F7F9] border border-neutral-200 text-[15px] font-medium">
        {children}
    </div>
);

// --- THIS COMPONENT IS NOW UPDATED ---
const CalendarDay = ({ dayNumber, children, isToday = false, isOutsideMonth = false }: { dayNumber: number; children?: React.ReactNode; isToday?: boolean; isOutsideMonth?: boolean }) => (
    <div className={`h-[140px] border border-neutral-200 p-3 flex flex-col justify-between ${isToday ? 'bg-primary-50' : ''}`}>
        {/* --- STYLE CHANGE IS HERE --- */}
        <Typography variant='body1_default' className={`font-normal text-xl leading-7 text-text-header ${isOutsideMonth ? 'opacity-50' : ''}`}>
            {dayNumber}
        </Typography>
        <div className="overflow-y-auto space-y-1.5">
            {children}
        </div>
    </div>
);
// --- THIS COMPONENT IS NOW UPDATED TO MATCH YOUR DESIGN ---
const CalendarEvent = ({ title, subtitle, time, details, isActive }: { title: string; subtitle: string; time: string; details: any, isActive: boolean }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                {/* The outer div is now the trigger */}
                <div
                    className={`p-1.5 rounded-md cursor-pointer ${isActive
                        ? 'border border-primary bg-primary-50' // Active state from Figma
                        : 'bg-neutral-50' // Default state from Figma
                        }`}
                >
                    <div className="pb-1.5 mb-1.5 border-b-[0.5px] border-neutral-200">
                        <Typography className="text-xs font-normal leading-[18px] text-text-header">
                            {title} {subtitle}
                        </Typography>
                    </div>
                    <Typography className="text-xs font-normal leading-[18px] text-text-header">
                        {time}
                    </Typography>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                {/* This is the content shown inside the tooltip */}
                <div className="flex flex-col gap-1.5 p-1">
                    <div className="flex items-center gap-2"><CustomIcon name="user" className="w-4 h-4" />{details.doctor}</div>
                    <div className="flex items-center gap-2"><CustomIcon name="clock" className="w-4 h-4" />{details.time}</div>
                    <div className="flex items-center gap-2"><CustomIcon name="location" className="w-4 h-4" />{details.location}</div>
                </div>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);


// --- Main Exported Component ---
export const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [activeEvent, setActiveEvent] = useState<string | null>(null); // State to track the active event
    const { days } = useCalendarGrid(currentMonth);

    // Example event data
    const event = {
        id: 'event-1',
        title: "Dr. Sara Mitchell",
        subtitle: "(Cardiologist)",
        time: "09:00 AM – 10:00 AM",
        details: {
            doctor: "Dr. Sara Mitchell (Cardiologist)",
            time: "09:00 AM – 10:00 AM",
            location: "Nawaloka Hospital"
        }
    };

    return (
        <div className="bg-white">
            <AppointmentCalendarHeader
                currentMonth={currentMonth}
                onPrevious={() => setCurrentMonth(subMonths(currentMonth, 1))}
                onNext={() => setCurrentMonth(addMonths(currentMonth, 1))}
            />
            <CalendarGrid>
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => <CalendarWeekDay key={day}>{day}</CalendarWeekDay>)}

                {days.map(({ date, dayNumber, isCurrentMonth }, index) => (
                    <CalendarDay
                        key={index}
                        dayNumber={dayNumber}
                        isOutsideMonth={!isCurrentMonth}
                        isToday={isTodayDateFns(date)}
                    >
                        {/* The event is now interactive */}
                        {dayNumber === 9 && isCurrentMonth && (
                            <div onClick={() => setActiveEvent(event.id)}>
                                <CalendarEvent
                                    {...event}
                                    isActive={activeEvent === event.id}
                                />
                            </div>
                        )}
                    </CalendarDay>
                ))}
            </CalendarGrid>
        </div>
    );
};