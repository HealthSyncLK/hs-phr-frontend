import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Typography } from '../general/Typography';
import { twMerge } from 'tailwind-merge';

export interface SignaturePadProps {
    title: string;
    description: string;
    onSignatureEnd?: (signature: string) => void;
    onClear?: () => void;
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
    className?: string;
}

export const SignaturePad = React.forwardRef<
    SignatureCanvas,
    SignaturePadProps
>(({ title, description, onSignatureEnd, onClear, canvasProps, className }, ref) => {
    const signaturePadRef = useRef<SignatureCanvas | null>(null);
    // State to control the visibility of the placeholder text
    const [isEmpty, setIsEmpty] = useState(true);

    const handleClear = () => {
        signaturePadRef.current?.clear();
        setIsEmpty(true);
        if (onClear) {
            onClear();
        }
    };

    const handleBegin = () => {
        setIsEmpty(false);
    };

    const handleEnd = () => {
        if (onSignatureEnd && signaturePadRef.current) {
            const dataUrl = signaturePadRef.current.toDataURL('image/png');
            onSignatureEnd(dataUrl);
        }
    };

    return (
        // Main container with card styling
        <div className={twMerge('flex flex-col gap-2.5 p-4 bg-white border border-neutral-gray-100 rounded-lg', className)}>
            {/* Header section */}
            <div className="flex items-end justify-between">
                <div className="flex flex-col">
                    <Typography variant="body1" className="font-medium text-text-header">
                        {title}
                    </Typography>
                    <Typography variant="body2" className="text-text-light">
                        {description}
                    </Typography>
                </div>
                <button
                    onClick={handleClear}
                    className="text-sm font-normal text-primary hover:underline"
                >
                    Clear
                </button>
            </div>

            {/* Canvas container */}
            <div className="relative w-full">
                {isEmpty && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Typography className="text-sm text-text-header">
                            Draw your signature here
                        </Typography>
                    </div>
                )}
                <SignatureCanvas
                    ref={(node) => {
                        signaturePadRef.current = node;
                        if (typeof ref === 'function') ref(node);
                        else if (ref) ref.current = node;
                    }}
                    canvasProps={{
                        ...canvasProps,
                        className: twMerge(
                            'w-full h-[150px] bg-neutral-50 rounded-xl',
                            canvasProps?.className
                        ),
                    }}
                    onBegin={handleBegin}
                    onEnd={handleEnd}
                />
            </div>
        </div>
    );
});

SignaturePad.displayName = 'SignaturePad';