import React, { createContext, useContext, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Context setup remains the same...
interface TabsContextType {
    activeTab: string;
    setActiveTab: (value: string) => void;
}
const TabsContext = createContext<TabsContextType | undefined>(undefined);
const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('useTabs must be used within a <Tabs> provider');
    }
    return context;
};

// Main Tabs Wrapper remains the same...
interface TabsProps {
    defaultValue: string;
    children: React.ReactNode;
    className?: string;
}
export const Tabs = ({ defaultValue, children, className }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultValue);
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
};

// TabsList remains the same...
export const TabsList = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={`font-[Poppins] flex items-center border-b border-neutral-gray-100 ${className}`}>
            {children}
        </div>
    );
};

// --- CHANGES ARE HERE ---
const tabsTriggerVariants = cva(
    // Use padding from Figma spec (10px vertical, 16px horizontal)
    'font-[Poppins] px-4 py-2.5 font-normal text-base transition-colors',
    {
        variants: {
            isActive: {
                // Use 1.5px border and the new primary-600 color
                true: 'border-b-[1.5px] border-primary-600 text-primary',
                // Use the new muted text color for inactive tabs
                false: 'border-b-[1.5px] border-transparent text-text-muted hover:text-text-header',
            },
        },
    }
);
// --- END OF CHANGES ---

interface TabsTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
    value: string;
}

export const TabsTrigger = React.forwardRef<
    HTMLButtonElement,
    TabsTriggerProps
>(({ className, value, children, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabs();
    const isActive = activeTab === value;

    return (
        <button
            ref={ref}
            className={tabsTriggerVariants({ isActive, className })}
            onClick={() => setActiveTab(value)}
            {...props}
        >
            {children}
        </button>
    );
});
TabsTrigger.displayName = 'TabsTrigger';

// TabsContent remains the same...
interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}
export const TabsContent = ({ value, children, className }: TabsContentProps) => {
    const { activeTab } = useTabs();
    if (activeTab !== value) return null;
    return <div className={`font-[Poppins] mt-6 ${className}`}>{children}</div>;
};