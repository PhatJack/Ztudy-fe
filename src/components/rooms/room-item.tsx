import { RoomSchema } from "@/lib/schemas/room/room.schema";
import React from "react";
import { Badge } from "../ui/badge";
interface Props {
  room: RoomSchema;
  color?: string;
  handleJoinRoom: (roomCode: number) => void;
}

const RoomItem = ({ room, color, handleJoinRoom }: Props) => {
  return (
    <div
      onClick={() => handleJoinRoom(room.id)}
      style={
        room.thumbnail
          ? {
              backgroundImage: `url(${room.thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {
              backgroundColor: color,
            }
      }
      className="w-full h-[200px] rounded-md relative p-3 overflow-hidden flex flex-col cursor-pointer border border-gray-200"
    >
      <div className="w-full flex justify-between items-center max-h-6">
        <Badge variant={"success"} className="gap-2 px-1.5 rounded-full">
          <span className="size-2.5 aspect-square rounded-full bg-emerald-500 animate-pulse-custom"></span>
          <span className="text-xs font-semibold">
            {room.is_active ? "IS ACTIVE" : "CLOSED"}
          </span>
        </Badge>
        <Badge variant={"secondary"}>
          <span>{room.type}</span>
        </Badge>
      </div>
    </div>
  );
};

export default RoomItem;
