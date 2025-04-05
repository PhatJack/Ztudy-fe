import { RoomSchema } from "@/lib/schemas/room/room.schema";
import React from "react";
import { Badge } from "../ui/badge";
import { User2, Lock, Globe, Copy } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface Props {
  showType?: boolean;
  room: RoomSchema;
  handleJoinRoom: () => void;
}

const RoomItem = ({ room, handleJoinRoom, showType = false }: Props) => {
  const getRoomTypeConfig = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'private':
        return {
          icon: <Lock size={14} className="mr-1" />,
          className: "bg-rose-100/90 text-rose-700 backdrop-blur-sm hover:bg-rose-200/90",
          label: 'Private'
        };
      case 'public':
        return {
          icon: <Globe size={14} className="mr-1" />,
          className: "bg-emerald-100/90 text-emerald-700 backdrop-blur-sm hover:bg-emerald-200/90",
          label: 'Public'
        };
      default:
        return {
          icon: null,
          className: "bg-slate-100/90 text-slate-700 backdrop-blur-sm",
          label: type
        };
    }
  };

  const handleCopyInviteCode = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent room click event
    navigator.clipboard.writeText(room.code_invite || "");
    toast.success("Invite code copied to clipboard!");
  };

  const typeConfig = getRoomTypeConfig(room.type);

  return (
    <div
      onClick={handleJoinRoom}
      className="w-full h-auto rounded-xl relative p-3 overflow-hidden cursor-pointer border group"
    >
      <div className="w-full flex flex-col gap-3 h-full">
        <div
          className="h-[180px] rounded-lg relative"
          style={
            room.thumbnail
              ? {
                  backgroundImage: `url(${room.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {
                  backgroundColor: "#92BFB1",
                }
          }
        >
          {showType && room.type && (
            <Badge
              className={`absolute top-2 left-2 flex items-center ${typeConfig.className}`}
            >
              {typeConfig.icon}
              {typeConfig.label}
            </Badge>
          )}
          
          {room.code_invite && (
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2 h-6 w-6 bg-white/90 backdrop-blur-sm hover:bg-white/80"
              onClick={handleCopyInviteCode}
              title="Copy invite code"
            >
              <Copy size={14} />
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-base line-clamp-1">{room.name}</h3>
          <div className="flex justify-between items-center gap-3">
            <Badge variant={"warning"}>
              <span>{(room.category as any)?.name}</span>
            </Badge>
            <Badge className="gap-1" variant={"secondary"}>
              <User2 size={12} />
              <span>{room.max_participants}</span>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RoomItem);
