import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Icon, IconName } from '../general/Icon';

const inputWrapperVariants = cva(
  'font-[Poppins] flex items-center bg-white border rounded-lg transition-colors focus-within:ring-2 focus-within:ring-offset-2 disabled-within:bg-gray-100 disabled-within:cursor-not-allowed',
  {
    variants: {
      hasError: {
        true: 'border-danger-text focus-within:ring-danger-text',
        false: 'border-neutral-gray-100 focus-within:ring-primary',
      },
    },
    defaultVariants: {
      hasError: false,
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputWrapperVariants> {
  leftIcon?: IconName;
  rightIcon?: IconName;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, hasError, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const inputType = type === 'password' && isPasswordVisible ? 'text' : type;
    const isPassword = type === 'password';

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <div
        className={inputWrapperVariants({
          hasError,
          className: props.disabled ? 'disabled-within' : '',
        })}
      >
        {leftIcon && <Icon name={leftIcon} className="w-5 h-5 mx-3 text-text-light" />}
        <input
          type={inputType}
          className={`w-full h-12 bg-transparent text-base leading-6 font-light font-[Poppins] text-text-header placeholder:text-text-light focus:outline-none focus:ring-0 disabled:cursor-not-allowed ${leftIcon ? 'pl-0' : 'pl-4'
            } ${rightIcon || isPassword ? 'pr-0' : 'pr-4'}`}
          ref={ref}
          {...props}
        />
        {isPassword ? (
          <button type="button" onClick={togglePasswordVisibility} className="p-3">
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              className="w-5 h-5 text-text-light"
            />
          </button>
        ) : (
          rightIcon && <Icon name={rightIcon} className="w-5 h-5 mx-3 text-text-light" />
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';