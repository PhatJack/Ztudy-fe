"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Copy, Globe, Lock, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useChatContext } from "@/hooks/useChatContext";

const RoomHeader = () => {
  const { currentRoom } = useChatContext();

  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(currentRoom?.code_invite || "");
    toast.success("Room code copied to clipboard!");
  };

  const getRoomTypeConfig = (type: string | undefined) => {
    switch (type?.toLowerCase()) {
      case "private":
        return {
          icon: <Lock className="h-3 w-3" />,
          className:
            "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/50 dark:text-rose-200 dark:hover:bg-rose-900/75",
          label: "Private",
        };
      case "public":
        return {
          icon: <Globe className="h-3 w-3" />,
          className:
            "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-200 dark:hover:bg-emerald-900/75",
          label: "Public",
        };
      default:
        return null;
    }
  };

  const typeConfig = getRoomTypeConfig(currentRoom?.type);

  return (
    <div className="w-full flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-foreground">
          {currentRoom?.name}
        </h1>
        <div className="flex items-center gap-2">
          {typeConfig && (
            <Badge
              variant="secondary"
              className={cn("gap-1 text-xs py-0.5", typeConfig.className)}
            >
              {typeConfig.icon}
              {typeConfig.label}
            </Badge>
          )}
          {currentRoom?.category && (
            <Badge
              variant="outline"
              className="gap-1 text-xs py-0.5 text-muted-foreground"
            >
              <Hash className="h-3 w-3" />
              {currentRoom.category.name}
            </Badge>
          )}
        </div>
      </div>
      <TooltipTemplate content="Copy room code">
        <Button
          onClick={handleCopyRoomCode}
          variant="outline"
          size="sm"
          className="gap-1.5 h-8 text-xs"
        >
          <span className="font-medium">{currentRoom?.code_invite}</span>
          <Copy className="h-3 w-3" />
        </Button>
      </TooltipTemplate>
    </div>
  );
};

export default RoomHeader;
