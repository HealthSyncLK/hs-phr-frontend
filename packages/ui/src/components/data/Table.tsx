import React, { useState } from 'react';
import { CustomIcon } from '../general/CustomIcon';

// The main container for a page section that includes a table
const TableContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`flex flex-col gap-6 bg-white rounded-xl p-5 ${className}`}>
        {children}
    </div>
);

// The <table> element itself
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
    ({ className, ...props }, ref) => (
        <div className="relative w-full overflow-auto">
            <table ref={ref} className={`w-full text-sm text-left ${className}`} {...props} />
        </div>
    )
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => (
        <thead ref={ref} className={`[&_tr]:border-b [&_tr]:border-neutral-gray-100 ${className}`} {...props} />
    )
);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => (
        <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
    )
);
TableBody.displayName = 'TableBody';

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
    ({ className, ...props }, ref) => (
        <th ref={ref} className={`h-11 px-6 text-left align-middle font-semibold text-sm text-text-header ${className}`} {...props} />
    )
);
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
    ({ className, ...props }, ref) => (
        <td ref={ref} className={`px-6 py-4 align-middle font-normal text-sm text-text-header ${className}`} {...props} />
    )
);
TableCell.displayName = 'TableCell';

// This is the container for the detailed view inside an expanded row
const TableExpandableContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={`p-4 border border-neutral-gray-100 rounded-xl ${className}`}>
            {children}
        </div>
    );
};
TableExpandableContent.displayName = 'TableExpandableContent';

const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement> & { isExpandable?: boolean }
>(({ className, children, isExpandable = false, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const childrenArray = React.Children.toArray(children);
    const mainCells = childrenArray.filter(
        (child) => (child as React.ReactElement).type !== TableExpandableContent
    );
    const expandableContent = childrenArray.find(
        (child) => (child as React.ReactElement).type === TableExpandableContent
    );

    const colSpan = mainCells.length + (isExpandable ? 1 : 0);

    return (
        <>
            <tr
                ref={ref}
                // STYLE CHANGE #1: Conditionally apply the bottom border
                className={`transition-colors hover:bg-neutral-50/50 data-[state=selected]:bg-neutral-100 ${isExpandable ? 'cursor-pointer' : ''
                    } ${!isExpanded ? 'border-b border-neutral-gray-100' : ''} ${className}`}
                onClick={isExpandable ? () => setIsExpanded(!isExpanded) : undefined}
                {...props}
            >
                {isExpandable && (
                    <TableCell className="w-12">
                        <CustomIcon
                            name="chevron-down"
                            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                    </TableCell>
                )}
                {mainCells}
            </tr>

            {isExpandable && isExpanded && (
                <tr className="bg-white even:bg-neutral-50">
                    {/* STYLE CHANGE #2: Added vertical padding (py-4) for spacing */}
                    <td colSpan={colSpan} className="px-12 py-4">
                        {expandableContent}
                    </td>
                </tr>
            )}
        </>
    );
});
TableRow.displayName = 'TableRow';

export {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableExpandableContent,
};