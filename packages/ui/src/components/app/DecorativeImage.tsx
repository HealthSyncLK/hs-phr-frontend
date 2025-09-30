import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface DecorativeImageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string; // main image
  alt?: string; // main image alt
  cornerSrc?: string; // small corner circle image
  cornerAlt?: string; // small corner circle alt
  speechBubbleText?: string; // speech bubble text
  showSpeechBubble?: boolean; // whether to show speech bubble
  speechBubblePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'; // speech bubble position
  className?: string; // Class to control responsive sizing
}

export const DecorativeImage = React.forwardRef<
  HTMLDivElement,
  DecorativeImageProps
>(
  (
    {
      src,
      alt = 'Banner Image',
      cornerSrc,
      cornerAlt = 'Logo',
      speechBubbleText,
      showSpeechBubble = false,
      speechBubblePosition = 'top-right',
      className,
      ...props
    },
    ref
  ) => {

    // Get speech bubble position classes
    const getSpeechBubbleClasses = () => {
      const baseClasses = 'absolute z-20 transition-all duration-500 ease-out';
      switch (speechBubblePosition) {
        case 'top-right':
          return `${baseClasses} top-0 right-0 left-5 transform translate-x-1/4 -translate-y-1/4`;
        case 'top-left':
          return `${baseClasses} top-0 left-0 transform -translate-x-1/4 -translate-y-1/4`;
        case 'bottom-right':
          return `${baseClasses} bottom-0 right-0 transform translate-x-1/4 translate-y-1/4`;
        case 'bottom-left':
          return `${baseClasses} bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4`;
        default:
          return `${baseClasses} top-0 right-0 transform translate-x-1/4 -translate-y-1/4`;
      }
    };

    // Get speech bubble tail classes and styles based on position
    const getTailConfig = () => {
      switch (speechBubblePosition) {
        case 'top-right':
          return {
            className:
              'absolute bottom-0 left-8 transform translate-y-full neutral-100',
            style: {
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '12px solid rgb(013, 175, 180)', // pacific blue
            },
          };
        case 'top-left':
          return {
            className: 'absolute bottom-0 right-8 transform translate-y-full',
            style: {
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '12px solid rgb(013, 175, 180)', // teal-500
            },
          };
        case 'bottom-right':
          return {
            className: 'absolute top-0 left-8 transform -translate-y-full',
            style: {
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderBottom: '12px solid rgb(013, 175, 180)', // teal-500
            },
          };
        case 'bottom-left':
          return {
            className: 'absolute top-0 right-8 transform -translate-y-full',
            style: {
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderBottom: '12px solid rgb(013, 175, 180)', // teal-500
            },
          };
        default:
          return {
            className: 'absolute bottom-0 left-8 transform translate-y-full',
            style: {
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '12px solid rgb(013, 175, 180)', // teal-500
            },
          };
      }
    };

    // The main container for the circular image and its corner logo.
    const mergedClassName = twMerge(
      'relative rounded-full aspect-square ' +
        'w-64 h-64 ' + // Base size: 256px
        'lg:w-80 lg:h-80 ' + // Large: 320px
        'xl:w-[32rem] xl:h-[32rem] ' + // XL: 512px
        '2xl:w-[36rem] 2xl:h-[36rem] ' + // 2XL: 576px 
        'transition-all duration-500 ease-out',
      className
    );

    return (
      <div ref={ref} {...props} className={mergedClassName}>
        {/* Main circular image container */}
        <div className="w-full h-full rounded-full relative overflow-hidden">
          {/* Outer border ring */}
          <div className="absolute inset-0 rounded-full border-8 lg:border-20 xl:border-24 2xl:border-26 border-primary"></div>

          {/* Image container with inner border */}
          <div className="absolute inset-4 lg:inset-6 xl:inset-8 2xl:inset-10 rounded-full overflow-hidden">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover rounded-full transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </div>

        {/* Corner logo container */}
        {cornerSrc && (
          <div
            className="absolute bg-white rounded-full flex items-center justify-center shadow-lg border-4 lg:border-6 xl:border-8 2xl:border-10 border-primary transition-all duration-500 ease-out"
            style={{
              width: '30%',
              height: '30%',
              bottom: '8%',
              left: '-2%',
              transform: 'translate(0, 0)',
            }}
          >
            <img
              src={cornerSrc}
              alt={cornerAlt}
              className="w-3/5 h-3/5 object-contain rounded-full transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
        )}

        {/* Speech bubble */}
        {showSpeechBubble && speechBubbleText && (
          <div className={getSpeechBubbleClasses()}>
            {/* Speech bubble container */}
            <div className="font-[Poppins] relative bg-neutral-100 text-left text-text-header px-4 py-3 lg:px-5 lg:py-4 xl:px-6 xl:py-5 rounded-2xl shadow-lg max-w-xs lg:max-w-sm xl:max-w-md">
              {/* Speech bubble text */}
              <p className="text-sm lg:text-sm xl:text-lg font-medium leading-relaxed">
                {speechBubbleText}
              </p>

              {/* Speech bubble tail */}
              <div
                className={getTailConfig().className}
                style={getTailConfig().style}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

DecorativeImage.displayName = 'DecorativeImage';
