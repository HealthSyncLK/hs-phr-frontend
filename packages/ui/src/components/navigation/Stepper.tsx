import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CustomIcon } from '../general/CustomIcon';
import { Typography } from '../general/Typography';

// --- Step Component ---

const stepVariants = cva(
    'flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold transition-colors',
    {
        variants: {
            state: {
                active: 'border-primary bg-primary text-white',
                completed: 'border-primary bg-white text-primary',
                upcoming: 'border-neutral-200 bg-white text-text-light',
            },
        },
    }
);

interface StepProps extends VariantProps<typeof stepVariants> {
    stepNumber?: number;
    title: string;
    isLastStep?: boolean;
}

export const Step = ({ state, stepNumber, title, isLastStep }: StepProps) => {
    const isCompleted = state === 'completed';

    return (
        <div className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1 text-center w-24">
                <div className={stepVariants({ state })}>
                    {isCompleted ? <CustomIcon name="check" className="h-5 w-5" /> : stepNumber}
                </div>
                <Typography variant="body2">
                    {title}
                </Typography>
            </div>
            {!isLastStep && (
                <div
                    className={`h-0.5 w-full flex-grow transition-colors ${isCompleted ? 'bg-primary' : 'bg-neutral-200'
                        }`}
                />
            )}
        </div>
    );
};

// --- Stepper Component ---

export interface StepperProps {
    currentStep: number;
    // --- THIS TYPE IS NOW CORRECTED ---
    // It now correctly expects children of type StepProps.
    children: React.ReactElement<StepProps>[];
    className?: string;
}

export const Stepper = ({ currentStep, children, className }: StepperProps) => {
    const totalSteps = React.Children.count(children);

    return (
        <div className={`flex w-full items-start ${className}`}>
            {React.Children.map(children, (child, index) => {
                const stepNumber = index + 1;
                const state =
                    stepNumber < currentStep
                        ? 'completed'
                        : stepNumber === currentStep
                            ? 'active'
                            : 'upcoming';

                return React.cloneElement(child, {
                    stepNumber,
                    state,
                    isLastStep: stepNumber === totalSteps,
                });
            })}
        </div>
    );
};