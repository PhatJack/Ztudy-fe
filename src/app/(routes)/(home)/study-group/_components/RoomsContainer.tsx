"use client";
import CopyButton from "@/components/button/CopyButton";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Badge } from "@/components/ui/badge";
import { useListStudyGroups } from "@/service/(study-group)/list-study-groups.api";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

const RoomsContainer = () => {
  const roomsQuery = useSuspenseQuery(useListStudyGroups());
  const publicRooms = roomsQuery.data.results.filter(
    (room) => room.type === "PUBLIC"
  );
  const privateRooms = roomsQuery.data.results.filter(
    (room) => room.type === "PRIVATE"
  );

  return (
    <div className="flex flex-col space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Public Rooms</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-2">
          {publicRooms.length === 0 ? (
            <p className="">No public rooms available.</p>
          ) : null}
          {publicRooms.map((room, index) => (
            <div
              key={index}
              className="w-full h-[200px] rounded-md bg-blue-300/50 relative p-3 overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="w-full flex justify-between items-center max-h-6">
                <Badge
                  variant={"success"}
                  className="gap-2 px-1.5 rounded-full"
                >
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
                    <CopyButton text="Hello world" />
                  </div>
                </TooltipTemplate>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Private Rooms</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-2">
          {privateRooms.length === 0 ? (
            <p className="">No private rooms available.</p>
          ) : null}
          {privateRooms.map((room, index) => (
            <div
              key={index}
              className="w-full h-[200px] rounded-md bg-blue-300/50 relative p-3"
            >
              <div className="w-full flex justify-between items-center max-h-6">
                <Badge
                  variant={"success"}
                  className="gap-2 px-1.5 rounded-full"
                >
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(RoomsContainer);
