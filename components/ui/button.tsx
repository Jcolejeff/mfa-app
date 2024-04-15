import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils/css';

const buttonVariants = cva(
  `flex items-center text-text justify-center gap-[7px] rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 `,
  {
    variants: {
      variant: {
        primary: 'rounded bg-accent-2 hover:bg-accent-3 shadow-button',
        default: 'bg-[var(--primary)] text-white',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-input bg-transparent',
        secondary: 'bg-secondary text-secondary-foreground',
        ghost: '',
        link: 'text-primary underline-offset-4',
        dashed: 'border border-dashed border-[#393939]',
      },
      size: {
        default: 'px-3 py-2',
        sm: 'rounded-md py-2 px-3 text-xs',
        lg: 'rounded-md py-3 px-8',
        icon: 'h-max w-max p-1 rounded-md',
        none: 'h-max w-max',
      },
      isFullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      isFullWidth: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size, isFullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, isFullWidth, className }))} ref={ref} {...props} />;
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
