import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

interface Props {
  src?: string;
  fallback?: string;
  className?: string;
}

const AvatarCustom = ({ src, fallback = "ZT", className }: Props) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} className="object-cover" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarCustom;
