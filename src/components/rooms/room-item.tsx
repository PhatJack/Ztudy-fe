import { RoomSchema } from "@/lib/schemas/room/room.schema";
import React from "react";
import { Badge } from "../ui/badge";
import { PlusSquareIcon, User2 } from "lucide-react";
interface Props {
  room: RoomSchema;
  handleJoinRoom: () => void;
}

const RoomItem = ({ room, handleJoinRoom }: Props) => {
  return (
    <div
      onClick={handleJoinRoom}
      className="w-full h-auto rounded-xl relative p-3 overflow-hidden cursor-pointer border group"
    >
      <div className="w-full flex flex-col gap-3 h-full">
        <div
          className="h-[180px] rounded-lg" // style={
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
          <div className="w-full flex justify-between">
            <Badge variant={room.type === "PRIVATE" ? "danger" : "warning"}>
              <span>{room.type}</span>
            </Badge>
            <div className="">
              <Badge className="gap-1" variant={"secondary"}>
                <User2 size={12} />
                <span>{room.max_participants}</span>
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="w-full flex-1 flex flex-wrap items-center gap-3">
            <Badge variant={"warning"}>
              <span>{(room.category as any)?.name}</span>
            </Badge>
          </div>
        </div>
        {/* <span>
          {room.name} {room.id}
        </span> */}
      </div>
    </div>
  );
};

export default React.memo(RoomItem);
