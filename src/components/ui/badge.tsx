import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        black: "border-transparent bg-black text-white shadow-sm hover:bg-black/90",
        white: "border-transparent bg-white text-black shadow-sm hover:bg-white/90",
        success:
          "border-transparent bg-emerald-100 text-emerald-900 shadow-sm hover:bg-emerald-900/90 hover:text-emerald-100",
        warning:
          "border-transparent bg-amber-100 text-amber-900 shadow-sm hover:bg-amber-900/90 hover:text-amber-100",
        danger:
          "border-transparent bg-rose-100 text-rose-900 shadow-sm hover:bg-rose-900/90 hover:text-rose-100",
        info: "border-transparent bg-cyan-100 text-cyan-900 shadow-sm hover:bg-cyan-900/90 hover:text-cyan-100",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
