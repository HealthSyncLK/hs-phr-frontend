import React, { createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Context and Radio component remain exactly the same...
interface RadioGroupContextType {
    name: string;
    selectedValue: string | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);
const useRadioGroup = () => {
    const context = useContext(RadioGroupContext);
    if (!context) {
        throw new Error('The Radio component must be used within a RadioGroup');
    }
    return context;
};

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value: string;
}
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    ({ className, label, value, ...props }, ref) => {
        const { name, selectedValue, onChange } = useRadioGroup();
        const isChecked = selectedValue === value;

        return (
            <label
                className={`inline-flex items-center gap-3 cursor-pointer ${props.disabled ? 'cursor-not-allowed opacity-60' : ''
                    } ${className}`}
            >
                <input
                    type="radio"
                    className="sr-only peer"
                    ref={ref}
                    name={name}
                    value={value}
                    checked={isChecked}
                    onChange={onChange}
                    {...props}
                />
                <div className="relative flex items-center justify-center w-5 h-5 bg-white border-2 rounded-full border-neutral-gray-100 peer-checked:border-primary">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary transition-transform scale-0 peer-checked:scale-100" />
                </div>
                <span className="text-base font-normal select-none text-text-header">
                    {label}
                </span>
            </label>
        );
    }
);
Radio.displayName = 'Radio';


// --- CHANGES ARE HERE ---

// 1. Define variants for the RadioGroup layout
const radioGroupVariants = cva('flex', {
    variants: {
        orientation: {
            vertical: 'flex-col gap-4',
            horizontal: 'flex-row gap-6',
        },
    },
    defaultVariants: {
        orientation: 'vertical',
    },
});

// 2. Update props to include orientation
export interface RadioGroupProps extends VariantProps<typeof radioGroupVariants> {
    name: string;
    value: string | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode;
    className?: string;
}

// 3. Apply the variants to the component
export const RadioGroup = ({ name, value, onChange, children, className, orientation }: RadioGroupProps) => {
    return (
        <RadioGroupContext.Provider value={{ name, selectedValue: value, onChange }}>
            <div
                role="radiogroup"
                className={radioGroupVariants({ orientation, className })}
            >
                {children}
            </div>
        </RadioGroupContext.Provider>
    );
};