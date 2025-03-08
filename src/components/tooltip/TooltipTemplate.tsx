import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Define the variants for TooltipContent using CVA
const tooltipVariants = cva(
  "max-w-48 text-center text-white p-2 rounded-md", // Base styles
  {
    variants: {
      variant: {
        default: "bg-gray-800",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-emerald-600",
        danger: "bg-destructive text-destructive-foreground",
        information: "bg-cyan-600",
        warning: "bg-amber-600",
        black: "bg-black",
        white: "bg-white text-black",
        accent: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Extend Props with VariantProps from tooltipVariants
interface Props extends VariantProps<typeof tooltipVariants> {
  children: React.ReactNode;
  content: React.ReactNode;
  triggerAsChild?: boolean;
  className?: string;
}

function TooltipTemplate({
  children,
  content,
  triggerAsChild = true,
  className,
  variant, // Extracted from VariantProps
}: Props) {
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild={triggerAsChild}>{children}</TooltipTrigger>
      <TooltipContent
        className={cn(tooltipVariants({ variant }), className)} // Combine CVA variants with custom className
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

export default React.memo(TooltipTemplate);
