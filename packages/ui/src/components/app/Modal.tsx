import React, { createContext, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CustomIcon } from '../general/CustomIcon';

// 1. Context to share the onClose function
interface ModalContextType {
    onClose: () => void;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);
const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('This component must be used within a <Modal> provider');
    }
    return context;
};

// 2. Main Modal Wrapper (Controls visibility and provides context)
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <ModalContext.Provider value={{ onClose }}>
            {children}
        </ModalContext.Provider>
    );
};

// 3. Modal Content (Handles portal, overlay, focus trap, and escape key)
const modalContentVariants = cva(
    'relative flex flex-col bg-white rounded-xl shadow-xl max-h-[90vh]',
    {
        variants: {
            size: {
                sm: 'w-full max-w-sm',
                md: 'w-full max-w-md',
                lg: 'w-full max-w-lg',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    }
);

interface ModalContentProps extends VariantProps<typeof modalContentVariants> {
    children: React.ReactNode;
    className?: string;
}
export const ModalContent = ({ children, size, className }: ModalContentProps) => {
    const { onClose } = useModal();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return ReactDOM.createPortal(
        <FocusTrap>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center"
                aria-modal="true"
                role="dialog"
            >
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-neutral-900/40"
                    onClick={onClose}
                />
                {/* Dialog */}
                <div className={modalContentVariants({ size, className })}>{children}</div>
            </div>
        </FocusTrap>,
        document.body
    );
};

// 4. Modal Sub-components for structure
export const ModalHeader = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const { onClose } = useModal();
    return (
        <div
            className={`flex items-center justify-between p-5 border-b border-neutral-gray-100 ${className}`}
        >
            <div className="text-xl font-medium text-text-header">{children}</div>
            <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100"
            >
                <CustomIcon name="x" className="w-5 h-5 text-text-light" />
            </button>
        </div>
    );
};

export const ModalBody = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={`p-5 overflow-y-auto ${className}`}>{children}</div>;
};

export const ModalFooter = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={`flex justify-end gap-3 p-5 border-t border-neutral-gray-100 ${className}`}
        >
            {children}
        </div>
    );
};