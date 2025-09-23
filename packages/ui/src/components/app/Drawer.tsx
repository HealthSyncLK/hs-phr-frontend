import React, { createContext, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import { CustomIcon } from '../general/CustomIcon';

// 1. Context to share the onClose function
interface DrawerContextType {
    onClose: () => void;
}
const DrawerContext = createContext<DrawerContextType | undefined>(undefined);
const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('This component must be used within a <Drawer> provider');
    }
    return context;
};

// 2. Main Drawer Wrapper (Controls visibility and provides context)
interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
export const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <DrawerContext.Provider value={{ onClose }}>
                    {children}
                </DrawerContext.Provider>
            )}
        </AnimatePresence>
    );
};

// 3. Drawer Content (Handles portal, overlay, animation, and focus trap)
interface DrawerContentProps {
    children: React.ReactNode;
    className?: string;
}
export const DrawerContent = ({ children, className }: DrawerContentProps) => {
    const { onClose } = useDrawer();

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
                className="fixed inset-0 z-50"
                aria-modal="true"
                role="dialog"
            >
                {/* Overlay with fade animation */}
                <motion.div
                    className="absolute inset-0 bg-neutral-900/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />
                {/* Drawer Panel with slide animation */}
                <motion.div
                    className={`relative flex flex-col h-full ml-auto bg-white shadow-xl ${className} w-full max-w-lg`}
                    initial={{ x: '100%' }}
                    animate={{ x: '0%' }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    {children}
                </motion.div>
            </div>
        </FocusTrap>,
        document.body
    );
};

// 4. Drawer Sub-components for structure
export const DrawerHeader = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const { onClose } = useDrawer();
    return (
        <div
            className={`font-[Poppins] flex items-center justify-between p-5 border-b border-neutral-gray-100 ${className}`}
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

export const DrawerBody = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={`flex-grow p-5 overflow-y-auto ${className}`}>{children}</div>;
};

export const DrawerFooter = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={`flex justify-end gap-3 p-5 border-t border-neutral-gray-100 ${className}`}>
            {children}
        </div>
    );
};