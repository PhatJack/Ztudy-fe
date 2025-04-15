import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

interface Props {
  src?: string | null;
  fallback?: string;
  className?: string;
  alt?: string;
}

const AvatarCustom = ({
  src,
  fallback = "ZT",
  className,
  alt = "ztudy",
}: Props) => {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={src || "/default.png"}
        alt={alt}
        className="object-cover"
        width={100}
        height={100}
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarCustom;
