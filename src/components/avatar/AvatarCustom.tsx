import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  fallback?: string;
  className?: string;
}

const AvatarCustom = ({ src, fallback = "ZT", className }: Props) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarCustom;
