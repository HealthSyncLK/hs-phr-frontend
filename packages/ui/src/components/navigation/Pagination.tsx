import React from 'react';
import { useMemo } from 'react';
import { Button } from '../general/Button';
import { Icon } from '../general/Icon';

const DOTS = '...';

const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

// The logic hook for calculating the pagination range
export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
}: {
    totalCount: number;
    pageSize: number;
    siblingCount?: number;
    currentPage: number;
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 5;

        // Case 1: If the number of pages is less than the page numbers we want to show
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        // Case 2: No left dots to show, but rights dots to be shown
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);
            return [...leftRange, DOTS, totalPageCount];
        }

        // Case 3: No right dots to show, but left dots to be shown
        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return [firstPageIndex, DOTS, ...rightRange];
        }

        // Case 4: Both left and right dots to be shown
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }

        return []; // Default return
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};

// The UI component
export interface PaginationProps {
    onPageChange: (page: number) => void;
    totalCount: number;
    currentPage: number;
    pageSize: number;
    siblingCount?: number;
    className?: string;
}

export const Pagination = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
}: PaginationProps) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <nav className={`flex items-center justify-between ${className}`}>
            <div className="text-sm text-text-light">
                Showing page {currentPage} of {lastPage}
            </div>
            <ul className="inline-flex items-center -space-x-px">
                <li>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={onPrevious}
                        disabled={currentPage === 1}
                        className="rounded-r-none"
                    >
                        <Icon name="chevron-left" className="w-4 h-4" />
                    </Button>
                </li>
                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return <li key={`${DOTS}-${index}`} className="px-4 py-2">...</li>;
                    }
                    return (
                        <li key={pageNumber}>
                            <Button
                                variant={pageNumber === currentPage ? 'primary' : 'secondary'}
                                size="sm"
                                onClick={() => onPageChange(pageNumber as number)}
                                className="rounded-none"
                            >
                                {pageNumber}
                            </Button>
                        </li>
                    );
                })}
                <li>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={onNext}
                        disabled={currentPage === lastPage}
                        className="rounded-l-none"
                    >
                        <Icon name="chevron-right" className="w-4 h-4" />
                    </Button>
                </li>
            </ul>
        </nav>
    );
};