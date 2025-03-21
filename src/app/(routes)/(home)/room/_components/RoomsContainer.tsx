"use client";
import RoomItem from "@/components/rooms/room-item";
import { useListRooms } from "@/service/(rooms)/room/list-rooms.api";
import { generateSoftHexColor } from "@/util/generateHexColor";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

const RoomsContainer = () => {
  const roomsQuery = useSuspenseQuery(useListRooms());
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
            <RoomItem key={index} room={room} color={generateSoftHexColor()} />
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
            <RoomItem key={index} room={room} color={generateSoftHexColor()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(RoomsContainer);
