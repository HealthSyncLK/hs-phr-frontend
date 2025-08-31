import React, { createContext, useContext, useState } from 'react';

// 1. Context to share state between the parent and child items
interface SegmentedControlContextType {
    selectedValue: string;
    onValueChange: (value: string) => void;
}

const SegmentedControlContext = createContext<SegmentedControlContextType | undefined>(undefined);

const useSegmentedControl = () => {
    const context = useContext(SegmentedControlContext);
    if (!context) {
        throw new Error('SegmentedControlItem must be used within a SegmentedControl');
    }
    return context;
};

// 2. The individual item component
export interface SegmentedControlItemProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

export const SegmentedControlItem = ({ value, children, className }: SegmentedControlItemProps) => {
    const { selectedValue, onValueChange } = useSegmentedControl();
    const isActive = selectedValue === value;

    return (
        <button
            onClick={() => onValueChange(value)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${isActive
                    ? 'bg-white border border-neutral-200 shadow-sm text-text-header'
                    : 'text-text-light hover:text-text-header'
                } ${className}`}
        >
            {children}
        </button>
    );
};

// 3. The main wrapper component
export interface SegmentedControlProps {
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactElement<SegmentedControlItemProps>[];
    className?: string;
}

export const SegmentedControl = ({ value, onValueChange, children, className }: SegmentedControlProps) => {
    return (
        <SegmentedControlContext.Provider value={{ selectedValue: value, onValueChange }}>
            <div className={`inline-flex items-center gap-1 p-1 rounded-lg bg-neutral-50 ${className}`}>
                {children}
            </div>
        </SegmentedControlContext.Provider>
    );
};