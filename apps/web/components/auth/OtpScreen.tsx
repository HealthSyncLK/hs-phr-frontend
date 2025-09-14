'use client';

import { FormControl } from '@repo/ui/components/form/FormControl';
import { OtpInput } from '@repo/ui/components/form/OtpInput';
import { Button } from '@repo/ui/components/general/Button';
import { Typography } from '@repo/ui/components/general/Typography';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface OtpScreenProps {
    /** The contact info (email/phone) to display to the user. */
    contact: string;
}

export const OtpScreen = ({ contact }: OtpScreenProps) => {
    const {
        control,
        formState: { isValid, isSubmitting },
    } = useFormContext();

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

    return (
        <div className="w-full max-w-md mx-auto text-center">
            <div className="mb-8">
                <Typography variant="h1">Enter OTP</Typography>
                <Typography variant="body1" className="text-text-light mt-2">
                    A 6-digit code has been sent to {maskContact(contact)}.
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

            <div className="my-6 text-sm">
                Didn't receive the code?{' '}
                <button
                    type="button"
                    className="font-semibold text-primary hover:underline focus:outline-none"
                    onClick={() => console.log('Resend OTP')}
                >
                    Resend
                </button>
            </div>

            <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
                {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
            </Button>
        </div>
    );
};

