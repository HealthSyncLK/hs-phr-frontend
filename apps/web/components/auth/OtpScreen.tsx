'use client';

import { FormControl } from '@repo/ui/components/form/FormControl';
import { OtpInput } from '@repo/ui/components/form/OtpInput';
import { Button } from '@repo/ui/components/general/Button';
import { Typography } from '@repo/ui/components/general/Typography';
import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useConfig } from '../../providers/ConfigProvider';
import Countdown from 'react-countdown';

interface OtpScreenProps {
    /** The contact info (email/phone) to display to the user. */
    contact: string;
    onResend: () => void;
}

export const OtpScreen = ({ contact, onResend }: OtpScreenProps) => {
    const {
        control,
        formState: { isValid, isSubmitting },
    } = useFormContext();
    const { config } = useConfig();
    const formConfig = config?.ui?.otpForm;

    const [timerKey, setTimerKey] = useState(0);
    const [isExpired, setIsExpired] = useState(false);

    // --- THIS FUNCTION IS NOW FIXED ---
    const maskContact = (contact: string) => {
        // First, check if the contact is an email address.
        if (contact.includes('@')) {
            const parts = contact.split('@');
            // Safely handle the parts of the email
            const name = parts[0] || '';
            const domain = parts[1] || '';
            return `${name.slice(0, 3)}***@${domain}`;
        } else {
            // If it's not an email, treat it as a phone number.
            return `...${contact.slice(-4)}`;
        }
    };

     // Custom renderer for MM:SS formatting
    const renderer = ({ minutes, seconds, completed }: any) => {
        if (completed) return null; // Hide countdown when expired
        return <span>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>;
    };
    
    const handleResend = () => {
        onResend();
        setTimerKey((prev) => prev + 1); // reset timer
        setIsExpired(false); // reset expired state
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
                <Typography variant="h1">{formConfig.title}</Typography>
                <Typography variant="body1" className="text-text-light mt-2">
                   {formConfig.description} {contact.includes('@')? 'email': 'SMS'} at {maskContact(contact)}.
                </Typography>
            </div>

            <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                    <FormControl>
                        <OtpInput
                            value={field.value || ''}
                            onChange={field.onChange}
                            numInputs={6}
                        />
                    </FormControl>
                )}
            />

            <div>
                <Typography variant="body2" className="mt-2 text-sm text-red-700">
                     { !isExpired ? (
                        <div> OTP expires in {' '}
                        <Countdown date={Date.now() + 120 * 1000} // 2 minutes from now
                            renderer={renderer}
                            key={timerKey} // changing key resets timer
                            onComplete={() => setIsExpired(true)}
                         />
                        </div>
                     ) : (<span>OTP expired. Please request a new one.</span>)}
                </Typography>
            </div>

            <div className="my-6 text-base">
                {formConfig.labels.codeReceive}{' '}
                <button
                    type="button"
                     className={`font-semibold focus:outline-none 
                        ${(!isValid || isSubmitting || !isExpired)
                            ? "text-gray-400 cursor-not-allowed"   
                            : "text-primary hover:underline"}      
                            `}
                    onClick={handleResend}
                    disabled={!isValid || isSubmitting || !isExpired}
                >
                {formConfig.labels.resend}
                </button>
            </div>

            <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
                {isSubmitting ? 'Verifying...' : `${formConfig.buttons.continue}`}
            </Button>
        </div>
    );
};

