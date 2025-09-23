import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CustomIcon, IconName } from './CustomIcon';
import { LoaderIcon } from '../../icons/LoaderIcon'; // We'll create this small icon component

const buttonVariants = cva(
  'font-[Poppins] inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-hover focus:ring-primary',
        secondary:
          'bg-white text-text-header border border-neutral-gray-100 hover:bg-gray-50 focus:ring-primary',
        tertiary: 'bg-transparent text-primary hover:bg-primary/10 focus:ring-primary',
        danger:
          'bg-danger text-danger-text hover:bg-danger-hover focus:ring-danger-text',
        ghost:
          'bg-neutral-50 text-text-header hover:bg-neutral-100 focus:ring-primary font-normal',
      },
      size: {
        default: 'h-12 px-6 py-3 text-base',
        sm: 'h-10 px-4 py-2 text-sm',
        lg: 'h-14 px-8 py-4 text-lg',
        xs: 'h-8 px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  leftIcon?: IconName;
  rightIcon?: IconName;
  isLoading?: boolean;
}

// You can create a simple loader icon component like this
// in your ui/src/icons/ folder
// const LoaderIcon = (props) => ( <svg className="animate-spin" ... /> );

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, children, leftIcon, rightIcon, isLoading, disabled, ...props },
    ref
  ) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />}
        {!isLoading && leftIcon && <CustomIcon name={leftIcon} className="w-5 h-5 mr-2" />}
        {children}
        {!isLoading && rightIcon && <CustomIcon name={rightIcon} className="w-5 h-5 ml-2" />}
      </button>
    );
  }
);

Button.displayName = 'Button';