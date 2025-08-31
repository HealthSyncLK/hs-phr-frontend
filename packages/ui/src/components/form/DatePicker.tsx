import React from "react";
import { DayPicker } from "react-day-picker";
import { Icon } from "../general/Icon";
export type DatePickerProps = React.ComponentProps<typeof DayPicker>;
// import "react-day-picker/style.css";


export const DatePicker = ({
    className,
    showOutsideDays = true,
    ...props
}: DatePickerProps) => {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={`p-3 bg-white rounded-lg ${className}`}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-base font-medium text-text-header",
                nav: "space-x-1 flex items-center",
                button_previous:
                    "relative h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                button_next:
                    "relative h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                table: "w-full border-collapse space-y-1",
                weekdays: "flex",
                weekday:
                    "text-text-light rounded-md w-9 font-normal text-[0.8rem]",
                week: "flex w-full mt-2",
                day: "h-9 w-9 text-center text-sm p-0 relative",
                day_button: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
            }}
            modifiersClassNames={{
                selected:
                    "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white rounded-md",
                today: "bg-neutral-100 text-text-header rounded-md",
                outside: "text-text-light opacity-50",
                disabled: "text-text-light opacity-50",
                range_middle:
                    "aria-selected:bg-primary-50 aria-selected:text-text-header",
                hidden: "invisible",
            }}
            components={{
                Chevron: ({ orientation, ...rest }) =>
                    orientation === "left" ? (
                        <Icon name="chevron-left" className="h-4 w-4 text-text-header" />
                    ) : (
                        // FIX: Added 'text-text-header' to give the right arrow a visible color.
                        <Icon name="chevron-right" className="h-4 w-4 text-text-header" />
                    ),
            }}
            {...props}
        />
    );
};

DatePicker.displayName = "DatePicker";