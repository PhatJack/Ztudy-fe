"use client";
import LoadingSpinner from "@/components/loading/loading-spinner";
import RoomItem from "@/components/rooms/room-item";
import { useRoomWebSocket } from "@/contexts/WebSocketContext";
import { useChatContext } from "@/hooks/useChatContext";
import { useJoinRoomMutation } from "@/service/(rooms)/room/join-room.api";
import { useListSuggestedRooms } from "@/service/(rooms)/room/list-suggested-rooms.api";
import { useListTrendingRooms } from "@/service/(rooms)/room/list-trending-rooms.api";
import { useQueries } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import React, { useMemo } from "react";
import AddNewRoomModal from "./AddNewRoomModal";

const RoomsContainer = () => {
  const { connectChatSocket } = useRoomWebSocket();
  const { setIsPending, setCurrentRoom, setIsAdmin } = useChatContext();
  const router = useRouter();
  const joinRoomMutation = useJoinRoomMutation();
  const [suggestedRoomsQuery, trendingRoomsQuery] = useQueries({
    queries: [
      useListSuggestedRooms({ expand: "category" }),
      useListTrendingRooms({ expand: "category" }),
    ],
  });
  const { suggestedRooms, trendingRooms } = useMemo(
    () => ({
      suggestedRooms: suggestedRoomsQuery.data?.results || [],
      trendingRooms: trendingRoomsQuery.data?.results || [],
    }),
    [suggestedRoomsQuery.data, trendingRoomsQuery.data]
  );

  const handleJoinRoom = (roomCode: string) => {
    joinRoomMutation.mutate(roomCode.trim(), {
      onSuccess: (data) => {
        console.log(data);
        if (data.status === 202) {
          setIsPending(true);
        }
        setCurrentRoom(data.data.room);
        setIsAdmin(data.data.participant.is_admin);
        connectChatSocket(roomCode.trim());
        router.push(`/room/${roomCode}`);
      },
    });
  };

  const isLoadingSuggested = suggestedRoomsQuery.isLoading;
  const isLoadingTrending = trendingRoomsQuery.isLoading;

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Suggested Rooms</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
            {isLoadingSuggested ? (
              <LoadingSpinner className="col-span-5" />
            ) : suggestedRooms.length === 0 ? (
              <p>No suggested rooms available.</p>
            ) : (
              <>
                <AddNewRoomModal />
                {suggestedRooms.map((room, index) => (
                  <RoomItem
                    key={index}
                    room={room}
                    handleJoinRoom={() => handleJoinRoom(room.code_invite)}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Trending Rooms</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
            {isLoadingTrending ? (
              <LoadingSpinner className="col-span-5" />
            ) : trendingRooms.length === 0 ? (
              <p>No trending rooms available.</p>
            ) : (
              trendingRooms.map((room, index) => (
                <RoomItem
                  key={index}
                  room={room}
                  handleJoinRoom={() => handleJoinRoom(room.code_invite)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(RoomsContainer);
