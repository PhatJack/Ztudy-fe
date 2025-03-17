import { RoomSchema } from "@/lib/schemas/room/room.schema";
import React from "react";
import { Badge } from "../ui/badge";
import TooltipTemplate from "../tooltip/TooltipTemplate";
import CopyButton from "../button/CopyButton";

interface Props {
  room: RoomSchema;
}

const RoomItem = ({ room }: Props) => {
  return (
    <div className="w-full h-[200px] rounded-md bg-cyan-500 relative p-3 overflow-hidden flex flex-col cursor-pointer">
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
      <div className="w-full h-full flex items-end justify-between">
        <TooltipTemplate variant={"black"} content="Copy joining link">
          <div className="">
            <CopyButton
              text={`${process.env.NEXT_PUBLIC_API_URL + room.code_invite}`}
            />
          </div>
        </TooltipTemplate>
      </div>
    </div>
  );
};

export default RoomItem;
