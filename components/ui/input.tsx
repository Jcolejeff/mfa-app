import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils/css';

const inputVariants = cva(
  'flex w-full text-text rounded-sm border bg-transparent shadow-sm focus-visible:ring-ring transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input placeholder:text-muted-foreground',
        filled: 'bg-inputFill border-border-1 placeholder:text-muted-foreground',
        unstyled:
          'border-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-transparent focus-visible:outline-none',
      },
      customSize: {
        default: 'px-[13px] text-[calc(13_/_16_*_1rem)] h-[34px]',
        sm: 'h-[30px] px-[13px] text-xs',
        lg: 'h-10 px-[17px] text-[calc(13_/_16_*_1rem)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      customSize: 'default',
    },
  },
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, customSize, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(className, inputVariants({ variant, customSize, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input, inputVariants };
