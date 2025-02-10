import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className="inline-flex items-center justify-center tracking-[0.05rem] bg-black rounded-full text-white px-4 py-2 gap-3 font-medium uppercase whitespace-nowrap hover:bg-neutral-100 hover:text-black transition-colors duration-200"
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
