import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/general/Button';
import { Card } from '../components/app/Card';
import { Step, Stepper } from '../components/navigation/Stepper';

const meta: Meta<typeof Stepper> = {
    title: 'Navigation/Stepper',
    component: Stepper,
    subcomponents: { Step },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const steps = [
    { title: 'Personal Info' },
    { title: 'Appointment Details' },
    { title: 'Confirmation' },
];

export const Default: Story = {
    name: 'Interactive Stepper',
    render: () => {
        const [currentStep, setCurrentStep] = useState(1);
        const totalSteps = steps.length;

        const handleNext = () => {
            setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : prev));
        };

        const handlePrev = () => {
            setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
        };

        return (
            <Card>
                <div className="p-4">
                    <Stepper currentStep={currentStep}>
                        {steps.map((step, index) => (
                            <Step key={index} title={step.title} />
                        ))}
                    </Stepper>

                    <div className="mt-8 flex justify-center gap-4">
                        <Button
                            variant="secondary"
                            onClick={handlePrev}
                            disabled={currentStep === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleNext}
                            disabled={currentStep === totalSteps}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </Card>
        );
    },
};