import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Define the possible variants for the typography component
type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body1'
  | 'body1_default'
  | 'body2'
  | 'caption';

// Define the props for the component
export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The stylistic variant to use.
   */
  variant?: TypographyVariant;
  /**
   * The HTML element to render the text as. Defaults to a sensible tag for the variant.
   */
  as?: React.ElementType;
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * The content of the component.
   */
  children: React.ReactNode;
}

// A mapping from variant to a default HTML tag for semantic correctness.
const variantToTag: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body1: 'p',
  body1_default: 'p',
  body2: 'p',
  caption: 'span',
};

// A mapping from variant to its corresponding Tailwind CSS classes.
const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-3xl font-semibold text-text-header', // ~30px
  h2: 'text-2xl font-semibold text-text-header', // ~24px
  h3: 'text-xl font-medium text-text-header',    // ~20px
  h4: 'text-lg font-medium text-text-header',    // ~18px
  body1: 'text-base font-normal text-text-light', // ~16px
  body1_default: 'text-base', // ~16px
  body2: 'text-sm font-normal text-text-light',   // ~14px
  caption: 'text-xs font-normal text-text-light', // ~12px
};

/**
 * A standardized component for rendering all text content, ensuring consistent typography across the application.
 */
export const Typography = ({
  variant = 'body1',
  as,
  className,
  children,
  ...props
}: TypographyProps) => {
  // Use the 'as' prop if provided, otherwise default to the semantic tag for the variant.
  const Tag = as || variantToTag[variant];
  const mergedClassName = twMerge('w-6 h-6', className);

  return (
    <Tag
      {...props}
      className={twMerge('font-[Poppins]', variantClasses[variant], className)}
    >
      {children}
    </Tag>
  );
};