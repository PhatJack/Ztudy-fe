import { Badge } from "@/components/ui/badge";
import { Role } from "@/contexts/ChatContext";
import { Crown, Shield, User } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  role: Role;
}

const getRoleConfig = (role: Role) => {
  switch (role) {
    case "ADMIN":
      return {
        icon: <Crown className="w-3 h-3" />,
        className: "bg-rose-100 text-rose-700 hover:bg-rose-200",
        label: "Admin",
      };
    case "MODERATOR":
      return {
        icon: <Shield className="w-3 h-3" />,
        className: "bg-amber-100 text-amber-700 hover:bg-amber-200",
        label: "Mod",
      };
    case "USER":
      return {
        icon: <User className="w-3 h-3" />,
        className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
        label: "Member",
      };
  }
};

const RoleBadge = ({ role }: Props) => {
  const config = getRoleConfig(role);

  return (
    <Badge variant="outline" className={cn("gap-1 font-medium border-0", config.className)}>
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default RoleBadge; 