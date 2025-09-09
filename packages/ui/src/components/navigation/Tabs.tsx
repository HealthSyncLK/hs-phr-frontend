import React, { createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// 1. Context to share the tabs state
interface TabsContextType {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('This component must be used within a <Tabs> provider');
    }
    return context;
};

// 2. Main Tabs Wrapper Component (NOW CORRECTED)
export interface TabsProps {
    value: string; // Changed from defaultValue to value for controlled state
    onValueChange: (value: string) => void; // ADDED this prop for the callback
    children: React.ReactNode;
    className?: string;
}

export const Tabs = ({ value, onValueChange, children, className }: TabsProps) => {
    // REMOVED useState. The state is now controlled by the parent component.
    return (
        <TabsContext.Provider value={{ activeTab: value, setActiveTab: onValueChange }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
};

// 3. TabsList Component (No changes needed)
export const TabsList = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={`flex items-center border-b border-neutral-gray-100 ${className}`}
        >
            {children}
        </div>
    );
};

// 4. TabsTrigger Component (No changes needed)
const tabsTriggerVariants = cva(
    'px-4 py-2.5 font-normal text-base border-b-2 transition-colors',
    {
        variants: {
            isActive: {
                true: 'border-primary text-primary',
                false: 'border-transparent text-text-light hover:text-text-header',
            },
        },
    }
);

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

// 5. TabsContent Component (No changes needed)
interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

export const TabsContent = ({ value, children, className }: TabsContentProps) => {
    const { activeTab } = useTabs();
    const isActive = activeTab === value;

    if (!isActive) return null;

    return <div className={`mt-6 ${className}`}>{children}</div>;
};