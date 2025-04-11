import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  size?: number;
}

const LoadingSpinner = ({ className,size = 24 }: Props) => {
  return (
    <span className={cn("w-full flex justify-center items-center", className)}>
      <Loader2 size={size} className="animate-spin text-primary"/>
    </span>
  );
};

export default React.memo(LoadingSpinner);
