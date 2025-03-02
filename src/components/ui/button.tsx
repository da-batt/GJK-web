import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex w-fit items-center justify-center tracking-[0.05rem] rounded-full px-4 py-2 gap-3 font-semibold uppercase whitespace-nowrap transition-colors duration-200 text-sm border-2 border-black",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-neutral-50 hover:text-black",
        outline: "text-black hover:bg-neutral-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, variant, disabled, ...props }, ref) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={cn(
          buttonVariants({ variant }),
          className,
          disabled &&
            "cursor-not-allowed text-neutral-200 border-neutral-200 bg-transparent pointer-events-none",
        )}
        disabled={!asChild ? disabled : undefined}
        aria-disabled={asChild ? disabled : undefined}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
