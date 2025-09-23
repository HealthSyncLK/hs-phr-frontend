import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface DecorativeImageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string; // main image
  alt?: string; // main image alt
  cornerSrc?: string; // small corner circle image
  cornerAlt?: string; // small corner circle alt
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
      className,
      ...props
    },
    ref
  ) => {
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
      </div>
    );
  }
);

DecorativeImage.displayName = 'DecorativeImage';
