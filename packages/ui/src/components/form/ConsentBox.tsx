import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Icon } from '@repo/ui/components/general/Icon';

interface ConsentBoxProps {
  title: string;
  content: string | React.ReactNode;
  maxHeight?: string;
}

export interface ConsentBoxRef {
  getPrintContent: () => React.ReactNode;
}

export const ConsentBox = forwardRef<ConsentBoxRef, ConsentBoxProps>(
  ({
      title,
      content,
      maxHeight = '200px', // default collapsed height
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Expose the full content for printing
    useImperativeHandle(ref, () => ({
      getPrintContent: () => (
        <div className="print-content">
          <h3 className="font-medium text-lg text-text-header mb-4">{title}</h3>
          <div className="text-sm space-y-2">{content}</div>
        </div>
      ),
    }));

    return (
      <>
        {/* Normal / collapsed mode */}
        {!isExpanded && (
          <div className="w-full relative">
            {/* Expand button (arrow icon) */}
            <button
              onClick={() => setIsExpanded(true)}
              className="absolute top-2 right-2 p-1 mr-3 rounded hover:bg-neutral-100">
              <Icon name="expand" className="w-5 h-5 text-text-header"/>
            </button>
            <div
              className="font-[Poppins] flex flex-col gap-2.5 bg-white border border-neutral-gray-100 rounded-lg p-6
                       leading-relaxed text-text-light overflow-y-auto custom-scroll-bar"
              style={{ maxHeight }}>
              <h3 className="font-medium text-text-header mb-2">{title}</h3>
              <div className="text-sm space-y-2">{content}</div>
            </div>
          </div>
        )}

        {/* Popup overlay when expanded */}
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-3xl p-6 overflow-y-auto max-h-[80vh]">
              {/* Close button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-3 right-3 p-2 rounded hover:bg-neutral-100">
                <Icon name="x" className="w-6 h-6 text-text-header"/>
              </button>
              <h3 className="font-medium text-lg text-text-header mb-4">
                {title}
              </h3>
              <div className="text-sm space-y-2">{content}</div>
            </div>
          </div>
        )}
      </>
    );
  }
);
