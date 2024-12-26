import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
    'flex items-center justify-center gap-[10px] text-nowrap px-2 py-5 text-[14px] font-extrabold rounded-[5px] leading-[19.8px] transition-colors duration-150 xs:py-6 xs:text-[18px]',
    {
        variants: {
            variant: {
                primary:
                    'w-full bg-[#814BFF] text-[#FFFFFF] hover:bg-[#814BFF] active:bg-[#B1C9FF]',
                primaryFull:
                    'w-full bg-[#814BFF] text-[#FFFFFF] hover:bg-[#814BFF] active:bg-[#B1C9FF]',
                secondary:
                    'w-full max-h-[72px] rounded-[10px] border border-[#848484] bg-white text-[#848484] font-semibold hover:border-[#4981FF] hover:bg-[#4981FF] hover:text-white active:bg-[#004FFF] active:text-white',
                whiteFull:
                    'w-full max-h-[70px] border border-[#004FFF] bg-white px-10 text-base font-semibold text-[#004FFF] hover:bg-[#CEDDFF] active:bg-[#004FFF] active:text-white',
            },
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        loading?: boolean;
        iconLeft?: React.ReactNode;
        iconRight?: React.ReactNode;
    };

const Button: React.FC<ButtonProps> = ({
    variant,
    loading,
    className,
    disabled,
    iconLeft,
    iconRight,
    children,
    ...rest
}) => {
    const spinnerColor = variant === 'primary' || variant === 'primaryFull' ? '#FFFFFF' : '#004FFF';

    return (
        <button
            disabled={disabled || loading}
            {...rest}
            className={cn(buttonVariants({ variant }), className, disabled && 'opacity-50')}
        >
            {loading ? (
                <LoadingSpinner color={spinnerColor} />
            ) : (
                <>
                    {iconLeft}
                    {children}
                    {iconRight && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">{iconRight}</div>
                    )}
                </>
            )}
        </button>
    );
};

type LoadingSpinnerProps = {
    color?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ color = '#004FFF' }) => {
    return (
        <div className="flex items-center justify-center">
            <svg
                className="size-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={{ color }}
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </div>
    );
};

export default Button;
