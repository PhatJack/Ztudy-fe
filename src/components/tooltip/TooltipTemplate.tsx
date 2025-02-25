import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props {
  children: React.ReactNode;
  content: string;
  triggerAsChild?: boolean;
}

function TooltipTemplate({ children, content, triggerAsChild = true }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild={triggerAsChild}>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}
export default React.memo(TooltipTemplate);
