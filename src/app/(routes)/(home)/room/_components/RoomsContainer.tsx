"use client";
import RoomItem from "@/components/rooms/room-item";
import { useChatContext } from "@/hooks/useChatContext";
import { useJoinRoomMutation } from "@/service/(rooms)/room/join-room.api";
import { useListRooms } from "@/service/(rooms)/room/list-rooms.api";
import { generateSoftHexColor } from "@/util/generateHexColor";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import toast from "react-hot-toast";

const RoomsContainer = () => {
  const [state, dispatch] = useChatContext();
  const router = useRouter();
  const joinRoomMutation = useJoinRoomMutation();
  const roomsQuery = useSuspenseQuery(useListRooms());
  const publicRooms = roomsQuery.data.results.filter(
    (room) => room.type === "PUBLIC"
  );
  const privateRooms = roomsQuery.data.results.filter(
    (room) => room.type === "PRIVATE"
  );

  const handleJoinRoom = (roomCode: string) => {
    joinRoomMutation.mutate(roomCode, {
      onSuccess: (data) => {
        if (data.status === 202) {
          dispatch({ type: "SET_IS_PENDING", payload: true });
        }
				// dispatch({type: "SET_CURRENT_ROOM", payload: data.room});
      },
    });
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Public Rooms</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-2">
          {publicRooms.length === 0 ? (
            <p className="">No public rooms available.</p>
          ) : null}
          {publicRooms.map((room, index) => (
            <RoomItem
              key={index}
              room={room}
              color={generateSoftHexColor()}
              handleJoinRoom={() => handleJoinRoom(room.code_invite)}
            />
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
            <RoomItem
              key={index}
              room={room}
              color={generateSoftHexColor()}
              handleJoinRoom={() => handleJoinRoom(room.code_invite)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(RoomsContainer);
