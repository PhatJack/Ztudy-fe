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
        success:
          "border-transparent bg-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-800/30 text-emerald-900 dark:text-emerald-200",
        warning:
          "border-transparent bg-amber-100 dark:bg-amber-950/20 dark:border-amber-800/30 text-amber-900 dark:text-amber-20",
        info: "border-transparent bg-cyan-100 dark:bg-cyan-950/20 dark:border-cyan-800/30 text-cyan-900 dark:text-cyan-20",
        danger:
          "border-transparent bg-rose-100 dark:bg-rose-950/20 dark:border-rose-800/30 text-rose-900 dark:text-rose-20",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
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
